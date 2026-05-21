// ActivityFeed.jsx
//
// T-06: Activity feed component.
//
// This is a SHELL. The container renders and the header shows,
// but nothing is displayed inside it.
//
// Candidate's job:
//   - Receive `activityLog` and `users` as props
//   - Sort entries newest first
//   - For each entry render: timestamp, user name (look up from users),
//     action text, and the workflow ID it belongs to
//   - Handle edge cases in the data:
//       - user: null (anonymous entries)
//       - action: "" (empty action string — wf_039)
//       - duplicate entries (act_022 and act_023 are identical)
//       - act_040 references wf_999 which doesn't exist in workflows
//
// The CSS for .activity-feed and .activity-feed-header is in global.css.
//
// Inline status colour — T-07: 4th copy of this logic. Extract to StatusBadge.

import React from 'react'

function formatTime(timestamp) {
  if (!timestamp) return '—'
  try {
    const d = new Date(timestamp)
    const now = new Date()
    const diffMs = now - d
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  } catch {
    return '—'
  }
}

export default function ActivityFeed({ activityLog, users }) {
  // Sort entries by timestamp (newest first)
  const sorted = [...(activityLog ?? [])].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )

  return (
    <div className="activity-feed">
      <div className="activity-feed-header">Activity</div>

      {sorted.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '8px' }}>
          No activity yet.
        </div>
      ) : (
        sorted.map(entry => {
          const userName = entry.user && users?.[entry.user]?.name ? users[entry.user].name : 'Anonymous'
          const formattedTime = formatTime(entry.timestamp)
          return (
            <div key={entry.id} style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{formattedTime}</span>
              {' '}<strong>{userName}</strong>{' '}
              {entry.action || '(no action)'}
              {' '}<span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{entry.workflow_id}</span>
            </div>
          )
        })
      )}
    </div>
  )
}