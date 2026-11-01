import unittest
from booking import can_book

class BookingTests(unittest.TestCase):
    BASE = dict(now=540, blocked=False, existing=[(600, 660)])

    def check(self, start, end, expected, **overrides):
        kw = dict(self.BASE)
        kw.update(overrides)
        existing = kw["existing"]
        snapshot = list(existing)
        result = can_book(start, end, kw["now"], kw["blocked"], existing)
        self.assertIs(result, expected)
        self.assertEqual(existing, snapshot)

    def test_touching_end_is_allowed(self):
        self.check(660, 720, True)

    def test_overlap_is_rejected(self):
        self.check(630, 690, False)

    def test_blocked_room_rejects(self):
        self.check(660, 720, False, blocked=True)

    def test_exactly_120_minutes_is_allowed(self):
        self.check(720, 840, True)

    def test_121_minutes_is_rejected(self):
        self.check(720, 841, False)

    def test_start_at_now_is_rejected(self):
        self.check(540, 570, False)

    def test_reversed_times_are_rejected(self):
        self.check(720, 660, False)

    def test_ends_at_midnight_is_allowed(self):
        self.check(1380, 1440, True)

    def test_past_midnight_is_rejected(self):
        self.check(1380, 1441, False)

    def test_second_booking_is_rejected(self):
        self.check(720, 780, False, existing=[(600, 660), (700, 760)])

    def test_unsorted_existing_is_checked(self):
        self.check(610, 650, False, existing=[(900, 960), (600, 660)])

    def test_negative_start_is_rejected(self):
        self.check(-30, 30, False)

    def test_zero_length_is_rejected(self):
        self.check(700, 700, False)

    def test_inside_existing_is_rejected(self):
        self.check(615, 645, False)

    def test_contains_existing_is_rejected(self):
        self.check(570, 690, False)

if __name__ == "__main__":
    unittest.main()