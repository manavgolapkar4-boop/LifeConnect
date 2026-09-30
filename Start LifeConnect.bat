@echo off
title LifeConnect

echo ==========================================
echo          LIFE CONNECT STARTING
echo ==========================================
echo.

REM ------------------------------------------
REM Start FastAPI Backend
REM ------------------------------------------

echo [1/2] Starting FastAPI backend...

cd /d "%~dp0backend"

start "LifeConnect Backend" cmd /k "python -m uvicorn main:app --reload"

echo Backend starting...
timeout /t 4 /nobreak >nul

REM ------------------------------------------
REM Start Frontend Web Server
REM ------------------------------------------

echo [2/2] Starting LifeConnect website...

cd /d "%~dp0"

start "LifeConnect Frontend" cmd /k "python -m http.server 5500"

echo Frontend starting...
timeout /t 2 /nobreak >nul

REM ------------------------------------------
REM Open Website
REM ------------------------------------------

echo.
echo ==========================================
echo       LIFE CONNECT IS RUNNING!
echo ==========================================
echo.
echo Frontend:
echo http://127.0.0.1:5500
echo.
echo Backend:
echo http://127.0.0.1:8000
echo.
echo Swagger:
echo http://127.0.0.1:8000/docs
echo ==========================================
echo.

start "" "http://127.0.0.1:5500/index.html"

exit