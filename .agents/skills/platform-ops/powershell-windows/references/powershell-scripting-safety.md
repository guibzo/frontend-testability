# PowerShell Scripting Safety

Use these patterns when writing or reviewing PowerShell scripts.

## Expression And Operator Rules

When combining cmdlets with logical operators, wrap each cmdlet call in parentheses so evaluation stays explicit.

Examples:

- `if ((Test-Path "a") -or (Test-Path "b"))`
- `if (($item) -and ($item.Count -gt 0))`

## ASCII-First Script Output

Prefer ASCII-only status markers in scripts to avoid encoding surprises across Windows terminals and automation environments.

Use markers like:

- `[OK]`
- `[WARN]`
- `[X]`
- `[INFO]`

## Null And Type Safety

- check objects before reading properties
- prefer explicit conversions when output or APIs expect strings
- use `Join-Path` instead of hand-building file paths

## JSON And File Handling

- specify `-Depth` when serializing nested objects with `ConvertTo-Json`
- read JSON with `Get-Content -Raw | ConvertFrom-Json`
- write files with explicit encoding

## Error Handling Pattern

Use strict mode, set an intentional error-action policy, and keep cleanup or exit logic obvious.

```powershell
Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

try {
  Write-Output "[OK] Done"
  exit 0
}
catch {
  Write-Warning "Error: $_"
  exit 1
}
```
