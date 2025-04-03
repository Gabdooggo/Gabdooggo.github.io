Guess = 5
geuss_count = 0
guess_limit = 3

while geuss_count < guess_limit:
	tries = int(input("Guess: "))
	geuss_count += 1
if int(tries) == Guess:
        print("Good job you guessed the right answer")
else:
	print("Sorry you lost!")
break
