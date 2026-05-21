# DECISIONS.md

Fill this in. 5 to 8 lines minimum. This is T-10 and it is required.

We read this before we look at your code. Be direct. Don't oversell. We're looking for self-awareness and how you think under pressure.

---

## What I built

<!-- What did you actually complete?
Be specific. Not "did some UI work."
Example: "Fixed T-01 through T-04. Built detail panel (T-05) and activity feed (T-06).
Didn't get to T-07 component extraction or T-08."
-->

## What I skipped and why

<!-- What didn't you get to?
Was it time? Complexity? Did you consciously deprioritise something less important?
Be honest about the tradeoff. "Skipped T-08 because T-05 took longer than expected
and I prioritised shipping a working T-01-T-06 over a half-built feature" is way better
than silence.
-->

## Most difficult bug to find

<!-- Which one took longest? What made it hard?
Null pointer in WorkflowCard? Filter callbacks never firing? The activity log
edge cases? Status casing?
Understanding why something was hard tells us a lot about how you debug.
-->

## Data quality issues I discovered

<!-- Beyond the task list. Optional but signals a lot.
Did you notice the timestamp anomalies? The casing inconsistencies?
The orphaned activity entries? The duplicate rows?
You don't have to fix them — just tell us what you saw.

Examples:
- "Found 3 orphaned activity log entries (wf_999, wf_888, wf_777 don't exist)"
- "Status casing is mixed (ACTIVE, active, In Progress)"
- "Progress field is sometimes a string (wf_013 has '72'), sometimes a number"
-->

## AI tools I used and how

<!-- Cursor? Claude? GPT? For what specifically?
Be honest. We're interested in how you used it, not whether you used it.

Good answers:
- "Used Claude to scaffold the DetailPanel component, then rewrote the data handling"
- "Used GPT to understand Unix epoch timestamp conversion, then implemented it myself"
- "Didn't use any AI tools"

Bad answer:
- "Used AI for everything" with no detail.
-->

## What I'd do differently with more time

<!-- One or two specific things. Not "write more tests" or "refactor."
Be real.

Examples:
- "Extract the status badge properly instead of copy-pasting. T-07 felt rushed."
- "Spend more time on T-08 — the product thinking part. I'd explore the suggested_actions
  more and maybe build a quick action panel."
- "Handle the timestamp parsing more robustly — currently a bit hacky."
- "Investigate why the filter is still slow even after fixing the callback issue."
-->
