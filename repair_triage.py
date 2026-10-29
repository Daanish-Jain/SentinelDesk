from app.storage.incident_repository import IncidentRepository
from app.triage.triage_manager import TriageManager


repository = IncidentRepository()
triage_manager = TriageManager()

incidents = repository.load()

print(f"Loaded {len(incidents)} incidents")

incidents = triage_manager.classify(incidents)

repository.save(incidents)

print("Triage classifications saved successfully")