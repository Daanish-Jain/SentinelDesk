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