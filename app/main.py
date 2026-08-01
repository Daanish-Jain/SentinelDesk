from app.managers.collector_manager import CollectorManager
from app.managers.enrichment_manager import EnrichmentManager
from app.managers.deduplication_manager import DeduplicationManager
from app.managers.report_enrichment_manager import ReportEnrichmentManager
from app.reporting.situation_report_generator import SituationReportGenerator
from app.storage.incident_repository import IncidentRepository

collector_manager = CollectorManager()
deduplicator = DeduplicationManager()
enrichment_manager = EnrichmentManager()
report_generator = SituationReportGenerator()
report_enrichment_manager = ReportEnrichmentManager()
repository = IncidentRepository()

# Collect incidents
incidents = collector_manager.collect_all()

# Remove duplicates
incidents = deduplicator.deduplicate(incidents)

# AI enrichment of incidents
incidents = enrichment_manager.enrich(incidents)

# Save incidents
repository.save(incidents)

# Load incidents
loaded_incidents = repository.load()

# Generate report
report = report_generator.generate(loaded_incidents)

# AI enrichment of report
report = report_enrichment_manager.enrich(report)

# Display report
report_generator.display_report(report)