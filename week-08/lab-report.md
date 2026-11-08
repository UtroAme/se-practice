# Week 08 — Lab report

**Name:** Tomiris Zhazykbayeva
**Group:** CSCI-2208
**Date:** 2026-11-07

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | Qoder |
| Exact model (with its version, or `not displayed`) | Coder Qwen3.8-Flash |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | prompt-only simulation |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer |
| Vitest version (the `RUN  v…` line of a run) | 3.2.4 |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | ts |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
$ npx vitest run

 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts (17 tests) 3ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 1ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T01 AC4: accepts aslot touching a booking on its end 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T08 AC4: accepts aslot touching a booking on its start 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects apartial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects aslot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects aslot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects aslot identical to a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts aslot when there are no bookings 0ms
   ✓ canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
   ✓ canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 0ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  13:59:53
   Duration  350ms (transform 43ms, setup 0ms, collect 39ms, tests 3ms, environment 0ms, prepare 120ms)
```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts (17 tests) 4ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 1ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects a partial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects a slot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects a slot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects a slot identical to a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts a slot when there are no bookings 0ms
   ✓ canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
   ✓ canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 0ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  14:02:19
   Duration  370ms (transform 50ms, setup 0ms, collect 45ms, tests 4ms, environment 0ms, prepare 134ms)

PS C:\Users\user\Desktop\kbtu\se-practice\week-08\app> npx vitest run

 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ❯ src/booking.test.ts (17 tests | 4 failed) 8ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 1ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   × canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end 5ms
     → expected false to be true // Object.is equality
   × canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start 0ms
     → expected false to be true // Object.is equality
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects a partial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects a slot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects a slot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects a slot identical to a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts a slot when there are no bookings 0ms
   × canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
     → expected false to be true // Object.is equality
   × canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 0ms
     → expected false to be true // Object.is equality

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:63:58
     61|   describe('AC4 - overlap with existing bookings', () => {
     62|     test('T01 AC4: accepts a slot touching a booking on its end…
     63|       expect(canBook(request({ start: 660, end: 720 }))).toBe(t…
       |                                                          ^
     64|     });
     65| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/4]⎯

 FAIL  src/booking.test.ts > canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:67:58
     65| 
     66|     test('T08 AC4: accepts a slot touching a booking on its sta…
     67|       expect(canBook(request({ start: 570, end: 600 }))).toBe(t…
       |                                                          ^
     68|     });
     69| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/4]⎯

 FAIL  src/booking.test.ts > canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:99:9
     97|           }),
     98|         ),
     99|       ).toBe(true);
       |         ^
    100|     });
    101|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/4]⎯

 FAIL  src/booking.test.ts > canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:110:22
    108|       const result = canBook(req);
    109| 
    110|       expect(result).toBe(true);
       |                      ^
    111|       expect(JSON.stringify(req.bookings)).toEqual(bookingsBefo…
    112|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/4]⎯


 Test Files  1 failed (1)
      Tests  4 failed | 13 passed (17)
   Start at  14:08:33
   Duration  355ms (transform 38ms, setup 0ms, collect 33ms, tests 8ms, environment 0ms, prepare 133ms)
```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ❯ src/booking.test.ts (19 tests | 6 failed) 10ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 1ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   × canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end 5ms
     → expected false to be true // Object.is equality
   × canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start 0ms
     → expected false to be true // Object.is equality
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects a partial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects a slot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects a slot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects a slot identical toa booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts a slot when there are no bookings 0ms
   × canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
     → expected false to be true // Object.is equality
   × canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 0ms
     → expected false to be true // Object.is equality
   × BUG-A: a request that touches existing bookings on both sides is Available 0ms
     → expected false to be true // Object.is equality
   × BUG-B: canBook on an Available request does not change the bookings 1ms
     → expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 6 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:63:58
     61|   describe('AC4 - overlap with existing bookings', () => {
     62|     test('T01 AC4: accepts a slot touching a booking on its end', () => {
     63|       expect(canBook(request({ start: 660, end: 720 }))).toBe(true);
       |                                                          ^
     64|     });
     65| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/6]⎯

 FAIL  src/booking.test.ts > canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:67:58
     65| 
     66|     test('T08 AC4: accepts a slot touching a booking on its start', () => {
     67|       expect(canBook(request({ start: 570, end: 600 }))).toBe(true);
       |                                                          ^
     68|     });
     69| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/6]⎯

 FAIL  src/booking.test.ts > canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:99:9
     97|           }),
     98|         ),
     99|       ).toBe(true);
       |         ^
    100|     });
    101|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/6]⎯

 FAIL  src/booking.test.ts > canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:110:22
    108|       const result = canBook(req);
    109| 
    110|       expect(result).toBe(true);
       |                      ^
    111|       expect(JSON.stringify(req.bookings)).toEqual(bookingsBefore);
    112|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/6]⎯

 FAIL  src/booking.test.ts > BUG-A: a request that touches existing bookings on both sidesis Available
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:123:18
    121|   // 660-720 touches the first at 660 and the second at 720, touches nothing else
    122|   const result = canBook({ start: 660, end: 720, now: 480, blocked: false, bookin…
    123|   expect(result).toBe(true);
       |                  ^
    124| });
    125| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/6]⎯

 FAIL  src/booking.test.ts > BUG-B: canBook on an Available request does not change the bookings
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 780,
+     "start": 720,
+   },
  ]

 ❯ src/booking.test.ts:132:20
    130|   const result = canBook({ start: 720, end: 780, now: 480, blocked: false, bookin…
    131|   expect(result).toBe(true);
    132|   expect(bookings).toEqual(before);
       |                    ^
    133| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/6]⎯


 Test Files  1 failed (1)
      Tests  6 failed | 13 passed (19)
   Start at  14:15:12
   Duration  367ms (transform 33ms, setup 0ms, collect 34ms, tests 10ms, environment 0ms, prepare 149ms)
```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | BUG-A (also T01, T08, X2) | start=660, end=720, now=480, blocked=false, bookings=[{600,660},{720,780}] | `true` — 660–720 touches both bookings only at the endpoints | `false` — a touching request is rejected as an overlap | `if (start <= b.end && end >= b.start) return false;` — when the request only touches a booking, either `start == b.end` or `end == b.start`, so both `<=` / `>=` comparisons are true and a touching slot is treated as a conflict. The operators should be strict (`<` / `>`). |
| BUG-B | BUG-B (AC5 only proves it after BUG-A is fixed) | start=720, end=780, now=480, blocked=false, bookings=[{600,660}] | `true`, and `bookings` stays `[{600,660}]` | `true`, but `bookings` becomes `[{600,660},{720,780}]` — the array is mutated | `bookings.push({ start, end });` at the end of the function — `canBook` mutates the array it was given, although AC5 says it must only return a Boolean and leave the booking data unchanged. |
| BUG-B (latent, hidden behind BUG-A) | AC5 | start=660, end=720, now=540, blocked=false, bookings=[{600,660}] | `true`, and `bookings` unchanged | `false` — the test fails on `expect(result).toBe(true)`, never reaching the mutation check | The AC5 request touches the `600–660` booking, so BUG-A rejects it in the loop (`return false`) before `bookings.push` ever runs. The test fails for the wrong reason: after BUG-A is fixed, the same test will fail again — this time on `toEqual(before)`, i.e. on the real BUG-B. |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
bug-detector/
bug-detector/SKILL.md
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->
Skill upload was not available in my environment (Qwen Code requires a paid subscription), so I ran the prompt-only simulation from the deck: I pasted the text of `SKILL.md` as the first message of a fresh chat and declared it a prompt-only simulation, not an installed skill. Screenshot: `evidence/install.png`.

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.

Acceptance Criteria:
AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing Test Output:
FAIL src/booking.test.ts > canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end
AssertionError: expected false to be true // Object.is equality
- Expected
+ Received
- true
+ false
 ❯ src/booking.test.ts:45:60

Code of canBook:
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
Now I have the code. Let me verify my reading of the two predicates by running them standalone in a scratch file (not the repo).



Couldn't run the comparison (that Bash call was declined), so this is from reading the predicates — the logic is deterministic, so the conclusion doesn't depend on executing it.

Root cause

Two distinct defects, both in canBook. The failing assertion is caused by the first.

1 — Overlap check uses closed intervals instead of half-open. 
if (start = b.start) return false;
With existing 540–600 and slot 600–660: 600 = 540 is true → returns false. But AC4 requires endpoint-touching to be allowed. The = treat a slot as conflicting the moment it merely touches a booking. Same bug on the leading edge (480–540 is also rejected). Intervals here are half-open [start, end), so overlap is strict: start  b.end's mirror, end > b.start.

2 — canBook mutates the caller's booking list.
// keep the room's list current with the slot that was just found free
bookings.push({ start, end });
This directly violates AC5 ("without changing booking data"), and it is a second way to produce this exact failure: any test that queries the same array twice — or that shares a fixture array across cases — gets true then false, because the first query injected a phantom booking that now genuinely overlaps. If the failing test at src/booking.test.ts:45 calls canBook more than once, this is the actual trigger; if it calls once, defect 1 alone is. Both need fixing.

Minimal patch

for (const b of bookings) {
if (start = b.start) return false;
if (start  b.start) return false;
  }
// keep the room's list current with the slot that was just found free
bookings.push({ start, end });
  return true;

Two lines changed, one deleted. Nothing else in the guard set is wrong: AC1 (start  120, so 120 is allowed and 121 rejected — correct), and AC3 all check out.

Regression tests

describe('canBook > AC4 - endpoint touching is not an overlap', () => {
  const room = { now: 0, blocked: false, bookings: [{ start: 540, end: 600 }] };

  it('T01 accepts a slot starting exactly where a booking ends', () =>
    expect(canBook({ ...room, start: 600, end: 660 })).toBe(true));
  it('T02 accepts a slot ending exactly where a booking starts', () =>
    expect(canBook({ ...room, start: 480, end: 540 })).toBe(true));
  it('T03 accepts a fully disjoint slot', () =>
    expect(canBook({ ...room, start: 700, end: 760 })).toBe(true));
  it('T04 rejects a 1-minute overlap at the tail', () =>
    expect(canBook({ ...room, start: 599, end: 659 })).toBe(false));
  it('T05 rejects a 1-minute overlap at the head', () =>
    expect(canBook({ ...room, start: 480, end: 541 })).toBe(false));
});

describe('canBook > AC5 - does not mutate booking data', () => {
  it('leaves the list untouched for an available slot', () => {
    const bookings = [{ start: 540, end: 600 }];
    canBook({ start: 700, end: 760, now: 0, blocked: false, bookings });
    expect(bookings).toEqual([{ start: 540, end: 600 }]);
  });
  it('is idempotent for a repeated identical query', () => {
    const bookings = [{ start: 540, end: 600 }];
    const q = { start: 700, end: 760, now: 0, blocked: false, bookings };
    expect(canBook(q)).toBe(canBook(q));
  });
});

T01–T05 fail as a pair on the old code and pin both directions of the boundary; T04/T05 guard against someone "fixing" it by making the check too permissive. The AC5 block is what prevents defect 2 from reappearing.

Before you apply this

Confirm who actually creates the booking. If some caller relies on canBook's side effect to persist the slot, deleting the push will silently stop bookings from being recorded. The write must live in the create/commit path, not in the availability predicate. Grep the callers first.
AC6 (UI feedback) isn't in this function — desktop/mobile messaging can't be verified here and isn't covered by the patch.
One judgment call left alone: if (!(start > now)) rejects start === now. That reads as "strictly future", which is stricter than AC1's "in the past". No test covers it, so I didn't touch it — worth confirming intent.
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

I sent the following text of `SKILL.md` as the first message:
> ---
> name: bug-detector
> description: Diagnose bugs in existing code using acceptance criteria and failing tests. Use when reviewing the Smart Campus booking application.
> ---
> # Bug Detector 
> 
> ## Procedure
> 1. Read acceptance criteria, code, and observed failure.
> 2. Reproduce with the smallest deterministic input.
> 3. Identify the likely root cause and relevant lines.
> 4. Separate confirmed defects from hypotheses.
> 5. Suggest a minimal fix, but do not edit code yet.
> 6. Propose a regression test and expected result.
> 7. Output: defect | evidence | root cause | fix | test.
> 
> This is a prompt-only simulation, not an installed skill.

Then I sent this input:

```text
Use the bug-detector skill to diagnose the failed room-booking test.

Acceptance Criteria:
AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing Test Output:
FAIL src/booking.test.ts > canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end
AssertionError: expected false to be true // Object.is equality
- Expected
+ Received
- true
+ false
 ❯ src/booking.test.ts:45:60

Code of canBook:
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
Following the bug-detector procedure with the inputs provided.

Reproduction (minimal deterministic input):
canBook({ start: 600, end: 720, now: 0, blocked: false,
          bookings: [{ start: 540, end: 600 }] })
// → false, expected true (touches booking [540,600) only at endpoint 600)

Diagnosis

#  Defect  Evidence  Root cause  Fix  Test

1  AC4 confirmed — endpoint-touching slots rejected as overlaps  Failing assertion at booking.test.ts:45:60; repro above. With b = {540,600}, slot {600,720}: start = b.start → 720 >= 540 ✅ → returns false  Overlap predicate uses closed-interval comparisons. For half-open slots [start, end), touching endpoints are not overlaps  Change if (start = b.start) to if (start  b.start)  expect(canBook({start:600,end:720,now:0,blocked:false,bookings:[{start:540,end:600}]})).toBe(true) and mirror case start:360,end:540 vs {540,600}; keep strict-overlap case {599,720} → false
2  AC5 confirmed — canBook mutates caller's booking data  bookings.push({ start, end }) before return true directly violates "without changing booking data"; it also poisons the shared array so later availability checks in the same test see a phantom booking (likely cause of any other flaky AC4 failures)  Availability check conflated with booking creation  Delete the push line and its comment; persistence belongs in a separate book() function  const bs = [{start:540,end:600}]; canBook({start:600,end:720,now:0,blocked:false,bookings:bs}); expect(bs).toStrictEqual([{start:540,end:600}])

Hypotheses (not confirmed defects):
start > now rejects a booking starting exactly now. AC1 only says "reject requests in the past" — a zero-lead-time booking isn't past. Depends on whether the spec intends >=; no failing test evidence.
AC2/AC3 checks (end - start > 120, blocked) look correct; AC6 is UI-layer and not assessable from this function.

Minimal fix (not applied, per procedure):
for (const b of bookings) {
  if (start  b.start) return false;
}
return true;   // push removed — canBook must not mutate bookings

Want me to apply this fix and run the suite? If so, point me to the actual project location — this workspace is still empty.
```

Did the environment show that the skill was invoked? not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | Found both defects (closed intervals and mutating the array). Was slightly unsure if the mutation or the overlap caused the specific T01 failure. | Found both defects. Confidently identified them separately. |
| Reproducible test | Provided a full test block. | Provided specific exact `expect(canBook(...)).toBe(...)` lines for both bugs. |
| Minimal proposed patch | Proposed the correct fix but also added extra changes (rearranging code). | Followed step 5 exactly: proposed the minimal patch for the loop and explicitly said to delete the `push` line. |
| Unsupported claims | Suggested that maybe the failing test calls `canBook` twice causing a flaky failure, which is false based on the actual test file. | Followed step 4 perfectly: explicitly separated confirmed defects from hypotheses (e.g., the `start > now` issue). |
| Clarity of explanation | Verbose, wrote paragraphs. | Clear table format (defect | evidence | root cause | fix | test). |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

- No skill: Both (BUG-A and BUG-B)
- With skill: Both (BUG-A and BUG-B)

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ❯ src/booking.test.ts (19 tests | 1 failed | 18 skipped) 6ms
   ↓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now
   ↓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot
   ↓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval
   ↓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day
   ↓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day
   ↓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes
   ↓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes
   ↓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked
   ↓ canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end
   ↓ canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start
   ↓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects a partial overlap
   ↓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects a slot that contains a booking
   ↓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects a slot inside a booking
   ↓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects a slot identical toa booking
   ↓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts a slot when there are no bookings
   ↓ canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides
   ↓ canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched
   × BUG-A: a request that touches existing bookings on both sides is Available 6ms
     → expected false to be true // Object.is equality
   ↓ BUG-B: canBook on an Available request does not change the bookings

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > BUG-A: a request that touches existing bookings on both sidesis Available
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:123:18
    121|   // 660-720 touches the first at 660 and the second at 720, touches nothing else
    122|   const result = canBook({ start: 660, end: 720, now: 480, blocked: false, bookin…
    123|   expect(result).toBe(true);
       |                  ^
    124| });
    125| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 18 skipped (19)
   Start at  13:30:37
   Duration  397ms (transform 51ms, setup 0ms, collect 33ms, tests 6ms, environment 0ms, prepare 173ms)

   diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -14,7 +14,7 @@ export function canBook({ start, end, now, blocked, bookings }: {
   if (end - start > 120) return false;
   if (blocked) return false;
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
   bookings.push({ start, end });
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
 RUN  v3.2.4 C:/Users/user/Desktop/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts (19 tests) 3ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T02 AC1: rejects a slot that starts exactly at now 1ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T03 AC1: rejects a zero-duration slot 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T04 AC1: rejects a reversed interval 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > T05 AC1: rejects a slot ending past the end of the day 0ms
   ✓ canBook > AC1 - interval shape, start strictly after now, inside the day > X1 AC1: accepts a slot ending exactly at the end of the day 0ms
   ✓ canBook > AC2 - maximum slot length > T06 AC2: accepts exactly 120 minutes 0ms
   ✓ canBook > AC2 - maximum slot length > T07 AC2: rejects 121 minutes 0ms
   ✓ canBook > AC3 - blocked calendar > T13 AC3: rejects an otherwise bookable slot when blocked 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T01 AC4: accepts a slot touching a booking on its end 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T08 AC4: accepts a slot touching a booking on its start 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T09 AC4: rejects a partial overlap 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T10 AC4: rejects a slot that contains a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T11 AC4: rejects a slot inside a booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T12 AC4: rejects a slot identical toa booking 0ms
   ✓ canBook > AC4 - overlap with existing bookings > T14 AC4: accepts a slot when there are no bookings 0ms
   ✓ canBook > AC4 - overlap with existing bookings > X2 AC4: accepts a slot boxed in by bookings on both sides 0ms
   ✓ canBook > AC5 - pure decision, booking data unchanged > AC5: returns true and leaves bookings untouched 0ms
   ✓ BUG-A: a request that touches existing bookings on both sides is Available 0ms
   ✓ BUG-B: canBook on an Available request does not change the bookings 0ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  13:41:36
   Duration  367ms (transform 33ms, setup 0ms, collect 33ms, tests 3ms, environment 0ms, prepare 128ms)
  diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
  --- a/week-08/app/src/booking.ts
  +++ b/week-08/app/src/booking.ts
  @@ -16,7 +16,5 @@ export function canBook({ start, end, now,  blocked, bookings }: {
   for (const b of bookings) {
     if (start < b.end && end > b.start) return false;
   }
  -  // keep the room's list current with the slot that was just found free
  -  bookings.push({ start, end });
   return true;
 }
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-Both assistants proposed patches without executing the tests themselves. The no-skill assistant even made an unsupported claim that the test might be failing because `canBook` was called twice. Only running my own regression tests proved that the bug was purely in the loop logic and the `bookings.push` mutation.

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->

The skill helped mostly with structure and accuracy: the with-skill answer separated confirmed defects from hypotheses (step 4) and clearly identified that `bookings.push` was violating AC5, whereas the no-skill answer made a false assumption about the test calling the function twice. However, the tests proved what the AI could not: they showed that the AC5 test was originally failing not because of the mutation, but because BUG-A rejected the request before the mutation could even happen. I had to apply the minimal patches manually to ensure I didn't introduce regressions. AI is good at spotting patterns, but the test suite remains the ultimate source of truth.
