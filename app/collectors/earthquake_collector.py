import requests #--> requests used to make http requests

class EarthquakeCollector:
    def __init__(self):
        self.source = "USGS"
        self.url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    def fetch(self):
    # Fetch earthquake data from the USGS API. 
    # Returns:
    #   dict | None:
    #       JSON response on success,
    #       None if the request fails.
    
        try:
            response = requests.get(self.url,timeout=5)
            response.raise_for_status()
            data=response.json()
            return data
        except requests.exceptions.Timeout:
            print("Request timed out")
            return None
        except requests.exceptions.RequestException as e:
            print(f"Error occured: {e}")
            return None
    
    
