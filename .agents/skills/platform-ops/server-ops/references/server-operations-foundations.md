# Server Operations Foundations

Use this reference for day-to-day operational thinking around services, health, logs, and capacity.

## Process Management Goals

- restart automatically after crashes
- survive host reboots
- reload safely when supported
- use available compute intentionally

Pick the process model that matches the runtime and platform, such as a native service manager, container runtime, or orchestration system.

## Monitoring Basics

Track four categories consistently:

- availability
- performance
- error rate and error types
- resource usage such as CPU, memory, and disk

Define what is critical enough to page immediately versus what can wait for normal investigation.

## Log Hygiene

- rotate logs before disks fill
- prefer structured logs for parsing and correlation
- keep log levels meaningful
- never log secrets or regulated data casually

## Health Checks

A useful health check tells you whether the service is responding and whether critical dependencies are usable enough for the environment's routing decisions.

Include only the checks the caller needs. Deep checks can be valuable, but they also add load and potential false negatives.

## Scaling Decisions

- high CPU suggests horizontal scaling or workload balancing
- high memory suggests capacity pressure or leaks
- slow response times require profiling before reflexive scaling
- spiky traffic may justify autoscaling and caching

## Troubleshooting Order

1. confirm the process is running
2. inspect recent logs
3. check disk, memory, and CPU pressure
4. verify network paths and port bindings
5. verify downstream dependencies
