# Acceptance criteria — three selected stories

Assumptions first, then the criteria. Each block names the story it belongs to. 3 to 5 criteria per
story, every one in Given / When / Then form, and every set covers a validation or error case — not
three happy paths.

---

## Assumptions

These must settle the two questions the scenario leaves open. Either answer is accepted; no answer
is not.

- **Overlap:** a booking that ends exactly when another begins is allowed under R3, because rooms should not sit empty between slots.
- **Duration:** a booking of exactly two hours is allowed under R2, because the rule says "at most two hours" which includes exactly 120 minutes.
- **Authentication:** All authentication, user registration, and role-checking mechanics are strictly out of scope.

---

## US-01 — View Room Availability

### AC-01
- **Given** the system has free, occupied, and blocked rooms for a selected future date
- **When** availability is requested for that date
- **Then** the system returns the status of all slots, correctly separating free periods from occupied or blocked periods.

### AC-02
- **Given** Room A is booked from 12:00 to 14:00
- **When** a student requests availability for the same date
- **Then** the slot 14:00 to 16:00 is displayed as free and bookable.

### AC-03
- **Given** Room B has been taken out of service for the entire day
- **When** a student views availability for that date
- **Then** Room B is displayed as unavailable all day.

---

## US-02 — Book a Study Room

### AC-04
- **Given** a room is free for a requested future slot lasting exactly 2 hours (e.g., 14:00 to 16:00)
- **When** the booking is submitted
- **Then** the system successfully registers the reservation and marks those slots as occupied.

### AC-05
- **Given** a student attempts to reserve a slot whose start time is in the past
- **When** the booking is submitted
- **Then** the system rejects the request and no reservation is created.

### AC-06
- **Given** a student attempts to reserve a slot longer than 2 hours (e.g., 10:00 to 13:00)
- **When** the booking is submitted
- **Then** the system rejects the request due to the 2-hour business limit (R2).

### AC-07
- **Given** a room is currently blocked by an administrator
- **When** a booking is submitted for that room during the blocked period
- **Then** the system rejects the request and no reservation is created (R4).

---

## US-04 — Block Room from Service

### AC-08
- **Given** a room has no student bookings for a requested future time period
- **When** an administrator blocks the room for that period
- **Then** the system marks the room as out of service, preventing any future bookings during those slots.

### AC-09
- **Given** a room has an active student booking from 15:00 to 17:00
- **When** an administrator attempts to block the room from 14:00 to 18:00
- **Then** the system rejects the block request due to the scheduling overlap.

### AC-10
- **Given** a room is already blocked for a specific afternoon period
- **When** an administrator attempts to block the same room for that exact same period again
- **Then** the system rejects the duplicate block action with an error.
