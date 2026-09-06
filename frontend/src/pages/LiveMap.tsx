import { useEffect, useState } from "react";

import { getIncidents } from "../services/api";

import type { Incident } from "../types/incident";

import IntelligenceMap from "../components/IntelligenceMap";


export default function LiveMap() {

    const [incidents, setIncidents] =
        useState<Incident[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


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
                    "Failed to load live intelligence."
                );

            } finally {

                setLoading(false);

            }
        }


        loadIncidents();

    }, []);


    if (loading) {

        return (

            <main className="page">

                <div className="state-message">

                    Loading live intelligence...

                </div>

            </main>

        );

    }


    if (error) {

        return (

            <main className="page">

                <div className="state-message error">

                    {error}

                </div>

            </main>

        );

    }


    return (

        <main className="page">

            <div className="page-header">

                <div>

                    <div className="eyebrow">
                        SITUATIONAL AWARENESS
                    </div>

                    <h1>
                        Live Intelligence Map
                    </h1>

                    <p>
                        Monitor active disaster and
                        emergency incidents geographically.
                    </p>

                </div>


                <div className="incident-count">

                    {incidents.length} incidents

                </div>

            </div>


            <IntelligenceMap
                incidents={incidents}
            />

        </main>

    );

}