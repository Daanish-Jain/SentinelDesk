from fastapi import APIRouter, HTTPException
from app.storage.report_repository import ReportRepository
from app.storage.incident_repository import IncidentRepository
from app.services.refresh_service import RefreshService
from app.api.schemas import IncidentResponse

refresh_service = RefreshService()
report_repository = ReportRepository()
router = APIRouter()
incident_repository = IncidentRepository()


@router.get("/")
def root():
    return {
        "message": "Welcome to SentinelDesk API!"
    }
    
    
@router.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "SentinelDesk",
        "version": "1.0.0"
    }


@router.get("/report")
def get_report():
    report = report_repository.load()
    return report


@router.get("/incidents", response_model=list[IncidentResponse])
def get_incidents():
    incidents = incident_repository.load()
    return incidents


@router.get("/incidents/{incident_id}", response_model=IncidentResponse)
def get_incident(incident_id: str):
    incidents = incident_repository.load()

    for incident in incidents:
        if incident.id == incident_id:
            return incident

    raise HTTPException(
        status_code = 404,
        detail = "Incident not found"
    )


@router.post("/refresh")
def refresh_data():
    try:
        incidents, report = refresh_service.refresh()

        return {
            "status": "success",
            "incidents_collected": len(incidents),
            "report_generated": True
        }

    except RuntimeError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    
    
@router.get("/stats")
def get_stats():
    report = report_repository.load()

    return {
        "total_incidents": report.total_incidents,
        "categories": report.category_counts,
        "urgencies": report.urgency_counts,
        "sources": report.source_counts,
        "locations": report.location_counts
    }