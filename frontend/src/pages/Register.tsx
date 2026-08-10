import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EventItem, SelectedEventData, PaymentDetails } from '../types';
import { registrationService } from '../services/registrationService';
import { paymentService } from '../services/paymentService';
import { EventSelector } from '../components/registration/EventSelector';
import { DynamicFormSteps } from '../components/registration/DynamicFormSteps';
import { Button } from '../components/common/Button';
import { validateEventRules } from '../utils/validation';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Upload, Image as ImageIcon, Lock, ShieldCheck, Trash2, ExternalLink } from 'lucide-react';

export const Register: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<EventItem[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [uploadingScreenshot, setUploadingScreenshot] = useState<boolean>(false);
  
  // Payment step state
  const [upiTransactionId, setUpiTransactionId] = useState<string>('');
  const [screenshotDriveUrl, setScreenshotDriveUrl] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string | null>(null);
  const [screenshotPreviewLocal, setScreenshotPreviewLocal] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<any>({
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      collegeName: '',
      department: '',
      year: ''
    }
  });

  const formValues = watch();

  useEffect(() => {
    registrationService.getEvents().then(eventsData => {
      setAllEvents(eventsData);
      
      const state = location.state as { preselectedEvent?: EventItem };
      if (state?.preselectedEvent) {
        setSelectedEvents([state.preselectedEvent]);
      }
    }).catch(() => {
      showToast('Failed to load events list', 'error');
    });
  }, [location.state]);

  const handleToggleEvent = (event: EventItem) => {
    const isAlreadySelected = selectedEvents.some(e => e.id === event.id);

    if (isAlreadySelected) {
      setSelectedEvents(prev => prev.filter(e => e.id !== event.id));
    } else {
      if (event.name.includes('Free Fire')) {
        setSelectedEvents([event]);
        showToast('Free Fire is an exclusive squad event (₹150/player) and cannot be combined with other events.', 'info');
        return;
      }

      if (selectedEvents.some(e => e.name.includes('Free Fire'))) {
        setSelectedEvents([event]);
        return;
      }

      if (selectedEvents.length >= 2) {
        showToast('Maximum 2 events allowed per registration', 'warning');
        return;
      }

      setSelectedEvents(prev => [...prev, event]);
    }
  };

  const handleNextStep1 = () => {
    const ruleCheck = validateEventRules(selectedEvents);
    if (!ruleCheck.valid) {
      showToast(ruleCheck.message, 'error');
      return;
    }
    setStep(2);
  };

  const handleFormReview = () => {
    if (!formValues.fullName || formValues.fullName.trim().length < 2) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!formValues.email || !formValues.email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!formValues.mobileNumber || !/^[6-9]\d{9}$/.test(formValues.mobileNumber)) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!formValues.collegeName || formValues.collegeName.trim().length < 3) {
      showToast('Please enter your college name', 'error');
      return;
    }
    if (!formValues.department || formValues.department.trim().length < 2) {
      showToast('Please enter your department', 'error');
      return;
    }
    if (!formValues.year) {
      showToast('Please select your academic year', 'error');
      return;
    }

    for (const ev of selectedEvents) {
      const evId = ev.id;
      const evName = ev.name;

      if (evName === 'Paper Presentation') {
        const title = formValues[`paperPres_title_${evId}`] || formValues.paperPres_title;
        const teamName = formValues[`paperPres_teamName_${evId}`] || formValues.paperPres_teamName;
        const abstractUrl = formValues[`paperPres_abstractUrl_${evId}`] || formValues.paperPres_abstractUrl;

        if (!title || !title.trim()) {
          showToast('Paper Presentation requires a Presentation Title', 'error');
          return;
        }
        if (!teamName || !teamName.trim()) {
          showToast('Paper Presentation requires a Team Name', 'error');
          return;
        }
        if (!abstractUrl) {
          showToast('Please upload your Paper Presentation abstract PDF', 'error');
          return;
        }
      } else if (evName === 'Photography') {
        const declaration = formValues[`photography_declaration_${evId}`] ?? formValues.photography_declaration;
        if (!declaration) {
          showToast('Photography event requires confirming the campus-only photo declaration', 'error');
          return;
        }
      } else if (evName === 'Free Fire' || evName === 'E-Sports (Free Fire)') {
        const uid = formValues[`freeFire_uid_${evId}`] || formValues.freeFire_uid;
        const ign = formValues[`freeFire_ign_${evId}`] || formValues.freeFire_ign;
        const teamName = formValues[`freeFire_teamName_${evId}`] || formValues.freeFire_teamName;

        if (!uid || !uid.trim()) {
          showToast('Free Fire registration requires your Free Fire UID', 'error');
          return;
        }
        if (!ign || !ign.trim()) {
          showToast('Free Fire registration requires your In-Game Name (IGN)', 'error');
          return;
        }
        if (!teamName || !teamName.trim()) {
          showToast('Free Fire registration requires a Squad / Team Name', 'error');
          return;
        }
      }
    }

    setStep(3);
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict Image Type Validation: JPG, JPEG, PNG only
    const validMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validExts = ['.jpg', '.jpeg', '.png'];
    const lowerName = file.name.toLowerCase();

    if (!validMimes.includes(file.type) && !validExts.some(ext => lowerName.endswith ? lowerName.endswith(ext) : lowerName.endsWith(ext))) {
      showToast('Unsupported file type. Only JPG, JPEG, and PNG images are allowed.', 'error');
      return;
    }

    // Strict Size Validation: Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      showToast('Screenshot file size exceeds 5MB limit. Please compress or select a smaller image.', 'error');
      return;
    }

    try {
      setUploadingScreenshot(true);
      const previewUrl = URL.createObjectURL(file);
      setScreenshotPreviewLocal(previewUrl);

      const res = await registrationService.uploadPaymentScreenshot(file);
      
      if (!res.success || !res.driveUrl) {
        throw new Error('Google Drive screenshot upload returned empty response.');
      }

      setScreenshotDriveUrl(res.driveUrl);
      setScreenshotFileName(file.name);
      showToast('✅ Payment Screenshot Uploaded Successfully to Google Drive!', 'success');
    } catch (err: any) {
      setScreenshotDriveUrl(null);
      setScreenshotFileName(null);
      setScreenshotPreviewLocal(null);
      showToast(err.response?.data?.detail || 'Google Drive payment screenshot upload failed. Please retry.', 'error');
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotDriveUrl(null);
    setScreenshotFileName(null);
    setScreenshotPreviewLocal(null);
    showToast('Payment screenshot removed. Please upload a valid screenshot.', 'info');
  };

  const totalFee = 150.0;

  const handleExecutePaymentAndRegister = async () => {
    if (!upiTransactionId || upiTransactionId.trim().length < 6) {
      showToast('Please enter a valid 12-digit UPI Transaction ID / Ref No.', 'error');
      return;
    }

    if (!screenshotDriveUrl) {
      showToast('Please upload your payment confirmation screenshot to Google Drive before submitting.', 'error');
      return;
    }

    try {
      setSubmitting(true);

      // 1. Create Order Session
      const orderRes = await paymentService.createOrder({
        registrationId: "PENDING_REG",
        amount: totalFee,
        customerEmail: formValues.email,
        customerPhone: formValues.mobileNumber,
        customerName: formValues.fullName
      });

      // 2. Verify Google Pay Payment with Google Drive Screenshot View URL
      const verifyRes = await paymentService.verifyPayment(
        orderRes.orderId,
        undefined,
        undefined,
        upiTransactionId.trim(),
        screenshotDriveUrl
      );

      if (verifyRes.status !== "SUCCESS") {
        showToast("Payment verification failed. Registration not saved.", "error");
        setSubmitting(false);
        return;
      }

      // 3. Build Payment Details with Google Drive URL
      const paymentInfo: PaymentDetails = {
        orderId: orderRes.orderId,
        paymentId: verifyRes.paymentId,
        paymentMethod: "GOOGLE_PAY_QR",
        status: "SUCCESS",
        transactionRef: `TXN_${orderRes.orderId}`,
        upiTransactionId: upiTransactionId.trim(),
        screenshotUrl: screenshotDriveUrl
      };

      // 4. Map Event Payload
      const mappedEvents: SelectedEventData[] = selectedEvents.map(ev => {
        const evId = ev.id;
        const evName = ev.name;

        return {
          eventId: evId,
          eventName: evName,
          category: ev.category,
          fee: totalFee / selectedEvents.length,
          preferredLanguage: evName === 'Reverse Coding' ? (formValues[`revCoding_language_${evId}`] || formValues.revCoding_language || 'Python') : undefined,
          teamName: evName === 'Paper Presentation'
            ? (formValues[`paperPres_teamName_${evId}`] || formValues.paperPres_teamName)
            : (evName.includes('Free Fire') ? (formValues[`freeFire_teamName_${evId}`] || formValues.freeFire_teamName) : undefined),
          teamLeaderName: evName === 'Paper Presentation' ? (formValues[`paperPres_teamLeaderName_${evId}`] || formValues.paperPres_teamLeaderName) : undefined,
          presentationTitle: evName === 'Paper Presentation' ? (formValues[`paperPres_title_${evId}`] || formValues.paperPres_title) : undefined,
          abstractUrl: evName === 'Paper Presentation' ? (formValues[`paperPres_abstractUrl_${evId}`] || formValues.paperPres_abstractUrl) : undefined,
          teamSize: evName === 'Paper Presentation' ? Number(formValues[`paperPres_teamSize_${evId}`] || formValues.paperPres_teamSize || 1) : undefined,
          cameraType: evName === 'Photography' ? (formValues[`photography_cameraType_${evId}`] || formValues.photography_cameraType || 'Smartphone Camera') : undefined,
          campusDeclaration: evName === 'Photography' ? Boolean(formValues[`photography_declaration_${evId}`] ?? formValues.photography_declaration) : undefined,
          captainName: evName.includes('Free Fire') ? (formValues[`freeFire_captainName_${evId}`] || formValues.freeFire_captainName) : undefined,
          freeFireUid: evName.includes('Free Fire') ? (formValues[`freeFire_uid_${evId}`] || formValues.freeFire_uid) : undefined,
          inGameName: evName.includes('Free Fire') ? (formValues[`freeFire_ign_${evId}`] || formValues.freeFire_ign) : undefined,
          teamPosition: evName.includes('Free Fire') ? (formValues[`freeFire_position_${evId}`] || formValues.freeFire_position || 'Player') : undefined,
        };
      });

      const payload = {
        participant: {
          fullName: formValues.fullName,
          email: formValues.email,
          mobileNumber: formValues.mobileNumber,
          collegeName: formValues.collegeName,
          department: formValues.department,
          year: formValues.year
        },
        selectedEvents: mappedEvents,
        payment: paymentInfo
      };

      // 5. Submit to Backend & Save to Google Sheets ONLY AFTER Payment Verification Success
      const result = await registrationService.submitRegistration(payload);
      showToast('Payment Verified! Registration saved in Google Sheets.', 'success');
      navigate('/registration-success', { state: { registrationResult: result } });

    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Registration failed. Payment was not completed.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Progress Tracker */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center text-xs ${
            step === 1 ? 'bg-cyan-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
          </div>
          <span className="text-xs font-bold text-white hidden sm:inline">1. Select Events</span>
        </div>

        <div className="h-0.5 w-8 sm:w-16 bg-slate-800" />

        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center text-xs ${
            step === 2 ? 'bg-cyan-500 text-white' : step > 2 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : '2'}
          </div>
          <span className="text-xs font-bold text-white hidden sm:inline">2. Participant & Event Forms</span>
        </div>

        <div className="h-0.5 w-8 sm:w-16 bg-slate-800" />

        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center text-xs ${
            step === 3 ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            3
          </div>
          <span className="text-xs font-bold text-white hidden sm:inline">3. Google Pay QR</span>
        </div>

      </div>

      {/* STEP 1: EVENT SELECTION */}
      {step === 1 && (
        <div className="glass-panel p-8 rounded-3xl space-y-8 border border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Select Symposium Events</h2>
            <p className="text-xs text-slate-400">Select up to 2 events for a flat fee of ₹150 total.</p>
          </div>

          <EventSelector
            events={allEvents}
            selectedEvents={selectedEvents}
            onToggleEvent={handleToggleEvent}
          />

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Registration Fee</span>
              <span className="text-2xl font-extrabold text-white">₹{totalFee}</span>
              <span className="text-[10px] text-cyan-400 block font-medium">Flat Fee (Covers selected events)</span>
            </div>
            <Button
              onClick={handleNextStep1}
              disabled={selectedEvents.length === 0}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Fill Forms
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: DYNAMIC EVENT FORMS */}
      {step === 2 && (
        <form onSubmit={handleSubmit(handleFormReview)} className="glass-panel p-8 rounded-3xl space-y-8 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Fill Participant & Event Information</h2>
              <p className="text-xs text-slate-400">Complete general details and specific forms for each selected event.</p>
            </div>
            <Button variant="ghost" size="sm" type="button" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Events
            </Button>
          </div>

          <DynamicFormSteps
            selectedEvents={selectedEvents}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
            <Button variant="ghost" type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" icon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Google Pay Checkout
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: GOOGLE PAY QR & PAYMENT SUBMISSION */}
      {step === 3 && (
        <div className="glass-panel p-8 rounded-3xl space-y-8 border border-cyan-500/30 shadow-2xl">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Google Pay Payment Checkout</h2>
            <p className="text-xs text-slate-400">Scan the QR code below using Google Pay or any UPI app to pay ₹{totalFee}.</p>
          </div>

          {/* QR Code & Fee Display Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            
            {/* Display GPay QR */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl space-y-3">
              <img
                src="/assets/gpay_qr.jpg"
                alt="Google Pay QR Code"
                className="w-56 h-56 object-contain rounded-xl"
              />
              <span className="text-xs font-bold text-slate-800">Scan with Google Pay / PhonePe / Paytm</span>
            </div>

            {/* Fee & Payment Instructions */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                <span className="text-slate-400 block">Total Payable Amount</span>
                <span className="text-3xl font-extrabold text-white">₹{totalFee}</span>
                <span className="text-cyan-400 block font-semibold">P.S.V CET AI&DS Symposium Registration</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <h4 className="font-bold text-white text-sm">Payment Steps:</h4>
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-slate-300">
                  <li>Scan the QR code using Google Pay or any UPI App.</li>
                  <li>Pay exact amount: <strong>₹{totalFee}</strong>.</li>
                  <li>Copy the 12-digit <strong>UPI Transaction ID / Ref No.</strong></li>
                  <li>Take a screenshot of the successful payment screen.</li>
                  <li>Enter the Transaction ID & upload screenshot below.</li>
                </ol>
              </div>
            </div>

          </div>

          {/* Payment Verification Form Inputs */}
          <div className="space-y-6 pt-2">
            
            {/* UPI Transaction ID Input */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                UPI Transaction ID / UTR Number (12-Digits) *
              </label>
              <input
                type="text"
                required
                value={upiTransactionId}
                onChange={(e) => setUpiTransactionId(e.target.value)}
                placeholder="e.g. 420192837410"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono tracking-wider"
              />
            </div>

            {/* Screenshot File Upload & Google Drive Preview */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200">
                Upload Payment Confirmation Screenshot (JPG, PNG - Max 5MB) *
              </label>

              {!screenshotDriveUrl ? (
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingScreenshot ? 'Uploading to Google Drive...' : 'Choose Image File'}</span>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleScreenshotUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-slate-400">Accepted formats: JPG, JPEG, PNG (Max 5MB)</span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>✅ Screenshot Uploaded Successfully to Google Drive</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleRemoveScreenshot} icon={<Trash2 className="w-4 h-4 text-rose-400" />}>
                      Remove & Re-upload
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    {screenshotPreviewLocal && (
                      <img src={screenshotPreviewLocal} alt="Payment Screenshot Preview" className="w-20 h-20 object-cover rounded-xl border border-slate-700 shadow-md" />
                    )}
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-white block">{screenshotFileName}</span>
                      <a href={screenshotDriveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                        <span>View in Google Drive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Strict Rules Warning */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
            <Lock className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-bold text-white block">REGISTRATION VERIFICATION:</span>
              Your registration will be saved to Google Sheets and your official PDF receipt generated ONLY after payment transaction ID & Google Drive screenshot link are verified.
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <Button variant="ghost" type="button" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Form
            </Button>

            <Button
              onClick={handleExecutePaymentAndRegister}
              isLoading={submitting}
              icon={<ShieldCheck className="w-4 h-4" />}
            >
              Submit Registration & Verify Payment
            </Button>
          </div>

        </div>
      )}

    </div>
  );
};
