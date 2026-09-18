#get a marks
user_input = input("Enter marks separated by commas:")
raw_marks = user_input.replace(","," ").split()

#check for validate
valid_marks = []

for mark in raw_marks:
    try:
        mark = float(mark)
        if 0 <= mark <= 100:
            valid_marks.append(mark)
    except (ValueError, TypeError):
        pass

#print (valid_marks)

#calculate statistics
if len(valid_marks) == 0:
    print("No valid marks entered!!!")
else:
    count = len(valid_marks)
    average = sum(valid_marks) / count
    highest = max(valid_marks)
    lowest = min(valid_marks)
    pass_rate = len([mark for mark in valid_marks if mark >= 50]) / count * 100

    print(f"Valid:{count} \n Average:{average:.2f} \n Highest:{highest} \n Lowest:{lowest} \n Pass rate:{pass_rate:.1f}%")