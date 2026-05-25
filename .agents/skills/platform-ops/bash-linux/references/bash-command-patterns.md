# Bash Command Patterns

Use these patterns when working in Bash on Linux or macOS shells.

## Command Chaining

- `;` runs commands sequentially
- `&&` runs the next command only on success
- `||` runs the next command only on failure
- `|` pipes text output to another command

Choose the operator that matches your error-handling intent rather than chaining blindly.

## High-Value Shell Tasks

### Files

- list details: `ls -la`
- inspect head or tail: `head`, `tail`
- search files: prefer `rg` when available, otherwise `grep` or `find`
- inspect size and disk usage: `du -sh`, `df -h`

### Processes

- inspect running processes: `ps`
- find port ownership: `lsof -i :PORT`
- bring a background job back: `fg`

### Text Processing

- search with `grep` or `rg`
- transform with `sed`
- extract columns with `awk` or `cut`
- deduplicate with `sort | uniq`

## Environment Variables

- inspect with `env` or `printenv`
- reference as `$NAME`
- export temporary values with `export`
- scope a variable to one command with `NAME=value command`

## Safety Habits

- quote variable expansions unless you intentionally want word splitting
- prefer explicit success chaining with `&&`
- inspect destructive commands before running them
- use `set -euo pipefail` in scripts that should fail fast

## Script Skeleton

```bash
#!/bin/bash
set -euo pipefail

main() {
  echo "Starting"
  # work here
  echo "Done"
}

main "$@"
```

## Common Patterns

- check command availability with `command -v`
- set default argument values with `${1:-default}`
- read files safely with `while IFS= read -r line`
