# Security Policy

## Reporting a Vulnerability

If you discover a vulnerability, please open a private disclosure (do not create a public issue first). You can:

1. Email: security@skylarmatthews.me (or your direct contact email)
2. Or open a GitHub security advisory (if repository is public)

Please include:
- Description of the issue
- Steps to reproduce
- Potential impact
- Any suggested remediation

## Scope
This is a static résumé site with no backend processing. Sensitive data should never be submitted here. If you find exposed secrets, misconfigurations, or supply-chain issues, report them.

## Hardening Measures Implemented
- Content Security Policy (CSP)
- Security headers (X-Frame-Options, Referrer-Policy, X-Content-Type-Options)
- Infrastructure as Code via Terraform
- Principle of least privilege guidance for deployment credentials
- Dependency updates via Dependabot

## Non-Goals
- Authentication / authorization (not required for this site)
- User data storage

## Future Enhancements
- Add automated Lighthouse + security header validation in CI
- Optional integration with CodeQL or Semgrep

Thank you for helping keep this project secure.
