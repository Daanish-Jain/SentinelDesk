import json
import os
from app.reporting.report_models import SituationReport


class ReportRepository:

    def __init__(self):
        self.file_path = "data/report.json"
        
    def save(self, report: SituationReport):
        with open(self.file_path, "w", encoding="utf-8") as file:
            json.dump(
                report.to_dict(),
                file,
                indent=4,
                ensure_ascii=False
            )
            
    

    def load(self) -> SituationReport:
        print("Current Working Directory:", os.getcwd())
        print("Looking for:", os.path.abspath(self.file_path))

        with open(self.file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        return SituationReport.from_dict(data)