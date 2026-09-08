export function getSeverityBadge(severity) {
  switch (severity) {
    case 'critical':
      return { bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.3)', text: '#f87171', label: 'CRITICAL' };
    case 'warning':
      return { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24', label: 'WARNING' };
    default:
      return { bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56, 189, 248, 0.3)', text: '#38bdf8', label: 'INFO' };
  }
}
