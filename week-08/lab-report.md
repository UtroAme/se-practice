# Week 08 — Lab report

**Name:** Tomiris Zhazykbayeva
**Group:** CSCI-2208
**Date:** 2026-11-07

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | |
| Exact model (with its version, or `not displayed`) | |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | |
| Vitest version (the `RUN  v…` line of a run) | |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
$ npx vitest run

 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts (17 tests) 3ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 1ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T01 AC4: accepts aslot touching a booking on its end 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T08 AC4: accepts aslot touching a booking on its start 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects apartial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects aslot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects aslot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects aslot identical to a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts aslot when there are no bookings 0ms
   ✓ canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
   ✓ canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 0ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  13:59:53
   Duration  350ms (transform 43ms, setup 0ms, collect 39ms, tests 3ms, environment 0ms, prepare 120ms)
```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
(paste here)
```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
(paste here)
```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | | | | | |
| BUG-B | | | | | |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes / no |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes / no |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes / no |
| I read the whole file once: no passwords, API keys or private student data | yes / no |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
(paste here)
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->
