import os
import json

from dotenv import load_dotenv # type: ignore
from google import genai

from app.reporting.report_models import SituationReport
from app.prompts.situation_report_prompt import SITUATION_REPORT_PROMPT

    
class LLMReportService:
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env")
                
        self.client = genai.Client(api_key = api_key)
        
        self.model_name = "gemini-3.5-flash-lite"
        
        #for model in self.client.models.list():
        #    print(model.name)     
    
    def _format_representative_incidents(self, report: SituationReport) -> str:
        formatted = []

        for incident in report.representative_incidents:
            formatted.append(
            f"""Incident
            Title: {incident.title}
            Location: {incident.location}
            Severity: {incident.severity_level}
            Source: {incident.source}
            """
            )

        return "\n".join(formatted)

    def _build_prompt(self, report: SituationReport) -> str: # Underscore used before the function to make it private (internal function)
        prompt = SITUATION_REPORT_PROMPT.format(
            total_incidents          = report.total_incidents,
            category_counts          = report.category_counts,
            urgency_counts           = report.urgency_counts,
            source_counts            = report.source_counts,
            location_counts          = report.location_counts,
            representative_incidents = self._format_representative_incidents(report)
        )    
        return prompt
   
    
    def _call_llm(self, prompt):
        try:
            response = self.client.models.generate_content(
                model = self.model_name,
                contents = prompt)
            return response
        except Exception as e:
            print(e)
            return None
    
    
    def _parse_response(self,response):
        return json.loads(response.text)
    
    
    def generate_summary(self, report: SituationReport) -> SituationReport:
        prompt = self._build_prompt(report)

        response = self._call_llm(prompt)

        if response is None:
            return report

        try:
            summarize = self._parse_response(response)
            
            report.executive_summary =  summarize.get("executive_summary")
            
            report.recommendations = summarize.get("recommendations", [])
        except Exception as e:
            print(f"Parse Error: {e}")

        return report