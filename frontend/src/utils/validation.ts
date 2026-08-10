import { z } from 'zod';

export const participantSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  collegeName: z.string().min(3, 'College name must be at least 3 characters'),
  department: z.string().min(2, 'Please specify your department'),
  year: z.string().min(1, 'Please select your academic year')
});

export const reverseCodingSchema = z.object({
  preferredLanguage: z.string().min(1, 'Please select your preferred programming language')
});

export const paperPresentationSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  teamLeaderName: z.string().min(2, 'Team leader name is required'),
  presentationTitle: z.string().min(3, 'Presentation title is required'),
  abstractUrl: z.string().min(1, 'Please upload your presentation abstract (PDF)'),
  teamSize: z.number().min(1).max(3)
});

export const photographySchema = z.object({
  cameraType: z.string().min(1, 'Please select your camera type'),
  campusDeclaration: z.boolean().refine(val => val === true, {
    message: 'You must confirm that photos will be taken strictly inside P.S.V College campus'
  })
});

export const freeFireSchema = z.object({
  teamName: z.string().min(2, 'Squad/Team name is required'),
  captainName: z.string().min(2, 'Captain name is required'),
  freeFireUid: z.string().min(5, 'Valid Free Fire UID is required'),
  inGameName: z.string().min(2, 'In-Game Name (IGN) is required'),
  teamPosition: z.string().min(1, 'Select your team position (Captain/Player)')
});

export function validateEventRules(selectedEvents: { id: string; name: string; category: string }[]) {
  if (selectedEvents.length === 0) {
    return { valid: false, message: 'Please select at least one event to proceed.' };
  }

  const hasFreeFire = selectedEvents.some(e => e.name.includes('Free Fire'));

  if (hasFreeFire && selectedEvents.length > 1) {
    return {
      valid: false,
      message: 'CRITICAL RULE: Free Fire is an exclusive squad event and cannot be combined with any other event!'
    };
  }

  if (selectedEvents.length > 2) {
    return { valid: false, message: 'You can register for a maximum of 2 events.' };
  }

  const techCount = selectedEvents.filter(e => e.category === 'Technical').length;
  const nonTechCount = selectedEvents.filter(e => e.category === 'Non Technical').length;

  if (techCount > 2) {
    return { valid: false, message: 'Maximum 2 Technical events allowed.' };
  }
  if (nonTechCount > 2) {
    return { valid: false, message: 'Maximum 2 Non-Technical events allowed.' };
  }

  return { valid: true, message: 'Event selection is valid' };
}
