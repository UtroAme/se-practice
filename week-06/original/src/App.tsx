import { useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Users,
  XCircle,
} from "lucide-react";
import {
  checkAvailability,
  formatMinutes,
  MAX_DURATION,
  rooms,
  roomOptions,
  type Room,
} from "@/lib/availability";

function timeValueToMinutes(value: string): number | null {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
}

function RoomCard({ room, currentTime }: { room: Room; currentTime: number }) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        room.blocked
          ? "border-red-200 bg-red-50"
          : "border-emerald-200 bg-white hover:border-emerald-300"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900">{room.name}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5" /> {room.building}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> seats {room.capacity}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            room.blocked ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {room.blocked ? "Blocked" : "Open"}
        </span>
      </div>
      {room.bookings.length > 0 ? (
        <ul className="mt-3 space-y-1 border-t border-gray-100 pt-3">
          {room.bookings.map((b) => {
            const past = b.end <= currentTime;
            return (
              <li
                key={b.id}
                className={`flex justify-between text-sm ${past ? "text-gray-400 line-through" : "text-gray-600"}`}
              >
                <span>{b.title}</span>
                <span className="tabular-nums whitespace-nowrap pl-2">
                  {formatMinutes(b.start)} – {formatMinutes(b.end)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-400">
          No bookings today
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState(roomOptions[0].id);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checked, setChecked] = useState(false);

  // Fictional "current time" so results are stable and demo-friendly.
  const currentTime = 780; // 1:00 PM

  const selectedRoom = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const startMinutes = timeValueToMinutes(startTime);
  const endMinutes = timeValueToMinutes(endTime);

  const result = useMemo(
    () => checkAvailability(selectedRoom, startMinutes, endMinutes, currentTime),
    [selectedRoom, startMinutes, endMinutes, currentTime],
  );

  const durationValid =
    startMinutes !== null && endMinutes !== null && endMinutes > startMinutes;

  const showResult = checked && (startTime !== "" || endTime !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-emerald-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Smart Campus Room Checker
            </h1>
            <p className="text-sm text-gray-500">
              Sample campus day · current time {formatMinutes(currentTime)} (fictional data)
            </p>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Booking form */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Check a time slot</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="room"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Room
                </label>
                <select
                  id="room"
                  value={roomId}
                  onChange={(e) => {
                    setRoomId(e.target.value);
                    setChecked(false);
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {roomOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.formatted}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="start"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Start time
                  </label>
                  <input
                    id="start"
                    type="time"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      setChecked(false);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="end"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    End time
                  </label>
                  <input
                    id="end"
                    type="time"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                      setChecked(false);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>

              {startTime && endTime && !durationValid && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  End time must be after the start time.
                </p>
              )}

              <button
                onClick={() => setChecked(true)}
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 active:scale-[0.99]"
              >
                Check availability
              </button>
            </div>

            {/* Decision panel */}
            {showResult ? (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 rounded-xl border p-4 ${
                  result.decision === "available"
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.decision === "available" ? (
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
                  )}
                  <div>
                    <p
                      className={`font-bold ${
                        result.decision === "available" ? "text-emerald-800" : "text-red-800"
                      }`}
                    >
                      {result.decision === "available" ? "Available" : "Unavailable"}
                    </p>
                    <p
                      className={`mt-0.5 text-sm ${
                        result.decision === "available" ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {result.decision === "available"
                        ? `${selectedRoom.name} is free from ${formatMinutes(startMinutes!)} to ${formatMinutes(endMinutes!)}.`
                        : result.reason}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                Pick a room and time range, then press “Check availability”.
                Bookings are capped at {MAX_DURATION} minutes and can touch but not
                overlap existing bookings.
              </p>
            )}
          </section>

          {/* Schedule overview */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-emerald-600" />
              Today&apos;s schedule
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} currentTime={currentTime} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
