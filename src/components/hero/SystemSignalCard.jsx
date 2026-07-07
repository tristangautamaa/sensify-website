// Operational "system board" panel — visualizes Sensify's operating logic:
// marketplace dependency → owned website → retained customers → maintained cost.
export default function SystemSignalCard() {
  return (
    <aside className="signal-card" aria-label="Sensify transition system overview">
      <div className="signal-card-header">
        <span className="signal-card-title">Sensify Transition System</span>
        <span className="signal-card-status">
          <span className="signal-status-dot" aria-hidden="true" />
          Live Model
        </span>
      </div>

      <div className="signal-flow">
        <div className="signal-node signal-node-muted">
          <span className="signal-node-tag">From</span>
          <span className="signal-node-label">Marketplace</span>
          <span className="signal-node-sub">Rented traffic</span>
        </div>
        <div className="signal-link" aria-hidden="true">
          <span className="signal-link-pulse" />
        </div>
        <div className="signal-node signal-node-active">
          <span className="signal-node-tag">To</span>
          <span className="signal-node-label">Owned Website</span>
          <span className="signal-node-sub">Customer data</span>
        </div>
      </div>

      <ul className="signal-grid">
        <li>Catalog</li>
        <li>Campaign Pages</li>
        <li>Customer Data</li>
        <li>Monthly Maintenance</li>
      </ul>

      <div className="signal-metrics">
        <div className="signal-metric">
          <span className="signal-metric-label">Control</span>
          <strong>Owned</strong>
          <span className="signal-metric-bar">
            <span style={{ width: '86%', background: 'var(--color-cta)' }} />
          </span>
        </div>
        <div className="signal-metric">
          <span className="signal-metric-label">Cost</span>
          <strong>Maintained</strong>
          <span className="signal-metric-bar">
            <span style={{ width: '58%', background: 'var(--color-accent-blue)' }} />
          </span>
        </div>
        <div className="signal-metric">
          <span className="signal-metric-label">Channel</span>
          <strong>Direct</strong>
          <span className="signal-metric-bar">
            <span style={{ width: '92%', background: 'var(--color-background-light)' }} />
          </span>
        </div>
      </div>
    </aside>
  );
}
