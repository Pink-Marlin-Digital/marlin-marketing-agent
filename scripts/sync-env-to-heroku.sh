#!/bin/bash

# Script to sync local .env file to Heroku
# Usage: ./scripts/sync-env-to-heroku.sh [app-name]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Heroku CLI is installed
check_heroku_cli() {
    if ! command -v heroku &> /dev/null; then
        print_error "Heroku CLI is not installed. Please install it first:"
        echo "  https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
}

# Check if .env file exists
check_env_file() {
    if [ ! -f ".env" ]; then
        print_error ".env file not found in current directory"
        print_warning "Please create a .env file based on env.example"
        echo "  cp env.example .env"
        echo "  # Then edit .env with your actual values"
        exit 1
    fi
}

# Get Heroku app name
get_app_name() {
    if [ -n "$1" ]; then
        APP_NAME="$1"
    else
        # Try to get app name from git remote
        APP_NAME=$(git remote -v | grep heroku | head -1 | sed 's/.*heroku\.com[\/:]\([^\.]*\).*/\1/')
        if [ -z "$APP_NAME" ]; then
            print_error "Could not determine Heroku app name"
            print_warning "Please provide the app name as an argument:"
            echo "  ./scripts/sync-env-to-heroku.sh your-app-name"
            exit 1
        fi
    fi
    print_status "Using Heroku app: $APP_NAME"
}

# Verify app exists and user has access
verify_app_access() {
    print_status "Verifying access to Heroku app: $APP_NAME"
    if ! heroku apps:info --app "$APP_NAME" &> /dev/null; then
        print_error "Cannot access Heroku app: $APP_NAME"
        print_warning "Make sure you have access to this app and are logged in:"
        echo "  heroku login"
        echo "  heroku apps:info --app $APP_NAME"
        exit 1
    fi
    print_success "Access verified for app: $APP_NAME"
}

# Parse .env file and set Heroku config vars
sync_env_vars() {
    print_status "Reading .env file and syncing to Heroku..."
    
    # Counter for tracking
    local count=0
    local skipped=0
    
    # Read .env file line by line
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and comments
        if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
            continue
        fi
        
        # Extract key=value pairs
        if [[ "$line" =~ ^([^=]+)=(.*)$ ]]; then
            local key="${BASH_REMATCH[1]}"
            local value="${BASH_REMATCH[2]}"
            
            # Remove leading/trailing whitespace
            key=$(echo "$key" | xargs)
            value=$(echo "$value" | xargs)
            
            # Skip if value is empty or placeholder
            if [[ -z "$value" || "$value" =~ ^your_.*_here$ || "$value" =~ ^your-.*-here$ ]]; then
                print_warning "Skipping $key (empty or placeholder value)"
                ((skipped++))
                continue
            fi
            
            # Set the config var in Heroku
            print_status "Setting $key..."
            if heroku config:set "$key=$value" --app "$APP_NAME" &> /dev/null; then
                print_success "✓ $key"
                ((count++))
            else
                print_error "✗ Failed to set $key"
            fi
        fi
    done < .env
    
    print_success "Sync completed: $count variables set, $skipped skipped"
}

# Show current Heroku config vars
show_current_config() {
    print_status "Current Heroku config vars for $APP_NAME:"
    heroku config --app "$APP_NAME"
}

# Main execution
main() {
    echo "🚀 Heroku Environment Sync Script"
    echo "================================="
    
    check_heroku_cli
    check_env_file
    get_app_name "$1"
    verify_app_access
    
    echo ""
    print_status "Starting environment sync..."
    echo ""
    
    sync_env_vars
    
    echo ""
    print_success "Environment sync completed!"
    echo ""
    
    # Ask if user wants to see current config
    read -p "Show current Heroku config vars? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        show_current_config
    fi
    
    echo ""
    print_status "You can now deploy your app:"
    echo "  git push heroku main"
    echo ""
}

# Run main function with all arguments
main "$@"
