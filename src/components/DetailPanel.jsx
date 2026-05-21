import React, { useState } from 'react'
import StatusBadge from './StatusBadge'

function formatDate(ts) {
  if (!ts) return '—'
  try {
    const d = typeof ts === 'number' ? new Date(ts * 1000) : new Date(ts)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return '—'
  }
}

function formatTime(timestamp) {
  if (!timestamp) return '—'
  try {
    const d = new Date(timestamp)
    const now = new Date()
    const diffMs = now - d
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(timestamp)
  } catch {
    return '—'
  }
}

export default function DetailPanel({ workflow, onClose }) {
  const [notesEditing, setNotesEditing] = useState(false)
  const [notesValue, setNotesValue] = useState(workflow?.notes || '')

  // T-05: If no workflow is selected, show the empty state.
  if (!workflow) {
    return (
      <div className="detail-panel">
        <div className="detail-panel-empty">
          Select a workflow<br />to see details
        </div>
      </div>
    )
  }

  // TODO (T-05): Build the full detail view here.
  // Right now it just shows the title and a placeholder.
  // Candidate should add:
  //   - Status badge (T-07)
  //   - Assignee
  //   - Due date / created date
  //   - Progress bar
  //   - History timeline (workflow.history)
  //   - Notes field
  //   - suggested_actions array (hint for T-08)

  return (
    <div className="detail-panel">
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {workflow.id}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '15px',
              lineHeight: 1.3,
            }}>
              {workflow.title}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {workflow.client_name || <span style={{ color: 'var(--text-muted)' }}>No client</span>}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1,
              padding: '2px 4px',
            }}
          >
            ×
          </button>
        </div>

        {/* Inline status — T-07: now using StatusBadge */}
        <div style={{ marginTop: '12px' }}>
          <StatusBadge status={workflow.status} />
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Meta info section */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Assignee
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
              {workflow.assignee?.name ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 600,
                  }}>
                    {workflow.assignee.avatar}
                  </div>
                  {workflow.assignee.name}
                </div>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Priority
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
              P{workflow.priority} {['—', 'Critical', 'High', 'Medium', 'Low'][workflow.priority] || '—'}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Progress
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {Math.min(100, Number(workflow.progress) || 0)}%
            </div>
            <div style={{
              height: '4px',
              background: 'var(--bg-elevated)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, Number(workflow.progress) || 0)}%`,
                background: 'var(--status-active)',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Last Updated
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
              {formatTime(workflow.updated_at)}
            </div>
          </div>

          {workflow.due_date && (
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Due Date
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                {formatDate(workflow.due_date)}
              </div>
            </div>
          )}
        </div>

        {/* History section */}
        {Array.isArray(workflow.history) && workflow.history.length > 0 && (
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
              History
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[...workflow.history].reverse().map((entry, idx) => (
                <div key={idx} style={{ fontSize: '11px', paddingLeft: '12px', borderLeft: '2px solid var(--border)', paddingBottom: '4px' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {entry.action}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {formatTime(entry.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes section */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Notes
          </div>
          {notesEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <textarea
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
                style={{
                  flex: 1,
                  minHeight: '80px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text-primary)',
                  padding: '8px',
                  outline: 'none',
                  resize: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setNotesEditing(false)}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    background: 'var(--status-active)',
                    color: 'var(--bg-base)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: 500,
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setNotesEditing(false)
                    setNotesValue(workflow.notes || '')
                  }}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setNotesEditing(true)}
              style={{
                flex: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '8px',
                color: workflow.notes ? 'var(--text-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'auto',
                minHeight: '60px',
              }}
            >
              {workflow.notes || '(click to add notes)'}
            </div>
          )}
        </div>
      </div>
    </div>
      
      )}
