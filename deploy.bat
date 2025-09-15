@echo off
:: Veilux Website - Quick Deploy Script for Windows
:: This script helps deploy the Veilux website to Vercel

echo 🚀 Veilux Website Deployment Script
echo ==================================

:: Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI is not installed.
    echo 💡 Install it with: npm install -g vercel
    pause
    exit /b 1
)

:: Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo 🔑 Please login to Vercel first:
    vercel login
)

:: Clean up any previous builds
echo 🧹 Cleaning up...
if exist .vercel rmdir /s /q .vercel

:: Deploy to Vercel
echo 🚀 Deploying to Vercel...
if "%1"=="prod" (
    echo 📦 Production deployment...
    vercel --prod
) else if "%1"=="production" (
    echo 📦 Production deployment...
    vercel --prod
) else (
    echo 🔧 Preview deployment...
    vercel
)

echo ✅ Deployment completed!
echo 🌐 Your website is now live!
echo.
echo 📊 Next steps:
echo   - Check the deployment URL above
echo   - Set up custom domain in Vercel dashboard
echo   - Configure analytics if needed
echo   - Monitor performance and errors
echo.
echo 📞 Need help? Contact: support@veilux.network
pause
