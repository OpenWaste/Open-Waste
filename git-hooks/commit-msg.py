#!/usr/bin/python

import sys
import re
from submodules.rules import rules


def main():
    # open file to read every lines
    with open(sys.argv[1], "r") as fp:
        lines = fp.readlines()

        for idx, line in enumerate(lines):

            if line.strip() == "# ------------------------ >8 ------------------------":
                break

            # ignore comments
            if line[0] == "#":
                continue

            # check for error in commit msg
            if not line_valid(idx, line):
                show_rules()
                sys.exit(1)

    # warning message
    if (re.search('#[0-9]+$', line) is None):
        print("Warning: add issue number related to this commit.")
        # ask user to confirm until valid response
        try:
            while True:
                response = input("Are you sure you want to commit? [y/N]: ")
                if (response == 'y'):
                    sys.exit(0)
                elif (response == 'N'):
                    sys.exit(1)
        except EOFError as e:
            print(e)
    
    # successful commit
    print("Success: Perfect commit!")
    sys.exit(0)


def line_valid(idx, line):
    if idx == 0:
        # verify the prefix
        isPrefixGood = False
        line = line.strip()
        if (line.startswith(('feat: ', 'fix: ', 'docs: ', 'style: ', 'refactor: ', 'test: ', 'chore: ', 'build: ', 'ci: ', 'perf: ', 'task: '))):
            isPrefixGood = True
        else:
            print("Error: Please add prefix!")

        # verify is everything is lower case
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
