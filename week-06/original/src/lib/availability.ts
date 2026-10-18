// Minutes-of-day helpers for a single campus day (0:00 = 0, 24:00 = 1440).
// All sample data is fictional.

export const DAY_END = 1440;
export const MAX_DURATION = 120;

export interface Booking {
  id: string;
  start: number; // minutes-of-day, inclusive
  end: number; // minutes-of-day, exclusive
  title: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  bookings: Booking[];
}

export interface RoomOption {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  formatted: string;
}

export interface AvailabilityResult {
  decision: "available" | "unavailable";
  reason: string | null;
}

export const rooms: Room[] = [
  {
    id: "a-101",
    name: "A-101",
    building: "Science Hall",
    capacity: 40,
    blocked: false,
    bookings: [
      { id: "a-101-b1", start: 540, end: 600, title: "Physics 201 lecture" },
      { id: "a-101-b2", start: 780, end: 900, title: "Chemistry lab session" },
    ],
  },
  {
    id: "a-204",
    name: "A-204",
    building: "Science Hall",
    capacity: 24,
    blocked: false,
    bookings: [{ id: "a-204-b1", start: 600, end: 660, title: "Math tutoring" }],
  },
  {
    id: "b-115",
    name: "B-115",
    building: "Library Annex",
    capacity: 60,
    blocked: true,
    bookings: [],
  },
  {
    id: "c-310",
    name: "C-310",
    building: "Engineering Wing",
    capacity: 18,
    blocked: false,
    bookings: [
      { id: "c-310-b1", start: 480, end: 540, title: "Robotics club" },
      { id: "c-310-b2", start: 600, end: 720, title: "Capstone team standup" },
      { id: "c-310-b3", start: 900, end: 1020, title: "Software engineering seminar" },
    ],
  },
  {
    id: "d-002",
    name: "D-002",
    building: "Student Center",
    capacity: 100,
    blocked: false,
    bookings: [],
  },
];

export const roomOptions: RoomOption[] = rooms.map((room) => ({
  id: room.id,
  name: room.name,
  building: room.building,
  capacity: room.capacity,
  blocked: room.blocked,
  formatted: `${room.name} — ${room.building} (seats ${room.capacity})${room.blocked ? " · blocked today" : ""}`,
}));

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const suffix = h < 12 ? "AM" : "PM";
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/**
 * Validates a candidate booking against the room's schedule.
 * The room's data is never mutated — read-only checks only.
 */
export function checkAvailability(
  room: Room,
  start: number | null,
  end: number | null,
  currentTime: number,
): AvailabilityResult {
  if (start === null || end === null) {
    return { decision: "unavailable", reason: "Enter both a start time and an end time." };
  }
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return { decision: "unavailable", reason: "Times must be valid numbers." };
  }
  if (start < 0 || end < 0 || end > DAY_END) {
    return { decision: "unavailable", reason: "Times must be within the day (12:00 AM to 12:00 AM next day)." };
  }
  if (start >= end) {
    return { decision: "unavailable", reason: "Start time must be earlier than end time." };
  }
  if (start <= currentTime) {
    return {
      decision: "unavailable",
      reason: `Start time must be after the current time (${formatMinutes(currentTime)}).`,
    };
  }
  if (end - start > MAX_DURATION) {
    return { decision: "unavailable", reason: "Bookings are limited to 120 minutes or less." };
  }
  if (room.blocked) {
    return { decision: "unavailable", reason: `${room.name} is blocked and cannot be booked.` };
  }
  const conflict = room.bookings.find((b) => start < b.end && end > b.start);
  if (conflict) {
    return {
      decision: "unavailable",
      reason: `Overlaps an existing booking: ${conflict.title} (${formatMinutes(conflict.start)}–${formatMinutes(conflict.end)}).`,
    };
  }
  return { decision: "available", reason: null };
}
