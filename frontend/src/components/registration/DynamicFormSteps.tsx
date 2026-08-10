import React, { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { EventItem } from '../../types';
import { Upload, FileCheck, Camera, Gamepad, User, Code2, FileText, Brain, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { registrationService } from '../../services/registrationService';
import { useToast } from '../../context/ToastContext';

interface DynamicFormStepsProps {
  selectedEvents: EventItem[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const DynamicFormSteps: React.FC<DynamicFormStepsProps> = ({
  selectedEvents,
  register,
  errors,
  setValue,
  watch
}) => {
  const { showToast } = useToast();
  const [uploadingPdfMap, setUploadingPdfMap] = useState<Record<string, boolean>>({});
  const [uploadedPdfNameMap, setUploadedPdfNameMap] = useState<Record<string, string>>({});

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, eventId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showToast('Only PDF files are allowed for paper presentation abstracts', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('File size exceeds 5MB limit', 'error');
      return;
    }

    try {
      setUploadingPdfMap(prev => ({ ...prev, [eventId]: true }));
      const res = await registrationService.uploadAbstractPdf(file);
      setValue(`paperPres_abstractUrl_${eventId}`, res.url);
      setUploadedPdfNameMap(prev => ({ ...prev, [eventId]: file.name }));
      showToast('Abstract PDF uploaded successfully!', 'success');
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to upload PDF', 'error');
    } finally {
      setUploadingPdfMap(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-violet-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-emerald-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-amber-400" />;
      case 'Gamepad2': return <Gamepad className="w-5 h-5 text-rose-400" />;
      default: return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* SECTION A: COMMON PARTICIPANT INFORMATION */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>General Participant Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
            <input
              {...register('fullName')}
              type="text"
              placeholder="Enter your complete full name"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.fullName && <p className="text-xs text-rose-400 mt-1">{String(errors.fullName.message)}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
            <input
              {...register('email')}
              type="email"
              placeholder="e.g. name@college.edu.in"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.email && <p className="text-xs text-rose-400 mt-1">{String(errors.email.message)}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Number *</label>
            <input
              {...register('mobileNumber')}
              type="tel"
              maxLength={10}
              placeholder="10-digit mobile number"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.mobileNumber && <p className="text-xs text-rose-400 mt-1">{String(errors.mobileNumber.message)}</p>}
          </div>

          {/* College Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / Institution Name *</label>
            <input
              {...register('collegeName')}
              type="text"
              placeholder="Full name of your college"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.collegeName && <p className="text-xs text-rose-400 mt-1">{String(errors.collegeName.message)}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department *</label>
            <input
              {...register('department')}
              type="text"
              placeholder="e.g. Artificial Intelligence & Data Science"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {errors.department && <p className="text-xs text-rose-400 mt-1">{String(errors.department.message)}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Academic Year *</label>
            <select
              {...register('year')}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="">Select Academic Year</option>
              <option value="I Year">I Year</option>
              <option value="II Year">II Year</option>
              <option value="III Year">III Year</option>
              <option value="IV Year">IV Year</option>
            </select>
            {errors.year && <p className="text-xs text-rose-400 mt-1">{String(errors.year.message)}</p>}
          </div>

        </div>
      </div>

      {/* SECTION B: DYNAMIC EVENT FORMS (RENDERED FOR EVERY SELECTED EVENT) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-lg font-bold text-white">Event Specific Registration Forms</h3>
          <span className="text-xs text-cyan-400 font-semibold">{selectedEvents.length} Event(s) Selected</span>
        </div>

        {selectedEvents.map((ev, index) => {
          const evId = ev.id;
          const evName = ev.name;

          return (
            <div
              key={evId}
              className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4 relative overflow-hidden"
            >
              {/* Event Header Banner */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                    {getEventIcon(ev.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Event {index + 1}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">{ev.type}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{evName}</h4>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {ev.category}
                </span>
              </div>

              {/* Event Form Inputs */}

              {/* 1. REVERSE CODING FORM */}
              {evName === 'Reverse Coding' && (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Preferred Programming Language *
                  </label>
                  <select
                    {...register(`revCoding_language_${evId}`)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Python">Python</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                  </select>
                </div>
              )}

              {/* 2. PAPER PRESENTATION FORM (TEAM EVENT) */}
              {evName === 'Paper Presentation' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Team Name *</label>
                      <input
                        {...register(`paperPres_teamName_${evId}`)}
                        type="text"
                        placeholder="Enter unique squad / team name"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Team Leader Name *</label>
                      <input
                        {...register(`paperPres_teamLeaderName_${evId}`)}
                        type="text"
                        placeholder="Team Leader Full Name"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Paper Presentation Title *</label>
                    <input
                      {...register(`paperPres_title_${evId}`)}
                      type="text"
                      placeholder="Title of your research paper"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Upload Abstract PDF (Max 5MB) *</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingPdfMap[evId] ? 'Uploading...' : 'Choose PDF File'}</span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(e, evId)}
                          className="hidden"
                        />
                      </label>
                      {uploadedPdfNameMap[evId] && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                          <FileCheck className="w-4 h-4" />
                          <span>{uploadedPdfNameMap[evId]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. TECHNICAL QUIZ FORM (INDIVIDUAL) */}
              {evName === 'Technical Quiz' && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Technical Quiz is an individual event. Your general participant details will be used for entry.</span>
                </div>
              )}

              {/* 4. MEMORY CHALLENGE FORM (INDIVIDUAL) */}
              {evName === 'Memory Challenge' && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Memory Challenge is an individual event. Cognitive recall rounds will be conducted on campus.</span>
                </div>
              )}

              {/* 5. PHOTOGRAPHY FORM */}
              {evName === 'Photography' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Camera / Equipment Type *</label>
                    <select
                      {...register(`photography_cameraType_${evId}`)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="DSLR / Mirrorless Camera">DSLR / Mirrorless Camera</option>
                      <option value="Smartphone Camera">Smartphone Camera</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input
                      {...register(`photography_declaration_${evId}`)}
                      type="checkbox"
                      id={`campus_dec_${evId}`}
                      className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-800 focus:ring-amber-500"
                    />
                    <label htmlFor={`campus_dec_${evId}`} className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                      "I confirm all photographs will be captured strictly within P.S.V College campus boundaries."
                    </label>
                  </div>
                </div>
              )}

              {/* 6. FREE FIRE FORM */}
              {(evName === 'Free Fire' || evName === 'E-Sports (Free Fire)') && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Squad / Team Name *</label>
                      <input
                        {...register(`freeFire_teamName_${evId}`)}
                        type="text"
                        placeholder="Squad Name"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Team Captain Name *</label>
                      <input
                        {...register(`freeFire_captainName_${evId}`)}
                        type="text"
                        placeholder="Captain Full Name"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Free Fire Numeric Player UID *</label>
                      <input
                        {...register(`freeFire_uid_${evId}`)}
                        type="text"
                        placeholder="Numeric Player UID"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">In Game Name (IGN) *</label>
                      <input
                        {...register(`freeFire_ign_${evId}`)}
                        type="text"
                        placeholder="Your EXACT Free Fire IGN"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
