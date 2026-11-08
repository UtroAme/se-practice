def _is_minute(value):
    return isinstance(value, int) and not isinstance(value, bool)


def can_book(start, end, now, blocked, existing):
    if not (_is_minute(start) and _is_minute(end) and _is_minute(now)):
        return False
    if not 0 <= start < end <= 1440:
        return False
    if start <= now:
        return False
    if blocked:
        return False
    if end - start > 120:
        return False

    try:
        for s, e in existing:
            if s < end and start < e:
                return False
    except (TypeError, ValueError):
        # Malformed existing entries make AC4 unverifiable, so the request is refused.
        return False
    return True