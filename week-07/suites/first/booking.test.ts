import { describe, expect, it } from 'vitest';
import { canBook } from './booking';
import type { BookingRequest, Interval } from './booking';

const NOW = 540;

// Fresh fixtures per test: no object or array is ever shared between cases.
function booking(start: number, end: number): Interval {
  return { start, end };
}

function request(overrides: Partial<BookingRequest> = {}): BookingRequest {
  return {
    start: 660,
    end: 720,
    now: NOW,
    blocked: false,
    bookings: [booking(600, 660)],
    ...overrides,
  };
}

describe('canBook', () => {
  describe('AC1 - interval shape, start strictly after now, inside the day', () => {
    it('T02: rejects a slot that starts exactly at now', () => {
      expect(canBook(request({ start: 540, end: 570 }))).toBe(false);
    });

    it('T03: rejects a zero-duration slot', () => {
      expect(canBook(request({ start: 720, end: 720 }))).toBe(false);
    });

    it('T04: rejects a reversed interval', () => {
      expect(canBook(request({ start: 750, end: 720 }))).toBe(false);
    });

    it('T05: rejects a slot ending past the end of the day', () => {
      expect(canBook(request({ start: 1380, end: 1441 }))).toBe(false);
    });

    it('X1: accepts a slot ending exactly at the end of the day', () => {
      expect(canBook(request({ start: 1380, end: 1440 }))).toBe(true);
    });
  });

  describe('AC2 - maximum slot length', () => {
    it('T06: accepts exactly 120 minutes', () => {
      expect(canBook(request({ start: 720, end: 840 }))).toBe(true);
    });

    it('T07: rejects 121 minutes', () => {
      expect(canBook(request({ start: 720, end: 841 }))).toBe(false);
    });
  });

  describe('AC3 - blocked calendar', () => {
    it('T13: rejects an otherwise bookable slot when blocked', () => {
      expect(canBook(request({ start: 660, end: 720, blocked: true }))).toBe(false);
    });
  });

  describe('AC4 - overlap with existing bookings (half-open intervals)', () => {
    it('T01: accepts a slot touching a booking on its end', () => {
      expect(canBook(request({ start: 660, end: 720 }))).toBe(true);
    });

    it('T08: accepts a slot touching a booking on its start', () => {
      expect(canBook(request({ start: 570, end: 600 }))).toBe(true);
    });

    it('T09: rejects a partial overlap', () => {
      expect(canBook(request({ start: 630, end: 690 }))).toBe(false);
    });

    it('T10: rejects a slot that contains a booking', () => {
      expect(canBook(request({ start: 570, end: 690 }))).toBe(false);
    });

    it('T11: rejects a slot inside a booking', () => {
      expect(canBook(request({ start: 615, end: 645 }))).toBe(false);
    });

    it('T12: rejects a slot identical to a booking', () => {
      expect(canBook(request({ start: 600, end: 660 }))).toBe(false);
    });

    it('T14: accepts a slot when there are no bookings', () => {
      expect(canBook(request({ start: 630, end: 690, bookings: [] }))).toBe(true);
    });

    it('X2: accepts a slot boxed in by bookings on both sides', () => {
      expect(
        canBook(
          request({
            start: 660,
            end: 720,
            bookings: [booking(600, 660), booking(720, 780)],
          }),
        ),
      ).toBe(true);
    });
  });

  describe('AC5 - pure decision, booking data unchanged', () => {
    it('AC5: returns true and leaves the request and bookings untouched', () => {
      const req = request({ start: 660, end: 720 });
      const requestBefore = structuredClone(req);

      const result = canBook(req);

      expect(result).toBe(true);
      expect(req).toEqual(requestBefore);
      expect(req.bookings).toEqual([{ start: 600, end: 660 }]);
      expect(req.bookings).toHaveLength(1);
    });
  });
});