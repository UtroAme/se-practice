import { describe, test, expect } from 'vitest';
import { filterRooms } from './filter';
import { checkRoom } from './booking';
import type { Room } from './rooms';

const catalog: Room[] = [
  { id: 's', name: 'Small',  capacity: 8,  equipment: ['projector'],              blocked: false, bookings: [] },
  { id: 'm', name: 'Medium', capacity: 12, equipment: ['projector', 'whiteboard'], blocked: false, bookings: [{ start: 600, end: 720 }] },
  { id: 'l', name: 'Large',  capacity: 20, equipment: ['whiteboard'],              blocked: true,  bookings: [] },
];

describe('filterRooms', () => {
  test('F1: capacity >= attendees', () => {
    expect(filterRooms(catalog, { attendees: 12, equipment: [] }).map(r => r.id)).toEqual(['m', 'l']);
  });

  test('F2: the room must have ALL selected equipment', () => {
    expect(filterRooms(catalog, { attendees: 0, equipment: ['projector', 'whiteboard'] }).map(r => r.id)).toEqual(['m']);
  });

  test('F4: a clear empty state when no rooms match', () => {
    expect(filterRooms(catalog, { attendees: 99, equipment: [] })).toEqual([]);
  });

  test('B5: capacity exactly equal to attendees is included', () => {
    expect(filterRooms(catalog, { attendees: 8, equipment: [] }).map(r => r.id)).toContain('s');
  });

  test('B6: capacity one below attendees is excluded', () => {
    expect(filterRooms(catalog, { attendees: 9, equipment: [] }).map(r => r.id)).not.toContain('s');
  });

  test('F3: a blocked room is never reported available', () => {
    expect(checkRoom(catalog, 'l', { start: 300, end: 360, now: 0 })).toBe(false);
  });

  test('F5: the same times in another room give a different result', () => {
    // m занята с 600 до 720, l заблокирована
    expect(checkRoom(catalog, 'm', { start: 720, end: 780, now: 0 })).toBe(true); // сразу после m
    expect(checkRoom(catalog, 'l', { start: 720, end: 780, now: 0 })).toBe(false); // l blocked
  });

  test('INT: filterRooms then checkRoom on what it returned', () => {
    const rooms = filterRooms(catalog, { attendees: 10, equipment: ['projector', 'whiteboard'] });
    expect(rooms.map(r => r.id)).toEqual(['m']);
    expect(checkRoom(rooms, rooms[0].id, { start: 720, end: 780, now: 0 })).toBe(true);
  });
});