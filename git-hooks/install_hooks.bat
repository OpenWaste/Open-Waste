@echo off

:: ====================================================================
:: Name        : install_hooks.bat
:: Description : Installs a commit-msg hook for git
:: Notes       : Need to be executed as an administrator
:: ====================================================================

set LIB_DIR=submodules

if exist ..\.git\hooks\commit-msg del /F ..\.git\hooks\commit-msg
mklink ..\.git\hooks\commit-msg ..\..\git-hooks\commit-msg.py

if exist ..\.git\hooks\%LIB_DIR% rmdir /S /Q ..\.git\hooks\%LIB_DIR%
mklink /D ..\.git\hooks\%LIB_DIR% ..\..\git-hooks\%LIB_DIR%