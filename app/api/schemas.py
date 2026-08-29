from datetime import datetime
from typing import Any
from pydantic import BaseModel


class AIAnalysisResponse(BaseModel):
    category: str
    confidence: float
    summary: str
    urgency: str
    entities: dict[str, list[str]]
    reasoning: list[str] | None = None


class IncidentResponse(BaseModel):
    id: str
    source: str
    incident_type: str
    title: str

    latitude: float
    longitude: float
    location: str

    severity_score: float
    severity_level: str

    timestamp: datetime
    confidence: float

    raw_data: dict[str, Any]
    description: str | None = None

    analysis: AIAnalysisResponse | None = None
    
    
class SituationReportResponse(BaseModel):
    generated_at: datetime
    total_incidents: int

    category_counts: dict[str, int]
    urgency_counts: dict[str, int]
    source_counts: dict[str, int]
    location_counts: dict[str, int]

    representative_incidents: list[IncidentResponse]

    executive_summary: str | None = None
    recommendations: list[str] | None = None


class StatsResponse(BaseModel):
    total_incidents: int
    categories: dict[str, int]
    urgencies: dict[str, int]
    sources: dict[str, int]
    locations: dict[str, int]


class RefreshResponse(BaseModel):
    status: str
    incidents_collected: int
    report_generated: bool