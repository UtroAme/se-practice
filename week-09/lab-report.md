# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:**
**Student ID:**
**GitHub:**

---

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | Qoder |
| Exact model (or "not displayed") | Qwen3.8-Flash |
| Three fresh chats for R1, R2, R3? (yes / no) | yes |
| Python version (`python --version`) | Python 3.11.7 |

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json
{
  "name": "check_room",
  "description": "Check whether the meeting room is available for a requested time interval, given the current time, whether the room is blocked, and existing bookings. All times are whole minutes since midnight, from 0 to 1440, where 10:00 is 600 and 24:00 is 1440. This tool only checks availability; it does not save, create, or modify any booking.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested start time, whole minutes since midnight (10:00 = 600)."
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested end time, whole minutes since midnight (24:00 = 1440)."
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Current time, whole minutes since midnight."
      },
      "blocked": {
        "type": "boolean",
        "description": "Whether the room is blocked."
      },
      "bookings": {
        "type": "array",
        "description": "Existing bookings, each an object with start and end in whole minutes.",
        "items": {
          "type": "object",
          "properties": {
            "start": { "type": "integer", "minimum": 0, "maximum": 1440 },
            "end":   { "type": "integer", "minimum": 0, "maximum": 1440 }
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": ["start", "end", "now", "blocked", "bookings"],
    "additionalProperties": false
  }
}
```

| Field | Constraint (e.g. `"type": "integer"`, `"maximum": 1440`) | What goes wrong without it |
| --- | --- | --- |
| `start`, `end`, `now` | `"type": "integer"` | A model can send `"11:00"` (S03) or `600.5` (S10); the schema would accept a string or float where canBook needs a whole minute, and arithmetic would crash or produce nonsense. |
| `start`, `end`, `now` | `"minimum": 0`, `"maximum": 1440` | Times like `-30` (S06) or `1500` (S07) would pass and break AC1's numeric range — the function would reason about hours that do not exist in the day. |
| whole `inputSchema` | `"additionalProperties": false` | An extra field such as `"room": "204"` (S05) would silently reach the function; canBook has no such parameter, so the request would either be ignored or crash. |
| whole `inputSchema` | `"required": ["start","end","now","blocked","bookings"]` | A call missing `now` (S04) would be accepted; canBook would then compare against an undefined current time and the AC1 `start > now` check could not run. |
| `blocked` | `"type": "boolean"` | The string `"false"` (S09) is truthy in Python, so the room would be reported as blocked when it is actually free — a silent logic inversion. |
| `bookings` | `"type": "array"` plus `"items"` with `"required": ["start","end"]` | A booking like `{"start": 660}` with no `end` (S08) or a pair `[660, 720]` (S12) would be accepted; the overlap check for AC4 would have nothing to read. |
| each element of `bookings` | `"type": "integer"`, `"minimum": 0`, `"maximum": 1440` on nested `start`/`end` | A nested booking with `"end": "12:00"` would slip through the array, and the overlap arithmetic would compare a string to an integer. |

## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | nothing |
| S02 | PASS | PASS | nothing |
| S03 | PASS | PASS | nothing |
| S04 | PASS | PASS | nothing |
| S05 | PASS | PASS | nothing |
| S06 | PASS | PASS | nothing |
| S07 | PASS | PASS | nothing |
| S08 | PASS | PASS | nothing |
| S09 | PASS | PASS | nothing |
| S10 | PASS | PASS | nothing |
| S11 | PASS | PASS | nothing |
| S12 | PASS | PASS | nothing |

I wrote the full schema in §2 before running the checker for the first time, so no
S-case changed. The reason each constraint was needed is in §2, mapped to the S-case
it refuses.

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.

### R1

```text
{"name": "check_room", "arguments": {"start": 600, "end": 660, "now": 540, "blocked": false, "bookings": [{"start": 660, "end": 720}]}}
```

<!-- Match? If F3 failed, which argument differs, and who was wrong: the model or the request? -->
The model converted 9:00 → 540, 10:00 → 600, 11:00 → 660, 12:00 → 720, set `blocked: false`, and wrapped the one existing booking as `{start: 660, end: 720}`. All five arguments match EXPECTED.r1 exactly — F3 passes. The model read "free from 10:00 to 11:00" literally and did not try to guess anything else.

### R2

```text
{"name": "check_room", "arguments": {"start": 840, "end": 990, "now": 810, "blocked": true, "bookings": []}}
```

<!-- Same. R2 is a call that SHOULD be made, although canBook will say Unavailable. Did the model refuse to call? -->
13:30 → 810, 14:00 → 840, 16:30 → 990, `blocked: true`, `bookings: []`. The model **did call** rather than refuse. That is correct: R2 is a request that should be sent to canBook, and it is canBook — not the schema and not the model — that returns Unavailable. Arguments match EXPECTED.r2 exactly — F6 passes.

### R3

```text
What exact start and end times (e.g., 13:00–15:00), and what are the current time, blocked status, and existing bookings?
```

<!-- What information was missing? Did the model ask, or call? If it called, which values did it invent, and from where? -->
The request left out everything except a vague "tomorrow afternoon for a couple of hours". Missing: `now`, `start`, `end`, `blocked`, `bookings`. The model **asked** instead of inventing values — it did not pick `now = 720` or `start = 780` out of the air. That is the behaviour the prompt asked for ("if the request does not give you enough information … reply with one short question"). R3 has no fixed expected answer; the finding here is that the model chose to ask. Saved in `calls/r3.txt`.

## 5. What the schema cannot check

<!-- Name the acceptance criteria (AC1-AC6, README section 3) that a JSON Schema with the allowed keywords cannot
     enforce, and say why for each. At least two, by their AC number. Which part of AC1 CAN the schema enforce? -->
**AC1, the relational part** — `start < end` and `start > now`. The schema **can** enforce the numeric range (0 ≤ value ≤ 1440) with `minimum: 0` and `maximum: 1440`, but JSON Schema with the allowed keywords has no way to compare two fields. S01 shows this: `start = 600, end = 660` is valid, and `start = 660, end = 600` would also pass the schema — only canBook could refuse it.

**AC2 — at most 120 minutes** (`end - start ≤ 120`). This is arithmetic between two fields. S11 with `start = 1380, end = 1440` passes the schema, and so would `start = 0, end = 1440` (a full day) — the schema has no subtraction operator.

**AC3 — blocked** — the schema accepts `blocked: true` and `blocked: false` equally; it cannot say "if blocked, answer Unavailable". That decision belongs to the function.

**AC4 — no overlap, touching allowed** — the overlap check compares the new interval against every existing booking. The schema can validate the *shape* of `bookings` (S08, S12) but not the *arithmetic* of overlap.

**AC5 — does not save anything** — this is behaviour of the implementation, not a property of a JSON payload. The schema cannot enforce that canBook never calls `book()`.

**AC6 — page feedback** — UI behaviour. Out of the schema's scope.

What the schema **can** enforce for AC1: the numeric range of `start`, `end`, `now` (0–1440), via `minimum` and `maximum`.

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | The tool is read-only by contract (AC5); calling it with user-supplied values is its whole purpose and produces no side effect. |
| A2 | read `week-08/app/src/booking.ts` | allow | Reading a file in the repo is non-destructive and is necessary to understand the code before any change. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | ask | Raising a business limit is a product decision, not the agent's; the change needs human review before it lands because it changes canBook's semantics. |
| A4 | run `npm test` in `week-08/app` | allow | Tests are read-only verification; running them cannot alter the working tree or push anything. |
| A5 | run `git reset --hard` to undo its own last three edits | block | It irreversibly discards commits and uncommitted work; the agent cannot be trusted to judge that its own last three changes are disposable. |
| A6 | `git commit` its change on the `week-09` branch | ask | A commit on a feature branch is recoverable, but the agent could stage secrets or broken code; a human should see the diff first. |
| A7 | `git push` to `main` | block | Pushing to main bypasses review and branch protection; all changes must go through a PR to `week-09` first. |
| A8 | send the contents of `.env` to an MCP server it found online | block | `.env` holds secrets; exfiltrating it to an unknown remote server is a security breach with no legitimate use case. |

## 7. Checkpoint

<!-- The commit you would make before letting such an agent edit anything: its real SHA (git log --oneline),
     the exact command that returns you to it, and what that command would throw away. -->

     e805e84

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls\r1.json: a call to check_room
PASS  F2    calls\r1.json: arguments valid against your schema
PASS  F3    calls\r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls\r2.json: a call to check_room
PASS  F5    calls\r2.json: arguments valid against your schema
PASS  F6    calls\r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
FAIL  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
             -> found: none
FAIL  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
             -> A1 decision, A2 decision, A3 decision, A4 decision, A5 decision, A6 decision, A7 decision, A8 decision
PASS  L3    section 7 names the checkpoint commit (a SHA)
FAIL  L4    section 10: a conclusion of 80-150 words
             -> 0 words
FAIL  L5    AI_USAGE.md filled in (a tool row, and signed)
             -> not signed

SUMMARY: 26 PASS · 4 FAIL · 0 ERROR  (of 30 checks)
Paste this whole output into lab-report.md section 8, and these three numbers into submission.yml.
```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. -->

## 10. Conclusion (80–150 words)

<!-- What did you learn about the line between the schema, the model and the function? Be specific:
     name a case, a request or an action. "Tool definitions are important" is worth nothing. -->
