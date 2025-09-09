import casesData from './cases.json';
import { Case } from './types';

export { Case, statusColors, statusLabels } from './types';

// 案件データを取得する関数
export const getCases = (): Case[] => {
  return casesData as Case[];
};

// 特定のステータスの案件を取得する関数
export const getCasesByStatus = (status: Case['status']): Case[] => {
  return getCases().filter(case_ => case_.status === status);
};

// ブックマーク済みの案件を取得する関数
export const getBookmarkedCases = (): Case[] => {
  return getCases().filter(case_ => case_.isBookmarked);
};

// 案件を検索する関数
export const searchCases = (query: string): Case[] => {
  const lowerQuery = query.toLowerCase();
  return getCases().filter(case_ =>
    case_.title.toLowerCase().includes(lowerQuery) ||
    case_.company.toLowerCase().includes(lowerQuery) ||
    case_.customerContact.toLowerCase().includes(lowerQuery) ||
    case_.salesRep.name.toLowerCase().includes(lowerQuery)
  );
};
