import { useState } from 'react';
import { ROOMS } from './rooms';
import { filterRooms } from './filter';
import { checkRoom } from './booking';

const toMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};

export default function App() {
  const [attendees, setAttendees] = useState(0);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [now, setNow] = useState('09:00');
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const matchedRooms = filterRooms(ROOMS, { attendees, equipment });

  function check() {
    setResult(null);
    if (!start || !now || !end) {
      setError('Fill in the current time, the start and the end.');
      return;
    }
    const s = toMinutes(start);
    const e = toMinutes(end);
    const n = toMinutes(now);
    if (s >= e) {
      setError('The end time must be after the start time.');
      return;
    }
    setError('');
    const ok = checkRoom(ROOMS, roomId, { start: s, end: e, now: n });
    setResult(ok);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>

      <div className="row">
        <label>Attendees
          <input type="number" min={0} value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} />
        </label>
        <label>Equipment
          <select multiple value={equipment} onChange={(e) => setEquipment(Array.from(e.target.selectedOptions, (o) => o.value))}>
            <option value="projector">Projector</option>
            <option value="whiteboard">Whiteboard</option>
            <option value="computers">Computers</option>
          </select>
        </label>
      </div>

      <h2>Matching rooms</h2>
      {matchedRooms.length === 0 ? (
        <p className="empty-state">No rooms match your filter.</p>
      ) : (
        <ul>
          {matchedRooms.map((r) => (
            <li key={r.id}>
              <button onClick={() => setRoomId(r.id)}>
                {r.name} — {r.capacity} seats — {r.equipment.join(', ')} {r.blocked ? '(blocked)' : ''}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="row">
        <label>Selected Room
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            {ROOMS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </label>
        <label>Current time<input type="time" value={now} onChange={(e) => setNow(e.target.value)} /></label>
        <label>Start<input type="time" value={start} onChange={(e) => setStart(e.target.value)} /></label>
        <label>End<input type="time" value={end} onChange={(e) => setEnd(e.target.value)} /></label>
      </div>

      <button onClick={check}>Check availability</button>
      {error && <p className="error">{error}</p>}
      {result !== null && (
        <p className={`result ${result ? 'available' : 'unavailable'}`}>
          {result ? 'Available' : 'Unavailable'}
        </p>
      )}
    </main>
  );
}