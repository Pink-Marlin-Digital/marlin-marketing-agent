#!/bin/bash

# Script to sync Heroku config vars to local .env file
# Usage: ./scripts/sync-env-from-heroku.sh [app-name]

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
            echo "  ./scripts/sync-env-from-heroku.sh your-app-name"
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

# Backup existing .env file
backup_env_file() {
    if [ -f ".env" ]; then
        local backup_name=".env.backup.$(date +%Y%m%d_%H%M%S)"
        print_status "Backing up existing .env to $backup_name"
        cp .env "$backup_name"
        print_success "Backup created: $backup_name"
    fi
}

# Download config vars from Heroku and create .env file
download_config_vars() {
    print_status "Downloading config vars from Heroku..."
    
    # Create temporary file for config vars
    local temp_file=$(mktemp)
    
    # Get config vars in format suitable for .env file
    heroku config --app "$APP_NAME" --shell > "$temp_file"
    
    # Count variables
    local count=$(wc -l < "$temp_file")
    
    # Create .env file with header
    cat > .env << EOF
# Environment variables synced from Heroku app: $APP_NAME
# Generated on: $(date)
# Total variables: $count

EOF
    
    # Append config vars
    cat "$temp_file" >> .env
    
    # Clean up temp file
    rm "$temp_file"
    
    print_success "Downloaded $count config vars to .env file"
}

# Show summary of synced variables
show_summary() {
    print_status "Summary of synced variables:"
    echo ""
    
    # Show variables without values (for security)
    grep -v '^#' .env | grep -v '^$' | while IFS='=' read -r key value; do
        if [ -n "$key" ]; then
            local masked_value="***"
            if [ ${#value} -gt 8 ]; then
                masked_value="${value:0:4}***${value: -4}"
            fi
            echo "  $key=$masked_value"
        fi
    done
}

# Main execution
main() {
    echo "📥 Heroku to Local Environment Sync Script"
    echo "=========================================="
    
    check_heroku_cli
    get_app_name "$1"
    verify_app_access
    
    echo ""
    print_status "Starting environment download..."
    echo ""
    
    backup_env_file
    download_config_vars
    
    echo ""
    print_success "Environment download completed!"
    echo ""
    
    show_summary
    
    echo ""
    print_warning "Important security notes:"
    echo "  - Your .env file now contains production secrets"
    echo "  - Never commit .env to version control"
    echo "  - Keep your .env file secure and private"
    echo ""
    
    print_status "You can now use these variables locally:"
    echo "  npm run dev"
    echo ""
}

# Run main function with all arguments
main "$@"
