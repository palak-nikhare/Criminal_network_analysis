import { EntityType, RelationshipType, VerificationStatus } from './types';

export function getEntityTypeColor(type: EntityType) {
  switch (type) {
    case 'PERSON':
      return {
        bg: 'bg-white',
        border: 'border-[#C53A4F]',
        text: 'text-[#C53A4F]',
        dot: '#C53A4F',
        badge: 'bg-[#C53A4F]/10 text-[#C53A4F] border-[#C53A4F]/30'
      };
    case 'PHONE':
      return {
        bg: 'bg-white',
        border: 'border-[#45BAAC]',
        text: 'text-[#45BAAC]',
        dot: '#45BAAC',
        badge: 'bg-[#45BAAC]/10 text-[#45BAAC] border-[#45BAAC]/30'
      };
    case 'BANK_ACCOUNT':
      return {
        bg: 'bg-white',
        border: 'border-blue-500',
        text: 'text-blue-700',
        dot: '#3B82F6',
        badge: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    case 'TRANSACTION':
      return {
        bg: 'bg-white',
        border: 'border-amber-500',
        text: 'text-amber-700',
        dot: '#F59E0B',
        badge: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    case 'VEHICLE':
      return {
        bg: 'bg-white',
        border: 'border-purple-500',
        text: 'text-purple-700',
        dot: '#8B5CF6',
        badge: 'bg-purple-50 text-purple-700 border-purple-200'
      };
    case 'LOCATION':
      return {
        bg: 'bg-white',
        border: 'border-orange-500',
        text: 'text-orange-700',
        dot: '#F97316',
        badge: 'bg-orange-50 text-orange-700 border-orange-200'
      };
    case 'ORGANIZATION':
      return {
        bg: 'bg-white',
        border: 'border-indigo-500',
        text: 'text-indigo-700',
        dot: '#6366F1',
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
      };
    case 'CASE':
      return {
        bg: 'bg-white',
        border: 'border-[#c53a4f]',
        text: 'text-[#c53a4f]',
        dot: '#c53a4f',
        badge: 'bg-[#c53a4f]/10 text-[#c53a4f] border-[#c53a4f]/30'
      };
    case 'EVENT':
      return {
        bg: 'bg-white',
        border: 'border-[#45baac]',
        text: 'text-[#45baac]',
        dot: '#45baac',
        badge: 'bg-[#45baac]/10 text-[#45baac] border-[#45baac]/30'
      };
    default:
      return {
        bg: 'bg-white',
        border: 'border-slate-300',
        text: 'text-slate-600',
        dot: '#64748B',
        badge: 'bg-slate-100 text-slate-700 border-slate-200'
      };
  }
}

export function getVerificationBadge(status: VerificationStatus) {
  switch (status) {
    case 'VERIFIED':
      return {
        label: 'Investigator Verified',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500'
      };
    case 'UNDER_REVIEW':
      return {
        label: 'Under Review',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500'
      };
    case 'REJECTED':
      return {
        label: 'Rejected by Human',
        badgeClass: 'bg-[#c53a4f]/10 text-[#c53a4f] border-[#c53a4f]/30',
        dotClass: 'bg-[#c53a4f]'
      };
    case 'AI_DETECTED':
    default:
      return {
        label: 'AI Detected (Pending)',
        badgeClass: 'bg-[#45baac]/10 text-[#45baac] border-[#45baac]/30',
        dotClass: 'bg-[#45baac] animate-pulse'
      };
  }
}

export function getRelationshipIcon(type: RelationshipType): string {
  switch (type) {
    case 'CALLED': return 'PhoneCall';
    case 'TRANSFERRED': return 'ArrowRightLeft';
    case 'VISITED': return 'MapPin';
    case 'OWNED': return 'ShieldCheck';
    case 'ASSOCIATED': return 'Users';
    case 'MENTIONED': return 'FileText';
    case 'CONNECTED_TO': return 'Network';
    default: return 'Link';
  }
}

export function truncateHash(hash: string): string {
  if (!hash) return '';
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
}
