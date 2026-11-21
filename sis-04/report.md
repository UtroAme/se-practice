# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 10.), every
     ### sub-heading and every **Label:** word — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- | --- |
| Assistant (tool) | Qoder |
| Assistant model | Qwen3.8-Flash |
| Starting point | week-08 |
| Baseline commit | 60959b2 |
| Language (ts or js) | ts |
| Vitest version | 3.2.4 |
| Where I ran the tests | local terminal, Windows 11 |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/sis-04/app

 ✓ src/booking.test.ts (19 tests) 7ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 2ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects a partial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects a slot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects a slot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects a slot identical to abooking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts a slot when there areno bookings 0ms
   ✓ canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
   ✓ canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 1ms
   ✓ BUG-A: a request that touches existing bookings on both sides is Available 0ms
   ✓ BUG-B: canBook on an Available request does not change the bookings 0ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  12:51:50
   Duration  649ms (transform 61ms, setup 0ms, collect 67ms, tests 7ms, environment 0ms, prepare 169ms)

```

## 2. Context for the assistant

### 2.1 Repository map

<!-- The concise map you gave the assistant: the files that matter and one line each on what
     they do. A tree is fine:  src/App.tsx — the page, holds the rooms and the form … -->

```text
app/
  package.json              — deps: react 18, vite 5, vitest 3.2.4, typescript 5.5
  index.html                — Vite entry, mounts #root
  src/
    main.tsx                — React entry, renders <App />
    booking.ts              — canBook(): AC1–AC5 rules for a single room (no roomId)
    App.tsx                 — the page: form + 2-room inline catalog; blocked is a form checkbox, not per-room
    booking.test.ts         — 19 Vitest tests: T01–T14, X1, X2, BUG-A, BUG-B (AC1–AC5)
    index.css               — responsive styles
```

### 2.2 The context message as sent

<!-- The whole first message of your analysis chat: the map, AC1–AC6, F1–F5 and the constraints
     (no login, payments, live APIs or database; fictional data only). Unedited. -->

```text
You are helping me extend a working React + TypeScript "Smart Campus Room Availability Checker".
Repository map (from week-08, unchanged):
- app/src/booking.ts: canBook({ start, end, now, blocked, bookings }) implements AC1–AC5 for a single room. No roomId, no checkRoom.
- app/src/App.tsx: the page. Holds an inline ROOMS array with 2 rooms ({ id, name, blocked, bookings } — no capacity, no equipment). The blocked flag is a form checkbox (useState), not a per-room property. Calls canBook directly.
- app/src/booking.test.ts: 19 Vitest tests covering AC1–AC5 (T01–T14, X1, X2, BUG-A, BUG-B).

Preserve AC1–AC6 (unchanged):
AC1 reject start >= end and requests in the past;
AC2 enforce 120-minute maximum;
AC3 reject a blocked room;
AC4 reject overlaps, allow touching endpoints;
AC5 return Available/Unavailable without changing booking data;
AC6 clear responsive feedback on desktop and mobile.

Constraints: no login, no payments, no live APIs, no database; fictional data only.

New requirements F1–F5:
- a catalog of at least 4 fictional rooms, each with id, name, capacity, equipment list, blocked status and its own bookings;
F1 capacity >= requested attendees;
F2 the room has ALL selected equipment (not some);
F3 a blocked room is never reported available;
F4 clear empty state when no rooms match;
F5 changing the selected room refreshes the result using THAT room's bookings.

Do NOT rewrite the whole App.tsx in one answer. Do NOT rewrite booking.ts from scratch — the AC1–AC5 logic is proven by 19 passing tests.
First give me only:
(a) 3+ maintainability risks with file/function references;
(b) a numbered plan of small steps, smallest safe step first.
No code yet.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

<!-- At least three, found in YOUR starting code. "Where" names a file or a function(),
     e.g. src/App.tsx, check(). Evidence is what you saw, not what the assistant said.
     Priority: High / Medium / Low. -->

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | `blocked` is a form checkbox, not a per-room property: `canBook` receives the checkbox's `useState` value, not `room.blocked`, so F3 (a blocked room must never be Available) cannot work per room | `src/App.tsx`, `App()` | In `App.tsx`: `const [blocked, setBlocked] = useState(false)` and `<input type="checkbox" checked={blocked} …>`. The call `canBook({ …, blocked, bookings: room.bookings })` passes the checkbox state — `room.blocked` from the `Room` type is never read. Selecting a blocked room and leaving the box unchecked reports "Available". Checker confirmed it cannot prove F3: `A5 FAIL`. | High |
| 2 | The room catalog is inline in `App.tsx` with only **2** rooms, and the `Room` type there has no `capacity` and no `equipment` — so F1 and F2 cannot be expressed at all | `src/App.tsx`, `App()` | `const ROOMS: Room[] = […]` has 2 entries (`a101`, `b204`); `type Room = { id; name; blocked; bookings }`. `grep -n capacity app/src` and `grep -n equipment app/src` return nothing. Checker: `A2 ERROR: no src/rooms.ts`, `A3 ERROR: no src/filter.ts`, `A5 FAIL: no UI file uses filterRooms`. | High |
| 3 | `canBook` knows only a single room and has no way to look up a chosen room by id; the UI calls it with a hand-picked `blocked` + `bookings` pair, so F5 (the result comes from THAT room's data) cannot be tested | `src/booking.ts`, `canBook()` | The file exports only `canBook`; `grep -n checkRoom app/src` returns nothing. Checker: `A4 FAIL: has no checkRoom(rooms, roomId, { start, end, now })`. | High |
### 3.2 Improvement plan — before editing

<!-- Numbered, in the order you will do it, smallest safe step first. Written BEFORE you change
     code: the commit that adds this section comes before the commit that changes app/src. -->

1. **Housekeeping before any app/src change**: add `app/.gitignore` (node_modules, dist, coverage, .env) and run `git rm -r --cached node_modules` — no files deleted from disk. Checker: A7 PASS.
2. **Extract and extend the catalog**: create `src/rooms.ts` with `type Room = { id, name, capacity, equipment, blocked, bookings }` and `ROOMS` — the 2 existing rooms gain `capacity` and `equipment`, plus 2 new fictional rooms. Give one room `blocked: true` to exercise F3. No UI change yet; `npx vitest run` must stay 19/19.
3. **Filter module (test first)**: write F1 and F2 tests in `src/filter.test.ts` against a fixed catalog inside the test file (not `ROOMS`); then create `src/filter.ts` with `filterRooms(rooms, { attendees, equipment })` using `capacity >= attendees` and `equipment.every(...)`. Run all — 21/21.
4. **checkRoom (test first)**: write F3 and F5 tests against the same fixed catalog; append `checkRoom(rooms, roomId, { start, end, now })` to `src/booking.ts` calling the existing `canBook`. Leave `canBook` byte-identical — the 19 original tests are the regression. Add B5 and B6 to `filter.test.ts`. Add the missing IDs to the four existing tests (`T06 B1 AC2`, `T07 B2 AC2`, `T01 B3 AC4`, `T09 B4 AC4` — titles only, logic unchanged). Add F4 and INT. Total 27/27.
5. **Rewire the page**: rewrite `src/App.tsx` to import `ROOMS`, `filterRooms`, `checkRoom`. Remove the inline `ROOMS` array and the `blocked` checkbox — the blocked status now comes from the room itself. Add capacity and equipment filter inputs; render an empty state (F4); keep the responsive layout. Manual check in the browser.
6. **Diagrams**: `diagrams/before.puml` (a single `App.tsx` component with the two rules inline) and `diagrams/after.puml` (rooms, booking, filter, App with import arrows).
7. **Screenshots**: five PNGs in `evidence/` (filter-match, filter-empty, switch-a, switch-b, narrow).
8. **Report and declare**: fill §4–§10 with the real final run; run the checker; copy the numbers into `submission.yml`.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| "Add `canBookRoom(request, room, filters)` as a thin wrapper that calls the existing `canBook` for AC1–AC4, then layers F1/F2/F3." | Rejected | A4 fixes the name and signature: `checkRoom(rooms, roomId, request)` in `src/booking.ts`. The proposed name would fail A4 outright. Also F1/F2 are filtering rules — they belong in `filterRooms` (A3), not in a room-availability wrapper; otherwise capacity/equipment can hide the "blocked room never available" reason behind a filter miss, and F3/F5 get mixed with F1/F2 in one function. I kept `checkRoom(rooms, roomId, request)` that looks up the room by id and calls `canBook` with `room.blocked` and `room.bookings` only. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** Qoder Qwen3.8-Flash
**Date:** 2026-11-21
**Purpose:** Ask the assistant for a maintainability analysis of the week-08 starting point and a small-step plan before any code change (Task 1 of SIS #04). Confirm which risks are real and reject anything that conflicts with the fixed requirements.

**Prompt:**

```text
You are helping me extend a working React + TypeScript "Smart Campus Room Availability Checker".
Repository map (from week-08, unchanged):
- app/src/booking.ts: canBook({ start, end, now, blocked, bookings }) implements AC1–AC5 for a single room. No roomId, no checkRoom.
- app/src/App.tsx: the page. Holds an inline ROOMS array with 2 rooms ({ id, name, blocked, bookings } — no capacity, no equipment). The blocked flag is a form checkbox (useState), not a per-room property. Calls canBook directly.
- app/src/booking.test.ts: 19 Vitest tests covering AC1–AC5 (T01–T14, X1, X2, BUG-A, BUG-B).

Preserve AC1–AC6 (unchanged):
AC1 reject start >= end and requests in the past;
AC2 enforce 120-minute maximum;
AC3 reject a blocked room;
AC4 reject overlaps, allow touching endpoints;
AC5 return Available/Unavailable without changing booking data;
AC6 clear responsive feedback on desktop and mobile.

Constraints: no login, no payments, no live APIs, no database; fictional data only.

New requirements F1–F5:
- a catalog of at least 4 fictional rooms, each with id, name, capacity, equipment list, blocked status and its own bookings;
F1 capacity >= requested attendees;
F2 the room has ALL selected equipment (not some);
F3 a blocked room is never reported available;
F4 clear empty state when no rooms match;
F5 changing the selected room refreshes the result using THAT room's bookings.

Do NOT rewrite the whole App.tsx in one answer. Do NOT rewrite booking.ts from scratch — the AC1–AC5 logic is proven by 19 passing tests.
First give me only:
(a) 3+ maintainability risks with file/function references;
(b) a numbered plan of small steps, smallest safe step first.
No code yet.
```

**Output used:**

```text
I'll read the three files first so the risks cite real line numbers rather than your summary.



I couldn't locate app/src/ in this workspace (the read and listing attempts both failed/were declined), so the references below are to the files and functions as you described them, not verified line numbers. Say the word if you want me to work against the actual checkout.

(a) Maintainability risks

R1 — Single-room signature is the core bottleneck (booking.ts: canBook({start, end, now, blocked, bookings})).
F1/F2 have no place to live: there's no capacity or equipment parameter, and no room identity. Two futures exist and each carries a cost: (i) widen canBook's argument object → every one of the 19 tests still compiles (object args are open), but the function silently grows into a 6-concern validator; (ii) add a new canBookRoom(request, room, filters) wrapper → now there are two entry points and a reader can't tell which is canonical. Risk: duplicate/parallel validation logic drifting apart, and F3 (blocked never available) enforced in one but not the other.

R2 — blocked has two contradictory homes (App.tsx useState checkbox vs. the catalog's per-room blocked).
Your map says the flag is form state today but the new catalog demands it as room data. During migration both can exist. That's exactly the shape of BUG-A/BUG-B-style bugs already in the test file: the checkbox would gate whichever room is selected, so unblocking the form while a room is data-blocked (or vice versa) yields an inconsistent F3. Highest-probability correctness regression.

R3 — The catalog lives inline inside App.tsx.
Adding capacity + equipment arrays to 4+ rooms grows an already-render-heavy component: catalog data, filter state (attendees, equipment, room selection), result derivation, and AC6 feedback all in one file. Practical consequences: tests can't exercise F1–F4 without rendering the whole page, and any future room edit is a diff inside a component — data changes and UI changes land in the same commit. Also invites the failure mode where "matching rooms" is recomputed in more than one place (render body vs. click handler) and the two disagree.

R4 — Result-rendering duplication threatens F5 (and AC5).
If the availability verdict is produced by one code path on submit and re-derived (or worse, cached in a separate useState) on room change, F5's "use THAT room's bookings" breaks subtly and AC5's no-mutation guarantee gets tested only for the old path. The bug class: stale result for the previously selected room, or a room-change handler that re-runs side effects against the shared/old bookings array.

R5 — Test-file scope creep (booking.test.ts, 19 tests).
F1/F2/F4 are catalog-and-filter semantics, not the current canBook contract. Bolting them onto the existing file mixes "proven, do-not-touch" AC1–AC5 tests with new ones, making it easy to accidentally edit an AC test's fixture to make an F test pass. AC1–AC5 need to stay visibly untouched to keep their evidentiary value.

(b) Plan — smallest safe step first

Characterization check (no edits). Run the 19 tests, confirm green, and record the exact canBook argument keys and return shape. Cheap baseline that makes every later diff auditable.
Extract the catalog only — no fields added yet. Move the 2 rooms out of App.tsx into a new src/rooms.ts exporting ROOMS: Room[], with a Room type declared up front (id, name, capacity, equipment, blocked, bookings). Leave canBook and all tests untouched; verify the page renders identically. Pure relocation, trivially revertible.
Expand the data to 4+ fictional rooms with real capacity/equipment values, and move blocked from the form checkbox into room data (removing the checkbox in the same step so only one source of truth exists — see R2). UI still ignores the new fields.
Add a pure filtering function next to the data (src/rooms.ts), e.g. filterRooms(request, rooms) returning matching rooms for F1/F2. Pure and file-local → testable without React, and it does not touch canBook.
Add canBookRoom(request, room, filters) as a thin wrapper that calls the existing canBook for AC1–AC4, then layers F1/F2/F3 — with an explicit early room.blocked → Unavailable so F3 can't be bypassed. canBook's body stays byte-identical; existing tests remain its safety net.
Make "matching rooms" and "the verdict" single derivations in App.tsx (computed from selected room + filters, not mirrored in extra state) so room changes pick up that room's bookings — F5, and R4 closed before UI wiring.
Wire the UI in two separate commits: (a) room selector + attendees/equipment inputs feeding the derivation; (b) F4 empty state, keeping AC6 feedback intact.
New tests in a separate file (rooms.test.ts / bookingRoom.test.ts) for F1–F5, including a F5 regression test (same request, two rooms with different bookings → different verdicts) and an F3 test asserting blocked never reports available.
Final confirmation run: all 19 original tests still pass unmodified* plus the new ones, then re-read canBook in booking.ts to verify it is unchanged.

Step 2 is the deliberate first move: it relocates data without touching proven logic, so the riskiest-looking change (the catalog) costs almost nothing, and the semantic changes are isolated to steps 4–6.
```

**Problems found:** 
1. The assistant never read the actual files — its own response begins "I couldn't locate app/src/ in this workspace", so R1–R5 cite file names from my summary, not real line numbers. Every "risk" had to be verified against the actual code before I could use it.
2. Function name conflicts with A4: it proposed `canBookRoom(request, room, filters)`. The brief (§7) and checker A4 require exactly `checkRoom(rooms, roomId, request)` — different name, different arguments.
3. Argument order conflicts with A3: it proposed `filterRooms(request, rooms)` — the brief requires `filterRooms(rooms, { attendees, equipment })`.
4. Wrong file for the filter: it proposed putting `filterRooms` in `src/rooms.ts`. A3 requires `src/filter.ts`.
5. It bundled F1/F2/F3 into one `canBookRoom` ("layers F1/F2/F3"), which hides where each rule lives. F1/F2 are filtering and belong in `filterRooms`; F3 is a blocking rule and belongs in `checkRoom`.
6. R5 (test-file scope creep) is useful — the new F/B tests must go in a separate file so the 19 existing AC1–AC5 tests stay visibly untouched.
**Changes made:** 
- Kept R1, R2, R3 as risks #3, #1, #2 in §3.1 — they match the actual code (see Verified by).
- Rejected the function name: `canBookRoom` → `checkRoom(rooms, roomId, request)`.
- Modified the argument order: `filterRooms(request, rooms)` → `filterRooms(rooms, { attendees, equipment })`.
- Moved the file: `filterRooms` goes in `src/filter.ts`, not `src/rooms.ts`.
- Split responsibilities: `filterRooms` handles F1/F2; `checkRoom` handles F3/F5 and calls the unchanged `canBook`.
- Adopted the plan's step ordering (relocate catalog → add fields → filter → checkRoom → UI) as it is the smallest-safe-step order.
- Adopted the plan's step 6 (single derivation, no mirrored result) — relevant to F5 and its stale-result bug class (R4).
- Adopted R5: new tests go in a new file so the 19 existing AC1–AC5 tests stay visibly untouched.
**Verified by:** 
- python tests/check_sis.py: A2 ERROR (no src/rooms.ts), A3 ERROR (no src/filter.ts), A4 FAIL (no checkRoom), A5 FAIL (no filterRooms imported in UI) — confirms risks #1–#3 are real, not just plausible.
- grep -n "checkRoom\|filterRooms\|capacity\|equipment" app/src → no matches — confirms the assistant's "no roomId, no capacity/equipment" claims against the actual files.
- npx vitest run → 19/19 passing — confirms canBook needs no change; the regression suite is intact.

### 8.2 Exchange 2

**Tool and model:** Qoder Qwen3.8-Flash
**Date:** 2026-11-21
**Purpose:** (write here)

**Prompt:**

```text
For F2, should filterRooms use equipment.some(...) or equipment.every(...)?
Show me the one-line filter expression and explain which one the brief requires.
```

**Output used:**

```text
every — F2 says the room has all selected equipment, so the requirement is subset containment: every item the user selected must exist in that room's list. some would accept a room offering 1 of 3 requested items, which the brief explicitly rules out ("not some").

selectedEquipment.every((item) => room.equipment.includes(item))

Two notes worth keeping in the tests:

Direction matters. The natural reading is selected ⊆ room.equipment. The inverted form room.equipment.every(e => selected.includes(e)) means "room has nothing extra" and would reject rooms with more equipment than asked for — almost certainly not intended.
Empty selection → every returns true (vacuously), so "no equipment filters" matches every room. That's the correct behavior for F1/F2 as filters, but it's an untested edge today; worth an explicit case so nobody later "fixes" it into requiring a non-empty list.
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** Qoder Qwen3.8-Flash
**Date:** 2026-11-21
**Purpose:** (write here)

**Prompt:**

```text
Show me only src/filter.ts with filterRooms(rooms, { attendees, equipment }) — 6 lines max.
Do not include App.tsx, booking.ts or anything else.
```

**Output used:**

```text
import type { Room } from "./rooms";

export function filterRooms(rooms: Room[], f: { attendees: number; equipment: string[] }) {
  return rooms.filter((r) =>
    r.capacity >= f.attendees && f.equipment.every((e) => r.equipment.includes(e)));
}

Two deliberate omissions: no blocked test here (F3 belongs on the verdict path so a blocked room can't slip through a filter-only check), and no F1 lower-bound validation — attendees must be sanitized by the caller, otherwise capacity >= NaN is false and F4's empty state would mask a bad input.

I'm showing rather than writing this — app/src/ isn't present in the current workspace, so there's no checkout for me to create the file in.
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
