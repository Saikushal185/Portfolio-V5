// All projects, lifted out of JSX into pure data. `icon` is a lucide icon name
// resolved at render time via src/shared/iconMap.ts.

export interface ProjectStory {
    hook: string;
    problem: string;
    investigation: string;
    result: string;
    metric: string;
    metricLabel: string;
}

export interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string;
    category: string;
    icon: string;
    featured?: boolean;
    story?: ProjectStory;
    /**
     * Set false to keep a project off the findings wall even though it has a
     * story. The narrative and the metric stay in the data — this is an
     * editorial call about what the wall leads with, not a deletion, so it can
     * be reversed by flipping one word.
     */
    wall?: boolean;
    /**
     * Slug in public/video. These are interactive apps, and a still image hides
     * that — the clip plays on hover with the poster as the resting frame.
     * Recorded by tools/record-demos.mjs.
     */
    demo?: string;
}

export const projects: Project[] = [
    {
        title: "Data Analytics Academy",
        description:
            "Full-stack platform for learning data analytics — in-browser SQL and Python playgrounds over preloaded SQLite, an SM-2 spaced-repetition system, gamified XP and streaks, and a local-LLM tutor via Ollama.",
        tech: ["React 18", "Vite", "Node.js", "Express", "SQLite", "Ollama"],
        github: "https://github.com/Saikushal185/data-analytics-academy",
        category: "Web Development",
        icon: "GraduationCap",
        featured: true,
        // DRAFT — written from the repo README, not from Sai's own words.
        // Worth a read-through before this ships.
        story: {
            metric: "SM-2",
            metricLabel: "scheduling every review",
            hook: "Most tutorials teach you something once. This one schedules when you'll forget it.",
            problem:
                "Learning analytics from courses has a retention problem, not a content problem. The material is everywhere and mostly free; what's missing is anything that decides when you should see a concept again, and anywhere to actually run the query you just read about. Tutorials hand you both jobs and then move on.",
            investigation:
                "The review engine runs SuperMemo-2, so each concept's next interval is a function of how well you recalled it rather than a fixed drip. Around it sit two in-browser playgrounds — SQL executing against preloaded SQLite datasets and Python running client-side — so a lesson and the thing it teaches live on the same page. The tutor is wired to a local Ollama host rather than a hosted API.",
            result:
                "A full-stack platform — React and Vite on the client, Express and better-sqlite3 on the server, JWT auth — covering SQL, Python, data modeling, Excel, visualisation and Git, with XP, streaks, badges and a contribution heatmap over the top. Because the tutor is local, it runs with no API keys and no per-question cost.",
        },
    },
    {
        title: "A/B Testing Analytics",
        description:
            "Analyzed a real 90K-player mobile game experiment with two-proportion z-tests and 2,000-iteration bootstrap confidence intervals. Proved moving the gate hurt 7-day retention (p ≈ 0.001) and shipped a clear keep/rollback recommendation.",
        tech: ["Python", "SciPy", "Pandas", "Plotly", "Streamlit", "Statistics"],
        github: "https://github.com/Saikushal185/ab-testing-analytics",
        category: "Data Analytics",
        icon: "FlaskConical",
        featured: true,
        demo: "ab-testing-analytics",
        story: {
            hook: "A mobile game moved one gate. Ninety thousand players answered.",
            problem:
                "Cookie Cats moved its first progression gate from level 30 to level 40, betting that later friction would keep players around longer. With 90K players split into two groups, the question was sharp: did the move help retention, or quietly bleed players away?",
            investigation:
                "Two-proportion z-tests on 1-day and 7-day retention, backed by 2,000-iteration bootstrap confidence intervals so the conclusion didn't hinge on a single test. Every cut of the data pointed the same direction — the later gate lost players.",
            result:
                "Moving the gate measurably hurt 7-day retention, and the evidence was strong enough to act on. The deliverable was a clear rollback recommendation, shipped with an interactive Streamlit dashboard so anyone could interrogate the experiment themselves.",
            metric: "p ≈ 0.001",
            metricLabel: "evidence against the move",
        },
    },
    {
        title: "Loan Default Risk System",
        description:
            "End-to-end credit risk engine: Logistic Regression, Random Forest and XGBoost with SHAP explainability mapped to an approve/decline policy. Streamlit dashboard simulates approvals with per-applicant risk scores and explanations.",
        tech: ["Python", "XGBoost", "SHAP", "Scikit-learn", "Streamlit"],
        github: "https://github.com/Saikushal185/loan-risk-system",
        category: "Machine Learning",
        icon: "Banknote",
        featured: true,
        demo: "loan-risk-system",
        story: {
            hook: "A lender can't just say no — it has to say why.",
            problem:
                "Credit risk models that can't explain themselves are useless in practice: a declined applicant deserves a reason, and a risk team needs to trust the score. The challenge was building a default predictor that was both accurate and accountable.",
            investigation:
                "Three models went head to head — Logistic Regression, Random Forest, and XGBoost — with SHAP values translating every prediction into the exact factors that drove it. The scores were then mapped to a concrete approve/decline policy rather than left as abstract probabilities.",
            result:
                "An end-to-end risk engine where every applicant gets a score, an explanation, and a decision. The Streamlit dashboard simulates the full approval pipeline, showing per-applicant SHAP breakdowns a credit officer could actually defend.",
            metric: "XGBoost + SHAP",
            metricLabel: "every decision explained",
        },
    },
    {
        title: "Customer Segmentation Platform",
        description:
            "Clustered 4,338 customers from 541K real retail transactions using RFM features and K-Means, validated with Elbow and Silhouette analysis. Named four actionable segments driving £8.9M revenue with per-segment marketing plans.",
        tech: ["Python", "K-Means", "Scikit-learn", "Pandas", "Streamlit"],
        github: "https://github.com/Saikushal185/customer-segmentation-platform",
        category: "Machine Learning",
        icon: "Users",
        featured: true,
        demo: "customer-segmentation-platform",
        story: {
            hook: "Hidden inside 541K transactions: four kinds of customer.",
            problem:
                "A retailer with 4,338 customers and over half a million transactions was treating everyone the same. Somewhere in that pile of receipts were distinct groups — champions, loyalists, drifters, the nearly-lost — each deserving a different play.",
            investigation:
                "RFM features (recency, frequency, monetary value) fed into K-Means, with Elbow and Silhouette analysis to settle the number of clusters honestly instead of picking a convenient one. Each cluster was then profiled and named so the business could see itself in the data.",
            result:
                "Four actionable segments covering £8.9M in revenue, each with its own marketing plan — who to reward, who to re-engage, who to win back. Delivered as an interactive platform, not a slide deck.",
            metric: "£8.9M",
            metricLabel: "revenue segmented into action",
        },
    },
    {
        title: "Healthcare Readmission Analytics",
        description:
            "Predicted 30-day hospital readmissions on 100K real diabetic encounters with ICD-9 diagnosis grouping and imbalance-aware XGBoost. Dashboard includes a live patient risk-prediction form with honest, clinically-typical metrics.",
        tech: ["Python", "XGBoost", "Scikit-learn", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/healthcare-readmission-analytics",
        category: "Machine Learning",
        icon: "HeartPulse",
        featured: true,
        demo: "healthcare-readmission-analytics",
        story: {
            hook: "Which patients come back within thirty days — and can we see it coming?",
            problem:
                "Hospital readmissions within 30 days are costly for hospitals and dangerous for patients. With 100K real diabetic encounters, the task was predicting who walks back through the door — on data that is messy, coded in ICD-9, and heavily imbalanced.",
            investigation:
                "ICD-9 codes were grouped into clinically meaningful diagnosis categories, and the class imbalance was handled inside the model rather than papered over. XGBoost was tuned and evaluated with clinically-typical metrics — no inflated accuracy theater on an imbalanced target.",
            result:
                "A readmission risk model wrapped in a live prediction form: enter a patient profile, get an honest risk estimate. The dashboard reports the metrics a clinician would actually ask about, stated plainly.",
            metric: "100K",
            metricLabel: "real patient encounters modeled",
        },
    },
    {
        title: "SegmentIQ — Probabilistic CLV",
        description:
            "Customer segmentation plus probabilistic lifetime value, with the BG/NBD and Gamma-Gamma likelihoods implemented from the papers rather than called from a library. Validated by parameter recovery and a blind holdout. Ships a FastAPI service and a Next.js dashboard.",
        tech: ["Python", "NumPy", "SciPy", "FastAPI", "Next.js", "Pydantic"],
        github: "https://github.com/Saikushal185/SegmentIQ",
        category: "Machine Learning",
        icon: "Sigma",
        featured: true,
        story: {
            hook: "Most CLV projects call a fitter. This one derives the maths.",
            problem:
                "Customer lifetime value is usually a library call — import a fitter, pass it RFM, print a number. That works right up until the number looks wrong and nobody can say why. The goal here was a CLV model that could be opened up and checked line by line.",
            investigation:
                "BG/NBD purchase frequency and Gamma-Gamma monetary value were both implemented from the original papers: log-space likelihoods with a stable log-sum-exp, fit by maximum likelihood with random restarts, and the conditional expectation evaluated through the Gaussian hypergeometric ₂F₁. Every piece is tested by parameter recovery — simulate from known parameters, fit, and check the fit finds them again.",
            result:
                "On a blind 91-day holdout the model predicted 1,112 repeat purchases against an actual 1,094, with per-customer correlation of 0.81. Segmentation sits on top via RFM into K-Means or GMM, with k chosen by silhouette or BIC rather than by hand.",
            metric: "1112 vs 1094",
            metricLabel: "predicted vs actual, blind holdout",
        },
    },
    {
        title: "Smart City Traffic Analytics",
        wall: false,
        description:
            "Forecasted hourly highway traffic (R² 0.94, MAE 272 veh/h) on 40K+ sensor readings with a leakage-safe chronological split. Includes congestion classification, weather impact analysis, and a 24-hour what-if simulator.",
        tech: ["Python", "Scikit-learn", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/traffic-analytics-platform",
        category: "Machine Learning",
        icon: "Car",
        story: {
            hook: "Can yesterday's sensors predict tomorrow's traffic jam?",
            problem:
                "A highway generates 40K+ hourly sensor readings, and city planners want to know what next hour looks like — without the model cheating by peeking at the future, the classic trap in time-series work.",
            investigation:
                "A strictly chronological train/test split kept the forecast leakage-safe. On top of the forecaster: congestion classification, weather impact analysis, and a 24-hour what-if simulator for testing scenarios before they happen on the road.",
            result:
                "Hourly volume forecasts accurate to within 272 vehicles per hour on unseen future data — strong enough to plan around, honest enough to trust.",
            metric: "R² 0.94",
            metricLabel: "on a leakage-safe future split",
        },
    },
    {
        title: "Flight Delay Analytics",
        wall: false,
        description:
            "Mined 327K NYC departures to expose cascading delays — late rates climb from 13% at 6am to 35%+ by evening. Gradient-boosted 'Will my flight be late?' predictor (ROC-AUC 0.73) wrapped in an interactive checker.",
        tech: ["Python", "Scikit-learn", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/flight-delay-analytics",
        category: "Data Analytics",
        icon: "Plane",
        story: {
            hook: "Every evening flight inherits the sins of the morning.",
            problem:
                "Why are evening flights so often late? With 327K real NYC departures on record, the hypothesis was that delays don't happen at random — they cascade, each late aircraft passing its lateness down the schedule.",
            investigation:
                "Mining departures by hour revealed the cascade plainly: late rates climb from 13% at 6am to over 35% by evening. A gradient-boosted classifier then turned the pattern into a per-flight prediction.",
            result:
                "A 'Will my flight be late?' checker (ROC-AUC 0.73) and one practical, data-backed travel rule: book the morning flight.",
            metric: "13% → 35%+",
            metricLabel: "late rate, morning to evening",
        },
    },
    {
        title: "Airbnb NYC Pricing Analytics",
        description:
            "Modeled nightly prices across 48K real NYC listings with geospatial maps and a Random Forest regressor (MAE ≈ $42). Ships a price estimator that benchmarks any new listing against its live market median.",
        tech: ["Python", "Random Forest", "Plotly Maps", "Pandas", "Streamlit"],
        github: "https://github.com/Saikushal185/airbnb-pricing-analytics",
        category: "Machine Learning",
        icon: "Building2",
    },
    {
        title: "Global Layoffs Analytics",
        wall: false,
        description:
            "Tracked 383K layoffs across 51 countries (2020–2023) with choropleth maps, treemaps, trend forecasting and z-score anomaly detection. Auto-generates an executive summary with computed findings.",
        tech: ["Python", "Pandas", "Plotly", "Forecasting", "Streamlit"],
        github: "https://github.com/Saikushal185/layoffs-analytics-platform",
        category: "Data Analytics",
        icon: "TrendingUp",
        story: {
            hook: "Three years. Fifty-one countries. 383,000 jobs.",
            problem:
                "Between 2020 and 2023 the tech industry shed jobs in waves, but the headlines only ever showed fragments. The full picture — where, when, how hard, and what was anomalous — was scattered across 383K layoff records in 51 countries.",
            investigation:
                "Choropleth maps and treemaps located the damage geographically and by industry; trend forecasting projected the trajectory; z-score anomaly detection flagged the months that broke the pattern rather than leaving outliers to eyeball judgment.",
            result:
                "A platform that auto-generates an executive summary from computed findings — the state of a global workforce shift, recalculated live from the data instead of written once and left to age.",
            metric: "383K",
            metricLabel: "layoffs mapped and forecast",
        },
    },
    {
        title: "HR Attrition Analytics",
        wall: false,
        description:
            "Diagnosed why employees quit on the IBM HR dataset — overtime nearly triples attrition risk. Recall-prioritized Logistic Regression (ROC-AUC 0.81) chosen over Random Forest for interpretability, with a live risk-scoring form.",
        tech: ["Python", "Scikit-learn", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/hr-attrition-analytics",
        category: "Machine Learning",
        icon: "Briefcase",
        story: {
            hook: "People don't quit companies. They quit overtime.",
            problem:
                "Employees were leaving and HR wanted to know why — and, more importantly, who was next. The IBM HR dataset held the answer, but only if the model could be trusted enough to act on.",
            investigation:
                "The diagnosis came first: overtime nearly triples attrition risk, dwarfing most other factors. For prediction, a recall-prioritized Logistic Regression was deliberately chosen over a stronger-scoring Random Forest — in HR, missing a flight risk costs more than a false alarm, and an explainable model earns the room's trust.",
            result:
                "An ROC-AUC 0.81 early-warning system with a live risk-scoring form, plus one finding any executive can act on tomorrow: fix the overtime culture first.",
            metric: "≈3×",
            metricLabel: "attrition risk under overtime",
        },
    },
    {
        title: "Customer Churn Prediction",
        description:
            "Telecom churn classifier comparing multiple models on customer account and contract data. Identifies month-to-month, high-charge, short-tenure customers as the key churn segment and scores every customer with a churn probability.",
        tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
        github: "https://github.com/Saikushal185/customer-churn-prediction",
        category: "Machine Learning",
        icon: "PieChart",
    },
    {
        title: "Global Energy Analytics",
        description:
            "The energy transition across 220 countries and 35 years of Our World in Data: world energy mix, renewables choropleth, per-capita comparisons, and a country-vs-country explorer. Renewables: 15% — fossil fuels still 81%.",
        tech: ["Python", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/energy-consumption-analytics",
        category: "Data Analytics",
        icon: "Layers",
    },
    {
        title: "Netflix Content Analytics",
        description:
            "Exploratory analysis of ~7,800 Netflix titles: content growth, genre and country breakdowns, ratings, and duration patterns, with an auto-generated storytelling report computed live from the data.",
        tech: ["Python", "Pandas", "Plotly", "EDA"],
        github: "https://github.com/Saikushal185/Netflix-Analytics",
        category: "Data Analytics",
        icon: "Tv",
    },
    {
        title: "Sales Analytics Dashboard",
        description:
            "Retail sales reporting layer: revenue trends, top products, and regional performance with a generated business report and an interactive Streamlit dashboard for commercial teams.",
        tech: ["Python", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/sales-dashboard",
        category: "Data Analytics",
        icon: "BarChart3",
    },
    {
        title: "Salary Prediction App",
        description:
            "Regression model predicting salaries from experience, role, and education — served through a Streamlit app where anyone can plug in a profile and get an instant estimate. Full train-to-deploy loop.",
        tech: ["Python", "Scikit-learn", "Streamlit", "Joblib"],
        github: "https://github.com/Saikushal185/salary-prediction",
        category: "Machine Learning",
        icon: "LineChart",
    },
    {
        title: "Stock Market Dashboard",
        description:
            "Live market dashboard pulling real-time stock data via the yfinance API: price history, moving averages, returns, and multi-ticker comparisons that update every trading day.",
        tech: ["Python", "yfinance", "Plotly", "Streamlit", "APIs"],
        github: "https://github.com/Saikushal185/stock-market-dashboard",
        category: "Data Analytics",
        icon: "TrendingUp",
    },
    {
        title: "Traffic Congestion Prediction",
        description:
            "Built traffic prediction model using Random Forest and Decision Trees on 50K+ records achieving 89% accuracy. Created web interface using TypeScript with Matplotlib heatmap visualizations.",
        tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "TypeScript"],
        github: "https://github.com/Saikushal185/Urban_Traffic_Congestion",
        category: "Machine Learning",
        icon: "Cpu",
    },
    {
        title: "Retail Store Sales Analysis",
        description:
            "Analyzed 25K+ sales transactions using SQL and Python to identify top-selling products, profit margins, and regional performance. Built Power BI dashboard with monthly trends.",
        tech: ["Power BI", "SQL", "Python", "Pandas", "Excel", "Matplotlib"],
        github: "https://github.com/Saikushal185/PowerBi-Dashboard",
        category: "Data Analytics",
        icon: "Globe",
    },
    {
        title: "Face Recognition System",
        description:
            "Built face detection and recognition system using OpenCV and TensorFlow achieving 97% accuracy with real-time processing at 30 FPS. Reduced incorrect matches by 70%.",
        tech: ["Python", "TensorFlow", "OpenCV", "NumPy", "Image Processing"],
        github: "https://github.com/Saikushal185/Face-Recognition-project",
        category: "Computer Vision",
        icon: "Zap",
    },
    {
        title: "Hire Job Platform",
        description:
            "Full-stack job hiring platform connecting employers with job seekers. Features user authentication, job listings, and application management system.",
        tech: ["React.js", "Node.js", "MongoDB", "JavaScript"],
        github: "https://github.com/Saikushal185/Hire_Job",
        category: "Web Development",
        icon: "Brain",
    },
    {
        title: "Super Store Analysis",
        description:
            "Comprehensive data analysis project examining retail store performance metrics, customer segments, and sales patterns to derive actionable business insights.",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Data Analysis"],
        github: "https://github.com/Saikushal185/Super_Store_Analysis",
        category: "Data Analytics",
        icon: "Rocket",
    },

    // ── Added from GitHub, Aug 2026 ────────────────────────────────────────
    // Descriptions and stacks are taken from each repo's README. None carry a
    // `story`, so they sit in the quiet "More work" list rather than claiming a
    // headline number — the metric and the three beats are Sai's to write.
    {
        title: "ChurnLens",
        description:
            "End-to-end churn prediction with calibrated probabilities, SHAP explainability and cost-weighted retention targeting tied to ROI. Ships a Textual TUI and a self-contained Plotly report. CPU-only, fully offline.",
        tech: ["Python", "scikit-learn", "SHAP", "Textual", "Plotly"],
        github: "https://github.com/Saikushal185/ChurnLens",
        category: "Machine Learning",
        icon: "Users",
    },
    {
        title: "ExperiMint",
        description:
            "Experimentation platform covering A/B design and analysis: power and sample size, frequentist and Bayesian inference, CUPED variance reduction, always-valid sequential testing (mSPRT) and a sample-ratio-mismatch guard.",
        tech: ["Python", "SciPy", "NumPy", "Textual", "Plotly"],
        github: "https://github.com/Saikushal185/ExperiMint",
        category: "Data Analytics",
        icon: "FlaskConical",
    },
    {
        title: "DataSentry",
        description:
            "Data-quality profiler and drift detector built from scratch — per-column profiling, a configurable rules engine scoring 0–100, and distribution drift between snapshots via PSI, KS, chi-square and Jensen-Shannon.",
        tech: ["Python", "Pandas", "Textual", "Plotly", "Jinja2"],
        github: "https://github.com/Saikushal185/DataSentry",
        category: "Data Analytics",
        icon: "Search",
    },
    {
        title: "ForecastForge",
        description:
            "Demand forecasting with rolling-origin backtesting, conformal prediction intervals and hierarchical reconciliation (bottom-up and MinT). FastAPI service plus a React dashboard, running offline on synthetic M5-style data.",
        tech: ["Python", "FastAPI", "React", "Vite", "statsmodels"],
        github: "https://github.com/Saikushal185/ForecastForge",
        category: "Machine Learning",
        icon: "LineChart",
    },
    {
        title: "doc-chat-cited",
        description:
            "RAG over PDF, Markdown and text that answers with inline citations — source file, page number and the exact snippet used. Ships an evaluation harness scoring faithfulness, answer relevance and citation precision.",
        tech: ["Python", "LangChain", "ChromaDB", "Streamlit"],
        github: "https://github.com/Saikushal185/doc-chat-cited",
        category: "AI & LLM",
        icon: "BookOpen",
    },
    {
        title: "hybrid-rerank-kb",
        description:
            "Retrieval quality study over financial filings: dense vector search, then BM25 lexical search fused with Reciprocal Rank Fusion, then cross-encoder reranking — each layer measured against the last.",
        tech: ["Python", "sentence-transformers", "BM25", "ChromaDB"],
        github: "https://github.com/Saikushal185/hybrid-rerank-kb",
        category: "AI & LLM",
        icon: "Layers",
    },
    {
        title: "agentic-rag-router",
        description:
            "Agentic assistant that routes a natural-language question to the source that can actually answer it — SQL for quantitative questions, a vector store for policy and FAQ, web search for everything else.",
        tech: ["Python", "LangChain", "SQLite", "ChromaDB"],
        github: "https://github.com/Saikushal185/agentic-rag-router",
        category: "AI & LLM",
        icon: "Target",
    },
    {
        title: "analytics-copilot",
        description:
            "RAG copilot over your own ML experiment outputs — ask which run had the lowest MAPE and get an answer citing the exact metric row, model card or training log it came from.",
        tech: ["Python", "LangChain", "ChromaDB", "Pandas"],
        github: "https://github.com/Saikushal185/analytics-copilot",
        category: "AI & LLM",
        icon: "BarChart3",
    },
    {
        title: "corrective-rag",
        description:
            "Self-evaluating RAG pipeline that grades its own retrieval, falls back to web search when the knowledge base can't answer, and self-checks the answer's faithfulness before returning it — with an A/B dashboard against naive RAG.",
        tech: ["Python", "LangChain", "ChromaDB", "Streamlit"],
        github: "https://github.com/Saikushal185/corrective-rag",
        category: "AI & LLM",
        icon: "Sigma",
    },
];
