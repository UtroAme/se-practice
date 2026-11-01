# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | Qoder |
| Coding assistant model | Qwen3.8-Flash |
| Bolt.new model | not displayed |
| Bolt project link | not-shared |
| Language | python |
| Path | A |
| Python v1 from | fresh |
| Web v1 from | fresh |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** A web page that only checks if a specific room is available for a chosen time; it should not create or confirm bookings.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Time is set in whole minutes from midnight (0 <= start < end <= 1440). Start time has to be strictly after the current time (now). |
| AC2 | Booking length can't be more than 120 minutes. Exactly 120 minutes is fine, but 121 isn't allowed. |
| AC3 | If the room is blocked, any time slot should show up as unavailable. |
| AC4 | No overlaps with existing bookings. If one booking ends right when another starts (touching at the endpoint), that's totally fine and not an overlap. |
| AC5 | Show a clear Available or Unavailable status. Existing bookings shouldn't be changed or touched. |
| AC6 | If someone enters invalid data, the page needs to explain the error clearly. Plus, it should look normal and work fine on mobile phones. |

### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | Touching endpoints counted as overlap (using <= instead of <) | AC4 | Test T1: 660-720 with existing (600-660) must be Available. |
| 2 | Start time exactly at 'now' is allowed | AC1 | Test T6: 540-570 with now=540 must be Unavailable. |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | Start time in minutes after midnight | int, 0 to 1439 |
| `end` | End time in minutes after midnight | int, 1 to 1440 |
| `now` | Current time in minutes after midnight | int, 0 to 1439 (assumed valid) |
| `blocked` | Is the room blocked | boolean (True/False)|
| `existing` | List of existing bookings | list of tuples (start, end), unchanged |
| returns | Can we book it | boolean (True only if AC1-AC4 pass) |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. now is always a valid time between 0 and 1439, so I don't need to check it.
2. Existing bookings always have start < end.

**Checked manually:**

- I will manually compare the result of test T1 (touching) and T6 (starts now) between the original v1 and my final code.

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `if not 0 <= start < end <= 1440:` | AC1 | Yes | Correctly rejects reversed times (T7) and times past midnight (T9). |
| `if start <= now:` | AC1 | Yes | Correctly rejects a start time that is equal to now (T6). |
| `if end - start > 120:` | AC2 | Yes | Allows exactly 120 minutes (T4) and rejects 121 minutes (T5). |
| `if blocked:` | AC3 | Yes | Rejects every request when the room is blocked (T3). |
| `if s < end and start < e:` | AC4 | Yes | Correctly uses strict inequality `<`. This means touching endpoints (T1) are allowed. |
| No `.sort()` or modification of `existing` | AC5 | Yes | The list is only read in the loop, so it is not mutated. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
(paste here)
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**What v1 does:**

- (write here)

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | | |
| T2 | Overlap | 630–690 | Unavailable | False | False | | |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | | |
| T4 | Exactly 120 min | 720–840 | Available | True | True | | |
| T5 | 121 min | 720–841 | Unavailable | False | False | | |
| T6 | Starts now | 540–570 | Unavailable | False | False | | |
| T7 | Reversed | 720–660 | Unavailable | False | False | | |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | | |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | | |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | | |
| T11 | Same check twice | 660–720, twice | Available | True | True | | |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | | |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | booking.py L5-L10 | T6, T7, T8, T9 | Unavailable, Unavailable, Available, Unavailable | False, False, True, False | False, False, True, False |
| AC2 | booking.py L12-L13 | T4, T5 | Available, Unavailable | True, False | True, False |
| AC3 | booking.py L14-L15 | T3 | Unavailable | False | False |
| AC4 | booking.py L17-L21 | T1, T2, T10 | Available, Unavailable, Unavailable | True, False, False | True, False, False |
| AC5 | booking.py (no sort) | T11 | Available | True | True |
| AC6 | App.tsx / UI inputs | T12 | Available | Usable | Usable |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) | (write here) |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue (write here)

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | "The overlap condition `s < end and start < e` is correct." | Ran T1 (660-720) and T2 (630-690). | Accept | Strict inequalities correctly allow touching endpoints (T1) and reject overlap (T2). |
| 2 | "Add a 15-minute cleaning buffer between bookings." | Checked the assignment brief. | Reject | Nothing in AC1-AC6 mentions a buffer. Adding it changes the fixed criteria. |
| 3 | "I added a `try/except` block and type checking." | Ran the tests. | Modify | The tests pass, but the contract only requires AC1-AC4 checks. I removed it to keep the final code minimal. |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | (write here) |
| Model / plan | (write here) |
| Tool call | (write here) |
| Observation | (write here) |
| Next step | (write here) |
| Human review | (write here) |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** (write here)

**Reliability, security, responsibility:** (write here)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(write here)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** Qoder
- **Model:** Qwen3.8-Flash
- **Date:** 2026-11-01
- **Stage:** Plan
- **Source:** SIS-03

**Prompt:**

~~~~text
I am building can_book(start, end, now, blocked, existing) -> bool for a room availability checker. The acceptance criteria are:
AC1: integer minutes 0 <= start < end <= 1440, start strictly after now.
AC2: duration <= 120; exactly 120 allowed.
AC3: reject every request when blocked is True.
AC4: reject overlap with any (s,e) in existing; touching endpoints do NOT overlap.
AC5: return a real bool and never mutate existing.
Before writing code, give me a short plan: which checks you will write, in what order, which boundary cases you will cover, and which assumptions you make. Standard library only.
~~~~

**Response:**

~~~~text
Empty directory — so this is greenfield. Here's the plan before I write anything.

Check order (all failures return False; no exceptions)

Argument sanity — reject non-integers up front. Note the trap: isinstance(True, int) is True, so I explicitly reject bool values where an integer minute is expected.
AC1 range — 0  now. Validity gate first, because AC2/AC4 are meaningless on an incoherent request.
AC3 blocked — if blocked: return False. Ordered after validation only for readability; since both branches return False, the result is identical either way. Truthiness test, so blocked=1 also rejects.
AC2 duration — end - start  start so no negative-length special case.
AC4 overlap — iterate existing, treat intervals as half-open [s, e), reject when s  now and do not bound now itself beyond accepting it.
Invalid input returns False rather than raising. If you'd rather have ValueError on malformed arguments, say so — it changes step 1 and 2 only.
existing items are (s, e) pairs assumed already ordered (s <= e); I do not swap or normalize them, since that would risk mutating caller data.
blocked is one global flag for the room, not per-interval.
Intervals are half-open, which is what makes AC4's "touching does not overlap" fall out naturally.
Tests will use stdlib unittest, no third-party deps, per "standard library only".

Want me to write can_book.py plus the test file in this directory on that basis, or adjust any assumption first?
~~~~

### B2

- **Tool:** Qoder
- **Model:** Qwen3.8-Flash
- **Date:** 2026-11-01
- **Stage:** Generate 
- **Source:** SIS-03

**Prompt:**

~~~~text
Now write can_book following the plan. Standard library only. Keep the signature exactly can_book(start, end, now, blocked, existing). Return True only when AC1-AC5 hold, False otherwise. Do not mutate existing. No prints, no extra arguments.
~~~~

**Response:**

~~~~text
Writing the module and its test suite.

import copy
import unittest

def _is_minute(value):
    return isinstance(value, int) and not isinstance(value, bool)

def can_book(start, end, now, blocked, existing):
    if not (_is_minute(start) and _is_minute(end) and _is_minute(now)):
        return False
    if not 0 <= start < end <= 1440:
        return False
    if start <= now:
        return False
    if blocked:
        return False
    if end - start > 120:
        return False

    try:
        for s, e in existing:
            if s < end and start < e:
                return False
    except (TypeError, ValueError):
        return False
    return True

# ... дальше идет код тестов ...

Collapse changes for test_can_book.py

test_can_book.py
+101
-0

import copy
import unittest

from can_book import can_book


class CanBookTest(unittest.TestCase):
    def call(self, start, end, now, blocked, existing):
        before = copy.deepcopy(existing)
        result = can_book(start, end, now, blocked, existing)
        self.assertIs(type(result), bool)
        self.assertEqual(existing, before)
        self.assertEqual([id(item) for item in existing], [id(item) for item in before])
        return result

    def ok(self, start, end, now=0, blocked=False, existing=()):
        self.assertTrue(self.call(start, end, now, blocked, existing))

    def no(self, start, end, now=0, blocked=False, existing=()):
        self.assertFalse(self.call(start, end, now, blocked, existing))

    def test_ac1_valid_request(self):
        self.ok(540, 600, 0)

    def test_ac1_start_must_be_strictly_after_now(self):
        self.no(540, 600, 540)
        self.ok(540, 600, 539)
        self.no(540, 600, 541)

    def test_ac1_lower_and_upper_bounds(self):
        self.ok(0, 30, -1)
        self.no(-1, 30, 0)
        self.no(0, 1440, -1)
        self.ok(1320, 1440, 0)
        self.no(1400, 1441, 0)

    def test_ac1_requires_start_before_end(self):
        self.no(600, 600, 0)
        self.no(600, 540, 0)

    def test_ac2_duration_limit(self):
        self.ok(0, 119, -1)
        self.ok(0, 120, -1)
        self.no(0, 121, -1)

    def test_ac3_blocked_rejects_everything(self):
        self.no(0, 60, -1, blocked=True)
        self.no(1320, 1440, 0, blocked=True)
        self.no(540, 600, 999, blocked=True)
        self.no(0, 60, -1, blocked=1)

    def test_ac4_touching_endpoints_do_not_overlap(self):
        self.ok(60, 120, 0, existing=[(0, 60)])
        self.ok(60, 120, 0, existing=[(120, 180)])
        self.ok(60, 120, 0, existing=[(0, 60), (120, 180)])

    def test_ac4_single_minute_overlap(self):
        self.no(60, 120, 0, existing=[(59, 61)])
        self.no(60, 120, 0, existing=[(119, 121)])

    def test_ac4_containment_both_directions(self):
        self.no(60, 120, 0, existing=[(30, 200)])
        self.no(60, 120, 0, existing=[(80, 90)])
        self.no(60, 120, 0, existing=[(60, 120)])

    def test_ac4_zero_length_and_empty_existing(self):
        self.ok(60, 120, 0, existing=[])
        self.ok(60, 120, 0, existing=[(60, 60)])
        self.ok(60, 120, 0, existing=[(90, 90)])

    def test_ac5_never_mutates_existing(self):
        existing = [(1000, 1020), (60, 120), (0, 30)]
        snapshot = copy.deepcopy(existing)
        self.assertFalse(self.call(540, 600, 0, False, existing))
        self.assertEqual(existing, snapshot)

    def test_ac5_never_mutates_existing_when_order_is_reversed(self):
        existing = [(900, 960), (10, 20)]
        snapshot = copy.deepcopy(existing)
        self.assertTrue(self.call(540, 600, 0, False, existing))
        self.assertEqual(existing, snapshot)

    def test_non_integer_minutes_are_rejected(self):
        self.no(True, 120, 0)
        self.no(60, True, 0)
        self.no(60.0, 120, 0)
        self.no("60", 120, 0)
        self.no(60, 120, None)

    def test_malformed_existing_is_refused(self):
        self.no(60, 120, 0, existing=None)
        self.no(60, 120, 0, existing=[(1, 2, 3)])
        self.no(60, 120, 0, existing=["ab"])
        self.no(60, 120, 0, existing=[("x", "y")])

    def test_blocked_is_checked_before_overlap(self):
        self.no(60, 120, 0, blocked=True, existing=[(60, 120)])


if __name__ == "__main__":
    unittest.main()

I stopped short of running them — the test execution was declined, so the suite is written but unverified.

can_book.py implements the plan in this order: integer/bool guard → AC1 (0  now) → AC3 blocked truthiness → AC2 end - start <= 120 → AC4 half-open overlap test s < end and start < e over a read-only loop. Signature is unchanged, return is always a literal True/False, stdlib only, no prints.

test_can_book.py covers the boundary cases via a call() helper that asserts type(result) is bool and compares existing against a deepcopy (including tuple ids, so in-place reordering would be caught) after every invocation.

To verify, run python -m unittest -v test_can_book in the project directory, or tell me if you'd rather review the code first.
~~~~

### B3

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
test_121_minutes_is_rejected (test_booking.BookingTests.test_121_minutes_is_rejected) ... ok
test_blocked_room_rejects (test_booking.BookingTests.test_blocked_room_rejects) ... ok
test_contains_existing_is_rejected (test_booking.BookingTests.test_contains_existing_is_rejected) ... ok
test_ends_at_midnight_is_allowed (test_booking.BookingTests.test_ends_at_midnight_is_allowed) ... ok
test_exactly_120_minutes_is_allowed (test_booking.BookingTests.test_exactly_120_minutes_is_allowed) ... ok
test_inside_existing_is_rejected (test_booking.BookingTests.test_inside_existing_is_rejected) ... ok
test_negative_start_is_rejected (test_booking.BookingTests.test_negative_start_is_rejected) ... ok
test_overlap_is_rejected (test_booking.BookingTests.test_overlap_is_rejected) ... ok
test_past_midnight_is_rejected (test_booking.BookingTests.test_past_midnight_is_rejected) ... ok
test_reversed_times_are_rejected (test_booking.BookingTests.test_reversed_times_are_rejected) ... ok
test_second_booking_is_rejected (test_booking.BookingTests.test_second_booking_is_rejected) ... ok
test_start_at_now_is_rejected (test_booking.BookingTests.test_start_at_now_is_rejected) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_unsorted_existing_is_checked (test_booking.BookingTests.test_unsorted_existing_is_checked) ... ok
test_zero_length_is_rejected (test_booking.BookingTests.test_zero_length_is_rejected) ... ok

----------------------------------------------------------------------
Ran 15 tests in 0.001s

OK
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
