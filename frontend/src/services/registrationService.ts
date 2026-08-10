import api from './api';
import { EventItem, RegistrationRequestPayload, RegistrationResponseData } from '../types';

export const registrationService = {
  async getEvents(): Promise<EventItem[]> {
    const res = await api.get<EventItem[]>('/events');
    return res.data;
  },

  async submitRegistration(payload: RegistrationRequestPayload): Promise<RegistrationResponseData> {
    const res = await api.post<RegistrationResponseData>('/registration/submit', payload);
    return res.data;
  },

  async uploadAbstractPdf(file: File): Promise<{ success: boolean; filename: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/registration/upload-abstract', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  async uploadPaymentScreenshot(file: File): Promise<{ success: boolean; filename: string; driveUrl: string; fileId: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/registration/upload-screenshot', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};
