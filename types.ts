
export enum UserRole {
  ADDICTION = 'ADDICTION',
  RECOVERY = 'RECOVERY',
  FAMILY_FRIEND = 'FAMILY_FRIEND'
}

export type TrafficLightStatus = 'green' | 'amber' | 'red';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export enum ResourceCategory {
  BASICS = 'BASICS',
  COMMUNICATION = 'COMMUNICATION',
  BOUNDARY = 'BOUNDARY',
  SELF_CARE = 'SELF_CARE',
  CRISIS = 'CRISIS'
}

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  isPremium: boolean;
  content: string;
  icon: string;
}

export interface VaultItem {
  id: string;
  type: 'text' | 'image' | 'voice';
  content: string;
  title: string;
}

export interface TrustPermissions {
  shareStatus: boolean;
  shareMilestones: boolean;
  shareRoutine: boolean;
  shareInsights: boolean;
}

export interface TrustConnection {
  id: string;
  name: string;
  role: UserRole;
  permissions: TrustPermissions;
  status: TrafficLightStatus;
  riskLevel?: RiskLevel;
}

export interface PersonalContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  notes: string;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  isPremium: boolean;
  onboardingCompleted: boolean;
  joinDate: string;
  resilienceScore: number;
  totalSoberDays: number;
  totalCheckInDays: number;
  currentStatus: TrafficLightStatus;
  riskLevel: RiskLevel;
  dailySpend?: number;
  dailyHours?: number;
  reasonsToStaySober: string[];
  isLighthouse: boolean;
  isVaultLocked: boolean;
  activeTrustKey?: string;
  connections: TrustConnection[];
  completedLessons: string[];
}

export interface CheckIn {
  id: string;
  date: string;
  mood: number;
  notes: string;
  cravings?: 'none' | 'mild' | 'strong';
  triggers?: string[];
  focusArea?: 'mostly_me' | 'half_half' | 'mostly_them';
  boundaryMaintained?: boolean;
  interactionQuality?: 'positive' | 'neutral' | 'tense' | 'none';
  selfCareCompleted?: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  tags?: string[];
}

export interface RoutineItem {
  id: string;
  name: string;
  completed: boolean;
  category: 'mind' | 'body' | 'connection' | 'routine';
}

export interface SafePlace {
  id: string;
  name: string;
  type: string;
  address: string;
  distance?: string;
  openingHours?: string;
  isHighRisk?: boolean;
  lat?: number;
  lng?: number;
}

export interface Letter {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  deliveryDate: string;
  isRead: boolean;
}
