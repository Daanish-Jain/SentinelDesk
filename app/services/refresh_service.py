from app.managers.collector_manager import CollectorManager
from app.managers.deduplication_manager import DeduplicationManager
from app.managers.enrichment_manager import EnrichmentManager
from app.managers.report_enrichment_manager import ReportEnrichmentManager
from app.reporting.situation_report_generator import SituationReportGenerator
from app.storage.incident_repository import IncidentRepository
from app.storage.report_repository import ReportRepository
from app.triage.triage_manager import TriageManager

class RefreshService:

    def __init__(self):
        self.collector = CollectorManager()
        self.deduplicator = DeduplicationManager()
        self.enrichment = EnrichmentManager()
        self.report_generator = SituationReportGenerator()
        self.report_enrichment = ReportEnrichmentManager()
        self.incident_repository = IncidentRepository()
        self.report_repository = ReportRepository()
        self.triage = TriageManager()

    def refresh(self):
        try:
            incidents = self.collector.collect_all()

            if incidents is None:
                raise RuntimeError("Failed to collect incidents")

            incidents = self.deduplicator.deduplicate(incidents)

            incidents = self.enrichment.enrich(incidents)

            incidents = self.triage.classify(incidents)
            
            self.incident_repository.save(incidents)

            report = self.report_generator.generate(incidents)

            report = self.report_enrichment.enrich(report)

            self.report_repository.save(report)

            return incidents, report

        except Exception as e:
            raise RuntimeError(f"Refresh pipeline failed: {e}") from e