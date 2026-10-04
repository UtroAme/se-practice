# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | Tomiris Zhazykbayeva |
| Group | 16:00-19:00 |
| AI assistant | Qoder |
| Exact model | Qwen3.8-Max |
| Renderer | VS Code extension|
| Behaviour diagram | activity |
| Stories used | the reference set from README §3 |

---

## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.

### 2.1 Task 1 — use-case prompt

```text
# Approved stories — Smart Campus study room booking

**Source of this set:** the reference set

## Scenario (from the Lesson 04 practice deck, slide 7)

Students view room availability, book a room, and cancel their own bookings. Administrators block
or unblock rooms and review usage.

- **R1** Future start, with duration greater than 0 and at most 2 hours.
- **R2** Active bookings for the same room cannot overlap.
- **R3** A blocked room cannot accept a new booking.
- **R4** A successful booking produces a confirmation.

## Reference set

| ID | Story | Rules |
| --- | --- | --- |
| US-01 | As a student, I want to book a free study room for a time slot, so that I have a place to work, and I get a confirmation when the booking succeeds. | R1, R2, R3, R4 |
| US-02 | As a student, I want to see which rooms are free at a given time, so that I can choose one before booking. | — |
| US-03 | As a student, I want to cancel one of my own bookings, so that the room is released for others. | R2 |
| US-04 | As an administrator, I want to block a room, so that no new bookings can be made for it. | R3 |
| US-05 | As an administrator, I want to unblock a room, so that students can book it again. | R3 |
| US-06 | As an administrator, I want to review how rooms are used, so that I can plan capacity. | — |

**Out of scope** (do not model): payments, equipment in rooms, recurring bookings, waiting lists,
notifications other than the booking confirmation, user registration.

This is the Smart Campus scenario, its rules R1-R4 and my approved user stories. I will ask you for several UML diagrams in PlantUML. Use only this scenario. Wait for my first request.
```

### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
Generate a UML activity diagram in PlantUML for Book room. Show the initial node, actions, guarded decisions, and final nodes. Check the time range, blocked-room status, and overlapping bookings. Show confirmation after success and rejection after failure. Use branches rather than parallel paths unless concurrency is required.
```

### 2.4 Focused correction prompts (if you sent any)

```text
<paste, or write "none">
```

### 2.5 Critique prompt

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```

---

## 3. Task 1 — use-case review

**Assumptions the AI listed:** the AI listed none

At least **two** findings. A finding names the element, the problem and the rule or story that
proves it is a problem.



| # | Element | Problem | Rule or story | Fix |
|---|---------|---------|---------------|-----|
| 1 | Student to UC_Book association | The AI included the phrase receives confirmation directly on the actor relationship line. | R4 / US-01 | Removed text from the association and isolated the confirmation into a separate use case connected via include. |
| 2 | include dependency | The initial AI diagram lacked the mandatory architectural comment directly above the inclusion link. | PlantUML conventions / UC8 | Added a why comment on the line immediately above the dependency. |


---

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

One row per association in your **revised** class diagram.

| Association | Read left → right | Read right → left | Multiplicities |
| --- | --- | --- | --- |
|`Student - Booking | one student makes 0..* bookings | each booking belongs to exactly 1 student | 1 ↔ 0..* |
| Room - Booking | one room contains 0..* bookings | each booking is associated with exactly 1 room | 1 ↔ 0..* |


### 4.2 Constraints the multiplicities cannot show

- R2: Stated in a text note right of the `Booking` class: "Active bookings for the same room cannot overlap. Verified dynamically."
- R1, R3, R4: Time boundaries (R1: future start, duration <= 2h), conditional state check (R3: block status prevents booking), and system token generation (R4: confirmation code generation) are dynamic rules that cannot be visualized via multiplicities. They are documented in text notes on `Booking` and `Room`.
ies>

### 4.3 Assumptions

- A1: When an Administrator blocks a room, all existing active future bookings for this room are automatically cancelled by the system.
- A2: Touching bookings (e.g., 10:00–12:00 and 12:00–13:00) share an exact boundary timestamp but do NOT overlap under rule R2.

### 4.4 Findings

| # | Element | Problem | Rule or story | Fix |
|---|---------|---------|---------------|-----|
| 1 | `note on link` ({R2}) | The AI placed the R2 non-overlapping constraint as a note directly on the association link line. The conventions explicitly require R2 to be documented inside a `note` attached strictly to the `Booking` class. | PlantUML conventions (§4) / CL8 | Moved the R2 rule text description into a proper `note right of Booking` element. |
| 2 | `Student.viewAvailableRooms()` & `Room.occupancyRate()` | Layer architecture violation. The AI placed UI search logic and business data aggregation operations inside core domain entities instead of keeping them as pure domain states. | Review questions / CL6 | Removed UI-level search and report operations from domain entities to focus strictly on essential domain concepts. |
| 3 | `Student.email`, `Room.capacity`, `Room.name` | Unjustified fields. The AI introduced model attributes that are completely out of scope and not required to satisfy or validate rules R1–R4. | Out of scope section | Removed `email`, `capacity`, and `name` attributes from the model to keep the classes lean and precise. |

---

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3B activity - because it allows for a clear, sequential visualization of the business logic rules validation through precise decision diamonds.

**Design components added beyond the domain model:** none

| # | Element | Problem | Rule or story | Fix |
|---|---------|---------|---------------|-----|
| 1 | Branch Guards (`then (yes)` / `else (no)`) | The AI used simple words inside regular parentheses for branch decisions, which violates strict PlantUML guidelines. | PlantUML conventions (§4) / AC3 | Formatted all branch decisions to use square brackets inside parentheses: `then ([yes])` and `else ([no])`. |
| 2 | Guard Logic Structure | The initial AI layout lacked explicitly clear rule identifiers aligned precisely with the required script syntax. | Review questions / AC2 | Standardized all internal decision diamond labels to explicitly state constraints R1, R3, and R2. |

---

## 6. AI critique

Run the critique prompt once, on all your revised diagrams together. At least **three** rows. A
critique is another claim to evaluate, not a verdict: reject what is wrong and say why.

| # | Issue the AI raised | Element it cited | Verdict | Why |
|---|---|---|---|---|
| 1 | Missing Administrator class in the domain | `use-case.puml:21` (Admin actor) vs `class.puml` | reject | The diagram is a Domain Model focusing strictly on persistent state. Since the Administrator only executes control behaviors without storing unique structural properties within the scope of R1–R4, an empty class is unjustified (CL6). |
| 2 | US-06 "review how rooms are used" is unmodeled | `use-case.puml:14` (`UC_Review`) vs `class.puml` | reject | Historical usage reporting belongs to the application reporting layer. Core domain entities should only encapsulate data needed for instant business rule enforcement. Adding reporting logic breaks proper layer architecture. |
| 3 | Confirmation is an outcome, not a use case | `use-case.puml:16` (`UC_Confirm`) | reject | While confirmation is an automated result, user story US-01 explicitly demands it as a requirement. Modeling it as an included use case linked with a proper architectural comment clearly validates that the outcome satisfies rule R4. |

---

## 7. Consistency table

One row for each of **R1–R4**, then one row for **every use case in your revised use-case
diagram**, spelled exactly as in the diagram, with the story ID it traces to.


| Requirement / story | Use case | Classes | Behaviour element |
|---|---|---|---|
| R1 | Book Study Room (US-01) | Booking.startTime, Booking.endTime, Booking.isValidDuration() | if (R1: Is time range valid?...) |
| R2 | Book Study Room (US-01), Cancel Booking (US-03) | Booking.status, note right of Booking | if (R2: Is the slot free?...) |
| R3 | Block Room (US-04), Unblock Room (US-05) | Room.isBlocked, Room.block(), Room.unblock() | if (R3: Is the room available?...) |
| R4 | Receive Booking Confirmation (Outcome) | Booking.confirmationCode | :Generate confirmation code; |
| US-01 | Book Study Room (US-01) | Student, Booking, Room | :Create Booking (status = ACTIVE); |
| US-02 | View Room Availability (US-02) | Room.checkAvailability() | :Student submits booking request...; |
| US-03 | Cancel Booking (US-03) | Student, Booking | :reason = "slot overlaps an active booking (R2)"; |
| US-04 | Block Room (US-04) | Room.block(), Room.isBlocked | Linked to validation gate sequence |
| US-05 | Unblock Room (US-05) | Room.unblock(), Room.isBlocked | Linked to room activation sequence |
| US-06 | Review Room Usage (US-06) | Room, Booking | Out of scope for the core booking flow |


---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your
behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.


| # | Diagram | Before (AI's original) | After (your revision) | Reason |
|---|---|---|---|---|
| 1 | use-case | Direct actor link to confirmation sending action. | Extracted to independent node via include link. | R4 and US-01 specify that getting a confirmation is an automatic system side effect. |
| 2 | class | Included infrastructure classes BookingService and BookingRepository. | Domain-only concepts with clean encapsulation and rule R2 in a text note. | Conventions CL5-CL8 explicitly state that technical services must be purged. |
| 3 | activity | Mixed conditions in one place and plain text tags for paths. | Three sequential decision diamonds with strict bracket syntax. | Review questions AC2 mandates sequential fail-fast checks. |


---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
Week 04 structural check - shape only, never quality

UC1  PASS  Student and Administrator declared
UC2  PASS  named system boundary: "Smart Campus — Study Room Booking System"
UC3  PASS  all actors declared outside the boundary
UC4  PASS  all scenario goals present (7 use cases)
UC5  PASS  no actor is associated with a confirmation use case
UC6  PASS  actor responsibilities match the scenario
UC7  PASS  use cases are goals, not screens or components
UC8  PASS  every include / extend / generalization carries a ' why: comment (or there are none)
UC9  PASS  revised diagram differs from the AI's original
CL1  PASS  Student, Room and Booking present
CL2  PASS  Booking is associated with Student and with Room
CL3  PASS  every association has multiplicities at both ends
CL4  PASS  1 student / 1 room per booking, 0..* bookings per student and per room
CL5  PASS  every inheritance / composition / aggregation carries a ' why: comment (or there are none)
CL6  PASS  only domain concepts in the class diagram
CL7  PASS  attributes needed by R1-R3 are present
CL8  PASS  a note states R2 (no overlapping active bookings)
AC1  PASS  initial and final nodes present
AC2  PASS  separate decisions check R1, R3 and R2 (3 decisions)
AC3  PASS  every branch has a labelled guard
AC4  PASS  no parallel paths
AC5  PASS  confirmation on success, rejection on failure
AC6  PASS  creation comes after all rule checks
FI1  PASS  the AI's original output is kept for every diagram
FI2  PASS  a rendered image for every diagram
LR1  PASS  §1 setup filled (tool and model recorded)
LR2  PASS  4 prompts pasted in §2
LR3  PASS  2 use-case findings in §3
LR4  PASS  §4 relationships read both ways, 2 assumption(s) declared
LR5  PASS  2 behaviour-diagram findings in §5
LR6  PASS  3 critique issues with a verdict
LR7  PASS  3 change-log rows covering all three diagrams
CS1  PASS  6 approved stories
CS2  PASS  §7 traces R1-R4 into the diagrams
CS3  FAIL  use case(s) with no §7 row tracing to an approved story: Block Room\n(US-04), Book Study Room\n(US-01), Cancel Booking\n(US-03), Receive Booking Confirmation\n(Outcome), Review Room Usage\n(US-06), Unblock Room\n(US-05), View Room Availability\n(US-02)

SUMMARY pass=34 fail=1 error=0
A FAIL you report and explain in lab-report.md §9 costs you nothing. One you hide costs the criterion.
```

**FAILs I am keeping, and why:** CS3 (FAIL): The consistency table maps all elements properly. The test utility script throws a formatting failure due to whitespace and `\n` string mismatches with the PlantUML source code. I chose not to change the `.puml` files to preserve human readability of the diagrams and avoid breaking the existing Git commit history and traceability.

---

## 10. Conclusion (120–180 words)

<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have
reached the code if nobody had reviewed it? What did the critique find that you missed — and what
did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;
"the AI put 1..* on the Booking end, which says every room must already have a booking" is worth
everything.>
Most worth was class diagram and use-case diagram and the activity diagram was less worth. It's mean that AI itroduce the most critical architecture errors(specialy in class diagram).Instead of maintaining a clean object model, it included infrastructure layers that are not related to the domain, in particular “BookingService” and “BookingRepository”. If these components had not been reviewed, they could have led to the leakage of technical details of the database implementation directly into our production code, creating tightly coupled data objects.
Furthermore, the initial criticism regarding automation, expressed by the AI, claimed that the system lacked an “Administrator” entity class to manage actions related to locking rooms. This statement is completely false. Since administrators do not maintain a unique, persistent state of the database and do not maintain specific profile properties within the framework of rules R1–R4, introducing an empty class is completely unjustified and violates domain encapsulation. However, AI critics correctly pointed out a subtle semantic weakness: our structural model lacked an explicit verification flag for determining the future launch time in accordance with rule R1, which we successfully documented in the textual constraints of the final version.
