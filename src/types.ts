export type EntityType =
  | 'PERSON'
  | 'PHONE'
  | 'BANK_ACCOUNT'
  | 'TRANSACTION'
  | 'VEHICLE'
  | 'LOCATION'
  | 'ORGANIZATION'
  | 'CASE'
  | 'EVENT';

export type RelationshipType =
  | 'CALLED'
  | 'TRANSFERRED'
  | 'VISITED'
  | 'OWNED'
  | 'ASSOCIATED'
  | 'MENTIONED'
  | 'CONNECTED_TO'
  | 'USED'
  | 'SIGNATORY'
  | 'OPERATES'
  | 'SIGHTED_AT'
  | 'CHARTERED'
  | 'OFFLOADED'
  | 'CONTROLS'
  | 'SPOOF_CALLED'
  | 'SUPPLIED_SIMS'
  | 'DIRECTS'
  | 'MANAGES'
  | 'CONVERTED_TO_CRYPTO'
  | 'OPERATES_WALLET'
  | (string & {});

export type VerificationStatus =
  | 'AI_DETECTED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED';

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  label: string;
  aliases?: string[];
  role?: string;
  centralityScore?: number;
  pageRankScore?: number;
  confidence: number;
  details: Record<string, string | number>;
  connectedCount?: number;
  caseIds: string[];
}

export interface Relationship {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  timestamp: string;
  confidence: number;
  sourceEvidenceId: string;
  verificationStatus: VerificationStatus;
  explanation: string;
  strength?: number;
}

export type EvidenceSourceType =
  | 'FIR'
  | 'CDR'
  | 'FINANCIAL_RECORD'
  | 'LOCATION_RECORD'
  | 'SURVEILLANCE_REPORT'
  | 'PREVIOUS_CASE'
  | 'INVESTIGATION_NOTE';

export interface Evidence {
  id: string;
  caseId: string;
  sourceType: EvidenceSourceType;
  date: string;
  relatedEntityId: string;
  targetEntityId?: string;
  relationship: string;
  confidence: number;
  integrityHash: string; // SHA-256
  verificationStatus: VerificationStatus;
  sourceReference: string;
  rawSnippet: string;
  details: Record<string, string>;
}

export interface InvestigationCase {
  id: string;
  title: string;
  status: 'Under Investigation' | 'Review Ready' | 'Archived' | 'Priority Escalation' | (string & {});
  investigatingOfficer: string;
  badgeNumber: string;
  createdAt: string;
  entitiesCount: number;
  relationshipsCount: number;
  evidenceCount: number;
  confidenceScore: number;
  summary: string;
  division: string;
}

export interface KeyPlayer {
  entityId: string;
  name: string;
  networkRole: 'Connector' | 'Broker' | 'Cluster Member' | 'Bridge Node' | 'Financial Intermediary';
  centralityScore: number;
  pageRankScore: number;
  confidence: number;
  removalImpact: number;
  neutralAssessment: string;
}

export interface AliasCandidate {
  id: string;
  canonicalEntityId: string;
  canonicalName: string;
  aliasName: string;
  matchConfidence: number;
  evidenceIndicators: string[];
  status: 'PENDING_VERIFICATION' | 'CONFIRMED' | 'REJECTED';
  sourceReference: string;
}

export interface CrossModalCorrelation {
  id: string;
  title: string;
  callActivity: string;
  financialActivity: string;
  locationActivity: string;
  correlatedSignal: string;
  confidence: number;
  evidenceIds: string[];
  status: VerificationStatus;
  timestamp: string;
}

export interface AnomalyAlert {
  id: string;
  caseId?: string;
  title: string;
  type?: 'UNUSUAL_TRANSACTION_BURST' | 'COMMUNICATION_SPIKE' | 'SHARED_LOCATION_ANOMALY' | 'UNUSUAL_MOVEMENT' | 'UNEXPECTED_TRANSFER' | string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL' | (string & {});
  description: string;
  timestamp?: string;
  detectedAt?: string;
  entitiesInvolved: string[];
  involvedEntities?: string[];
  recommendedAction?: string;
  confidence?: number;
  verificationStatus?: VerificationStatus;
}

export interface Finding {
  id: string;
  caseId: string;
  title: string;
  leadDescription: string;
  description?: string;
  summary?: string;
  category?: string;
  actionableRecommendation?: string;
  evidenceIds: string[];
  confidence: number;
  status: VerificationStatus;
  timestamp: string;
  whyDetected: string[];
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  timestamp: string;
  date?: string;
  dateStr?: string;
  timeStr?: string;
  type: 'COMMUNICATION' | 'FINANCIAL' | 'LOCATION' | 'VEHICLE' | 'CASE' | 'EVENT' | 'CALL' | 'TRANSACTION' | 'LOCATION_VISIT' | 'MEETING' | 'INCIDENT' | string;
  title: string;
  sourceEntity?: string;
  targetEntity?: string;
  description: string;
  evidenceId?: string;
  sourceEvidenceId?: string;
  evidenceRef?: string;
  confidence: number;
  confidenceScore?: number;
  isCoOccurrence?: boolean;
  location?: string;
  involvedEntities?: string[];
  entitiesInvolved?: string[];
}

export interface LocationHotspot {
  id: string;
  caseId: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number; xPercent: number; yPercent: number };
  relatedPersons: string[];
  eventsCount: number;
  timePeriod: string;
  evidenceIds: string[];
  category: 'Rendezvous' | 'Communication Cell' | 'Cash Drop' | 'Corporate Front' | 'Residence';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  entityOrCase: string;
  result: string;
  accessStatus: 'Authorized' | 'Quarantined';
  integrityHash: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  badge: string;
  action: string;
  target: string;
  justification: string;
  hash: string;
}

export interface AliasResolution {
  id: string;
  entityId?: string;
  primaryName: string;
  canonicalName?: string;
  aliasName: string;
  suspectedAliases?: string[];
  confidence: number;
  reasons: string[];
  evidenceSources: string[];
  status: 'PENDING_REVIEW' | 'CONFIRMED_MERGED' | 'REJECTED';
}

export interface AIQueryResponse {
  answer: string;
  confidence: number;
  supportingEvidence: string[];
  sourceReferences: string[];
  whyDetected: string;
  alternativeExplanations: string;
  suggestedNextSteps: string[];
}

export interface IngestedDocument {
  id: string;
  title: string;
  sourceType: EvidenceSourceType;
  rawText: string;
  timestamp: string;
  legalGateStatus?: 'PASSED' | 'PENDING' | 'REJECTED';
  courtWarrantOrAuthId: string;
  entities: { text: string; type: EntityType; confidence: number }[];
  relationships: { source: string; target: string; type: RelationshipType; confidence: number }[];
}

export interface UserSession {
  investigatorId: string;
  name: string;
  department: string;
  role: string;
  badgeNumber?: string;
  token: string;
  authorizedCases: string[];
}
