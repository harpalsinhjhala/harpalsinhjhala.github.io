// All site copy lives here. Edit text in this file; components only render it.

export const site = {
  url: "https://harpalsinhjhala13.github.io",
  title: "Harpal Sinh Jhala | AI Driven Analytics Engineer and BI Developer",
  description:
    "Harpal Sinh Jhala, AI driven Analytics Engineer and BI Developer. Power BI, SQL and Microsoft Fabric for insurance, brokerage and BFSI teams in MENA and India.",
  lastUpdated: "2026-10-21",
  cvPath: "/resume.pdf",
};

export const profile = {
  name: "Harpal Sinh Jhala",
  initials: "HJ",
  title: "AI Driven Analytics Engineer · BI Developer",
  jobTitle: "Senior Data Analyst",
  line: "I turn messy financial data into decisions CFOs act on. Power BI, SQL, Microsoft Fabric, accelerated by AI.",
  tags: ["BFSI", "Insurance", "MENA", "Microsoft Fabric", "Power BI"],
  location: "Ahmedabad, India · Open to UAE relocation and remote",
  email: "harpalsinhjhala13@gmail.com",
  linkedin: "https://www.linkedin.com/in/harpal-sinh-jhala/",
  github: "https://github.com/harpalsinhjhala13",
  openTo: "Open to Senior BI, Analytics Engineering and Data Analyst roles in UAE, India remote and Ahmedabad.",
  heroImage: { src: "/images/hero", alt: "Harpal Sinh Jhala outside a glass office building", width: 1500, height: 2000 },
  aboutImage: { src: "/images/about", alt: "Harpal Sinh Jhala on a clifftop above a beach in Goa", width: 1500, height: 2000 },
};

// Rows returned by the hero SQL console.
export const sqlImpact = {
  query: "SELECT metric, value FROM harpal_jhala.impact ORDER BY value DESC;",
  rows: [
    { metric: "reporting_tat_reduction", value: "90%" },
    { metric: "npa_revenue_identified", value: "30%" },
    { metric: "brokerage_revenue_lift", value: "15%" },
    { metric: "executive_reports_built", value: "14" },
    { metric: "years_experience", value: "4+" },
  ],
};

export type Kpi = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
  // "drop" draws a real before/after bar (2 days -> 2 hours); "rise" and "flat" are decorative shapes only.
  visual: "drop" | "rise" | "flat";
};

export const kpis: Kpi[] = [
  { value: 90, suffix: "%+", label: "Reporting turnaround cut", context: "2 days to under 2 hours with an automated Power BI to PowerPoint pipeline", visual: "drop" },
  { value: 14, suffix: "", label: "Executive Power BI reports", context: "For the CFO and C-suite at Qatar Insurance Group", visual: "rise" },
  { value: 30, suffix: "%", label: "Real estate revenue found in NPAs", context: "Surfaced by a profitability and client segmentation model", visual: "rise" },
  { value: 15, suffix: "%", label: "Brokerage revenue increase", context: "Driven by inactive account analytics", visual: "rise" },
  { value: 1000, suffix: "+", label: "Energy plants tracked", context: "Cash flow and operational KPIs for Adani Green Energy", visual: "flat" },
  { value: 3, suffix: "", label: "Analyst team led", context: "Requirements, sprint planning and Power BI delivery", visual: "rise" },
];

export type FlowNode = { label: string; detail?: string };

export type Project = {
  slug: string;
  title: string;
  domain: string;
  stack: string[];
  outcome: string;
  featured?: boolean;
  embed: { kind: "powerbi" | "web"; url: string; title: string };
  repo?: string;
  preview: string; // base path without extension, see scripts/optimize-images.mjs
  previewSize: [number, number];
  previewAlt: string;
  caseStudy: {
    problem: string;
    data: string[];
    approach: string[];
    flow: FlowNode[];
    flowNote?: string;
    impact: string[];
    tools: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "ai-sales-analytics",
    title: "AI Sales Analytics",
    domain: "Sales · Microsoft Fabric",
    featured: true,
    stack: ["Microsoft Fabric", "OneLake", "T-SQL", "Python", "D3.js", "Claude Code"],
    outcome:
      "Fabric lakehouse to an interactive D3 dashboard. Analysis, design and code produced by Claude Code agents that I directed and reviewed.",
    embed: { kind: "web", url: "https://harpalsinhjhala13.github.io/ai-sales-analytics/", title: "AI Sales Analytics live dashboard" },
    repo: "https://github.com/harpalsinhjhala13/ai-sales-analytics",
    preview: "/projects/ai-sales",
    previewSize: [1440, 810],
    previewAlt: "AI Sales Analytics dashboard with KPI cards, monthly trend and country by product heatmap",
    caseStudy: {
      problem:
        "Show that an end-to-end analytics product, from governed cloud data to a dashboard people can use, can be built quickly with AI agents doing the drafting and a BI engineer owning the decisions.",
      data: [
        "Source table dbo.sample_data in a Microsoft Fabric Lakehouse on OneLake: Microsoft's public financial sample, 700 rows.",
        "Read through the SQL analytics endpoint with T-SQL, signing in with Microsoft Entra ID.",
      ],
      approach: [
        "Python pipeline (mssql-python, azure-identity) exports and shapes the table.",
        "A build script combines the page source and the CSV into one self-contained HTML file.",
        "Claude Code agents drafted the analysis, dashboard design and code. I set the questions and reviewed the output.",
        "Dashboard: headline KPIs vs the same months of 2013, auto-picked insights, monthly trend, breakdowns, a country by product heatmap, year over year and a searchable data table.",
      ],
      flow: [
        { label: "OneLake Lakehouse", detail: "dbo.sample_data" },
        { label: "SQL analytics endpoint", detail: "T-SQL · Entra ID" },
        { label: "Python pipeline", detail: "mssql-python · azure-identity" },
        { label: "D3 dashboard", detail: "GitHub Pages" },
      ],
      flowNote: "Claude Code agents drafted each stage. I directed and reviewed.",
      impact: [
        "A working Fabric to dashboard pipeline, refreshable with three commands.",
        "Works on phones, with light and dark modes.",
        "Shows the way I work: AI speeds up delivery, and I stay accountable for every number.",
      ],
      tools: ["Microsoft Fabric", "OneLake", "SQL analytics endpoint", "T-SQL", "Python", "D3.js", "Claude Code"],
    },
  },
  {
    slug: "real-estate-brokerage",
    title: "Real Estate Brokerage Analytics",
    domain: "Real Estate",
    stack: ["SQL", "Power BI", "DAX"],
    outcome:
      "Profitability and client segmentation model that identified 30% of total revenue tied to NPAs, plus property performance and sales trends across verticals.",
    embed: {
      kind: "powerbi",
      url: "https://app.powerbi.com/view?r=eyJrIjoiMWY3ZDQ2Y2UtYzE3ZC00ZDMzLWI5MzgtMjkzZjU0NjA0ZmI3IiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
      title: "Real Estate Brokerage Analytics Power BI report",
    },
    preview: "/projects/real-estate",
    previewSize: [1600, 740],
    previewAlt: "Real estate analytics Power BI report with brokerage KPIs, team and lead source charts and a project table",
    caseStudy: {
      problem:
        "Leadership needed to see where brokerage revenue really came from and how much of it was at risk in non-performing assets.",
      data: [
        "Transaction-level brokerage records: sale count, area, property value, brokerage booked, received and pending, third party payouts, lead source and team.",
      ],
      approach: [
        "SQL to shape the transaction data, a Power BI model with DAX measures on top.",
        "A brokerage waterfall from booked to net-to-company and RM revenue.",
        "Pages for brokerage, team, accrued brokerage, sales, projects, received brokerage, lead origin, expiry dates and deleted transactions.",
      ],
      flow: [
        { label: "SQL", detail: "Transaction data" },
        { label: "Power BI model", detail: "DAX measures" },
        { label: "Report", detail: "9 navigable pages" },
      ],
      impact: [
        "Identified 30% of total revenue tied to NPAs.",
        "Property performance and sales trend analytics across multiple verticals.",
      ],
      tools: ["SQL", "Power BI", "DAX"],
    },
  },
  {
    slug: "stock-brokerage",
    title: "Stock Brokerage Analytics",
    domain: "Capital Markets",
    stack: ["SQL", "Power BI", "DAX"],
    outcome:
      "Segment-wise trade and revenue analytics to find high potential HNI clients, with active and passive client tracking that helped RMs prioritise advisory effort.",
    embed: {
      kind: "powerbi",
      url: "https://app.powerbi.com/view?r=eyJrIjoiY2E4ZDYzMmItODU5NS00Nzk4LTg4NWItNjFjODMyOWU0MTgwIiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
      title: "Stock Brokerage Analytics Power BI report",
    },
    preview: "/projects/stock-brokerage",
    previewSize: [1600, 740],
    previewAlt: "Stock brokerage analytics Power BI report with brokerage KPIs, client counts and a segment split donut",
    caseStudy: {
      problem:
        "Sales teams and relationship managers needed to know which clients had the most potential and which accounts had gone quiet.",
      data: [
        "Client trade and brokerage data: gross, net and partner brokerage, ARPU, traded and total clients, daily incremental brokerage.",
        "Split by segment (equity, derivative, commodity), team leader, direct or sub-broker and branch.",
      ],
      approach: [
        "SQL to prepare trade and revenue data, a Power BI model with DAX measures.",
        "Segment-wise trade and revenue views to surface high potential HNI clients.",
        "Active and passive client behaviour tracking.",
        "Pages for brokerage, KYC, group, team, FY trend, 30 day trend and mutual funds.",
      ],
      flow: [
        { label: "SQL", detail: "Trade and revenue data" },
        { label: "Power BI model", detail: "DAX measures" },
        { label: "Report", detail: "Segments · activity" },
      ],
      impact: [
        "Sales teams could identify high potential HNI clients.",
        "Relationship managers prioritised advisory effort using active and passive behaviour tracking.",
      ],
      tools: ["SQL", "Power BI", "DAX"],
    },
  },
  {
    slug: "car-theft-analytics",
    title: "Car Theft Analytics + AI",
    domain: "Public Safety · AI-built report",
    stack: ["Power BI", "DAX", "Power Query", "Claude Code"],
    outcome:
      "New Zealand vehicle theft analysis on 4,553 records. I designed the star schema and 28 DAX measures. Claude Code built the 5-page report and theme under my direction.",
    embed: {
      kind: "powerbi",
      url: "https://app.powerbi.com/view?r=eyJrIjoiZjk1Zjk0NWUtMmUxYS00OGY4LTkxMmEtNGRjNzdjYmJjM2JhIiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
      title: "Car Theft Analytics Power BI report",
    },
    repo: "https://github.com/harpalsinhjhala13/AI-Car-Theft-Analytics",
    preview: "/projects/car-theft",
    previewSize: [1920, 1080],
    previewAlt: "Car theft analytics overview page with KPI cards, daily trend and region treemap",
    caseStudy: {
      problem:
        "How many vehicles were stolen in New Zealand, where, which vehicles, and when? And can AI build the report layer while a BI developer owns the model?",
      data: [
        "Three CSVs from NZ Police stolen vehicle records: 4,553 thefts, 138 makes, 16 regions with population and density.",
        "Period: 7 Oct 2021 to 6 Apr 2022.",
        "Cleaned in Power Query: unknown makes mapped, blanks standardised, population text converted, dates parsed.",
      ],
      approach: [
        "Me: star schema with 1 fact and 4 dimensions, 28 DAX measures in 6 display folders (time intelligence, rates per 100K, rankings), optimisation rules.",
        "Claude Code: 5 storytelling pages, custom theme, page navigation, then validated each page from screenshots.",
        "I reviewed every round and pushed back until navigation, titles and colour worked.",
      ],
      flow: [
        { label: "3 CSV files", detail: "NZ Police records" },
        { label: "Power Query", detail: "Cleaning" },
        { label: "Star schema", detail: "1 fact · 4 dims" },
        { label: "28 DAX measures", detail: "6 folders" },
        { label: "5-page report", detail: "Built by Claude Code" },
      ],
      flowNote: "I own the model. Claude Code built the report pages under review.",
      impact: [
        "Monthly thefts more than doubled, from 464 (Oct 2021) to 1,053 (Mar 2022).",
        "Auckland has 36% of thefts, but Gisborne has the highest rate at 338 per 100K.",
        "Only 4.2% of stolen vehicles are luxury makes. Toyota, stationwagons and silver cars lead.",
      ],
      tools: ["Power BI Desktop", "PBIP / TMDL", "Power Query (M)", "DAX", "Claude Code"],
    },
  },
  {
    slug: "hr-analytics",
    title: "HR Management Analytics",
    domain: "People Analytics",
    stack: ["SQL", "Power BI"],
    outcome:
      "Workforce analytics covering attrition patterns, hiring funnel and headcount trends. Early warning indicators surfaced to HR leadership, 20% attrition reduction.",
    embed: {
      kind: "powerbi",
      url: "https://app.powerbi.com/view?r=eyJrIjoiZmQ4NjA5NDQtOTE5NS00NzlhLWJjZDAtY2Q5NTEyMmUyMThlIiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
      title: "HR Management Analytics Power BI report",
    },
    preview: "/projects/hr-analytics",
    previewSize: [1600, 740],
    previewAlt: "HR analytics Power BI report with headcount, joiners and leavers, employee ageing and location charts",
    caseStudy: {
      problem: "HR leadership needed to understand what drives attrition and spot it before people leave.",
      data: [
        "Employee master data across group companies: status, company, department, designation, reporting manager, location, join and resignation dates.",
      ],
      approach: [
        "SQL to prepare employee data, a Power BI model with DAX measures.",
        "Active headcount, FY joiners and leavers, 90 and 30 day joiners and leavers, average tenure of resigned employees.",
        "Tenure buckets for active and resigned staff, location split, and pages for joined vs resigned and company view.",
      ],
      flow: [
        { label: "SQL", detail: "Employee data" },
        { label: "Power BI model", detail: "DAX measures" },
        { label: "Report", detail: "Attrition drivers" },
      ],
      impact: [
        "Early warning indicators surfaced to HR leadership.",
        "20% reduction in attrition.",
      ],
      tools: ["SQL", "Power BI", "DAX"],
    },
  },
];

export const enterpriseWork = [
  {
    client: "Qatar Insurance Group",
    region: "MENA",
    points: [
      "14 executive Power BI reports for the CFO, Senior VP and C-suite: profitability, claims ratio, loss ratio and disease burden.",
      "Reporting built to UAE data governance and compliance standards.",
      "Automated Power BI to PowerPoint pipeline cut a 2 day task to under 2 hours.",
    ],
  },
  {
    client: "Adani Green Energy",
    region: "India",
    points: ["5 Power BI reports tracking real-time cash flow and operational KPIs across 1,000+ plants."],
  },
  {
    client: "Ports efficiency model",
    region: "Infrastructure",
    points: ["Reporting model that reduced CAPEX planning uncertainty for senior leadership."],
  },
];

export type Role = {
  role: string;
  org: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  startLabel: string;
  endLabel: string;
  points: string[];
  award?: string;
  kind: "work" | "education";
};

export const experience: Role[] = [
  {
    role: "Senior Data Analyst",
    org: "WhiteBlue Cloud Services",
    start: "2025-03",
    end: null,
    startLabel: "Mar 2025",
    endLabel: "Present",
    points: ["Clients: Qatar Insurance Group, Adani Green Energy.", "Executive BI for MENA insurance, energy and ports."],
    award: "Champion of Customer Trust 2025",
    kind: "work",
  },
  {
    role: "BI Developer",
    org: "Kunvarji Group (Techaxion)",
    start: "2024-02",
    end: "2025-03",
    startLabel: "Feb 2024",
    endLabel: "Mar 2025",
    points: [
      "Led architecture of a master enterprise data warehouse across stock brokerage, real estate and insurance.",
      "SQL Server, stored procedures, ETL. Led a team of 3.",
    ],
    award: "Star Performer 2024",
    kind: "work",
  },
  {
    role: "Data Analyst",
    org: "BYJU'S",
    start: "2022-09",
    end: "2023-09",
    startLabel: "Sep 2022",
    endLabel: "Sep 2023",
    points: ["Power BI reporting and automated pipelines for Academics.", "ERP data quality through SQL."],
    kind: "work",
  },
  {
    role: "B.E. Electrical Engineering",
    org: "GTU",
    start: "2018-08",
    end: "2022-06",
    startLabel: "2018",
    endLabel: "2022",
    points: [],
    kind: "education",
  },
];

// Rendered as tables in a schema explorer. No proficiency scores on purpose.
export const skills: { table: string; label: string; columns: string[] }[] = [
  { table: "bi_visualisation", label: "BI and Visualisation", columns: ["Power BI", "DAX", "Power Query (M)", "Semantic Modelling", "Excel"] },
  {
    table: "data_engineering",
    label: "Data Engineering",
    columns: ["SQL", "T-SQL", "SQL Server", "SSIS", "ETL/ELT", "Dimensional Modelling", "Data Warehousing"],
  },
  { table: "cloud", label: "Cloud", columns: ["Microsoft Fabric", "OneLake", "Azure Data Factory", "Azure Data Lake"] },
  { table: "ai_automation", label: "AI and Automation", columns: ["Claude Code", "AI assisted analytics engineering", "Python", "Power Automate"] },
  {
    table: "business",
    label: "Business",
    columns: ["Requirement Gathering", "Stakeholder Management", "Agile Sprint Planning", "Financial and MIS Reporting"],
  },
];

export const domains = ["Insurance", "Stock Brokerage", "Real Estate", "Banking", "Energy"];

export const aiWorkflow = [
  { step: "Direct", text: "I define the business question and the data model." },
  { step: "Accelerate", text: "AI agents draft the SQL, DAX, pipelines and UI." },
  { step: "Verify", text: "I check every number against source, because executives act on it." },
];

export const awards = [
  {
    title: "Champion of Customer Trust",
    org: "WhiteBlue Cloud Services",
    year: "2025",
    note: "For BI delivery to Qatar Insurance Group across MENA insurance reporting.",
  },
  {
    title: "Star Performer",
    org: "Kunvarji Group",
    year: "2024",
    note: "For BI delivery and business impact across multiple verticals.",
  },
];

export const nav = [
  { href: "#impact", label: "Impact" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
