class TriageManager:

    def classify_incident(self, incident):

        severity = (
            incident.severity_level or ""
        ).lower()

        urgency = ""

        if incident.analysis:
            urgency = (
                incident.analysis.urgency or ""
            ).lower()

        # Immediate Action
        if (
            severity == "severe"
            or urgency in {"critical", "high"}
        ):
            return "Immediate Action"

        # Active Monitoring
        if (
            severity == "high"
            or urgency == "moderate"
        ):
            return "Active Monitoring"

        # Advisory
        return "Advisory"


    def classify(self, incidents):

        for incident in incidents:

            incident.triage_level = (
                self.classify_incident(incident)
            )

        return incidents