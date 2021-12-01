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

        # verify you added a issue number at the end of your commit
        isIssueNumber = False
        if (re.search('#[0-9]+$', line) is None):
            print("Error: Add issue number related to this commit.")
        else:
            isIssueNumber = True

        return isPrefixGood and isLowerCase and isIssueNumber
    elif idx == 1:
        return len(line.strip()) == 0
    else:
        return len(line.strip()) <= 72


def show_rules():
    print(rules)


if __name__ == "__main__":
    main()
