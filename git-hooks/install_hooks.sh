#!/bin/bash

###################################################################
#title         :install_hooks.sh
#description   :Installs a commit-msg hook for git
#usage         :bash install_hooks.sh
###################################################################

LIB_DIR=submodules

rm -f ../.git/hooks/commit-msg
ln -s -f ../../git-hooks/commit-msg.py ../.git/hooks/commit-msg

rm -rf ../.git/hooks/${LIB_DIR}
ln -s -f ../../git-hooks/${LIB_DIR} ../.git/hooks/${LIB_DIR}