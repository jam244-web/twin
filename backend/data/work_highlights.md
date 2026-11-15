# John's engineering work at GE Aerospace (Aug 2023 - present), detail

Role: AI Platform & Software Engineer. I work on a multi-camera computer-vision inspection platform made of about 11 services, and I own the path that carries video from the cameras to the AI model, plus the CI/CD and release engineering around it.

## Scale (measured from git history, Aug 2025 - Aug 2026)
- About 1,190 commits across 11 repositories in one year
- Roughly 64,000 lines added and 38,000 removed of hand-written code (lockfiles, generated code and binaries excluded), over about 500 source files
- 90 test files written or updated; CI/CD and packaging files across the stack
- Languages by share of changes: Python about 42%, C++ 15%, TypeScript 10%, PowerShell 8%, plus YAML (CI/CD), Vue and GraphQL
- Stack: FastAPI, SQLAlchemy, Alembic, Pydantic, GStreamer, Vue 3, Pinia, Apollo, Node/Express, GraphQL, PyInstaller, GitHub Actions, pytest, Vitest, Ruff, ESLint, CodeQL, Dependabot

## Real-time video and inference pipeline
- Replaced a bespoke C++ WebSocket video relay with a custom native GStreamer element that writes frames straight into shared memory. It deleted about 7,750 lines across 52 files and removed a whole serialisation hop between the camera and the AI model.
- Moved JPEG encoding and colour-space conversion from the browser into the native pipeline, cutting per-frame CPU cost.
- Fixed stale-frame desync between concurrent cameras with timestamped shared-memory writes and closest-timestamp frame eviction.
- Fixed a startup race that caused recurring watchdog timeouts at the start of every run, by holding back the video feed until the inference engine reported ready.
- Sped up device startup with a shared pooled HTTP client and a reworked USB reconnect and auto-exposure sequence.

## Features
- Point-to-line measurement for defect sizing, built end to end across the Python measurement engine, the GraphQL schema and a Vue annotation canvas.
- Hardware thermal-safety warnings, with device endpoints and blocking banners in the UI so inspections can't run on out-of-spec hardware.
- Live image controls for operators (gamma and brightness) without a redeploy.
- A device-settings microservice built from scratch: C++ hardware layer, versioned Python API, pytest suite and CI packaging.
- Per-file upload tracking in a cloud sync agent (new schema plus a database migration), so only changed files are re-uploaded.

## Release engineering and CI/CD
- Moved four backend services from Docker containers to native Windows executables (PyInstaller), removing the container runtime from field machines.
- Built Windows release pipelines in GitHub Actions for five services, with versions calculated from conventional commits.
- Fixed repeated release failures behind a TLS-inspecting corporate proxy: mirrored a native SDK to an internal registry, installed the corporate root certificate into the toolchain, added retries.
- Authored the submodule update tooling for the multi-repository tree and kept services version-aligned for releases.
- Enforced test gating in CI for six services, so a build can't be released if tests fail, and standardised linting on Ruff and ESLint.
- Migrated a legacy Python 3.6 pipeline to Python 3.12 with a fully pinned dependency lockfile.
- Built cloud infrastructure and serverless pipelines with Terraform and CloudFormation, including a serverless data-routing pipeline. In one pipeline I fixed a duplicate-upload problem caused by a notification failure silently skipping an end-of-run sync step, and removed a redundant copy step to cut run time.

## Security
- Moved service-to-service authentication to OIDC and mTLS, removing hardcoded client secrets.
- Closed static-analysis path-injection findings by validating input in the filesystem sink instead of in each caller.
- Remediated dependency vulnerabilities and tightened CI workflow permissions; restricted privileged build triggers.
- Removed an in-house licensing subsystem (table, bundled certificates, enforcement code in three services) to reduce attack surface.

## Honesty notes for the twin
- I have not measured and do not claim specific latency, frame-rate, memory, coverage or run-time percentages for these changes.
- Many commits in the integration repositories are submodule version bumps, which are release coordination rather than newly written code.
- I don't share internal product, repository, ticket or customer names.
