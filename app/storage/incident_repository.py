import json
from app.models.incident import Incident
from pathlib import Path

class IncidentRepository:
    def __init__(self):
        self.file_path = Path("data/incidents.json") 
        self.file_path.parent.mkdir(parents=True, exist_ok=True) #If data/ doesn't already exist, this creates the directory
    
    def save(self,incidents : list[Incident]) -> None:
        incident_data = [incident.to_dict() for incident in incidents]
        
        with open(self.file_path, "w", encoding="utf-8") as file:
            json.dump(incident_data, file, indent=4)
    
    def load(self) -> list[Incident]:
        if not self.file_path.exists():
            return []

        with open(self.file_path, "r", encoding="utf-8") as file:
            incident_data = json.load(file)

        incidents = [Incident.from_dict(data) for data in incident_data]

        return incidents
    
