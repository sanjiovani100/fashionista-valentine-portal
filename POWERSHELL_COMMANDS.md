# PowerShell Commands for Fashionista Valentine Portal

## Development Server Commands

```powershell
# Start both frontend and backend servers
npm run dev:all

# Start only frontend server
npm run dev:frontend

# Start only backend server
npm run dev:backend

# Kill specific ports (if needed)
npm run kill-ports
```

## Utility Commands

### Replace Text in Files
```powershell
# Replace text in all TypeScript files recursively
Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_ | ForEach-Object {
        $_ -replace 'oldText', 'newText'
    }) | Set-Content $_
}

# Example: Replace utility function names
Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_ | ForEach-Object {
        $_ -replace 'import \{ cn \}', 'import { cx }' `
           -replace 'className={cn\(', 'className={cx('
    }) | Set-Content $_
}
```

### File Operations
```powershell
# Create new component directory with files
function New-Component {
    param(
        [string]$ComponentName,
        [string]$Path = "src/components"
    )
    
    $fullPath = Join-Path $Path $ComponentName
    New-Item -Path $fullPath -ItemType Directory
    New-Item -Path "$fullPath/$ComponentName.tsx" -ItemType File
    New-Item -Path "$fullPath/index.ts" -ItemType File
}

# Example usage:
# New-Component -ComponentName "Button"
```

### Database Operations
```powershell
# Start Supabase local development
docker-compose up -d

# Stop Supabase local development
docker-compose down

# Reset database
docker-compose down -v
docker-compose up -d
```

### Testing Commands
```powershell
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Build Commands
```powershell
# Build both frontend and backend
npm run build

# Build only frontend
npm run build:frontend

# Build only backend
npm run build:backend

# Clean build directories
npm run clean
```

### Code Quality Commands
```powershell
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format

# Run type checking
npm run typecheck
```

### Git Commands with PowerShell
```powershell
# Create and switch to new feature branch
function New-Feature {
    param([string]$FeatureName)
    git checkout -b "feature/$FeatureName"
}

# Create and switch to new bugfix branch
function New-Bugfix {
    param([string]$BugName)
    git checkout -b "bugfix/$BugName"
}

# Example usage:
# New-Feature -FeatureName "add-login"
# New-Bugfix -BugName "fix-auth"
```

## Environment Setup

### Node.js Version Management
```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# List globally installed packages
npm list -g --depth=0
```

### Project Setup
```powershell
# Fresh install of dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Update all dependencies
npm run update-deps
```

## Troubleshooting Commands

### Port Management
```powershell
# Find process using a specific port
function Find-ProcessOnPort {
    param([int]$Port)
    Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | 
    Select-Object LocalPort, @{Name="ProcessName";Expression={(Get-Process -Id $_.OwningProcess).ProcessName}}
}

# Kill process on a specific port
function Kill-ProcessOnPort {
    param([int]$Port)
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess
    if ($process) {
        Stop-Process -Id $process -Force
        Write-Host "Process on port $Port has been terminated"
    } else {
        Write-Host "No process found on port $Port"
    }
}

# Example usage:
# Find-ProcessOnPort -Port 3001
# Kill-ProcessOnPort -Port 3001
```

### Cache Clearing
```powershell
# Clear npm cache
npm cache clean --force

# Clear Next.js cache
Remove-Item -Recurse -Force .next
```

## Notes

1. Always run PowerShell as Administrator when dealing with system-level operations (port management, process killing, etc.)
2. Use `Set-ExecutionPolicy RemoteSigned` if you're unable to run scripts
3. For Git operations, ensure you have Git installed and available in your PATH
4. Some commands might require additional modules or permissions 