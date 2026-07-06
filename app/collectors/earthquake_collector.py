import requests #--> requests used to make http requests
from app.models.incident import Incident
from datetime import datetime,timezone

class EarthquakeCollector:
    def __init__(self):
        self.source = "USGS"
        self.url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    
    def _get_severity_level(self, magnitude: float) -> str:
        if magnitude < 3.0:
            return "Low"
        elif magnitude >=3.0 and magnitude < 5.0:
            return "Moderate"
        elif magnitude >=5.0 and magnitude < 7.0:
            return "High"
        else:
            return "Critical"
        
        
    def _create_incident(self,feature):
        properties = feature["properties"]
        geometry = feature["geometry"]
        incident = Incident(
            id = feature["id"],
            source = self.source,
            incident_type = properties["type"],
            title = properties["title"],
            longitude = geometry["coordinates"][0],
            latitude = geometry["coordinates"][1],
            location = properties["place"],
            severity_score = properties["mag"],
            severity_level = self._get_severity_level(properties["mag"]),
            timestamp = datetime.fromtimestamp(properties["time"]/1000,tz=timezone.utc),
            confidence = 1.0,
            raw_data = feature,
            description = None
        )
        return incident
      
    
    def fetch(self):
        """
        Fetch the latest earthquakes from USGS
        and convert them into Incident objects.
        """
        try:
            response = requests.get(self.url,timeout=5)
            response.raise_for_status()
            data=response.json()
            
            features = data["features"]
            
            incidents = []
            
            for feature in features:
                incident = self._create_incident(feature)
                incidents.append(incident)
            
            return incidents
        except requests.exceptions.Timeout:
            print("Request timed out")
            return None
        except requests.exceptions.RequestException as e:
            print(f"Error occured: {e}")
            return None
    
    
