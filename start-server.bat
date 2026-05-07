@echo off
echo ==========================================
echo Starting Smart Learning Platform Server...
echo ==========================================
echo.
echo Your platform will open in your default browser.
echo Do not close this window while you are using the app!
echo To stop the server, press Ctrl+C or close this window.
echo.

start http://localhost:8080
node server.js
