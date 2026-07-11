
from app.managers.collector_manager import CollectorManager

manager = CollectorManager()
incidents = manager.collect_all()
      
for incident in incidents:
        print("__________________________________")
        print(f"Source           :   {incident.source}")
        print(f"Title            :   {incident.title}")
        print(f"Incident Type    :   {incident.incident_type}")
        print(f"Location         :   {incident.location}")
        print(f"Severity Score   :   {incident.severity_score}")
        print(f"Severity Level   :   {incident.severity_level}")
        print(f"Timestamp        :   {incident.timestamp}")
        print("__________________________________")  

print(f"Collected {len(incidents)} incidents")
print("__________________________________")