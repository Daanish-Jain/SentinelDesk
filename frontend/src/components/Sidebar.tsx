interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: "⌂",
    },
    {
      id: "incidents",
      label: "Incidents",
      icon: "◈",
    },
    {
      id: "live-map",
      label: "Live Map",
      icon: "◎",
    },
    {
      id: "report",
      label: "Situation Report",
      icon: "▤",
    },
    {
      id: "triage",
      label: "Triage",
      icon: "âš ",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">S</div>

        <div>
          <div className="brand-name">SentinelDesk</div>
          <div className="brand-subtitle">DISASTER INTELLIGENCE</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">COMMAND</div>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">

        <div className="version">
          SentinelDesk v1.0.0
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;