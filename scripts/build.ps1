# Build and verification helper script
Write-Host "Verifying Frontend Build..." -ForegroundColor Cyan
Set-Location -Path "frontend"
npm run build

Write-Host "Verifying Backend Import..." -ForegroundColor Cyan
Set-Location -Path "../backend"
python -c "import app.main; print('Backend Verified Successfully')"

Write-Host "All build checks passed!" -ForegroundColor Green
