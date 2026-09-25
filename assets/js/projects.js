/* ============================================================
   PROJECTS — add a new object to this list to add a project.
   Fields:
     title, context, period, status ("Shipped" | "In progress" | "Evaluation")
     summary   – one or two sentences, the problem and what you built
     flow      – the pipeline, left to right (rendered as a diagram)
     built     – bullet list of what YOU did (be specific)
     stack     – technology tags
     repo      – optional GitHub link (shows a "View code" button)
     posts     – optional write-ups [{ title, url }] (your Medium articles about it)
     metrics   – optional numbers [{ value, label }], e.g. { value: "30 min", label: "refresh cadence" }
     featured  – optional true → marked as a flagship project and shown first
     links     – optional extra links [{ label, url }] (live demo, video, slides)
   ============================================================ */
window.PROJECTS = [
  {
    title: "Azure → OneLake ingestion pipeline",
    context: "Wizr AI · Microsoft Fabric",
    period: "2026",
    status: "Shipped",
    summary:
      "A pipeline that brings data from Azure sources into Microsoft Fabric OneLake and transforms it with Fabric notebooks. It runs on a schedule and can also be triggered by events.",
    flow: ["Azure sources", "Fabric pipeline", "OneLake Lakehouse", "Fabric notebooks (PySpark)", "Delta tables"],
    built: [
      "Built the ingestion from Azure into OneLake's Lakehouse storage layer.",
      "Wrote the transformations in Fabric notebooks with PySpark, storing the results as Delta Parquet tables.",
      "Set up both scheduled and event-based triggers, so the pipeline isn't limited to fixed batch runs."
    ],
    stack: ["Microsoft Fabric", "OneLake", "Lakehouse", "Delta Parquet", "PySpark", "T-SQL"]
  },
  {
    title: "Data migration feasibility platform (LLM-powered)",
    context: "QBurst · Visualization-platform migrations",
    period: "2025 – 2026",
    status: "Shipped",
    summary:
      "A FastAPI tool for planning migrations between visualization platforms. Claude and GPT models generate questionnaires that fit each migration, then write a feasibility report used for migration planning.",
    flow: ["Migration inputs", "FastAPI service", "Claude / GPT", "JSON-validated output", "Feasibility report"],
    built: [
      "Built the FastAPI application that runs the assessment from start to finish.",
      "Integrated Claude and GPT models to generate context-aware assessment questionnaires and the final planning report.",
      "Used prompt engineering so the LLMs return consistent, parseable JSON every time.",
      "Helped containerise the app with Docker for consistent deployments."
    ],
    stack: ["Python", "FastAPI", "Claude", "GPT", "Prompt engineering", "Docker"]
  },
  {
    title: "Retail automation data platform",
    context: "QBurst · Retail",
    period: "2023 – 2024",
    status: "Shipped",
    summary:
      "A cloud data platform for a retailer that brings POS, e-commerce, warehousing and inventory data together. Automated pipelines feed dashboards with near-real-time insights.",
    flow: ["POS · E-com · Warehouse · Inventory", "AWS S3", "Lambda ETL (EventBridge)", "AWS RDS", "Superset dashboards"],
    built: [
      "Automated the ETL pipelines with AWS Lambda, triggered by EventBridge.",
      "Stored raw data in S3 and modelled data in RDS.",
      "Built analytics dashboards in Apache Superset.",
      "Managed the AWS infrastructure (EventBridge, Lambda, S3) for automated deployments."
    ],
    stack: ["Python", "AWS S3", "AWS Lambda", "AWS EventBridge", "AWS RDS", "Apache Superset"]
  },
  {
    title: "End-to-end AWS data pipeline & analytics",
    context: "QBurst · Data engineering",
    period: "2023 – 2026",
    status: "Shipped",
    summary:
      "An AWS data pipeline covering ingestion, storage, analytics and infrastructure-as-code.",
    flow: ["AWS S3", "AWS Lambda", "AWS RDS", "Glue + Athena", "Analytics"],
    built: [
      "Built and managed the pipeline across S3, Lambda and RDS.",
      "Ran analytics with AWS Glue and Athena.",
      "Provisioned the cloud infrastructure with Terraform."
    ],
    stack: ["AWS S3", "AWS Lambda", "AWS RDS", "AWS Glue", "AWS Athena", "Terraform"]
  },
  {
    title: "CSV preprocessing CLI → PostgreSQL",
    context: "QBurst · Training project",
    period: "2023",
    status: "Shipped",
    summary:
      "A Python command-line tool that preprocesses files with Pandas and dbt and stores the transformed data in PostgreSQL.",
    flow: ["Input files", "Pandas preprocessing", "dbt models", "PostgreSQL"],
    built: [
      "Built a Python CLI to process input files.",
      "Cleaned the data with Pandas and modelled it with dbt.",
      "Loaded the transformed data into PostgreSQL."
    ],
    stack: ["Python", "Pandas", "dbt", "PostgreSQL", "CLI"]
  },
  {
    title: "Amazon product scraper & price analysis",
    context: "Personal project · Data extraction",
    period: "2023",
    status: "Shipped",
    summary:
      "An automated scraper that collects Amazon product details across categories, with the data cleaned and analysed for pricing and rating trends.",
    flow: ["Amazon categories", "Selenium + BeautifulSoup", "Pandas cleaning", "Pricing & ratings analysis"],
    built: [
      "Built the scraper with BeautifulSoup and Selenium, including pagination.",
      "Cleaned the dataset with Pandas and analysed pricing, ratings and trends.",
      "Exported structured data for downstream use."
    ],
    stack: ["Python", "BeautifulSoup", "Selenium", "Pandas"]
  }
];
