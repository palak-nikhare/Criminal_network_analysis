import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_CASE,
  INITIAL_ENTITIES,
  INITIAL_RELATIONSHIPS,
  INITIAL_EVIDENCE,
  INITIAL_KEY_PLAYERS,
  INITIAL_ALIAS_CANDIDATES,
  INITIAL_CROSS_MODAL,
  INITIAL_ANOMALIES,
  INITIAL_FINDINGS,
  INITIAL_TIMELINE,
  INITIAL_LOCATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_INGESTED_DOCS
} from './src/data/mockInvestigationData.ts';

// In-memory persistent state for the running instance
let currentCase = { ...INITIAL_CASE };
let entities = [...INITIAL_ENTITIES];
let relationships = [...INITIAL_RELATIONSHIPS];
let evidenceList = [...INITIAL_EVIDENCE];
let keyPlayers = [...INITIAL_KEY_PLAYERS];
let aliasCandidates = [...INITIAL_ALIAS_CANDIDATES];
let crossModalList = [...INITIAL_CROSS_MODAL];
let anomalies = [...INITIAL_ANOMALIES];
let findings = [...INITIAL_FINDINGS];
let timeline = [...INITIAL_TIMELINE];
let locations = [...INITIAL_LOCATIONS];
let auditLogs = [...INITIAL_AUDIT_LOGS];
let ingestedDocs = [...INITIAL_INGESTED_DOCS];

// Gemini AI client (lazy initialized if key is available)
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Gemini client init skipped or failed:', e);
    }
  }
  return geminiClient;
}

function addAudit(action: string, entityOrCase: string, result: string, user = 'INV-4412 (Insp. Vikram Rathod)') {
  const newLog = {
    id: `AUD-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
    user,
    role: 'Investigating Officer',
    action,
    entityOrCase,
    result,
    accessStatus: 'Authorized' as const,
    integrityHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  };
  auditLogs.unshift(newLog);
  if (auditLogs.length > 50) auditLogs.pop();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'NCRB AI Criminal Network Analysis System',
      problemStatement: 'SIH 2026 PS 26189',
      mode: 'SYNTHETIC_DEMO_DATA'
    });
  });

  // Auth login
  app.post('/api/auth/login', (req, res) => {
    const { investigatorId, department, role } = req.body;
    const invId = investigatorId || 'INV-4412';
    const userRole = role || 'Lead Investigating Officer';
    const dept = department || 'NCRB Women Safety Division';

    addAudit(`Authorized Secure Login Session Initialized (${userRole})`, invId, 'Access Granted');

    res.json({
      success: true,
      token: `ncrb-jwt-${Date.now()}`,
      user: {
        investigatorId: invId,
        name: 'Insp. Vikram Rathod',
        department: dept,
        role: userRole,
        badgeNumber: 'NCRB-WSD-4412',
        authorizedCases: ['CASE-26189-001']
      }
    });
  });

  // Reset demo data
  app.post('/api/cases/reset-demo', (_req, res) => {
    currentCase = { ...INITIAL_CASE };
    entities = [...INITIAL_ENTITIES];
    relationships = [...INITIAL_RELATIONSHIPS];
    evidenceList = [...INITIAL_EVIDENCE];
    keyPlayers = [...INITIAL_KEY_PLAYERS];
    aliasCandidates = [...INITIAL_ALIAS_CANDIDATES];
    crossModalList = [...INITIAL_CROSS_MODAL];
    anomalies = [...INITIAL_ANOMALIES];
    findings = [...INITIAL_FINDINGS];
    timeline = [...INITIAL_TIMELINE];
    locations = [...INITIAL_LOCATIONS];
    auditLogs = [...INITIAL_AUDIT_LOGS];
    ingestedDocs = [...INITIAL_INGESTED_DOCS];

    addAudit('Demo Investigation State Reloaded', 'CASE-26189-001', 'State Reset to Initial Benchmark');
    res.json({ success: true, message: 'Sample synthetic investigation reloaded' });
  });

  // Cases
  app.get('/api/cases', (_req, res) => {
    res.json([currentCase]);
  });

  app.get('/api/cases/:id', (req, res) => {
    if (req.params.id === currentCase.id || req.params.id === 'default') {
      res.json(currentCase);
    } else {
      res.status(404).json({ error: 'Case not found' });
    }
  });

  // Entities
  app.get('/api/entities', (_req, res) => {
    res.json(entities);
  });

  app.get('/api/entities/:id', (req, res) => {
    const entity = entities.find(e => e.id === req.params.id);
    if (!entity) return res.status(404).json({ error: 'Entity not found' });

    // Include connected relationships and evidence
    const connectedEdges = relationships.filter(
      r => r.source === entity.id || r.target === entity.id
    );
    const connectedEntityIds = new Set<string>();
    connectedEdges.forEach(e => {
      if (e.source !== entity.id) connectedEntityIds.add(e.source);
      if (e.target !== entity.id) connectedEntityIds.add(e.target);
    });
    const connectedEntities = entities.filter(e => connectedEntityIds.has(e.id));
    const entityEvidence = evidenceList.filter(
      ev => ev.relatedEntityId === entity.id || ev.targetEntityId === entity.id
    );

    res.json({
      entity,
      relationships: connectedEdges,
      connectedEntities,
      evidence: entityEvidence
    });
  });

  // Network graph
  app.get('/api/network/:caseId', (_req, res) => {
    res.json({
      caseId: currentCase.id,
      nodes: entities.map(e => ({
        id: e.id,
        name: e.name,
        label: e.label,
        type: e.type,
        role: e.role,
        centralityScore: e.centralityScore,
        confidence: e.confidence,
        connectedCount: relationships.filter(r => r.source === e.id || r.target === e.id).length
      })),
      edges: relationships.map(r => ({
        id: r.id,
        source: r.source,
        target: r.target,
        type: r.type,
        confidence: r.confidence,
        status: r.verificationStatus,
        sourceEvidenceId: r.sourceEvidenceId,
        explanation: r.explanation
      }))
    });
  });

  // Evidence
  app.get('/api/evidence/:caseId', (_req, res) => {
    res.json(evidenceList);
  });

  // Timeline
  app.get('/api/timeline/:caseId', (_req, res) => {
    res.json(timeline);
  });

  // Key players
  app.get('/api/key-players/:caseId', (_req, res) => {
    res.json(keyPlayers);
  });

  // Alias candidates
  app.get('/api/alias-candidates/:caseId', (_req, res) => {
    res.json(aliasCandidates);
  });

  // Cross modal correlations
  app.get('/api/cross-modal/:caseId', (_req, res) => {
    res.json(crossModalList);
  });

  // Anomalies
  app.get('/api/anomalies/:caseId', (_req, res) => {
    res.json(anomalies);
  });

  // Findings
  app.get('/api/findings/:caseId', (_req, res) => {
    res.json(findings);
  });

  // Locations
  app.get('/api/locations/:caseId', (_req, res) => {
    res.json(locations);
  });

  // Audit logs
  app.get('/api/audit-logs', (_req, res) => {
    res.json(auditLogs);
  });

  // Ingested documents
  app.get('/api/ingest', (_req, res) => {
    res.json(ingestedDocs);
  });

  // Ingest new document
  app.post('/api/ingest', (req, res) => {
    const { title, sourceType, text, courtWarrantOrAuthId } = req.body;
    if (!text) return res.status(400).json({ error: 'Text content is required' });

    // Rule-based NLP entity extractor with fallback
    const detectedEntities: { text: string; type: any; confidence: number }[] = [];
    const lower = text.toLowerCase();

    // Scan for known patterns or extract names
    if (lower.includes('rahul') || lower.includes('sharma')) {
      detectedEntities.push({ text: 'Rahul Sharma', type: 'PERSON', confidence: 94 });
    }
    if (lower.includes('arjun') || lower.includes('mehta')) {
      detectedEntities.push({ text: 'Arjun Mehta', type: 'PERSON', confidence: 96 });
    }
    if (lower.includes('neha') || lower.includes('patil')) {
      detectedEntities.push({ text: 'Neha Patil', type: 'PERSON', confidence: 93 });
    }
    if (lower.includes('rohan') || lower.includes('kulkarni')) {
      detectedEntities.push({ text: 'Rohan Kulkarni', type: 'PERSON', confidence: 92 });
    }
    if (lower.includes('sameer') || lower.includes('shah')) {
      detectedEntities.push({ text: 'Sameer Shah', type: 'PERSON', confidence: 91 });
    }

    // Phones
    const phoneMatches = text.match(/(?:\+91[\-\s]?)?[6-9]\d{9}|\bphone\-\d+\b/gi) || [];
    phoneMatches.forEach((ph: string) => {
      detectedEntities.push({ text: ph.trim(), type: 'PHONE', confidence: 95 });
    });

    // Accounts
    const accMatches = text.match(/\bacc\-\d+\b|\b\d{11,16}\b/gi) || [];
    accMatches.forEach((ac: string) => {
      detectedEntities.push({ text: ac.trim(), type: 'BANK_ACCOUNT', confidence: 94 });
    });

    // Vehicles
    const vhMatches = text.match(/\b[A-Z]{2}[-\s]?\d{2}[-\s]?[A-Z]{1,2}[-\s]?\d{4}\b/g) || [];
    vhMatches.forEach((vh: string) => {
      detectedEntities.push({ text: vh.trim(), type: 'VEHICLE', confidence: 92 });
    });

    // Locations
    const locationKeywords = ['pune camp', 'shivajinagar', 'baner', 'hadapsar', 'mumbai', 'pune'];
    locationKeywords.forEach(loc => {
      if (lower.includes(loc)) {
        detectedEntities.push({
          text: loc.charAt(0).toUpperCase() + loc.slice(1),
          type: 'LOCATION',
          confidence: 90
        });
      }
    });

    // Default sample if none detected
    if (detectedEntities.length === 0) {
      detectedEntities.push({ text: 'Subject Entity', type: 'PERSON', confidence: 85 });
      detectedEntities.push({ text: 'Pune Corridor', type: 'LOCATION', confidence: 88 });
    }

    const newDoc = {
      id: `DOC-0${ingestedDocs.length + 1}`,
      title: title || 'Investigator Supplementary Note',
      sourceType: sourceType || 'INVESTIGATION_NOTE',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      legalGateStatus: 'PASSED' as const,
      courtWarrantOrAuthId: courtWarrantOrAuthId || 'AUTH-NCRB-2026-GATE',
      rawText: text,
      entities: detectedEntities,
      relationships: [
        {
          source: detectedEntities[0]?.text || 'Entity A',
          target: detectedEntities[1]?.text || 'Entity B',
          type: 'ASSOCIATED' as const,
          confidence: 88
        }
      ]
    };

    ingestedDocs.unshift(newDoc);
    addAudit(
      `Document Ingested & Processed: ${newDoc.title} (${detectedEntities.length} entities extracted)`,
      newDoc.id,
      'Structured Investigation Data Generated'
    );

    res.json({ success: true, document: newDoc });
  });

  // Entity Resolution (Confirm / Reject alias)
  app.post('/api/entity-resolution', (req, res) => {
    const { candidateId, action } = req.body;
    const candidate = aliasCandidates.find(c => c.id === candidateId);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    candidate.status = action === 'CONFIRM' ? 'CONFIRMED' : 'REJECTED';
    addAudit(
      `Human-in-the-Loop Action: ${candidate.status === 'CONFIRMED' ? 'Confirmed' : 'Rejected'} Alias Match (${candidate.aliasName} -> ${candidate.canonicalName})`,
      candidate.id,
      `State updated to ${candidate.status}`
    );

    res.json({ success: true, candidate });
  });

  // Verify finding
  app.post('/api/verify-finding', (req, res) => {
    const { findingId, status, notes } = req.body;
    const finding = findings.find(f => f.id === findingId);
    if (!finding) return res.status(404).json({ error: 'Finding not found' });

    finding.status = status;
    addAudit(
      `Human Verification on Lead: Status changed to ${status}${notes ? ` (Notes: ${notes})` : ''}`,
      finding.id,
      `Finding ${finding.title.substring(0, 30)}... updated`
    );

    res.json({ success: true, finding });
  });

  // Verify relationship
  app.post('/api/verify-relationship', (req, res) => {
    const { relationshipId, status } = req.body;
    const rel = relationships.find(r => r.id === relationshipId);
    if (!rel) return res.status(404).json({ error: 'Relationship not found' });

    rel.verificationStatus = status;
    addAudit(
      `Human Verification on Relationship ${rel.type}: Status updated to ${status}`,
      rel.id,
      `${rel.source} -> ${rel.target} [${status}]`
    );

    res.json({ success: true, relationship: rel });
  });

  // Legal gate check simulation
  app.post('/api/legal-gate/check', (req, res) => {
    const { warrantNumber, jurisdiction, requestingOfficer } = req.body;
    const isAuthorized = Boolean(warrantNumber && warrantNumber.trim().length > 3);

    addAudit(
      `Legal Authorization Gate Query (${requestingOfficer || 'Officer'}) - Warrant: ${warrantNumber || 'NONE'}`,
      'LEGAL_GATE',
      isAuthorized ? 'AUTHORIZED: Data clearance approved' : 'QUARANTINED: Insufficient legal authorization'
    );

    res.json({
      authorized: isAuthorized,
      status: isAuthorized ? 'PASSED' : 'QUARANTINED',
      gateTimestamp: new Date().toISOString(),
      warrantVerified: isAuthorized,
      message: isAuthorized
        ? 'Legal clearance verified. Data pipeline accessible for processing.'
        : 'Access Quarantined: Missing or invalid Section 91 / Court Authorization Warrant.'
    });
  });

  // AI Assistant Query endpoint
  app.post('/api/ai/query', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    const qLower = query.toLowerCase();

    // Build context from synthetic knowledge graph
    const relevantEntities = entities.filter(e =>
      qLower.includes(e.name.toLowerCase()) ||
      qLower.includes(e.label.toLowerCase()) ||
      (e.aliases && e.aliases.some(a => qLower.includes(a.toLowerCase())))
    );

    // If Gemini client is available, ask Gemini with grounded prompt
    const ai = getGeminiClient();
    if (ai) {
      try {
        const systemPrompt = `You are the NCRB AI Criminal Network Analysis Assistant (SIH 2026 Problem Statement 26189).
You operate on a synthetic/demo investigation dataset for CASE-26189-001 (Organized Financial & Communication Network).
RULES:
1. Never declare anyone guilty or make unsupported accusations.
2. Use neutral, objective investigation terminology: "Potential connection", "Possible match", "Requires investigator verification", "Structurally important node", "AI-generated lead".
3. Every finding must state:
   - Finding summary
   - Supporting evidence reference (e.g., CDR-104, TX-221, LOC-087, FIR-2026-089)
   - Date/Time
   - Confidence percentage
   - Human verification status (e.g. Verified / Pending Review)
4. Knowledge Graph Context:
Entities: ${JSON.stringify(entities.map(e => ({ name: e.name, type: e.type, role: e.role, aliases: e.aliases })))}
Relationships: ${JSON.stringify(relationships.map(r => ({ source: r.source, target: r.target, type: r.type, explanation: r.explanation, confidence: r.confidence })))}
Evidence: ${JSON.stringify(evidenceList.map(ev => ({ id: ev.id, source: ev.sourceType, relation: ev.relationship, confidence: ev.confidence })))}
Answer concisely, directly addressing the investigator.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: query,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2
          }
        });

        const textOutput = response.text || '';
        addAudit(`AI Assistant Query Answered (Gemini 3.8 Flash)`, 'AI_ASSISTANT', 'Synthesized Response with Grounded Evidence');

        return res.json({
          answer: textOutput,
          evidenceRef: 'CDR-104, TX-221, LOC-087',
          confidence: 91,
          verificationStatus: 'Pending Investigator Verification',
          modelUsed: 'gemini-3.8-flash (Server-Side Grounded)'
        });
      } catch (err) {
        console.warn('Gemini query fallback:', err);
      }
    }

    // Deterministic fallback response grounded in synthetic database
    let answer = '';
    let evidenceRef = 'CDR-104';
    let confidence = 88;
    let status = 'Pending Investigator Verification';

    if (qLower.includes('arjun') || qLower.includes('mehta') || qLower.includes('connections of person a')) {
      answer = `Arjun Mehta demonstrates 7 direct structural connections in the network. He is linked as the subscriber of Phone-101 (EVD-CDR-101), has 42 logged calls with Phone-102 (Sameer Shah), was spotted co-located at Pune Camp (EVD-LOC-087), and is named in FIR-2026-089 (EVD-FIR-089). Betweenness centrality metric is 0.88, categorizing this entity as a Central Network Connector.`;
      evidenceRef = 'CDR-104, LOC-087, FIR-089';
      confidence = 94;
      status = 'Verified';
    } else if (qLower.includes('phone') || qLower.includes('phone-101') || qLower.includes('phone-102')) {
      answer = `Phone-101 (+91-98231-XXXX1) is registered to Arjun Mehta and engaged in 42 bilateral calls with Phone-102 (+91-98231-XXXX2) held by Sameer Shah. Phone-102 was the device originating the extortion messages cited in FIR-2026-089.`;
      evidenceRef = 'CDR-104, FIR-089';
      confidence = 94;
      status = 'Verified';
    } else if (qLower.includes('location') || qLower.includes('pune camp') || qLower.includes('common location')) {
      answer = `Pune Camp Sector 4 is an identified shared rendezvous location. Both Arjun Mehta (Phone-101) and Sameer Shah (Phone-102) registered concurrent cell-tower dwell times between 17:15 and 19:10 IST on 14 June within a 400-meter sector.`;
      evidenceRef = 'LOC-087, LOC-088';
      confidence = 92;
      status = 'Under Review';
    } else if (qLower.includes('financial') || qLower.includes('account') || qLower.includes('tx-221') || qLower.includes('rohan')) {
      answer = `Financial analysis traced INR 18,50,000 transferred on 13 June from Company Alpha corporate account ACC-201 (signatory Rohan Kulkarni) to private savings account ACC-202 (signatory Neha Patil). This transaction (TX-221) exhibited anomalous velocity immediately following extortion calls.`;
      evidenceRef = 'FIN-201, ROC-301';
      confidence = 98;
      status = 'Verified';
    } else if (qLower.includes('alias') || qLower.includes('rahul')) {
      answer = `Possible alias match detected: 'Rahul Sharma' <-> 'Arjun Mehta' with 87% match confidence. Supporting indicators include shared phone association, overlapping location telemetry at Pune Camp, and mutual linkages to Neha Patil. Under system safety guidelines, this remains in 'Requires Human Verification' status.`;
      evidenceRef = 'ALIAS-01, EVD-CDR-101, EVD-LOC-087';
      confidence = 87;
      status = 'Pending Human Verification';
    } else if (qLower.includes('centrality') || qLower.includes('key player') || qLower.includes('node')) {
      answer = `Graph centrality metrics identify Arjun Mehta (Betweenness: 0.88, Role: Connector) and Neha Patil (Betweenness: 0.74, Role: Broker) as the structurally critical entities. Neha Patil bridges communication cells with the financial dissipation accounts.`;
      evidenceRef = 'GRAPH-CENTRALITY-ENGINE';
      confidence = 90;
      status = 'Verified';
    } else if (qLower.includes('unusual') || qLower.includes('anomaly')) {
      answer = `Three potential anomalies are flagged: 1) 420% communication velocity spike between Phone-101 and Phone-102 on 12 June; 2) Rapid liquidation of INR 18.5 Lakhs through ACC-201 in under 5 minutes; 3) Unscheduled convergence of 3 entities at Pune Camp on 14 June.`;
      evidenceRef = 'ANOM-01, ANOM-02, ANOM-03';
      confidence = 93;
      status = 'Under Review';
    } else {
      answer = `Based on the synthetic investigation database for CASE-26189-001: Found ${relevantEntities.length > 0 ? relevantEntities.map(e => e.name).join(', ') : 'entities'} participating in connected communication, financial, and location patterns. All findings link to verified evidence items with integrity hashes.`;
      evidenceRef = 'EVD-CDR-104, EVD-FIN-201';
      confidence = 86;
      status = 'Pending Review';
    }

    addAudit(`AI Assistant Query: "${query.substring(0, 40)}..."`, 'AI_ASSISTANT', 'Grounded Synthetic Query Resolved');

    res.json({
      answer,
      evidenceRef,
      confidence,
      verificationStatus: status,
      modelUsed: 'NCRB Graph Semantic Engine (Deterministic Fallback)'
    });
  });

  // Serve frontend: Vite middleware in development or static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI-Powered Criminal Network Analysis Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
