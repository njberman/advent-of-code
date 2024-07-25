import re


def main():
    NUMS = ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9")
    SYMBOLS = ("-", "*", "$", "%", "+", "&", "/", "@", "=", "#")
    DIRS = ((0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1))

    with open("./day_3_input.txt", "r") as f:
        lines = f.readlines()

        chars = []
        final_sum = 0
        lines_adding = [[] for _ in range(len(lines))]
        for line_index, line in enumerate(lines):
            line = line.strip()

            numbers_on_line = re.split(
                "[" + re.escape("".join(list(SYMBOLS) + ["."])) + "]+", line
            )
            used_numbers_on_line = []
            for n in numbers_on_line:
                matches = list(re.finditer(r"\b" + n + r"\b", line))
                indices = [match.start() for match in matches]
                index_on_line = indices[used_numbers_on_line.count(n)]
                used_numbers_on_line.append(n)

                add = False
                for sub_number_index in range(index_on_line, index_on_line + len(n)):
                    for dx, dy in DIRS:
                        nx, ny = (sub_number_index + dx, line_index + dy)

                        if nx > 0 and nx < len(line) and ny > 0 and ny < len(lines):
                            nchar = lines[ny][nx]
                            if nchar in SYMBOLS:
                                add = True
                                break

                    if add:
                        lines_adding[line_index].append(int(n))
                        break

        for i, lines_added in enumerate(lines_adding):
            print(f"{i} -> {' '.join([str(n) for n in lines_added])}")
            final_sum += sum(lines_added)
        print(final_sum)


if __name__ == "__main__":
    main()
