@echo off

start cmd /k "cd backend && npm i && npm run dev"
start cmd /k "ngrok http 3000"
start cmd /k "cd frontend && npm i && npm run dev"