export interface AIAnalysis {
    category: string;
    confidence: number;
    summary: string;
    urgency: string;
    entities: Record<string, string[]>;
    reasoning?: string[];
}

export interface Incident {
    id: string;
    source: string;
    incident_type: string;
    title: string;

    latitude: number;
    longitude: number;
    location: string;

    severity_score: number;
    severity_level: string;

    timestamp: string;
    confidence: number;

    raw_data: Record<string, unknown>;
    description?: string;

    analysis?: AIAnalysis;

    triage_level?: string;
}

export interface TriageResponse {
    immediate_action: Incident[];
    active_monitoring: Incident[];
    advisory: Incident[];
}

export interface SituationReport {
    generated_at: string;
    total_incidents: number;

    category_counts: Record<string, number>;
    urgency_counts: Record<string, number>;
    source_counts: Record<string, number>;
    location_counts: Record<string, number>;

    representative_incidents: Incident[];

    executive_summary?: string;
    recommendations?: string[];
}

export interface Stats {
    total_incidents: number;
    categories: Record<string, number>;
    urgencies: Record<string, number>;
    sources: Record<string, number>;
    locations: Record<string, number>;
}

export interface RefreshResponse {
    status: string;
    incidents_collected: number;
    report_generated: boolean;
}