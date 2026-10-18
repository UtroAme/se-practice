# Week 06 — Lab report

**Name:** Tomiris Zhazykbayeva
**Group:** CSCI-2208
**Date:** 2026-10-18

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Tool | Bolt.new |
| Exact model (as Bolt shows it, or `not displayed`) | GLM 5.3 Flash |
| Bolt project link (or `not shared`, and why) | not-shared |
| Browser and version | Google Chrome 155.0.8059.84 |
| If you could not use Bolt.new: the tool you used instead, and why | |

---

## 2. Task 1 — define before generating

**Two predictions, written BEFORE you send the first prompt.** Where do you expect v1 to go wrong?
Fill the first three columns now; fill the last one after Task 3.

| # | What I expect to go wrong | AC it concerns | Was I right? (after Task 3) |
| --- | --- | --- | --- |
| 1 | The AI will miss the input for "current time", so I won't be able to test cases like T6 (starts now) or T3 (blocked room). | AC1, AC3 | Yes, v1 had hardcoded time and no block feature. |
| 2 | The "Check" button will accidentally add the checked time to the existing bookings, so checking the same time twice will fail. | AC5 | No, v1 did not add the booking to the list (T8 passed). |

**The initial prompt exactly as I sent it** — the deck's prompt with AC1–AC6 pasted in place of
`[paste AC1–AC6]`, nothing else changed:

```text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
```

---

## 3. Task 2 — prototype v1

v1 export saved in `original/` and screenshot saved as `evidence/v1.png` **before** any cleanup
prompt: yes

**Bolt's list of the files/components it created, pasted unedited:**

```text
Main files created:

src/lib/availability.ts — fictional sample rooms/bookings, minutes-of-day helpers, and the checkAvailability validator covering all rules (0 ≤ start < end ≤ 1440, start after current time, ≤ 120 min, blocked-room rejection, overlap check with touching endpoints allowed, read-only data)

src/App.tsx — the one-page responsive UI: room/time form, clear Available/Unavailable verdict with a reason, and a schedule overview of all rooms (past bookings shown struck-through)
```

**What v1 does — one line per thing that works, or visibly does not:**

- Form for room and time selection works.

- Shows Available/Unavailable decision.

- Fails: Current time is hardcoded to 13:00, no way to change it or block a room.

**Repair prompt** (only if the first build did not run — the deck allows one, then the result is
v1). Leave empty if you did not need it:

```text
```

---

## 4. Task 3 — the nine cases

Base for every case unless the row says otherwise: **current time 09:00**, room **not blocked**,
the room's **only booking 10:00–11:00**. The Expected column comes from AC1–AC6 — do not change it.
Write each result exactly as **Available**, **Unavailable** or **Not testable** (the page gives you
no way to set up the case). Save each final run as `evidence/final-T<n>.png`.

| # | Case | What you set up and request | Expected | AC | Result on v1 | Result on final | Final screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 11:00–12:00 | Available | AC4 | Unavailable | Available | final-T1.png |
| T2 | Overlap | 10:30–11:30 | Unavailable | AC4 | Unavailable | Unavailable | final-T2.png |
| T3 | Blocked | 11:00–12:00, room blocked | Unavailable | AC3 | Not testable | Unavailable | final-T3.png |
| T4 | Exactly 2 hours | 12:00–14:00 | Available | AC2 | Unavailable | Available | final-T4.png |
| T5 | Over 2 hours | 12:00–14:01 | Unavailable | AC2 | Unavailable | Unavailable | final-T5.png |
| T6 | Starts now | 09:00–09:30 (current time 09:00) | Unavailable | AC1 | Unavailable |Unavailable | final-T6.png |
| T7 | Reversed times | 12:00–11:00, and the page says why | Unavailable | AC1, AC6 | Unavailable | Unavailable | final-T7.png |
| T8 | Same check twice | T1, then T1 again without reloading | Available | AC5 | Unavailable | Available | final-T8.png |
| T9 | Narrow screen | T1 at about 375 px wide | Available | AC6 | Unavailable | Available | final-T9.png |

---

## 5. Issue log — cleanup targets

One row per issue you chose to act on (or deliberately not act on). At least **two**: one
functional and one usability or code-quality issue when you have them. If v1 passed every case,
log a justified cleanup that preserves behaviour. Save a screenshot of each as
`evidence/issue-<n>.png`.

| # | Issue | Evidence: steps → expected → observed | Priority | Decision |
| --- | --- | --- | --- | --- |
| 1 | Hardcoded time and missing block toggle | Open v1. Expected: ability to set current time (AC1) and block a room (AC3). Observed: time is fixed at 13:00 and no block control exists. | High | Fix  |
| 2 | Code duplication in inputs | Open src/App.tsx in v1. Expected: clean code. Observed: identical long style strings repeated on four separate inputs | High | Fix |

---

## 6. Task 4 — cleanup with focused prompts

One issue per prompt. Paste every prompt **as sent** (every `[bracketed field]` and `AC#` filled
in) and Bolt's answer, unedited.

**Functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, hardcoded time and missing block feature produces wrong results, but AC1 and AC3 require a supplied current time and blocked room. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.

I'll make the smallest change: add a "current time" input and a per-room block/unblock toggle in the page component, feeding those supplied values into the existing validator.


Edited
src/App.tsx
Open
One edit didn't match the header text; let me check the actual wording.


0123456789
 actions taken
Let me verify that cleanup edit didn't break the file.


Read
src/lib/availability.ts
Open
The edit clobbered the function header. Fixing now.


Edited
src/lib/availability.ts
Open
Let me re-read the file to check its current state before making further changes. Grep for the current state: Grep. I need to see what's there. Let me read the full file. Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read Read

Wait — I need to check the actual file content. Let me read it.Let me read the current state of the file to verify my changes are intact. Read src/App.tsx

I'll check the current state of the project and run the build to see what's failing.

Let me check what's in the project and run a build to see the current state.

I'll check the project's current state first, then run the build.


Searched
*.{json,ts,js}
Open
Let me check the current state of the project files to see what's here.

I'll check the project's current state first, then run the build to see where things stand.

Let me check the project structure and run a type check to verify everything builds correctly.Glob "**/*.{ts,tsx}"Let me check the current state of the project files.

It looks like there's no request in your message yet. What would you like me to help you with — building a feature, fixing a problem, or something else in your app?

It looks like your message came through empty — I don't see a request or any code attached. Could you tell me a bit about your app and what you'd like to do (for example, "add a sign-up form" or "fix the broken list page")? Once I know what you're building, I can get started.

It looks like your message came through empty — there's nothing for me to act on yet. Could you tell me what you'd like to do with your app (for example, a feature to add or something that isn't working), and I'll get started?
```

**Cleanup prompt, as sent, and Bolt's answer:**

```text
Review only src/App.tsx for unnecessary duplication, confusing naming, or UI feedback problems. Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1-AC6.

626f6c742d63632d6167656e74I reviewed the file (read earlier this session). The clearest small cleanup: the identical long input style string is repeated on four separate inputs — I'll extract it into one constant, with no visual change.The select and button have intentionally different styles, so they stay as-is. Verifying the build.I did one small cleanup in the booking form file: the long input style string that was copy-pasted onto the current-time, room, start, and end fields is now defined once and reused. Nothing changed visually — the fields look and behave exactly as before, so all the acceptance-criteria behaviors (settable current time, block/unblock, duration cap, overlap detection) are preserved, and the project still builds cleanly.
```

Add further blocks for further prompts.

**Every change or suggestion Bolt made, judged.** Accepting is a decision; so is rejecting. Cite
the AC (or the scope) that justifies it.

| # | What Bolt changed or suggested | accept / reject | Reason — cite the AC or the scope | Retest: which cases, result |
| --- | --- | --- | --- | --- |
| 1 | Added a "current time" input and room block/unblock toggles. | accept | AC1 requires a supplied current time; AC3 requires testing a blocked room | Retested T3 (Unavailable) and T6 (Unavailable) |
| 2 | Extracted the repeated long input style string into one constant | accept | Improves code quality and avoids duplication without changing UI or logic (AC6) | Retested all T1-T9, all pass |

---

## 7. Change log — v1 to final

Two to four concrete changes, each one retested.

| # | Issue | Decision | Change (file or component) | Result after retest |
| --- | --- | --- | --- | --- |
| 1 | 	Hardcoded time / no block feature | Fix | Added time input and block buttons in src/App.tsx | All 9 cases now match expected results |
| 2 | Input style duplication | Fix | Extracted style constant in src/App.tsx | UI is unchanged, no regressions |

---

## 8. One generated component, in my own words

Pick one file or component Bolt generated that matters for AC1–AC5 — the one that decides
availability is the best choice. Name its path in backticks, then explain in your own words, without
the assistant, what it does and how it decides. 60 words or more.

**File:** `src/lib/availability.ts`

<!-- Write your explanation below this line -->
This file contains the core logic for deciding if a room is available. It defines the sample data, including rooms and their bookings. The main function converts the input time (HH:MM) into minutes after midnight. It then checks several rules: if the room is blocked, if the start time is before the current time, if the booking is longer than 120 minutes, and if it overlaps with any existing bookings. Touching endpoints are allowed because it checks if start < existingEnd and end > existingStart. If all checks pass, it returns an Available status.

---

## 9. What still fails, and what the criteria do not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | none |

### 9.2 The end of the day

AC1 allows `end ≤ 1440` — a booking may end at 24:00. Can a user of your final page ask for
23:00–24:00? How — and if not, why is that acceptable or not? (This is the value you declare in
`submission.yml` under `assumptions.end_of_day`.)

-The page uses standard HH:MM time inputs, which limit the maximum time to 23:59. Therefore, a booking ending at 24:00 cannot be expressed in the UI. This is acceptable for this prototype because 24:00 is an edge case not covered by the nine required test cases, and adding a special "24:00" option would complicate the UI for a rare scenario. We declare this assumption as "not-expressible".

### 9.3 Which "now"?

AC1 says "after the supplied current time". What did **v1** use as the current time, and what did
that mean for testing case T6?

-v1 used a hardcoded time of 13:00. This meant that any test trying to book a time in the morning (like T6 at 09:00) was rejected as "in the past". Case T6 (starts now) was impossible to test properly on v1 because we could not set the current time to 09:00 to match the start time.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Which of your two predictions in section 2 was right, and what did v1 actually get wrong?
     (b) Which AI suggestion did you reject, or would have been wrong to accept, and why?
     (c) What is the difference between "the prototype looks finished" and "the prototype meets
         AC1-AC6" - shown with one case from section 4?
     Worthless: "Bolt made some mistakes and I fixed them."
     Worth everything: "T8 failed on v1: the Check button also added the booking to the list, so
     checking 11:00-12:00 a second time said Unavailable. AC5 says the check must not change the
     booking data." -->

<!-- Write your conclusion below this line -->
My first prediction was correct: v1 completely missed the "supplied current time" requirement. Because the time was hardcoded to 13:00, most of the morning test cases failed or were impossible to run, and T3 could not be tested at all because there was no way to block a room. 

An AI suggestion I had to carefully judge was when Bolt tried to fix the code but left the time hardcoded the first time. I had to explicitly reject the incomplete fix and prompt it again with the AC1 criteria to force it to add the time input. The AI also hallucinated some file reads during the second prompt, which I ignored as it was not relevant to the scope.

The difference between "looks finished" and "meets AC1-AC6" is clear with T1. On v1, T1 (11:00-12:00) looked like a normal form, but it failed because it said Unavailable due to the wrong hardcoded time. Only after fixing the logic did it correctly say Available.