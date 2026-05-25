# Delegation Routing Matrix

Use this as a host-agnostic routing aid instead of naming legacy personas.

| Request shape | Suggested specialist view |
| --- | --- |
| authentication, authorization, secrets | security review + backend |
| API contract or endpoint behavior | backend + testing |
| schema, query, migration | database + backend |
| UI system, component quality, accessibility | frontend design + audit |
| performance bottleneck | performance + owning domain |
| deployment or operations issue | deployment or server ops |
| vague product request | discovery or planning before implementation |

## Escalation Rules

- Use one specialist when the domain is clear and bounded.
- Use multiple specialists only when the request genuinely crosses domains.
- Keep the main thread responsible for synthesis and final judgment.
