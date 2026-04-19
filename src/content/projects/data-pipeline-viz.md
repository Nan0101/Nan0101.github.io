---
title: "Data Pipeline Observability Dashboard"
slug: "data-pipeline-viz"
year: 2023
tags: ["Data", "Full-stack"]
stack: ["Python", "Apache Airflow", "dbt", "React", "D3.js", "PostgreSQL"]
summary: "Built an end-to-end observability layer for a multi-stage data pipeline, surfacing lineage, freshness SLAs, and anomaly alerts in a single dashboard."
problem: "A data team operating 80+ Airflow DAGs had no unified view of pipeline health — failures were discovered by downstream consumers rather than proactively caught, causing hours of data latency."
approach: "Instrumented DAG runs to emit structured metadata events, built a lineage graph computed from dbt manifests, and created a React + D3.js dashboard with real-time DAG status, column-level lineage, and configurable SLA alerting."
outcome: "Mean time to detect pipeline failures dropped from 4 hours to under 12 minutes. The team recovered 6 hours/week previously spent on manual status checks."
featured: true
github: "https://github.com/Nan0101"
metrics:
  - label: "MTTD improvement"
    value: "95%"
  - label: "Hours saved/week"
    value: "6"
  - label: "DAGs monitored"
    value: "80+"
---

Building visibility into the invisible — making data pipelines observable so teams can act on problems before users notice them.
