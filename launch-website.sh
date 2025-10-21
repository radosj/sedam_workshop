#!/bin/bash

# Red Edition Website Launch Script
# This script helps you easily launch the website locally

echo "🎨 Red Edition Website Launcher"
echo "================================"
echo ""

# Check if Python3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found - Starting web server..."
    echo "🌐 Opening website at: http://localhost:8000"
    echo "📱 The website is fully responsive and works on all devices"
    echo ""
    echo "To stop the server, press Ctrl+C"
    echo ""
    
    # Try to open in default browser (works on most systems)
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000 2>/dev/null &
    elif command -v open &> /dev/null; then
        open http://localhost:8000 2>/dev/null &
    elif command -v start &> /dev/null; then
        start http://localhost:8000 2>/dev/null &
    fi
    
    # Start the web server
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "✅ Python found - Starting web server..."
    echo "🌐 Opening website at: http://localhost:8000"
    echo ""
    python -m SimpleHTTPServer 8000
    
else
    echo "❌ Python not found!"
    echo ""
    echo "To launch the website, you have these options:"
    echo ""
    echo "1. Install Python and run this script again"
    echo "2. Double-click on 'index.html' to open in your browser"
    echo "3. Use any other web server (Apache, Nginx, etc.)"
    echo ""
    echo "For best results, use a web server instead of opening the file directly."
fi
