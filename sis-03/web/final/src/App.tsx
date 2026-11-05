import { useState, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, CalendarClock, CheckCircle2, Clock, XCircle } from 'lucide-react';
import {
  EXISTING_BOOKINGS,
  MAX_DURATION_MINUTES,
  NOW_MINUTES,
  checkRoomRequest,
  formatMinutes,
  type CheckOutcome,
  type FieldErrors,
} from '@/lib/availability';

const ROOM_NAME = 'Room 2.14';

const inputBase =
  'mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base tabular-nums text-slate-900 shadow-sm outline-none transition focus:ring-4';
const inputOk = 'border-slate-300 focus:border-teal-600 focus:ring-teal-100';
const inputError = 'border-rose-400 focus:border-rose-500 focus:ring-rose-100';

function FieldMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-rose-700">
      {message}
    </p>
  );
}

function ResultPanel({ outcome }: { outcome: CheckOutcome | null }) {
  if (outcome === null) {
    return (
      <ResultShell tone="neutral" icon={<Clock className="h-6 w-6" aria-hidden="true" />} title="No check yet">
        Enter a start and end time in minutes, then press Check.
      </ResultShell>
    );
  }

  if (outcome.kind === 'invalid') {
    return (
      <ResultShell
        tone="warning"
        icon={<AlertTriangle className="h-6 w-6" aria-hidden="true" />}
        title="Request not checked"
      >
        Fix the highlighted fields and check again.
      </ResultShell>
    );
  }

  const windowLabel = `${formatMinutes(outcome.start)} to ${formatMinutes(outcome.end)} (${outcome.end - outcome.start} min)`;

  if (outcome.kind === 'blocked') {
    return (
      <ResultShell
        tone="error"
        icon={<XCircle className="h-6 w-6" aria-hidden="true" />}
        title="Unavailable"
        label={windowLabel}
      >
        The room is marked as blocked, so no time can be booked right now.
      </ResultShell>
    );
  }

  if (outcome.kind === 'overlap') {
    const { conflict } = outcome;
    return (
      <ResultShell
        tone="error"
        icon={<XCircle className="h-6 w-6" aria-hidden="true" />}
        title="Unavailable"
        label={windowLabel}
      >
        It overlaps {conflict.title} ({formatMinutes(conflict.start)} to {formatMinutes(conflict.end)}).
      </ResultShell>
    );
  }

  return (
    <ResultShell
      tone="success"
      icon={<CheckCircle2 className="h-6 w-6" aria-hidden="true" />}
      title="Available"
      label={windowLabel}
    >
      No existing booking overlaps this window. This check does not reserve the room.
    </ResultShell>
  );
}

type ResultTone = 'neutral' | 'warning' | 'error' | 'success';

const toneClasses: Record<ResultTone, string> = {
  neutral: 'border-slate-200 bg-slate-50 text-slate-800',
  warning: 'border-amber-300 bg-amber-50 text-amber-900',
  error: 'border-rose-300 bg-rose-50 text-rose-900',
  success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
};

const iconClasses: Record<ResultTone, string> = {
  neutral: 'text-slate-500',
  warning: 'text-amber-600',
  error: 'text-rose-600',
  success: 'text-emerald-600',
};

function ResultShell({
  tone,
  icon,
  title,
  label,
  children,
}: {
  tone: ResultTone;
  icon: ReactNode;
  title: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`result-enter flex gap-4 rounded-2xl border p-5 ${toneClasses[tone]}`}
    >
      <div className={`mt-0.5 shrink-0 ${iconClasses[tone]}`}>{icon}</div>
      <div className="min-w-0">
        {label && <p className="text-sm font-medium opacity-80">{label}</p>}
        <p className="text-2xl font-bold leading-tight tracking-tight">{title}</p>
        <p className="mt-1 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [outcome, setOutcome] = useState<CheckOutcome | null>(null);

  const errors: FieldErrors = outcome?.kind === 'invalid' ? outcome.errors : {};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOutcome(checkRoomRequest(startInput, endInput, blocked));
  };

  const clearResult = () => setOutcome(null);

  const handleReset = () => {
    setStartInput('');
    setEndInput('');
    setBlocked(false);
    setOutcome(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-sm">
              <CalendarClock className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                Smart Campus Room Availability
              </h1>
              <p className="text-sm text-slate-600">{ROOM_NAME} · Fictional schedule for demonstration</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
            <Clock className="h-4 w-4 text-teal-700" aria-hidden="true" />
            Now: {formatMinutes(NOW_MINUTES)} (minute {NOW_MINUTES})
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <h2 className="text-lg font-semibold leading-snug">Check a time window</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Times are minutes after midnight (600 = 10:00). Windows can be up to {MAX_DURATION_MINUTES} minutes
              and must start after the current time.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="start-minutes" className="block text-sm font-semibold text-slate-800">
                    Start (minutes)
                  </label>
                  <input
                    id="start-minutes"
                    name="start"
                    type="number"
                    inputMode="numeric"
                    step={1}
                    placeholder="e.g. 720"
                    value={startInput}
                    onChange={(event) => {
                      setStartInput(event.target.value);
                      clearResult();
                    }}
                    aria-invalid={Boolean(errors.start)}
                    aria-describedby={errors.start ? 'start-error' : undefined}
                    className={`${inputBase} ${errors.start ? inputError : inputOk}`}
                  />
                  <FieldMessage id="start-error" message={errors.start} />
                </div>

                <div>
                  <label htmlFor="end-minutes" className="block text-sm font-semibold text-slate-800">
                    End (minutes)
                  </label>
                  <input
                    id="end-minutes"
                    name="end"
                    type="number"
                    inputMode="numeric"
                    step={1}
                    placeholder="e.g. 780"
                    value={endInput}
                    onChange={(event) => {
                      setEndInput(event.target.value);
                      clearResult();
                    }}
                    aria-invalid={Boolean(errors.end)}
                    aria-describedby={errors.end ? 'end-error' : undefined}
                    className={`${inputBase} ${errors.end ? inputError : inputOk}`}
                  />
                  <FieldMessage id="end-error" message={errors.end} />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-stone-50 p-4 transition hover:border-slate-300">
                <input
                  type="checkbox"
                  checked={blocked}
                  onChange={(event) => {
                    setBlocked(event.target.checked);
                    clearResult();
                  }}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-800">Room blocked</span>
                  <span className="block text-sm text-slate-600">
                    Tick this if the room is closed for maintenance or another reason. Every request is then
                    unavailable.
                  </span>
                </span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-teal-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="mt-6">
              <ResultPanel outcome={outcome} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <h2 className="text-lg font-semibold leading-snug">Existing bookings</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Read-only list of bookings already on the calendar for {ROOM_NAME}.
            </p>

            <ul className="mt-6 space-y-3">
              {EXISTING_BOOKINGS.map((booking) => (
                <li
                  key={booking.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-stone-50 p-4"
                >
                  <span className="h-12 w-1.5 shrink-0 rounded-full bg-rose-400" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{booking.title}</p>
                    <p className="text-sm tabular-nums text-slate-600">
                      {formatMinutes(booking.start)} to {formatMinutes(booking.end)} ·{' '}
                      {booking.end - booking.start} min
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
