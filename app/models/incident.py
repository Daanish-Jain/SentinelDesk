from dataclasses import dataclass
from datetime import datetime
from typing import Any

@dataclass
class Incident:
    id: str
    source: str
    incident_type: str
    title : str
    latitude : float
    longitude : float
    location : str
    severity_score : float # for the calculations
    severity_level : str # For humans to understand
    timestamp : datetime
    confidence : float
    raw_data : dict[str,Any] #because it loads a json format
    description : str | None=None