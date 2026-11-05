export type Interval = { start: number; end: number };

export interface BookingRequest {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: Interval[];
}

export function canBook({ start, end, now, blocked, bookings }: BookingRequest): boolean {
  // AC1: 0 <= start < end <= 1440 and start > now
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  // AC2: duration must not exceed 120 minutes
  if (end - start > 120) return false;
  // AC3: blocked room is unavailable
  if (blocked) return false;
  // AC4: touching endpoints allowed; overlap rejected
  for (const b of bookings) {
    if (start < b.end && end > b.start) return false;
  }
  return true;
}