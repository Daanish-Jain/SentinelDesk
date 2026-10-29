import type {
  Incident,
  SituationReport,
  Stats,
  RefreshResponse,
  TriageResponse,
} from "../types/incident";

const API_BASE_URL = "http://127.0.0.1:8000";


export async function getReport(): Promise<SituationReport> {
  const response = await fetch(`${API_BASE_URL}/report`);

  if (!response.ok) {
    throw new Error("Failed to fetch situation report");
  }

  return response.json();
}


export async function getIncidents(): Promise<Incident[]> {
  const response = await fetch(
    `${API_BASE_URL}/incidents`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }

  return response.json();
}


export async function getStats(): Promise<Stats> {
  const response = await fetch(`${API_BASE_URL}/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return response.json();
}


export async function refreshData(): Promise<RefreshResponse> {
  const response = await fetch(`${API_BASE_URL}/refresh`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh SentinelDesk data");
  }

  return response.json();
}

export async function getTriage(): Promise<TriageResponse> {
  const response = await fetch(`${API_BASE_URL}/triage`);

  if (!response.ok) {
    throw new Error("Failed to fetch triage data");
  }

  return response.json();
}