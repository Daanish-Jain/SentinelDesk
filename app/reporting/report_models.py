from dataclasses import dataclass
from datetime import datetime
from app.models.incident import Incident


@dataclass
class SituationReport:
    generated_at : datetime
    total_incidents : int
    category_counts : dict[str,int]
    urgency_counts : dict[str,int]
    source_counts : dict[str,int]
    location_counts : dict[str,int]
    representative_incidents : list[Incident]
    executive_summary : str | None = None
    recommendations : list[str] | None = None
    
    def to_dict(self) -> dict:
        return {
            "generated_at": self.generated_at.isoformat(),
            "total_incidents": self.total_incidents,
            "category_counts": self.category_counts,
            "urgency_counts": self.urgency_counts,
            "source_counts": self.source_counts,
            "location_counts": self.location_counts,
            "representative_incidents": [
                incident.to_dict()
                for incident in self.representative_incidents
            ],
            "executive_summary": self.executive_summary,
            "recommendations": self.recommendations,
        }
        
    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            generated_at=datetime.fromisoformat(data["generated_at"]),
            total_incidents=data["total_incidents"],
            category_counts=data["category_counts"],
            urgency_counts=data["urgency_counts"],
            source_counts=data["source_counts"],
            location_counts=data["location_counts"],
            representative_incidents=[
                Incident.from_dict(incident)
                for incident in data["representative_incidents"]
            ],
            executive_summary=data.get("executive_summary"),
            recommendations=data.get("recommendations"),
        )