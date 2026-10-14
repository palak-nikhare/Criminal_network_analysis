import {
  InvestigationCase,
  Entity,
  Relationship,
  Evidence,
  TimelineEvent,
  AliasResolution,
  AnomalyAlert,
  Finding
} from '../types';

export interface CaseOption {
  id: string;
  code: string;
  title: string;
  city: 'Pune' | 'Mumbai' | 'Delhi';
  status: string;
  division: string;
  officer: string;
  summary: string;
  badgeNumber: string;
  createdAt: string;
  confidenceScore: number;
}

export interface SyntheticLocation {
  id: string;
  name: string;
  fullAddress: string;
  coords: { x: number; y: number };
  labelOffset: { x: number; y: number; align: 'left' | 'right' | 'center' };
  personsCount: number;
  eventsCount: number;
  vehiclesCount: number;
  casesCount: number;
  activityPeriod: string;
  persons: string[];
  vehicles: string[];
  events: string[];
  coPresenceConfidence: number;
  hotspotType: 'Primary Rendezvous' | 'Shell Corporate Office' | 'Transit Interchange' | 'Dead Drop Point';
}

export interface CaseEvidenceItem {
  id: string;
  caseId: string;
  typeBadge: string;
  typeName: string;
  date: string;
  fullDate: string;
  mainRelationship: string;
  confidence: number;
  entities: string[];
  rawRecord: string;
  source: string;
  integrity: string;
  whyItMatters: string;
}

export interface CaseDataBundle {
  caseInfo: CaseOption;
  caseData: InvestigationCase;
  entities: Entity[];
  relationships: Relationship[];
  evidenceItems: CaseEvidenceItem[];
  evidence: Evidence[];
  timelineEvents: TimelineEvent[];
  locations: SyntheticLocation[];
  aliasResolutions: AliasResolution[];
  anomalies: AnomalyAlert[];
  findings: Finding[];
}

export const AVAILABLE_CASES: CaseOption[] = [
  {
    id: 'FIR-2026-089',
    code: 'FIR-2026-089',
    title: 'Cyber Crime Investigation',
    city: 'Pune',
    status: 'Active Investigation',
    division: 'Cyber Crime Police Station, Pune City',
    officer: 'Insp. Vikram Rathod',
    badgeNumber: 'NCRB-WSD-4412',
    createdAt: '2026-06-15 08:30 IST',
    confidenceScore: 94,
    summary: 'Investigating a coordinated cyber-financial syndicate operating through shell entities, burner SIMs, and rapid bank transfers across the Pune district.'
  },
  {
    id: 'FIR-2026-102',
    code: 'FIR-2026-102',
    title: 'Coastal Hawala Liquidation & Shell Matrix',
    city: 'Mumbai',
    status: 'Forensic Audit & Asset Freezing',
    division: 'Economic Offences Wing, Mumbai Police',
    officer: 'ACP Devendra Sawant',
    badgeNumber: 'MUM-EOW-8819',
    createdAt: '2026-05-18 10:15 IST',
    confidenceScore: 96,
    summary: 'Tracking unrecorded cash tranches and maritime freight shell documentation funneled through Colaba, Nariman Point, and Bandra Kurla Complex (BKC).'
  },
  {
    id: 'FIR-2026-115',
    code: 'FIR-2026-115',
    title: 'NCR Cyber Extortion & Burner SIM Racket',
    city: 'Delhi',
    status: 'Active Tracking & Device Intercept',
    division: 'Special Cell & Cyber Crime Unit, Delhi Police',
    officer: 'DCP Rajeshwar Sharma',
    badgeNumber: 'DEL-SPEC-1104',
    createdAt: '2026-04-02 14:00 IST',
    confidenceScore: 92,
    summary: 'Multi-state cyber extortion syndicate orchestrating automated VoIP spoofing calls, fake digital arrest threats, and TRC-20 cryptocurrency laundering across Delhi NCR.'
  }
];

// ============================================================================
// DATASET 1: FIR-2026-089 — PUNE
// ============================================================================
const PUNE_BUNDLE: CaseDataBundle = {
  caseInfo: AVAILABLE_CASES[0],
  caseData: {
    id: 'FIR-2026-089',
    title: 'Cyber Crime Investigation',
    status: 'Under Investigation',
    investigatingOfficer: 'Insp. Vikram Rathod',
    badgeNumber: 'NCRB-WSD-4412',
    createdAt: '2026-06-15 08:30 IST',
    entitiesCount: 10,
    relationshipsCount: 12,
    evidenceCount: 6,
    confidenceScore: 94,
    summary: 'Investigating a coordinated cyber-financial extortion network operating through shell entities, burner SIMs, and rapid bank transfers across Pune district.',
    division: 'Cyber Crime Police Station, Pune City'
  },
  entities: [
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
      connectedCount: 5,
      caseIds: ['FIR-2026-089']
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
      connectedCount: 4,
      caseIds: ['FIR-2026-089']
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
        occupation: 'Director (Company Alpha)',
        knownResidence: 'Hadapsar, Pune',
        primaryAccountRef: 'ACC-201',
        riskIndicator: 'Layered Banking Operations'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-089']
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
        occupation: 'Hardware Courier',
        knownResidence: 'Pune Camp',
        primaryPhoneRef: 'Phone-102 (Burner)',
        riskIndicator: 'Burner Handset Custodian'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-089']
    },
    {
      id: 'ENT-PH-01',
      type: 'PHONE',
      name: 'Phone-101 (+91-98231-XXXX1)',
      label: 'Phone-101',
      confidence: 96,
      details: {
        number: '+91-98231-XXXX1',
        imei: '359201048821901',
        carrier: 'Telecom Corp Alpha',
        towerLocation: 'Shivajinagar Hub'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-089']
    },
    {
      id: 'ENT-PH-02',
      type: 'PHONE',
      name: 'Phone-102 (+91-98231-XXXX2)',
      label: 'Phone-102 (Burner)',
      confidence: 94,
      details: {
        number: '+91-98231-XXXX2',
        imei: '867102049100889',
        carrier: 'Telecom Corp Beta',
        towerLocation: 'Pune Camp'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-089']
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
      connectedCount: 3,
      caseIds: ['FIR-2026-089']
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
      connectedCount: 2,
      caseIds: ['FIR-2026-089']
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
        registeredOwner: 'Company Alpha Ltd'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-089']
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
      connectedCount: 3,
      caseIds: ['FIR-2026-089']
    }
  ],
  relationships: [
    {
      id: 'REL-PNE-01',
      source: 'ENT-P-01',
      target: 'ENT-PH-01',
      type: 'OWNED',
      timestamp: '2026-06-10 10:00 IST',
      confidence: 96,
      sourceEvidenceId: 'EVD-CDR-104',
      verificationStatus: 'VERIFIED',
      explanation: 'Subscriber KYC and persistent cell-tower telemetry match residence of Arjun Mehta.'
    },
    {
      id: 'REL-PNE-02',
      source: 'ENT-PH-01',
      target: 'ENT-PH-02',
      type: 'CALLED',
      timestamp: '2026-06-12 18:44 IST',
      confidence: 94,
      sourceEvidenceId: 'EVD-CDR-104',
      verificationStatus: 'VERIFIED',
      explanation: '42 voice calls logged over 7 days prior to major banking transfer.'
    },
    {
      id: 'REL-PNE-03',
      source: 'ENT-P-04',
      target: 'ENT-PH-02',
      type: 'OWNED',
      timestamp: '2026-06-11 11:15 IST',
      confidence: 91,
      sourceEvidenceId: 'EVD-CDR-104',
      verificationStatus: 'VERIFIED',
      explanation: 'Device handset IMEI swapped with Sameer Shah historical SIM on multiple occasions.'
    },
    {
      id: 'REL-PNE-04',
      source: 'ENT-P-01',
      target: 'ENT-P-02',
      type: 'ASSOCIATED',
      timestamp: '2026-06-12 19:30 IST',
      confidence: 88,
      sourceEvidenceId: 'EVD-LOC-087',
      verificationStatus: 'VERIFIED',
      explanation: 'Surveillance logs and communication exchange confirm frequent planning meetings.'
    },
    {
      id: 'REL-PNE-05',
      source: 'ENT-P-02',
      target: 'ENT-BA-02',
      type: 'OWNED',
      timestamp: '2026-06-12 10:30 IST',
      confidence: 93,
      sourceEvidenceId: 'EVD-FIN-201',
      verificationStatus: 'VERIFIED',
      explanation: 'Primary account holder signatory in HDFC Baner branch records.'
    },
    {
      id: 'REL-PNE-06',
      source: 'ENT-BA-01',
      target: 'ENT-BA-02',
      type: 'TRANSFERRED',
      timestamp: '2026-06-13 14:22 IST',
      confidence: 98,
      sourceEvidenceId: 'EVD-FIN-201',
      verificationStatus: 'VERIFIED',
      explanation: 'Originating IMPS transfer of INR 18,50,000 executed to pass-through account.'
    },
    {
      id: 'REL-PNE-07',
      source: 'ENT-P-03',
      target: 'ENT-BA-01',
      type: 'SIGNATORY',
      timestamp: '2026-06-05 16:00 IST',
      confidence: 99,
      sourceEvidenceId: 'EVD-ROC-301',
      verificationStatus: 'VERIFIED',
      explanation: 'Authorized company director and signatory on corporate bank account.'
    },
    {
      id: 'REL-PNE-08',
      source: 'ENT-P-01',
      target: 'ENT-VH-01',
      type: 'OPERATES',
      timestamp: '2026-06-14 16:30 IST',
      confidence: 87,
      sourceEvidenceId: 'EVD-ANPR-402',
      verificationStatus: 'VERIFIED',
      explanation: 'Camera feed caught Arjun Mehta driving vehicle MH-12-AB-1234.'
    },
    {
      id: 'REL-PNE-09',
      source: 'ENT-VH-01',
      target: 'ENT-LOC-01',
      type: 'SIGHTED_AT',
      timestamp: '2026-06-14 17:15 IST',
      confidence: 92,
      sourceEvidenceId: 'EVD-LOC-087',
      verificationStatus: 'VERIFIED',
      explanation: 'ANPR camera at East Street Camp confirmed entry and parking dwell time.'
    },
    {
      id: 'REL-PNE-10',
      source: 'ENT-P-01',
      target: 'ENT-LOC-01',
      type: 'VISITED',
      timestamp: '2026-06-14 17:15 IST',
      confidence: 94,
      sourceEvidenceId: 'EVD-LOC-087',
      verificationStatus: 'VERIFIED',
      explanation: 'Cell tower sector dwell log corroborates physical meeting attendance.'
    }
  ],
  evidenceItems: [
    {
      id: 'EVD-CDR-104',
      caseId: 'FIR-2026-089',
      typeBadge: 'CALL RECORD',
      typeName: 'Call Detail Record',
      date: '12 Jun 2026',
      fullDate: '12 June 2026, 18:44 IST',
      mainRelationship: 'Phone-101 → Phone-102',
      confidence: 94,
      entities: ['Phone-101', 'Phone-102'],
      rawRecord: 'CLI: +9198231XXXX1\nB-PARTY: +9198231XXXX2\nDuration: 184 seconds\nCell ID: PNE-SHIV-04',
      source: 'Telecom Tower Audit Report T-2026-Pune',
      integrity: 'Verified (Admissible under Sec 65B)',
      whyItMatters: 'Supports the communication relationship between the connected entities.'
    },
    {
      id: 'EVD-FIN-201',
      caseId: 'FIR-2026-089',
      typeBadge: 'FINANCIAL RECORD',
      typeName: 'Bank Wire Transfer Audit',
      date: '13 Jun 2026',
      fullDate: '13 June 2026, 14:22 IST',
      mainRelationship: 'ACC-201 → ACC-202',
      confidence: 98,
      entities: ['ACC-201', 'ACC-202'],
      rawRecord: 'TXN_ID: IMPS91823112 -> 50100874\nAmount: INR 18,50,000.00\nGateway: Pune IP Gateway\nMode: Instant IMPS Liquidation',
      source: 'FIU-IND Suspicious Transaction Report STR-2026-881',
      integrity: 'Verified (Core Banking Gateway Confirmation)',
      whyItMatters: 'Confirms rapid fund dispersal between primary syndicate accounts within minutes of logged phone calls.'
    },
    {
      id: 'EVD-LOC-087',
      caseId: 'FIR-2026-089',
      typeBadge: 'LOCATION RECORD',
      typeName: 'Cell Tower Triangulation Log',
      date: '14 Jun 2026',
      fullDate: '14 June 2026, 17:15 IST',
      mainRelationship: 'Arjun Mehta → Pune Camp',
      confidence: 92,
      entities: ['Arjun Mehta', 'Pune Camp'],
      rawRecord: 'MSISDN: +9198231XXXX1\nBTS Sector: 120 deg azimuth\nDistance Estimate: 280m\nDwell Time: 115 minutes',
      source: 'Triangulated BTS CDR Sector Log #BTS-PNE-CMP-09',
      integrity: 'Verified (Cellular Carrier Radio Audit)',
      whyItMatters: 'Establishes physical presence and co-location dwell time of primary organizer at key rendezvous hotspot.'
    },
    {
      id: 'EVD-FIR-089',
      caseId: 'FIR-2026-089',
      typeBadge: 'COMPLAINT DOCKET',
      typeName: 'First Information Report (FIR)',
      date: '15 Jun 2026',
      fullDate: '15 June 2026, 09:00 IST',
      mainRelationship: 'Phone-102 → Extortion Victim',
      confidence: 95,
      entities: ['Phone-102', 'Extortion Victim'],
      rawRecord: 'FIR No 089/2026 PS Cyber Pune\nComplainant states repeated ransom demands delivered via mobile number +9198231XXXX2\nSections: IT Act 66D, IPC 384',
      source: 'NCRB Cyber Portal Complaint #NCRB-2026-WSD-0042',
      integrity: 'Verified (Cognizable Crime Police Docket)',
      whyItMatters: 'Originating legal complaint establishing predicate offenses and identifying the primary burner communications device.'
    },
    {
      id: 'EVD-ANPR-402',
      caseId: 'FIR-2026-089',
      typeBadge: 'VEHICLE SIGHTING',
      typeName: 'Automatic Number Plate Recognition (ANPR)',
      date: '14 Jun 2026',
      fullDate: '14 June 2026, 16:30 IST',
      mainRelationship: 'Vehicle MH-12-AB-1234 → Arjun Mehta',
      confidence: 87,
      entities: ['Vehicle MH-12-AB-1234', 'Arjun Mehta'],
      rawRecord: 'Camera: ANPR-PNE-BNR-11\nPlate: MH-12-AB-1234\nOCR Confidence: 98%\nFacial Index: 0.87 correlation with passport file',
      source: 'Smart City Integrated Traffic Command System',
      integrity: 'Verified (Municipal Camera Feed Log)',
      whyItMatters: 'Corroborates vehicular transit from Baner to Camp prior to the verified physical rendezvous.'
    },
    {
      id: 'EVD-ROC-301',
      caseId: 'FIR-2026-089',
      typeBadge: 'CORPORATE RECORD',
      typeName: 'Company Registry Filing',
      date: '05 Jun 2026',
      fullDate: '05 June 2026, 16:00 IST',
      mainRelationship: 'Company Alpha Ltd → Rohan Kulkarni',
      confidence: 99,
      entities: ['Company Alpha Ltd', 'Rohan Kulkarni'],
      rawRecord: 'DIN: 08912341\nSignatory: Rohan Kulkarni\nEntity: Company Alpha Ltd\nRegistered Address: High Street Baner',
      source: 'Registrar of Companies (ROC) Corporate Database Extract',
      integrity: 'Verified (Ministry of Corporate Affairs Certified)',
      whyItMatters: 'Identifies the legal front company utilized to shield corporate banking activities and shell transactions.'
    }
  ],
  evidence: [],
  timelineEvents: [
    {
      id: 'TL-PNE-01',
      date: '2026-06-11 11:30 IST',
      title: 'Company Alpha Shell Registration',
      description: 'Corporate filings registered at Baner Tech Hub listing Rohan Kulkarni as sole director.',
      type: 'COMPANY',
      entitiesInvolved: ['Rohan Kulkarni', 'Company Alpha Ltd'],
      confidence: 99,
      evidenceRef: 'EVD-ROC-301'
    },
    {
      id: 'TL-PNE-02',
      date: '2026-06-12 18:44 IST',
      title: 'Voice Call Exchange Phone-101 to Burner Phone-102',
      description: 'Arjun Mehta contacted courier handset Phone-102 for 184 seconds.',
      type: 'CALL',
      entitiesInvolved: ['Phone-101', 'Phone-102'],
      confidence: 94,
      evidenceRef: 'EVD-CDR-104'
    },
    {
      id: 'TL-PNE-03',
      date: '2026-06-13 14:22 IST',
      title: 'High Velocity Electronic Transfer (₹18.5 Lakh)',
      description: 'IMPS wire transferred from Axis Current ACC-201 to HDFC Pass-through ACC-202.',
      type: 'TRANSACTION',
      entitiesInvolved: ['ACC-201', 'ACC-202'],
      confidence: 98,
      evidenceRef: 'EVD-FIN-201'
    },
    {
      id: 'TL-PNE-04',
      date: '2026-06-14 16:30 IST',
      title: 'ANPR Camera Capture: Vehicle MH-12-AB-1234',
      description: 'Silver Scorpio logged passing Baner Toll Plaza heading toward Pune Camp.',
      type: 'VEHICLE',
      entitiesInvolved: ['MH-12-AB-1234', 'Arjun Mehta'],
      confidence: 87,
      evidenceRef: 'EVD-ANPR-402'
    },
    {
      id: 'TL-PNE-05',
      date: '2026-06-14 17:15 IST',
      title: 'Physical Rendezvous Co-Location at Pune Camp',
      description: 'Simultaneous cell-tower handoff logged for Arjun Mehta and Sameer Shah.',
      type: 'LOCATION',
      entitiesInvolved: ['Arjun Mehta', 'Sameer Shah'],
      confidence: 92,
      evidenceRef: 'EVD-LOC-087'
    }
  ],
  locations: [
    {
      id: 'LOC-03',
      name: 'BANER TECH HUB',
      fullAddress: 'High Street Corporate Park, Baner, Pune, MH 411045',
      coords: { x: 22, y: 26 },
      labelOffset: { x: 20, y: -24, align: 'left' },
      personsCount: 3,
      eventsCount: 4,
      vehiclesCount: 2,
      casesCount: 1,
      activityPeriod: '10–15 JUN',
      persons: ['Rohan Kulkarni', 'Neha Patil', 'Arjun Mehta'],
      vehicles: ['MH-12-AB-1234 (Scorpio)', 'DL-01-TX-8832 (Honda City)'],
      events: [
        '11 JUN 11:30 - Registered shell office for Company Alpha Ltd established',
        '15 JUN 10:05 - RTGS wire transfer dispatched from corporate terminal IP'
      ],
      coPresenceConfidence: 91,
      hotspotType: 'Shell Corporate Office'
    },
    {
      id: 'LOC-02',
      name: 'SHIVAJINAGAR TRANSIT HUB',
      fullAddress: 'Railway Concourse & Central Bus Depot, Shivajinagar, Pune, MH 411005',
      coords: { x: 44, y: 38 },
      labelOffset: { x: -20, y: -24, align: 'right' },
      personsCount: 2,
      eventsCount: 2,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '12–13 JUN',
      persons: ['Sameer Shah', 'Rohan Kulkarni'],
      vehicles: ['MH-12-AB-1234 (Scorpio)'],
      events: [
        '12 JUN 14:15 - Physical courier bag exchange verified via Station CCTV Cam 4',
        '13 JUN 19:40 - Burner handset ping logged on Cell Tower 401 sector C'
      ],
      coPresenceConfidence: 86,
      hotspotType: 'Transit Interchange'
    },
    {
      id: 'LOC-01',
      name: 'PUNE CAMP',
      fullAddress: 'East Street Commercial Hub, Pune Camp, Pune, MH 411001',
      coords: { x: 60, y: 56 },
      labelOffset: { x: 24, y: 16, align: 'left' },
      personsCount: 4,
      eventsCount: 3,
      vehiclesCount: 2,
      casesCount: 1,
      activityPeriod: '14–16 JUN',
      persons: ['Arjun Mehta', 'Sameer Shah', 'Neha Patil', 'Rohan Kulkarni'],
      vehicles: ['MH-12-AB-1234 (Scorpio)', 'MH-14-CC-9021 (Swift)'],
      events: [
        '14 JUN 09:15 - Vehicle MH-12 entry logged via Toll ANPR Camera',
        '14 JUN 18:30 - Cell tower handoff confirmed for Phone-101 & Phone-102 simultaneously',
        '15 JUN 14:00 - Physical meeting observed in surveillance log at Cafe Rendezvous'
      ],
      coPresenceConfidence: 94,
      hotspotType: 'Primary Rendezvous'
    },
    {
      id: 'LOC-04',
      name: 'HADAPSAR INDUSTRIAL DROP',
      fullAddress: 'Phase 2 Logistics Corridor, Magarpatta Road, Hadapsar, Pune, MH 411028',
      coords: { x: 80, y: 72 },
      labelOffset: { x: -20, y: 16, align: 'right' },
      personsCount: 2,
      eventsCount: 1,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '14 JUN',
      persons: ['Sameer Shah', 'Arjun Mehta'],
      vehicles: ['MH-14-CC-9021 (Swift)'],
      events: [
        '14 JUN 21:00 - ANPR sighting of vehicle exiting logistics lane after dark'
      ],
      coPresenceConfidence: 82,
      hotspotType: 'Dead Drop Point'
    }
  ],
  aliasResolutions: [
    {
      id: 'AL-PNE-01',
      canonicalName: 'Arjun Mehta',
      entityId: 'ENT-P-01',
      suspectedAliases: ['Rahul S.', 'A. Mehta'],
      confidence: 89,
      supportingEvidenceIds: ['EVD-CDR-104', 'EVD-LOC-087'],
      status: 'CONFIRMED_MERGED',
      method: 'Device IMEI cross-correlation & telecom billing address match.'
    }
  ],
  anomalies: [
    {
      id: 'ANOM-PNE-01',
      title: 'High Velocity Electronic Liquidation',
      severity: 'CRITICAL',
      detectedAt: '2026-06-13 14:30 IST',
      description: 'INR 18,50,000 transferred and instantly dispersed within 60 seconds of credit.',
      entitiesInvolved: ['ACC-201', 'ACC-202'],
      recommendedAction: 'Issue immediate asset freeze notice to HDFC Baner branch under PMLA.'
    },
    {
      id: 'ANOM-PNE-02',
      title: 'Co-Location Surveillance Cluster',
      severity: 'HIGH',
      detectedAt: '2026-06-14 18:00 IST',
      description: 'Multiple syndicate participants converged simultaneously at Pune Camp.',
      entitiesInvolved: ['Arjun Mehta', 'Sameer Shah'],
      recommendedAction: 'Subpoena municipal CCTV footage covering East Street intersection.'
    }
  ],
  findings: [
    {
      id: 'FND-PNE-01',
      title: 'Central Command Hub Identified',
      summary: 'Arjun Mehta functions as key bridge between communication burner lines and pass-through bank accounts.',
      confidence: 94,
      category: 'LEAD',
      actionableRecommendation: 'Conduct formal interrogation and execute search warrant on Baner office premises.'
    }
  ]
};

// ============================================================================
// DATASET 2: FIR-2026-102 — MUMBAI
// ============================================================================
const MUMBAI_BUNDLE: CaseDataBundle = {
  caseInfo: AVAILABLE_CASES[1],
  caseData: {
    id: 'FIR-2026-102',
    title: 'Coastal Hawala Liquidation & Shell Matrix',
    status: 'Forensic Audit & Asset Freezing',
    investigatingOfficer: 'ACP Devendra Sawant',
    badgeNumber: 'MUM-EOW-8819',
    createdAt: '2026-05-18 10:15 IST',
    entitiesCount: 10,
    relationshipsCount: 11,
    evidenceCount: 6,
    confidenceScore: 96,
    summary: 'Tracking unrecorded cash tranches and maritime freight shell documentation funneled through Colaba, Nariman Point, and Bandra Kurla Complex (BKC).',
    division: 'Economic Offences Wing, Mumbai Police'
  },
  entities: [
    {
      id: 'ENT-MUM-P01',
      type: 'PERSON',
      name: 'Tariq Merchant',
      label: 'Tariq Merchant',
      aliases: ['Tariq Bhai', 'T.M.'],
      role: 'Hawala Syndicate Controller',
      centralityScore: 0.92,
      pageRankScore: 0.28,
      confidence: 96,
      details: {
        occupation: 'Freight Forwarder (Purported)',
        knownResidence: 'Nariman Point, Mumbai',
        primaryPhoneRef: 'Phone-MUM-01',
        riskIndicator: 'Cross-Border Hawala Settlement'
      },
      connectedCount: 5,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-P02',
      type: 'PERSON',
      name: 'Kabir Vora',
      label: 'Kabir Vora',
      aliases: ['K. Vora'],
      role: 'Shipping & Maritime Liaison',
      centralityScore: 0.76,
      pageRankScore: 0.20,
      confidence: 92,
      details: {
        occupation: 'Customs Clearing Agent',
        knownResidence: 'Colaba, Mumbai',
        primaryPhoneRef: 'Phone-MUM-02',
        riskIndicator: 'Port Entry Pass Facilitator'
      },
      connectedCount: 4,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-P03',
      type: 'PERSON',
      name: 'Sunita Rao',
      label: 'Sunita Rao',
      aliases: ['S. Rao'],
      role: 'Corporate Compliance Director',
      centralityScore: 0.68,
      pageRankScore: 0.17,
      confidence: 94,
      details: {
        occupation: 'Chartered Accountant',
        knownResidence: 'Bandra West, Mumbai',
        primaryAccountRef: 'ACC-MUM-301',
        riskIndicator: 'Offshore Trust Administrator'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-P04',
      type: 'PERSON',
      name: 'Farooq Khan',
      label: 'Farooq Khan',
      aliases: ['F. Khan'],
      role: 'Cash Transit Courier',
      centralityScore: 0.54,
      pageRankScore: 0.13,
      confidence: 88,
      details: {
        occupation: 'Dock Logistics Runner',
        knownResidence: 'Dongri, Mumbai',
        primaryPhoneRef: 'Phone-MUM-03',
        riskIndicator: 'Physical Cash Carrier'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-PH01',
      type: 'PHONE',
      name: 'Phone-MUM-01 (+91-98200-XXXX1)',
      label: 'Phone-MUM-01 (Satellite Line)',
      confidence: 97,
      details: {
        number: '+91-98200-XXXX1',
        imei: '358102930491022',
        carrier: 'International Encrypted VoIP',
        towerLocation: 'Nariman Point BTS'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-PH02',
      type: 'PHONE',
      name: 'Phone-MUM-02 (+91-98200-XXXX2)',
      label: 'Phone-MUM-02 (Port Ops)',
      confidence: 93,
      details: {
        number: '+91-98200-XXXX2',
        imei: '867102930481023',
        carrier: 'Maritime Coastal Telecom',
        towerLocation: 'Ferry Wharf Marine'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-BA01',
      type: 'BANK_ACCOUNT',
      name: 'ACC-MUM-301 (BKC Corporate Escrow)',
      label: 'ACC-MUM-301',
      confidence: 98,
      details: {
        accountNumber: '40192XXXX991',
        bank: 'Standard Chartered, BKC Mumbai',
        signatory: 'Sunita Rao',
        entityTag: 'Coastal Shell Matrix Primary'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-BA02',
      type: 'BANK_ACCOUNT',
      name: 'ACC-MUM-302 (Colaba Marine Current)',
      label: 'ACC-MUM-302',
      confidence: 95,
      details: {
        accountNumber: '10293XXXX442',
        bank: 'Kotak Mahindra, Fort Branch',
        signatory: 'Kabir Vora',
        entityTag: 'Customs Clearance Pool'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-VH01',
      type: 'VEHICLE',
      name: 'Vessel Al-Noor (Cargo Dhow)',
      label: 'Vessel Al-Noor',
      confidence: 96,
      details: {
        registration: 'IND-MUM-CR-882',
        makeModel: 'Wooden Freight Dhow (200 MT)',
        registeredOwner: 'Coastal Marine Logistics LLC'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-102']
    },
    {
      id: 'ENT-MUM-LOC01',
      type: 'LOCATION',
      name: 'BKC Financial Tower',
      label: 'BKC Tower',
      confidence: 96,
      details: {
        coordinates: '19.0688° N, 72.8703° E',
        area: 'G-Block, Bandra Kurla Complex',
        significance: 'Hawala Settlement Meeting Point'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-102']
    }
  ],
  relationships: [
    {
      id: 'REL-MUM-01',
      source: 'ENT-MUM-P01',
      target: 'ENT-MUM-PH01',
      type: 'OWNED',
      timestamp: '2026-05-15 09:00 IST',
      confidence: 97,
      sourceEvidenceId: 'EVD-BOM-1024',
      verificationStatus: 'VERIFIED',
      explanation: 'Encrypted satellite communicator recovered during Nariman Point search.'
    },
    {
      id: 'REL-MUM-02',
      source: 'ENT-MUM-PH01',
      target: 'ENT-MUM-PH02',
      type: 'CALLED',
      timestamp: '2026-05-22 14:15 IST',
      confidence: 91,
      sourceEvidenceId: 'EVD-BOM-1024',
      verificationStatus: 'VERIFIED',
      explanation: 'Coordinated freight container unloading schedule via priority voice channel.'
    },
    {
      id: 'REL-MUM-03',
      source: 'ENT-MUM-P02',
      target: 'ENT-MUM-PH02',
      type: 'OWNED',
      timestamp: '2026-05-16 11:30 IST',
      confidence: 93,
      sourceEvidenceId: 'EVD-BOM-1024',
      verificationStatus: 'VERIFIED',
      explanation: 'Registered port entry pass tied directly to this mobile MSISDN.'
    },
    {
      id: 'REL-MUM-04',
      source: 'ENT-MUM-P01',
      target: 'ENT-MUM-P03',
      type: 'ASSOCIATED',
      timestamp: '2026-05-22 17:00 IST',
      confidence: 89,
      sourceEvidenceId: 'EVD-BOM-1025',
      verificationStatus: 'VERIFIED',
      explanation: 'Physical surveillance at BKC corporate club confirmed joint account review.'
    },
    {
      id: 'REL-MUM-05',
      source: 'ENT-MUM-P03',
      target: 'ENT-MUM-BA01',
      type: 'SIGNATORY',
      timestamp: '2026-05-18 10:00 IST',
      confidence: 98,
      sourceEvidenceId: 'EVD-BOM-1023',
      verificationStatus: 'VERIFIED',
      explanation: 'Sole signatory on corporate escrow account holding over ₹12 Crore.'
    },
    {
      id: 'REL-MUM-06',
      source: 'ENT-MUM-BA01',
      target: 'ENT-MUM-BA02',
      type: 'TRANSFERRED',
      timestamp: '2026-05-21 16:45 IST',
      confidence: 98,
      sourceEvidenceId: 'EVD-BOM-1023',
      verificationStatus: 'VERIFIED',
      explanation: 'RTGS tranche of INR 45,00,000 sent as disguised port handling tariff.'
    },
    {
      id: 'REL-MUM-07',
      source: 'ENT-MUM-P02',
      target: 'ENT-MUM-VH01',
      type: 'CHARTERED',
      timestamp: '2026-05-20 22:15 IST',
      confidence: 94,
      sourceEvidenceId: 'EVD-BOM-1022',
      verificationStatus: 'VERIFIED',
      explanation: 'Customs charter clearance submitted under Kabir Vora agency code.'
    },
    {
      id: 'REL-MUM-08',
      source: 'ENT-MUM-P04',
      target: 'ENT-MUM-VH01',
      type: 'OFFLOADED',
      timestamp: '2026-05-20 23:30 IST',
      confidence: 92,
      sourceEvidenceId: 'EVD-BOM-1022',
      verificationStatus: 'VERIFIED',
      explanation: 'Physical bag transfer intercepted on CCTV at Ferry Wharf Berth 4.'
    },
    {
      id: 'REL-MUM-09',
      source: 'ENT-MUM-P01',
      target: 'ENT-MUM-LOC01',
      type: 'VISITED',
      timestamp: '2026-05-22 17:00 IST',
      confidence: 96,
      sourceEvidenceId: 'EVD-BOM-1025',
      verificationStatus: 'VERIFIED',
      explanation: 'Security badge access logged at G-Block BKC Tower reception.'
    }
  ],
  evidenceItems: [
    {
      id: 'EVD-BOM-1021',
      caseId: 'FIR-2026-102',
      typeBadge: 'HAWALA RECORD',
      typeName: 'Informal Value Transfer Log',
      date: '18 May 2026',
      fullDate: '18 May 2026, 15:40 IST',
      mainRelationship: 'Coastal Shell Matrix → Bandra Node',
      confidence: 96,
      entities: ['Coastal Shell Matrix', 'Bandra Node'],
      rawRecord: 'Token Slip: BOM-882-TK\nNotional Value: INR 45,00,000\nCourier: Farooq Khan\nSettlement: Gulf Dubai Mirror Ledger',
      source: 'Enforcement Directorate Seizure Docket #ED-MUM-2026-09',
      integrity: 'Verified (Signed Seizure Memo)',
      whyItMatters: 'Direct physical evidence proving off-the-books hawala debt settlement matching bank wire tranches.'
    },
    {
      id: 'EVD-BOM-1022',
      caseId: 'FIR-2026-102',
      typeBadge: 'MARITIME LOG',
      typeName: 'Port Transit & Berth Manifest',
      date: '20 May 2026',
      fullDate: '20 May 2026, 22:15 IST',
      mainRelationship: 'Vessel Al-Noor → Ferry Wharf',
      confidence: 94,
      entities: ['Vessel Al-Noor', 'Ferry Wharf'],
      rawRecord: 'Berth: Wharf 4, Bhaucha Dhakka\nCargo: Electronics Consignment\nInspection Note: Unmanifested false bottom compartments',
      source: 'Customs & Coastal Marine Police Register #CUST-FW-441',
      integrity: 'Verified (Maritime Port Ingress Log)',
      whyItMatters: 'Validates physical entry route utilized to transport contraband and cash into South Mumbai.'
    },
    {
      id: 'EVD-BOM-1023',
      caseId: 'FIR-2026-102',
      typeBadge: 'BANK AUDIT',
      typeName: 'Core Banking RTGS Audit Trail',
      date: '21 May 2026',
      fullDate: '21 May 2026, 16:45 IST',
      mainRelationship: 'ACC-MUM-301 → ACC-MUM-302',
      confidence: 98,
      entities: ['ACC-MUM-301', 'ACC-MUM-302'],
      rawRecord: 'RTGS UTR: SCBLR2026052188412\nDebited: INR 45,00,000.00\nBeneficiary: Marine Export Pool (Kotak Fort)',
      source: 'Reserve Bank of India Banking Surveillance Cell',
      integrity: 'Verified (Sec 65B Digital Banking Certificate)',
      whyItMatters: 'Demonstrates immediate legitimate financial layering mirroring the hawala slip timestamp.'
    },
    {
      id: 'EVD-BOM-1024',
      caseId: 'FIR-2026-102',
      typeBadge: 'CALL RECORD',
      typeName: 'Satellite Intercept Log',
      date: '22 May 2026',
      fullDate: '22 May 2026, 14:15 IST',
      mainRelationship: 'Phone-MUM-01 → Phone-MUM-02',
      confidence: 91,
      entities: ['Phone-MUM-01', 'Phone-MUM-02'],
      rawRecord: 'Intercept ID: NTRO-SAT-8812\nOrigin: Nariman Point Highrise\nTerminated: Colaba Coast Line\nDuration: 240 seconds',
      source: 'Central Intelligence Intercept Bureau',
      integrity: 'Verified (Lawful Intercept Authorization)',
      whyItMatters: 'Establishes operational synchronization between the syndicate leader and port logistics clearing agent.'
    },
    {
      id: 'EVD-BOM-1025',
      caseId: 'FIR-2026-102',
      typeBadge: 'SURVEILLANCE',
      typeName: 'Covert Optical Surveillance Log',
      date: '22 May 2026',
      fullDate: '22 May 2026, 17:00 IST',
      mainRelationship: 'Tariq Merchant → Sunita Rao',
      confidence: 89,
      entities: ['Tariq Merchant', 'Sunita Rao'],
      rawRecord: 'Location: BKC G-Block Private Dining Suite\nPhotographic Evidence: Folder containing escrow ledger handed over\nLogged by: EOW Special Team Alpha',
      source: 'Mumbai Police Special Surveillance Unit',
      integrity: 'Verified (Chain-of-Custody Digital Video Archive)',
      whyItMatters: 'Confirms that shell corporate compliance was intentionally directed by Tariq Merchant.'
    },
    {
      id: 'EVD-BOM-1026',
      caseId: 'FIR-2026-102',
      typeBadge: 'CUSTOMS DOCKET',
      typeName: 'Customs Preventive Seizure Memo',
      date: '23 May 2026',
      fullDate: '23 May 2026, 11:20 IST',
      mainRelationship: 'Customs Preventive → Kabir Vora',
      confidence: 97,
      entities: ['Customs Preventive', 'Kabir Vora'],
      rawRecord: 'Panchnama: Seizure of INR 1.2 Crore cash and undeclared gold biscuits from Wharf 4 warehouse\nDetained: Kabir Vora',
      source: 'Customs Preventive Commissionerate, New Custom House Mumbai',
      integrity: 'Verified (Judicially Certified Panchnama)',
      whyItMatters: 'Substantiates primary seizure of illicit proceeds directly tying the logistics ring to unaccounted wealth.'
    }
  ],
  evidence: [],
  timelineEvents: [
    {
      id: 'TL-MUM-01',
      date: '2026-05-18 15:40 IST',
      title: 'Hawala Slip Ledger Generation',
      description: 'Physical token slip generated at Bandra node recording ₹45 Lakh informal clearance.',
      type: 'TRANSACTION',
      entitiesInvolved: ['Coastal Shell Matrix', 'Bandra Node'],
      confidence: 96,
      evidenceRef: 'EVD-BOM-1021'
    },
    {
      id: 'TL-MUM-02',
      date: '2026-05-20 22:15 IST',
      title: 'Vessel Al-Noor Berth at Ferry Wharf',
      description: 'Dhow vessel arrived under cover of darkness at Bhaucha Dhakka Berth 4.',
      type: 'LOCATION',
      entitiesInvolved: ['Vessel Al-Noor', 'Kabir Vora'],
      confidence: 94,
      evidenceRef: 'EVD-BOM-1022'
    },
    {
      id: 'TL-MUM-03',
      date: '2026-05-21 16:45 IST',
      title: 'RTGS Layering Wire Tranche Dispatched',
      description: 'Bank transfer of ₹45 Lakh executed from BKC Escrow to Colaba clearing account.',
      type: 'TRANSACTION',
      entitiesInvolved: ['ACC-MUM-301', 'ACC-MUM-302'],
      confidence: 98,
      evidenceRef: 'EVD-BOM-1023'
    },
    {
      id: 'TL-MUM-04',
      date: '2026-05-22 17:00 IST',
      title: 'BKC Tower Executive Meeting',
      description: 'Tariq Merchant and Sunita Rao met to inspect ledger balances at BKC corporate offices.',
      type: 'SURVEILLANCE',
      entitiesInvolved: ['Tariq Merchant', 'Sunita Rao'],
      confidence: 89,
      evidenceRef: 'EVD-BOM-1025'
    }
  ],
  locations: [
    {
      id: 'LOC-MUM-01',
      name: 'NARIMAN POINT SUITE',
      fullAddress: 'Maker Chambers VI, Nariman Point, Mumbai, MH 400021',
      coords: { x: 26, y: 32 },
      labelOffset: { x: 20, y: -24, align: 'left' },
      personsCount: 2,
      eventsCount: 3,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '15–23 MAY',
      persons: ['Tariq Merchant', 'Farooq Khan'],
      vehicles: ['MH-01-BK-9900 (Mercedes E-Class)'],
      events: [
        '15 MAY 09:00 - Satellite line terminal initialized',
        '22 MAY 14:15 - Encrypted transmission dispatched to coastal vessel'
      ],
      coPresenceConfidence: 96,
      hotspotType: 'Shell Corporate Office'
    },
    {
      id: 'LOC-MUM-02',
      name: 'FERRY WHARF TERMINAL',
      fullAddress: 'Bhaucha Dhakka, Dockyard Road, Mazgaon, Mumbai, MH 400010',
      coords: { x: 42, y: 48 },
      labelOffset: { x: -20, y: -24, align: 'right' },
      personsCount: 3,
      eventsCount: 4,
      vehiclesCount: 2,
      casesCount: 1,
      activityPeriod: '18–21 MAY',
      persons: ['Kabir Vora', 'Farooq Khan'],
      vehicles: ['Vessel Al-Noor', 'MH-02-CP-4102 (Tempo)'],
      events: [
        '20 MAY 22:15 - Vessel Al-Noor docked under unverified manifest',
        '23 MAY 11:20 - Customs preventive seizure executed at Wharf warehouse'
      ],
      coPresenceConfidence: 94,
      hotspotType: 'Transit Interchange'
    },
    {
      id: 'LOC-MUM-03',
      name: 'BKC FINANCIAL HUB',
      fullAddress: 'G-Block, Bandra Kurla Complex, Bandra East, Mumbai, MH 400051',
      coords: { x: 68, y: 52 },
      labelOffset: { x: 24, y: 16, align: 'left' },
      personsCount: 3,
      eventsCount: 3,
      vehiclesCount: 2,
      casesCount: 1,
      activityPeriod: '18–22 MAY',
      persons: ['Tariq Merchant', 'Sunita Rao'],
      vehicles: ['MH-01-BK-9900 (Mercedes E-Class)'],
      events: [
        '18 MAY 10:00 - Escrow management consultation at corporate suite',
        '22 MAY 17:00 - Physical briefing observed by EOW surveillance team'
      ],
      coPresenceConfidence: 91,
      hotspotType: 'Primary Rendezvous'
    },
    {
      id: 'LOC-MUM-04',
      name: 'COLABA SAFEHOUSE',
      fullAddress: 'Arthur Bunder Road, Colaba Causeway, Mumbai, MH 400005',
      coords: { x: 82, y: 74 },
      labelOffset: { x: -20, y: 16, align: 'right' },
      personsCount: 2,
      eventsCount: 2,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '19–23 MAY',
      persons: ['Kabir Vora', 'Tariq Merchant'],
      vehicles: ['MH-01-DA-2020 (Innova)'],
      events: [
        '19 MAY 23:45 - Cash consolidation exchange verified by field informant'
      ],
      coPresenceConfidence: 89,
      hotspotType: 'Dead Drop Point'
    }
  ],
  aliasResolutions: [
    {
      id: 'AL-MUM-01',
      canonicalName: 'Tariq Merchant',
      entityId: 'ENT-MUM-P01',
      suspectedAliases: ['Tariq Bhai', 'T.M. Dubai'],
      confidence: 94,
      supportingEvidenceIds: ['EVD-BOM-1021', 'EVD-BOM-1024'],
      status: 'CONFIRMED_MERGED',
      method: 'Hawala token slip ledger cross-reference & NTRO voice biometric analysis.'
    }
  ],
  anomalies: [
    {
      id: 'ANOM-MUM-01',
      title: 'Mirror Hawala Clearing Spike',
      severity: 'CRITICAL',
      detectedAt: '2026-05-21 17:00 IST',
      description: 'INR 45,00,000 wired to marine account precisely mirrors slip BOM-882-TK.',
      entitiesInvolved: ['ACC-MUM-301', 'ACC-MUM-302'],
      recommendedAction: 'Freeze Kotak Fort branch clearance pool under CrPC Sec 102.'
    }
  ],
  findings: [
    {
      id: 'FND-MUM-01',
      title: 'Maritime Hawala Conduit Confirmed',
      summary: 'Tariq Merchant coordinates freight shell imports to settle unrecorded hawala book debts.',
      confidence: 96,
      category: 'PRIMARY_CORROBORATION',
      actionableRecommendation: 'Issue provisional attachment order on Nariman Point office and arrest Tariq Merchant.'
    }
  ]
};

// ============================================================================
// DATASET 3: FIR-2026-115 — DELHI
// ============================================================================
const DELHI_BUNDLE: CaseDataBundle = {
  caseInfo: AVAILABLE_CASES[2],
  caseData: {
    id: 'FIR-2026-115',
    title: 'NCR Cyber Extortion & Burner SIM Racket',
    status: 'Active Tracking & Device Intercept',
    investigatingOfficer: 'DCP Rajeshwar Sharma',
    badgeNumber: 'DEL-SPEC-1104',
    createdAt: '2026-04-02 14:00 IST',
    entitiesCount: 10,
    relationshipsCount: 11,
    evidenceCount: 6,
    confidenceScore: 92,
    summary: 'Multi-state cyber extortion syndicate orchestrating automated VoIP spoofing calls, fake digital arrest threats, and TRC-20 cryptocurrency laundering across Delhi NCR.',
    division: 'Special Cell & Cyber Crime Unit, Delhi Police'
  },
  entities: [
    {
      id: 'ENT-DEL-P01',
      type: 'PERSON',
      name: 'Kunal Verma',
      label: 'Kunal Verma',
      aliases: ['K. Verma', 'Victor', 'CyberKunal'],
      role: 'Master Call Center Operator',
      centralityScore: 0.95,
      pageRankScore: 0.31,
      confidence: 95,
      details: {
        occupation: 'IT Systems Administrator',
        knownResidence: 'DLF Phase 2, Gurgaon',
        primaryPhoneRef: 'Burner Cluster Alpha',
        riskIndicator: 'VoIP PBX Infrastructure Admin'
      },
      connectedCount: 5,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-P02',
      type: 'PERSON',
      name: 'Ritu Saxena',
      label: 'Ritu Saxena',
      aliases: ['R. Saxena'],
      role: 'Mule Account Coordinator',
      centralityScore: 0.72,
      pageRankScore: 0.18,
      confidence: 91,
      details: {
        occupation: 'Telemarketing Manager',
        knownResidence: 'Laxmi Nagar, Delhi',
        primaryAccountRef: 'ACC-DEL-401',
        riskIndicator: 'Bulk Account Aggregator'
      },
      connectedCount: 4,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-P03',
      type: 'PERSON',
      name: 'Deepak Joshi',
      label: 'Deepak Joshi',
      aliases: ['D. Joshi', 'SIM Master'],
      role: 'SIM Forgery & Hardware Broker',
      centralityScore: 0.65,
      pageRankScore: 0.16,
      confidence: 93,
      details: {
        occupation: 'Electronics Retailer',
        knownResidence: 'Nehru Place, Delhi',
        primaryPhoneRef: 'Forged SIM Trunk',
        riskIndicator: 'Fake Aadhaar KYC Activations'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-P04',
      type: 'PERSON',
      name: 'Amit Tyagi',
      label: 'Amit Tyagi',
      aliases: ['A. Tyagi', 'CryptoOfframp'],
      role: 'Crypto Off-Ramp Specialist',
      centralityScore: 0.58,
      pageRankScore: 0.14,
      confidence: 89,
      details: {
        occupation: 'P2P Crypto Merchant',
        knownResidence: 'Rohini Sector 14, Delhi',
        primaryAccountRef: 'Wallet-0x9A',
        riskIndicator: 'Tether Peeling Chain Operator'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-PH01',
      type: 'PHONE',
      name: 'Burner Cluster Alpha (+91-98110-XXXX1)',
      label: 'Burner Cluster Alpha',
      confidence: 96,
      details: {
        number: '+91-98110-XXXX1',
        imei: '351290481904122',
        carrier: 'VoIP PBX Cloud Gateway',
        towerLocation: 'Cyber City Gurgaon'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-PH02',
      type: 'PHONE',
      name: 'Target Corporate Line (+91-11-4921-XXXX)',
      label: 'Target Corporate Line',
      confidence: 98,
      details: {
        number: '+91-11-4921-XXXX',
        imei: 'N/A (Corporate PRI Line)',
        carrier: 'MTNL Enterprise Delhi',
        towerLocation: 'Connaught Place Exchange'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-BA01',
      type: 'BANK_ACCOUNT',
      name: 'ACC-DEL-401 (Mule Current Pool)',
      label: 'ACC-DEL-401',
      confidence: 94,
      details: {
        accountNumber: '309182XXXX881',
        bank: 'State Bank of India, Laxmi Nagar',
        signatory: 'Ritu Saxena',
        entityTag: 'Mule Aggregator Pool'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-BA02',
      type: 'BANK_ACCOUNT',
      name: 'Crypto Wallet 0x9A (TRC-20 Tether)',
      label: 'Wallet 0x9A',
      confidence: 98,
      details: {
        accountNumber: '0x9a8fe102319fbb8812c3',
        bank: 'TRON Blockchain Network',
        signatory: 'Amit Tyagi',
        entityTag: 'Tumbling Address Pool'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-VH01',
      type: 'VEHICLE',
      name: 'DL-01-TX-8832 (White Sedan)',
      label: 'DL-01-TX-8832',
      confidence: 90,
      details: {
        registration: 'DL-01-TX-8832',
        makeModel: 'Honda City (White)',
        registeredOwner: 'Apex Digital Solutions'
      },
      connectedCount: 2,
      caseIds: ['FIR-2026-115']
    },
    {
      id: 'ENT-DEL-LOC01',
      type: 'LOCATION',
      name: 'Connaught Place Hub',
      label: 'CP Hub',
      confidence: 94,
      details: {
        coordinates: '28.6315° N, 77.2167° E',
        area: 'Outer Circle, Connaught Place',
        significance: 'SIM Distribution & Cash Handover'
      },
      connectedCount: 3,
      caseIds: ['FIR-2026-115']
    }
  ],
  relationships: [
    {
      id: 'REL-DEL-01',
      source: 'ENT-DEL-P01',
      target: 'ENT-DEL-PH01',
      type: 'CONTROLS',
      timestamp: '2026-04-01 10:00 IST',
      confidence: 96,
      sourceEvidenceId: 'EVD-DEL-1151',
      verificationStatus: 'VERIFIED',
      explanation: 'Server login IP matched Kunal Verma home broadband IP in DLF Phase 2.'
    },
    {
      id: 'REL-DEL-02',
      source: 'ENT-DEL-PH01',
      target: 'ENT-DEL-PH02',
      type: 'SPOOF_CALLED',
      timestamp: '2026-04-02 12:30 IST',
      confidence: 96,
      sourceEvidenceId: 'EVD-DEL-1151',
      verificationStatus: 'VERIFIED',
      explanation: '65 automated spoofing dialing calls logged demanding urgent legal bail settlement.'
    },
    {
      id: 'REL-DEL-03',
      source: 'ENT-DEL-P03',
      target: 'ENT-DEL-PH01',
      type: 'SUPPLIED_SIMS',
      timestamp: '2026-04-05 15:00 IST',
      confidence: 95,
      sourceEvidenceId: 'EVD-DEL-1153',
      verificationStatus: 'VERIFIED',
      explanation: 'Nehru Place raid revealed batch of 400 forged SIMs allocated to VoIP trunk.'
    },
    {
      id: 'REL-DEL-04',
      source: 'ENT-DEL-P01',
      target: 'ENT-DEL-P02',
      type: 'DIRECTS',
      timestamp: '2026-04-03 11:00 IST',
      confidence: 92,
      sourceEvidenceId: 'EVD-DEL-1154',
      verificationStatus: 'VERIFIED',
      explanation: 'Telegram channel transcripts prove Kunal assigned extortion targets to mule coordinator.'
    },
    {
      id: 'REL-DEL-05',
      source: 'ENT-DEL-P02',
      target: 'ENT-DEL-BA01',
      type: 'MANAGES',
      timestamp: '2026-04-03 14:00 IST',
      confidence: 94,
      sourceEvidenceId: 'EVD-DEL-1152',
      verificationStatus: 'VERIFIED',
      explanation: 'Account signatory and OTP retrieval registered on Ritu Saxena handset.'
    },
    {
      id: 'REL-DEL-06',
      source: 'ENT-DEL-BA01',
      target: 'ENT-DEL-BA02',
      type: 'CONVERTED_TO_CRYPTO',
      timestamp: '2026-04-04 17:50 IST',
      confidence: 98,
      sourceEvidenceId: 'EVD-DEL-1152',
      verificationStatus: 'VERIFIED',
      explanation: 'Direct P2P payment of ₹41.5 Lakh credited to OTC broker wallet for USDT.'
    },
    {
      id: 'REL-DEL-07',
      source: 'ENT-DEL-P04',
      target: 'ENT-DEL-BA02',
      type: 'OPERATES_WALLET',
      timestamp: '2026-04-04 18:15 IST',
      confidence: 93,
      sourceEvidenceId: 'EVD-DEL-1152',
      verificationStatus: 'VERIFIED',
      explanation: 'Private keys found on encrypted cold hardware device during Rohini raid.'
    },
    {
      id: 'REL-DEL-08',
      source: 'ENT-DEL-P01',
      target: 'ENT-DEL-VH01',
      type: 'OPERATES',
      timestamp: '2026-04-06 16:30 IST',
      confidence: 90,
      sourceEvidenceId: 'EVD-DEL-1154',
      verificationStatus: 'VERIFIED',
      explanation: 'White Honda City captured on CCTV outside Connaught Place coffee shop meeting.'
    },
    {
      id: 'REL-DEL-09',
      source: 'ENT-DEL-P01',
      target: 'ENT-DEL-LOC01',
      type: 'VISITED',
      timestamp: '2026-04-06 16:45 IST',
      confidence: 91,
      sourceEvidenceId: 'EVD-DEL-1154',
      verificationStatus: 'VERIFIED',
      explanation: 'Dwell time of 85 minutes recorded during SIM handover meeting.'
    }
  ],
  evidenceItems: [
    {
      id: 'EVD-DEL-1151',
      caseId: 'FIR-2026-115',
      typeBadge: 'CALL RECORD',
      typeName: 'Bulk Telecom VoIP Intercept',
      date: '02 Apr 2026',
      fullDate: '02 April 2026, 12:30 IST',
      mainRelationship: 'Burner Cluster Alpha → Target Corporate Line',
      confidence: 96,
      entities: ['Burner Cluster Alpha', 'Target Corporate Line'],
      rawRecord: 'VoIP Server IP: 185.220.101.44 (Encrypted Gateway)\nCaller ID Spoofed: +911123412211 (Delhi Police CP PS)\nTerminated: Gurgaon Corporate Exchange\nPattern: 65 automated dialing attempts',
      source: 'Delhi Police Cyber Crime Unit Extract #DEL-CYB-2026-115',
      integrity: 'Verified (CDR Telecom Carrier Affidavit)',
      whyItMatters: 'Demonstrates organized automated extortion calling targeting NCR corporate executives with fake police caller IDs.'
    },
    {
      id: 'EVD-DEL-1152',
      caseId: 'FIR-2026-115',
      typeBadge: 'CRYPTO TRACE',
      typeName: 'Blockchain Forensics Ledger Trace',
      date: '04 Apr 2026',
      fullDate: '04 April 2026, 17:50 IST',
      mainRelationship: 'ACC-DEL-401 → Crypto Wallet 0x9A',
      confidence: 98,
      entities: ['ACC-DEL-401', 'Crypto Wallet 0x9A'],
      rawRecord: 'TxHash: 0x9a8f21c388a100223910cba44\nAsset: USDT (TRC-20)\nAmount: 50,000 USDT (₹41.5 Lakh)\nHop Count: 4 peeling chains leading to offshore exchange',
      source: 'CERT-IN & Chainalysis Law Enforcement Forensics Dossier',
      integrity: 'Verified (Immutable Public Ledger Hash)',
      whyItMatters: 'Direct cryptographic trace showing extortion proceeds being laundered through intermediate tumbling addresses to crypto off-ramps.'
    },
    {
      id: 'EVD-DEL-1153',
      caseId: 'FIR-2026-115',
      typeBadge: 'SIM AUDIT',
      typeName: 'DoT Sanchar Saathi Bulk SIM Audit',
      date: '05 Apr 2026',
      fullDate: '05 April 2026, 15:00 IST',
      mainRelationship: 'Deepak Joshi → 400 Forged SIMs',
      confidence: 95,
      entities: ['Deepak Joshi', 'Burner Cluster Alpha'],
      rawRecord: 'Batch ID: DOT-2026-NCR-882\nForged Aadhaar IDs: 42 common photo duplicates\nActivation Point: Nehru Place Stall 14B\nStatus: Immediate Telecom Blocklist Enforced',
      source: 'Department of Telecommunications (DoT) Fraud Management System',
      integrity: 'Verified (Government Regulatory Audit)',
      whyItMatters: 'Uncovers the critical logistics supplier providing untraceable identity credentials to sustain the cyber extortion engine.'
    },
    {
      id: 'EVD-DEL-1154',
      caseId: 'FIR-2026-115',
      typeBadge: 'SURVEILLANCE',
      typeName: 'Field Intelligence Physical Surveillance',
      date: '06 Apr 2026',
      fullDate: '06 April 2026, 16:45 IST',
      mainRelationship: 'Kunal Verma → Connaught Place Hub',
      confidence: 91,
      entities: ['Kunal Verma', 'Connaught Place Hub'],
      rawRecord: 'Location: CP Outer Circle Coffee Shop\nTarget: Kunal Verma driving Honda City DL-01-TX-8832\nActivity: Exchange of brown paper package containing SIM trays\nLogged by: Special Cell Strike Team 3',
      source: 'Special Cell Tactical Unit Delhi Police',
      integrity: 'Verified (Signed Field Officer Surveillance Memo)',
      whyItMatters: 'Connects the intellectual administrator of the cyber extortion ring to physical hardware handovers in central Delhi.'
    },
    {
      id: 'EVD-DEL-1155',
      caseId: 'FIR-2026-115',
      typeBadge: 'LOCATION RECORD',
      typeName: 'Cell Tower Triangulation & IP Geolocation',
      date: '07 Apr 2026',
      fullDate: '07 April 2026, 14:10 IST',
      mainRelationship: 'Kunal Verma → Cyber City Gurgaon',
      confidence: 93,
      entities: ['Kunal Verma', 'Cyber City Gurgaon'],
      rawRecord: 'BTS Tower: HR-GGN-CYB-02 Sector 3\nIP Subnet: 103.21.144.0/24 (Apex Digital Services lease)\nDwell Time: 7.5 hours continuous\nMac Address: 44:A8:42:11:BC:09',
      source: 'Haryana Telecom Sector Monitoring Authority',
      integrity: 'Verified (Carrier Telemetry & Leased Line Contract)',
      whyItMatters: 'Confirms that fraudulent call center operations were physically housed inside an office leased in Cyber City Gurgaon.'
    },
    {
      id: 'EVD-DEL-1156',
      caseId: 'FIR-2026-115',
      typeBadge: 'SEIZURE DOCKET',
      typeName: 'Police Raid & Hardware Seizure Memo',
      date: '08 Apr 2026',
      fullDate: '08 April 2026, 18:30 IST',
      mainRelationship: 'Special Cell → Nehru Place Hardware Drop',
      confidence: 99,
      entities: ['Special Cell', 'Deepak Joshi'],
      rawRecord: 'Seizure Memo #DEL-SC-2026-88\nItems: 16 SIM Box GSM gateways, 420 active pre-activated SIMs, 3 laptops loaded with automated dialing bots\nArrested: Deepak Joshi',
      source: 'Cyber Crime Police Station Mandir Marg, New Delhi',
      integrity: 'Verified (Sec 100 CrPC Panchnama & Hash Verification)',
      whyItMatters: 'Conclusive hardware evidence establishing the technical mechanism of automated call delivery.'
    }
  ],
  evidence: [],
  timelineEvents: [
    {
      id: 'TL-DEL-01',
      date: '2026-04-02 12:30 IST',
      title: 'Automated VoIP Extortion Burst Launched',
      description: '65 automated spoofing dialing calls logged targeting enterprise lines in Gurgaon.',
      type: 'CALL',
      entitiesInvolved: ['Burner Cluster Alpha', 'Target Corporate Line'],
      confidence: 96,
      evidenceRef: 'EVD-DEL-1151'
    },
    {
      id: 'TL-DEL-02',
      date: '2026-04-04 17:50 IST',
      title: 'Laundering via TRC-20 Tether Crypto Swap',
      description: 'Extortion funds totaling ₹41.5 Lakh converted to 50,000 USDT on TRON network.',
      type: 'TRANSACTION',
      entitiesInvolved: ['ACC-DEL-401', 'Crypto Wallet 0x9A'],
      confidence: 98,
      evidenceRef: 'EVD-DEL-1152'
    },
    {
      id: 'TL-DEL-03',
      date: '2026-04-06 16:45 IST',
      title: 'Physical SIM Handover at Connaught Place',
      description: 'CCTV footage confirmed Kunal Verma receiving 400 forged SIM cards in CP Outer Circle.',
      type: 'SURVEILLANCE',
      entitiesInvolved: ['Kunal Verma', 'Deepak Joshi'],
      confidence: 91,
      evidenceRef: 'EVD-DEL-1154'
    },
    {
      id: 'TL-DEL-04',
      date: '2026-04-08 18:30 IST',
      title: 'Nehru Place Hardware Raid & Arrest',
      description: 'Special Cell seized 16 SIM box GSM gateways and arrested supplier Deepak Joshi.',
      type: 'SEIZURE',
      entitiesInvolved: ['Deepak Joshi', 'Special Cell'],
      confidence: 99,
      evidenceRef: 'EVD-DEL-1156'
    }
  ],
  locations: [
    {
      id: 'LOC-DEL-01',
      name: 'CYBER CITY GURGAON',
      fullAddress: 'Building 10B, DLF Cyber City, Phase 2, Gurgaon, HR 122002',
      coords: { x: 24, y: 30 },
      labelOffset: { x: 20, y: -24, align: 'left' },
      personsCount: 3,
      eventsCount: 4,
      vehiclesCount: 2,
      casesCount: 1,
      activityPeriod: '01–08 APR',
      persons: ['Kunal Verma', 'Ritu Saxena'],
      vehicles: ['DL-01-TX-8832 (Honda City)'],
      events: [
        '02 APR 12:30 - Bulk automated VoIP server cluster triggered',
        '07 APR 14:10 - IP lease telemetry locked to floor 4 workspace'
      ],
      coPresenceConfidence: 95,
      hotspotType: 'Shell Corporate Office'
    },
    {
      id: 'LOC-DEL-02',
      name: 'CONNAUGHT PLACE HUB',
      fullAddress: 'Outer Circle, Near Metro Gate 4, Connaught Place, New Delhi 110001',
      coords: { x: 46, y: 44 },
      labelOffset: { x: -20, y: -24, align: 'right' },
      personsCount: 3,
      eventsCount: 3,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '03–06 APR',
      persons: ['Kunal Verma', 'Deepak Joshi'],
      vehicles: ['DL-01-TX-8832 (Honda City)'],
      events: [
        '06 APR 16:45 - Surveillance confirmed brown package SIM handover'
      ],
      coPresenceConfidence: 91,
      hotspotType: 'Primary Rendezvous'
    },
    {
      id: 'LOC-DEL-03',
      name: 'NEHRU PLACE HARDWARE MARKET',
      fullAddress: 'E-Block Electronics Plaza, Nehru Place, New Delhi 110019',
      coords: { x: 68, y: 58 },
      labelOffset: { x: 24, y: 16, align: 'left' },
      personsCount: 2,
      eventsCount: 3,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '04–08 APR',
      persons: ['Deepak Joshi'],
      vehicles: ['DL-03-TC-1102 (Scooter)'],
      events: [
        '05 APR 15:00 - Fake KYC Aadhaar bulk activation stall verified',
        '08 APR 18:30 - Special cell raid executed; 16 SIM box units confiscated'
      ],
      coPresenceConfidence: 99,
      hotspotType: 'Transit Interchange'
    },
    {
      id: 'LOC-DEL-04',
      name: 'ROHINI CRYPTO SAFEPOINT',
      fullAddress: 'Sector 14 Institutional Area, Rohini, New Delhi 110085',
      coords: { x: 80, y: 76 },
      labelOffset: { x: -20, y: 16, align: 'right' },
      personsCount: 2,
      eventsCount: 2,
      vehiclesCount: 1,
      casesCount: 1,
      activityPeriod: '04–07 APR',
      persons: ['Amit Tyagi', 'Ritu Saxena'],
      vehicles: ['DL-04-MB-4901 (Creta)'],
      events: [
        '04 APR 17:50 - P2P USDT escrow transaction clearance confirmed'
      ],
      coPresenceConfidence: 88,
      hotspotType: 'Dead Drop Point'
    }
  ],
  aliasResolutions: [
    {
      id: 'AL-DEL-01',
      canonicalName: 'Kunal Verma',
      entityId: 'ENT-DEL-P01',
      suspectedAliases: ['Victor CallMaster', 'K. Verma'],
      confidence: 96,
      supportingEvidenceIds: ['EVD-DEL-1151', 'EVD-DEL-1155'],
      status: 'CONFIRMED_MERGED',
      method: 'Broadband router MAC address & Telegram administration credentials.'
    }
  ],
  anomalies: [
    {
      id: 'ANOM-DEL-01',
      title: 'Bulk SIM Activation Spike',
      severity: 'CRITICAL',
      detectedAt: '2026-04-05 16:00 IST',
      description: '400 SIMs activated under duplicate Aadhaar biometric templates within 120 minutes.',
      entitiesInvolved: ['Deepak Joshi', 'Burner Cluster Alpha'],
      recommendedAction: 'Coordinate nationwide DoT IMEI blocklist on all 16 gateway hardware slots.'
    }
  ],
  findings: [
    {
      id: 'FND-DEL-01',
      title: 'Automated Cyber Extortion Hub Dismantled',
      summary: 'Kunal Verma operated an illicit PBX cloud cluster executing fake digital arrest extortions.',
      confidence: 95,
      category: 'LEAD',
      actionableRecommendation: 'Freeze all crypto addresses linked to Wallet 0x9A via exchange compliance liaisons.'
    }
  ]
};

export const CASE_BUNDLES: Record<string, CaseDataBundle> = {
  'FIR-2026-089': PUNE_BUNDLE,
  'FIR-2026-102': MUMBAI_BUNDLE,
  'FIR-2026-115': DELHI_BUNDLE
};

export function getCaseDataBundle(caseId: string | null): CaseDataBundle | null {
  if (!caseId) return null;
  return CASE_BUNDLES[caseId] || PUNE_BUNDLE;
}
