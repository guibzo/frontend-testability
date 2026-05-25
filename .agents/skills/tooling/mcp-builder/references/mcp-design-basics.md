# MCP Design Basics

Use this reference when designing an MCP server, its tool surface, and its resource model.

## Core MCP Building Blocks

- tools for callable actions
- resources for readable context
- prompts for reusable templates where supported

## Tool Design Principles

- choose clear, action-oriented names
- keep each tool focused on one job
- validate inputs with explicit schemas
- return structured, predictable output

## Resource Design Principles

Resource patterns often fall into:

- static resources for fixed context
- dynamic resources generated on demand
- parameterized templates for URI-driven access

Use URI patterns that are easy to reason about and document.

## Error Handling

- validation errors should be explicit and actionable
- not-found responses should be clear
- internal failures should avoid leaking sensitive details
- logs should support debugging without exposing secrets

## Security And Configuration

- validate all inputs
- scope resource access intentionally
- keep API keys in environment-based configuration
- document required runtime configuration for consumers

## Testing Surface

Test at multiple levels:

- unit tests for tool logic
- integration tests for server behavior
- contract checks for schemas and response shapes
