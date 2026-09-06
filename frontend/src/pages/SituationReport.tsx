import type { SituationReport as SituationReportType } from "../types/incident";

interface SituationReportProps {
    report: SituationReportType;
}

function SituationReport({ report }: SituationReportProps) {

    const categoryEntries = Object.entries(
        report.category_counts
    ).sort((a, b) => b[1] - a[1]);

    const urgencyEntries = Object.entries(
        report.urgency_counts
    ).sort((a, b) => b[1] - a[1]);

    const sourceEntries = Object.entries(
        report.source_counts
    ).sort((a, b) => b[1] - a[1]);

    const locationEntries = Object.entries(
        report.location_counts
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    return (

        <main className="situation-report">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <div className="panel-eyebrow">
                        INTELLIGENCE
                    </div>

                    <h1>
                        Situation Report
                    </h1>

                    <p>
                        Operational overview of current
                        incidents and emerging hazards.
                    </p>

                </div>

                <div className="report-generated">

                    <span>
                        Generated
                    </span>

                    <strong>
                        {new Date(
                            report.generated_at
                        ).toLocaleString()}
                    </strong>

                </div>

            </div>


            {/* EXECUTIVE SUMMARY */}

            <section className="report-section">

                <div className="section-heading">

                    <div>
                        <span className="panel-eyebrow">
                            EXECUTIVE SUMMARY
                        </span>

                        <h2>
                            Current Situation
                        </h2>
                    </div>

                </div>

                <div className="report-summary">

                    {report.executive_summary ||
                        "No executive summary is available yet."}

                </div>

            </section>


            {/* OVERVIEW CARDS */}

            <section className="report-section">

                <div className="report-stat-grid">

                    <div className="report-stat-card">

                        <span>
                            TOTAL INCIDENTS
                        </span>

                        <strong>
                            {report.total_incidents}
                        </strong>

                    </div>


                    <div className="report-stat-card">

                        <span>
                            URGENCY LEVELS
                        </span>

                        <strong>
                            {urgencyEntries.length}
                        </strong>

                    </div>


                    <div className="report-stat-card">

                        <span>
                            CALAMITY TYPES
                        </span>

                        <strong>
                            {categoryEntries.length}
                        </strong>

                    </div>


                    <div className="report-stat-card">

                        <span>
                            SOURCES
                        </span>

                        <strong>
                            {sourceEntries.length}
                        </strong>

                    </div>

                </div>

            </section>


            {/* BREAKDOWN */}

            <section className="report-section">

                <div className="report-grid">


                    {/* CALAMITIES */}

                    <div className="panel">

                        <div className="panel-eyebrow">
                            HAZARD BREAKDOWN
                        </div>

                        <h2>
                            By Calamity
                        </h2>

                        <div className="report-list">

                            {categoryEntries.map(
                                ([category, count]) => (

                                    <div
                                        className="report-list-row"
                                        key={category}
                                    >

                                        <span>
                                            {category}
                                        </span>

                                        <strong>
                                            {count}
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* URGENCY */}

                    <div className="panel">

                        <div className="panel-eyebrow">
                            PRIORITY
                        </div>

                        <h2>
                            By Urgency
                        </h2>

                        <div className="report-list">

                            {urgencyEntries.map(
                                ([urgency, count]) => (

                                    <div
                                        className="report-list-row"
                                        key={urgency}
                                    >

                                        <span>
                                            {urgency}
                                        </span>

                                        <strong>
                                            {count}
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* SOURCES */}

                    <div className="panel">

                        <div className="panel-eyebrow">
                            DATA SOURCES
                        </div>

                        <h2>
                            By Source
                        </h2>

                        <div className="report-list">

                            {sourceEntries.map(
                                ([source, count]) => (

                                    <div
                                        className="report-list-row"
                                        key={source}
                                    >

                                        <span>
                                            {source}
                                        </span>

                                        <strong>
                                            {count}
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* LOCATIONS */}

                    <div className="panel">

                        <div className="panel-eyebrow">
                            GEOGRAPHIC OVERVIEW
                        </div>

                        <h2>
                            By Location
                        </h2>

                        <div className="report-list">

                            {locationEntries.map(
                                ([location, count]) => (

                                    <div
                                        className="report-list-row"
                                        key={location}
                                    >

                                        <span>
                                            {location}
                                        </span>

                                        <strong>
                                            {count}
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* REPRESENTATIVE INCIDENTS */}

            <section className="report-section">

                <div className="panel">

                    <div className="panel-eyebrow">
                        REPRESENTATIVE INCIDENTS
                    </div>

                    <h2>
                        Selected Incidents
                    </h2>

                    <div className="representative-incidents">

                        {report.representative_incidents.length === 0 ? (

                            <div className="report-empty">
                                No representative incidents available.
                            </div>

                        ) : (

                            report.representative_incidents.map(
                                (incident) => (

                                    <div
                                        className="representative-incident"
                                        key={incident.id}
                                    >

                                        <div className="representative-main">

                                            <strong>
                                                {incident.title}
                                            </strong>

                                            <span>
                                                {incident.location}
                                            </span>

                                        </div>

                                        <div className="representative-meta">

                                            <span>
                                                {incident.incident_type}
                                            </span>

                                            <span>
                                                {incident.severity_level}
                                            </span>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* RECOMMENDATIONS */}

            <section className="report-section">

                <div className="panel">

                    <div className="panel-eyebrow">
                        OPERATIONAL GUIDANCE
                    </div>

                    <h2>
                        Recommendations
                    </h2>

                    {report.recommendations &&
                    report.recommendations.length > 0 ? (

                        <ul className="recommendation-list">

                            {report.recommendations.map(
                                (recommendation, index) => (

                                    <li key={index}>
                                        {recommendation}
                                    </li>

                                )
                            )}

                        </ul>

                    ) : (

                        <div className="report-empty">
                            No recommendations available yet.
                        </div>

                    )}

                </div>

            </section>

        </main>
    );
}

export default SituationReport;