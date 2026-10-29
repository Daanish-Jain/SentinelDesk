import { useEffect, useMemo, useState } from "react";
import { getIncidents } from "../services/api";
import type { Incident } from "../types/incident";
import IncidentDetail from "../components/IncidentDetail";

function getSeverityClass(level: string) {
    switch (level.toLowerCase()) {
        case "extreme":
        case "severe":
            return "severity-high";

        case "moderate":
            return "severity-moderate";

        case "minor":
            return "severity-minor";

        default:
            return "severity-unknown";
    }
}

export default function Incidents() {

    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [sourceFilter, setSourceFilter] = useState("All");
    const [severityFilter, setSeverityFilter] = useState("All");

    const [selectedIncident, setSelectedIncident] =
        useState<Incident | null>(null);


    useEffect(() => {

        async function loadIncidents() {

            try {

                setLoading(true);
                setError(null);

                const data = await getIncidents();

                setIncidents(data);

            } catch (err) {

                console.error(err);

                setError(
                    "Failed to load incidents."
                );

            } finally {

                setLoading(false);

            }
        }

        loadIncidents();

    }, []);


    const filteredIncidents = useMemo(() => {

        return incidents.filter((incident) => {

            const searchValue =
                search.toLowerCase();

            const matchesSearch =
                incident.title
                    ?.toLowerCase()
                    .includes(searchValue) ||

                incident.location
                    ?.toLowerCase()
                    .includes(searchValue) ||

                incident.incident_type
                    ?.toLowerCase()
                    .includes(searchValue);


            const matchesSource =
                sourceFilter === "All" ||
                incident.source === sourceFilter;


            const matchesSeverity =
                severityFilter === "All" ||
                incident.severity_level === severityFilter;


            return (
                matchesSearch &&
                matchesSource &&
                matchesSeverity
            );

        });

    }, [
        incidents,
        search,
        sourceFilter,
        severityFilter
    ]);


    return (

        <div className="page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <div className="eyebrow">
                        INCIDENT INTELLIGENCE
                    </div>

                    <h1>
                        Incidents
                    </h1>

                    <p>
                        Browse and investigate active
                        disaster and emergency intelligence.
                    </p>

                </div>


                <div className="incident-count">
                    {filteredIncidents.length} incidents
                </div>

            </div>


            {/* FILTERS */}

            <div className="incident-controls">

                <input
                    type="text"
                    placeholder="Search incidents, locations..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={sourceFilter}
                    onChange={(e) =>
                        setSourceFilter(e.target.value)
                    }
                >

                    <option value="All">
                        All Sources
                    </option>

                    <option value="USGS">
                        USGS
                    </option>

                    <option value="NOAA">
                        NOAA
                    </option>

                </select>


                <select
                    value={severityFilter}
                    onChange={(e) =>
                        setSeverityFilter(e.target.value)
                    }
                >

                    <option value="All">
                        All Severity
                    </option>

                    <option value="Extreme">
                        Extreme
                    </option>

                    <option value="Severe">
                        Severe
                    </option>

                    <option value="Moderate">
                        Moderate
                    </option>

                    <option value="Minor">
                        Minor
                    </option>

                    <option value="Unknown">
                        Unknown
                    </option>

                </select>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="state-message">
                    Loading incident intelligence...
                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="state-message error">
                    {error}
                </div>

            )}


            {/* CONTENT */}

            {!loading && !error && (

                <>

                    {selectedIncident ? (

                        <IncidentDetail
                            incident={selectedIncident}
                            onBack={() => setSelectedIncident(null)}
                        />

                    ) : (
                        /* =========================
                           INCIDENT TABLE
                           ========================= */

                        <div className="incident-table-wrapper">

                            <table className="incident-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Incident
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Source
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Severity
                                        </th>

                                        <th>
                                            Time
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredIncidents.map(
                                        (incident) => (

                                            <tr
                                                key={incident.id}
                                                onClick={() =>
                                                    setSelectedIncident(
                                                        incident
                                                    )
                                                }
                                                className="incident-row"
                                            >

                                                <td>

                                                    <div className="incident-title">
                                                        {incident.title}
                                                    </div>

                                                </td>


                                                <td>
                                                    {incident.incident_type}
                                                </td>


                                                <td>

                                                    <span className="source-badge">
                                                        {incident.source}
                                                    </span>

                                                </td>


                                                <td>
                                                    {incident.location}
                                                </td>


                                                <td>

                                                    <span
                                                        className={`severity-badge ${getSeverityClass(
                                                            incident.severity_level
                                                        )}`}
                                                    >
                                                        {
                                                            incident.severity_level
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    {new Date(
                                                        incident.timestamp
                                                    ).toLocaleString()}

                                                </td>

                                            </tr>

                                        )
                                    )}


                                    {filteredIncidents.length === 0 && (

                                        <tr>

                                            <td
                                                colSpan={6}
                                                className="empty-state"
                                            >
                                                No incidents match the
                                                current filters.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </>

            )}

        </div>

    );
}