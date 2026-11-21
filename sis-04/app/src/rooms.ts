export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: { start: number; end: number }[];
};

export const ROOMS: Room[] = [
  {
    id: 'a101',
    name: 'Room A-101',
    capacity: 30,
    equipment: ['projector', 'whiteboard'],
    blocked: false,
    bookings: [{ start: 600, end: 660 }], // 10:00–11:00
  },
  {
    id: 'b204',
    name: 'Room B-204',
    capacity: 12,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'c305',
    name: 'Room C-305 (Lab)',
    capacity: 20,
    equipment: ['projector', 'whiteboard', 'computers'],
    blocked: true,
    bookings: [{ start: 540, end: 600 }], // 09:00–10:00
  },
  {
    id: 'd410',
    name: 'Room D-410 (Conference)',
    capacity: 8,
    equipment: ['projector'],
    blocked: false,
    bookings: [
      { start: 780, end: 840 }, // 13:00–14:00
      { start: 900, end: 960 }, // 15:00–16:00
    ],
  },
];