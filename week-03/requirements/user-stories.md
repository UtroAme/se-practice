# User stories — Smart Campus study room booking

6 to 8 stories. Keep the shape exactly: ID, the As/I want/so that sentence, a priority, one
assumption. Roles are **Student** or **Administrator** only.

---

# User Stories

### US-01
**Story:** As a Student, I want to see which study rooms are free and during which time slots, so that I can choose a room that fits my study schedule without trial and error.
**Priority:** High
**Assumption:** Availability data reflects current real-time bookings and blocked rooms.

### US-02
**Story:** As a Student, I want to reserve a free room for a specific future time slot, so that I have a guaranteed place to study alone or with my group.
**Priority:** High
**Assumption:** A booking lasts at most exactly 2 hours, and a booking ending exactly when another begins is NOT an overlap.

### US-03
**Story:** As a Student, I want to cancel a reservation I made, so that the room is released for others when my plans change.
**Priority:** High
**Assumption:** A student can only cancel their own active future bookings.

### US-04
**Story:** As an Administrator, I want to take a room out of service, so that it cannot be booked while it is unusable due to library needs.
**Priority:** High
**Assumption:** Blocking a room automatically prevents any new bookings from being made.

### US-05
**Story:** As an Administrator, I want to return a blocked room to service, so that students can book it again as soon as it is usable.
**Priority:** Medium
**Assumption:** Unblocking makes the room immediately visible in the availability view.

### US-06
**Story:** As an Administrator, I want to see how rooms have been used over a chosen period, so that I can understand demand and optimize room usage.
**Priority:** Medium
**Assumption:** Usage data is aggregated from existing booking and cancellation history.

### US-07
**Story:** As a Student or Administrator, I want the system to automatically send a confirmation when a booking is made or cancelled, so that there is immediate certainty about the action taken.
**Priority:** High
**Assumption:** Confirmations are strictly limited to the web application interface.