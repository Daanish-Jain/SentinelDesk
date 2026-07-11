import os
import json

from dotenv import load_dotenv # type: ignore
from google import genai

from app.models.incident import Incident
from app.models.ai_analysis import AIAnalysis
from app.prompts.disaster_analysis_prompt import DISASTER_ANALYSIS_PROMPT

    
class LLMEnrichmentService:
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env")
                
        self.client = genai.Client(api_key = api_key)
        
        self.model_name = "gemini-2.5-flash"
             
    
    def _build_prompt(self, incident: Incident) -> str: # Underscore used before the function to make it private (internal function)
        prompt = DISASTER_ANALYSIS_PROMPT.format(
            title       = incident.title,
            description = incident.description or "",
            location    = incident.location,
            severity    = incident.severity_level,
            source       = incident.source
        )    
        return prompt
   
    
    def _call_llm(self, prompt):
        response = self.client.models.generate_content(
            model = self.model_name,
            contents = prompt)
        return response
    
    
    def _parse_response(self,response):
        analysis_dict = json.loads(response.text)
        analysis = AIAnalysis(**analysis_dict)
        return analysis
    
    
    def analyze(self, incident: Incident) -> AIAnalysis : 
        prompt = self._build_prompt(incident)
        
        response = self._call_llm(prompt)
        
        analysis = self._parse_response(response)
        
        return analysis