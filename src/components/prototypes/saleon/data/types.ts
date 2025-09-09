export interface Case {
  id: string;
  title: string;
  company: string;
  status: 'active' | 'proposal' | 'closing' | 'closed-won' | 'lead';
  customerContact: string;
  salesRep: {
    name: string;
    avatar?: string;
  };
  lastEmailReceived: string;
  isBookmarked: boolean;
}

export const statusLabels = {
  active: '進行中',
  proposal: '提案中',
  closing: 'クロージング',
  'closed-won': '契約済',
  lead: 'リード獲得',
} as const;

export const statusColors = {
  active: 'bg-blue-100 text-blue-800',
  proposal: 'bg-yellow-100 text-yellow-800',
  closing: 'bg-brand-100 text-brand-800',
  'closed-won': 'bg-green-100 text-green-800',
  lead: 'bg-purple-100 text-purple-800',
} as const;
