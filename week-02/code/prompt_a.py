"""Analyze student marks from a CSV file.

Expected CSV format:
    name,Math,Science,English,History
    Alice,85,92,78,88

Usage:
    python analyze_marks.py [marks.csv]
"""

import csv
import statistics
import sys
from collections import Counter
from pathlib import Path

DEFAULT_CSV = Path(__file__).parent / "marks.csv"
SUBJECTS_DEFAULT = ["Math", "Science", "English", "History"]


def generate_sample_csv(path: Path) -> None:
    rows = [
        ("Alice", 85, 92, 78, 88),
        ("Bob", 72, 65, 80, 74),
        ("Charlie", 95, 88, 91, 93),
        ("Diana", 60, 58, 70, 65),
        ("Ethan", 78, 82, 85, 80),
        ("Fiona", 90, 87, 92, 89),
        ("George", 55, 62, 58, 60),
        ("Hannah", 88, 91, 84, 86),
        ("Ian", 70, 75, 68, 72),
        ("Julia", 93, 89, 95, 91),
    ]
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["name", *SUBJECTS_DEFAULT])
        w.writerows(rows)


def load_marks(path: Path):
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        subjects = [c for c in reader.fieldnames if c != "name"]
        students = []
        for row in reader:
            students.append({
                "name": row["name"].strip(),
                "marks": {s: float(row[s]) for s in subjects},
            })
    return subjects, students


def grade(avg: float) -> str:
    if avg >= 90:
        return "A"
    if avg >= 80:
        return "B"
    if avg >= 70:
        return "C"
    if avg >= 60:
        return "D"
    return "F"


def analyze(subjects, students):
    all_marks = [m for s in students for m in s["marks"].values()]
    print(f"Students: {len(students)}   Subjects: {len(subjects)}\n")

    print("Per-student results")
    print("-" * 62)
    print(f"{'Name':<12}{'Average':>10}{'Total':>10}{'Grade':>8}   Status")
    ranked = []
    for s in students:
        marks = list(s["marks"].values())
        avg = statistics.mean(marks)
        failed = [sub for sub, v in s["marks"].items() if v < 40]
        ranked.append((s["name"], avg, sum(marks), failed))
    ranked.sort(key=lambda r: r[1], reverse=True)
    for name, avg, total, failed in ranked:
        status = "FAIL: " + ", ".join(failed) if failed else "Pass"
        print(f"{name:<12}{avg:>10.2f}{total:>10.1f}{grade(avg):>8}   {status}")

    print("\nPer-subject statistics")
    print("-" * 62)
    print(f"{'Subject':<12}{'Mean':>9}{'Median':>9}{'Min':>7}{'Max':>7}{'StdDev':>9}")
    for sub in subjects:
        vals = [s["marks"][sub] for s in students]
        sd = statistics.stdev(vals) if len(vals) > 1 else 0.0
        print(f"{sub:<12}{statistics.mean(vals):>9.2f}{statistics.median(vals):>9.2f}"
              f"{min(vals):>7.1f}{max(vals):>7.1f}{sd:>9.2f}")

    print("\nClass summary")
    print("-" * 62)
    print(f"Overall mean:   {statistics.mean(all_marks):.2f}")
    print(f"Overall median: {statistics.median(all_marks):.2f}")
    print(f"Highest:        {max(all_marks):.1f}   Lowest: {min(all_marks):.1f}")
    print(f"Pass rate:      {sum(1 for _, _, _, f in ranked if not f)}/{len(ranked)}")
    print(f"Top scorer:     {ranked[0][0]} ({ranked[0][1]:.2f})")
    print(f"Needs support:  {ranked[-1][0]} ({ranked[-1][1]:.2f})")

    print("\nGrade distribution")
    print("-" * 62)
    dist = Counter(grade(avg) for _, avg, _, _ in ranked)
    for g in "ABCDF":
        bar = "#" * dist.get(g, 0)
        print(f"{g}: {bar or '-'} ({dist.get(g, 0)})")


def main():
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_CSV
    if not path.exists():
        print(f"No CSV found at {path.name}; generating sample data.\n")
        generate_sample_csv(path)
    subjects, students = load_marks(path)
    analyze(subjects, students)


if __name__ == "__main__":
    main()