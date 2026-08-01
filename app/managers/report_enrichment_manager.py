from app.reporting.report_models import SituationReport
from app.services.llm_report_service import LLMReportService


class ReportEnrichmentManager:
    def __init__(self):
        self.llm_service = LLMReportService()

    def enrich(self, report: SituationReport) -> SituationReport:
        self.llm_service.generate_summary(report)
        
        return report