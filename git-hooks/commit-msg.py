#!/usr/bin/python

import sys
import re
from submodules.rules import rules


def main():
    with open(sys.argv[1], "r") as fp:
        lines = fp.readlines()

        for idx, line in enumerate(lines):

            if line.strip() == "# ------------------------ >8 ------------------------":
                break

            if line[0] == "#":
                continue

            if not line_valid(idx, line):
                show_rules()
                sys.exit(1)

    if (re.search('#[0-9]+$', line) is None):
        print("Warning: add issue number related to this commit.")
    else:
        print("Success: Perfect commit!")

    sys.exit(0)


def line_valid(idx, line):
    if idx == 0:
        isPrefixGood = False
        line = line.strip()
        if (line.startswith(('feat: ', 'fix: ', 'docs: ', 'style: ', 'refactor: ', 'test: ', 'chore: ', 'build: ', 'ci: ', 'perf: ', 'task: '))):
            isPrefixGood = True
        else:
            print("Error: Please add prefix!")

        isLowerCase = False
        if (line.islower()):
            isLowerCase = True
        else:
            print("Error: Commit are always lowercase!")

        return isPrefixGood and isLowerCase
    elif idx == 1:
        return len(line.strip()) == 0
    else:
        return len(line.strip()) <= 72


def show_rules():
    print(rules)


if __name__ == "__main__":
    main()
