import {
  InvestigationCase,
  Entity,
  Relationship,
  Evidence,
  KeyPlayer,
  AliasCandidate,
  CrossModalCorrelation,
  AnomalyAlert,
  Finding,
  TimelineEvent,
  LocationHotspot,
  AuditLog,
  IngestedDocument
} from '../types';

export const INITIAL_CASE: InvestigationCase = {
  id: 'CASE-26189-001',
  title: 'Organized Financial & Communication Network',
  status: 'Under Investigation',
  investigatingOfficer: 'Insp. Vikram Rathod',
  badgeNumber: 'NCRB-WSD-4412',
  createdAt: '2026-06-15 08:30 IST',
  entitiesCount: 14,
  relationshipsCount: 18,
  evidenceCount: 16,
  confidenceScore: 89,
  summary: 'Investigating a coordinated cyber-financial syndicate operating through shell entities, burner SIMs, and rapid bank transfers across the Pune-Mumbai corridor. Multiple fragmented reports linked through cross-modal analysis.',
  division: 'NCRB Women Safety & Cyber Intelligence Division'
};

export const INITIAL_ENTITIES: Entity[] = [
  {
    id: 'ENT-P-01',
    type: 'PERSON',
    name: 'Arjun Mehta',
    label: 'Arjun Mehta',
    aliases: ['A. Mehta', 'Rahul S.', 'Arjun M.'],
    role: 'Central Network Connector',
    centralityScore: 0.88,
    pageRankScore: 0.24,
    confidence: 94,
    details: {
      occupation: 'Consultant (Purported)',
      knownResidence: 'Shivajinagar, Pune',
      primaryPhoneRef: 'Phone-101',
      riskIndicator: 'High Network Density'
    },
    connectedCount: 7,
    caseIds: ['CASE-26189-001', 'FIR-2024-412']
  },
  {
    id: 'ENT-P-02',
    type: 'PERSON',
    name: 'Neha Patil',
    label: 'Neha Patil',
    aliases: ['N. Patil'],
    role: 'Financial & Comm. Broker',
    centralityScore: 0.74,
    pageRankScore: 0.19,
    confidence: 89,
    details: {
      occupation: 'Accountant / Liaison',
      knownResidence: 'Baner, Pune',
      primaryPhoneRef: 'Phone-103',
      riskIndicator: 'Cross-Cluster Intermediary'
    },
    connectedCount: 5,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-P-03',
    type: 'PERSON',
    name: 'Rohan Kulkarni',
    label: 'Rohan Kulkarni',
    aliases: ['R. Kulkarni', 'Ronnie'],
    role: 'Financial Account Handler',
    centralityScore: 0.62,
    pageRankScore: 0.15,
    confidence: 91,
    details: {
      occupation: 'Director (Shell Entity)',
      knownResidence: 'Hadapsar, Pune',
      primaryAccountRef: 'ACC-201',
      riskIndicator: 'Layered Banking Operations'
    },
    connectedCount: 4,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-P-04',
    type: 'PERSON',
    name: 'Sameer Shah',
    label: 'Sameer Shah',
    aliases: ['Sam S.'],
    role: 'Telecom Runner / Logistics',
    centralityScore: 0.51,
    pageRankScore: 0.12,
    confidence: 86,
    details: {
      occupation: 'Field Operator',
      knownResidence: 'Pune Camp',
      primaryPhoneRef: 'Phone-102',
      riskIndicator: 'Rapid Device Swapping'
    },
    connectedCount: 4,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-PH-01',
    type: 'PHONE',
    name: 'Phone-101 (+91-98231-XXXX1)',
    label: 'Phone-101',
    confidence: 96,
    details: {
      number: '+91-98231-XXXX1',
      imei: '864201049281729',
      carrier: 'Telecom Corp Alpha',
      towerLocation: 'Shivajinagar Junction'
    },
    connectedCount: 4,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-PH-02',
    type: 'PHONE',
    name: 'Phone-102 (+91-98231-XXXX2)',
    label: 'Phone-102',
    confidence: 91,
    details: {
      number: '+91-98231-XXXX2',
      imei: '359201048821903',
      carrier: 'Telecom Corp Beta',
      towerLocation: 'Pune Camp Central'
    },
    connectedCount: 3,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-PH-03',
    type: 'PHONE',
    name: 'Phone-103 (+91-98231-XXXX3)',
    label: 'Phone-103',
    confidence: 88,
    details: {
      number: '+91-98231-XXXX3',
      imei: '867102049100234',
      carrier: 'Telecom Corp Alpha',
      towerLocation: 'Baner Tech Hub'
    },
    connectedCount: 3,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-BA-01',
    type: 'BANK_ACCOUNT',
    name: 'ACC-201 (Axis Current)',
    label: 'ACC-201',
    confidence: 95,
    details: {
      accountNumber: '91823XXXX112',
      bank: 'Axis Bank, Pune Main',
      signatory: 'Rohan Kulkarni',
      entityTag: 'Company Alpha Primary'
    },
    connectedCount: 4,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-BA-02',
    type: 'BANK_ACCOUNT',
    name: 'ACC-202 (HDFC Savings)',
    label: 'ACC-202',
    confidence: 92,
    details: {
      accountNumber: '50100XXXX874',
      bank: 'HDFC Bank, Baner',
      signatory: 'Neha Patil',
      entityTag: 'Pass-through account'
    },
    connectedCount: 3,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-TX-01',
    type: 'TRANSACTION',
    name: 'TX-221 (₹ 18,50,000)',
    label: 'TX-221',
    confidence: 98,
    details: {
      amount: 'INR 18,50,000',
      timestamp: '2026-06-13 14:22 IST',
      ref: 'IMPS-20260613-88741',
      mode: 'High Velocity Electronic'
    },
    connectedCount: 2,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-VH-01',
    type: 'VEHICLE',
    name: 'MH-12-AB-1234 (Silver SUV)',
    label: 'MH-12-AB-1234',
    confidence: 90,
    details: {
      registration: 'MH-12-AB-1234',
      makeModel: 'Mahindra Scorpio (Silver)',
      registeredOwner: 'Company Alpha Ltd',
      tollLogs: 'Pune-Mumbai Expressway'
    },
    connectedCount: 3,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-LOC-01',
    type: 'LOCATION',
    name: 'Pune Camp Rendezvous',
    label: 'Pune Camp',
    confidence: 94,
    details: {
      coordinates: '18.5204° N, 73.8770° E',
      area: 'Camp Commercial Sector',
      significance: 'Multiple Co-Location Signals'
    },
    connectedCount: 4,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-ORG-01',
    type: 'ORGANIZATION',
    name: 'Company Alpha Ltd',
    label: 'Company Alpha',
    confidence: 88,
    details: {
      cin: 'U74999MH2024PTC419082',
      registeredAddress: 'Baner Commercial Complex, Pune',
      allegedActivity: 'Front for overseas payments'
    },
    connectedCount: 4,
    caseIds: ['CASE-26189-001']
  },
  {
    id: 'ENT-CS-01',
    type: 'CASE',
    name: 'FIR-2026-089 (Extortion & Cyber)',
    label: 'FIR-2026-089',
    confidence: 99,
    details: {
      ps: 'Cyber Crime PS, Pune City',
      sections: 'IT Act 66D, IPC 384, 420',
      complainant: 'Priya Verma'
    },
    connectedCount: 3,
    caseIds: ['CASE-26189-001']
  }
];

export const INITIAL_RELATIONSHIPS: Relationship[] = [
  {
    id: 'REL-01',
    source: 'ENT-P-01', // Arjun Mehta
    target: 'ENT-PH-01', // Phone-101
    type: 'OWNED',
    timestamp: '2026-06-10 10:00 IST',
    confidence: 96,
    sourceEvidenceId: 'EVD-CDR-101',
    verificationStatus: 'VERIFIED',
    explanation: 'Subscriber KYC and persistent cell-tower telemetry match residence of Arjun Mehta.'
  },
  {
    id: 'REL-02',
    source: 'ENT-PH-01', // Phone-101
    target: 'ENT-PH-02', // Phone-102
    type: 'CALLED',
    timestamp: '2026-06-12 18:44 IST',
    confidence: 94,
    sourceEvidenceId: 'EVD-CDR-104',
    verificationStatus: 'VERIFIED',
    explanation: '42 voice calls logged over 7 days prior to major banking transfer.'
  },
  {
    id: 'REL-03',
    source: 'ENT-P-04', // Sameer Shah
    target: 'ENT-PH-02', // Phone-102
    type: 'OWNED',
    timestamp: '2026-06-11 11:15 IST',
    confidence: 91,
    sourceEvidenceId: 'EVD-CDR-105',
    verificationStatus: 'VERIFIED',
    explanation: 'Device handset IMEI swapped with Sameer Shah historical SIM on multiple occasions.'
  },
  {
    id: 'REL-04',
    source: 'ENT-P-01', // Arjun Mehta
    target: 'ENT-P-02', // Neha Patil
    type: 'ASSOCIATED',
    timestamp: '2026-06-12 19:30 IST',
    confidence: 88,
    sourceEvidenceId: 'EVD-SURV-201',
    verificationStatus: 'UNDER_REVIEW',
    explanation: 'Surveillance logs and communication exchange confirm frequent planning meetings.'
  },
  {
    id: 'REL-05',
    source: 'ENT-P-02', // Neha Patil
    target: 'ENT-PH-03', // Phone-103
    type: 'OWNED',
    timestamp: '2026-06-10 09:00 IST',
    confidence: 95,
    sourceEvidenceId: 'EVD-CDR-108',
    verificationStatus: 'VERIFIED',
    explanation: 'Official registered billing address and digital signature match Neha Patil.'
  },
  {
    id: 'REL-06',
    source: 'ENT-P-02', // Neha Patil
    target: 'ENT-BA-02', // ACC-202
    type: 'OWNED',
    timestamp: '2026-06-12 10:30 IST',
    confidence: 93,
    sourceEvidenceId: 'EVD-FIN-203',
    verificationStatus: 'VERIFIED',
    explanation: 'Primary account holder signatory in HDFC Baner branch records.'
  },
  {
    id: 'REL-07',
    source: 'ENT-BA-01', // ACC-201
    target: 'ENT-TX-01', // TX-221
    type: 'TRANSFERRED',
    timestamp: '2026-06-13 14:22 IST',
    confidence: 98,
    sourceEvidenceId: 'EVD-FIN-201',
    verificationStatus: 'VERIFIED',
    explanation: 'Originating debit transaction of INR 18,50,000 executed via web portal.'
  },
  {
    id: 'REL-08',
    source: 'ENT-TX-01', // TX-221
    target: 'ENT-BA-02', // ACC-202
    type: 'TRANSFERRED',
    timestamp: '2026-06-13 14:23 IST',
    confidence: 98,
    sourceEvidenceId: 'EVD-FIN-201',
    verificationStatus: 'VERIFIED',
    explanation: 'Instant IMPS credit into beneficiary account managed by Neha Patil.'
  },
  {
    id: 'REL-09',
    source: 'ENT-P-03', // Rohan Kulkarni
    target: 'ENT-BA-01', // ACC-201
    type: 'OWNED',
    timestamp: '2026-06-08 14:00 IST',
    confidence: 97,
    sourceEvidenceId: 'EVD-FIN-202',
    verificationStatus: 'VERIFIED',
    explanation: 'Authorized director signatory on corporate bank mandate for Company Alpha.'
  },
  {
    id: 'REL-10',
    source: 'ENT-P-03', // Rohan Kulkarni
    target: 'ENT-ORG-01', // Company Alpha
    type: 'ASSOCIATED',
    timestamp: '2026-06-05 16:00 IST',
    confidence: 99,
    sourceEvidenceId: 'EVD-ROC-301',
    verificationStatus: 'VERIFIED',
    explanation: 'Ministry of Corporate Affairs filings list Rohan Kulkarni as active director.'
  },
  {
    id: 'REL-11',
    source: 'ENT-ORG-01', // Company Alpha
    target: 'ENT-VH-01', // Vehicle MH-12-AB-1234
    type: 'OWNED',
    timestamp: '2026-06-05 11:00 IST',
    confidence: 94,
    sourceEvidenceId: 'EVD-VAHAN-401',
    verificationStatus: 'VERIFIED',
    explanation: 'Vehicle national register shows Company Alpha Ltd as the registered owner.'
  },
  {
    id: 'REL-12',
    source: 'ENT-P-01', // Arjun Mehta
    target: 'ENT-VH-01', // Vehicle MH-12-AB-1234
    type: 'VISITED',
    timestamp: '2026-06-14 16:30 IST',
    confidence: 87,
    sourceEvidenceId: 'EVD-ANPR-402',
    verificationStatus: 'AI_DETECTED',
    explanation: 'ANPR traffic camera and parking log identify Arjun Mehta accessing vehicle at Baner.'
  },
  {
    id: 'REL-13',
    source: 'ENT-P-01', // Arjun Mehta
    target: 'ENT-LOC-01', // Pune Camp
    type: 'VISITED',
    timestamp: '2026-06-14 17:15 IST',
    confidence: 92,
    sourceEvidenceId: 'EVD-LOC-087',
    verificationStatus: 'UNDER_REVIEW',
    explanation: 'Cell tower triangulation places Phone-101 in Camp sector between 17:00 and 19:30.'
  },
  {
    id: 'REL-14',
    source: 'ENT-P-04', // Sameer Shah
    target: 'ENT-LOC-01', // Pune Camp
    type: 'VISITED',
    timestamp: '2026-06-14 17:22 IST',
    confidence: 91,
    sourceEvidenceId: 'EVD-LOC-088',
    verificationStatus: 'UNDER_REVIEW',
    explanation: 'Cell tower CDR overlaps with Arjun Mehta in the same 400m cell sector.'
  },
  {
    id: 'REL-15',
    source: 'ENT-P-01', // Arjun Mehta
    target: 'ENT-CS-01', // FIR-2026-089
    type: 'MENTIONED',
    timestamp: '2026-06-15 09:00 IST',
    confidence: 86,
    sourceEvidenceId: 'EVD-FIR-089',
    verificationStatus: 'AI_DETECTED',
    explanation: 'Complainant reported receiving intimidation calls from number mapped to entity cluster.'
  },
  {
    id: 'REL-16',
    source: 'ENT-P-02', // Neha Patil
    target: 'ENT-P-03', // Rohan Kulkarni
    type: 'CONNECTED_TO',
    timestamp: '2026-06-13 13:00 IST',
    confidence: 84,
    sourceEvidenceId: 'EVD-FIN-201',
    verificationStatus: 'UNDER_REVIEW',
    explanation: 'Joint transaction audit indicates coordination during fund dissipation.'
  },
  {
    id: 'REL-17',
    source: 'ENT-P-01', // Arjun Mehta
    target: 'ENT-ORG-01', // Company Alpha
    type: 'ASSOCIATED',
    timestamp: '2026-06-07 10:00 IST',
    confidence: 81,
    sourceEvidenceId: 'EVD-NOTE-501',
    verificationStatus: 'AI_DETECTED',
    explanation: 'Investigation notes detail confidential informant citing de facto operational control.'
  },
  {
    id: 'REL-18',
    source: 'ENT-PH-02', // Phone-102
    target: 'ENT-CS-01', // FIR-2026-089
    type: 'MENTIONED',
    timestamp: '2026-06-15 09:15 IST',
    confidence: 95,
    sourceEvidenceId: 'EVD-FIR-089',
    verificationStatus: 'VERIFIED',
    explanation: 'Victim device logs show WhatsApp extortion messages directly originating from Phone-102.'
  }
];

export const INITIAL_EVIDENCE: Evidence[] = [
  {
    id: 'EVD-CDR-104',
    caseId: 'CASE-26189-001',
    sourceType: 'CDR',
    date: '2026-06-12 18:44 IST',
    relatedEntityId: 'ENT-PH-01',
    targetEntityId: 'ENT-PH-02',
    relationship: 'Called Phone-102',
    confidence: 94,
    integrityHash: 'a7c9f831b2d4e5f6081947bca31024bc681029384756abcdef9876543210fedc',
    verificationStatus: 'VERIFIED',
    sourceReference: 'Telecom Tower Audit Report T-2026-Pune',
    rawSnippet: 'CLI: +9198231XXXX1 -> B-PARTY: +9198231XXXX2 | DURATION: 184s | CELL_ID: PNE-SHIV-04',
    details: {
      callCount: '42 calls recorded in 7 days',
      durationAvg: '195 seconds',
      timeSlot: 'Late evening pattern (21:00 - 02:00)'
    }
  },
  {
    id: 'EVD-FIN-201',
    caseId: 'CASE-26189-001',
    sourceType: 'FINANCIAL_RECORD',
    date: '2026-06-13 14:22 IST',
    relatedEntityId: 'ENT-BA-01',
    targetEntityId: 'ENT-BA-02',
    relationship: 'Transferred INR 18,50,000 to ACC-202',
    confidence: 98,
    integrityHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    verificationStatus: 'VERIFIED',
    sourceReference: 'FIU-IND Suspicious Transaction Report STR-2026-881',
    rawSnippet: 'TXN_ID: IMPS91823112 -> 50100874 | AMT: INR 18,50,000.00 | IP: 103.21.XX.XX Pune Gateway',
    details: {
      velocity: 'Immediate transfer post large credit receipt',
      riskCategory: 'Layering pattern detected'
    }
  },
  {
    id: 'EVD-LOC-087',
    caseId: 'CASE-26189-001',
    sourceType: 'LOCATION_RECORD',
    date: '2026-06-14 17:15 IST',
    relatedEntityId: 'ENT-P-01',
    targetEntityId: 'ENT-LOC-01',
    relationship: 'Located at Pune Camp Rendezvous',
    confidence: 92,
    integrityHash: '8f434346648f6b96df89dda901c5176b10e6d83961dd3c1ac88b59b2dc327aa4',
    verificationStatus: 'UNDER_REVIEW',
    sourceReference: 'Triangulated BTS CDR Sector Log #BTS-PNE-CMP-09',
    rawSnippet: 'MSISDN: +9198231XXXX1 | BTS_AZIMUTH: 120deg | DISTANCE_EST: 280m | DWELL: 115 mins',
    details: {
      overlapWith: 'Phone-102 (Sameer Shah) within 350 meters',
      coLocationTime: '17:15 to 19:10 IST'
    }
  },
  {
    id: 'EVD-FIR-089',
    caseId: 'CASE-26189-001',
    sourceType: 'FIR',
    date: '2026-06-15 09:00 IST',
    relatedEntityId: 'ENT-CS-01',
    targetEntityId: 'ENT-PH-02',
    relationship: 'Extortion Messages Sent from Phone-102',
    confidence: 95,
    integrityHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    verificationStatus: 'VERIFIED',
    sourceReference: 'NCRB Cyber Portal Complaint #NCRB-2026-WSD-0042',
    rawSnippet: 'FIR No 089/2026 PS Cyber Pune. Complainant states harassment and ransom demands delivered via mobile number +9198231XXXX2.',
    details: {
      ipcSections: 'IPC 384, 506, 509, IT Act 66D',
      priority: 'Women Safety High Priority Escalation'
    }
  },
  {
    id: 'EVD-ANPR-402',
    caseId: 'CASE-26189-001',
    sourceType: 'SURVEILLANCE_REPORT',
    date: '2026-06-14 16:30 IST',
    relatedEntityId: 'ENT-VH-01',
    targetEntityId: 'ENT-P-01',
    relationship: 'Driver Identified as Arjun Mehta',
    confidence: 87,
    integrityHash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    verificationStatus: 'AI_DETECTED',
    sourceReference: 'Smart City Traffic Camera ANPR-PNE-BNR-11',
    rawSnippet: 'PLATE: MH-12-AB-1234 | OCR_CONFIDENCE: 98% | FACIAL_COMPARISON_INDEX: 0.87 vs Arjun Mehta passport profile',
    details: {
      movementVector: 'Baner to Camp commercial corridor',
      timestamp: '16:30 IST'
    }
  },
  {
    id: 'EVD-ROC-301',
    caseId: 'CASE-26189-001',
    sourceType: 'PREVIOUS_CASE',
    date: '2026-06-05 16:00 IST',
    relatedEntityId: 'ENT-ORG-01',
    targetEntityId: 'ENT-P-03',
    relationship: 'Directorship Mandate',
    confidence: 99,
    integrityHash: 'fc92225e8ae7c5f87b328a9be3b54d6b5e022f4640167c7674ad949ae3b784a9',
    verificationStatus: 'VERIFIED',
    sourceReference: 'Registrar of Companies (ROC) Corporate Database Extract',
    rawSnippet: 'DIN: 08912341 | NAME: Rohan Kulkarni | APPOINTMENT_DATE: 12-JAN-2024 | ENTITY: Company Alpha Ltd',
    details: {
      capitalization: 'INR 1,00,000 paid-up capital',
      registeredAddressStatus: 'Virtual shared office suite'
    }
  }
];

export const INITIAL_KEY_PLAYERS: KeyPlayer[] = [
  {
    entityId: 'ENT-P-01',
    name: 'Arjun Mehta',
    networkRole: 'Connector',
    centralityScore: 0.88,
    pageRankScore: 0.24,
    confidence: 94,
    removalImpact: 0.81,
    neutralAssessment: 'High Network Influence: Shows the highest betweenness centrality, bridging communication hubs to field logistics and shell corporate resources. Structurally critical node for coordination.'
  },
  {
    entityId: 'ENT-P-02',
    name: 'Neha Patil',
    networkRole: 'Broker',
    centralityScore: 0.74,
    pageRankScore: 0.19,
    confidence: 89,
    removalImpact: 0.68,
    neutralAssessment: 'Cross-Cluster Intermediary: Operates as an analytical broker connecting telecommunication nodes with downstream banking liquidation channels.'
  },
  {
    entityId: 'ENT-P-03',
    name: 'Rohan Kulkarni',
    networkRole: 'Financial Intermediary',
    centralityScore: 0.62,
    pageRankScore: 0.15,
    confidence: 91,
    removalImpact: 0.54,
    neutralAssessment: 'Banking Channel Anchor: Controls high-throughput current accounts and corporate registrations used for rapid fund velocity.'
  },
  {
    entityId: 'ENT-P-04',
    name: 'Sameer Shah',
    networkRole: 'Cluster Member',
    centralityScore: 0.51,
    pageRankScore: 0.12,
    confidence: 86,
    removalImpact: 0.39,
    neutralAssessment: 'Operational Node: Responsible for field communications, device switching, and physical presence at rendezvous locations.'
  }
];

export const INITIAL_ALIAS_CANDIDATES: AliasCandidate[] = [
  {
    id: 'ALIAS-01',
    canonicalEntityId: 'ENT-P-01',
    canonicalName: 'Arjun Mehta',
    aliasName: 'Rahul Sharma',
    matchConfidence: 87,
    evidenceIndicators: [
      'Shared mobile association (Phone-101 used across both profile names)',
      'Identical co-location footprint at Pune Camp on 14 June',
      'Common financial intermediary association (both linked to Neha Patil)',
      'Similar demographic profile in historical FIR-2024-412 inquiry'
    ],
    status: 'PENDING_VERIFICATION',
    sourceReference: 'Entity Resolution Engine (Graph & Vector Embedding Similarity)'
  },
  {
    id: 'ALIAS-02',
    canonicalEntityId: 'ENT-P-01',
    canonicalName: 'Arjun Mehta',
    aliasName: 'A. Mehta',
    matchConfidence: 96,
    evidenceIndicators: [
      'Consistent initials in corporate banking documentation',
      'Matching signature pattern on Company Alpha lease agreement',
      'Identical PAN partial match prefix'
    ],
    status: 'CONFIRMED',
    sourceReference: 'Document OCR & NLP Name Entity Normalizer'
  },
  {
    id: 'ALIAS-03',
    canonicalEntityId: 'ENT-P-03',
    canonicalName: 'Rohan Kulkarni',
    aliasName: 'Ronnie K.',
    matchConfidence: 79,
    evidenceIndicators: [
      'Identified handle in VoIP chat logs extracted from CDR-104',
      'Linked to remittance reference tag on TX-221',
      'Requires investigator verification before identity merge'
    ],
    status: 'PENDING_VERIFICATION',
    sourceReference: 'Chat Metadata Linguistic Extractor'
  }
];

export const INITIAL_CROSS_MODAL: CrossModalCorrelation[] = [
  {
    id: 'CMC-01',
    title: 'Coordinated Extortion & Rapid Fund Liquidation',
    callActivity: 'Sudden spike of 18 encrypted voice calls between Phone-101 and Phone-102',
    financialActivity: 'INR 18,50,000 instant IMPS transfer from ACC-201 to ACC-202 within 4 minutes',
    locationActivity: 'Both primary mobile devices register simultaneously in Pune Camp 400m cell sector',
    correlatedSignal: 'Multi-channel convergence suggests synchronized field extortion call followed by immediate treasury cash extraction.',
    confidence: 93,
    evidenceIds: ['EVD-CDR-104', 'EVD-FIN-201', 'EVD-LOC-087'],
    status: 'VERIFIED',
    timestamp: '2026-06-13 14:30 IST'
  },
  {
    id: 'CMC-02',
    title: 'Vehicle Escort and Device Rendezvous',
    callActivity: 'Brief 30-second handshake calls prior to movement',
    financialActivity: 'ATM cash withdrawal of INR 4,20,000 recorded',
    locationActivity: 'Vehicle MH-12-AB-1234 ANPR detection coincides with mobile tower handoffs',
    correlatedSignal: 'Coordinated physical meeting observed at rendezvous sector following financial transaction clearance.',
    confidence: 86,
    evidenceIds: ['EVD-ANPR-402', 'EVD-LOC-087'],
    status: 'UNDER_REVIEW',
    timestamp: '2026-06-14 17:45 IST'
  }
];

export const INITIAL_ANOMALIES: AnomalyAlert[] = [
  {
    id: 'ANOM-01',
    caseId: 'CASE-26189-001',
    title: 'Sudden Communication Velocity Burst',
    type: 'COMMUNICATION_SPIKE',
    severity: 'HIGH',
    description: 'Call frequency increased by 420% between Phone-101 and Phone-102 over a 3-hour window prior to filing of FIR-2026-089.',
    timestamp: '2026-06-12 21:00 IST',
    entitiesInvolved: ['ENT-PH-01', 'ENT-PH-02'],
    confidence: 92,
    verificationStatus: 'UNDER_REVIEW'
  },
  {
    id: 'ANOM-02',
    caseId: 'CASE-26189-001',
    title: 'Abnormal Financial Liquidity Velocity',
    type: 'UNUSUAL_TRANSACTION_BURST',
    severity: 'HIGH',
    description: 'Corporate account ACC-201, dormant for 4 months, processed INR 18.5 Lakhs which was liquidated to private accounts in under 5 minutes.',
    timestamp: '2026-06-13 14:25 IST',
    entitiesInvolved: ['ENT-BA-01', 'ENT-BA-02', 'ENT-TX-01'],
    confidence: 97,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'ANOM-03',
    caseId: 'CASE-26189-001',
    title: 'Co-Location Clustering Anomaly',
    type: 'SHARED_LOCATION_ANOMALY',
    severity: 'MEDIUM',
    description: 'Three distinct target devices converged at Pune Camp within a 15-minute window without prior open-channel coordination.',
    timestamp: '2026-06-14 17:20 IST',
    entitiesInvolved: ['ENT-P-01', 'ENT-P-04', 'ENT-LOC-01'],
    confidence: 88,
    verificationStatus: 'UNDER_REVIEW'
  }
];

export const INITIAL_FINDINGS: Finding[] = [
  {
    id: 'FIND-01',
    caseId: 'CASE-26189-001',
    title: 'Arjun Mehta and Sameer Shah show repeated communication and co-location during the extortion window',
    leadDescription: 'AI correlation analysis identified 42 phone calls and overlapping cell tower telemetry between Phone-101 and Phone-102 coinciding with intimidation demands sent to complainant.',
    evidenceIds: ['EVD-CDR-104', 'EVD-LOC-087', 'EVD-FIR-089'],
    confidence: 91,
    status: 'VERIFIED',
    timestamp: '2026-06-15 10:15 IST',
    whyDetected: [
      'Same phone association established via subscriber IMEI records',
      'Repeated bilateral communication logged across 7 continuous days',
      'Shared location at Pune Camp within a 400m cell sector window',
      'Direct correlation with timestamps cited in complainant FIR'
    ]
  },
  {
    id: 'FIND-02',
    caseId: 'CASE-26189-001',
    title: 'Neha Patil functions as financial liaison between corporate shell entity and secondary accounts',
    leadDescription: 'Cross-modal analysis shows fund transfers from Company Alpha account ACC-201 routing directly to Neha Patil account ACC-202 immediately following coordination meetings.',
    evidenceIds: ['EVD-FIN-201', 'EVD-ROC-301'],
    confidence: 88,
    status: 'UNDER_REVIEW',
    timestamp: '2026-06-15 11:30 IST',
    whyDetected: [
      'Direct electronic fund transfer link between ACC-201 and ACC-202',
      'Temporal correlation with executive calls from Arjun Mehta',
      'Corporate registry records confirming signatory control'
    ]
  },
  {
    id: 'FIND-03',
    caseId: 'CASE-26189-001',
    title: 'Vehicle MH-12-AB-1234 serves as shared transport across Pune operational zones',
    leadDescription: 'ANPR traffic feeds matched the corporate-registered vehicle at both Baner commercial center and Pune Camp rendezvous during critical event timestamps.',
    evidenceIds: ['EVD-ANPR-402', 'EVD-LOC-087'],
    confidence: 84,
    status: 'AI_DETECTED',
    timestamp: '2026-06-15 12:45 IST',
    whyDetected: [
      'High-confidence ANPR plate read (98%) on Pune expressway corridors',
      'Temporal proximity to mobile device handoffs of Arjun Mehta',
      'Corporate registration directly linked to Company Alpha Ltd'
    ]
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'TL-01',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-10 10:00 IST',
    dateStr: '10 June 2026',
    timeStr: '10:00 IST',
    type: 'COMMUNICATION',
    title: 'Phone-101 Activated',
    sourceEntity: 'ENT-P-01',
    targetEntity: 'ENT-PH-01',
    description: 'Device registered to Arjun Mehta logs initial BTS connection at Shivajinagar.',
    evidenceId: 'EVD-CDR-101',
    confidence: 96
  },
  {
    id: 'TL-02',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-11 14:10 IST',
    dateStr: '11 June 2026',
    timeStr: '14:10 IST',
    type: 'COMMUNICATION',
    title: 'Burner SIM Paired with Phone-102',
    sourceEntity: 'ENT-P-04',
    targetEntity: 'ENT-PH-02',
    description: 'Sameer Shah hardware IMEI associated with secondary carrier SIM.',
    evidenceId: 'EVD-CDR-105',
    confidence: 91
  },
  {
    id: 'TL-03',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-12 18:44 IST',
    dateStr: '12 June 2026',
    timeStr: '18:44 IST',
    type: 'COMMUNICATION',
    title: 'High-Frequency Call Cluster Initiated',
    sourceEntity: 'ENT-PH-01',
    targetEntity: 'ENT-PH-02',
    description: '42 encrypted calls logged between primary coordinator and field runner.',
    evidenceId: 'EVD-CDR-104',
    confidence: 94
  },
  {
    id: 'TL-04',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-13 14:22 IST',
    dateStr: '13 June 2026',
    timeStr: '14:22 IST',
    type: 'FINANCIAL',
    title: 'Instant Electronic Transfer TX-221',
    sourceEntity: 'ENT-BA-01',
    targetEntity: 'ENT-BA-02',
    description: 'INR 18,50,000 debited from Company Alpha account and credited to Neha Patil account.',
    evidenceId: 'EVD-FIN-201',
    confidence: 98
  },
  {
    id: 'TL-05',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-14 16:30 IST',
    dateStr: '14 June 2026',
    timeStr: '16:30 IST',
    type: 'VEHICLE',
    title: 'Vehicle Movement Tracked',
    sourceEntity: 'ENT-VH-01',
    targetEntity: 'ENT-P-01',
    description: 'Silver SUV MH-12-AB-1234 recorded by ANPR camera heading towards Camp.',
    evidenceId: 'EVD-ANPR-402',
    confidence: 87
  },
  {
    id: 'TL-06',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-14 17:15 IST',
    dateStr: '14 June 2026',
    timeStr: '17:15 IST',
    type: 'LOCATION',
    title: 'Convergence at Pune Camp',
    sourceEntity: 'ENT-P-01',
    targetEntity: 'ENT-LOC-01',
    description: 'Multiple targets logged at rendezvous location during identical time window.',
    evidenceId: 'EVD-LOC-087',
    confidence: 92
  },
  {
    id: 'TL-07',
    caseId: 'CASE-26189-001',
    timestamp: '2026-06-15 09:00 IST',
    dateStr: '15 June 2026',
    timeStr: '09:00 IST',
    type: 'CASE',
    title: 'FIR-2026-089 Registered',
    sourceEntity: 'ENT-CS-01',
    targetEntity: 'ENT-PH-02',
    description: 'Complainant registers formal cyber extortion complaint with Pune Cyber Cell.',
    evidenceId: 'EVD-FIR-089',
    confidence: 99
  }
];

export const INITIAL_LOCATIONS: LocationHotspot[] = [
  {
    id: 'HOT-01',
    caseId: 'CASE-26189-001',
    name: 'Pune Camp Sector 4',
    address: 'Commercial Hub, MG Road / Camp Area, Pune',
    coordinates: { lat: 18.5204, lng: 73.8770, xPercent: 54, yPercent: 48 },
    relatedPersons: ['Arjun Mehta', 'Sameer Shah'],
    eventsCount: 8,
    timePeriod: '12 June - 14 June 2026',
    evidenceIds: ['EVD-LOC-087', 'EVD-LOC-088'],
    category: 'Rendezvous'
  },
  {
    id: 'HOT-02',
    caseId: 'CASE-26189-001',
    name: 'Shivajinagar Junction',
    address: 'Near Central Railway Station / Bus Terminus, Pune',
    coordinates: { lat: 18.5314, lng: 73.8446, xPercent: 42, yPercent: 36 },
    relatedPersons: ['Arjun Mehta'],
    eventsCount: 14,
    timePeriod: '10 June - 15 June 2026',
    evidenceIds: ['EVD-CDR-101'],
    category: 'Communication Cell'
  },
  {
    id: 'HOT-03',
    caseId: 'CASE-26189-001',
    name: 'Baner Commercial Complex',
    address: 'High Street Arcade, Baner, Pune',
    coordinates: { lat: 18.5590, lng: 73.7868, xPercent: 25, yPercent: 28 },
    relatedPersons: ['Neha Patil', 'Rohan Kulkarni'],
    eventsCount: 6,
    timePeriod: '05 June - 14 June 2026',
    evidenceIds: ['EVD-ANPR-402', 'EVD-ROC-301'],
    category: 'Corporate Front'
  },
  {
    id: 'HOT-04',
    caseId: 'CASE-26189-001',
    name: 'Hadapsar Industrial Estate',
    address: 'Sector 3, Hadapsar, Pune',
    coordinates: { lat: 18.5089, lng: 73.9259, xPercent: 78, yPercent: 62 },
    relatedPersons: ['Rohan Kulkarni', 'Sameer Shah'],
    eventsCount: 4,
    timePeriod: '08 June - 13 June 2026',
    evidenceIds: ['EVD-FIN-201'],
    category: 'Cash Drop'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-991',
    timestamp: '2026-06-15 08:30:14 IST',
    user: 'INV-4412 (Insp. Vikram Rathod)',
    role: 'Lead Investigating Officer',
    action: 'Case Initialized with Legal Authorization Warrant #W-2026-401',
    entityOrCase: 'CASE-26189-001',
    result: 'Authorized and Verified',
    accessStatus: 'Authorized',
    integrityHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'AUD-992',
    timestamp: '2026-06-15 08:35:42 IST',
    user: 'INV-4412 (Insp. Vikram Rathod)',
    role: 'Lead Investigating Officer',
    action: 'Ingested Telecom Tower CDR dataset (12,480 raw records parsed)',
    entityOrCase: 'EVD-CDR-104',
    result: 'SHA-256 Hash Generated and Locked',
    accessStatus: 'Authorized',
    integrityHash: 'a7c9f831b2d4e5f6081947bca31024bc681029384756abcdef9876543210fedc'
  },
  {
    id: 'AUD-993',
    timestamp: '2026-06-15 09:12:19 IST',
    user: 'SYSTEM_AI_NLP_RESOLVER',
    role: 'Automated Extraction Engine',
    action: 'Entity Detection & Cross-Modal Correlation Proposed',
    entityOrCase: 'FIND-01',
    result: 'Confidence 91% Marked Pending Human Verification',
    accessStatus: 'Authorized',
    integrityHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'AUD-994',
    timestamp: '2026-06-15 10:18:05 IST',
    user: 'INV-4412 (Insp. Vikram Rathod)',
    role: 'Lead Investigating Officer',
    action: 'Human Verification Action: Verified Relationship REL-02 (Called)',
    entityOrCase: 'ENT-PH-01 -> ENT-PH-02',
    result: 'Status changed from AI_DETECTED to VERIFIED',
    accessStatus: 'Authorized',
    integrityHash: '8f434346648f6b96df89dda901c5176b10e6d83961dd3c1ac88b59b2dc327aa4'
  },
  {
    id: 'AUD-995',
    timestamp: '2026-06-15 11:42:33 IST',
    user: 'ANALYST-810 (S. Deshmukh)',
    role: 'Intelligence Analyst',
    action: 'Inspected Alias Candidate ALIAS-01 (Rahul Sharma <-> Arjun Mehta)',
    entityOrCase: 'ALIAS-01',
    result: 'Evidence dossier reviewed; Kept in PENDING_VERIFICATION state',
    accessStatus: 'Authorized',
    integrityHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
  }
];

export const INITIAL_INGESTED_DOCS: IngestedDocument[] = [
  {
    id: 'DOC-01',
    title: 'Cyber Crime PS FIR No 089/2026 Extract',
    sourceType: 'FIR',
    timestamp: '2026-06-15 08:45 IST',
    legalGateStatus: 'PASSED',
    courtWarrantOrAuthId: 'AUTH-MH-PNE-2026-4018',
    rawText: 'Complainant Priya Verma reported repeated coercive phone calls originating from mobile number +91-98231-XXXX2 demanding extortion payments to Axis Bank account ACC-201. Primary suspect referenced as Rahul Sharma alias Arjun Mehta, reportedly seen meeting associates at Pune Camp commercial complex.',
    entities: [
      { text: 'Priya Verma', type: 'PERSON', confidence: 99 },
      { text: '+91-98231-XXXX2', type: 'PHONE', confidence: 96 },
      { text: 'ACC-201', type: 'BANK_ACCOUNT', confidence: 95 },
      { text: 'Rahul Sharma', type: 'PERSON', confidence: 92 },
      { text: 'Arjun Mehta', type: 'PERSON', confidence: 94 },
      { text: 'Pune Camp', type: 'LOCATION', confidence: 93 }
    ],
    relationships: [
      { source: 'Rahul Sharma', target: '+91-98231-XXXX2', type: 'ASSOCIATED', confidence: 91 },
      { source: '+91-98231-XXXX2', target: 'ACC-201', type: 'MENTIONED', confidence: 94 },
      { source: 'Arjun Mehta', target: 'Pune Camp', type: 'VISITED', confidence: 89 }
    ]
  },
  {
    id: 'DOC-02',
    title: 'Surveillance & ANPR Intelligence Report #SR-88',
    sourceType: 'SURVEILLANCE_REPORT',
    timestamp: '2026-06-14 19:00 IST',
    legalGateStatus: 'PASSED',
    courtWarrantOrAuthId: 'AUTH-MH-PNE-2026-4022',
    rawText: 'On 14 June at 16:30 IST, silver SUV vehicle MH-12-AB-1234 registered to Company Alpha Ltd was observed departing Baner towards Pune Camp. Driver matched facial telemetry for Arjun Mehta. Telecommunications runner Sameer Shah using Phone-102 arrived on foot 15 minutes later.',
    entities: [
      { text: 'MH-12-AB-1234', type: 'VEHICLE', confidence: 98 },
      { text: 'Company Alpha Ltd', type: 'ORGANIZATION', confidence: 96 },
      { text: 'Baner', type: 'LOCATION', confidence: 95 },
      { text: 'Pune Camp', type: 'LOCATION', confidence: 95 },
      { text: 'Arjun Mehta', type: 'PERSON', confidence: 90 },
      { text: 'Sameer Shah', type: 'PERSON', confidence: 93 },
      { text: 'Phone-102', type: 'PHONE', confidence: 94 }
    ],
    relationships: [
      { source: 'Company Alpha Ltd', target: 'MH-12-AB-1234', type: 'OWNED', confidence: 96 },
      { source: 'Arjun Mehta', target: 'MH-12-AB-1234', type: 'VISITED', confidence: 88 },
      { source: 'Sameer Shah', target: 'Phone-102', type: 'OWNED', confidence: 92 }
    ]
  }
];

// Export aliases for backwards compatibility
export const MOCK_CASE = INITIAL_CASE;
export const MOCK_ENTITIES = INITIAL_ENTITIES;
export const MOCK_RELATIONSHIPS = INITIAL_RELATIONSHIPS;
export const MOCK_EVIDENCE = INITIAL_EVIDENCE;
export const MOCK_TIMELINE = INITIAL_TIMELINE;
export const MOCK_ALIAS_RESOLUTIONS = [
  {
    id: 'ALIAS-01',
    primaryName: 'Arjun Mehta',
    aliasName: 'Rahul Sharma',
    confidence: 87,
    reasons: [
      'Shared mobile association (Phone-101 used across both profile names)',
      'Identical co-location footprint at Pune Camp on 14 June',
      'Common financial intermediary association (both linked to Neha Patil)',
      'Similar demographic profile in historical FIR-2024-412 inquiry'
    ],
    evidenceSources: ['CDR-104', 'EVD-LOC-087', 'FIR-089'],
    status: 'PENDING_REVIEW' as const
  },
  {
    id: 'ALIAS-02',
    primaryName: 'Arjun Mehta',
    aliasName: 'A. Mehta',
    confidence: 96,
    reasons: [
      'Consistent initials in corporate banking documentation',
      'Matching signature pattern on Company Alpha lease agreement',
      'Identical PAN partial match prefix'
    ],
    evidenceSources: ['ROC-301', 'Axis Bank STR-221'],
    status: 'CONFIRMED_MERGED' as const
  },
  {
    id: 'ALIAS-03',
    primaryName: 'Rohan Kulkarni',
    aliasName: 'Ronnie K.',
    confidence: 79,
    reasons: [
      'Identified handle in VoIP chat logs extracted from CDR-104',
      'Linked to remittance reference tag on TX-221',
      'Requires investigator verification before identity merge'
    ],
    evidenceSources: ['VoIP Telemetry Dump #88'],
    status: 'PENDING_REVIEW' as const
  }
];
export const MOCK_ANOMALIES = INITIAL_ANOMALIES;
export const MOCK_FINDINGS = INITIAL_FINDINGS;
export const MOCK_AUDIT_LOGS = [
  {
    id: 'AUD-991',
    timestamp: '2026-06-15 08:30:14 IST',
    user: 'Insp. Vikram Rathod',
    badge: 'NCRB-WSD-4412',
    role: 'Lead Investigating Officer',
    action: 'LOGIN',
    target: 'CASE-26189-001',
    justification: 'Court Order & NCRB Special Directive',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'AUD-992',
    timestamp: '2026-06-15 08:35:42 IST',
    user: 'Insp. Vikram Rathod',
    badge: 'NCRB-WSD-4412',
    role: 'Lead Investigating Officer',
    action: 'INGEST_DOCUMENT',
    target: 'EVD-CDR-104',
    justification: 'Tower dump warrant Sect-91 CrPC',
    hash: 'a7c9f831b2d4e5f6081947bca31024bc681029384756abcdef9876543210fedc'
  },
  {
    id: 'AUD-993',
    timestamp: '2026-06-15 09:12:19 IST',
    user: 'System Automated Engine',
    badge: 'SYS-AI-01',
    role: 'AI Extraction Engine',
    action: 'EXPAND_NETWORK',
    target: 'FIND-01',
    justification: 'Automated 2-hop topological correlation',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'AUD-994',
    timestamp: '2026-06-15 10:18:05 IST',
    user: 'Insp. Vikram Rathod',
    badge: 'NCRB-WSD-4412',
    role: 'Lead Investigating Officer',
    action: 'VERIFY_FINDING',
    target: 'REL-02 (Phone-101 -> Phone-102)',
    justification: 'Telecom operator corroborated call detail record',
    hash: '8f434346648f6b96df89dda901c5176b10e6d83961dd3c1ac88b59b2dc327aa4'
  }
];
export const MOCK_INGESTED_DOCUMENTS = INITIAL_INGESTED_DOCS;

