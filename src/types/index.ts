export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  projects: number;
  totalValue: number;
  createdAt: string;
  avatar?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  projectName: string;
  status: QuoteStatus;
  items: LineItem[];
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
  notes: string;
  terms: string;
  createdAt: string;
  validUntil: string;
  sentAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface ActivityItem {
  id: string;
  type: 'quote_sent' | 'quote_accepted' | 'quote_rejected' | 'client_added' | 'payment_received';
  message: string;
  time: string;
  avatar?: string;
}
