/*
  CONTENT FILE FOR UMAIRZIA.GITHUB.IO
  ===================================
  Every word a visitor reads on the site lives in this one file.
  Edit the text between quotes, save, commit to the main branch,
  and GitHub Pages redeploys the site in about a minute.

  Rules for editing safely:
  1. Keep the quotes around each piece of text.
  2. Keep the commas at the end of lines.
  3. Do not change the words to the left of each colon (they are field names the pages look for).
  4. To hide an item, delete its whole block from { to }, including the comma after it.

  TODO ITEMS ARE MARKED WITH THE WORD TODO.
*/

window.CONTENT = {

  /* ---------- BASICS ----------
     name: your name as shown in the hero and the page footer.
     tagline: the one line under your name.
     intro: one sentence about you, shown in the hero. */
  name: "Umair Zia",
  tagline: "Data & Business Analyst | Payments, AR & Reporting Automation | Toronto",
  intro: "I manage a $1M+ B2B portfolio at a food service distributor and build the Python, SQL and AI reporting tools that keep it accurate.",
  location: "Toronto, Ontario",

  /* ---------- CONTACT ----------
     Phone number and home address are intentionally left off this site. */
  contact: {
    email: "umairzia71@gmail.com",
    linkedin: "https://www.linkedin.com/in/UmairZia777",
    github: "https://github.com/umairzia"
  },

  /* ---------- RESUME ----------
     Replace the placeholder PDF at this path with your real resume.
     Keep the same file name so this link keeps working. */
  resume: "assets/resume/Umair_Zia_Resume.pdf",

  /* ---------- KEY RESULTS ----------
     The number cards near the top of the page.
     value: the big number. label: the short line under it. */
  keyResults: [
    { value: "$1M+", label: "B2B portfolio managed across 100+ accounts" },
    { value: "14 days", label: "receivables cycle, down from a longer baseline, through risk-ranked collections" },
    { value: "$45K/yr", label: "caught in double entries, faulty payments and missing credits" },
    { value: "72%", label: "faster reporting with Python and Excel tools, 12.7 to 3.5 hours" },
    { value: "250+ hrs/yr", label: "saved by AI report automation governed by written guardrails" },
    { value: "30%", label: "cut in product returns after root-cause analysis of complaint data" }
  ],

  /* ---------- ROLES I AM TARGETING ---------- */
  targetRoles: [
    "Data Analyst",
    "Business Analyst",
    "Financial / AR Analyst",
    "Payments Analyst",
    "Account Manager"
  ],

  /* ---------- EXPERIENCE ----------
     Listed newest first by end date. Each role can be expanded on the page.
     start and end: shown as written. bullets: one achievement per line. */
  experience: [
    {
      title: "Account Manager & Operations Analyst",
      company: "Crisp Produce",
      location: "Etobicoke, ON",
      start: "Apr 2023",
      end: "Present",
      summary: "Food service distributor to restaurants, bars, golf clubs and institutions, including national restaurant chains.",
      bullets: [
        "Manage a $1M+ portfolio of 100+ B2B accounts, covering pricing, invoicing, credits, disputes and escalations.",
        "Ranked 100+ accounts by risk using DSO, collection-effectiveness and AR turnover metrics, bringing the receivables cycle to within 14 days.",
        "Reconcile invoices, payments, EFT remittances and credits weekly, catching about $45K per year in double entries, faulty payments and missing credits.",
        "Built Python and Excel reporting tools that cut reporting turnaround by 72%, from 12.7 to 3.5 hours, and save 15+ hours per week.",
        "Automated recurring inventory, sales-velocity and price-check reports with AI, saving 250+ hours per year under 10+ written guardrail rules.",
        "Managed card transactions and weekly Moneris sales reports for 100+ clients from 2023 to 2025, then led the 2025 migration of their card payment profiles to a new platform from start to finish.",
        "Run daily CrunchTime and Rosnet invoice integrations for chain customers, now in a third year, and resolve failed uploads with CrunchTime's product manager.",
        "Compare about 190 product lines across price lists and invoices in a monthly vendor price-trend report. Detected a supplier price increase and quantified the excess spend.",
        "Ran root-cause analysis of complaint, return and ordering data that helped cut product returns by 30%, and worked with operations, logistics and finance to improve delivery efficiency by 55%.",
        "Onboarded several $50K+ accounts during 20% yearly company growth and generated leads worth $10K per month."
      ]
    },
    {
      title: "Data Migration Specialist (Contract)",
      company: "ELXR Juice Lab",
      location: "Etobicoke, ON",
      start: "Apr 2023",
      end: "Apr 2024",
      summary: "",
      bullets: [
        "Mapped the data model and migrated customer, supplier, product-code and invoice records from a legacy accounting system to a new platform.",
        "Wrote validation rules that prevented $25K to $50K per month in discrepancies, reaching 100% accuracy and compliance at go-live.",
        "Automation saved 4 to 5 hours per day.",
        "Wrote migration reports covering findings, compliance status and open items."
      ]
    },
    {
      title: "Healthcare Analytics Consultant (Freelance)",
      company: "Combined Military Hospital",
      location: "Pakistan",
      start: "Jan 2022",
      end: "Jun 2023",
      summary: "",
      bullets: [
        "Ran KPI patient surveys and focus groups across 3 facilities, with a response rate 25% above projection.",
        "Translated survey material from Urdu to English and analyzed results in SPSS (v25) and R, including social media feedback.",
        "Recommendations were adopted by hospital leadership."
      ]
    },
    {
      title: "Bookkeeper & Record Technician (Part-time)",
      company: "Crisp Produce",
      location: "Etobicoke, ON",
      start: "Dec 2022",
      end: "Apr 2023",
      summary: "",
      bullets: [
        "Maintained customer, product and order records for 100+ clients in MoneyWorks.",
        "Supported weekly payment reconciliation.",
        "Promoted to Account Manager in April 2023."
      ]
    },
    {
      title: "Business Development Analyst",
      company: "Petroleum Exploration (Pvt) Limited",
      location: "Lahore, Pakistan",
      start: "Nov 2020",
      end: "Dec 2021",
      summary: "",
      bullets: [
        "Prepared cost-benefit briefings on legal, financial and regulatory documents that saved the legal department 100+ hours per month.",
        "Produced bi-monthly proposals and presentation decks for government contracts and helped win a competitive government contract.",
        "Led a $1M+ negotiation with a mining partner, securing a profit share 7.5% above projection."
      ]
    },
    {
      title: "Intern",
      company: "National Logistics Cell (NLC)",
      location: "Pakistan",
      start: "2019",
      end: "2019 (6 months)",
      summary: "",
      bullets: [
        "Wrote an internal feasibility study of about 6,000 words on expanding into air freight for leadership, drawing on World Bank, UN and market data, competitor profiles and a SWOT analysis. The study was internal and was not published."
      ]
    }
  ],

  /* ---------- PROJECTS ----------
     slug: the file name of the case-study page in /projects/ (do not change).
     tags: used by the filter buttons. Allowed tags: Python, SQL, Dashboards, Finance, AI, Research.
     github: full repo link, or null to show "Case study only".
     live: a live demo link, or null. */
  projects: [
    {
      slug: "transaction-data-quality-pipeline",
      title: "Transaction Data-Quality Pipeline",
      oneLiner: "Python pipeline that validates, cleans and flags anomalies in 11,000+ transaction lines for a national restaurant-chain client.",
      tags: ["Python", "Finance"],
      tools: ["Python", "Pandas", "Jupyter"],
      github: null,
      live: null,
      caseStudy: {
        problem: "Invoice and payment data for a national restaurant-chain client arrived from several systems with duplicates, pricing mismatches and missing credits. Checking the lines by hand was slow and errors reached month-end reporting.",
        built: "An end-to-end Python and Jupyter pipeline that validates, cleans and flags anomalies in 11,000+ transaction lines. The pipeline applies validation rules for duplicates, price variances and missing records, then outputs a flagged exception list for human review.",
        tools: "Python, Pandas and Jupyter.",
        result: "The pipeline supports the weekly reconciliation process that catches about $45K per year in double entries, faulty payments and missing credits, and it feeds the reporting workflow that cut turnaround by 72%, from 12.7 to 3.5 hours.",
        learned: "Validation rules are only as good as the exception workflow behind them. Flagging a problem is cheap. Routing it to a person who can fix it is what protects the numbers."
      }
    },
    {
      slug: "procurement-dashboard-generator",
      title: "Procurement Dashboard Generator",
      oneLiner: "Reusable Python-only kit that generates interactive procurement dashboards for 80+ customers from raw order data.",
      tags: ["Python", "Dashboards"],
      tools: ["Python", "Pandas"],
      github: null,
      live: null,
      caseStudy: {
        problem: "Restaurant and hospitality clients wanted visibility into their purchasing, but building a one-off report for each customer did not scale across 80+ accounts.",
        built: "A reusable Python-only kit that takes raw order data and generates an interactive procurement dashboard for any customer. The same code serves every account, so a new dashboard is a configuration change rather than a new build.",
        tools: "Python and Pandas, with no external BI license required.",
        result: "Interactive procurement dashboards available for 80+ customers from a single codebase.",
        learned: "A tool that produces reports beats a report. Writing the generator once removed the marginal cost of every dashboard after the first."
      }
    },
    {
      slug: "market-analytics-dashboards",
      title: "Market Analytics Dashboards",
      oneLiner: "Forex and oil market dashboards built from public APIs with moving-average and volatility measures.",
      tags: ["Python", "Dashboards", "Finance"],
      tools: ["Python", "Public market APIs"],
      github: "https://github.com/umairzia/oil-qqq-dashboard-demand-supply",
      live: "https://umairzia.github.io/oil-qqq-dashboard-demand-supply/",
      caseStudy: {
        problem: "I wanted a self-updating view of forex and oil markets without paying for a terminal, and a public project that shows how I handle time-series data.",
        built: "Dashboards that pull prices from public APIs and compute moving averages and volatility measures. The oil dashboard presents an interactive demand and supply view of how oil price changes relate to the QQQ stock ticker, and it is published on GitHub Pages.",
        tools: "Python and public market data APIs.",
        result: "A live, free-to-host dashboard anyone can open in a browser, with the full code public on GitHub.",
        learned: "Public APIs change and break. Building retry and validation steps into the data pull mattered more than any chart decision."
      }
    },
    {
      slug: "network-analysis-political-youtubers",
      title: "Network Analysis of Political YouTubers",
      oneLiner: "Dataset of 19 political YouTubers (2017 to 2018) built from public YouTube content and mapped in Gephi.",
      tags: ["Research"],
      tools: ["Gephi", "Public YouTube data"],
      github: "https://github.com/umairzia/ECON_Gephi_Umair",
      live: null,
      caseStudy: {
        problem: "How political YouTube channels referenced and connected to each other was easy to speculate about and hard to see.",
        built: "A dataset of 19 political YouTubers covering 2017 to 2018, built from public YouTube content, and a network map of their connections in Gephi.",
        tools: "Gephi and public YouTube data.",
        result: "A network graph that makes the connection structure of the 19 channels visible, with the dataset and files public on GitHub.",
        learned: "Most of the work in network analysis is defining what counts as a connection. The graph itself is the last 10% of the project."
      }
    },
    {
      slug: "kmeans-clustering",
      title: "K-Means Clustering",
      oneLiner: "Segmentation analysis in Python using the k-means algorithm.",
      tags: ["Python"],
      tools: ["Python", "scikit-learn", "Jupyter"],
      github: "https://github.com/umairzia/kmeans-clustering",
      live: null,
      caseStudy: {
        problem: "Groups inside a dataset are rarely visible from summary statistics alone. I wanted a worked, public example of unsupervised segmentation.",
        built: "A segmentation analysis in Python using the k-means algorithm, from feature preparation through choosing the number of clusters to interpreting the segments.",
        tools: "Python and Jupyter.",
        result: "A public, reproducible notebook on GitHub that walks through the full clustering workflow.",
        learned: "Choosing k is a business decision as much as a statistical one. A segmentation is useful when each cluster suggests a different action."
      }
    },
    {
      slug: "ai-automation-guardrails",
      title: "AI Automation with Guardrails",
      oneLiner: "AI automation of recurring accounting reports, saving 250+ hours per year under 10+ written guardrail rules.",
      tags: ["AI"],
      tools: ["Claude", "Claude Code", "Custom Claude skills", "Python"],
      github: null,
      live: null,
      caseStudy: {
        problem: "Recurring inventory, sales-velocity and price-check reports consumed hours every week, but accounting data is exactly where unsupervised automation is most dangerous.",
        built: "AI automation of the recurring reports, built with custom Claude skills and Claude Code tools, and governed by 10+ written guardrail rules. The rules keep invoices, payments and product data read-only and require a person to approve every change. Everything was tested in a separate test environment before touching real workflows.",
        tools: "Claude, Claude Code, custom Claude skills and Python. Described at a general level with no company data.",
        result: "250+ hours saved per year on recurring reporting, with no AI write access to financial records.",
        learned: "The guardrail document is the real product. Automation earned trust because every rule was written down, testable and reviewed before launch."
      }
    }
  ],

  /* ---------- SKILLS ---------- */
  skills: [
    {
      group: "Data & Programming",
      items: ["SQL (BigQuery, PostgreSQL)", "Python (Pandas, NumPy)", "R", "SPSS", "Jupyter", "Git and GitHub"]
    },
    {
      group: "BI & Analytics",
      items: ["Tableau", "Advanced Excel and Google Sheets (XLOOKUP, pivot tables, macros)", "Statistical analysis", "Regression", "Clustering"]
    },
    {
      group: "Finance & Business Systems",
      items: ["MoneyWorks", "Xero", "QuickBooks", "Moneris", "CrunchTime", "Rosnet", "HubSpot (familiar)", "AR and reconciliation"]
    },
    {
      group: "AI",
      items: ["Claude (Projects, skills, Claude Code, MCP)", "ChatGPT", "AI workflow design", "Guardrails and testing"]
    },
    {
      group: "Languages",
      items: ["English (fluent)", "Urdu (fluent)", "French (developing)"]
    }
  ],

  /* ---------- EDUCATION ---------- */
  education: [
    {
      credential: "Master of Management Analytics",
      school: "Smith School of Business, Queen's University",
      dates: "Apr 2022 to Apr 2023",
      notes: "Scotiabank Innovators Scholarship. GPA 4.12. Courses include Analytics for Financial Markets, Big Data Analytics, Predictive Modelling, and Acquisition & Management of Data. Agile and Scrum team projects."
    },
    {
      credential: "BSc (Hons) Economics, Minor in Computer Science & Mathematics",
      school: "Lahore University of Management Sciences (LUMS)",
      dates: "2015 to 2019",
      notes: "Distinction. Dean's Honour List."
    }
  ],

  /* ---------- CERTIFICATIONS ---------- */
  certifications: [
    "MicroMasters in Data Science, edX (2021 to 2022)",
    "REMIC Mortgage Agent Course and Examination (2025)",
    "Cambridge International A Level Accounting, Grade A*",
    "LearnSQL certificates: SQL JOINs and Monthly SQL Practice (2025)"
  ],

  /* ---------- WRITING ----------
     featured: the lead article. medium: shorter posts listed under it. */
  writing: {
    featured: {
      title: "What does the continued closure of the Strait of Hormuz mean for Pakistan?",
      outlet: "Profit by Pakistan Today",
      date: "March 2026",
      url: "https://profit.pakistantoday.com.pk/2026/03/18/what-does-the-continued-closure-of-the-strait-of-hormuz-mean-for-pakistan"
    },
    medium: [
      {
        title: "Visualizing flavanols and heavy metal content in specific dark chocolate brands",
        url: "https://medium.com/@umairzia71/visualizing-flavanols-and-heavy-metal-content-in-specific-dark-chocolate-brands-4594270dbc0d"
      },
      {
        title: "The Grok 3 banana peel experiment: a tale of AI, fruits and stubborn scissors",
        url: "https://medium.com/@umairzia71/the-grok-3-banana-peel-experiment-a-tale-of-ai-fruits-and-stubborn-scissors-e1664fdfa551"
      },
      {
        title: "Iterative problem solving: never start with boilerplate GPT code",
        url: "https://medium.com/@umairzia71/iterative-problem-solving-never-start-with-boiler-plate-gpt-code-33f6e43d7d8e"
      }
    ]
  }
};
