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

    print("works")
    sys.exit(1)


def line_valid(idx, line):
    if idx == 0:
        isPrefixGood = False
        line = line.rstrip()
        if (line.startswith(('feat: ', 'bug fix: ', 'docs: ', 'style: ', 'refactor: ', 'test: ', 'chore: ', 'build: ', 'ci: ', 'perf: '))):
            isPrefixGood = True
        else:
            print("\033[1;31;40m Please add prefix!\033[0;37;40m")

        isLowerCase = False
        if (line.islower()):
            isLowerCase = True
        else:
            print("\033[1;31;40m Commit are always lowercase!\033[0;37;40m")

        return isPrefixGood and isLowerCase
    elif idx == 1:
        return len(line.strip()) == 0
    else:
        return len(line.strip()) <= 72


def show_rules():
    print(rules)


if __name__ == "__main__":
    main()
