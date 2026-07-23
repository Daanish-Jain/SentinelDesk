from app.services.llm_enrichment_service import LLMEnrichmentService
from app.models.incident import Incident

class EnrichmentManager:
    def __init__(self):
        self.llm_service = LLMEnrichmentService()
    
    def enrich(self, incidents: list[Incident]) -> list[Incident]:
        for incident in incidents[:10]:
            self.llm_service.analyze(incident)
            
        return incidents