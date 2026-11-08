# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| | | the plan (stage A) | | this SIS |
| | | Python v1 (stage B) | `code/original/booking_v1.py` | this SIS |
| Bolt.new | | web prototype v1 (stage B) | `web/original/` | this SIS |
| | | critique (stage C) | | this SIS |
| | | repair (stage D) | | this SIS |

**The assistant wrote, or helped write, my tests in `code/`:** yes
<!-- Qoder generated initial tests in stage B. However, I replaced them with my own comprehensive `test_booking.py` to ensure all 12 specific cases and mutation checks from the assignment were covered. I verified every expected value directly against AC1-AC5. -->

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes 

**Every result in report.md section 5 was actually run or seen, not assumed:** yes 

**Everything I submitted, I can explain and defend in class — including the overlap condition
and what the agent did in section 9:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the line. An honest entry here costs far less than a blank one that turns out to be untrue. -->
**Anything I accepted from the AI without fully understanding it:**
None. I reviewed every branch of the generated code and rejected suggestions that violated the fixed criteria (e.g., adding a cleaning buffer or mutating the `existing` list).

Signed: Tomiris Zhazykbayeva
Date: 2026-11-01
