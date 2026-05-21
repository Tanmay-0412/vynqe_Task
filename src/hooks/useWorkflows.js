// useWorkflows.js
// Custom hook that loads workflow data from data.json.
//
// KNOWN ISSUES (intentional — see task list):
//   T-04: No loading state — component renders with null data during fetch.
//   T-04: No error handling — if fetch fails, the app goes blank silently.
//         Fix: add loading/error states and render feedback to the user.

import { useState, useEffect } from 'react'

export function useWorkflows() {
  // T-04: loading starts as true — show loading state until data arrives
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    // T-04: Properly handle loading state throughout the fetch lifecycle
    let isMounted = true // prevent state updates after unmount

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate network delay to view loading screen
        // await new Promise(resolve => setTimeout(resolve, 3000))
        
        const response = await fetch('/data.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const json = await response.json()
        
        if (isMounted) {
          setData(json)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading workflows:', err.message)
          setError(err)
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup: prevent state updates if component unmounts
    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}
