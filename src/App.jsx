// App.jsx
//
// Root component. Wires the layout together.
//
// KNOWN ISSUES (intentional bugs for the challenge):
//
//   T-02: Workflow cards below are HARDCODED. data.json is loaded via
//         useWorkflows() but `data` is not used to render the grid.
//         The grid renders 3 static placeholder cards instead.
//         Fix: replace hardcoded HARDCODED_CARDS with data?.workflows
//         and pass each workflow to <WorkflowCard>.
//
//   T-03: FilterBar's onFilterChange and onSearchChange are wired here
//         but FilterBar never calls them (see FilterBar.jsx).
//         Fix: fix the bug in FilterBar.jsx first, then filtering works.
//
//   T-04: useWorkflows has no loading/error state. Even if you fix the
//         hook, you need to render loading/error UI here too.
//
//   T-08: ActionBar is imported but commented out. The suggested_actions
//         field in data.json hints at what this could do.
//         // import ActionBar from './components/ActionBar'
//         // TODO: T-08 — <ActionBar workflow={selectedWorkflow} />

import React, { useState } from 'react'
import { useWorkflows } from './hooks/useWorkflows'
import FilterBar from './components/FilterBar'
import WorkflowCard from './components/WorkflowCard'
import DetailPanel from './components/DetailPanel'
import ActivityFeed from './components/ActivityFeed'

// TODO: T-08
// import ActionBar from './components/ActionBar'

// T-02: These hardcoded cards are what the grid renders.
// They're here so the UI looks populated on first load.
// Candidate's job: delete these and wire data?.workflows instead.
// const HARDCODED_CARDS = [
//   {
//     id: 'wf_001',
//     title: 'Q1 Reporting Automation',
//     client_name: 'Meridian Capital',
//     status: 'active',
//     priority: 1,
//     progress: 72,
//     assignee: { id: 'usr_aisha', name: 'Aisha Nkomo', avatar: 'AN' },
//     updated_at: '2026-01-14T16:22:00Z',
//     tags: ['finance', 'automation'],
//     notes: '',
//     history: [],
//     suggested_actions: ['send_update', 'escalate'],
//   },
//   {
//     id: 'wf_002',
//     title: 'Contract Review Pipeline',
//     client_name: 'Holloway & Pine',
//     status: 'blocked',
//     priority: 2,
//     progress: 45,
//     assignee: { id: 'usr_raj', name: 'Raj Mehta', avatar: 'RM' },
//     updated_at: '2026-01-13T09:15:00Z',
//     tags: ['legal', 'contracts'],
//     notes: 'Blocked on client signature.',
//     history: [],
//     suggested_actions: ['send_update', 'mark_blocked'],
//   },
//   {
//       "id": "wf_003",
//       "client_name": "Cascade Health",
//       "title": "Data Ingestion Setup",
//       "status": "completed",
//       "priority": 2,
//       "progress": 34,
//       "assignee": {
//           "id": "usr_lena",
//           "name": "Lena Osei",
//           "avatar": "LO"
//       },
//       "created_at": "2025-12-10T08:00:00Z",
//       "updated_at": "2026-01-02T17:00:00Z",
//       "due_date": "2025-12-28T00:00:00Z",
//       "tags": [
//           "health",
//           "data",
//           "ingestion"
//       ],
//       "notes": "",
//       "suggested_actions": [
//           "archive"
//       ],
//       "history": [
//           {
//               "timestamp": "2025-12-10T08:00:00Z",
//               "user": "usr_lena",
//               "action": "created workflow"
//           },
//           {
//               "timestamp": "2026-01-02T17:00:00Z",
//               "user": "usr_lena",
//               "action": "marked as completed"
//           }
//       ]
//   },
//   {
//     id: 'wf_004',
//     title: 'Route Optimisation v2',
//     client_name: 'Thornfield Logistics',
//     status: 'review',
//     priority: 1,
//     progress: 88,
//     // BUG: assignee is null — WorkflowCard.jsx will crash on this card.
//     // This is intentional. Candidate must fix WorkflowCard to handle null.
//     assignee: null,
//     updated_at: '2026-01-15T11:00:00Z',
//     tags: ['logistics', 'optimization'],
//     notes: 'Needs peer review.',
//     history: [],
//     suggested_actions: ['request_review', 'assign_owner'],
//   },
// ]

export default function App() {
  const { data, loading, error } = useWorkflows()

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  // T-04: No loading or error UI. App just renders with empty/null state.
  // Fix: add early returns here:
  //   if (loading) return <div className="state-fullscreen">Loading...</div>
  //   if (error)   return <div className="state-fullscreen">Error: {error.message}</div>

  // T-02: `data` is loaded but not used — grid uses HARDCODED_CARDS.
  // Fix: replace HARDCODED_CARDS with filtered data?.workflows
  //
  // T-03: Filter logic lives here but never runs because FilterBar
  // doesn't call onFilterChange. Fix FilterBar first.
  const displayedWorkflows = (data?.workflows || [])
    .filter(workflow => {
      if (activeFilter && activeFilter !== 'all') {
        if (workflow.status?.toLowerCase() !== activeFilter.toLowerCase()) {
          return false
        }
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = workflow.title?.toLowerCase().includes(query)
        const matchesClient = workflow.client_name?.toLowerCase().includes(query)
        const matchesTags = Array.isArray(workflow.tags) && workflow.tags.some(tag => tag.toLowerCase().includes(query))
        if (!matchesTitle && !matchesClient && !matchesTags) {
          return false
        }
      }
      return true
    })
  // const displayedWorkflows = HARDCODED_CARDS

  function handleSummarise() {
    // T-09: Mock AI summary. Wire this up.
    // Candidate can use the Anthropic API, a mocked response, or anything creative.
    alert('T-09: Build the AI summary here.')
  }

  return (
    <div className="app-shell">

      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-logo">
          vynqe<span>ops</span>
        </div>

        {/* Inline status count — T-07: 5th place status logic appears */}
        <div style={{ display: 'flex', gap: '16px', marginLeft: '24px' }}>
          {['active', 'blocked', 'review'].map(s => {
            const colours = {
              active:  'var(--status-active)',
              blocked: 'var(--status-blocked)',
              review:  'var(--status-review)',
            }
            // Uses hardcoded cards so count is always wrong until T-02 is fixed
            const count = displayedWorkflows.filter(
              w => w.status?.toLowerCase() === s
            ).length
            return (
              <span
                key={s}
                className="status-label"
                style={{ color: colours[s], fontSize: '11px' }}
              >
                <span className="status-dot" style={{ background: colours[s] }} />
                {count} {s}
              </span>
            )
          })}
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
          {data ? `${data.workflows.length} workflows loaded` : 'loading data...'}
        </div>
      </header>

      {/* Filter bar */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSummarise={handleSummarise}
      />

      {/* Main body */}
      <div className="main-body">
        <div className="content-area">

          {/* Workflow grid */}
          <div className="workflow-grid-container">
            <div className="workflow-grid">
              {displayedWorkflows.map(workflow => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  isSelected={selectedWorkflow?.id === workflow.id}
                  onClick={setSelectedWorkflow}
                />
              ))}
            </div>
          </div>

          {/* Activity feed — T-06: shell only */}
          <ActivityFeed
            activityLog={data?.activity_log}
            users={data?.users}
          />
        </div>

        {/* Detail panel — T-05: empty shell */}
        <DetailPanel
          workflow={selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
        />
      </div>

      {/* TODO: T-08 */}
      {/* <ActionBar workflow={selectedWorkflow} /> */}
    </div>
  )
}
