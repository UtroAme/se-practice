import { describe, test, expect } from 'vitest';
import { canBook } from './booking';
import type { BookingRequest, Interval } from './booking';

const NOW = 540;

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
    test('T02 AC1: rejects a slot that starts exactly at now', () => {
      expect(canBook(request({ start: 540, end: 570 }))).toBe(false);
    });

    test('T03 AC1: rejects a zero-duration slot', () => {
      expect(canBook(request({ start: 720, end: 720 }))).toBe(false);
    });

    test('T04 AC1: rejects a reversed interval', () => {
      expect(canBook(request({ start: 750, end: 720 }))).toBe(false);
    });

    test('T05 AC1: rejects a slot ending past the end of the day', () => {
      expect(canBook(request({ start: 1380, end: 1441 }))).toBe(false);
    });

    test('X1 AC1: accepts a slot ending exactly at the end of the day', () => {
      expect(canBook(request({ start: 1380, end: 1440 }))).toBe(true);
    });
  });

  describe('AC2 - maximum slot length', () => {
    test('T06 AC2: accepts exactly 120 minutes', () => {
      expect(canBook(request({ start: 720, end: 840 }))).toBe(true);
    });

    test('T07 AC2: rejects 121 minutes', () => {
      expect(canBook(request({ start: 720, end: 841 }))).toBe(false);
    });
  });

  describe('AC3 - blocked calendar', () => {
    test('T13 AC3: rejects an otherwise bookable slot when blocked', () => {
      expect(canBook(request({ start: 660, end: 720, blocked: true }))).toBe(false);
    });
  });

  describe('AC4 - overlap with existing bookings', () => {
    test('T01 AC4: accepts a slot touching a booking on its end', () => {
      expect(canBook(request({ start: 660, end: 720 }))).toBe(true);
    });

    test('T08 AC4: accepts a slot touching a booking on its start', () => {
      expect(canBook(request({ start: 570, end: 600 }))).toBe(true);
    });

    test('T09 AC4: rejects a partial overlap', () => {
      expect(canBook(request({ start: 630, end: 690 }))).toBe(false);
    });

    test('T10 AC4: rejects a slot that contains a booking', () => {
      expect(canBook(request({ start: 570, end: 690 }))).toBe(false);
    });

    test('T11 AC4: rejects a slot inside a booking', () => {
      expect(canBook(request({ start: 615, end: 645 }))).toBe(false);
    });

    test('T12 AC4: rejects a slot identical to a booking', () => {
      expect(canBook(request({ start: 600, end: 660 }))).toBe(false);
    });

    test('T14 AC4: accepts a slot when there are no bookings', () => {
      expect(canBook(request({ start: 630, end: 690, bookings: [] }))).toBe(true);
    });

    test('X2 AC4: accepts a slot boxed in by bookings on both sides', () => {
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
    test('AC5: returns true and leaves bookings untouched', () => {
      const req = request({ start: 660, end: 720 });
      const bookingsBefore = JSON.stringify(req.bookings);

      const result = canBook(req);

      expect(result).toBe(true);
      expect(JSON.stringify(req.bookings)).toEqual(bookingsBefore);
    });
  });
});

test('BUG-A: a request that touches existing bookings on both sides is Available', () => {
  const bookings = [
    { start: 600, end: 660 },
    { start: 720, end: 780 },
  ];
  // 660-720 touches the first at 660 and the second at 720, touches nothing else
  const result = canBook({ start: 660, end: 720, now: 480, blocked: false, bookings });
  expect(result).toBe(true);
});

test('BUG-B: canBook on an Available request does not change the bookings', () => {
  const bookings = [{ start: 600, end: 660 }];
  const before = JSON.parse(JSON.stringify(bookings));
  // 720-780 touches nothing, so BUG-A cannot reject it and hide BUG-B
  const result = canBook({ start: 720, end: 780, now: 480, blocked: false, bookings });
  expect(result).toBe(true);
  expect(bookings).toEqual(before);
});