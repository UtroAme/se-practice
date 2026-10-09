from typing import Sequence, Tuple

def can_book(
    start: int,
    end: int,
    now: int,
    blocked: bool,
    existing: Sequence[Tuple[int, int]],
) -> bool:
    """Decide whether [start, end) can be booked; intervals are half-open."""
    if not 0 <= start < end <= 1440:
        return False
    if start <= now:
        return False
    if end - start > 120:
        return False
    if blocked:
        return False
    for booked_start, booked_end in existing:
        if start < booked_end and booked_start < end:
            return False
    return True