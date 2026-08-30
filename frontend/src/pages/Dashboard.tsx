import type { SituationReport } from "../types/incident";

interface DashboardProps {
  report: SituationReport;
}

function Dashboard({ report }: DashboardProps) {
  const highUrgency =
    (report.urgency_counts["High"] ?? 0) +
    (report.urgency_counts["Severe"] ?? 0);

  const sourceCount = Object.keys(report.source_counts).length;

  const topCategories = Object.entries(report.category_counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const urgencyData = Object.entries(report.urgency_counts);

  return (
    <main className="dashboard">

      {/* Statistics */}

      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-label">TOTAL INCIDENTS</div>
          <div className="stat-value">
            {report.total_incidents}
          </div>
          <div className="stat-description">
            Active intelligence records
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-label">HIGH PRIORITY</div>
          <div className="stat-value">
            {highUrgency}
          </div>
          <div className="stat-description">
            Severe and high urgency events
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">DATA SOURCES</div>
          <div className="stat-value">
            {sourceCount}
          </div>
          <div className="stat-description">
            Active intelligence feeds
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">REPORT STATUS</div>
          <div className="stat-value status-value">
            READY
          </div>
          <div className="stat-description">
            AI analysis completed
          </div>
        </div>

      </section>


      {/* AI Summary */}

      <section className="content-grid">

        <div className="panel summary-panel">

          <div className="panel-header">
            <div>
              <div className="panel-eyebrow">
                AI INTELLIGENCE
              </div>

              <h2>Executive Situation Summary</h2>
            </div>

            <div className="ai-badge">
              AI GENERATED
            </div>
          </div>

          <p className="summary-text">
            {report.executive_summary ||
              "No executive summary available."}
          </p>

          <div className="report-meta">
            <span>
              REPORT GENERATED
            </span>

            <strong>
              {new Date(
                report.generated_at
              ).toLocaleString()}
            </strong>
          </div>

        </div>


        {/* Urgency */}

        <div className="panel">

          <div className="panel-header">
            <div>
              <div className="panel-eyebrow">
                THREAT DISTRIBUTION
              </div>

              <h2>Urgency</h2>
            </div>
          </div>

          <div className="urgency-list">

            {urgencyData.map(([level, count]) => {

              const percentage =
                report.total_incidents > 0
                  ? (count / report.total_incidents) * 100
                  : 0;

              return (
                <div
                  className="urgency-row"
                  key={level}
                >
                  <div className="urgency-label">
                    <span>{level}</span>
                    <strong>{count}</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className={`progress-bar ${level.toLowerCase()}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* Categories */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <div className="panel-eyebrow">
              INCIDENT CLASSIFICATION
            </div>

            <h2>Major Incident Categories</h2>
          </div>

          <span className="panel-count">
            {Object.keys(
              report.category_counts
            ).length} categories
          </span>

        </div>

        <div className="category-grid">

          {topCategories.map(
            ([category, count]) => {

              const percentage =
                (count / report.total_incidents) *
                100;

              return (
                <div
                  className="category-card"
                  key={category}
                >

                  <div className="category-name">
                    {category}
                  </div>

                  <div className="category-count">
                    {count}
                  </div>

                  <div className="category-percentage">
                    {percentage.toFixed(1)}% of incidents
                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>

    </main>
  );
}

export default Dashboard;