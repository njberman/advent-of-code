import re


def get_first_num(line: str, map: dict[str, str]) -> str:
    current_word = ""
    i = 0
    while i < len(line):
        char = line[i]
        if current_word in map.keys():
            return map[current_word]

        if current_word + char in [n[: len(current_word) + 1] for n in map.keys()]:
            current_word += char
        else:
            current_word_copy = current_word[:]
            current_word = ""
            if len(current_word_copy) > 1 and current_word_copy[-1] in [
                n[0] for n in map.keys()
            ]:
                i -= 1
                continue
            elif char in [n[0] for n in map.keys()]:
                continue

        i += 1
        if char in map.values():
            return char


def main():
    MAP = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
    }
    MAP_REVERSED = {"".join(list(reversed(list(key)))): MAP[key] for key in MAP.keys()}

    with open("./day_1_input.txt", "r") as f:
        lines = f.readlines()

        sum = 0
        for line in lines:
            line = line.strip()

            first_num = get_first_num(line, MAP)
            last_num = get_first_num("".join(reversed(list(line))), MAP_REVERSED)

            out_num = int(first_num + last_num)
            sum += out_num
            # print(f"{line} -> {out_num}")
    print(sum)


if __name__ == "__main__":
    main()
