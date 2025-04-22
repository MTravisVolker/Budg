# Budg

Budg is a modern web-based budgeting application designed to simplify personal finance management. With a spreadsheet-like interface, it enables users to track bank accounts, bills, and user-defined categories through manual data entry. Budg is under active development and welcomes contributions from the open-source community and feedback from end-users.

## Features

- **Intuitive Interface**: Spreadsheet-like table view for managing due bills and bank account balances, with drag-and-drop prioritization for custom ordering.
- **Flexible Configuration**: User-defined categories, recurrences, and bill statuses to organize finances tailored to individual needs.
- **Secure Authentication**: Supports JWT, OAuth2 (Google, GitHub), and TOTP-based multifactor authentication (2FA) for robust account protection.
- **Seamless Data Entry**: Modal-based CRUD operations for adding and editing bills, accounts, and more without leaving the main view.
- **Custom Date Range**: Filter financial data with a date range selector, defaulting to two weeks before and four weeks after the next account balance.
- **Audit Logging**: Comprehensive tracking of all data changes for accountability and transparency.
- **Responsive Design**: Compatible with all modern devices, from desktops to mobile phones.

## Tech Stack

- **Frontend**: React, Bootstrap (CDN-hosted via cdn.jsdelivr.net)
- **Backend**: FastAPI (Python), SQLAlchemy
- **Database**: PostgreSQL
- **Cache/Rate Limiting**: Redis
- **Monitoring**: Sentry, Prometheus, Grafana, PostHog
- **DevOps**: Docker Compose, GitHub Actions, Dependabot, Snyk

## Installation

Installation instructions for local development and deployment are coming soon. Stay tuned for updates!

## Usage

Budg provides a user-friendly interface for managing personal finances:

1. Sign up or log in securely with email/password or OAuth2 (Google, GitHub).
2. Add bank accounts, bills, and categories via intuitive modal popups.
3. Use the spreadsheet-like table to view, prioritize, and edit due bills and account balances, with hover effects and inline controls.
4. Filter financial data using the custom date range selector.
5. Enable 2FA for enhanced account security via any TOTP app (e.g., Google Authenticator).

## Security

Budg prioritizes user data protection with:

- AES-256 encryption for sensitive data at rest (e.g., financial details, passwords).
- TLS 1.3 for all network communications, with Let’s Encrypt certificates.
- Role-Based Access Control (RBAC) ensuring least privilege access.
- Nightly dependency scans with Dependabot and Snyk to address vulnerabilities.
- Reasonable alignment with GDPR, CCPA, and SOC 2 principles, including data minimization and audit logging.

## Build-Out Strategy

Budg’s development and deployment roadmap is outlined in `Build-Out Strategy.md`. This includes plans for scaling infrastructure, enhancing features, and ensuring robust performance and security. Contributors can refer to this document for details on upcoming milestones and development priorities.

## License

This project is licensed under the MIT License.

## Contact

For questions, suggestions, or issues, please file an issue on GitHub.

## Acknowledgements

Budg is built by Travis Volker (Product Manager, Lead Developer, Web Frontend Designer, Database Administrator, and Site Reliability Engineer).