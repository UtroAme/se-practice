# SIS #02 — AI-Assisted UML Modeling: University Course Registration

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the checker and the word counter. Delete them or leave them.
-->

## 1. Scope and assumptions

<!-- Your FINAL scope statement and assumptions, after reviewing Prompt A's output. Say here
     what is out of scope (payments, prerequisites, timetable clashes, waiting lists,
     cancellation) — section 2 must not mention them. Section 10 keeps your first version. -->

**Scope:** The system allows a signed-in student to browse an electronic course catalog, choose one specific course offering in a semester, and request registration; it then returns either a confirmation or a clear rejection with a reason.

**Assumptions:**

1. The student is already authenticated before browsing the catalog and requesting registration, and the selected course offering already exists with a positive whole-number capacity.
2. Registration always targets one specific course offering; viewing the catalog does not reserve a place, and availability is rechecked only at registration time.
3. A student may hold enrollments in many different offerings, but at most one enrollment in the same offering.

Out of scope: payments, prerequisites, timetable clashes, waiting lists and cancellation.

## 2. User stories and acceptance criteria

<!-- Your APPROVED requirements: Prompt A's draft after your review. Keep the IDs, the three
     story headings and the bullet shape. Every criterion names the rule(s) it maps to,
     e.g. (R2, R4). Two criteria per story. Nothing out of scope.
     Format of a criterion, on one bullet:
     - **AC-03** (R2, R4): Given ..., When ..., Then ... -->

### US-01 — Browse offerings

**US-01:** As a signed-in student, I want to see the course code, title, offering, and available places for one semester, so that I can choose which offering to register for.

- **AC-01** (R1): Given a semester with at least one course offering, When the student views the catalog for that semester, Then each listed offering shows the course code, course title, the offering identifier, and the current available places.
- **AC-02** (R1, R2): Given the student has viewed an offering showing N available places, When the student has not submitted a registration request, Then no place is reserved for the student and the offering still shows N available places, because availability is rechecked only at registration.

### US-02 — Register for an offering

**US-02:** As a signed-in student, I want to request registration for a specific course offering that has a free place and where I am not already enrolled, so that I receive exactly one enrollment and a confirmation.

- **AC-03** (R2, R4): Given the selected offering has at least one available place and the student has no enrollment in it, When the student requests registration for that offering, Then exactly one Enrollment linking the student and the offering is created, the available places decrease by one, and a confirmation is returned.
- **AC-04** (R2, R4): Given an offering with capacity C already has C enrollments, When any student requests registration for that offering, Then the request is rejected and the enrollment count for that offering remains exactly C.

### US-03 — Receive a clear rejection

**US-03:** As a signed-in student, I want a registration request to be rejected with an explanation of "course full" or "already enrolled" when it cannot succeed, so that I understand the outcome and know no enrollment was created.

- **AC-05** (R2, R5): Given the selected offering has zero available places at the moment the request is rechecked and the student is not enrolled in it, When the student requests registration, Then the system rejects the request with the explanation "course full", creates no Enrollment, and leaves the enrollment count unchanged.
- **AC-06** (R3, R5): Given the student already holds one Enrollment in the selected offering and that offering still has available places, When the student requests registration for the same offering again, Then the system rejects the request with the explanation "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.

## 3. Sequence diagram

<!-- The FINAL diagram, rendered. Change .png to .svg if that is what you exported. -->

![Final sequence diagram](models/img/sequence.png)

**Participants:** (write here — each lifeline and what it stands for)

**Atomic operation:** (write here — which messages form the one atomic step: the final duplicate check, the capacity check and the creation of the Enrollment, and why a catalog view reserves nothing)

**Where the Enrollment is created:** (write here — which message, which lifeline, and which class in section 4 it produces)

**Technical lifelines:** (write here — every lifeline that is NOT a class in the class diagram, by name, and why the difference in abstraction is fine. "None" if there are none.)

## 4. Class diagram

<!-- The FINAL diagram, rendered. -->

![Final class diagram](models/img/classes.png)

<!-- One row per association in classes.puml, read in both directions. -->

| Association | Read left to right | Read right to left |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**How an Enrollment links a student to an offering:** (write here)

**Capacity constraint:** (write here — and why multiplicity alone cannot express it)

**Uniqueness constraint:** (write here — and why multiplicity alone cannot express it)

## 5. Traceability

<!-- Every rule, including the catalog fields and availability (R1). Column 1: the rule and
     the criteria that cover it, e.g. "R2 + AC-03, AC-04". Column 2: the message, guard,
     class or constraint that shows the rule in YOUR diagrams. Column 3: the T-ID that
     exercises it, or the extra check you did instead (R1 has no T case). -->

| Rule and criterion | Model evidence | Validation case |
| --- | --- | --- |
| R1 + (write here) | (write here) | (write here) |
| R2 + (write here) | (write here) | (write here) |
| R3 + (write here) | (write here) | (write here) |
| R4 + (write here) | (write here) | (write here) |
| R5 + (write here) | (write here) | (write here) |

## 6. Walkthroughs

<!-- Walk each case through YOUR final sequence diagram, message by message. Column 2: the
     actual steps and the state change (count before → after). Column 3 starts with Pass or
     Fail, then the location: the message, guard or note where you saw it. A Fail you
     report honestly is a finding, not a penalty. -->

| Case | Observed path and state change | Judgment and evidence |
| --- | --- | --- |
| T1. Available | (write here) | (write here) |
| T2. Last place | (write here) | (write here) |
| T3. Full | (write here) | (write here) |
| T4. Duplicate | (write here) | (write here) |

## 7. Review decisions

<!-- At least three substantive decisions about Prompt C's critique or your own inspection.
     Decision: accepted / rejected / modified — and what you did. Reason: why, in a full
     sentence. Rule: R1–R5. Do not invent an error to fill the table; a justified rejection
     of advice counts. -->

| AI suggestion or model element | Decision | Reason | Rule |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

## 8. Modeling explanation

<!-- 200–300 words. Your main design choices; how the class diagram and the sequence diagram
     complement each other; why an activity diagram could also help explain the workflow. -->

(write here)

## 9. Reflection

<!-- 150–200 words. Written by you, not by the assistant: where AI helped, one decision you
     made yourself, one remaining limitation. Specific beats flattering. -->

(write here)

## 10. Appendix A — Before AI

<!-- Written BEFORE you run Prompt A, committed and pushed in your first commit, and never
     edited afterwards. This is what you paste into Prompt A as "My initial assumptions". -->

**Scope:** The system allows a signed-in student to browse an electronic course catalog, choose one specific course offering in a semester, and request registration; it then returns either a confirmation or a clear rejection, and it excludes payments, prerequisites, timetable clashes, waiting lists and cancellation.

**Initial assumptions:**

1. The student is already authenticated before browsing the catalog and requesting registration, and the selected course offering already exists in the catalog with a positive whole-number capacity.
2. Registration always targets one specific course offering rather than a Course as a whole, and viewing the catalog does not reserve a place.
3. A student may hold enrollments in many different offerings, but at most one enrollment in the same offering.

## 11. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the ~~~~ block that follows its label: AI responses contain ``` PlantUML blocks, and
     ~~~~ keeps them from breaking this file. Prompts B and C: the prompt text first, then
     the material it refers to ("below", "these two") pasted under it, in the same block.
     You may add B5, B6 … after B4 if you ran more. -->

### B1 — Requirements (Prompt A)

- **Tool:** Qoder
- **Model:** Qwen3.8-Max
- **Date:** 2026-10-17
- **Purpose:** draft 3 user stories and 6 acceptance criteria

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

~~~~text
Act as a requirements analyst. Use only this course registration scenario and rules R1–R5:

A student browses an electronic course catalog, chooses a course offering and requests registration. Each offering has a limited number of places. A Course describes a subject. A CourseOffering is one scheduled section in one semester. Registration always targets a specific offering. Assume that the student is signed in, the selected offering exists, and its capacity is a positive whole number.

R1. Catalog: Show the course code, title, offering and available places for one semester.
R2. Capacity: Recheck current availability when registering. Enrollment must never exceed the offering's capacity.
R3. Duplicates: A student may have at most one enrollment in the same offering. Reject a repeat request.
R4. Success: Create exactly one Enrollment linking the student and offering, update availability and return a confirmation.
R5. Rejection: Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged.

My initial assumptions are:

1. The student is already authenticated before browsing the catalog and requesting registration, and the selected course offering already exists in the catalog with a positive whole-number capacity.
2. Registration always targets one specific course offering rather than a Course as a whole, and viewing the catalog does not reserve a place.
3. A student may hold enrollments in many different offerings, but at most one enrollment in the same offering.

Draft 3 user stories and 2 Given / When / Then acceptance criteria for each. Use IDs US-01 to US-03 and AC-01 to AC-06. Map each criterion to rule IDs.
Cover normal and rejection behavior. List uncertainty separately. Do not add excluded features or invent university policies.
~~~~

**Response:**

~~~~text
User Stories

US-01 — Browse the course catalog
As a signed-in student, I want to see the course code, title, offering, and available places for one semester, so that I can choose which offering to register for. (Rules: R1)

US-02 — Register for an offering with a free place
As a signed-in student, I want to request registration for a specific course offering that has a free place and where I am not already enrolled, so that I receive exactly one enrollment and a confirmation. (Rules: R2, R4)

US-03 — Receive a clear rejection when registration cannot succeed
As a signed-in student, I want a registration request to be rejected with an explanation of "course full" or "already enrolled" when it cannot succeed, so that I understand the outcome and know no enrollment was created. (Rules: R2, R3, R5)

Acceptance Criteria

AC-01 (US-01, normal) — Rules: R1
Given a semester with at least one course offering,
When the student views the catalog for that semester,
Then each listed offering shows the course code, course title, the offering identifier, and the current available places.

AC-02 (US-01, boundary of browsing) — Rules: R1, R2
Given the student has viewed an offering showing N available places,
When the student has not submitted a registration request,
Then no place is reserved for the student and the offering still shows N available places (availability shown at browse time is informational; it is rechecked only at registration).

AC-03 (US-02, normal) — Rules: R2, R4
Given the selected offering has at least one available place and the student has no enrollment in it,
When the student requests registration for that offering,
Then exactly one Enrollment linking the student and the offering is created, the available places decrease by one, and a confirmation is returned.

AC-04 (US-02, capacity limit) — Rules: R2, R4
Given an offering with capacity C already has C enrollments,
When any student requests registration for that offering,
Then the request is rejected and the enrollment count for that offering remains exactly C (enrollment must never exceed capacity).

AC-05 (US-03, rejection — course full) — Rules: R2, R5
Given the selected offering has zero available places at the moment the request is rechecked and the student is not enrolled in it,
When the student requests registration,
Then the system rejects the request with the explanation "course full", creates no Enrollment, and leaves the enrollment count unchanged.

AC-06 (US-03, rejection — already enrolled) — Rules: R3, R5
Given the student already holds one Enrollment in the selected offering and that offering still has available places,
When the student requests registration for the same offering again,
Then the system rejects the request with the explanation "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.

Uncertainties (not resolved by R1–R5 or the assumptions — flagged, not invented)

Concurrent requests for the last place (R2): If two students request the final place simultaneously, the rules state availability must be rechecked and capacity never exceeded, but do not specify how simultaneous rechecks are serialized. AC-04 covers the outcome (at most C enrollments), not the mechanism.
Both rejection conditions true at once (R3, R5): If a student already enrolled in a now-full offering repeats the request, the rules do not state which explanation takes precedence.
Definition of "available places" in R1: Whether it is always derived as capacity minus current enrollments, or a separately maintained figure, is not specified; AC-01/AC-02 assume it reflects current enrollments.
Empty catalog (R1): Display behavior for a semester with no offerings is not specified.
Re-registration after a hypothetical enrollment removal: R3 caps a student at one enrollment per offering, but the rules do not cover whether a removed/ended enrollment frees the student to register again. No behavior is assumed here since dropping/canceling is outside the given rules.

Scope note: per the assumptions, authentication, offering existence, and capacity validity are preconditions, not tested behaviors; waitlists, dropping, scheduling conflicts, and approvals are excluded and not addressed.
~~~~

### B2 — UML drafts (Prompt B)

- **Tool:** Qoder
- **Model:** Qwen3.8-Max
- **Date:** 2026-10-17
- **Purpose:** draft the sequence and class diagrams

**Prompt:**

~~~~text
Using my approved scenario, R1–R5, stories and criteria below, return separate PlantUML code blocks for a sequence diagram and a domain class diagram.
Sequence: include catalog browsing and guarded success, full-course and duplicate outcomes. Model final checks and creation as one atomic operation.
Class: show domain concepts, useful attributes and multiplicities. State the capacity and uniqueness constraints. Explain assumptions and any technical lifelines.

---

Scenario and rules R1–R5:

A student browses an electronic course catalog, chooses a course offering and requests registration. Each offering has a limited number of places. A Course describes a subject. A CourseOffering is one scheduled section in one semester. Registration always targets a specific offering. Assume that the student is signed in, the selected offering exists, and its capacity is a positive whole number.

R1. Catalog: Show the course code, title, offering and available places for one semester.
R2. Capacity: Recheck current availability when registering. Enrollment must never exceed the offering's capacity.
R3. Duplicates: A student may have at most one enrollment in the same offering. Reject a repeat request.
R4. Success: Create exactly one Enrollment linking the student and offering, update availability and return a confirmation.
R5. Rejection: Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged.

A catalog view does not reserve a place. Model the final checks and enrollment creation as one atomic operation, so competing requests cannot take the same last place.

---

Approved user stories and acceptance criteria:

### US-01 — Browse offerings

**US-01:** As a signed-in student, I want to see the course code, title, offering, and available places for one semester, so that I can choose which offering to register for.

- **AC-01** (R1): Given a semester with at least one course offering, When the student views the catalog for that semester, Then each listed offering shows the course code, course title, the offering identifier, and the current available places.
- **AC-02** (R1, R2): Given the student has viewed an offering showing N available places, When the student has not submitted a registration request, Then no place is reserved for the student and the offering still shows N available places, because availability is rechecked only at registration.

### US-02 — Register for an offering

**US-02:** As a signed-in student, I want to request registration for a specific course offering that has a free place and where I am not already enrolled, so that I receive exactly one enrollment and a confirmation.

- **AC-03** (R2, R4): Given the selected offering has at least one available place and the student has no enrollment in it, When the student requests registration for that offering, Then exactly one Enrollment linking the student and the offering is created, the available places decrease by one, and a confirmation is returned.
- **AC-04** (R2, R4): Given an offering with capacity C already has C enrollments, When any student requests registration for that offering, Then the request is rejected and the enrollment count for that offering remains exactly C.

### US-03 — Receive a clear rejection

**US-03:** As a signed-in student, I want a registration request to be rejected with an explanation of "course full" or "already enrolled" when it cannot succeed, so that I understand the outcome and know no enrollment was created.

- **AC-05** (R2, R5): Given the selected offering has zero available places at the moment the request is rechecked and the student is not enrolled in it, When the student requests registration, Then the system rejects the request with the explanation "course full", creates no Enrollment, and leaves the enrollment count unchanged.
- **AC-06** (R3, R5): Given the student already holds one Enrollment in the selected offering and that offering still has available places, When the student requests registration for the same offering again, Then the system rejects the request with the explanation "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.
~~~~

**Response:**

~~~~text
Both diagrams below are derived directly from your scenario, R1–R5, and AC-01…AC-06.

Sequence Diagram

@startuml
title Course Registration — browse, guarded success, full and duplicate outcomes
autonumber

actor Student as S
participant "Catalog View" as UI >
participant "Registration Service" as RS >
entity "CourseOffering" as CO
entity "Enrollment" as EN

== US-01: Browse offerings (R1, AC-01) ==
S -> UI : view catalog(semester)
activate UI
UI -> CO : query offerings(semester)
activate CO
CO --> UI : offerings with courseCode, title,\nofferingId, availablePlaces
deactivate CO
UI --> S : catalog listing
deactivate UI
note over S, CO
  AC-02 (R2): browsing reserves nothing.
  availablePlaces is unchanged and is
  rechecked only at registration time.
end note

== US-02 / US-03: Request registration (R2–R5) ==
S -> RS : register(student, offering)
activate RS
RS -> CO : checkAndEnroll(student)  «one transaction»
activate CO

critical Final checks and creation are atomic (last place cannot be double-taken)
  alt student already has an Enrollment in this offering (R3, AC-06)
    CO --> RS : REJECTED("already enrolled")
    RS --> S : rejection "already enrolled"\nno Enrollment created, count unchanged (R5)
  else availablePlaces == 0 (R2, AC-04, AC-05)
    CO --> RS : REJECTED("course full")
    RS --> S : rejection "course full"\nno Enrollment created, count unchanged (R5)
  else place free and not enrolled (R4, AC-03)
    CO -> EN : create Enrollment(student, offering)
    activate EN
    EN --> CO : enrollment
    deactivate EN
    CO -> CO : availablePlaces := availablePlaces - 1
    CO --> RS : CONFIRMED(enrollment)
    RS --> S : confirmation with enrollment details (R4)
  end
end

deactivate CO
deactivate RS
@enduml

Domain Class Diagram

@startuml
title Domain class diagram — course registration

class Student {
  studentId : ID
  name : String
}

class Course {
  courseCode : String
  title : String
}

class Semester {
  term : String
  year : Integer
}

class CourseOffering {
  offeringId : ID
  capacity : Integer
  availablePlaces() : Integer «derived»
}

class Enrollment {
  enrollmentId : ID
  enrolledAt : Timestamp
}

Course "1" -- "0.." CourseOffering : describes >
Semester "1" -- "0.." CourseOffering : scheduled in >
Student "1" -- "0.." Enrollment : holds >
CourseOffering "1" -- "0.." Enrollment : fills places of >

note bottom of CourseOffering
  Capacity constraint (R2):
  capacity is a positive whole number (> 0);
  enrollments.size() = 0.
end note

note bottom of Enrollment
  Uniqueness constraint (R3):
  at most one Enrollment per
  (Student, CourseOffering) pair —
  a repeat request is rejected.
  Enrollment is the only association
  between Student and CourseOffering.
end note
@enduml

Assumptions and technical lifelines

Assumptions taken from the scenario
The student is already authenticated, so no login lifeline or guard appears.
The selected offering exists and capacity is a positive whole number, so no "offering not found" or invalid-capacity branches are modeled; the only rejection paths are the two R5 outcomes.
availablePlaces is modeled as derived from capacity − enrollments.count, so R2/R4 ("update availability") and R5 ("count unchanged") are two views of the same invariant rather than an independently stored counter.
Duplicate check is evaluated before the capacity check; AC-06 assumes places are free, and this order gives a precise explanation ("already enrolled") even in edge cases where both would apply.
Semester is modeled as a domain class since R1 scopes the catalog to one semester; it could equally be an attribute of CourseOffering if no semester behavior is ever needed.
Confirmation content is not specified beyond "a confirmation," so it carries the created enrollment's details.

Technical (non-domain) lifelines
Catalog View — a UI/boundary artifact that renders the R1 listing (code, title, offering, places). It is not a domain concept and holds no state; per AC-02 it reserves nothing.
Registration Service — an application-layer service that receives the request and opens the transaction. The domain logic (checks, creation, decrement) lives in CourseOffering/Enrollment.
The critical fragment represents the single atomic transaction (e.g., database transaction with a row lock or serializable isolation) that guarantees competing requests cannot take the same last place. This is an implementation mechanism, not a domain rule, so it is shown only in the sequence diagram.
~~~~

### B3 — Model critique (Prompt C)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** review both models against R1–R5 and T1–T4

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4 — Focused revision (Prompt D)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** apply my accepted review decisions

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix C — Original diagrams

<!-- The AI's first output from Prompt B, rendered unedited from models/original/. -->

![Original sequence diagram](models/img/original-sequence.png)

![Original class diagram](models/img/original-classes.png)

## 13. Appendix D — References and source checks

### References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the source checks must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 5. -->

- (write here)

### Source checks

<!-- At least two modeling decisions you verified. Source and locator: title + slide, page,
     section, chapter or figure — or title + URL + access date (YYYY-MM-DD). Slide numbers
     refer to the decks posted in our Teams. -->

| Modeling decision | Source and locator | What the source says | How it supports or changed your model |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
