#!/bin/bash

# Veilux Website - Quick Deploy Script
# This script helps deploy the Veilux website to Vercel

set -e

echo "🚀 Veilux Website Deployment Script"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "💡 Install it with: npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔑 Please login to Vercel first:"
    vercel login
fi

# Clean up any previous builds (if any)
echo "🧹 Cleaning up..."
rm -rf .vercel

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
if [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    echo "📦 Production deployment..."
    vercel --prod
else
    echo "🔧 Preview deployment..."
    vercel
fi

echo "✅ Deployment completed!"
echo "🌐 Your website is now live!"
echo ""
echo "📊 Next steps:"
echo "  - Check the deployment URL above"
echo "  - Set up custom domain in Vercel dashboard"
echo "  - Configure analytics if needed"
echo "  - Monitor performance and errors"
echo ""
echo "📞 Need help? Contact: support@veilux.network"
