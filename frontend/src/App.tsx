import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LiveMap from "./pages/LiveMap";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Situationreport from "./pages/SituationReport";

import {
  getReport,
  refreshData,
} from "./services/api";

import type {
  SituationReport,
} from "./types/incident";

import "./App.css";


function App() {

  const [report, setReport] =
    useState<SituationReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [activePage, setActivePage] =
    useState("overview");


  async function loadReport() {

    try {

      setError(null);

      const data = await getReport();

      setReport(data);

    } catch (err) {

      console.error(err);

      setError(
        "Unable to connect to SentinelDesk API."
      );

    } finally {

      setLoading(false);

    }
  }


  async function handleRefresh() {

    try {

      setRefreshing(true);

      await refreshData();

      await loadReport();

    } catch (err) {

      console.error(err);

      setError(
        "Failed to refresh SentinelDesk intelligence."
      );

    } finally {

      setRefreshing(false);

    }
  }


  useEffect(() => {

    loadReport();

  }, []);


  if (loading) {

    return (
      <div className="loading-screen">
        <div className="loading-logo">
          S
        </div>

        <div>
          <h1>SentinelDesk</h1>
          <p>
            Initializing intelligence systems...
          </p>
        </div>
      </div>
    );

  }


  if (error || !report) {

    return (
      <div className="error-screen">

        <h1>SentinelDesk</h1>

        <p>
          {error ||
            "No situation report available."}
        </p>

        <button
          onClick={loadReport}
        >
          Retry Connection
        </button>

      </div>
    );

  }


  return (

    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-area">

        <Header
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />

        {activePage === "overview" && (
          <Dashboard report={report} />
        )}

        {activePage === "incidents" && (
          <Incidents />
        )}

        {activePage === "live-map" && (
          <LiveMap />
        )}

        {activePage === "report" && (
          <Situationreport report={report} />
        )}

      </div>

    </div>

  );
}

export default App;