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