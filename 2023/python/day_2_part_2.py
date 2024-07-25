def main():
    with open("./day_2_input.txt", "r") as f:
        lines = f.readlines()

        sum = 0
        for line in lines:
            line = line.strip()

            game = line[line.index(": ") + 1 :]

            rounds = game.split("; ")

            cols = {
                "red": [],
                "green": [],
                "blue": [],
            }

            for round_of_game in rounds:
                colours_and_numbers = round_of_game.split(", ")

                for colour_and_number in colours_and_numbers:
                    (number, colour) = [s for s in colour_and_number.split(" ") if s]
                    cols[colour].append(int(number))

            min_reds = max(cols["red"])
            min_greens = max(cols["green"])
            min_blues = max(cols["blue"])

            power_of_mins = min_reds * min_greens * min_blues
            sum += power_of_mins

        print(sum)


if __name__ == "__main__":
    main()