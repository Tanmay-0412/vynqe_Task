// WorkflowCard.jsx
//
// Renders a single workflow card in the grid.
//
// INTENTIONAL BUGS:
//   - assignee.name crash (T-02 / T-07): If assignee is null or {},
//     accessing assignee.name throws a TypeError. Candidate must guard
//     with optional chaining: assignee?.name
//
//   - progress bar (T-02): progress may be a string ("72") instead of
//     a number, which breaks the width calculation. Also progress > 100
//     (e.g. 143) renders a bar wider than its container.
//     Fix: clamp with Math.min(100, Number(workflow.progress))
//
//   - Status rendered inline (T-07): Status display logic is copy-pasted
//     here AND in DetailPanel, ActivityFeed header, topbar count, and
//     the summary modal. T-07 asks candidate to extract to StatusBadge.
//
//   - tags null crash (T-02): workflow.tags may be null instead of [].
//     Calling .map() on null throws. Candidate must guard: tags ?? []

import React from 'react'

// Inline status colour map — copy-pasted in 5 places.
// T-07: extract this into a StatusBadge component.
function getStatusColour(status) {
  if (!status) return 'var(--status-unknown)'
  switch (status.toLowerCase()) {
    case 'active':      return 'var(--status-active)'
    case 'blocked':     return 'var(--status-blocked)'
    case 'review':      return 'var(--status-review)'
    case 'completed':   return 'var(--status-completed)'
    case 'in progress': return 'var(--status-active)'
    default:            return 'var(--status-unknown)'
  }
}

function formatDate(ts) {
  if (!ts) return '—'
  try {
    // Handles both ISO strings and Unix epoch integers
    const d = typeof ts === 'number' ? new Date(ts * 1000) : new Date(ts)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  } catch {
    return '—'
  }
}

export default function WorkflowCard({ workflow, isSelected, onClick }) {
  // BUG (T-02): no null guard — if assignee is null, this line throws:
  //   TypeError: Cannot read properties of null (reading 'name')
  // Fix: const assigneeName = workflow.assignee?.name ?? 'Unassigned'
  const assigneeName = workflow.assignee?.name ?? 'Unassigned'

  // BUG (T-02): progress may be a string ("72") or over 100 (143).
  // This renders the bar wider than its container or with string interpolation.
  // Fix: const progressVal = Math.min(100, Number(workflow.progress) || 0)
  const progressVal = Math.min(100, Number(workflow.progress) || 0)

  const colour = getStatusColour(workflow.status)
  return (
    <div
      className={`workflow-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(workflow)}
    >
      {/* Header row: ID + status badge (copy-pasted status logic — T-07) */}
      <div className="card-header">
        <span className="card-id">{workflow.id}</span>
        {/* Inline status — T-07: this exact block is duplicated 4 more times */}
        <span className="status-label" style={{ color: colour }}>
          <span className="status-dot" style={{ background: colour }} />
          {workflow.status ?? 'unknown'}
        </span>
      </div>

      {/* Title + client */}
      <div>
        <div className="card-title">{workflow.title}</div>
        <div className="card-client">{workflow.client_name}</div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-wrap">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressVal}%` }}
        />
      </div>

      {/* Assignee + progress number */}
      <div className="card-meta">
        <div className="card-assignee">
          <div className="avatar">
            {/* BUG: assignee.avatar also throws when assignee is null */}
            {workflow.assignee?.avatar ?? '?'}
          </div>
          {assigneeName}
        </div>
        <span className="muted" style={{ fontSize: '10px' }}>
          {progressVal}%
        </span>
      </div>

      {/* Tags — BUG: tags may be null, .map() throws */}
      <div className="tags">
        {(Array.isArray(workflow?.tags) ? workflow.tags : []).map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Footer: last updated */}
      <div className="card-footer">
        <span className="card-updated">
          updated {formatDate(workflow.updated_at)}
        </span>
      </div>
    </div>
  )
}
