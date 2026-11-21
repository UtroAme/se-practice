import type { Room } from './rooms';

export function filterRooms(
  rooms: Room[],
  criteria: { attendees: number; equipment: string[] }
): Room[] {
  return rooms.filter(
    (r) =>
      r.capacity >= criteria.attendees &&
      criteria.equipment.every((item) => r.equipment.includes(item)),
  );
}