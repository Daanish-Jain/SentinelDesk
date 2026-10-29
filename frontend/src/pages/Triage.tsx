import { useEffect, useState } from "react";

import { getTriage } from "../services/api";
import IncidentDetail from "../components/IncidentDetail";

import type {
    Incident,
    TriageResponse,
} from "../types/incident";


function formatTimestamp(timestamp: string) {
    return new Date(timestamp).toLocaleString();
}


function TriageSection({
    title,
    incidents,
    className,
    onInspect,
}: {
    title: string;
    incidents: Incident[];
    className: string;
    onInspect: (incident: Incident) => void;
}) {

    return (
        <section className={`triage-section ${className}`}>

            <div className="triage-section-header">

                <div>

                    <div className="panel-eyebrow">
                        TRIAGE LEVEL
                    </div>

                    <h2>
                        {title}
                    </h2>

                </div>

                <div className="triage-count">
                    {incidents.length}
                </div>

            </div>


            {incidents.length === 0 ? (

                <div className="triage-empty">
                    No incidents match the current filters.
                </div>

            ) : (

                <div className="triage-list">

                    {incidents.map((incident) => (

                        <article
                            className="triage-card"
                            key={incident.id}
                        >

                            <div className="triage-card-top">

                                <div>

                                    <span className="triage-incident-type">
                                        {incident.incident_type}
                                    </span>

                                    <h3>
                                        {incident.title}
                                    </h3>

                                </div>


                                <span
                                    className={`severity-badge severity-${incident.severity_level.toLowerCase()}`}
                                >
                                    {incident.severity_level}
                                </span>

                            </div>


                            <div className="triage-card-meta">

                                <span>
                                    Location: {incident.location}
                                </span>

                                <span>
                                    Time: {formatTimestamp(incident.timestamp)}
                                </span>

                                <span>
                                    Source: {incident.source}
                                </span>

                            </div>


                            <div className="triage-card-intelligence">

                                <div>

                                    <span className="triage-label">
                                        AI URGENCY
                                    </span>

                                    <strong>
                                        {incident.analysis?.urgency ||
                                            "Unavailable"}
                                    </strong>

                                </div>


                                <div>

                                    <span className="triage-label">
                                        CONFIDENCE
                                    </span>

                                    <strong>
                                        {Math.round(
                                            incident.confidence * 100
                                        )}%
                                    </strong>

                                </div>


                                <div>

                                    <span className="triage-label">
                                        SEVERITY SCORE
                                    </span>

                                    <strong>
                                        {incident.severity_score.toFixed(2)}
                                    </strong>

                                </div>

                            </div>


                            {incident.analysis?.summary && (

                                <p className="triage-summary">
                                    {incident.analysis.summary}
                                </p>

                            )}


                            <div className="triage-card-footer">

                                <button
                                    className="triage-inspect-button"
                                    onClick={() =>
                                        onInspect(incident)
                                    }
                                >
                                    Inspect Incident →
                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>
    );
}


function Triage() {

    const [triage, setTriage] =
        useState<TriageResponse | null>(null);


    const [loading, setLoading] =
        useState(true);


    const [selectedIncident, setSelectedIncident] =
        useState<Incident | null>(null);


    const [error, setError] =
        useState<string | null>(null);


    const [searchQuery, setSearchQuery] =
        useState("");


    const [severityFilter, setSeverityFilter] =
        useState("All");


    async function loadTriage() {

        try {

            setError(null);

            setLoading(true);

            const data = await getTriage();

            setTriage(data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load triage intelligence."
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        loadTriage();

    }, []);


    if (selectedIncident) {

        return (
            <main className="triage-page">

                <IncidentDetail
                    incident={selectedIncident}
                    onBack={() =>
                        setSelectedIncident(null)
                    }
                    backLabel="Back to triage"
                />

            </main>
        );
    }


    if (loading) {

        return (
            <main className="page">

                <div className="panel">

                    <div className="panel-eyebrow">
                        TRIAGE
                    </div>

                    <h2>
                        Loading triage intelligence...
                    </h2>

                </div>

            </main>
        );
    }


    if (error || !triage) {

        return (
            <main className="page">

                <div className="panel">

                    <div className="panel-eyebrow">
                        TRIAGE
                    </div>

                    <h2>
                        Unable to load triage
                    </h2>

                    <p>
                        {error ||
                            "No triage data available."}
                    </p>

                    <button
                        onClick={loadTriage}
                    >
                        Retry
                    </button>

                </div>

            </main>
        );
    }


    /*
     * -----------------------------------------------------
     * FILTERING
     * -----------------------------------------------------
     */

    const normalizedSearch =
        searchQuery.trim().toLowerCase();


    function matchesFilters(incident: Incident) {

        const matchesSearch =
            normalizedSearch === "" ||
            incident.title.toLowerCase().includes(
                normalizedSearch
            ) ||
            incident.location.toLowerCase().includes(
                normalizedSearch
            ) ||
            incident.incident_type.toLowerCase().includes(
                normalizedSearch
            ) ||
            incident.source.toLowerCase().includes(
                normalizedSearch
            );


        const matchesSeverity =
            severityFilter === "All" ||
            incident.severity_level.toLowerCase() ===
                severityFilter.toLowerCase();


        return matchesSearch && matchesSeverity;
    }


    const filteredImmediate =
        triage.immediate_action.filter(matchesFilters);


    const filteredMonitoring =
        triage.active_monitoring.filter(matchesFilters);


    const filteredAdvisory =
        triage.advisory.filter(matchesFilters);


    const filteredTotal =
        filteredImmediate.length +
        filteredMonitoring.length +
        filteredAdvisory.length;


    const total =
        triage.immediate_action.length +
        triage.active_monitoring.length +
        triage.advisory.length;


    return (

        <main className="triage-page">

            <div className="page-header">

                <div>

                    <div className="panel-eyebrow">
                        OPERATIONAL PRIORITY
                    </div>

                    <h1>
                        Incident Triage
                    </h1>

                    <p>
                        {total} incidents classified by
                        operational priority.
                    </p>

                </div>

            </div>


            {/* ------------------------------------------------
                TRIAGE OVERVIEW
            ------------------------------------------------ */}

            <div className="triage-overview">

                <div className="triage-overview-card immediate">

                    <span>
                        IMMEDIATE ACTION
                    </span>

                    <strong>
                        {triage.immediate_action.length}
                    </strong>

                </div>


                <div className="triage-overview-card monitoring">

                    <span>
                        ACTIVE MONITORING
                    </span>

                    <strong>
                        {triage.active_monitoring.length}
                    </strong>

                </div>


                <div className="triage-overview-card advisory">

                    <span>
                        ADVISORY
                    </span>

                    <strong>
                        {triage.advisory.length}
                    </strong>

                </div>

            </div>


            {/* ------------------------------------------------
                FILTER BAR
            ------------------------------------------------ */}

            <div className="triage-filter-panel">

                <div className="triage-filter-header">

                    <div>

                        <div className="panel-eyebrow">
                            TRIAGE QUEUE
                        </div>

                        <h2>
                            Incident Filters
                        </h2>

                    </div>


                    <span className="triage-filter-results">
                        Showing {filteredTotal} of {total}
                    </span>

                </div>


                <div className="triage-filters">

                    <div className="triage-search">

                        <label htmlFor="triage-search">
                            SEARCH INCIDENTS
                        </label>

                        <input
                            id="triage-search"
                            type="text"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(
                                    event.target.value
                                )
                            }
                            placeholder="Search title, location, type, or source..."
                        />

                    </div>


                    <div className="triage-severity-filter">

                        <label htmlFor="triage-severity">
                            SEVERITY
                        </label>

                        <select
                            id="triage-severity"
                            value={severityFilter}
                            onChange={(event) =>
                                setSeverityFilter(
                                    event.target.value
                                )
                            }
                        >

                            <option value="All">
                                All Severities
                            </option>

                            <option value="Extreme">
                                Extreme
                            </option>

                            <option value="Severe">
                                Severe
                            </option>

                            <option value="High">
                                High
                            </option>

                            <option value="Moderate">
                                Moderate
                            </option>

                            <option value="Minor">
                                Minor
                            </option>

                        </select>

                    </div>


                    {(searchQuery || severityFilter !== "All") && (

                        <button
                            className="triage-clear-button"
                            onClick={() => {
                                setSearchQuery("");
                                setSeverityFilter("All");
                            }}
                        >
                            Clear Filters
                        </button>

                    )}

                </div>

            </div>


            {/* ------------------------------------------------
                TRIAGE SECTIONS
            ------------------------------------------------ */}

            <TriageSection
                title="Immediate Action"
                incidents={filteredImmediate}
                className="triage-immediate"
                onInspect={setSelectedIncident}
            />


            <TriageSection
                title="Active Monitoring"
                incidents={filteredMonitoring}
                className="triage-monitoring"
                onInspect={setSelectedIncident}
            />


            <TriageSection
                title="Advisory"
                incidents={filteredAdvisory}
                className="triage-advisory"
                onInspect={setSelectedIncident}
            />

        </main>
    );
}


export default Triage;