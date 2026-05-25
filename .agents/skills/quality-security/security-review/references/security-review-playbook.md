# Security Review Playbook

Use this playbook for a structured application security review that separates confirmed findings from speculative attack paths.

## Review Mindset

- Assume breach and map what matters before hunting for bugs.
- Apply zero-trust thinking at every trust boundary.
- Prefer defense-in-depth and least-privilege explanations over one-off fixes.
- Fail secure: when security checks error, access should be denied rather than silently allowed.

## Threat Modeling Questions

Answer these before reviewing code or configs:

1. What assets are we protecting?
2. Who would attack this system?
3. Which attack vectors are realistic?
4. What is the business impact if the control fails?

## Review Flow

1. Map the attack surface: entry points, data flows, trust boundaries, exposed services, privileged operations.
2. Review authn, authz, secret handling, input validation, output exposure, and dependency integrity.
3. Check for abuse paths: escalation, replay, bypasses, fail-open behavior, chained weaknesses.
4. Validate severity with business context instead of reporting every theoretical issue equally.
5. Report clear findings with impact, evidence, and remediation direction.

## Coverage Areas

### Access Control

- Authorization enforced on every protected route and action
- Object-level access checked, not just route-level access
- Sensitive defaults denied by default
- SSRF and internal resource access guarded by allow-lists where relevant

### Security Misconfiguration

- Debug features, admin paths, and default credentials disabled
- Security headers and CORS configuration intentionally set
- Cloud, container, and runtime defaults reviewed for exposure risk

### Supply Chain and Integrity

- Lockfiles committed and dependency updates reviewed
- Registry sources and package additions vetted
- CI/CD permissions and artifact integrity controls understood
- Critical artifacts signed or otherwise verified when possible

### Cryptography and Secrets

- Passwords hashed with modern password hashing
- Sensitive data protected in transit and at rest where appropriate
- Secrets not committed to code or leaked through logs
- Key management and rotation responsibilities are clear

### Input and Output Handling

- Parameterized queries and safe serializers used
- Dangerous dynamic execution paths avoided
- XSS, command injection, path traversal, and unsafe deserialization checked
- Error responses avoid leaking internal details

### Exceptional Conditions

- Security checks fail closed on parsing, timeout, or dependency failure
- Catch-all handlers do not suppress security-relevant failures
- Resource exhaustion and race conditions are considered for critical paths

## Risk Prioritization

Use exploitability and business context together:

- Critical: actively exploitable, internet-reachable, or high-impact compromise paths
- High: meaningful exposure with realistic preconditions
- Medium: constrained risk or partial impact
- Low: hygiene or defense-in-depth improvements

Prefer this decision order:

1. Is the issue externally reachable or easily chained?
2. Does it affect sensitive assets, auth, or broad data exposure?
3. Is it actively exploited or straightforward to reproduce?
4. Can it be fixed at the root cause instead of patching a symptom?

## Reporting Guidance

Each finding should state:

- What is wrong
- Where it exists
- How it could be abused
- Why it matters in this system
- What remediation direction is recommended

Keep speculative red-team ideas separate from confirmed vulnerabilities.
