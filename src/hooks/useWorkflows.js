// useWorkflows.js
// Custom hook that loads workflow data from data.json.
//
// KNOWN ISSUES (intentional — see task list):
//   T-04: No loading state — component renders with null data during fetch.
//   T-04: No error handling — if fetch fails, the app goes blank silently.
//         Fix: add loading/error states and render feedback to the user.

import { useState, useEffect } from 'react'

export function useWorkflows() {
  // BUG (T-04): loading starts as false — UI renders before data arrives.
  // Should be: const [loading, setLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    // BUG (T-04): no try/catch, no .catch() — network errors are swallowed.
    // BUG (T-04b): Effect has no dependency array or changing deps — runs infinitely
    try{
      setLoading(true)
      fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        })
    }catch(err){
      console.err(err.message)
    }finally{
      setLoading(false)
    }
        // BUG (T-04): setLoading(false) never called because loading never
        // set to true. Candidate needs to wire the full loading lifecycle.
    // Missing: .catch(err => setError(err))
  }, [])

  return { data, loading, error }
}
