// ActionBar.jsx
//
// T-08: Renders suggested action buttons for a workflow.
//
// Displays action buttons based on the workflow's suggested_actions array.
// Common actions: send_update, escalate, mark_blocked, request_review, archive, assign_owner

import React from 'react'

// Map action names to human-readable labels and styles
const ACTION_CONFIG = {
  send_update: {
    label: 'Send Update',
    className: 'action-btn action-btn-primary',
  },
  escalate: {
    label: 'Escalate',
    className: 'action-btn action-btn-urgent',
  },
  mark_blocked: {
    label: 'Mark Blocked',
    className: 'action-btn action-btn-warning',
  },
  request_review: {
    label: 'Request Review',
    className: 'action-btn action-btn-primary',
  },
  archive: {
    label: 'Archive',
    className: 'action-btn action-btn-secondary',
  },
  assign_owner: {
    label: 'Assign Owner',
    className: 'action-btn action-btn-primary',
  },
}

export default function ActionBar({ workflow }) {
  if (!workflow) return null
  if (!Array.isArray(workflow.suggested_actions) || workflow.suggested_actions.length === 0) {
    return null
  }

  function handleActionClick(action) {
    // T-08: Wire this up with actual handlers
    console.log(`Action clicked: ${action} for workflow ${workflow.id}`)
    alert(`T-08: Implement action handler for "${action}"`)
  }

  return (
    <div className="action-bar">
      <div className="action-bar-header">Suggested Actions</div>
      <div className="action-bar-buttons">
        {workflow.suggested_actions.map(action => {
          const config = ACTION_CONFIG[action] || {
            label: action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            className: 'action-btn action-btn-secondary',
          }
          return (
            <button
              key={action}
              className={config.className}
              onClick={() => handleActionClick(action)}
            >
              {config.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
