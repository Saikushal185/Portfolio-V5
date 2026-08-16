export type BlogCategory = 'Data Analyst' | 'Data Scientist';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: string[];
    category: BlogCategory;
    topic: string;
    date: string;
    readTime: string;
    tags: string[];
    popularity: number;
}

export interface BlogCollection {
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    accent: string;
    secondaryAccent: string;
    background: string;
    shadow: string;
    variant: 'sunrise' | 'dune' | 'frame' | 'horizon';
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'analyst-metric-definitions',
        slug: 'metric-definitions-that-stop-cross-team-reporting-drift',
        title: 'Metric Definitions That Stop Cross-Team Reporting Drift',
        excerpt: 'A lightweight operating system for metric definitions, ownership, and change control when every team seems to have a different number.',
        body: [
            'Reporting drift usually starts small: growth uses one activation definition, product uses another, and finance quietly exports a third version into a board deck. The fix is not a bigger dashboard. It is a metric contract. For every critical metric, I like to document the business question, source tables, grain, inclusions, exclusions, and the exact moment the metric should be trusted. If a team cannot explain when a metric should not be used, the definition is still incomplete.',
            'What keeps the contract alive is ownership and change discipline. Each important metric needs a named owner, a lightweight review cadence, and a visible change log when definitions shift. During transitions, I prefer showing the old and new logic side by side for a short period so stakeholders can see the impact before the switch becomes permanent. That turns metric governance from a documentation chore into a trust-building habit that prevents the same reporting argument from returning every quarter.'
        ],
        category: 'Data Analyst',
        topic: 'Business Intelligence',
        date: '2026-04-04',
        readTime: '6 min read',
        tags: ['Metric Definitions', 'Governance', 'Stakeholder Alignment'],
        popularity: 96
    },
    {
        id: 'analyst-kpi-trees',
        slug: 'building-kpi-trees-that-survive-executive-reviews',
        title: 'Building KPI Trees That Survive Executive Reviews',
        excerpt: 'A practical method for connecting north-star metrics, leading indicators, and operational levers without losing stakeholder trust.',
        body: [
            'Strong KPI trees start with one question: which executive decision changes if this metric moves? I like to map a tree from the company goal down to controllable team actions, then remove anything that cannot trigger a decision, resourcing change, or experiment. That pruning step keeps dashboards from becoming reporting museums.',
            'For analytics teams, the real unlock is pairing each branch with an owner, refresh cadence, and failure threshold. When the metric moves, people know whether to investigate data quality, product behavior, or go-to-market friction. That is what makes a KPI tree durable in review meetings instead of decorative.'
        ],
        category: 'Data Analyst',
        topic: 'Business Intelligence',
        date: '2026-03-04',
        readTime: '6 min read',
        tags: ['KPI Design', 'Executive Reporting', 'Decision Systems'],
        popularity: 98
    },
    {
        id: 'analyst-sql-rework',
        slug: 'sql-habits-that-cut-dashboard-rework-in-half',
        title: 'SQL Habits That Cut Dashboard Rework in Half',
        excerpt: 'Warehouse-friendly SQL patterns that keep definitions stable when product teams ask for one more slice of the funnel.',
        body: [
            'Dashboard churn often starts in the SQL layer. I have found that naming assumptions explicitly, centralizing business logic in reusable models, and separating grain-changing joins from reporting queries removes most last-minute confusion. Analysts move faster when the query reads like a contract instead of a puzzle.',
            'The other habit worth building is test-first refactoring. Before changing a metric definition, snapshot row counts, null rates, and known benchmark segments. That gives you a confidence rail when requirements shift and helps you explain the impact in plain language to non-technical partners.'
        ],
        category: 'Data Analyst',
        topic: 'SQL & Warehousing',
        date: '2026-02-04',
        readTime: '5 min read',
        tags: ['SQL', 'Semantic Layer', 'Analytics Engineering'],
        popularity: 94
    },
    {
        id: 'analyst-self-serve-dashboards',
        slug: 'designing-stakeholder-safe-self-serve-dashboards',
        title: 'Designing Stakeholder-Safe Self-Serve Dashboards',
        excerpt: 'How to make dashboards easy to explore without inviting broken comparisons and misleading trends.',
        body: [
            'Self-serve analytics works when freedom is bounded by clarity. I design dashboards so the first screen answers the default business question, while every filter and drill-down is framed around a valid comparison. If a chart can be misread, the dashboard is not done yet.',
            'Annotations, default date windows, metric definitions, and plain-language warnings matter more than adding charts. People do not need more visualizations; they need fewer opportunities to make the wrong call quickly. A safe dashboard teaches analysis while serving it.'
        ],
        category: 'Data Analyst',
        topic: 'Dashboard Design',
        date: '2026-01-04',
        readTime: '7 min read',
        tags: ['BI Design', 'Stakeholder Enablement', 'Data Storytelling'],
        popularity: 91
    },
    {
        id: 'analyst-thin-data-forecasting',
        slug: 'forecasting-revenue-with-thin-historical-data',
        title: 'Forecasting Revenue with Thin Historical Data',
        excerpt: 'A lightweight forecasting workflow for teams that need signal before they have years of stable history.',
        body: [
            'Early-stage forecasting is less about model complexity and more about scenario discipline. When history is shallow, I combine simple trend baselines with driver-based assumptions for pricing, conversion, and retention. The goal is not perfect point estimates but credible ranges that leadership can plan around.',
            'The best analyst move here is showing what would have to be true for the optimistic and conservative paths to materialize. That turns the forecast into an operating conversation instead of a spreadsheet contest, and it highlights where new instrumentation would reduce uncertainty fastest.'
        ],
        category: 'Data Analyst',
        topic: 'Forecasting',
        date: '2025-12-04',
        readTime: '6 min read',
        tags: ['Forecasting', 'Revenue Planning', 'Scenario Analysis'],
        popularity: 88
    },
    {
        id: 'analyst-ab-readouts',
        slug: 'ab-test-readouts-for-busy-product-managers',
        title: 'A/B Test Readouts for Busy Product Managers',
        excerpt: 'A concise reporting template that translates significance, impact, and risk into product-language decisions.',
        body: [
            'Product managers rarely need a textbook explanation of experimentation statistics. They need a fast answer to whether the change should ship, iterate, or stop. My readouts therefore open with user impact, business impact, and confidence, then place statistical details underneath as supporting evidence.',
            'This format works best when you include edge-case analysis, segment movement, and implementation caveats. It prevents teams from over-trusting a single p-value and encourages follow-up questions about rollout risk, novelty effects, and measurement gaps.'
        ],
        category: 'Data Analyst',
        topic: 'Experimentation',
        date: '2025-11-04',
        readTime: '5 min read',
        tags: ['Experimentation', 'Product Analytics', 'Decision Support'],
        popularity: 92
    },
    {
        id: 'analyst-data-products',
        slug: 'turning-ad-hoc-requests-into-reusable-data-products',
        title: 'Turning Ad Hoc Requests into Reusable Data Products',
        excerpt: 'A repeatable way to convert recurring business questions into assets that save analysts time every quarter.',
        body: [
            'If the same question appears three times, I stop treating it like a request and start treating it like product discovery. Who uses the output, how often does it change, what action does it support, and what trust guarantees are required? Those answers tell you whether to build a dashboard, a model, or a curated dataset.',
            'Reusable analytics products emerge when analysts standardize the input definition, distribution method, and owner. That reduces context switching, protects quality, and frees senior analysts to work on deeper questions instead of repeating the same extraction logic.'
        ],
        category: 'Data Analyst',
        topic: 'Analytics Engineering',
        date: '2025-10-04',
        readTime: '6 min read',
        tags: ['Data Products', 'Analytics Ops', 'Stakeholder Service'],
        popularity: 86
    },
    {
        id: 'analyst-north-star',
        slug: 'choosing-the-right-north-star-metric-for-growth-teams',
        title: 'Choosing the Right North-Star Metric for Growth Teams',
        excerpt: 'A framework for selecting a metric that captures value creation instead of vanity movement.',
        body: [
            'Good north-star metrics sit at the intersection of user value, company value, and team influence. If one of those legs is missing, the metric drifts into vanity or frustration. I usually test candidates against five questions: is it understandable, resilient, actionable, leading enough, and resistant to easy gaming?',
            'The strongest growth metrics also need companion guardrails. Activation might climb while retention drops, or usage might rise because the product became confusing. Analysts help teams by designing the full measurement system, not just naming the hero number.'
        ],
        category: 'Data Analyst',
        topic: 'Product Analytics',
        date: '2025-09-04',
        readTime: '4 min read',
        tags: ['North Star Metric', 'Growth', 'Metric Systems'],
        popularity: 90
    },
    {
        id: 'analyst-cohort-retention',
        slug: 'cohort-analysis-patterns-for-subscription-retention',
        title: 'Cohort Analysis Patterns for Subscription Retention',
        excerpt: 'Retention analysis patterns that help subscription teams separate onboarding issues from ongoing value decay.',
        body: [
            'Cohorts become powerful when you align them to the customer experience rather than the calendar alone. I like to pair signup cohorts with activation milestones, plan changes, and acquisition source so that retention curves explain where decay begins and which journeys deserve intervention.',
            'The real value comes from comparing within-cohort behavior after critical events. That exposes whether you have a first-week problem, a pricing problem, or a long-term product habit problem. A single retention chart rarely tells the full story, but structured cohort views usually do.'
        ],
        category: 'Data Analyst',
        topic: 'Customer Analytics',
        date: '2025-08-04',
        readTime: '7 min read',
        tags: ['Retention', 'Cohorts', 'Lifecycle Analytics'],
        popularity: 87
    },
    {
        id: 'analyst-insight-memos',
        slug: 'writing-weekly-insight-memos-that-get-read',
        title: 'Writing Weekly Insight Memos That Get Read',
        excerpt: 'How to turn analysis into short operating memos that leaders actually revisit before planning meetings.',
        body: [
            'The best analytics memo is not a compressed dashboard. It is a sharp point of view backed by enough evidence to change priorities. I try to structure every memo around what changed, why it matters, what is still uncertain, and what action I recommend next.',
            'This approach works because it respects how leaders consume information. They do not need all the tables in the body. They need a credible summary with links to evidence, especially when the recommendation cuts across product, marketing, and operations.'
        ],
        category: 'Data Analyst',
        topic: 'Storytelling',
        date: '2025-07-04',
        readTime: '5 min read',
        tags: ['Communication', 'Executive Memos', 'Insight Delivery'],
        popularity: 85
    },
    {
        id: 'analyst-data-quality',
        slug: 'data-quality-checks-every-analyst-should-automate',
        title: 'Data Quality Checks Every Analyst Should Automate',
        excerpt: 'A baseline monitoring checklist for keeping business metrics trustworthy as pipelines and product events evolve.',
        body: [
            'Analysts do not need a full platform team to improve data trust. A small set of automated checks on freshness, volume, uniqueness, join coverage, and metric deltas catches most painful surprises before a stakeholder does. That is usually enough to lift confidence materially.',
            'I also recommend classifying checks by business impact. Missing marketing spend might be urgent every morning, while a low-volume enrichment table can wait. Prioritizing by downstream decision risk makes monitoring sustainable instead of noisy.'
        ],
        category: 'Data Analyst',
        topic: 'Data Reliability',
        date: '2025-06-04',
        readTime: '6 min read',
        tags: ['Data Quality', 'Monitoring', 'Analytics Reliability'],
        popularity: 93
    },
    {
        id: 'scientist-problem-framing',
        slug: 'framing-ml-problems-before-you-touch-a-model',
        title: 'Framing ML Problems Before You Touch a Model',
        excerpt: 'A problem-framing checklist that saves data science teams from optimizing the wrong objective.',
        body: [
            'Most machine learning projects fail long before model selection. They fail when the target is a proxy nobody trusts, the intervention is unclear, or the prediction horizon does not match the business process. Before touching features, I like to write a one-page decision memo that defines user, action, metric, and failure mode.',
            'This makes trade-offs visible early. A model that predicts perfectly after the moment of action is useless, and a target that bakes in historical bias will only scale the problem. Clear framing is the highest-leverage science work most teams under-invest in.'
        ],
        category: 'Data Scientist',
        topic: 'ML Strategy',
        date: '2026-03-18',
        readTime: '7 min read',
        tags: ['Problem Framing', 'ML Strategy', 'Product Alignment'],
        popularity: 99
    },
    {
        id: 'scientist-feature-stores',
        slug: 'feature-stores-without-the-platform-team-headache',
        title: 'Feature Stores Without the Platform Team Headache',
        excerpt: 'A pragmatic path to reusable features, training-serving consistency, and version control for smaller teams.',
        body: [
            'Feature stores sound like infrastructure-heavy bets, but the core value is simple: one trusted definition of a feature that survives across experiments and production scoring. For lean teams, that can begin with disciplined feature contracts, registry metadata, and point-in-time joins rather than a full platform rollout.',
            'What matters most is preventing subtle leakage and drift. The more features become shared assets with ownership and documentation, the easier it is to compare models honestly and move successful experiments into reliable production paths.'
        ],
        category: 'Data Scientist',
        topic: 'Feature Engineering',
        date: '2026-02-18',
        readTime: '6 min read',
        tags: ['Feature Store', 'Training Serving Skew', 'ML Platform'],
        popularity: 95
    },
    {
        id: 'scientist-baselines-benchmarks',
        slug: 'baselines-benchmarks-and-the-cost-of-fancy-models',
        title: 'Baselines, Benchmarks, and the Cost of Fancy Models',
        excerpt: 'Why every serious ML roadmap needs stronger baselines before it needs a bigger model architecture.',
        body: [
            'A surprising amount of model work looks impressive but underperforms a thoughtful baseline in production. I prefer to define benchmarks along three dimensions: predictive lift, operational cost, and explainability burden. That framework makes it easier to justify when a more complex model is actually worth the maintenance.',
            'Fancy models are not bad; unpriced complexity is. When teams compare against stale baselines or ignore inference constraints, they reward novelty over reliability. Better benchmarking keeps data science grounded in business value instead of leaderboard theater.'
        ],
        category: 'Data Scientist',
        topic: 'Model Evaluation',
        date: '2026-01-18',
        readTime: '5 min read',
        tags: ['Baselines', 'Benchmarking', 'Model Economics'],
        popularity: 96
    },
    {
        id: 'scientist-class-imbalance',
        slug: 'handling-class-imbalance-in-real-world-detection-pipelines',
        title: 'Handling Class Imbalance in Real-World Detection Pipelines',
        excerpt: 'A decision-oriented guide to sampling, thresholds, and evaluation for skewed classification problems.',
        body: [
            'Class imbalance is rarely just a modeling issue. It is usually a decision-cost issue hiding inside the data. Before choosing resampling or loss tricks, I map false positives and false negatives to operational outcomes. That tells me whether the pipeline should optimize recall, precision, or tiered triage.',
            'The model then becomes one piece of a larger system. Calibration, alert routing, and post-model review rules often improve outcomes more than another round of algorithm tuning. In imbalanced settings, workflow design matters as much as raw model skill.'
        ],
        category: 'Data Scientist',
        topic: 'Applied ML',
        date: '2025-12-18',
        readTime: '7 min read',
        tags: ['Classification', 'Recall vs Precision', 'Detection Systems'],
        popularity: 89
    },
    {
        id: 'scientist-time-series-validation',
        slug: 'time-series-validation-that-matches-production-drift',
        title: 'Time-Series Validation That Matches Production Drift',
        excerpt: 'Validation schemes for forecasting systems where deployment conditions keep moving faster than the textbook assumes.',
        body: [
            'Random splits create false confidence for temporal models. I prefer rolling-origin validation with gap periods, feature freeze checks, and backtests aligned to how forecasts are consumed in the business. The aim is to reproduce deployment friction, not just estimate average error elegantly.',
            'This matters most when demand, pricing, or behavior shift seasonally. Teams that validate against production-like windows notice drift earlier, set better retraining policies, and avoid the trap of celebrating models that only perform in static historical slices.'
        ],
        category: 'Data Scientist',
        topic: 'Forecasting',
        date: '2025-11-18',
        readTime: '6 min read',
        tags: ['Time Series', 'Validation', 'Concept Drift'],
        popularity: 90
    },
    {
        id: 'scientist-shap-causality',
        slug: 'interpreting-shap-values-without-overselling-causality',
        title: 'Interpreting SHAP Values Without Overselling Causality',
        excerpt: 'How to explain model contribution scores responsibly when stakeholders want causal certainty from predictive tools.',
        body: [
            'Interpretability techniques are useful, but they are not a shortcut to causal claims. I frame SHAP as a description of how the model used information under a specific data distribution, not proof that changing a feature will change the outcome in the same way.',
            'That framing protects teams from making overconfident business moves. It also opens the right follow-up path: use interpretability for debugging and communication, then pair it with experiments or quasi-experimental methods when the decision truly depends on causality.'
        ],
        category: 'Data Scientist',
        topic: 'Responsible AI',
        date: '2025-10-18',
        readTime: '5 min read',
        tags: ['Interpretability', 'SHAP', 'Causal Inference'],
        popularity: 84
    },
    {
        id: 'scientist-experiment-backlogs',
        slug: 'building-experiment-backlogs-for-data-science-teams',
        title: 'Building Experiment Backlogs for Data Science Teams',
        excerpt: 'A portfolio approach for prioritizing feature, model, and measurement experiments across a busy DS roadmap.',
        body: [
            'Data science teams often treat experiments like one-off sparks of inspiration. I prefer a backlog structure that groups work into data quality, feature ideas, model ideas, and system improvements, each scored by expected learning value, delivery effort, and business upside.',
            'That structure makes the roadmap easier to defend and easier to adapt. It also encourages teams to invest in experiments that reduce uncertainty fastest instead of chasing only the highest-profile modeling ideas.'
        ],
        category: 'Data Scientist',
        topic: 'Experimentation',
        date: '2025-09-18',
        readTime: '4 min read',
        tags: ['Experiment Design', 'Roadmapping', 'Scientific Process'],
        popularity: 87
    },
    {
        id: 'scientist-notebook-to-service',
        slug: 'from-notebook-to-service-hardening-inference-workflows',
        title: 'From Notebook to Service: Hardening Inference Workflows',
        excerpt: 'The practical reliability steps that turn a promising notebook into something a product team can safely depend on.',
        body: [
            'Notebook success is a weak signal for production readiness. Before deployment, I look for contract-defined inputs, reproducible feature transformations, latency budgets, fallback behavior, and observability hooks. Without those, you do not have a model service; you have a fragile demo.',
            'The transition becomes smoother when data scientists share ownership with engineering on interface stability and monitoring. That collaboration reduces handoff loss and ensures the model keeps earning trust after the first launch.'
        ],
        category: 'Data Scientist',
        topic: 'MLOps',
        date: '2025-08-18',
        readTime: '7 min read',
        tags: ['Inference', 'MLOps', 'Production ML'],
        popularity: 93
    },
    {
        id: 'scientist-rules-vs-models',
        slug: 'when-to-prefer-rules-over-models-in-decision-systems',
        title: 'When to Prefer Rules Over Models in Decision Systems',
        excerpt: 'A decision guide for choosing between interpretable heuristics and learned systems in high-stakes workflows.',
        body: [
            'Not every decision system deserves a model. If the environment is stable, the policy is explicit, and errors need immediate explanation, a rules engine can outperform machine learning on total operating value. The trick is evaluating the full system burden, not just predictive accuracy.',
            'I tend to use models when complexity is high, interactions matter, and the team can monitor outcomes continuously. Otherwise, transparent rules may offer better governance, faster iteration, and easier stakeholder adoption.'
        ],
        category: 'Data Scientist',
        topic: 'Decision Systems',
        date: '2025-07-18',
        readTime: '6 min read',
        tags: ['Rules Engines', 'Decisioning', 'System Design'],
        popularity: 88
    },
    {
        id: 'scientist-silent-failures',
        slug: 'monitoring-silent-failures-in-predictive-models',
        title: 'Monitoring Silent Failures in Predictive Models',
        excerpt: 'How to catch the model issues that rarely trigger alarms but quietly erode business value over time.',
        body: [
            'The most dangerous model failures are often silent: thresholds drift out of relevance, segment coverage changes, or upstream definitions shift while the prediction service keeps returning valid shapes. Basic uptime checks will never catch that. You need business-facing monitors tied to outcome quality, calibration, and coverage.',
            'I recommend treating monitoring as layered defense. Combine data drift, score drift, decision rate shifts, and delayed-label evaluation so the team can see both technical and business deterioration. That is how a predictive system stays trustworthy after launch.'
        ],
        category: 'Data Scientist',
        topic: 'Model Monitoring',
        date: '2025-06-18',
        readTime: '6 min read',
        tags: ['Monitoring', 'Drift', 'Post-deployment Reliability'],
        popularity: 97
    }
];

export const BLOG_COLLECTIONS: BlogCollection[] = [
    {
        id: 'analyst-playbook',
        title: 'Analyst Playbook',
        eyebrow: 'The Portfolio Manual',
        description: 'A growing collection of practical essays on dashboards, decision systems, KPI design, and stakeholder communication for modern data analysts.',
        accent: '#f4b183',
        secondaryAccent: '#9ec8ef',
        background: 'linear-gradient(145deg, #ece4d6 0%, #d9b49d 36%, #9ab5cf 100%)',
        shadow: 'rgba(179, 132, 95, 0.28)',
        variant: 'sunrise'
    },
    {
        id: 'scientist-notebook',
        title: 'Scientist Notebook',
        eyebrow: 'The Portfolio Manual',
        description: 'Ten data science field notes spanning ML strategy, feature engineering, experimentation, MLOps, and monitoring.',
        accent: '#79b9f4',
        secondaryAccent: '#173d66',
        background: 'linear-gradient(145deg, #b8d6ef 0%, #2d79bf 50%, #0c2742 100%)',
        shadow: 'rgba(24, 61, 102, 0.32)',
        variant: 'frame'
    },
    {
        id: 'decision-collection',
        title: 'Decision Intelligence',
        eyebrow: 'Cross-functional Collection',
        description: 'A blended read for teams working across experimentation, product analytics, and operational decision systems.',
        accent: '#d6cf7a',
        secondaryAccent: '#70806a',
        background: 'linear-gradient(145deg, #eef0d2 0%, #b6bf85 42%, #6f876b 100%)',
        shadow: 'rgba(111, 135, 107, 0.28)',
        variant: 'horizon'
    },
    {
        id: 'systems-collection',
        title: 'Reliable Systems',
        eyebrow: 'Cross-functional Collection',
        description: 'A reliability-first track covering data quality, validation, monitoring, and hardening paths from insight to production.',
        accent: '#bdddd9',
        secondaryAccent: '#708487',
        background: 'linear-gradient(145deg, #eff7f4 0%, #cde4df 44%, #8ba0a0 100%)',
        shadow: 'rgba(112, 132, 135, 0.24)',
        variant: 'dune'
    }
];
