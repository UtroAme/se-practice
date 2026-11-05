def can_book(start, end, now, blocked, existing):
    """Return True only when AC1-AC4 all hold; never mutate existing."""
    # AC1: integer minutes, 0 <= start < end <= 1440
    if not (0 <= start < end <= 1440):
        return False
    # AC1: start strictly after now
    if start <= now:
        return False
    # AC2: duration at most 120 minutes
    if end - start > 120:
        return False
    # AC3: a blocked room accepts nothing
    if blocked:
        return False
    # AC4: no overlap; touching endpoints are allowed
    for s, e in existing:
        if start < e and s < end:
            return False
    return True