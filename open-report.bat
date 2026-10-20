
@echo off
setlocal

cd /d "%~dp0"

set "REPORT=%~1"

if "%REPORT%"=="" (
    echo Drag and drop the timestamped report FOLDER onto this BAT file.
    pause
    exit /b 1
)

if exist "%REPORT%\index.html" (
    echo Opening Allure report: %REPORT%
    call npx allure open "%REPORT%"
) else (
    echo Invalid report folder. Could not find index.html.
    echo Received: %REPORT%
)

pause
