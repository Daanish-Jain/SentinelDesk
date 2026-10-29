# SentinelDesk

### Multi-Agent Disaster & Local-Risk Intelligence Copilot

**SentinelDesk is my journey into AI Engineering.** I'm building a real-world disaster intelligence platform that collects emergency information from public data sources, processes and deduplicates incidents, enriches them using AI, and presents actionable intelligence through an interactive dashboard.

The long-term goal is to build a reliable situational awareness system that helps users understand emerging disasters, identify high-priority incidents, and make better-informed decisions using real-time data and AI-assisted analysis.

**Current Status:** Under Development — Core backend pipeline and initial interactive dashboard implemented.

---

## Overview

Disaster-related information is distributed across multiple sources, including earthquake feeds, weather alerts, and emergency notifications. This makes it difficult to develop a unified understanding of what is happening, where it is happening, and which incidents require immediate attention.

SentinelDesk addresses this problem by building a unified intelligence pipeline:

```text
Public Data Sources
        |
        v
Multi-Source Data Collection
        |
        v
Incident Normalization
        |
        v
Deduplication
        |
        v
AI-Powered Incident Enrichment
        |
        v
Incident Triage
        |
        v
Situation Report Generation
        |
        v
Persistent JSON Storage
        |
        v
FastAPI Backend
        |
        v
React Intelligence Dashboard
```

The architecture is modular, allowing additional data collectors, analysis components, storage systems, and intelligence capabilities to be introduced as the project evolves.

## Features

### 1. Multi-Source Data Collection

- Earthquake data collection through the USGS Earthquake API.
- Weather and emergency alert collection through NOAA.
- Modular collector architecture for adding additional sources.
- HTTP timeout handling and exception management.
- HTTP response validation and error handling.
- Handling of incomplete records and missing geographic coordinates.

### 2. Incident Normalization

- Generalized `Incident` data model for heterogeneous sources.
- Standardized incident attributes, including source, type, title, location, severity, and confidence.
- UTC-aware timestamp normalization.
- Consistent incident representation across collectors.
- Serialization and deserialization of incident records.

### 3. Incident Deduplication

- Centralized deduplication manager.
- Removal of duplicate incidents using source and incident attributes.
- Common processing pipeline for incidents from multiple collectors.

### 4. AI-Powered Incident Enrichment

- Google Gemini API integration.
- AI-assisted incident categorization.
- Urgency classification.
- Contextual incident summaries.
- Entity extraction.
- Confidence scoring.
- AI-generated reasoning.

AI enrichment is integrated into the processing pipeline. To control development-time API usage, enrichment is currently limited to a subset of incidents.

### 5. Incident Triage

SentinelDesk classifies incidents into three operational priority levels:

| Priority | Purpose |
|---|---|
| Immediate Action | Incidents requiring the highest operational attention. |
| Active Monitoring | Incidents that warrant continued observation. |
| Advisory | Lower-priority incidents retained for awareness and reference. |

- Rule-based triage using incident severity and available AI urgency.
- Persistent triage classifications.
- Dedicated API endpoint for retrieving categorized incidents.
- Dashboard displaying counts and incidents for each priority level.
- Incident inspection directly from the triage queue.

Triage organizes attention without discarding lower-priority incidents.

### 6. Automated Situation Reports

- Total incident count.
- Incident category distribution.
- Urgency distribution.
- Source distribution.
- Location distribution.
- Severity-based representative incident selection.
- AI-generated executive summaries.
- AI-generated actionable safety recommendations.

The report combines programmatic aggregation with AI-assisted synthesis.

### 7. Persistent Storage

- JSON-based incident storage.
- JSON-based situation report storage.
- Dedicated incident and report repositories.
- Serialization and deserialization of stored data.
- Persisted triage classifications.

MySQL is planned as a future storage upgrade.

### 8. FastAPI Backend

- REST API for incident retrieval.
- Individual incident lookup.
- Situation report retrieval.
- Incident statistics.
- Triage queue retrieval.
- Endpoint for refreshing the intelligence pipeline.
- Pydantic response schemas and validation.
- HTTP error handling.
- Health-check endpoint.
- Interactive API documentation through Swagger UI.

### 9. React Intelligence Dashboard

The frontend is built with React, TypeScript, and Vite.

Current functionality includes:

- **Operational Overview:** Dashboard displaying incident intelligence and aggregated statistics.
- **Incidents:** Incident listing, filtering, and individual incident inspection.
- **Live Map:** Geographic visualization of incidents using Leaflet and marker clustering.
- **Situation Report:** Display of aggregated intelligence, summaries, and recommendations.
- **Incident Detail:** Metadata, triage level, AI analysis when available, and structured source-alert information.
- **Incident Triage:** Priority-based incident queues with incident counts.
- **Triage Search:** Search by incident title, location, type, or source.
- **Severity Filtering:** Filter incidents by severity within the triage queues.
- **Refresh Intelligence:** Trigger the backend processing pipeline from the dashboard.

The interface uses a dark operational dashboard design intended to make incident information easier to scan.

---

## Technology Stack

| Area | Technologies |
|---|---|
| Language | Python |
| AI / LLM | Google Gemini API |
| Backend API | FastAPI |
| API Validation | Pydantic |
| HTTP Requests | Requests |
| Data Models | Python dataclasses |
| Persistence | JSON |
| Frontend | React, TypeScript, Vite |
| Mapping | Leaflet, React Leaflet |
| Map Clustering | React Leaflet Cluster |
| Package Management | pip, npm |
| Development Environment | VS Code, Windows |

**Planned technologies:** MySQL, vector databases, Retrieval-Augmented Generation (RAG), agentic AI orchestration, and production deployment.

These planned technologies are not yet represented as completed features.

---

## Project Structure

The structure below represents the main application modules. Some implementation details may evolve as the project grows.

```text
SentinelDesk/
│
├── app/
│   ├── ai/
│   │   └── ...
│   │
│   ├── api/
│   │   ├── main.py
│   │   ├── routes.py
│   │   └── schemas.py
│   │
│   ├── collectors/
│   │   ├── usgs_collector.py
│   │   ├── weather_collector.py
│   │   └── ...
│   │
│   ├── config/
│   │   └── ...
│   │
│   ├── managers/
│   │   ├── collector_manager.py
│   │   ├── deduplication_manager.py
│   │   ├── enrichment_manager.py
│   │   └── report_enrichment_manager.py
│   │
│   ├── models/
│   │   ├── incident.py
│   │   ├── ai_analysis.py
│   │   └── ...
│   │
│   ├── reporting/
│   │   ├── report_models.py
│   │   └── situation_report_generator.py
│   │
│   ├── services/
│   │   └── refresh_service.py
│   │
│   ├── storage/
│   │   ├── incident_repository.py
│   │   └── report_repository.py
│   │
│   ├── triage/
│   │   └── triage_manager.py
│   │
│   └── utils/
│       └── ...
│
├── data/
│   ├── incidents.json
│   └── report.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── IncidentDetail.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Incidents.tsx
│   │   │   ├── LiveMap.tsx
│   │   │   ├── SituationReport.tsx
│   │   │   └── Triage.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   └── incident.ts
│   │   │
│   │   ├── App.tsx
│   │   └── App.css
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── docs/
├── scripts/
├── tests/
├── requirements.txt
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Install the following before running the application:

- Python 3.10 or later, compatible with the project's dependencies.
- Node.js and npm.
- Git.
- A Google Gemini API key for AI-powered enrichment and report generation.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd SentinelDesk
```

Replace `<your-repository-url>` with the URL of your GitHub repository.

### 2. Set up the Python environment

On Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

If PowerShell blocks environment activation, use your usual Python environment or configure the appropriate execution policy for your machine.

### 3. Configure environment variables

Configure your Gemini API key using the environment-variable name expected by the project's existing configuration and AI service.

Keep credentials out of source control. Do not commit API keys, `.env` files containing secrets, or other sensitive configuration.

### 4. Start the backend

From the SentinelDesk project root:

```powershell
python -m uvicorn app.api.main:app --reload
```

The backend should be available at:

- API base URL: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/health

### 5. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, typically http://localhost:5173.

Keep both development servers running while using the application.

---

## API Endpoints

The following endpoints are implemented in the current backend.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | Check backend health |
| GET | `/incidents` | Retrieve stored incidents |
| GET | `/incidents/{incident_id}` | Retrieve an individual incident |
| GET | `/report` | Retrieve the latest situation report |
| GET | `/stats` | Retrieve incident statistics |
| GET | `/triage` | Retrieve incidents grouped by triage priority |
| POST | `/refresh` | Run the intelligence refresh pipeline |

For interactive testing, visit:

http://127.0.0.1:8000/docs

### Refreshing the intelligence pipeline

The refresh endpoint triggers the current workflow:

```text
Collect
  ↓
Deduplicate
  ↓
AI Enrichment
  ↓
Triage Classification
  ↓
Persist Incidents
  ↓
Generate Situation Report
  ↓
AI Report Enrichment
  ↓
Persist Report
```

The endpoint returns a response indicating whether the refresh succeeded, the number of incidents collected, and whether the report was generated.

---

## Development Milestones

### Milestone 1.1 — Project Setup

- [x] Created the initial project structure.
- [x] Implemented the first data collector.
- [x] Connected to the USGS Earthquake API.
- [x] Added network timeout and exception handling.

### Milestone 1.2 — Incident Normalization

- [x] Created a generalized incident data model.
- [x] Normalized data from heterogeneous sources.
- [x] Standardized timestamp handling.

### Milestone 1.3 — Collector Manager

- [x] Implemented centralized multi-source collection.
- [x] Combined collected incidents into a common representation.

### Milestone 1.4 — Situation Report Generation

- [x] Implemented programmatic situation report generation.
- [x] Added category, source, urgency, and location statistics.
- [x] Selected representative incidents.

### Milestone 1.5 — AI Incident Enrichment

- [x] Integrated Google Gemini.
- [x] Added incident categorization and urgency classification.
- [x] Added summaries, reasoning, entity extraction, and confidence scoring.

### Milestone 1.6 — Report Aggregation

- [x] Added total incident counts.
- [x] Added category and urgency distributions.
- [x] Added source and location distributions.
- [x] Added representative incident selection.

### Milestone 1.7 — AI Report Enrichment

- [x] Added AI-generated executive summaries.
- [x] Added actionable safety recommendations.
- [x] Integrated Gemini-powered report enrichment.

### Milestone 1.8 — Persistent Storage

- [x] Implemented `IncidentRepository`.
- [x] Implemented `ReportRepository`.
- [x] Added JSON-based persistence.
- [x] Added serialization and deserialization.

### Milestone 1.9 — FastAPI Backend

- [x] Created the FastAPI application.
- [x] Added incident and report endpoints.
- [x] Added statistics and health endpoints.
- [x] Added individual incident lookup and HTTP 404 handling.
- [x] Added Pydantic response schemas.
- [x] Enabled interactive Swagger documentation.

### Milestone 1.10 — Refresh Pipeline

- [x] Implemented a reusable `RefreshService`.
- [x] Connected the complete pipeline to the API.
- [x] Added refresh error handling.
- [x] Integrated incident triage into the persisted refresh workflow.

### Milestone 2.1 — Frontend Initialization

- [x] Created the React application using Vite.
- [x] Integrated the frontend with FastAPI.
- [x] Created TypeScript data models.
- [x] Built the initial dashboard.
- [x] Implemented incident listing and filtering.

### Milestone 2.2 — Incident Intelligence Interface

- [x] Added individual incident inspection.
- [x] Added incident metadata and AI analysis presentation.
- [x] Structured long NOAA source alerts for readability.
- [x] Added source information to incident details.

### Milestone 2.3 — Geographic Intelligence

- [x] Implemented the Live Map using Leaflet.
- [x] Added geographic incident visualization.
- [x] Added marker clustering.
- [x] Handled incidents with missing coordinates.

### Milestone 2.4 — Operational Triage

- [x] Implemented rule-based incident triage.
- [x] Added Immediate Action, Active Monitoring, and Advisory queues.
- [x] Persisted triage classifications.
- [x] Added a dedicated triage API endpoint.
- [x] Added a triage dashboard with incident inspection.
- [x] Implemented frontend search and severity filtering.

---

## Current Progress

### Backend

- [x] Multi-source data collection.
- [x] Incident normalization.
- [x] Deduplication.
- [x] AI incident enrichment.
- [x] Rule-based triage.
- [x] Situation report generation.
- [x] AI-generated report enrichment.
- [x] JSON persistence.
- [x] FastAPI integration.
- [x] API response validation.
- [x] Error handling.
- [x] Refresh pipeline.
- [x] Incident, report, statistics, and triage endpoints.

### Frontend

- [x] React and TypeScript application.
- [x] Operational dashboard.
- [x] API integration.
- [x] Incident listing and filtering.
- [x] Individual incident details.
- [x] Live incident map and clustering.
- [x] Situation report page.
- [x] Structured NOAA alert display.
- [x] Triage priority queues.
- [x] Triage search and severity filtering.

### Still in Development

- [ ] Improve AI analysis coverage and quality.
- [ ] Add richer dashboard visualizations.
- [ ] Improve incident sorting and advanced filters.
- [ ] Support polygon and area-based incident geometry.
- [ ] Improve geospatial analysis and incident correlation.
- [ ] Add automated tests and evaluation.
- [ ] Introduce more robust persistent storage.
- [ ] Improve operational monitoring and reliability.

---

## Roadmap

The next phases will focus on improving reliability, intelligence quality, and the usefulness of the system.

### Phase 3 — Intelligence and Geospatial Improvements

- Improve severity scoring and triage calibration.
- Add better geographic representations for affected areas.
- Improve incident correlation across sources.
- Add richer operational dashboard visualizations.
- Improve AI analysis quality and coverage.

### Phase 4 — Database and Reliability

- Migrate JSON persistence to MySQL.
- Improve data validation and storage consistency.
- Add automated tests.
- Introduce structured logging and observability.
- Improve error recovery and pipeline reliability.

### Phase 5 — Retrieval-Augmented Generation

- Introduce a vector database where appropriate.
- Retrieve relevant incident history and source information.
- Ground AI-generated situation reports in retrieved evidence.
- Evaluate retrieval relevance and answer quality.

### Phase 6 — Agentic Intelligence

- Explore specialized agents for collection, verification, analysis, and reporting.
- Introduce coordinated workflows where they provide measurable value.
- Evaluate whether agentic orchestration improves reliability over the existing modular pipeline.

### Phase 7 — Deployment

- Prepare the backend and frontend for deployment.
- Secure API credentials and configuration.
- Introduce production-appropriate logging and monitoring.
- Evaluate performance, scalability, and reliability.

These phases are planned directions rather than completed capabilities.

---

## Learning Goals

SentinelDesk is also my practical learning path into AI Engineering.

Through this project, I aim to develop skills in:

- Python application architecture.
- API integration and backend engineering.
- Data ingestion, normalization, and deduplication.
- Large Language Model integration.
- Prompt engineering and structured AI outputs.
- AI-assisted classification and summarization.
- Evaluation and reliability of LLM-powered systems.
- Retrieval-Augmented Generation.
- Multi-agent system design.
- MLOps and LLMOps.
- Observability and production engineering.
- Geospatial intelligence and data visualization.

My focus is not just to build a dashboard that calls an LLM, but to develop a modular and testable intelligence pipeline that can progressively evolve into a reliable real-world system.

---

## Project Philosophy

SentinelDesk is being developed incrementally.

The current priority is to establish a working end-to-end pipeline, understand the behavior of each component, validate the data, and improve reliability before introducing more complex architectures.

The long-term objective is to move from collecting and displaying disaster information toward **evidence-grounded situational awareness, cross-source incident verification, and actionable intelligence**.

**Status:** Active development.
