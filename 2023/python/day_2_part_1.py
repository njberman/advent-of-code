def main():
    RED_NUM = 12
    GREEN_NUM = 13
    BLUE_NUM = 14

    with open("./day_2_input.txt", "r") as f:

        lines = f.readlines()
        sum = 0
        for line in lines:
            line = line.strip()

            colon_idx = line.index(":")
            game_id = int(line[5:colon_idx])

            rest_of_line = line[colon_idx + 1 :]

            rounds_of_game = rest_of_line.split(";")

            add = True
            for round in rounds_of_game:
                colours_and_numbers = round.split(", ")

                for colour_and_number in colours_and_numbers:
                    (number, colour) = [s for s in colour_and_number.split(" ") if s]
                    number = int(number)
                    if (
                        (colour == "red" and number > RED_NUM)
                        or (colour == "green" and number > GREEN_NUM)
                        or (colour == "blue" and number > BLUE_NUM)
                    ):
                        add = False

            if add:
                sum += game_id

    print(sum)


if __name__ == "__main__":
    main()
