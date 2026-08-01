from app.models.incident import Incident
from datetime import datetime,timezone
from app.reporting.report_models import SituationReport # type: ignore

ENTER = "\n"
SEPARATOR = "=" * 100
class SituationReportGenerator : 
    def generate(self, incidents : list[Incident]):
        categories = self._count_categories(incidents)
        urgencies = self. _count_urgencies(incidents)
        sources = self._count_sources(incidents)
        locations = self._count_locations(incidents)
        representative_incident = self._select_representative_incidents(incidents)
        
        report = SituationReport(
            generated_at=datetime.now(timezone.utc),
            total_incidents=len(incidents),
            category_counts=categories,
            urgency_counts=urgencies,
            source_counts=sources,
            location_counts=locations,
            representative_incidents=representative_incident,
        )

        return report

    def display_report(self, report: SituationReport):
        print(SEPARATOR)
        print("SENTINELDESK SITUATION REPORT")
        print(SEPARATOR)

        print(f"Generated At     : {report.generated_at}")
        print(f"Total Incidents  : {report.total_incidents}")

        print(ENTER)
        print(SEPARATOR)
        print(ENTER)
        
        # AI Summary
        print("Executive Summary")
        print("-" * 50)

        if report.executive_summary:
            print(report.executive_summary)
        else:
            print("No executive summary available.")

        print(ENTER)
        print(SEPARATOR)
        print(ENTER)

        # AI Recommendations
        print("Recommendations")
        print("-" * 50)

        if report.recommendations:
            for recommendation in report.recommendations:
                print(f"• {recommendation}")
        else:
            print("No recommendations available.")
        
        print(ENTER)
        print(SEPARATOR)
        print(ENTER)
        
        # Category Counts
        print("Category Counts")
        for category, count in report.category_counts.items():
            print(f"  {category}: {count}")

        print(ENTER)
        print(SEPARATOR)
        print(ENTER)

        # Urgency Counts
        print("Urgency Counts")
        for urgency, count in report.urgency_counts.items():
            print(f"  {urgency}: {count}")

        print(ENTER)
        print(SEPARATOR)
        print(ENTER)

        # Source Counts
        print("Source Counts")
        for source, count in report.source_counts.items():
            print(f"  {source}: {count}")

        print(ENTER)
        print(SEPARATOR)
        print(ENTER)

        # Location Counts
        print("Location Counts")
        for location, count in report.location_counts.items():
            print(f"  {location}: {count}")

        print(ENTER)
        print(SEPARATOR)
        print(ENTER)

        # Representative Incidents
        print("Representative Incidents")

        for i, incident in enumerate(report.representative_incidents, start=1):
            print(f"\n{i}. {incident.title}")
            print(f"   Type      : {incident.incident_type}")
            print(f"   Location  : {incident.location}")
            print(f"   Severity  : {incident.severity_level}")
            print(f"   Score     : {incident.severity_score}")
            print(f"   Source    : {incident.source}")

        print(SEPARATOR)
#_________________________________________________________________________________

    # FUNCTIONS
    
    def _count_categories(self, incidents: list[Incident]) -> dict[str,int]:
        count_cat = dict()
        for incident in incidents:
            
            if incident.analysis:
                category = incident.analysis.category
            else:
                category = incident.incident_type
                
            count_cat[category] = count_cat.get(category,0) + 1
                
        return count_cat
    
                
    
    def _count_urgencies(self, incidents : list[Incident]) -> dict[str,int]:
        count_urg = {}
        for incident in incidents:
            urgency = incident.severity_level
            
            count_urg[urgency] = count_urg.get(urgency,0) + 1
            
        return count_urg
    
    def _count_sources(self, incidents : list[Incident]) -> dict[str,int]:
        sources_count = {}
        for incident in incidents:
            source = incident.source
            
            sources_count[source] = sources_count.get(source,0) + 1
        return sources_count
    
    def _count_locations(self, incidents : list[Incident]) -> dict[str,int]:
        count_loc = {}
        for incident in incidents:
            loc = incident.location
            
            count_loc[loc] = count_loc.get(loc,0) + 1
        return count_loc
    
    def _select_representative_incidents(self, incidents : list[Incident]):
        repr_inc = []
        sorted_incidents = sorted(
            incidents, 
            key = lambda incident : incident.severity_score, 
            reverse = True
        )
        repr_inc = sorted_incidents[:5]
    
        return repr_inc
            
            
    
