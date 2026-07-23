from app.models.incident import Incident

class DeduplicationManager:
    def deduplicate(self, incidents) -> list[Incident]:
        seen = set()
        unique_incidents=[]
        
        for incident in incidents:
            key = (
                incident.source,
                incident.incident_type,
                incident.title,
                incident.location
            )
            
            if key not in seen:
                seen.add(key)
                unique_incidents.append(incident)
                
        return unique_incidents