# Budg Build-Out Strategy

This document outlines a step-by-step strategy for building **Budg**, a web-based budgeting application, based on the provided Product Requirements Document (PRD), Database Schema Design, System Architecture Design, and Security Design Document. The strategy is designed for a single developer (Travis Volker), targets an initial user base of 25 users, and assumes a $0 budget for tools, relying on free/open-source alternatives. It prioritizes core functionality (authentication, bill/bank account management, spreadsheet-like UI), incorporates compliance features (GDPR, CCPA, SOC 2 alignment) from the start, and hosts the frontend alongside the backend in a Dockerized environment. Automated testing is implemented in parallel with each phase.

## Key Assumptions Based on Clarifications
- [ ] Feature Prioritization: Core features (secure authentication, bill/bank account management, intuitive UI) are prioritized, followed by monitoring and compliance. Non-critical features (e.g., advanced tracing) are deferred or simplified.
- [ ] Deployment Environment: Local Docker for development and testing. Production deployment will be cloud-agnostic but simple (e.g., a single VPS or free-tier cloud service) due to the small user base.
- [ ] Team: Travis Volker is the sole developer, with no timeline constraints, allowing flexibility in implementation.
- [ ] Testing: Automated unit, integration, and end-to-end (E2E) tests are developed in parallel with each phase using free tools.
- [ ] Budget: All tools must be free/open-source (e.g., no paid Sentry, PostHog, or Grafana Cloud). Alternatives like Matomo (for analytics) and custom logging solutions will be used.
- [ ] User Load: 25 users, implying minimal scalability needs initially, but the architecture will remain scalable for future growth.
- [ ] Compliance: GDPR, CCPA, and SOC 2 alignment (e.g., data minimization, user consent, audit logging) implemented from the start.
- [ ] Frontend Hosting: React SPA hosted alongside the FastAPI backend in the same Dockerized environment, served via Uvicorn/Nginx.

## Build-Out Strategy

The strategy is divided into phases, each delivering specific components and functionalities. Phases are ordered to prioritize user-facing features (authentication, bill management, UI) and compliance, with monitoring and observability simplified due to budget constraints. Each phase includes deliverables, dependencies, tasks, automated testing, and validation steps. Effort estimates assume a single developer working full-time, provided for planning purposes.

### Phase 1: Project Setup and Infrastructure
**Goal**: Establish the development environment, version control, CI/CD pipeline, and Dockerized infrastructure using free tools.

**Deliverables**:
- [ ] GitHub repository with branch protection and signed commits.
- [ ] Docker Compose setup for FastAPI, PostgreSQL, Redis, and React SPA.
- [ ] Basic CI/CD pipeline with GitHub Actions (build, test, security scans).
- [ ] Documentation setup (Swagger UI, Markdown-based docs).

**Dependencies**:
- [ ] GitHub account (free tier).
- [ ] Docker and Docker Compose installed locally.
- [ ] Free tools: PostgreSQL, Redis, Node.js, Python 3.9+, Nginx (for frontend hosting).

**Tasks**:

  - [ ] Create a public/private GitHub repository for Budg.
  - [ ] Enable branch protection (require PRs, signed commits) and add `.gitignore` for Python, Node.js, and Docker.
  - [ ] Initialize `README.md` with setup instructions.


  - [ ] Create `docker-compose.yml` for FastAPI (Uvicorn), PostgreSQL (official image), Redis (official image), and Nginx (to serve React SPA and proxy FastAPI).
  - [ ] Configure `.env` for secrets (e.g., database credentials, Redis password).
  - [ ] Build React SPA and serve static files via Nginx, proxying API requests to FastAPI.
- [ ] CI/CD Pipeline:
  - [ ] Set up GitHub Actions workflows for build (compile Docker images for FastAPI and Nginx), test (run pytest for backend and Jest for frontend with coverage), and security (run Dependabot, CodeQL, and Bandit).
  - [ ] Store secrets in GitHub Actions (e.g., Docker Hub credentials).
- [ ] Documentation:
  - [ ] Enable Swagger UI in FastAPI for API documentation.
  - [ ] Create Markdown files in `/docs` for setup, architecture, and contribution guides.
  - [ ] Use JSDoc for React components (instead of Storybook, to avoid setup complexity).

**Automated Testing**:
- [ ] Write basic pytest tests for Docker Compose health checks (e.g., FastAPI `/health` endpoint).
- [ ] Write Jest tests for a sample React component (e.g., a loading spinner).
- [ ] Configure Codecov (free tier) for coverage reporting.

**Validation**:
- [ ] Verify repository setup: Branch protection and signed commits are active.
- [ ] Run `docker-compose up` to confirm FastAPI, PostgreSQL, Redis, and Nginx (React) are accessible.
- [ ] Access Swagger UI (`/docs`) and Nginx-served React SPA (`localhost:80`).
- [ ] Trigger CI/CD pipeline to ensure builds, tests, and scans pass.

**Estimated Effort**: 1-2 weeks.

### Phase 2: Database, Authentication, and Compliance Foundation
**Goal**: Implement the PostgreSQL database, FastAPI authentication (JWT, OAuth2, 2FA), and compliance features (data portability, erasure).

**Deliverables**:
- [ ] PostgreSQL database with all tables from the Database Schema Design.
- [ ] FastAPI backend with user authentication and admin endpoints.
- [ ] Audit logging for database changes.
- [ ] Data portability and erasure endpoints for GDPR/CCPA alignment.

**Dependencies**:
- [ ] Phase 1 infrastructure.
- [ ] Libraries: SQLAlchemy, FastAPI Users, Pydantic, Argon2, PyJWT, python-jose (all open-source).

**Tasks**:
- [ ] Database Schema:
  - [ ] Write SQL migrations (using Alembic) for tables: `User`, `Api_Token`, `OAuth_Account`, `Bill_Status`, `Recurrence`, `Category`, `Bank_Account`, `Bills`, `Due_Bills`, `Bank_Account_Instance`, `Audit_Log`.
  - [ ] Apply migrations in Docker Compose.
  - [ ] Configure indexes (e.g., UNIQUE on `User.email`) and constraints (e.g., CHECK on `font_color_hex`).
- [ ] Audit Logging:
  - [ ] Create PostgreSQL triggers to log CRUD operations to `Audit_Log` (except `Audit_Log`).
  - [ ] Store changes in `TEXT` format (`value_before_change`, `value_after_change`).
- [ ] Authentication:
  - [ ] Configure FastAPI Users for JWT (RS256, 15-minute access tokens, 7-day refresh tokens in Redis), OAuth2 for Google/GitHub (using free developer accounts), and TOTP-based 2FA (using `pyotp`).
  - [ ] Hash passwords with Argon2, enforce 12+ character policy via Pydantic.
  - [ ] Implement rate limiting (5 login attempts per 15 minutes per IP) using Redis.
- [ ] User Management Endpoints:
  - [ ] Create endpoints: `/signup`, `/login`, `/password-reset`, `/enable-2fa`, `/verify-2fa`, `/users/me`.
  - [ ] Add admin endpoints (e.g., `/admin/users`) restricted to `is_superuser = TRUE`.
  - [ ] Enforce RBAC and OAuth2 scopes (e.g., `read:users`, `write:users`).
- [ ] Compliance Features:
  - [ ] Implement `/export-data` endpoint to export user data (CSV of `Bills`, `Due_Bills`, etc.).
  - [ ] Implement `/delete-account` endpoint with cascading deletes to related tables.
  - [ ] Draft a basic privacy policy and terms of service (Markdown, hosted in SPA).
- [ ] Security:
  - [ ] Configure HTTPS with self-signed certificates (local) and Let’s Encrypt (production).
  - [ ] Set CORS to allow only the Nginx-hosted React SPA.
  - [ ] Add security headers (Content-Security-Policy, X-Frame-Options) via FastAPI middleware.
  - [ ] Encrypt sensitive fields (e.g., `hashed_password`) with PostgreSQL pgcrypto (AES-256).
  - [ ] Use a local secret file (e.g., `.env`) for encryption keys (instead of a KMS).

**Automated Testing**:
- [ ] Unit tests for authentication (pytest, fastapi.testclient, PyJWT).
- [ ] Integration tests for database operations (pytest-postgresql).
- [ ] Tests for audit logging (e.g., INSERT triggers log to `Audit_Log`).
- [ ] Tests for compliance endpoints (export CSV, delete account).
- [ ] Security tests for rate limiting and CORS.

**Validation**:
- [ ] Query PostgreSQL to confirm tables, indexes, and constraints.
- [ ] Test authentication flows (signup, login, 2FA, OAuth2) via Swagger UI.
- [ ] Verify `Audit_Log` captures changes (e.g., `INSERT INTO User`).
- [ ] Export user data as CSV and delete a test account.
- [ ] Confirm rate limiting blocks excessive logins.
- [ ] Run CI/CD pipeline, targeting >80% test coverage.

**Estimated Effort**: 3-4 weeks.

### Phase 3: Core Financial Functionality
**Goal**: Implement bill and bank account management with recurrence automation.

**Deliverables**:
- [ ] CRUD endpoints for financial entities (`Bill_Status`, `Recurrence`, `Category`, `Bank_Account`, `Bills`, `Due_Bills`, `Bank_Account_Instance`).
- [ ] Background task for due bill recurrence calculations.
- [ ] Data isolation by `user_id`.

**Dependencies**:
- [ ] Phase 2 backend and database.
- [ ] Libraries: SQLAlchemy, FastAPI BackgroundTasks (open-source).

**Tasks**:
- [ ] API Endpoints:
  - [ ] Implement CRUD endpoints for `Bill_Status` (manage statuses with `highlight_color_hex`), `Recurrence` (manage patterns), `Category` (manage user-defined categories), `Bank_Account` (manage accounts with `recurrence`, `font_color_hex`, `url`), `Bills` (manage bills with `default_amount_due`, `category`, `recurrence`), `Due_Bills` (manage instances with `due_date`, `draft_account`, `status`), and `Bank_Account_Instance` (manage snapshots with `current_balance`, `status`).
  - [ ] Filter all queries by `user_id` (e.g., `SELECT * FROM Bills WHERE user_id = :user_id`).
  - [ ] Validate inputs with Pydantic (e.g., `url` regex, `recurrence_value > 0`).
- [ ] Recurrence Automation:
  - [ ] Create a background task to calculate `Due_Bills.due_date` based on `recurrence` and `recurrence_value`.
  - [ ] Default `min_amount_due` and `draft_account` from `Bills`.
- [ ] Security and Authorization:
  - [ ] Enforce RBAC: Regular users access only their data; admins access all via `/admin` endpoints.
  - [ ] Use OAuth2 scopes (e.g., `read:bills`, `write:bills`).
  - [ ] Log all CRUD operations to `Audit_Log` via triggers.
- [ ] Compliance:
  - [ ] Ensure data minimization (collect only `email`, financial data).
  - [ ] Include financial data in `/export-data` and `/delete-account` endpoints.

**Automated Testing**:
- [ ] Unit tests for each endpoint (pytest, fastapi.testclient).
- [ ] Integration tests for recurrence calculations and `user_id` isolation.
- [ ] Tests for audit logging of financial CRUD operations.
- [ ] Tests for data export/deletion of financial data.

**Validation**:
- [ ] Test CRUD operations via Swagger UI.
- [ ] Verify recurrence task generates correct `Due_Bills` (e.g., monthly due dates).
- [ ] Confirm `user_id` isolation prevents cross-user access.
- [ ] Query `Audit_Log` to verify financial changes.
- [ ] Export and delete financial data for a test user.
- [ ] Run CI/CD pipeline, targeting >85% coverage.

**Estimated Effort**: 4-5 weeks.

### Phase 4: Frontend Development
**Goal**: Build the React SPA with a spreadsheet-like UI, modals, and drag-and-drop functionality.

**Deliverables**:
- [ ] React SPA served via Nginx with table view, date range selector, modals, and tabs.
- [ ] Drag-and-drop reordering for `Due_Bills` and `Bank_Account_Instance`.
- [ ] Compliance links (privacy policy, terms of service).

**Dependencies**:
- [ ] Phase 3 backend APIs.
- [ ] Libraries: React, Bootstrap (CDN), react-dnd, react-date-range (all open-source).

**Tasks**:
- [ ] React Setup:
  - [ ] Initialize React project with Vite.
  - [ ] Configure Nginx to serve React static files and proxy API requests to FastAPI.
  - [ ] Use CDN for Bootstrap; bundle React locally.
- [ ] Table View:
  - [ ] Build a table for `Due_Bills` and `Bank_Account_Instance`, grouped by `draft_account`.
  - [ ] Order by `priority`, `pay_date`, `due_date`.
  - [ ] Add hover effects, inline controls (edit/delete), `status` highlight colors, and `font_color_hex` text.
  - [ ] Hide table if `Bills` list is empty; prompt to add first bill.
- [ ] Drag-and-Drop:
  - [ ] Implement react-dnd for row reordering, updating `priority` via API.
  - [ ] Persist `priority` to the database.
- [ ] Date Range Selector:
  - [ ] Use react-date-range for filtering, defaulting to two weeks before and four weeks after the next account balance.
  - [ ] Fetch filtered data via API.
- [ ] Modals and Dropdowns:
  - [ ] Create modals for CRUD operations (e.g., add/edit `Due_Bills`, `Bank_Account_Instance`).
  - [ ] Add dropdowns with “Add” options and hyperlinks (e.g., for `Category`).
- [ ] Navigation and Compliance:
  - [ ] Implement nested tabs for management pages (`Bank_Account`, `Bills`, `Category`, `Recurrence`, `Bill_Status`).
  - [ ] Add footer links to privacy policy and terms of service (Markdown files).
- [ ] Security:
  - [ ] Ensure all API calls use JWT authentication.
  - [ ] Sanitize inputs to prevent XSS (e.g., using DOMPurify).

**Automated Testing**:
- [ ] Unit tests for components (Jest, React Testing Library).
- [ ] E2E tests for table interactions, modals, and drag-and-drop (Cypress, free tier).
- [ ] Tests for date range filtering and compliance links.

**Validation**:
- [ ] Load SPA via Nginx and confirm table renders with sample data.
- [ ] Test drag-and-drop and verify `priority` updates.
- [ ] Confirm date range selector filters data and defaults are correct.
- [ ] Verify modals, dropdowns, and tabs work.
- [ ] Access privacy policy and terms of service links.
- [ ] Run CI/CD pipeline with Jest and Cypress, targeting >80% coverage.

**Estimated Effort**: 4-6 weeks.

### Phase 5: Monitoring and Observability
**Goal**: Implement lightweight monitoring and logging using free/open-source tools.

**Deliverables**:
- [ ] Custom error logging to PostgreSQL.
- [ ] Prometheus and Grafana (self-hosted) for metrics.
- [ ] File-based logging (instead of ELK/EFK).
- [ ] Matomo (self-hosted) for user analytics.
- [ ] Basic request tracing with custom logging.

**Dependencies**:
- [ ] Phases 2-4 components.
- [ ] Free tools: Prometheus, Grafana, Matomo, Fluentd (for logging).

**Tasks**:
- [ ] Error Logging:
  - [ ] Create a PostgreSQL table (`Error_Log`) for errors from FastAPI, PostgreSQL, and React.
  - [ ] Log errors with `user_id`, timestamp, and stack trace (sanitize sensitive data).
- [ ] Metrics:
  - [ ] Install self-hosted Prometheus and Grafana via Docker Compose.
  - [ ] Configure exporters: Postgres Exporter, Redis Exporter, FastAPI instrumentation.
  - [ ] Collect golden metrics (latency, traffic, errors, saturation) and security metrics (failed logins, rate limit violations).
  - [ ] Create Grafana dashboards for metrics.
- [ ] Logging:
  - [ ] Use Fluentd to aggregate FastAPI, PostgreSQL, and Redis logs to files (encrypted with AES-256).
  - [ ] Retain logs for 1 year in a secure directory.
- [ ] User Analytics:
  - [ ] Install self-hosted Matomo via Docker Compose.
  - [ ] Track user actions (e.g., login, bill creation, modal usage).
  - [ ] Create basic dashboards for behavioral analysis.
- [ ] Request Tracing:
  - [ ] Implement custom tracing by logging request IDs across SPA, FastAPI, PostgreSQL, and Redis to `Error_Log`.
  - [ ] Use Grafana to visualize trace data.
- [ ] Alerts:
  - [ ] Configure Grafana alerts for anomalies (e.g., >5 failed logins in 5 minutes).
  - [ ] Send alerts to email (using free SMTP, e.g., Gmail).

**Automated Testing**:
- [ ] Tests for error logging (simulate invalid API requests).
- [ ] Tests for metrics collection (verify Prometheus scrapes data).
- [ ] Tests for log aggregation (check Fluentd output).
- [ ] Tests for Matomo tracking (simulate user actions).

**Validation**:
- [ ] Query `Error_Log` to confirm errors are captured.
- [ ] Verify Grafana dashboards display metrics.
- [ ] Check Fluentd logs are encrypted and searchable.
- [ ] Confirm Matomo tracks user actions.
- [ ] Trigger alerts and verify email notifications.
- [ ] Run CI/CD pipeline to ensure monitoring doesn’t break builds.

**Estimated Effort**: 2-3 weeks.

### Phase 6: Security and Vulnerability Management
**Goal**: Finalize security controls and vulnerability management with free tools.

**Deliverables**:
- [ ] Encrypted data at rest and in transit.
- [ ] Vulnerability scanning with OWASP ZAP and Bandit.
- [ ] Incident response plan and tabletop exercise.
- [ ] Monthly log review process.

**Dependencies**:
- [ ] Phases 2-5 components.
- [ ] Free tools: OWASP ZAP, Bandit, OpenSSL (for encryption).

**Tasks**:
- [ ] Data Security:
  - [ ] Use PostgreSQL pgcrypto for AES-256 encryption of sensitive fields (e.g., `default_amount_due`).
  - [ ] Encrypt logs and backups with OpenSSL (AES-256).
  - [ ] Enforce TLS 1.3 for all connections (SPA to Nginx, Nginx to FastAPI, FastAPI to PostgreSQL/Redis).
- [ ] Vulnerability Management:
  - [ ] Configure OWASP ZAP for nightly penetration tests in CI/CD.
  - [ ] Run Bandit and CodeQL for code scanning.
  - [ ] Track vulnerabilities in a secure Markdown file (encrypted with GPG).
  - [ ] Apply dependency patches within 7 days, tested in a staging environment.
- [ ] Incident Response:
  - [ ] Document plan: Identification (monitor logs), containment (revoke JWTs, suspend accounts), eradication (patch vulnerabilities), recovery (restore backups), lessons learned.
  - [ ] Designate Travis Volker as the lead.
  - [ ] Conduct a tabletop exercise (e.g., stolen JWT scenario).
- [ ] Log Review:
  - [ ] Document a monthly process to query `Audit_Log` and `Error_Log` for anomalies.
  - [ ] Rotate encryption keys annually using OpenSSL.

**Automated Testing**:
- [ ] Tests for encryption (verify sensitive fields are unreadable).
- [ ] Tests for vulnerability scans (simulate XSS, SQL injection).
- [ ] Tests for incident response (e.g., revoke JWT