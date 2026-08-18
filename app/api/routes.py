from fastapi import APIRouter
from app.storage.report_repository import ReportRepository
from app.storage.incident_repository import IncidentRepository

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


@router.get("/incidents")
def get_incidents():
    incidents = incident_repository.load()
    return incidents


@router.get("/incidents/{incident_id}")
def get_incident(incident_id: str):
    incidents = incident_repository.load()

    for incident in incidents:
        if incident.id == incident_id:
            return incident

    return {"error": "Incident not found"}