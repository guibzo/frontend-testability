# Security Review Checklists

Use these checklists during audits, release reviews, and targeted security assessments.

## Web and API Core Checks

### Access Control

- [ ] Authorization exists on every protected route and action
- [ ] Object-level access checks prevent IDOR-style exposure
- [ ] Sensitive operations default to deny
- [ ] Rate limiting exists on abuse-prone endpoints
- [ ] Cross-origin access is restricted intentionally

### Authentication

- [ ] Password storage uses a modern password hashing function
- [ ] Account lockout or throttling exists for repeated failures
- [ ] Session or token expiration is enforced
- [ ] Logout invalidates current session state
- [ ] Reset and recovery flows are protected against takeover
- [ ] MFA is available when the risk profile requires it

### Input, Output, and Execution

- [ ] Database access uses parameterized queries
- [ ] Untrusted HTML and script execution paths are controlled
- [ ] File paths and uploads validate names, types, and destinations
- [ ] Outbound URL fetches are validated or allow-listed
- [ ] Error messages avoid exposing internals

### Data Protection

- [ ] Sensitive data is encrypted in transit
- [ ] Sensitive data at rest has an explicit protection story
- [ ] Secrets are not committed to source or written to logs
- [ ] Retention and deletion expectations are documented

### Dependencies and Delivery

- [ ] Lockfiles are committed
- [ ] New dependencies are reviewed before merge
- [ ] Known vulnerable or unused packages are removed or tracked
- [ ] CI/CD credentials are scoped and rotated
- [ ] Build and release artifacts are verified where practical

### Logging and Monitoring

- [ ] Security-relevant actions are logged
- [ ] Logs omit credentials and regulated data
- [ ] Alerting exists for high-impact failures or suspicious activity
- [ ] Log retention and access are controlled

## Quick Pattern Review

Search for high-risk patterns such as:

- string-built queries
- `eval`, `exec`, or dynamic function creation
- unsafe deserialization
- secret-like variable names and hardcoded credentials
- disabled TLS verification or insecure flags

## High-Value Headers

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options` or equivalent framing protection
- `Referrer-Policy`
