from app.managers.collector_manager import CollectorManager
from app.managers.enrichment_manager import EnrichmentManager
from app.managers.deduplication_manager import DeduplicationManager
from app.managers.report_enrichment_manager import ReportEnrichmentManager
from app.reporting.situation_report_generator import SituationReportGenerator
from app.storage.incident_repository import IncidentRepository
from app.storage.report_repository import ReportRepository
from app.triage.triage_manager import TriageManager
collector_manager = CollectorManager()
deduplicator = DeduplicationManager()
enrichment_manager = EnrichmentManager()
report_generator = SituationReportGenerator()
report_enrichment_manager = ReportEnrichmentManager()
repository = IncidentRepository()
report_repository = ReportRepository()
triage_manager = TriageManager()

# Collect incidents
incidents = collector_manager.collect_all()

# Remove duplicates
incidents = deduplicator.deduplicate(incidents)

# AI enrichment of incidents
incidents = enrichment_manager.enrich(incidents)

# Triage
incidents = triage_manager.classify(incidents)

# Save incidents
repository.save(incidents)

# Load incidents
loaded_incidents = repository.load()

# Generate report
report = report_generator.generate(loaded_incidents)

# AI enrichment of report
report = report_enrichment_manager.enrich(report)
report_repository.save(report)

# Load and Generate for testing
loaded_report = report_repository.load()
report_generator.display_report(loaded_report)

# Display report
#report_generator.display_report(report)