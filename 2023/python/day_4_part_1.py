def main():
    with open("./day_4_input.txt", "r") as f:
        lines = f.readlines()

        sum = 0
        for line in lines:
            line = line.strip()

            numbers = line.split(": ")[1]

            winning_numbers = [int(n) for n in numbers.split(" | ")[0].split(" ") if n]
            your_numbers = [int(n) for n in numbers.split(" | ")[1].split(" ") if n]

            count = -1
            for num in your_numbers:
                if num in winning_numbers:
                    count += 1

            points = 2**count if count >= 0 else 0
            sum += points

    print(sum)


if __name__ == "__main__":
    main()
