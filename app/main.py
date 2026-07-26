
from app.managers.collector_manager import CollectorManager
from app.managers.enrichment_manager import EnrichmentManager
from app.storage.incident_repository import IncidentRepository
from app.managers.deduplication_manager import DeduplicationManager
from app.reporting.situation_report_generator import SituationReportGenerator # type: ignore

SEPERATOR = "_" * 40

collector_manager = CollectorManager()
enrichment_manager = EnrichmentManager()
deduplicator = DeduplicationManager()
repository = IncidentRepository()
report_generator = SituationReportGenerator()


incidents = collector_manager.collect_all()
print(f"Collected {len(incidents)} incidents")
print(SEPERATOR)

incidents = deduplicator.deduplicate(incidents)
print(f"After deduplication : {len(incidents)}")
print(SEPERATOR)

incidents = enrichment_manager.enrich(incidents) # ---> Enriching the incidents using AI

repository.save(incidents)
loaded_incidents = repository.load()  

report = report_generator.generate(loaded_incidents) # ---> Loading the report we generate

report_generator.display_report(report) # ---> Displaying the report in our format

print(f"Saved {len(incidents)} incidents")
print(f"loaded {len(loaded_incidents)} incidents")
i=1
for incident in incidents:
        if i==20:
                break
        print(SEPERATOR)
        print(f"Title           : {incident.title}")
        print(f"Source          : {incident.source}")
        if incident.analysis:
                print(f"AI Category     : {incident.analysis.category}")
                print(f"AI Urgency      : {incident.analysis.urgency}")
                print(f"AI Summary      : {incident.analysis.summary}")  
                print("Reasoning        :")   
                if incident.analysis.reasoning:
                        print(f" {incident.analysis.reasoning}")
                else:
                        print(" No Reasoning Available")
        else:
                print("AI Analysis : Not Available")
        print(SEPERATOR)
        i+=1

print(SEPERATOR)

successful = sum(1 for incident in incidents if incident.analysis is not None)

failed = len(incidents) - successful

print(f"AI Ennriched : {successful} incidents")
print(f"AI Failed : {failed} incidents")