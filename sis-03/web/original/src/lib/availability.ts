export const DAY_MINUTES = 1440;
export const NOW_MINUTES = 540;
export const MAX_DURATION_MINUTES = 120;

export interface Booking {
  id: string;
  title: string;
  start: number;
  end: number;
}

export const EXISTING_BOOKINGS: readonly Booking[] = [
  { id: 'stand-up', title: 'Team stand-up', start: 600, end: 660 },
  { id: 'client-call', title: 'Client call', start: 700, end: 760 },
];

export interface FieldErrors {
  start?: string;
  end?: string;
}

export type CheckOutcome =
  | { kind: 'invalid'; errors: FieldErrors }
  | { kind: 'blocked'; start: number; end: number }
  | { kind: 'overlap'; start: number; end: number; conflict: Booking }
  | { kind: 'available'; start: number; end: number };

const WHOLE_NUMBER = /^-?\d+$/;

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function parseMinutes(raw: string): number | null {
  const trimmed = raw.trim();
  return WHOLE_NUMBER.test(trimmed) ? Number(trimmed) : null;
}

export function checkRoomRequest(
  startRaw: string,
  endRaw: string,
  blocked: boolean,
  bookings: readonly Booking[] = EXISTING_BOOKINGS,
): CheckOutcome {
  const errors: FieldErrors = {};
  const start = parseMinutes(startRaw);
  const end = parseMinutes(endRaw);

  if (startRaw.trim() === '') {
    errors.start = 'Enter a start time in minutes.';
  } else if (start === null) {
    errors.start = 'Use whole minutes only, such as 600.';
  } else if (start < 0 || start > DAY_MINUTES) {
    errors.start = `Start must be between 0 and ${DAY_MINUTES}.`;
  } else if (start <= NOW_MINUTES) {
    errors.start = `Start must be after the current time, ${formatMinutes(NOW_MINUTES)} (minute ${NOW_MINUTES}).`;
  }

  if (endRaw.trim() === '') {
    errors.end = 'Enter an end time in minutes.';
  } else if (end === null) {
    errors.end = 'Use whole minutes only, such as 660.';
  } else if (end < 0 || end > DAY_MINUTES) {
    errors.end = `End must be between 0 and ${DAY_MINUTES}.`;
  } else if (start !== null && !errors.start && end <= start) {
    errors.end = 'End must be later than start.';
  } else if (start !== null && !errors.start && end - start > MAX_DURATION_MINUTES) {
    errors.end = `A booking can be at most ${MAX_DURATION_MINUTES} minutes. This window is ${end - start} minutes.`;
  }

  if (Object.keys(errors).length > 0 || start === null || end === null) {
    return { kind: 'invalid', errors };
  }

  if (blocked) {
    return { kind: 'blocked', start, end };
  }

  const conflict = bookings.find((booking) => start < booking.end && booking.start < end);
  if (conflict) {
    return { kind: 'overlap', start, end, conflict };
  }

  return { kind: 'available', start, end };
}
