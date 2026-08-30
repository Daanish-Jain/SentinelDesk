interface HeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

function Header({ onRefresh, refreshing }: HeaderProps) {
  return (
    <header className="top-header">
      <div>
        <div className="header-eyebrow">SITUATIONAL AWARENESS</div>
        <h1>Operational Overview</h1>
      </div>

      <div className="header-actions">
        <div className="live-indicator">
          <span className="status-dot" />
          LIVE DATA
        </div>

        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "↻ Refresh Intelligence"}
        </button>
      </div>
    </header>
  );
}

export default Header;