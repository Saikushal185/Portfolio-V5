// All projects, lifted out of JSX into pure data. `icon` is a lucide icon name
// resolved at render time via src/shared/iconMap.ts.

export interface ProjectStory {
    hook: string;
    problem: string;
    investigation: string;
    result: string;
    /**
     * Optional on purpose. Every project here has a story worth reading, but not
     * every one produced a number worth putting in 48px type — an older CV
     * exercise or a CRUD platform has no defensible headline figure, and
     * inventing one to fill the slot is exactly the failure this site argues
     * against. The dialog hides the block when it's absent; the findings wall
     * only promotes projects that have one.
     */
    metric?: string;
    metricLabel?: string;
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
        story: {
            hook: "The model said $42 off. Holding out whole neighbourhoods said $46.",
            problem:
                "A new NYC host has one question and no good answer to it: what should this listing cost per night? Across 48K real listings the price signal is buried under geography, room type and neighbourhood reputation, and the naive answer — the borough average — is wrong almost everywhere.",
            investigation:
                "Prices were modelled in log space with a Random Forest over location, room type and listing attributes, then mapped across all five boroughs to see the structure directly. The important step was refusing the flattering evaluation: random k-fold lets the model memorise a neighbourhood and then get graded on that same neighbourhood, so a spatial GroupKFold holding out entire neighbourhoods was run alongside it. SHAP attributed the drivers globally, and quantile models replaced the point estimate with a range.",
            result:
                "MAE ≈ $42 on random folds and ≈ $46 under spatial cross-validation — the second number is the honest one, and it's the one reported. Hosts get an 80% nightly-price band (empirical coverage ~80%) rather than false precision, benchmarked against the live market median. Manhattan's median runs about 2× the Bronx's, and entire homes about 2.4× private rooms.",
            metric: "$46 MAE",
            metricLabel: "under spatial cross-validation",
        },
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
        story: {
            hook: "Month-to-month customers churn at 43%. Two-year contracts churn at 3%.",
            problem:
                "Acquiring a telecom customer costs far more than keeping one, so the useful output isn't a churn rate — it's a list of names to call this week. On 7,043 IBM Telco customers across 21 features, the question was which ones, and how confident the number behind each name really is.",
            investigation:
                "Logistic Regression, Random Forest and XGBoost were each trained with the class imbalance handled explicitly rather than ignored, scaler fit on the training split only. Raw model scores are not probabilities, so the champion was recalibrated isotonically and checked against a reliability curve — Brier improved from 0.158 to 0.136. Only then were the scores allowed to drive a decision.",
            result:
                "The diagnosis is blunt: month-to-month contracts churn at ~43% against ~3% for two-year, fiber customers far above DSL, electronic-check payers highest of all. Ranking customers by calibrated churn probability × customer value and targeting the top decile beats random targeting by roughly $21.7K net, with a campaign profit curve showing where to stop.",
            metric: "43% vs 3%",
            metricLabel: "month-to-month vs two-year churn",
        },
    },
    {
        title: "Global Energy Analytics",
        description:
            "The energy transition across 220 countries and 35 years of Our World in Data: world energy mix, renewables choropleth, per-capita comparisons, and a country-vs-country explorer. Renewables: 15% — fossil fuels still 81%.",
        tech: ["Python", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/energy-consumption-analytics",
        category: "Data Analytics",
        icon: "Layers",
        story: {
            hook: "Everyone says the energy transition is happening. Renewables are at 15%.",
            problem:
                "The energy transition is discussed almost entirely in anecdotes — a record solar month here, a coal plant closing there. What's missing is the denominator. Thirty-five years of Our World in Data across 220 countries has it, but only if the comparison is done per capita and by mix rather than by headline totals, which just rank countries by population.",
            investigation:
                "The analysis is built around comparison rather than a single view: world energy mix over time, a renewables choropleth to place the leaders and laggards geographically, per-capita normalisation so small high-consumption countries stop disappearing behind large ones, and a country-versus-country explorer for reading any two trajectories side by side.",
            result:
                "The headline the aggregate actually supports: renewables sit at 15% while fossil fuels remain at 81%. Both numbers matter — the first is real growth, the second is the scale of what's left. Delivered as an explorer so the reader can check any country's story instead of taking the global average on trust.",
            metric: "15% vs 81%",
            metricLabel: "renewables against fossil fuels",
        },
    },
    {
        title: "Netflix Content Analytics",
        description:
            "Exploratory analysis of ~7,800 Netflix titles: content growth, genre and country breakdowns, ratings, and duration patterns, with an auto-generated storytelling report computed live from the data.",
        tech: ["Python", "Pandas", "Plotly", "EDA"],
        github: "https://github.com/Saikushal185/Netflix-Analytics",
        category: "Data Analytics",
        icon: "Tv",
        story: {
            hook: "A catalogue is a strategy document, if you read it as one.",
            problem:
                "Netflix's catalogue is one of the few places a streaming company's decisions are visible from the outside. Roughly 7,800 titles carry the record of when the library grew, which countries it grew from, what it rated, and how long it asked people to sit still — none of which is legible from the title list itself.",
            investigation:
                "Standard exploratory work done properly: content growth over time, genre and country breakdowns, rating distribution, and duration patterns split by film against series, because pooling them makes the duration column meaningless. Every finding was computed rather than asserted, which is what makes the next step possible.",
            result:
                "The report generates itself. Rather than a narrative written once and left to drift as the data changes, the storytelling layer is computed live from the catalogue — rerun it against a newer export and the prose updates with the numbers.",
            metric: "~7,800",
            metricLabel: "titles read as a strategy",
        },
    },
    {
        title: "Sales Analytics Dashboard",
        description:
            "Retail sales reporting layer: revenue trends, top products, and regional performance with a generated business report and an interactive Streamlit dashboard for commercial teams.",
        tech: ["Python", "Pandas", "Plotly", "Streamlit"],
        github: "https://github.com/Saikushal185/sales-dashboard",
        category: "Data Analytics",
        icon: "BarChart3",
        story: {
            hook: "The commercial team didn't need another chart. They needed the same chart every Monday.",
            problem:
                "Retail sales reporting fails in a specific way: someone rebuilds the same revenue pull by hand each week, the definitions drift a little each time, and by the quarter-end review two teams are arguing about which number is real. The problem isn't analysis, it's that the analysis isn't a fixed asset.",
            investigation:
                "The work went into the reporting layer rather than the visuals — revenue trends, top products, and regional performance defined once and computed the same way every run, so a number on the dashboard and a number in the report come from the same code path rather than two people's interpretations.",
            result:
                "An interactive Streamlit dashboard for commercial teams to interrogate themselves, backed by a generated business report for the people who want the summary and not the sliders. Same definitions behind both.",
        },
    },
    {
        title: "Salary Prediction App",
        description:
            "Regression model predicting salaries from experience, role, and education — served through a Streamlit app where anyone can plug in a profile and get an instant estimate. Full train-to-deploy loop.",
        tech: ["Python", "Scikit-learn", "Streamlit", "Joblib"],
        github: "https://github.com/Saikushal185/salary-prediction",
        category: "Machine Learning",
        icon: "LineChart",
        story: {
            hook: "A salary model that answers to the number is easy. One that answers for it is the work.",
            problem:
                "Predicting monthly income from a career profile is a tidy regression problem right up to the moment someone asks two harder questions: how wrong could this be, and is it wrong differently for different people. On 1,470 IBM HR employees, both had to be answerable.",
            investigation:
                "Linear Regression, Random Forest and XGBoost were compared on RMSE, MAE and R², with two engineered features — a company-tenure ratio as a loyalty signal, and prior experience derived from career history. Then the two accountability passes: gradient-boosted quantile models to replace the point estimate with a range, and a fairness audit checking error parity by gender plus a counterfactual gender-flip test.",
            result:
                "Job level dominates, followed by total working years and job role; tree models beat linear regression comfortably. The app returns an 80% salary band with ~81% empirical coverage on held-out data rather than a falsely precise figure, and the gender-flip test isolates the model's own contribution to pay gap at a signed shift of roughly $2 — effectively none.",
            metric: "~81%",
            metricLabel: "interval coverage, held-out",
        },
    },
    {
        title: "Stock Market Dashboard",
        description:
            "Live market dashboard pulling real-time stock data via the yfinance API: price history, moving averages, returns, and multi-ticker comparisons that update every trading day.",
        tech: ["Python", "yfinance", "Plotly", "Streamlit", "APIs"],
        github: "https://github.com/Saikushal185/stock-market-dashboard",
        category: "Data Analytics",
        icon: "TrendingUp",
        story: {
            hook: "A dashboard that only works on the day you built it isn't a dashboard.",
            problem:
                "Most market analyses are snapshots — a notebook run against a CSV someone downloaded once, quietly stale by the following week. The interesting constraint here was building something that stays correct without anyone touching it, which turns the problem from analysis into data plumbing.",
            investigation:
                "Prices are pulled live through the yfinance API rather than a checked-in file, then layered into the views that actually answer questions: price history for context, moving averages for trend, returns for comparability across differently-priced tickers, and multi-ticker overlays for relative performance.",
            result:
                "A dashboard that updates every trading day on its own. The point isn't the charts — it's that comparing two tickers on returns rather than price is the difference between a real comparison and a chart where the expensive stock always looks more volatile.",
        },
    },
    {
        title: "Traffic Congestion Prediction",
        description:
            "Built traffic prediction model using Random Forest and Decision Trees on 50K+ records achieving 89% accuracy. Created web interface using TypeScript with Matplotlib heatmap visualizations.",
        tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "TypeScript"],
        github: "https://github.com/Saikushal185/Urban_Traffic_Congestion",
        category: "Machine Learning",
        icon: "Cpu",
        story: {
            hook: "Congestion is predictable. That's the whole opportunity.",
            problem:
                "Urban traffic feels chaotic from inside a car and is anything but in aggregate — it repeats by hour, by day, by corridor. Over 50K records of it, the question was whether that repetition is strong enough to predict, and whether a prediction is any use to someone who isn't a data scientist.",
            investigation:
                "Random Forest and Decision Trees were trained on the record set and compared, the tree kept in the picture specifically because its splits can be read aloud — a planner can follow the logic of a decision tree in a way they cannot follow an ensemble's vote. Congestion was then rendered as Matplotlib heatmaps, which is the form the pattern is legible in.",
            result:
                "89% accuracy on the congestion prediction, wrapped in a TypeScript web interface so the output lands somewhere a non-technical user can reach it. An early project, and the first one built end to end rather than left in a notebook.",
            metric: "89%",
            metricLabel: "congestion prediction accuracy",
        },
    },
    {
        title: "Retail Store Sales Analysis",
        description:
            "Analyzed 25K+ sales transactions using SQL and Python to identify top-selling products, profit margins, and regional performance. Built Power BI dashboard with monthly trends.",
        tech: ["Power BI", "SQL", "Python", "Pandas", "Excel", "Matplotlib"],
        github: "https://github.com/Saikushal185/PowerBi-Dashboard",
        category: "Data Analytics",
        icon: "Globe",
        story: {
            hook: "Top-selling and most profitable are not the same list. They rarely are.",
            problem:
                "A retail business asks which products are doing well and means two different things at once — volume and margin. Answer with one list and the other question stays open, usually until someone discovers the best-seller has been losing money all year. Across 25K+ transactions, the job was to keep both visible.",
            investigation:
                "SQL did the aggregation at the grain the business actually decides on; Python handled the cleaning and the parts SQL is clumsy at. Products were ranked by revenue and by profit margin separately, and regional performance broken out so a national average couldn't hide a region carrying or dragging it.",
            result:
                "A Power BI dashboard with monthly trends that lets a commercial team read the two rankings against each other rather than in sequence. Built during the analyst work that this whole portfolio grew out of — plainer than what came later, and the reason the later projects lead with a decision instead of a chart.",
            metric: "25K+",
            metricLabel: "transactions, revenue vs margin",
        },
    },
    {
        title: "Face Recognition System",
        description:
            "Built face detection and recognition system using OpenCV and TensorFlow achieving 97% accuracy with real-time processing at 30 FPS. Reduced incorrect matches by 70%.",
        tech: ["Python", "TensorFlow", "OpenCV", "NumPy", "Image Processing"],
        github: "https://github.com/Saikushal185/Face-Recognition-project",
        category: "Computer Vision",
        icon: "Zap",
        story: {
            hook: "In recognition, a confident wrong answer is worse than no answer.",
            problem:
                "Face recognition has two failure modes and they are not equally bad. Missing a face is an inconvenience; confidently matching the wrong person is the failure that makes the system unusable. Doing either at video rate rather than on a still image is what turns it from a demo into something that runs.",
            investigation:
                "Detection and recognition were separated — OpenCV locating faces in the frame, TensorFlow handling the identification — so each stage could be tuned for what it's bad at. Tightening the match criteria trades a little recall for a large drop in false matches, which is the right trade when a wrong identity is the expensive error.",
            result:
                "97% accuracy running in real time at 30 FPS, with incorrect matches down 70%. The number worth reading is the second one: the accuracy figure says it works, the false-match reduction says it can be trusted.",
            metric: "−70%",
            metricLabel: "incorrect matches, at 30 FPS",
        },
    },
    {
        title: "Hire Job Platform",
        description:
            "Full-stack job hiring platform connecting employers with job seekers. Features user authentication, job listings, and application management system.",
        tech: ["React.js", "Node.js", "MongoDB", "JavaScript"],
        github: "https://github.com/Saikushal185/Hire_Job",
        category: "Web Development",
        icon: "Brain",
        story: {
            hook: "Two users who want opposite things from the same screen.",
            problem:
                "A hiring platform has a structural problem before it has a technical one: employers and job seekers touch the same records from opposite directions. The same posting is a thing one user owns and the other browses, and the same application is an outbox to one and an inbox to the other. Get that model wrong and every feature afterwards fights it.",
            investigation:
                "Built on the MERN stack with the two roles designed in from the start rather than bolted on — authentication establishing who you are, then listings and applications rendered against that role. Application state lives on the application itself rather than being inferred from whoever is looking at it.",
            result:
                "A working full-stack platform: sign up as either side, post or apply, and manage applications through their lifecycle. No model, no metric — this one is here because building the CRUD layer properly is what makes the data projects deployable later.",
        },
    },
    {
        title: "Super Store Analysis",
        description:
            "Comprehensive data analysis project examining retail store performance metrics, customer segments, and sales patterns to derive actionable business insights.",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Data Analysis"],
        github: "https://github.com/Saikushal185/Super_Store_Analysis",
        category: "Data Analytics",
        icon: "Rocket",
        story: {
            hook: "The first project where the question came before the chart.",
            problem:
                "Retail performance data invites the wrong instinct — plot everything, then look for something interesting. That produces a lot of charts and no decisions. The exercise here was to start from what a store manager would actually change and work backwards to the cuts that inform it.",
            investigation:
                "Performance metrics, customer segments and sales patterns were examined together rather than as separate sections, because a segment only means something against the pattern it deviates from. Pandas for the shaping, Matplotlib and Seaborn for the reading — deliberately plain tooling, with the effort going into which comparison to make.",
            result:
                "Actionable business insights on where the store makes money and which customers drive it. An early piece of work, and the one where the habit that runs through everything since started: lead with the finding, then show what supports it.",
        },
    },

    // ── Added from GitHub, Aug 2026 ────────────────────────────────────────
    // Descriptions, stacks and stories are drawn from each repo's README and
    // its reported results. They sit in the "More work" list rather than on the
    // wall — the list opens the same story dialog, so that placement is about
    // what the page leads with, not about which projects are worth reading.
    {
        title: "ChurnLens",
        description:
            "End-to-end churn prediction with calibrated probabilities, SHAP explainability and cost-weighted retention targeting tied to ROI. Ships a Textual TUI and a self-contained Plotly report. CPU-only, fully offline.",
        tech: ["Python", "scikit-learn", "SHAP", "Textual", "Plotly"],
        github: "https://github.com/Saikushal185/ChurnLens",
        category: "Machine Learning",
        icon: "Users",
        story: {
            hook: "Most churn projects stop at ROC-AUC. That's one step short of a decision.",
            problem:
                "A churn model that scores well still doesn't tell a retention team who to call. Two things are missing: the probabilities are usually uncalibrated, so 0.7 doesn't mean 70%, and there's no principled cutoff — the 0.5 threshold everyone uses is an artefact, not a business decision.",
            investigation:
                "Calibration first, via isotonic or Platt scaling with reliability curves, so the probability means what it says. Then the threshold is derived rather than assumed: given retention-offer cost, customer lifetime value and the offer's success rate, the expected net benefit per customer is written out and the profit-maximising cutoff falls out of it. SHAP supplies global importance plus per-customer waterfalls for the top at-risk names.",
            result:
                "An end-to-end pipeline — schema validation, leakage checks, stratified split, three models, calibration on validation, a SQLite experiment log, champion chosen on PR-AUC — ending in a ranked who-to-target list. Every business and statistical function is unit-tested against closed-form values, and the whole thing is CPU-only and runs offline.",
            metric: "Cost-weighted",
            metricLabel: "threshold, not the 0.5 default",
        },
    },
    {
        title: "ExperiMint",
        description:
            "Experimentation platform covering A/B design and analysis: power and sample size, frequentist and Bayesian inference, CUPED variance reduction, always-valid sequential testing (mSPRT) and a sample-ratio-mismatch guard.",
        tech: ["Python", "SciPy", "NumPy", "Textual", "Plotly"],
        github: "https://github.com/Saikushal185/ExperiMint",
        category: "Data Analytics",
        icon: "FlaskConical",
        story: {
            hook: "The demo run ends in NO DECISION. That's the feature.",
            problem:
                "A/B testing tools mostly analyse; almost none design. So teams ship an experiment, peek at it daily, and read a p-value that stopped being valid the first time they looked. The three failure modes — underpowered from the start, invalidated by peeking, and silently broken by a mis-split — all happen before analysis, which is where the tooling isn't.",
            investigation:
                "Design comes first: sample size and power for proportions and means, and an MDE solver for when n is already fixed. Analysis is a battery rather than a test — two-proportion z and Welch's t with effect sizes, Holm and Benjamini-Hochberg for multiple variants, Beta-Binomial and Normal Bayesian posteriors giving P(B>A) and expected loss, CUPED for variance reduction, mixture SPRT for always-valid sequential p-values you can safely peek at, and a chi-square sample-ratio-mismatch guard. Every function is unit-tested against scipy, statsmodels or a closed form — CUPED's variance reduction is verified to equal ρ².",
            result:
                "On the synthetic demo (n≈4000), design says 3,841 per group for a 2pp lift at 80% power; the analysis returns p=0.23, P(B>A)=0.88, CUPED reduction 5.4%, SRM clean — and the verdict is NO DECISION. The experiment was underpowered for a 1.5pp lift, which is exactly what the design module would have warned about beforehand.",
            metric: "NO DECISION",
            metricLabel: "the answer a tool should give",
        },
    },
    {
        title: "DataSentry",
        description:
            "Data-quality profiler and drift detector built from scratch — per-column profiling, a configurable rules engine scoring 0–100, and distribution drift between snapshots via PSI, KS, chi-square and Jensen-Shannon.",
        tech: ["Python", "Pandas", "Textual", "Plotly", "Jinja2"],
        github: "https://github.com/Saikushal185/DataSentry",
        category: "Data Analytics",
        icon: "Search",
        story: {
            hook: "Built from scratch, because a profiler you can't audit is a profiler you can't trust.",
            problem:
                "Nearly every data-quality failure is discovered downstream, by a stakeholder, in a meeting. The checks that would have caught it — a column that quietly went 40% null, a category set that gained a new value, a distribution that shifted between snapshots — are cheap to run and almost never run.",
            investigation:
                "Three layers, none of them borrowed: streaming per-column profiling (missingness, cardinality, distribution stats, IQR and z-score outliers, semantic type inference) chunked so large files fit in 16GB; a configurable rules engine — not_null, unique, range, regex, allowed_values, and referential integrity across columns — producing a 0–100 quality score; and drift between two snapshots via PSI and KS for numeric columns, chi-square and Jensen-Shannon for categorical, each with severity tiers.",
            result:
                "A self-contained HTML report as the deliverable, plus a CLI and a terminal UI for browsing columns. Correctness is the point: PSI is tested against a hand-computed value, KS against ks_2samp, Jensen-Shannon against scipy's, and the streaming profiler is proven to give statistics identical to a one-shot pass regardless of chunk size.",
            metric: "0–100",
            metricLabel: "quality score, rules you configure",
        },
    },
    {
        title: "ForecastForge",
        description:
            "Demand forecasting with rolling-origin backtesting, conformal prediction intervals and hierarchical reconciliation (bottom-up and MinT). FastAPI service plus a React dashboard, running offline on synthetic M5-style data.",
        tech: ["Python", "FastAPI", "React", "Vite", "statsmodels"],
        github: "https://github.com/Saikushal185/ForecastForge",
        category: "Machine Learning",
        icon: "LineChart",
        story: {
            hook: "Most forecasting demos fit one model to one series and eyeball the plot.",
            problem:
                "Three things separate a forecasting demo from a forecasting system, and demos skip all of them: evaluation that respects time, intervals that actually contain the truth as often as they claim, and forecasts that stay coherent when a business adds them up. A store-level forecast that doesn't sum to the regional one is not a forecast, it's two of them.",
            investigation:
                "Rolling-origin backtesting with expanding and sliding windows, split boundaries unit-tested so nothing leaks. Three models behind one interface — seasonal-naive baseline, ETS, and a global gradient-boosted model over lag, rolling and calendar features — picked per series by backtest WMAPE. Uncertainty via split-conformal intervals with finite-sample coverage rather than a model's own optimism, and hierarchical reconciliation across store → region → total by both bottom-up and MinT.",
            result:
                "On the synthetic panel the global LightGBM leads at 0.1110 WMAPE against ETS at 0.1175 and seasonal-naive at 0.1342 — and the baseline being that close is itself the finding. Reconciliation coherence error is 0.0 bottom-up and under 1e-9 for MinT: parents equal the sum of their children to machine precision. FastAPI service, React dashboard, fixed seed, no network.",
            metric: "0.1110",
            metricLabel: "WMAPE, backtested per series",
        },
    },
    {
        title: "doc-chat-cited",
        description:
            "RAG over PDF, Markdown and text that answers with inline citations — source file, page number and the exact snippet used. Ships an evaluation harness scoring faithfulness, answer relevance and citation precision.",
        tech: ["Python", "LangChain", "ChromaDB", "Streamlit"],
        github: "https://github.com/Saikushal185/doc-chat-cited",
        category: "AI & LLM",
        icon: "BookOpen",
        story: {
            hook: "A citation you can't click back to is decoration.",
            problem:
                "Document chat is the easiest RAG system to build and the easiest to get quietly wrong. The model produces a fluent answer, attaches something that looks like a source, and nobody checks whether the passage says what the answer claims. The hard part isn't wiring retrieval up — it's being correct, and being able to show it.",
            investigation:
                "The grounding is a contract, not a prompt suggestion: retrieved chunks are numbered [1..k], every claim must carry an [n] marker, and the model must refuse outright when the context is insufficient. Markers are then parsed back to their source chunk, so each citation resolves to a filename, a page number and the exact snippet. Two interchangeable backends — Claude, or a local Ollama model — with embeddings and retrieval always local, so the Ollama path runs entirely offline.",
            result:
                "Upload a PDF, Markdown or text file, ask a question, get an answer whose every claim traces to a page you can open. The evaluation harness scores faithfulness, answer relevance and citation precision with an LLM judge, which means the refusal behaviour is measured rather than hoped for.",
            metric: "[n] → page",
            metricLabel: "citations that resolve",
        },
    },
    {
        title: "hybrid-rerank-kb",
        description:
            "Retrieval quality study over financial filings: dense vector search, then BM25 lexical search fused with Reciprocal Rank Fusion, then cross-encoder reranking — each layer measured against the last.",
        tech: ["Python", "sentence-transformers", "BM25", "ChromaDB"],
        github: "https://github.com/Saikushal185/hybrid-rerank-kb",
        category: "AI & LLM",
        icon: "Layers",
        story: {
            hook: "Everyone stacks retrieval layers. Almost nobody measures whether they helped.",
            problem:
                "The standard advice — add BM25, add a reranker — is repeated everywhere and demonstrated almost nowhere. On financial filings the stakes are concrete: dense search alone misses exact tokens like a line-item name or a fiscal-year label, which is precisely the vocabulary those questions are made of.",
            investigation:
                "Three configurations built to be compared, not just to work: dense vector search alone; dense fused with BM25 lexical search via Reciprocal Rank Fusion; and that fusion passed through a cross-encoder reranker. One retrieve(query, mode) function serves all three, so the eval harness and the UI take an identical code path and a difference between them can't be an artefact of different plumbing.",
            result:
                "The centrepiece is the eval harness, scoring recall@k and MRR for all three configs against a labelled query-to-chunk test set and printing the comparison table. Reranking's contribution shows up mostly in MRR — it moves the single most relevant chunk toward rank 1, which is the metric that matters when only the top passages reach the model. Retrieval and metrics run fully offline; only answer generation calls out.",
            metric: "recall@k · MRR",
            metricLabel: "each layer measured, not assumed",
        },
    },
    {
        title: "agentic-rag-router",
        description:
            "Agentic assistant that routes a natural-language question to the source that can actually answer it — SQL for quantitative questions, a vector store for policy and FAQ, web search for everything else.",
        tech: ["Python", "LangChain", "SQLite", "ChromaDB"],
        github: "https://github.com/Saikushal185/agentic-rag-router",
        category: "AI & LLM",
        icon: "Target",
        story: {
            hook: "\"How many orders last month?\" is not a question a vector store can answer.",
            problem:
                "Single-source RAG breaks on mixed questions. Ask a vector store for a count and it retrieves passages that talk about counting; ask a database about the refund policy and it has nothing to return. The routing decision — which source can actually answer this — is the part usually left to whoever built the demo.",
            investigation:
                "The router is a cheap Haiku tool-calling step choosing one or more of three tools: SQL over SQLite for quantitative questions, Chroma retrieval for policy and FAQ, and a pluggable web backend for fresh external facts. The SQL tool translates natural language into a validated read-only SELECT — the guard is structural, not a prompt instruction. Doc retrieval is injection-guarded. Sonnet then synthesises the grounded answer from whatever evidence came back.",
            result:
                "A chat interface that shows its own reasoning: which route was chosen, which tools fired, and whether the final answer leaned on [SQL], [DOCS] or [WEB]. Using a small model to route and a larger one only to synthesise keeps the expensive call on the step that needs it.",
            metric: "3 routes",
            metricLabel: "SQL · docs · web, chosen per question",
        },
    },
    {
        title: "analytics-copilot",
        description:
            "RAG copilot over your own ML experiment outputs — ask which run had the lowest MAPE and get an answer citing the exact metric row, model card or training log it came from.",
        tech: ["Python", "LangChain", "ChromaDB", "Pandas"],
        github: "https://github.com/Saikushal185/analytics-copilot",
        category: "AI & LLM",
        icon: "BarChart3",
        story: {
            hook: "Ask which run had the lowest MAPE. Every digit in the answer is copied, never generated.",
            problem:
                "RAG over prose tolerates paraphrase. RAG over experiment outputs does not — a metric that's approximately right is wrong. Worse, the questions are full of exact tokens like recall@10 or recsys-lora-r16-v5, which semantic search is structurally bad at matching because they carry almost no distributional meaning.",
            investigation:
                "Metric tables, model cards and run logs are chunked with typed metadata (metric, value, run_id, date) rather than as flat text. Retrieval is hybrid — dense Chroma plus BM25 fused with RRF — so exact identifiers get matched lexically while paraphrased questions still work. The local generator answers by extracting values out of retrieved metric chunks instead of writing them, and a faithfulness judge then re-checks every reported number against the context.",
            result:
                "A copilot that cites the exact metric row, model card or training log behind each figure, and is evaluated on numeric accuracy as well as faithfulness against an auto-derived gold set. The default backend never calls an API and never invents a number; Claude is an opt-in upgrade, not a dependency.",
            metric: "Extract, not generate",
            metricLabel: "every number traced to a row",
        },
    },
    {
        title: "corrective-rag",
        description:
            "Self-evaluating RAG pipeline that grades its own retrieval, falls back to web search when the knowledge base can't answer, and self-checks the answer's faithfulness before returning it — with an A/B dashboard against naive RAG.",
        tech: ["Python", "LangChain", "ChromaDB", "Streamlit"],
        github: "https://github.com/Saikushal185/corrective-rag",
        category: "AI & LLM",
        icon: "Sigma",
        story: {
            hook: "Naive RAG's worst answer is to a question the corpus can't answer at all.",
            problem:
                "Top-k retrieval always returns k chunks. When the knowledge base genuinely has nothing, it returns the k least-irrelevant ones and the model dutifully writes a confident answer out of them. The pipeline has no way to know it failed, and neither does the reader.",
            investigation:
                "Retrieval is treated as fallible. Each retrieved chunk is graded for relevance, and the count decides the path: all relevant means answer from the docs, some means blend in a web fallback, none means fall back entirely or refuse. After synthesis a second check asks whether the answer is faithful to the evidence, and one refinement pass with wider evidence runs if it isn't. Every step writes to a human-readable trace, so the routing decision is inspectable rather than implied.",
            result:
                "The A/B eval runs both pipelines over in-corpus and out-of-corpus questions. On in-corpus both answer correctly — the difference appears out of corpus, where naive RAG fabricates from irrelevant chunks and the corrective loop detects the gap and falls back or refuses. Runs fully offline by default with local embeddings and heuristic grading; USE_CLAUDE=1 upgrades the grader, generator and judge.",
            metric: "Detect & refuse",
            metricLabel: "where naive RAG fabricates",
        },
    },
];
