# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:**
**Group:**
**Date:**

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant | Qoder |
| Exact model name | Qwen3.8-Max |
| Implementation language | Python |
| Date of the runs | 18.09.2026 |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
(paste here, or write "n/a — used Python")
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes 
- No follow-up questions were asked before Part 7: yes 
- Every output was saved **before** any editing: yes

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1. Generate a sample csv
2. Added an from int to "A, B, C" format
3. Treshold is >40
4. How to do the interface of output format
5. Used a lot of libraries 

**Questions it should have asked and did not:**

1. What a pass score?
2. And what mean analyze a student marks?

**Is the function named `analyze_marks` with the required signature?** no — if no, what is it
called: def analyze(subjects, students)

**First impression before testing** (one sentence — you will compare this with section 6 later): Instead of a single function, it was split into several, yet the code remains readable.

---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1. He created a single function named analyze_marks
2. Ai didnt add a exteral data like a CSV

**What B still leaves open:**

1. function handle only single list with marks
2. there is only count of passed marks, nothing else

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | yes |
| decimals | yes |
| custom pass_mark | yes |
| empty list | yes |
| text value | yes |
| below 0 / above 100 | yes |

**Do the AI's own tests pass against the AI's own code?** yes

**Do they agree with the harness in section 6?** yes

**Assumptions C stated explicitly before the code:** 
A mark passes when mark >= pass_mark (boundary counts as a pass).
average and pass_rate are rounded to 2 decimals; pass_rate is a percentage (0–100), not a fraction.
highest/lowest are returned as-is (no rounding), preserving int vs float.
marks must be a non-empty list or tuple; a string, generator, or other iterable raises ValueError.
bool is rejected as non-numeric (otherwise True would silently count as 1).
pass_mark itself is not range-validated — any number is accepted.
NaN is not special-cased; it would slip past the range check and poison the average.
Validation is all-or-nothing: any bad mark raises before results are computed.
---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a Python developer. Implement a single function with no CLI, no file I/O, and no
 external libraries — standard library only.
EXACT SIGNATURE
    analyze_marks(marks, pass_mark=50)
RETURN SHAPE
Return a dict with exactly these four keys, spelled exactly like this, in this order:
    "average"   — float
    "highest"   — float
    "lowest"    — float
    "pass_rate" — float
A mark is considered passing when mark >= pass_mark (a mark equal to pass_mark passes).
VALIDATION RULES
Raise ValueError (with a short message) in all of these cases:
    - marks is empty
    - marks is not a list
    - any element is not a number (int or float, but not bool)
    - any element is < 0 or > 100
    - pass_mark is not a number
Do not silently skip, coerce, or filter invalid input.

ROUNDING — RESOLVE THIS EXPLICITLY
The specification only shows pass_rate = 66.67 for [40, 60, 80], which is ambiguous:
it does not say whether to return the full float or a value rounded to two decimals.
Resolve it this way and do not deviate:
    - "average" and "pass_rate" are rounded to 2 decimal places with round(x, 2)
      before being placed in the dict.
    - "highest" and "lowest" are returned unrounded.
This makes [40, 60, 80] with pass_mark=50 return exactly 66.67, not 66.66666666666667.

CONSTRAINTS
    - No external libraries (no numpy, no pandas).
    - No printing inside the function.
    - No mutation of the input list.
    - The function must be importable as `from prompt_d import analyze_marks`.

WORKED EXAMPLE (must match exactly)
    analyze_marks([40, 60, 80], 50)
    -> {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67}

TESTS YOU MUST INCLUDE
Write a small test block (plain asserts or unittest, standard library only) that covers
all six of these situations:
    1. one mark:        analyze_marks([100], 50)
    2. decimals:        analyze_marks([49.5, 50], 50)
    3. custom pass_mark: analyze_marks([40, 60, 80], 70)
    4. empty list:      analyze_marks([], 50)         -> must raise ValueError
    5. text value:      analyze_marks([40, "60"], 50) -> must raise ValueError
    6. out of range:    analyze_marks([-1, 50, 101], 50) -> must raise ValueError

STATE YOUR ASSUMPTIONS BEFORE THE CODE
Before writing any code, list every assumption you are making that the specification
above does not already pin down. Then write the code. Then the tests.
```

**What I deliberately added that A, B and C did not have:**

1.is a test part
2.how its should round it
3.in witch type its should return

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**
Multiply the pass rate by 100 to return it strictly as a percentage rather than a fraction.
---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | ERROR | ERROR | ERROR | PASS |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | ERROR | ERROR | ERROR | PASS |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR | ERROR | ERROR | PASS |
| 4 | `analyze_marks([], 50)` | raises ValueError | ERROR | ERROR | ERROR | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | ERROR | ERROR | ERROR | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | ERROR | ERROR | ERROR | PASS |
| | **Totals** | | 0/6 | 0/6 | 0/6 | 6/6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
| A | 1-6 | no callable named 'analyze_marks' |
| B | 1-6 | no callable named 'analyze_marks' |
| C | 1-6 | no callable named 'analyze_marks' |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
PS C:\Users\user\Desktop\kbtu\se-practice\week-02> python tests/test_analyze_marks.py code/prompt_a.py
ERROR: code\prompt_a.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.

```

**Prompt B**

```
PS C:\Users\user\Desktop\kbtu\se-practice\week-02> python tests/test_analyze_marks.py code/prompt_b.py      
ERROR: code\prompt_b.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.
```

**Prompt C**

```
PS C:\Users\user\Desktop\kbtu\se-practice\week-02> python tests/test_analyze_marks.py code/prompt_c.py
ERROR: code\prompt_c.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.
```

**Prompt D**

```
PS C:\Users\user\Desktop\kbtu\se-practice\week-02> python tests/test_analyze_marks.py code/prompt_d.py
========================================================================
analyze_marks harness — code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must not be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: every mark must be a number (int or float)
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: every mark must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 0 | 0 | 0 | 2 |
| Requirement coverage | 0 | 1 | 2 | 2 |
| Verifiability (tests) | 0 | 0 | 1 | 2 |
| Assumptions stated | 0 | 0 | 2 | 2 |
| Noise (2 = none) | 0 | 1 | 1 | 2 |
| **Total / 10** | 0 | 2 | 6 | 10 |

**Prompt length, in words:** A 7 · B 44 · C 84 · D 361

**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:
B over A | 18,5 word per point | +37 words | +2 point 
C over B  | 10 word per point | +40 words | +4 point
D over C  | 85,75 word per point | +343 words | +4 point
---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)
Best scored promt is D, but in actual work i used B or C. In previus courses some of Lecture showed about the good promt and its gets longer time, because you need to analyze the input format, how the process should go, and the output format. I used Gemini to analyze the test_analyze_marks.py for the better promt for prompt D, so its get a more time, and i need to think what the criteria and the target of our task. What i saw is the output should be the percentage and the output like that [0.6666666667] should be interpretend like a [66.67%] In my opinion case C bought the most correctness, even if is not passed the test_analyze_marks.py. Adding the example of output is giving more affect for the prompt. Prompt A was a pure noise woth hat CSV reader and a with the CSV file what not needed.


```

**Word count:** 150

---

## 9. Two questions for the debrief

Written before class, answered in class.

1. In the 7 section we can see that D over C need 85,75 word per point, how we can decrease it?
2. Why we didnt add a automated test in each prompt from A-C?
