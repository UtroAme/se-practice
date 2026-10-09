# Week 05 — Lab report

**Name:** Tomiris Zhazykbayeva
**Group:** 16:00 - 19:00
**Date:** 2026-10-09

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | Qoder |
| **Exact** model name | Qwen3.8-Max |
| Language and version | Python 3.13 |
| Path | A |
| My Week 04 declaration for touching bookings | allowed |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
No code yet — here's the plan.

Check order (each returns False on failure)

Well-formed interval (AC1a): 0  now — strict. A booking starting at the current minute is already late.
Duration cap (AC2): end - start  now >= 0 always fails. Worth stating explicitly so it isn't mistaken for a bug.

Boundary cases that expose wrong implementations

AC1 — ordering and range
start == end → False; start > end (e.g. 720, 600) → False
start == -1 → False; end == 1441 → False
end == 1440, start == 1320 → True (last legal slot of the day)
start == now → False (catches >= instead of >)
start == now + 1 → True

AC2 — cap edges
duration exactly 120 → True; 121 → False
start == 1321, end == 1440 (119 min at day's end) → True

AC3 — short-circuit trap
blocked=True with an otherwise perfect, conflict-free slot → False (verifies the flag isn't skipped after the overlap check passes)

AC4 — half-open semantics
existing=[(600,720)], request (720,840) → True; request (480,600) → True
request (599,601) → False; request (719,780) → False (one-minute clips on each side)
request (630,690) — strictly inside → False
request (590,710) — fully contains existing (600,660), duration 120 → False (catches implementations that only test endpoint intersection)
existing=[(600,720),(720,840)], request (660,780) → False (adjacent bookings, no gap)
existing=[(600,720),(780,900)], request (720,780) → True (fits exactly in the gap)
many bookings where only the last overlaps → False (catches return True inside the loop)
existing=[] → True

AC5 — no side effects
Assert existing is deep-equal to a pre-call snapshot, and that the same list object is passed out unchanged.

Want me to implement it against these?
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | "Well-formed interval (AC1a): 0 < start <= ... now" | AC1 says 0 <= start < end <= 1440 — start = 0 is allowed | Told the assistant to use 0 <= start, matching AC1 exactly |

**Boundary cases the assistant suggested that I kept as tests:**

- start == end (700, 700) → False (AC1)
- start > end (720, 700) → False (AC1)
- start == -1 → False (AC1)
- end == 1441 → False (AC1)
- end == 1440, start == 1320 → True (AC1)
- start == now → False (AC1)
- start == now + 1 → True (AC1)
- duration exactly 120 (720, 840) → True (AC2)
- duration 121 (720, 841) → False (AC2)
- blocked=True with a conflict-free slot → False (AC3)
- touching at the end (720, 840) vs existing (600, 720) → True (AC4)
- touching at the start (480, 600) vs existing (600, 720) → True (AC4)
- one-minute clip on each side (599, 601) and (719, 780) → False (AC4)
- strictly inside (630, 690) → False (AC4)
- fully contains existing (590, 710) → False (AC4)
- adjacent bookings (600, 720) + (720, 840), request (660, 780) → False (AC4)
- fits exactly in a gap (600, 720) + (780, 900), request (720, 780) → True (AC4)
- many bookings, only the last overlaps → False (AC4)
- existing=[] → True (AC4 / contract)
- existing deep-equal to a pre-call snapshot → unchanged (AC5)

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.<ext>`, exactly as the assistant returned it: yes / no

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if not 0 <= start < end <= 1440: return False` | AC1 | correct — matches the AC exactly |
| 2 | `if start <= now: return False` | AC1 | correct — the AC requires `start > now`, so rejecting `start <= now` is equivalent |
| 3 | `if end - start > 120: return False` | AC2 | correct — `at most 120` means 120 is allowed, 121 is not |
| 4 | `if blocked: return False` | AC3 | correct |
| 5 | `for booked_start, booked_end in existing: if start < booked_end and booked_start < end: return False` | AC4 | correct — the two strict comparisons are the standard half-open overlap test; touching endpoints are allowed because `start == booked_end` and `booked_start == end` do not satisfy either comparison |
| 6 | `return True` (after the loop) | AC5 | correct — reached only when AC1–AC4 all passed; note it is **after** the loop, not inside it |
| 7 | `return False` (in each check) | AC5 | correct |
| 8 | No assignment to `existing` or to its elements anywhere in the function | AC5 / contract | correct — inputs are left unchanged |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

- none. The `from typing import Sequence, Tuple` import and the type hints are documentation only; they do not add behaviour, and `Sequence[Tuple[int, int]]` is a supertype of the contract's "list of (start, end) tuples", so it does not narrow the signature.

---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | touching_end_is_allowed | (660, 720) | — | True | AC4 | pass | pass |
| 2 | overlap_is_rejected | (630, 690) | — | False | AC4 | pass | pass |
| 3 | blocked_room_is_rejected | (660, 720) | blocked=True | False | AC3 | pass | pass |
| 4 | exactly_two_hours_is_allowed | (720, 840) | — | True | AC2 | pass | pass |
| 5 | over_two_hours_is_rejected | (720, 841) | — | False | AC2 | pass | pass |
| 6 | starting_now_is_rejected | (540, 570) | — | False | AC1 | pass | pass |
| 7 | zero_length_is_rejected | (700, 700) | — | False | AC1 | pass | pass |
| 8 | reversed_times_are_rejected | (720, 700) | — | False | AC1 | pass | pass |
| 9 | ends_exactly_at_end_of_day_is_allowed | (1380, 1440) | — | True | AC1 | pass | pass |
| 10 | ends_after_end_of_day_is_rejected | (1380, 1441) | — | False | AC1 | pass | pass |
| 11 | empty_existing_is_allowed | (660, 720) | existing=[] | True | AC4 | pass | pass |
| 12 | fully_contains_existing_is_rejected | (590, 710) | — | False | AC4 | pass | pass |
| 13 | touching_start_of_existing_is_allowed | (570, 600) | — | True | AC4 | pass | pass |
| 14 | existing_is_not_mutated | (660, 720) | — | True / existing unchanged | AC5 | pass | pass |
| 15 | overlap_with_second_booking_is_rejected | (700, 760) | existing=[(600, 660), (700, 750)] | False | AC4 | pass | pass |
| 16 | overlap_with_last_of_three_is_rejected | (800, 860) | existing=[(600, 660), (700, 760), (800, 850)] | False | AC4 | pass | pass |
| 17 | overlap_in_unsorted_existing_is_rejected | (610, 650) | existing=[(900, 960), (600, 660)] | False | AC4 | pass | pass |
| 18 | result_is_a_real_bool_true | (660, 720) | — | True (and type is bool) | AC5 | pass | pass |
| 19 | result_is_a_real_bool_false | (630, 690) | — | False (and type is bool) | AC5 | pass | pass |
| 20 | existing_is_not_mutated_on_rejection | (610, 650) | existing has 3 bookings | False / existing unchanged | AC5 | pass | pass |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | can_book(0, 60, 0, False, []) | False | False | No defect. v1 line 15 `if start <= now: return False` correctly rejects `start == now == 0`. This is the strict AC1 boundary. | none — v1 already correct | n/a |
| 2 | can_book(1, 61, 0, False, []) | True | True | No defect. v1 line 15 `if start <= now: return False` correctly allows `start = now + 1`. This is the first legal start of the day. | none — v1 already correct | n/a |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
Reviewed against the contract and AC1–AC5. No correctness defects. I found one minor, non-behavioral item — I'm not padding to five.

Issue 1 — annotation is narrower than the contract (contract line: "existing contains valid (start, end) tuples")

existing: Sequence[Tuple[int, int]],

The contract specifies what existing contains, not that it is indexable. A set or frozenset of tuples is contract-legal and works correctly at runtime — the loop only iterates and unpacks — but fails static type checking under Sequence. This is the trade-off I introduced last turn to stop a generator being consumed; it buys generator-safety at the cost of rejecting other non-sequence collections. No effect on any return value. Flagging it because it's my change and it isn't free.

What I checked and found clean

AC1a — if not 0  now strictly. start == now rejected, start == now + 1 accepted.
AC2 — if end - start > 120: is inclusive at the cap: 120 passes, 121 fails.
AC3 — if blocked: rejects a blocked room before the scan.
AC4 — if start < booked_end and booked_start < end: is the half-open intersection test. Strict on both sides, so (720, 840) against (600, 720) passes (touching allowed) while a one-minute clip on either end fails. It also catches containment in both directions, which endpoint-only tests miss.
AC5, no false negatives — return True at booking.py:23 is reachable only after all four gates and a complete loop, so the last conflicting booking is still caught; the loop never returns True early.
AC5, no false positives — every False path corresponds to a specific violated criterion.
AC5, inputs unchanged — existing is iterated and unpacked only: no sort, append, or tuple write. No parameter is rebound or mutated. All paths return a bool literal.

Correctly absent: validation of now, blocked, and the tuples in existing. The contract declares those valid, so checking them would exceed the stated scope.

One caveat on method: this is a read-through against the spec, not an executed test run — the earlier verification was declined, so the boundary cases remain unexercised. Happy to run them if you want empirical confirmation.
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | `Sequence[Tuple[int, int]]` is narrower than the contract | accept | Correct observation, but the task passes a `list`, which is a `Sequence`; AC4/AC5 say nothing about the collection type. Annotation unchanged. | 22 tests, OK (no change) |
| 2 | "read-through, not an executed test run" | reject | Caveat about method, not a code issue. My suite exercises the boundaries: 22 tests, all green on v1. | 22 tests, OK (no change) |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | no code change — v1 was already correct | v1 passed F1–F10 and all my tests; no fix was needed | F1–F10 PASS, S1–S2 PASS |
| 2 | added tests: test_start_at_zero_now_zero_is_rejected, test_start_one_after_now_zero_is_allowed | To document the AC1 boundary at now = 0 | suite went from 20 to 22 tests, both pass |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
(paste here)
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
(paste here)
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

-

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->
