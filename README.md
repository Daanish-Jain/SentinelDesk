# SentinelDesk

This is going to be my step into AI Engineering, This will be a real life disaster management project

# SentinelDesk

*Multi-Agent Disaster & Local Risk Intelligence Copilot*

SentinelDesk is an AI-powered situational awareness platform that aggregates real-time disaster and emergency data from multiple public sources, normalizes and deduplicates incidents, enriches them using AI, and generates actionable situation reports. The platform exposes the processed intelligence through a FastAPI backend for external applications and future dashboards.

> *Current Status: Under Development*


# Features (Current)

* Live earthquake data collection from the USGS Earthquake API

* Live weather and emergency alert collection through NOAA

* Modular collector architecture for scalable multi-source data ingestion

* Generalized Incident model for normalizing heterogeneous data sources

* UTC timestamp normalization

* Incident deduplication

* Input validation for incomplete or invalid external records

* Network timeout handling

* Robust HTTP error handling using the `requests` library

* Gemini API integration for AI-powered incident enrichment

* AI-generated incident categorization and urgency classification

* AI-generated incident summaries and reasoning

* Entity extraction and confidence scoring

* Automated situation report generation

* AI-generated executive summaries and actionable recommendations

* Severity-based representative incident selection

* Persistent JSON storage for incidents and situation reports

* FastAPI REST API for accessing incidents, reports and statistics

* API endpoint for triggering the complete intelligence pipeline

* Pydantic response validation

* Automatic interactive API documentation through Swagger UI


## Project Structure

```text
SentinelDesk/
│
├── app/
│   │
│   ├── ai/
│   │   └── ...
│   │
│   ├── api/
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
│   ├── dashboard/
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
│   └── utils/
│       └── ...
│
├── data/
│   ├── incidents.json
│   └── report.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Incidents.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   ├── api.ts
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
│
├── scripts/
│
├── tests/
│
├── README.md
├── requirements.txt
└── .gitignore

# Milestone Progress

# Milestone 1.1 – Project Setup

* Created scalable project structure
* Implemented the first data collector
* Connected to the USGS Earthquake API
* Added timeout and exception handling for network requests


# Milestone 1.2 - Input Data Generalisation

* Created a generalized incident input type for any json input
* Normalized the input so it stays constant across the input platforms
* UTC Timestamp normalization


# Milestone 1.3 - Collector Manager

* Now we have curated a manager that will store the data from different sources into a common list


# Milestone 1.4 - Situation Report Generation

* Created a situation report generator to get a daily report 
* Showcasing Incident counts, source counts, location counts and top representative situations


# Milestone 1.5 - AI Incident Enrichment

* Integrated Google Gemini API
* Added AI-based incident categorization
* Added urgency classification
* Added contextual incident summaries
* Added entity extraction
* Added confidence scores
* Added AI reasoning


# Milestone 1.6 - Situation Report Generation

* Created a situation report generator
* Added total incident counts
* Added category counts
* Added urgency counts
* Added source counts
* Added location counts
* Added severity-based representative incidents
* Milestone 1.7 - AI Report Enrichment
* Added AI-generated executive summaries
* Added actionable safety recommendations
* Integrated Gemini-powered report enrichment


# Milestone 1.8 - Persistent Storage

* Created IncidentRepository
* Created ReportRepository
* Added JSON-based incident persistence
* Added JSON-based situation report persistence
* Added serialization and deserialization of stored data


# Milestone 1.9 - FastAPI Backend

* Created FastAPI application
* Added API health monitoring
* Added incident retrieval endpoints
* Added individual incident lookup
* Added situation report endpoint
* Added statistics endpoint
* Added complete pipeline refresh endpoint
* Added proper HTTP 404 handling
* Added Pydantic API response schemas
* Added response validation
* Added automatic Swagger API documentation


# Milestone 1.10 - Refresh Pipeline

* Created a reusable RefreshService
* Moved the complete data processing workflow into a reusable service
* Connected the refresh pipeline to the FastAPI backend
* Added error handling around the refresh pipeline
* The entire collection → deduplication → AI enrichment → reporting → storage pipeline can now be triggered using the API
* Current Progress


# Milestone 2.1 - Frontend Initialization

* Created a Frontend for SentinelDesk using React-Vite
* Established frontend API Layer
* Created typescript models
* Built the Dashboard
* Built Incidents page with initial filtering implementation and clickable incident


# Current Progress

@ BACKEND

[x] Data collection
[x] Normalization
[x] Multi-source ingestion
[x] Deduplication
[x] AI enrichment
[x] Situation reports
[x] Persistence
[x] FastAPI
[x] API response schemas
[x] Error handling
[x] Refresh endpoint
[x] Statistics endpoint
[x] Individual incident endpoint

@ FRONTEND

[x] React application
[x] Dashboard
[x] API integration
[x] Incident list
[x] Search
[x] Source filtering
[x] Severity filtering
[x] Clickable incidents
[x] Incident detail view
[x] Map
[x] Situational Report
[ ] Polished AI analysis
[ ] Better visualizations
[ ] Advanced filtering


## TODO
* Extend Incident to support polygon geometries by day 10
* Add severity score metric in the prompt
* Timezone-aware incident timestamps
* Compact incident table
* Incident detail view
* AI analysis visualization
* Advanced incident filtering
* Incident sorting

## Learning Goals

This project is being built to demonstrate:

* AI Engineering
* Production-quality Python
* Multi-Agent Systems
* RAG
* LLMOps
* MLOps
* API Integration
* Software Architecture
* Observability
* Evaluation

---

