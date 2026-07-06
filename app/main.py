from app.collectors.earthquake_collector import EarthquakeCollector

eq_collector=EarthquakeCollector()
incidents = eq_collector.fetch()
print("__________________________________")
if incidents:
    i=0
    while i<10:
        incident = incidents[i]
        print(f"Title           : {incident.title}")
        print(f"Location        : {incident.location}")
        print(f"Severity Score  : {incident.severity_score}")
        print(f"Severity Level  : {incident.severity_level}")
        print(f"Time            : {incident.timestamp}")
        print()
        i+=1

print("__________________________________")