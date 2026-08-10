export interface EventItem {
  id: string;
  name: string;
  category: 'Technical' | 'Non Technical';
  type: 'Individual' | 'Team';
  fee: number;
  description: string;
  rules: string[];
  fields: string[];
  icon: string;
  coordinator: string;
}

export interface Participant {
  fullName: string;
  email: string;
  mobileNumber: string;
  collegeName: string;
  department: string;
  year: string;
}

export interface SelectedEventData {
  eventId: string;
  eventName: string;
  category: string;
  fee: number;
  preferredLanguage?: string;
  teamName?: string;
  teamLeaderName?: string;
  presentationTitle?: string;
  abstractUrl?: string;
  teamSize?: number;
  cameraType?: string;
  campusDeclaration?: boolean;
  captainName?: string;
  freeFireUid?: string;
  inGameName?: string;
  teamPosition?: string;
}

export interface RegistrationRequestPayload {
  participant: Participant;
  selectedEvents: SelectedEventData[];
}

export interface PaymentDetails {
  orderId: string;
  paymentId: string;
  paymentMethod: string;
  status: string;
  transactionRef: string;
}

export interface RegistrationResponseData {
  success: bool;
  registrationId: string;
  message: string;
  totalAmount: number;
  receiptUrl: string;
  participant: Participant;
  selectedEvents: SelectedEventData[];
  payment: PaymentDetails;
}

export interface AdminStats {
  totalRegistrations: number;
  totalRevenue: number;
  pendingPayments: number;
  eventCounts: Record<string, number>;
  collegeCounts: Record<string, number>;
}

export interface RegistrationRecord {
  registrationId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  collegeName: string;
  department: string;
  year: string;
  selectedEvents: string;
  totalAmount: number;
  paymentStatus: string;
  paymentId: string;
  registrationDate: string;
  status: string;
}
