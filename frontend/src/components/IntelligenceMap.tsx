import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

import { useEffect } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import type { Incident } from "../types/incident";


interface IntelligenceMapProps {
    incidents: Incident[];
    onIncidentSelect?: (incident: Incident) => void;
}

function createIncidentIcon(severity: string) {

    let className = "incident-marker-low";

    switch (severity.toLowerCase()) {

        case "severe":
            className = "incident-marker-severe";
            break;

        case "high":
            className = "incident-marker-high";
            break;

        case "moderate":
            className = "incident-marker-moderate";
            break;

        case "minor":
            className = "incident-marker-minor";
            break;

        default:
            className = "incident-marker-low";
    }

    return L.divIcon({
        className: "custom-incident-marker",

        html: `
            <div class="${className}">
                <div class="incident-marker-dot"></div>
            </div>
        `,

        iconSize: [18, 18],

        iconAnchor: [9, 9],

        popupAnchor: [0, -10],
    });
}


/*
 * Automatically adjusts the map
 * to contain all incidents with coordinates.
 */
function MapBounds({
    incidents,
}: {
    incidents: Incident[];
}) {
    const map = useMap();

    useEffect(() => {
        if (incidents.length === 0) {
            return;
        }

        const bounds = L.latLngBounds(
            incidents.map((incident) => [
                incident.latitude!,
                incident.longitude!,
            ])
        );

        map.fitBounds(bounds, {
            padding: [40, 40],
            maxZoom: 6,
        });
    }, [incidents, map]);

    return null;
}


function IntelligenceMap({
    incidents,
    onIncidentSelect,
}: IntelligenceMapProps) {


    /*
     * Only incidents with usable coordinates
     * can be displayed on the map.
     */
    const mappableIncidents = incidents.filter(
        (incident) =>
            incident.latitude !== null &&
            incident.longitude !== null &&
            Number.isFinite(incident.latitude) &&
            Number.isFinite(incident.longitude)
    );


    return (

        <div className="intelligence-map-wrapper">


            <MapContainer
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={true}
                className="intelligence-map"
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {/* Automatically fit the map around incidents */}

                <MapBounds
                    incidents={mappableIncidents}
                />


                {/* Incident markers */}

                <MarkerClusterGroup>

                    {mappableIncidents.map((incident) => (

                        <Marker
                            key={incident.id}
                            position={[
                                incident.latitude!,
                                incident.longitude!,
                            ]}
                            icon={createIncidentIcon(
                                incident.severity_level
                            )}
                            eventHandlers={{
                                click: () => {
                                    onIncidentSelect?.(incident);
                                },
                            }}
                        >

                            <Popup>
                                <div className="incident-popup">

                                    <strong>
                                        {incident.title}
                                    </strong>

                                    <br />
                                    <br />

                                    <strong>
                                        Calamity:
                                    </strong>{" "}
                                    {incident.incident_type}

                                    <br />

                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {incident.location}

                                    <br />

                                    <strong>
                                        Severity:
                                    </strong>{" "}
                                    {incident.severity_level}

                                    <br />

                                    <strong>
                                        Source:
                                    </strong>{" "}
                                    {incident.source}

                                </div>
                            </Popup>

                        </Marker>

                    ))}

                </MarkerClusterGroup>

            </MapContainer>

        </div>
    );
}


export default IntelligenceMap;