from app.collectors.earthquake_collector import EarthquakeCollector
from app.collectors.weather_collector import WeatherCollector

class CollectorManager:
    def __init__(self):
        self.collectors= [
            EarthquakeCollector(),
            WeatherCollector()
        ]

    def collect_all(self):
        all_incidents = []
        for collector in self.collectors:
            incidents = collector.fetch()
            if incidents:
                all_incidents.extend(incidents) # .extend is used in place of  
                                                # .append since the latter one 
                                                # puts in the whole list making 
                                                # all_incident a list of lists 
                                                # but we want to keep it as a 
                                                # list so we use .extend
        return all_incidents
    