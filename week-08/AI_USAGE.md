# AI Usage Disclosure — Week 08

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Qoder | Coder Qwen3.8-Flash | diagnosis without the skill (Task 4) | none — "Do not edit code" |
| Qoder | Coder Qwen3.8-Flash | diagnosis with bug-detector (Task 5) | none — "Do not edit code" |
| Web Chat Assistant | not displayed | Help with environment setup (Qwen Code installation), fixing PowerShell syntax errors, and reviewing lab-report formatting | `lab-report.md`, `submission.yml` (formatting and troubleshooting only) |

**`skills/bug-detector/SKILL.md` was typed by me from the deck's text, not generated:** yes

**I applied the patches myself, one minimal change per bug, after reviewing what the assistant
proposed:** yes
<!-- If an assistant edited app/ directly, say which change and how you reviewed it. -->

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** yes
<!-- If "yes": which one, the exact model, and for which section. -->
I used a web chat assistant to help me fix PowerShell errors when setting up the environment and to format the Markdown tables in sections 3, 7, and 8 so they pass the checker.

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain both bugs and both fixes — which line, why it was wrong, which test proves the
fix — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
I initially applied the BUG-A fix backwards (changing `<` to `<=` instead of the other way around), which caused the tests to still fail. After seeing the test failures, I reviewed the code myself and fixed the comparison operators correctly.

Signed: Tomiris Zhazykbayeva
Date: 2026-11-08