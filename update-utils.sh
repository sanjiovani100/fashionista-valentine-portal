#!/bin/bash

# Find all TypeScript and TSX files and replace 'cn' with 'cx' in import statements
find src -type f -name "*.ts" -o -name "*.tsx" | while read file; do
    sed -i 's/import { cn } from "@\/lib\/utils"/import { cx } from "@\/lib\/utils"/g' "$file"
    sed -i "s/import { cn } from '@\/lib\/utils'/import { cx } from '@\/lib\/utils'/g" "$file"
    sed -i 's/className={cn(/className={cx(/g' "$file"
done 