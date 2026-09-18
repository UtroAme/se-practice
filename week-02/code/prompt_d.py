def analyze_marks(marks, pass_mark=50):
    if not isinstance(pass_mark, (int, float)) or isinstance(pass_mark, bool):
        raise ValueError("pass_mark must be a number")

    if not isinstance(marks, list):
        raise ValueError("marks must be a list")

    if len(marks) == 0:
        raise ValueError("marks must not be empty")

    for m in marks:
        if not isinstance(m, (int, float)) or isinstance(m, bool):
            raise ValueError("every mark must be a number (int or float)")
        if m < 0 or m > 100:
            raise ValueError("every mark must be between 0 and 100")

    total = len(marks)
    average = round(sum(marks) / total, 2)
    highest = max(marks)
    lowest = min(marks)
    passed = sum(1 for m in marks if m >= pass_mark)
    pass_rate = round((passed / total) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }


if __name__ == "__main__":
    import unittest

    class TestAnalyzeMarks(unittest.TestCase):
        def test_worked_example(self):
            self.assertEqual(
                analyze_marks([40, 60, 80], 50),
                {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67},
            )

        def test_one_mark(self):
            self.assertEqual(
                analyze_marks([100], 50),
                {"average": 100.0, "highest": 100, "lowest": 100, "pass_rate": 100.0},
            )

        def test_decimals(self):
            # 49.5 fails (< 50), 50 passes (>= 50) -> 1/2 = 50%
            self.assertEqual(
                analyze_marks([49.5, 50], 50),
                {"average": 49.75, "highest": 50, "lowest": 49.5, "pass_rate": 50.0},
            )

        def test_custom_pass_mark(self):
            # only 80 >= 70 -> 1/3 = 33.33%
            self.assertEqual(
                analyze_marks([40, 60, 80], 70),
                {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 33.33},
            )

        def test_empty_list_raises(self):
            with self.assertRaises(ValueError):
                analyze_marks([], 50)

        def test_text_value_raises(self):
            with self.assertRaises(ValueError):
                analyze_marks([40, "60"], 50)

        def test_out_of_range_raises(self):
            with self.assertRaises(ValueError):
                analyze_marks([-1, 50, 101], 50)

        def test_not_a_list_raises(self):
            with self.assertRaises(ValueError):
                analyze_marks((40, 60), 50)

        def test_bool_mark_raises(self):
            with self.assertRaises(ValueError):
                analyze_marks([True, 50], 50)

        def test_bad_pass_mark_raises(self):
            with self.assertRaises(ValueError):
                analyze_marks([50], "50")

    unittest.main()