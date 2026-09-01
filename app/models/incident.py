from dataclasses import dataclass, asdict
from datetime import datetime
from typing import Any

from app.models.ai_analysis import AIAnalysis


@dataclass
class Incident:
    id: str
    source: str
    incident_type: str
    title: str
    location: str
    severity_score: float
    severity_level: str
    timestamp: datetime
    confidence: float
    raw_data: dict[str, Any]
    latitude: float | None
    longitude: float | None
    description: str | None = None
    analysis: AIAnalysis | None = None

    def to_dict(self) -> dict:
        data = asdict(self)

        # Convert datetime to ISO string
        data["timestamp"] = self.timestamp.isoformat()

        return data

    @classmethod
    def from_dict(cls, data: dict) -> "Incident":
        data = data.copy()

        # Convert analysis dictionary back to AIAnalysis object
        if data.get("analysis") is not None:
            data["analysis"] = AIAnalysis.from_dict(data["analysis"])

        # Convert ISO string back to datetime
        data["timestamp"] = datetime.fromisoformat(data["timestamp"])

        return cls(**data)