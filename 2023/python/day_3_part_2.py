def get_number(x: int, y: int, lines: list[str]):
    x_stored = x
    chars = []

    char = lines[y][x]

    # Left
    while char.isdigit():
        chars.insert(0, char)
        x -= 1

        char = lines[y][x]

    x = x_stored
    char = lines[y][x]
    # Right
    while char.isdigit():
        if x != x_stored:
            chars.append(char)
        x += 1
        char = lines[y][x]

    return int("".join(chars))


def main():
    DIRS = ((0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1))

    with open("./day_3_input.txt", "r") as f:
        lines = f.readlines()

        sum = 0
        for line_idx, line in enumerate(lines):
            line = line.strip()

            for char_idx, char in enumerate(list(line)):
                if char == "*":
                    numbers = []
                    for dx, dy in DIRS:
                        nx, ny = char_idx + dx, line_idx + dy

                        if nx < 0 or nx >= len(line) or ny < 0 or ny >= len(lines):
                            continue

                        nchar = lines[ny][nx]

                        if nchar.isdigit():
                            number = get_number(nx, ny, lines)
                            if number not in numbers:
                                numbers.append(number)

                    if len(numbers) == 2:
                        sum += numbers[0] * numbers[1]

    print(sum)


if __name__ == "__main__":
    main()
