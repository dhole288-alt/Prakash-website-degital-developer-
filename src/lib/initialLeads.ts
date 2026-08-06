import { Lead } from '../types';

export const initialLeads: Lead[] = [
  {
    id: 'lead-101',
    name: 'Rajesh Sharma',
    mobile: '+918055239255',
    whatsapp: '+918055239255',
    email: 'rajesh@sharmatraders.com',
    businessName: 'Sharma Global Traders',
    businessCategory: 'E-Commerce & Retail',
    city: 'Nashik',
    service: 'E-commerce Website',
    websiteType: 'E-commerce Website',
    pagesCount: '10-20 Pages',
    budget: '₹25,000 - ₹50,000',
    deliveryDate: '2026-08-25',
    message: 'We need a high-converting B2B e-commerce platform with payment gateway and inventory sync.',
    dateTime: '2026-08-06 08:30 AM',
    ipAddress: '103.21.124.89',
    source: 'Quick Quote Form',
    status: 'New',
    notes: [
      {
        id: 'note-1',
        text: 'Initial enquiry submitted via website quote form.',
        createdAt: '2026-08-06 08:30 AM',
        author: 'System'
      }
    ],
    questionnaire: {
      businessType: 'Retail & Wholesale',
      websiteType: 'E-Commerce Storefront',
      pagesCount: '11-20',
      needDomain: 'Yes',
      needHosting: 'Yes',
      needLogo: 'Yes',
      expectedDelivery: '2026-08-25',
      additionalReqs: 'Integrate Razorpay, WhatsApp ordering support, and multi-currency filter.'
    }
  },
  {
    id: 'lead-102',
    name: 'Dr. Priya Mehta',
    mobile: '+919820011223',
    whatsapp: '+919820011223',
    email: 'priya@mehtaclinics.com',
    businessName: 'Mehta Super Speciality Hospital',
    businessCategory: 'Healthcare & Hospital',
    city: 'Nashik',
    service: 'Hospital Website',
    websiteType: 'Hospital Website',
    pagesCount: '5-10 Pages',
    budget: '₹15,000 - ₹30,000',
    deliveryDate: '2026-09-01',
    message: 'Looking for a patient booking portal with doctor schedules and enquiry forms.',
    dateTime: '2026-08-05 04:15 PM',
    ipAddress: '115.240.88.12',
    source: 'Request Quote Modal',
    status: 'Contacted',
    notes: [
      {
        id: 'note-2',
        text: 'Called client on phone. Discussed doctor schedule pages and WhatsApp instant booking.',
        createdAt: '2026-08-05 05:00 PM',
        author: 'Prakash'
      }
    ]
  },
  {
    id: 'lead-103',
    name: 'Anil Kulkarni',
    mobile: '+919930044556',
    whatsapp: '+919930044556',
    email: 'anil@kulkarnischool.edu.in',
    businessName: 'Apex International School',
    businessCategory: 'Education & School',
    city: 'Pune',
    service: 'School Website',
    websiteType: 'School Website',
    pagesCount: '10-20 Pages',
    budget: '₹30,000 - ₹60,000',
    deliveryDate: '2026-08-30',
    message: 'Need an interactive school portal with admission forms, events gallery and notices section.',
    dateTime: '2026-08-04 11:20 AM',
    ipAddress: '49.207.210.45',
    source: 'Google Search',
    status: 'Follow Up',
    notes: [
      {
        id: 'note-3',
        text: 'Sent customized proposal PDF via email. Follow up scheduled for Friday.',
        createdAt: '2026-08-04 02:30 PM',
        author: 'Prakash'
      }
    ]
  },
  {
    id: 'lead-104',
    name: 'Suresh Patil',
    mobile: '+919876501234',
    whatsapp: '+919876501234',
    email: 'suresh@patilrestaurant.com',
    businessName: 'Spice & Curry Fine Dining',
    businessCategory: 'Food & Restaurant',
    city: 'Mumbai',
    service: 'Restaurant Website',
    websiteType: 'Restaurant Website',
    pagesCount: '1-5 Pages',
    budget: '₹10,000 - ₹20,000',
    deliveryDate: '2026-08-15',
    message: 'We need an online digital menu with table reservation form and WhatsApp order direct link.',
    dateTime: '2026-08-03 09:45 PM',
    ipAddress: '198.51.100.42',
    source: 'WhatsApp Referral',
    status: 'Converted',
    notes: [
      {
        id: 'note-4',
        text: 'Advance payment received! Development started.',
        createdAt: '2026-08-04 10:00 AM',
        author: 'Prakash'
      }
    ]
  }
];
