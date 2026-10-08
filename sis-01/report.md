# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.2

---

## 1. Scenario

**Question:** Compare who controls requirements and product changes in generic versus custom software, and the consequences for users. The comparison uses Unreal Engine (generic) and PlatinumEngine (custom) in action-game development.

**Users:** Game developers — programmers, artists, level designers; indirectly players ( studio "ToRa").

**Problem:** A mid-sized studio must choose between Unreal Engine and building its own. The choice affects who controls engine features and how fast new ideas can be added.

**Constraints:** 
1. Limited budget: a custom engine needs 6–7 programmers and about 2 years (budget $5M).
2. A 3-year deadline; if the engine is not ready in time, the game misses its release.

**Risk:**  If ToRa underestimates engine development time, the project may be cancelled and the left without a product.

**Assumptions:** Studio "ToRa" and the $5M budget are fictional. Unreal Engine and PlatinumEngine are real products; PlatinumGames' reasons for a custom engine are documented in a 2020 interview (Gematsu, 2020-03-12).

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

The defining difference between generic and custom software is who controls requirements and product changes. With generic software, the vendor sets the roadmap and the customer waits; with custom software, the commissioning organisation owns the requirements. Comparing Unreal Engine and PlatinumEngine in ToRa's scenario shows that this binary is useful but incomplete, because Unreal is source-available: licensees receive full C++ source access and may fork and modify the engine for their own product (Epic Games, "Unreal Engine on GitHub", accessed 2026-10-08). Unreal therefore occupies a middle ground — vendor-controlled roadmap plus limited local control.
The cost structures are asymmetric. PlatinumEngine's cost is a development cost paid against the fixed budget regardless of outcome. Unreal is free until a product earns $1M lifetime gross revenue, after which a 5% royalty applies to the excess (Epic Games, "Unreal Engine Licensing Options", accessed 2026-10-08). The comparison is indeterminate without a revenue assumption: a hit title pays more in royalty than a custom engine would cost, while a modest title pays nothing.
Two engineering decisions follow. First, ToRa should treat maintenance as a lifetime obligation, not a launch task. Epic continues to support Unreal, including platform updates for new consoles and OS changes, while a custom engine's maintenance falls entirely on ToRa's 6–7 programmers, competing with DLC and sequels. The same control that lets ToRa change anything means ToRa must fix everything. Second, ToRa should choose a custom engine only if it has a requirement that cannot be met even by modifying Unreal's source, or where fork-maintenance cost approaches the cost of owning the engine. Candidate requirements for an action game include a proprietary rollback networking model, strict frame-time determinism, or a bespoke animation system.
Two trade-offs shape the decision. Generic software transfers schedule risk to the vendor but creates dependency on their roadmap and royalty model. Custom software removes that dependency but concentrates schedule risk on ToRa: a 2-year engine build inside a 3-year project leaves little margin, and "first release" is not the same as production-ready. The learning curve for Unreal is also a real cost inside the same 3-year window.
For ToRa's developer-users, generic software means adapting to a mature tool, while custom software means a tool adapted to them but maintained by them. For players, generic software means a battle-tested engine with vendor-supported updates; a rushed custom engine risks bugs and missed releases.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

Prompt B produced eight concerns. I accepted most of them because they identified real gaps, but I qualified two and rejected none of the critique itself.

The strongest concern was that the draft treats Unreal as a pure generic product when it is source-available. I checked Epic's own GitHub page (Epic Games, "Unreal Engine on GitHub", accessed 2026-10-08) and confirmed that licensees receive full C++ source access and may fork and modify the engine for their own product. This directly contradicts the draft's claim that customers "can only wait for an update, build a workaround, or accept the limitation". I therefore rejected that claim (verification row 2) and revised the analysis to describe Unreal as a middle ground between generic and custom.

The second concern was about cost. The draft stated that Unreal keeps ToRa within its $5M budget without checking the royalty model. I checked Epic's licensing FAQ (Epic Games, "Unreal Engine Licensing FAQ", accessed 2026-10-08) and confirmed the 5% royalty above $1M gross revenue, with exemptions for Epic Games Store sales and a reduced 3.5% rate under "Launch Everywhere with Epic". I kept the budget point but qualified it: Unreal is free until ToRa earns $1M, after which royalty becomes a real cost (verification row 1).

I accepted three further points: the internal-engine definition stretches the textbook generic/custom binary; maintenance after release falls entirely on ToRa; and the "unique requirement" caveat needs concrete examples instead of rhetoric. I qualified the arithmetic concern (6–7 programmers × 2 years may not fit $5M) because it depends on salary assumptions I cannot verify.

These decisions produced two substantive revisions, recorded in the change log (change-log rows 1 and 2).

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

For a fictional 50-employee studio on a fixed 3-year deadline, the safer choice is Unreal Engine, not a custom engine. Unreal is free until $1M gross revenue, receives continuous platform support from Epic, and — because it is source-available — can be modified where ToRa has a specific need. A custom engine concentrates too much schedule risk: 6–7 programmers for 2 years leaves little margin, and maintenance continues indefinitely after release.
The main limitation of this recommendation is that it depends on unverifiable assumptions. The scenario does not supply a revenue projection, so the budget comparison stays indeterminate. It also does not identify a concrete requirement that Unreal cannot meet even with source modification. If ToRa does have such a requirement, the custom path may still be justified. Finally, the 3-year deadline is fictional; a longer horizon or larger team could change the balance.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

The most surprising thing was that Unreal is not a pure generic product — it is source-available, so the generic/custom distinction is not clean. I was searching about PlatinumEngine earlier and did not know about the Unreal source availability on GitHub. I changed my draft from saying customers can only wait for updates to saying they can also modify the engine themselves.
I also did not know about the license terms — especially the royalty part. I read about the real reasons a huge company like PlatinumGames created a custom engine that specialises in action games. Prompt B helped me see small problems that I might forget to check manually. In conclusion, a company that is just starting does not need a custom engine.
I also learned that you should always check sources manually, because AI can give a false link that does not work. Next time I would verify sources before writing the analysis, not after, so the first draft is already grounded.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- Epic Games. "Unreal Engine Licensing FAQ". https://www.unrealengine.com/license. Accessed 2026-10-08.
- Epic Games. "Unreal Engine on GitHub". https://www.unrealengine.com/ue-on-github.  Accessed 2026-10-08.
- Gematsu. "PlatinumGames developing in-house PlatinumEngine". https://www.gematsu.com/2020/03/platinumgames-developing-in-house-platinumengine?__cf_chl_tk=bX6g6xluxWcU_0GleRFjy4R7jovg0dzMizEXW6aFExU-1791387759-1.0.1.1-foUUXszf9BN5CafRiwwxpb.ciVx.l_gxV.h1qq_znAI. Accessed 2026-10-08.

## 7. Appendix A — Initial outline

1. Generic software is controlled by another company (Epic Games); custom software is controlled by your own studio.
2. In generic software you cannot add your own features — you can only wait for the vendor's updates or patches.
3. You spend a lot of money and time on custom software, but you get the features that you need.
4. Generic - dependence on another company; custom - dependence on your own resources.
5. Generic is cheaper and faster for companies that are just starting; custom is expensive but gives special features for a niche sector.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** Qoder
- **Model:** Qwen3.8-Max
- **Date:** 2026-10-08
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.2 — Generic and custom software: compare who controls requirements and product changes in generic versus custom software, and explain the consequences for users — for a first-year-level university assignment.

My scenario is a fictional mid-sized game studio called "ToRa" (fictional, 50 employees) that must choose between using Unreal Engine (generic) and building a custom engine like PlatinumEngine (custom). Users are game developers — programmers, artists, level designers — and indirectly players. The problem is that the choice affects who controls engine features, how fast new ideas can be added, and what constraints the team faces. Constraints: (1) limited budget — a custom engine requires 6–7 programmers and about 2 years before the first release (fictional budget: $5M); (2) a 3-year project deadline, so if the engine is not ready on time the game misses its release (fictional). Risk: if the studio chooses a custom engine but underestimates development time, the project may be cancelled and the team left without a product. My initial ideas are: 1) Generic software is controlled by another company (Epic Games); custom software is controlled by your own studio. 2) In generic software you cannot add your own features — you can only wait for the vendor's updates or patches. 3) You spend a lot of money and time on custom software, but you get the features that you need. 4) Generic — dependence on another company; custom — dependence on your own resources. 5) Generic is cheaper and faster for companies that are just starting; custom is expensive but gives special features for a niche sector.

Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
Here's a tutor-style breakdown for your assignment.

Draft explanation (~470 words)

The core distinction: who controls requirements and product changes

Software engineering distinguishes generic software — a single product developed by one organisation and sold to many customers — from custom (bespoke) software — a system commissioned and developed for one specific customer. The defining difference is who controls the requirements and the resulting changes to the product.

With generic software, control sits with the vendor. A company like Epic Games decides which features Unreal Engine gets, in what order, and on what schedule. Individual customers cannot direct those decisions; they can only request them and wait for a future release. With custom software, control sits with the commissioning organisation. Your studio would own the requirements and could change the product whenever it chose.

Applying this to ToRa

If ToRa uses Unreal Engine, it gains a mature, feature-rich engine immediately and stays within its limited $5M budget. Programmers, artists, and level designers get industry-standard tooling, documentation, and support from day one. The cost is loss of control: if ToRa needs an engine feature Epic has not built — or has prioritised differently — the studio must wait for an update, build a workaround, or accept the limitation. Its schedule is partly governed by someone else's roadmap.

If ToRa builds PlatinumEngine, it controls every requirement and can add exactly the features its teams need, tailored to its niche. This is powerful but expensive and slow: 6–7 programmers and roughly two years before a first release, against a three-year project deadline. Only about one year would remain to actually build the game.

Consequences for users

For internal users (the developers), generic software means adapting their workflow to the tool, while custom software means the tool adapts to them — but they also carry the burden of maintaining and debugging it. For players (indirect users), generic software usually means a more reliable, battle-tested engine; a rushed custom engine risks bugs and a missed release.

The central trade-off

The choice trades control and fit against cost, time, and risk. Generic software reduces cost and schedule risk but cedes control of the roadmap. Custom software maximises control and specialisation but concentrates schedule risk — if ToRa underestimates development time, the project could be cancelled and the team left with no product. For a 50-person studio on a fixed deadline and budget, the safer path is usually the generic engine, unless ToRa has a genuinely unique requirement that Unreal cannot meet.

---

Facts vs. assumptions

Facts (general software-engineering principles, safe to state):
Generic software is one product sold to many customers; the vendor controls requirements and changes.
Custom software is developed for a single customer, who controls requirements and changes.
Vendor control means customers cannot force feature additions and must wait for releases.

Assumptions specific to your fictional scenario (label these as such in your write-up):
The $5M budget, 6–7 programmers, ~2-year engine timeline, and 3-year deadline are all your invented figures. Present them as scenario premises, not real-world data.
"Only ~1 year left for the game" is your arithmetic inference — reasonable, but flag it as an estimate.
That Unreal lacks a feature ToRa needs is hypothetical; you haven't identified a concrete missing feature.

Trade-offs to make explicit
Cost/time vs. control/fit — the main axis.
Risk profile: generic = dependency on vendor roadmap; custom = dependency on your own resources and schedule estimates.
Maintenance: custom software carries long-term upkeep that generic software offloads to the vendor.

Claims you should verify before submitting
The textbook definitions — confirm the exact "generic vs. custom" wording and the "who controls requirements" framing against your assigned course text (I've given the standard idea, not a quotation).
Unreal Engine licensing/cost — if you claim it's "cheap," check Epic's actual royalty/licence model rather than assuming zero cost.
Your internal numbers — keep the budget/staff/timeline consistent everywhere they appear.
Whether a real feature gap exists — if your argument leans on "Unreal can't do X," find a concrete example or soften the claim.

I deliberately did not add quotations, references, or page numbers. Want me to tighten this to exactly 400 words, or reshape it into essay paragraphs with an intro and conclusion?
```

### B2 — Critique (Prompt B)

- **Tool:** Qoder
- **Model:** Qwen3.8-Max
- **Date:** 2026-10-08
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: Compare who controls requirements and product changes in generic versus custom software, and explain the consequences for users. The comparison uses Unreal Engine (generic) and PlatinumEngine (custom) in action-game development. Scenario: A fictional mid-sized game studio "ToRa" (fictional) must choose between using Unreal Engine (generic) and building a custom engine like PlatinumEngine (custom). Users are game developers — programmers, artists, level designers — and indirectly players. Constraints: (1) limited budget — a custom engine needs 6–7 programmers and about 2 years (fictional budget: $5M); (2) a 3-year deadline, so if the engine is not ready in time the game misses its release (fictional). Risk: if ToRa underestimates engine development time, the project may be cancelled. Draft: Here's a tutor-style breakdown for your assignment.

Draft explanation (~470 words)

The core distinction: who controls requirements and product changes

Software engineering distinguishes generic software — a single product developed by one organisation and sold to many customers — from custom (bespoke) software — a system commissioned and developed for one specific customer. The defining difference is who controls the requirements and the resulting changes to the product.

With generic software, control sits with the vendor. A company like Epic Games decides which features Unreal Engine gets, in what order, and on what schedule. Individual customers cannot direct those decisions; they can only request them and wait for a future release. With custom software, control sits with the commissioning organisation. Your studio would own the requirements and could change the product whenever it chose.

Applying this to ToRa

If ToRa uses Unreal Engine, it gains a mature, feature-rich engine immediately and stays within its limited $5M budget. Programmers, artists, and level designers get industry-standard tooling, documentation, and support from day one. The cost is loss of control: if ToRa needs an engine feature Epic has not built — or has prioritised differently — the studio must wait for an update, build a workaround, or accept the limitation. Its schedule is partly governed by someone else's roadmap.

If ToRa builds PlatinumEngine, it controls every requirement and can add exactly the features its teams need, tailored to its niche. This is powerful but expensive and slow: 6–7 programmers and roughly two years before a first release, against a three-year project deadline. Only about one year would remain to actually build the game.

Consequences for users

For internal users (the developers), generic software means adapting their workflow to the tool, while custom software means the tool adapts to them — but they also carry the burden of maintaining and debugging it. For players (indirect users), generic software usually means a more reliable, battle-tested engine; a rushed custom engine risks bugs and a missed release.

The central trade-off

The choice trades control and fit against cost, time, and risk. Generic software reduces cost and schedule risk but cedes control of the roadmap. Custom software maximises control and specialisation but concentrates schedule risk — if ToRa underestimates development time, the project could be cancelled and the team left with no product. For a 50-person studio on a fixed deadline and budget, the safer path is usually the generic engine, unless ToRa has a genuinely unique requirement that Unreal cannot meet.

---

Facts vs. assumptions

Facts (general software-engineering principles, safe to state):
Generic software is one product sold to many customers; the vendor controls requirements and changes.
Custom software is developed for a single customer, who controls requirements and changes.
Vendor control means customers cannot force feature additions and must wait for releases.

Assumptions specific to your fictional scenario (label these as such in your write-up):
The $5M budget, 6–7 programmers, ~2-year engine timeline, and 3-year deadline are all your invented figures. Present them as scenario premises, not real-world data.
"Only ~1 year left for the game" is your arithmetic inference — reasonable, but flag it as an estimate.
That Unreal lacks a feature ToRa needs is hypothetical; you haven't identified a concrete missing feature.

Trade-offs to make explicit
Cost/time vs. control/fit — the main axis.
Risk profile: generic = dependency on vendor roadmap; custom = dependency on your own resources and schedule estimates.
Maintenance: custom software carries long-term upkeep that generic software offloads to the vendor.

Claims you should verify before submitting
The textbook definitions — confirm the exact "generic vs. custom" wording and the "who controls requirements" framing against your assigned course text (I've given the standard idea, not a quotation).
Unreal Engine licensing/cost — if you claim it's "cheap," check Epic's actual royalty/licence model rather than assuming zero cost.
Your internal numbers — keep the budget/staff/timeline consistent everywhere they appear.
Whether a real feature gap exists — if your argument leans on "Unreal can't do X," find a concrete example or soften the claim.

I deliberately did not add quotations, references, or page numbers. Want me to tighten this to exactly 400 words, or reshape it into essay paragraphs with an intro and conclusion?
```

**Response:**

```text
Here's a critical review of the draft against your question and scenario. I've organized concerns by severity.

---

Unreal Engine "stays within its limited $5M budget" — unsupported and possibly wrong

The problem: The draft asserts Unreal keeps ToRa within budget without examining Unreal's actual cost model. Unreal Engine is free upfront but takes 5% royalty on gross product revenue above $1M lifetime (for games). On a hypothetical hit title, that could vastly exceed $5M — meaning the "$5M budget" framing doesn't even apply the same way to both options. Custom engine costs are development costs; Unreal's costs are largely revenue-contingent.

Why it matters: The scenario's constraint (1) is a limited budget, and the draft treats the budget comparison as settled when it's actually the weakest-supported claim in the piece. A marker could reasonably ask "on what basis?"

How to check: Epic's current EULA / royalty FAQ. Also check whether royalty terms changed recently (they've been revised before, e.g., the 2023 Unreal Engine subscription proposal that was walked back after backlash — itself a great counterexample, see #2).

Counterexample/alternative: The 2023 "Unreal Engine subscription" announcement showed Epic unilaterally attempting to change pricing mid-stream — evidence that vendor control cuts both ways and that generic-software cost isn't as stable as the draft implies.

---

Vendor control is presented as one-directional — misses the feedback channel

The problem: "Individual customers cannot direct those decisions; they can only request them and wait." This overstates passivity and ignores that Unreal Engine is source-available — licensees get full C++ source and can modify the engine locally themselves.

Why it matters: This is arguably the single most important omission for your specific scenario. Source access means Unreal occupies a middle ground: ToRa gets vendor-controlled roadmap plus the ability to make custom changes itself (at the cost of maintaining a fork). The clean generic/custom binary the draft relies on doesn't map neatly onto Unreal.

How to check: Epic's documentation on source code access and the GitHub-linked repository requirements.

Counterexample: Many studios ship modified engine forks (e.g., custom render pipelines layered on Unreal). The draft's claim "must wait for an update, build a workaround, or accept the limitation" omits "patch the engine yourself" — which is a workaround of a very different, more powerful kind.

---

The custom-software definition is stretched by the scenario itself

The problem: The draft defines custom software as "commissioned and developed for one specific customer" with control sitting with "the commissioning organisation." But ToRa building PlatinumEngine is in-house development, not commissioning — ToRa is both developer and customer. The classic textbook (Sommerville-style) distinction assumes a separate client organization.

Why it matters: The question asks you to apply the generic/custom distinction, and the honest answer is that an internal engine partially collapses the distinction: there's no vendor–customer negotiation because the roles merge. A strong write-up should acknowledge this rather than paper over it.

How to check: Your assigned course text's exact wording — does it define custom software by who commissions it or by how many customers it serves? The two definitions give different answers here.

Alternative interpretation: Under a "single customer" definition, PlatinumEngine is cleanly custom. Under a "commissioned from a supplier" definition, it's an edge case. State which definition you're using.

---

"6–7 programmers and 2 years before a first release" — timeline arithmetic is shakier than flagged

The problem: The draft flags "~1 year left for the game" as an estimate but doesn't examine the deeper issue: 6–7 engine programmers for 2 years, at plausible salaries, likely consumes most or all of the $5M by itself — before any game-developer salaries, art, audio, marketing. And "first release" of an engine ≠ production-ready engine; games are typically built against stabilized engines, which takes longer.

Why it matters: The scenario's stated risk is underestimating engine time. The draft mentions the risk but doesn't do the arithmetic that would make it vivid — the two fictional constraints ($5M and 2 years × 6–7 staff) may be mutually inconsistent, which is itself an analytically interesting point.

How to check: Rough back-of-envelope: 7 programmers × 2 years × a loaded salary — does it fit $5M alongside everything else? Also check real-world datapoints: how long custom engines actually took (e.g., id Tech iterations, or studios that abandoned in-house engines).

Counterexample: Several studios that built custom engines found the engine never "finished" — feature development competed with maintenance indefinitely, eroding the game timeline continuously rather than in one clean 2-year block.

---

"Generic software usually means a more reliable, battle-tested engine" — vague and one-sided

The problem: "Usually" is doing a lot of work. Unreal is battle-tested, but generic software has its own reliability risks for a licensee: forced upgrades, deprecated features, bugs introduced in new versions that Epic prioritizes fixing on its schedule.

Why it matters: The draft's consequence analysis for players leans on this claim, and it's the kind of generalization a marker will probe.

How to check: Search Unreal's issue tracker / release notes for regressions in major versions; look for postmortems of games broken by engine upgrades.

Counterexample: Unity's 2023 Runtime Fee debacle — a generic vendor announcing retroactive-feeling pricing changes with bugs in the announcement itself — shows generic vendors can destabilize licensees' projects in ways custom in-house tools cannot.

---

Missing reasoning: the "unique requirement" escape hatch is undefined

The problem: The conclusion says the safer path is generic "unless ToRa has a genuinely unique requirement that Unreal cannot meet" — but the draft never characterizes what such a requirement would look like for an action game specifically.

Why it matters: The question asks about consequences for users; the strongest version identifies concrete candidates (e.g., a proprietary networking model, extreme frame-time determinism for competitive play, a bespoke animation system) and explains why Unreal's architecture might not accommodate them even with source access. Without this, the caveat is rhetorical filler.

How to check: Look at which action-game franchises actually use custom engines and why — their stated reasons are your best evidence for what Unreal can't do. Note that the answer has shifted over time: fewer AAA studios maintain custom engines now than a decade ago, which cuts against the custom option.

---

Missing dimension: consequences extend past the deadline

The problem: The draft analyzes within the 3-year window but barely touches the long tail: after release, Unreal gets continued support and platform updates (new console generations, OS changes) from Epic; PlatinumEngine's maintenance burden falls entirely on ToRa's 6–7 programmers forever, competing with DLC and sequel development.

Why it matters: The scenario risk is cancellation, but a subtler consequence is that custom-software control persists as an obligation — the same control that lets ToRa change anything also means ToRa must fix everything, indefinitely. The "Facts vs assumptions" section lists maintenance as a trade-off, but the main explanation underdevelops it.

How to check: Any software engineering text's treatment of maintenance costs (commonly cited as the dominant share of lifetime cost); real studios that retired custom engines and why.

---

Minor issues

"Mature, feature-rich... from day one" — true but uncited; also slightly unfair: Unreal's learning curve is a real cost to the developer-users that the draft omits. Artists and level designers don't get productive instantly.
"50-person studio" — appears once in the conclusion but is never established in the scenario. Either derive it from the constraints (6–7 of them being engine programmers implies a certain total) or label it as your assumption.
The "Facts" section labels vendor-control claims as facts — these are textbook generalizations, true by definition within the course framework but with real-world exceptions (open-source generic software, source-available engines like Unreal). Consider hedging the heading.
Users' perspective is thin for artists/level designers specifically — the draft lumps all internal users together. Tooling quality for non-programmers (editors, asset pipelines) differs meaningfully between a mature generic engine and a 2-year-old in-house one, and that's a direct consequence for a named user group in your scenario.

---

Suggested verification priorities

Unreal's current royalty terms and source-access rights (affects #1, #2 — the two biggest weaknesses).
Your course text's exact generic/custom definitions (affects #3 — determines whether the whole framing needs a caveat).
One concrete real-world example of a custom engine's schedule overrun or abandonment (strengthens #4 and the risk analysis).

Overall the draft is structurally sound and correctly identifies the control-of-requirements axis, but it treats Unreal as a pure generic product when it's source-available (blurring the binary), asserts budget safety without checking the royalty model, and leaves the maintenance long tail and the "unique requirement" caveat underdeveloped. Want me to revise the draft to address these?
```

### B3 — Revision (Prompt C)

- **Tool:** Qoder
- **Model:** Qwen3.8-Max
- **Date:** 2026-10-08
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: I accepted most of Prompt B's critique. Specifically:
1. ACCEPTED: The draft treats Unreal as a pure generic product, but Unreal is source-available. Licensees can fork and modify the engine. I rejected the draft's claim that customers "can only wait for an update, build a workaround, or accept the limitation" — they can also patch the engine themselves.
2. ACCEPTED (qualified): The draft says Unreal "stays within $5M budget" without checking the royalty model. I verified the royalty terms and qualified this point: Unreal is free until $1M gross revenue, then 5% royalty applies above that.
3. ACCEPTED: The internal-engine scenario stretches the textbook generic/custom definition, because ToRa is both developer and customer. Add a caveat about this.
4. QUALIFIED: The arithmetic concern (6–7 programmers × 2 years may not fit $5M) depends on unverifiable salary assumptions, so mention it only as a risk, not as a fact.
5. ACCEPTED: The "unique requirement" caveat needs concrete examples instead of rhetoric.
6. ACCEPTED: Maintenance after release falls entirely on ToRa and competes with future projects. Develop this point.
7. ACCEPTED: The learning curve for Unreal is a real cost to developer-users; mention it.
8. ACCEPTED: Remove the unsupported "50-person studio" figure or label it as an assumption.

Verified evidence:
- Epic Games, "Unreal Engine Licensing Options" (unrealengine.com/license, accessed 2026-10-08): products pay 5% royalty only after exceeding $1M lifetime gross revenue. First $1M is exempt. Epic Games Store sales are royalty-free; "Launch Everywhere with Epic" reduces the rate to 3.5%.
- Epic Games, "Unreal Engine on GitHub" (unrealengine.com/ue-on-github, accessed 2026-10-08): Epic provides full C++ source access. Licensees may fork, modify, and extend the engine for their own product. It is source-available, not open-source: reselling the engine itself is not allowed.

Draft: Here's a tutor-style breakdown for your assignment.

Draft explanation (~470 words)

The core distinction: who controls requirements and product changes

Software engineering distinguishes generic software — a single product developed by one organisation and sold to many customers — from custom (bespoke) software — a system commissioned and developed for one specific customer. The defining difference is who controls the requirements and the resulting changes to the product.

With generic software, control sits with the vendor. A company like Epic Games decides which features Unreal Engine gets, in what order, and on what schedule. Individual customers cannot direct those decisions; they can only request them and wait for a future release. With custom software, control sits with the commissioning organisation. Your studio would own the requirements and could change the product whenever it chose.

Applying this to ToRa

If ToRa uses Unreal Engine, it gains a mature, feature-rich engine immediately and stays within its limited $5M budget. Programmers, artists, and level designers get industry-standard tooling, documentation, and support from day one. The cost is loss of control: if ToRa needs an engine feature Epic has not built — or has prioritised differently — the studio must wait for an update, build a workaround, or accept the limitation. Its schedule is partly governed by someone else's roadmap.

If ToRa builds PlatinumEngine, it controls every requirement and can add exactly the features its teams need, tailored to its niche. This is powerful but expensive and slow: 6–7 programmers and roughly two years before a first release, against a three-year project deadline. Only about one year would remain to actually build the game.

Consequences for users

For internal users (the developers), generic software means adapting their workflow to the tool, while custom software means the tool adapts to them — but they also carry the burden of maintaining and debugging it. For players (indirect users), generic software usually means a more reliable, battle-tested engine; a rushed custom engine risks bugs and a missed release.

The central trade-off

The choice trades control and fit against cost, time, and risk. Generic software reduces cost and schedule risk but cedes control of the roadmap. Custom software maximises control and specialisation but concentrates schedule risk — if ToRa underestimates development time, the project could be cancelled and the team left with no product. For a 50-person studio on a fixed deadline and budget, the safer path is usually the generic engine, unless ToRa has a genuinely unique requirement that Unreal cannot meet.

---

Facts vs. assumptions

Facts (general software-engineering principles, safe to state):
Generic software is one product sold to many customers; the vendor controls requirements and changes.
Custom software is developed for a single customer, who controls requirements and changes.
Vendor control means customers cannot force feature additions and must wait for releases.

Assumptions specific to your fictional scenario (label these as such in your write-up):
The $5M budget, 6–7 programmers, ~2-year engine timeline, and 3-year deadline are all your invented figures. Present them as scenario premises, not real-world data.
"Only ~1 year left for the game" is your arithmetic inference — reasonable, but flag it as an estimate.
That Unreal lacks a feature ToRa needs is hypothetical; you haven't identified a concrete missing feature.

Trade-offs to make explicit
Cost/time vs. control/fit — the main axis.
Risk profile: generic = dependency on vendor roadmap; custom = dependency on your own resources and schedule estimates.
Maintenance: custom software carries long-term upkeep that generic software offloads to the vendor.

Claims you should verify before submitting
The textbook definitions — confirm the exact "generic vs. custom" wording and the "who controls requirements" framing against your assigned course text (I've given the standard idea, not a quotation).
Unreal Engine licensing/cost — if you claim it's "cheap," check Epic's actual royalty/licence model rather than assuming zero cost.
Your internal numbers — keep the budget/staff/timeline consistent everywhere they appear.
Whether a real feature gap exists — if your argument leans on "Unreal can't do X," find a concrete example or soften the claim.

I deliberately did not add quotations, references, or page numbers. Want me to tighten this to exactly 400 words, or reshape it into essay paragraphs with an intro and conclusion?

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
Here's the revised draft with your decisions applied. Sources are limited to the two Epic Games pages you verified; everything else is either a general software-engineering principle or a flagged scenario assumption.

---

Revised explanation (~510 words)

The core distinction: who controls requirements and product changes

Software engineering distinguishes generic software — a single product developed by one organisation and sold to many customers — from custom (bespoke) software — a system developed for one specific customer. The defining difference is who controls the requirements and the resulting changes.

With generic software, control sits with the vendor: Epic Games decides which features Unreal Engine gets, in what order, and on what schedule. With custom software, control sits with the commissioning organisation, which owns the requirements and can change the product whenever it chooses.

A caveat on the definitions

The textbook generic/custom split assumes developer and customer are different organisations. ToRa's internal-engine option blurs this: ToRa would be both developer and sole customer of PlatinumEngine. It is still meaningfully "custom" in that ToRa controls the requirements, but the clean vendor-vs-customer framing does not map perfectly onto an in-house tool. Treat the definitions as a lens, not a strict category.

Applying this to ToRa — Unreal Engine (generic)

Unreal gives ToRa a mature, feature-rich engine immediately, with industry-standard tooling and documentation. On cost, Unreal is not simply "free": per Epic's licensing terms, products pay no royalty on the first $1M of lifetime gross revenue, then 5% above that threshold (Epic Games Store sales are royalty-free, and "Launch Everywhere with Epic" reduces the rate to 3.5%). Whether this keeps ToRa inside a $5M budget depends on projected revenue, which the scenario does not specify.

The classic cost of generic software is loss of roadmap control — but Unreal is source-available, not a closed product. Epic provides full C++ source access, and licensees may fork, modify, and extend the engine for their own product. So ToRa is not limited to waiting for an update, building a workaround, or accepting a limitation: it can patch the engine itself. (It cannot resell the engine — source-available is not open-source.) The residual constraint is narrower: ToRa's own engine changes would not benefit from Epic's future updates, and forking carries its own cost and learning curve.

Applying this to ToRa — PlatinumEngine (custom)

ToRa would control every requirement and tailor the engine to its niche. But 6–7 programmers over ~2 years, against a 3-year deadline, leaves roughly one year to build the actual game. Risk to flag, not assert: 6–7 engineers for two years may strain a $5M budget depending on salary assumptions the scenario does not give — worth noting as a cost risk rather than a stated fact.

Consequences for users

For the developers (internal users), a custom engine means the tool adapts to them, but they carry full maintenance and debugging burden. With Unreal they adapt to the tool and face a real learning curve — an upfront productivity cost for programmers, artists, and level designers. For players (indirect users), generic software usually means a battle-tested engine; a rushed custom engine risks bugs and a missed release.

Maintenance — the long tail

This is where custom software diverges most sharply. After release, PlatinumEngine's upkeep — bug fixes, platform updates, tooling compatibility — falls entirely on ToRa, and that work competes directly with future game projects for the same engineers. Unreal offloads much of this to Epic. This ongoing cost often outweighs the initial build estimate and should be central to the decision, not a footnote.

The central trade-off

The choice trades control and fit against cost, time, risk, and long-term maintenance. For a studio on a fixed deadline and budget (note: the "50-person studio" figure was unsupported — either cite a scenario source or drop it), the generic engine is usually the safer path unless ToRa has a concrete requirement Unreal cannot meet — for example a bespoke netcode/rollback model for a specific competitive genre, a custom rendering path for a distinctive art style, or deep proprietary tooling integration. These are illustrative categories, not verified ToRa needs: your argument should name a specific gap or soften the claim.

---

What changed and why

#  Your decision  Change made

1  Unreal is source-available; reject "can only wait/workaround/accept"  Rewrote the generic-software limitation: added full C++ source access, right to fork/modify/extend, and the "can patch it themselves" option. Kept the narrower real constraint (no benefit from future updates; can't resell).
2  Qualified royalty model  Replaced "stays within its limited $5M budget" with Epic's actual terms (5% above $1M; EGS royalty-free; 3.5% "Launch Everywhere"). Noted the budget fit depends on unstated revenue.
3  Internal-engine scenario stretches definitions  Added a "caveat on the definitions" paragraph noting ToRa is both developer and customer.
4  Arithmetic concern as risk, not fact  Moved the "6–7 engineers may strain $5M" point into an explicitly flagged risk, tied to unverifiable salary assumptions.
5  Concrete examples for "unique requirement"  Replaced rhetoric with three illustrative categories (netcode/rollback, custom rendering, proprietary tooling) — labelled illustrative, not verified ToRa needs.
6  Develop post-release maintenance  Added a dedicated "Maintenance — the long tail" section: upkeep falls on ToRa and competes with future projects.
7  Unreal learning curve  Added the learning curve as an upfront productivity cost for developer-users.
8  Remove/label "50-person studio"  Flagged it inline as unsupported — cite a source or drop it.

Sources used: only the two Epic Games pages you supplied (unrealengine.com/license and unrealengine.com/ue-on-github, both accessed 2026-10-08).

Remaining gaps (not invented)

Revenue projection — needed to say whether the 5% royalty actually keeps ToRa within $5M. Not in the scenario.
Salaries / cost basis — required to turn the "budget strain" risk into a fact. Not given.
A concrete Unreal feature gap — your argument still leans on "unless Unreal can't do X"; you have not identified a real one for ToRa.
The "50-person" and staff/timeline figures — confirm these appear consistently and are traceable to your scenario prompt; otherwise label every instance as an assumption.
Textbook definitions — the generic/custom and "who controls requirements" wording should be checked against your assigned course text; I've given the standard idea, not a quotation.

Want me to tighten this to a specific word count, or reshape it into continuous essay paragraphs with an intro and conclusion?
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| Unreal Engine is free upfront but takes 5% royalty on gross revenue above $1M lifetime. | Epic Games, "Unreal Engine Licensing FAQ", https://www.unrealengine.com/license, accessed 2026-10-08, section "Royalty". | The engine is free until a product earns $1M gross revenue; after that, 5% royalty applies only to the amount above $1M. EGS sales are exempt, and "Launch Everywhere with Epic" reduces the rate to 3.5%. | keep |
| Licensees cannot modify Unreal Engine source code. | Epic Games, "Unreal Engine on GitHub", https://www.unrealengine.com/ue-on-github, accessed 2026-10-08, section "Source Code Access". | Licensees get full C++ source access via GitHub and may fork and modify the engine for their own product. It is source-available, not open-source: reselling the engine itself is not allowed. | reject |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "the studio must wait for an update, build a workaround, or accept the limitation" | "the studio can patch the engine itself, but then maintains a fork" | Verification row 2: Epic's GitHub page confirms licensees get full C++ source access and may fork the engine. |
| "stays within its limited $5M budget" | "is free until ToRa earns $1M gross revenue, after which a 5% royalty applies to the excess" | Verification row 1: Epic's licensing FAQ confirms the $1M threshold and 5% royalty above it. |
