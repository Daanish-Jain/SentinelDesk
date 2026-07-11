# SentinelDesk
This is going to be my step into AI Engineering, This will be a real life disaster management project

# SentinelDesk 

*Multi-Agent Disaster & Local Risk Intelligence Copilot*

SentinelDesk is an AI-powered situational awareness platform that aggregates real-time disaster and emergency data from multiple public sources, verifies and enriches incidents using AI, and generates actionable situation reports for emergency responders, insurers, journalists, and NGOs.

> *Current Status:* Under Development


# Features (Current)

*  Live earthquake data collection from the USGS Earthquake API
*  Modular collector architecture for scalable data ingestion
*  Network timeout handling
*  Robust HTTP error handling using the `requests` library
*  Clean Python package structure for future expansion

## Project Structure

```text
SentinelDesk/
│
├── app/
│   ├── ai/
│   ├── api/
│   ├── collectors/
│   ├── config/
│   ├── dashboard/
│   ├── database/
│   ├── models/
│   ├── services/
│   └── utils/
│
├── data/
├── docs/
├── scripts/
├── tests/
│
├── README.md
├── requirements.txt
└── .gitignore
```

---

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



# Current Progress

**Week 1**

* [x] Project setup
* [x] USGS API integration
* [x] Normalize incident data
* [x] Multi-source incident ingestion
* [ ] SQLite database
* [ ] Streamlit dashboard
* [ ] Interactive map


## TODO
* Extend Incident to support polygon geometries by day 10
* Add severity score metric in the prompt


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

