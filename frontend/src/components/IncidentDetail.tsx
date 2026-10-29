import type { Incident } from "../types/incident";

function parseDescription(description: string) {

    const text = description
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim();


    /*
     * -----------------------------------------------------
     * FORMAT 1
     *
     * HAZARD...60 mph wind gusts and small hail.
     * SOURCE...Radar indicated.
     * IMPACT...Expect damage to roofs, siding, and trees.
     *
     * These fields are sometimes separated by newlines
     * and sometimes appear in the same paragraph.
     * -----------------------------------------------------
     */

    const fieldPattern =
        /(HAZARD|SOURCE|IMPACT)\.\.\./gi;

    const fieldMatches = [
        ...text.matchAll(fieldPattern)
    ];


    if (fieldMatches.length > 0) {

        const sections: {
            heading: string;
            content: string;
        }[] = [];


        for (let i = 0; i < fieldMatches.length; i++) {

            const match = fieldMatches[i];

            const heading =
                match[1].toUpperCase();


            const start =
                (match.index ?? 0) + match[0].length;


            const end =
                i + 1 < fieldMatches.length
                    ? fieldMatches[i + 1].index ?? text.length
                    : text.length;


            const content =
                text
                    .slice(start, end)
                    .trim()
                    .replace(/\s+/g, " ");


            if (content) {

                sections.push({
                    heading,
                    content,
                });

            }

        }


        /*
         * Everything before HAZARD can contain the actual
         * alert introduction. Preserve it as context.
         */

        const firstFieldIndex =
            fieldMatches[0].index ?? 0;


        const introduction =
            text
                .slice(0, firstFieldIndex)
                .trim()
                .replace(/\s+/g, " ");


        if (introduction) {

            sections.unshift({
                heading: "ALERT CONTEXT",
                content: introduction,
            });

        }


        return sections;
    }


    /*
     * -----------------------------------------------------
     * FORMAT 2
     *
     * * WIND - ...
     * * STORM SURGE - ...
     * * FLOODING RAIN - ...
     *
     * Handle the structured NWS forecast format.
     * -----------------------------------------------------
     */

    const structuredPattern =
        /(?:^|\s)\*\s*([A-Z][A-Z\s]+?)\s*-\s*/g;


    const structuredMatches = [
        ...text.matchAll(structuredPattern)
    ];


    if (structuredMatches.length > 0) {

        const sections: {
            heading: string;
            content: string;
        }[] = [];


        for (
            let i = 0;
            i < structuredMatches.length;
            i++
        ) {

            const match =
                structuredMatches[i];


            const heading =
                match[1].trim();


            const start =
                (match.index ?? 0) + match[0].length;


            const end =
                i + 1 < structuredMatches.length
                    ? structuredMatches[i + 1].index ??
                      text.length
                    : text.length;


            const content =
                text
                    .slice(start, end)
                    .trim()
                    .replace(/\s+/g, " ");


            if (content) {

                sections.push({
                    heading,
                    content,
                });

            }

        }


        if (sections.length > 0) {
            return sections;
        }

    }


    /*
     * -----------------------------------------------------
     * FORMAT 3
     *
     * No recognizable NOAA sections.
     *
     * Preserve the entire description as ONE block.
     * Never create one SOURCE INFORMATION block per line.
     * -----------------------------------------------------
     */

    return [
        {
            heading: "SOURCE INFORMATION",
            content: text.replace(/\s+/g, " "),
        },
    ];
}

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


interface IncidentDetailProps {
    incident: Incident;
    onBack: () => void;
    backLabel?: string;
}


export default function IncidentDetail({
    incident,
    onBack,
    backLabel = "Back to incidents",
}: IncidentDetailProps) {

    return (

        <div className="incident-detail">

            <button
                className="back-button"
                onClick={onBack}
            >
                ← {backLabel}
            </button>


            {/* DETAIL HEADER */}

            <div className="detail-header">

                <div>

                    <div className="eyebrow">
                        INCIDENT INTELLIGENCE
                    </div>

                    <h2>
                        {incident.title}
                    </h2>

                    <p>
                        {incident.incident_type}
                    </p>

                </div>


                <span
                    className={`severity-badge ${getSeverityClass(
                        incident.severity_level
                    )}`}
                >
                    {incident.severity_level}
                </span>

            </div>


            {/* INCIDENT METADATA */}

            <div className="detail-grid">

                <div>
                    <span>
                        Source
                    </span>

                    <strong>
                        {incident.source}
                    </strong>
                </div>


                <div>
                    <span>
                        Location
                    </span>

                    <strong>
                        {incident.location}
                    </strong>
                </div>


                <div>
                    <span>
                        Severity Score
                    </span>

                    <strong>
                        {incident.severity_score}
                    </strong>
                </div>


                <div>
                    <span>
                        Confidence
                    </span>

                    <strong>
                        {(incident.confidence * 100).toFixed(0)}%
                    </strong>
                </div>


                <div>
                    <span>
                        Timestamp
                    </span>

                    <strong>
                        {new Date(
                            incident.timestamp
                        ).toLocaleString()}
                    </strong>
                </div>


                {incident.triage_level && (

                    <div>
                        <span>
                            Triage Level
                        </span>

                        <strong>
                            {incident.triage_level}
                        </strong>
                    </div>

                )}

            </div>


            {/* DESCRIPTION */}

            {incident.description && (

                <div className="detail-section source-alert-section">

                    <div className="source-alert-header">

                        <div>
                            <div className="eyebrow">
                                SOURCE ALERT
                            </div>

                            <h3>
                                NOAA Alert Details
                            </h3>
                        </div>

                        <span className="source-alert-badge">
                            ORIGINAL SOURCE
                        </span>

                    </div>


                    <div className="source-alert-content">

                        {parseDescription(incident.description).map(
                            (section, index) => (

                                <div
                                    className="source-alert-block"
                                    key={`${section.heading}-${index}`}
                                >

                                    <div className="source-alert-heading">
                                        {section.heading}
                                    </div>

                                    <p>
                                        {section.content}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}


            {/* AI ANALYSIS */}

            {incident.analysis && (

    <div className="detail-section ai-intelligence-section">

        <div className="ai-intelligence-header">

            <div>

                <div className="eyebrow">
                    AI INTELLIGENCE
                </div>

                <h3>
                    {incident.analysis.category}
                </h3>

            </div>


            <span
                className={`ai-urgency-badge urgency-${incident.analysis.urgency.toLowerCase()}`}
            >
                {incident.analysis.urgency}
            </span>

        </div>


        <div className="ai-summary">

            <div className="ai-section-label">
                OPERATIONAL SUMMARY
            </div>

            <p>
                {incident.analysis.summary}
            </p>

        </div>


        {incident.analysis.reasoning &&
            incident.analysis.reasoning.length > 0 && (

                <div className="ai-reasoning">

                    <div className="ai-section-label">
                        REASONING
                    </div>

                    <div className="ai-reasoning-list">

                        {incident.analysis.reasoning.map(
                            (reason, index) => (

                                <div
                                    className="ai-reasoning-item"
                                    key={index}
                                >

                                    <span className="ai-reasoning-marker">
                                        {index + 1}
                                    </span>

                                    <span>
                                        {reason}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}


            {incident.analysis.entities &&
                Object.keys(incident.analysis.entities).length > 0 && (

                    <div className="ai-entities">

                        <div className="ai-section-label">
                            IDENTIFIED ENTITIES
                        </div>

                        <div className="ai-entity-groups">

                            {Object.entries(
                                incident.analysis.entities
                            ).map(([key, values]) => (

                                <div
                                    className="ai-entity-group"
                                    key={key}
                                >

                                    <span className="ai-entity-label">
                                        {key}
                                    </span>

                                    <div className="ai-entity-values">

                                        {values.map(
                                            (value, index) => (

                                                <span
                                                    className="ai-entity"
                                                    key={index}
                                                >
                                                    {value}
                                                </span>

                                            )
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

        </div>

    )}

        </div>
    );
}