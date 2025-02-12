# Get all TypeScript and TSX files
Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    # Read the content of each file
    $content = Get-Content $_.FullName -Raw
    
    # Replace the imports
    $content = $content -replace 'import \{ cn \} from ["'']@/lib/utils["'']', 'import { cx } from "@/lib/utils"'
    
    # Replace the function calls
    $content = $content -replace 'className={cn\(', 'className={cx('
    
    # Write the content back to the file
    Set-Content $_.FullName $content
}

Write-Host "Finished updating all files from cn to cx" 