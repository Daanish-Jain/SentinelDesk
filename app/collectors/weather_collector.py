import requests # type: ignore #--> requests used to make http requests
from app.models.incident import Incident
from datetime import datetime

class WeatherCollector:
    def __init__(self):
        self.source = "NOAA"
        self.url = "https://api.weather.gov/alerts/active"
    
    def _get_severity_score(self, severity_level: str) -> float:
        if severity_level == "Minor":
            return 1.0
        elif severity_level == "Moderate":
            return 2.0
        elif severity_level == "Severe":
            return 3.0
        elif severity_level == "Extreme":
            return 4.0
        else:
            return 0.0
           
        
    def _create_incident(self,feature):
        properties = feature["properties"]
        geometry = feature["geometry"]
        severity = properties.get("severity","Unknown")
        incident = Incident(
            id = feature["id"],
            source = self.source,
            incident_type = properties["event"],
            title = properties["headline"],
            longitude=None,
            latitude=None,
            location = properties["areaDesc"],
            severity_score = self._get_severity_score(severity),
            severity_level = severity,
            timestamp = datetime.fromisoformat(properties["effective"]),
            confidence = 1.0,
            raw_data = feature,
            description = properties["description"]
        )
        return incident
      
    
    def fetch(self):
        """
        Fetch the latest weather reports from NOAA
        and convert them into Incident objects.
        """
        try:
            response = requests.get(self.url,timeout=5)
            response.raise_for_status()
            data=response.json()
            
            features = data["features"]
            
            incidents = []
            
            for feature in features:
                properties = feature["properties"]

                if not properties.get("headline"):
                    continue
                
                if not properties.get("event"):
                    continue
                
                incident = self._create_incident(feature)
                incidents.append(incident)
            
            return incidents
        except requests.exceptions.Timeout:
            print("Request timed out")
            return None
        except requests.exceptions.RequestException as e:
            print(f"Error occured: {e}")
            return None
    
    
