import unittest
from booking import can_book


class BookingTests(unittest.TestCase):
    # --- six table cases ---
    def test_touching_end_is_allowed(self):
        self.assertIs(can_book(660, 720, 540, False, [(600, 660)]), True)

    def test_overlap_is_rejected(self):
        self.assertIs(can_book(630, 690, 540, False, [(600, 660)]), False)

    def test_blocked_room_is_rejected(self):
        self.assertIs(can_book(660, 720, 540, True, [(600, 660)]), False)

    def test_exactly_two_hours_is_allowed(self):
        self.assertIs(can_book(720, 840, 540, False, [(600, 660)]), True)

    def test_over_two_hours_is_rejected(self):
        self.assertIs(can_book(720, 841, 540, False, [(600, 660)]), False)

    def test_starting_now_is_rejected(self):
        self.assertIs(can_book(540, 570, 540, False, [(600, 660)]), False)

    # --- further kinds ---
    def test_zero_length_is_rejected(self):
        self.assertIs(can_book(700, 700, 540, False, [(600, 660)]), False)

    def test_reversed_times_are_rejected(self):
        self.assertIs(can_book(720, 700, 540, False, [(600, 660)]), False)

    def test_ends_exactly_at_end_of_day_is_allowed(self):
        self.assertIs(can_book(1380, 1440, 540, False, [(600, 660)]), True)

    def test_ends_after_end_of_day_is_rejected(self):
        self.assertIs(can_book(1380, 1441, 540, False, [(600, 660)]), False)

    def test_empty_existing_is_allowed(self):
        self.assertIs(can_book(660, 720, 540, False, []), True)

    def test_fully_contains_existing_is_rejected(self):
        self.assertIs(can_book(590, 710, 540, False, [(600, 660)]), False)

    def test_touching_start_of_existing_is_allowed(self):
        self.assertIs(can_book(570, 600, 540, False, [(600, 660)]), True)

    def test_existing_is_not_mutated(self):
        existing = [(600, 660)]
        snapshot = list(existing)
        can_book(660, 720, 540, False, existing)
        self.assertEqual(existing, snapshot)

        # --- multi-booking overlap (AC4, M7) ---
    def test_overlap_with_second_booking_is_rejected(self):
        self.assertIs(can_book(700, 760, 540, False, [(600, 660), (700, 750)]), False)

    def test_overlap_with_last_of_three_is_rejected(self):
        self.assertIs(can_book(800, 860, 540, False, [(600, 660), (700, 760), (800, 850)]), False)

    def test_overlap_in_unsorted_existing_is_rejected(self):
        self.assertIs(can_book(610, 650, 540, False, [(900, 960), (600, 660)]), False)

    # --- AC5: result type and immutability (M10) ---
    def test_result_is_a_real_bool_true(self):
        result = can_book(660, 720, 540, False, [(600, 660)])
        self.assertIsInstance(result, bool)
        self.assertIs(result, True)

    def test_result_is_a_real_bool_false(self):
        result = can_book(630, 690, 540, False, [(600, 660)])
        self.assertIsInstance(result, bool)
        self.assertIs(result, False)

    def test_existing_is_not_mutated_on_rejection(self):
        existing = [(900, 960), (600, 660), (700, 760)]
        snapshot = list(existing)
        can_book(610, 650, 540, False, existing)
        self.assertEqual(existing, snapshot)