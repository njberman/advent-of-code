def main():
    NUMBERS = [str(x) for x in range(0, 10)]

    with open("./day_1_input.txt", "r") as f:
        lines = f.readlines()

        sum = 0
        for line in lines:
            line = line.strip()

            first_num = -1_000_000
            last_num = -1_000_000
            for char in list(line):
                if char in NUMBERS:
                    if first_num == -1_000_000:
                        first_num = int(char)
                        continue

                    last_num = int(char)

            if last_num == -1_000_000:
                last_num = first_num

            out_num = int(str(first_num) + str(last_num))
            sum += out_num

    print(sum)


if __name__ == "__main__":
    main()
