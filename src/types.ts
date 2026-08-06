export type LeadStatus = 'New' | 'Contacted' | 'Follow Up' | 'Converted' | 'Closed';

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface CustomerQuestionnaire {
  businessType?: string;
  websiteType?: string;
  pagesCount?: string;
  needDomain?: 'Yes' | 'No';
  needHosting?: 'Yes' | 'No';
  needLogo?: 'Yes' | 'No';
  expectedDelivery?: string;
  additionalReqs?: string;
}

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  businessName: string;
  businessCategory: string;
  city: string;
  service: string;
  websiteType: string;
  pagesCount: string;
  budget: string;
  deliveryDate: string;
  message: string;
  dateTime: string;
  ipAddress: string;
  source: string;
  status: LeadStatus;
  notes: LeadNote[];
  questionnaire?: CustomerQuestionnaire;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalLeads: number;
  conversionRate: number; // percentage
  statusCounts: Record<LeadStatus, number>;
  dailyTrend: Array<{ date: string; leads: number; visitors: number }>;
  serviceDistribution: Array<{ name: string; count: number }>;
  sourceDistribution: Array<{ name: string; count: number }>;
  budgetDistribution: Array<{ name: string; count: number }>;
}

export interface NotificationLog {
  id: string;
  leadId: string;
  type: 'admin_email' | 'admin_whatsapp' | 'client_thankyou';
  recipient: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'delivered';
  preview: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'manager';
  token: string;
}
