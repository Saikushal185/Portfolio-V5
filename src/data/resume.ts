// Structured resume content (mirrors SaiKushalDA.pdf), lifted out of JSX.

export const resumeSummary =
    "Computer Science student with a strong focus on Data Analytics and AI/ML. Expertise spans data analytics tools (Power BI, Tableau), machine learning (Scikit-learn, TensorFlow), and full-stack development. Demonstrated problem-solving skills with 500+ LeetCode problems solved (1800+ rating, Knight badge) and practical experience in building real-time computer vision systems and scalable web applications.";

export interface ResumeProject {
    title: string;
    stack: string;
    description: string;
}

export const resumeProjects: ResumeProject[] = [
    {
        title: "Urban Congestion Prediction System",
        stack: "Python, Scikit-learn",
        description:
            "Built traffic prediction model using Random Forest and Decision Trees on 50K+ records achieving 89% accuracy. Created web interface with TypeScript and Matplotlib heatmap visualizations.",
    },
    {
        title: "Retail Store Sales Analysis",
        stack: "Power BI, SQL, Python",
        description:
            "Analyzed 25K+ sales transactions using SQL and Python to identify top-selling products and regional performance. Built Power BI dashboard with monthly trends.",
    },
    {
        title: "Face Recognition System",
        stack: "Python, TensorFlow, OpenCV",
        description:
            "Built face detection and recognition system achieving 97% accuracy with real-time processing at 30 FPS. Reduced incorrect matches by 70%.",
    },
];

export const resumeExperience = {
    role: "Data Analyst Intern",
    period: "Jul - Sep 2025",
    org: "Brightix IT Solutions • Remote",
    points: [
        "Completed training in SQL queries, Python scripting, Tableau visualizations, and Power BI dashboards.",
        "Cleaned and prepared datasets using Excel and Python, removing duplicates and handling missing values.",
        "Created bar charts, line graphs, and pivot tables to track sales performance and customer trends.",
    ],
};

export const resumeResearch = {
    title: "Prediction of Kidney Disease and Urinary Disease using Machine Learning",
    description:
        "Presented at ADSSS Conference 2024. Achieved 92.31% accuracy using Random Forest classifier. Cleaned patient medical records and selected important features using correlation analysis.",
};

export const resumeEducation = {
    org: "Vellore Institute of Technology",
    period: "2022 - 2026",
    degree:
        "B.Tech in Computer Science and Engineering (Specialization in Data Analytics)",
    grade: "CGPA: 8.56/10",
};

export const resumeSkillGroups: { label: string; items: string[] }[] = [
    { label: "Programming Languages", items: ["Python", "JavaScript", "Java", "C"] },
    { label: "Backend & Database", items: ["Node.js", "MySQL", "MongoDB", "REST APIs"] },
    { label: "Data Science & AI/ML", items: ["TensorFlow", "OpenCV", "Pandas & NumPy", "Scikit-learn"] },
    { label: "Cloud & DevOps", items: ["AWS", "Docker", "Git", "CI/CD"] },
    { label: "Development Tools", items: ["VS Code", "Jupyter Notebook", "Claude Code"] },
];

export const resumeCertifications = [
    "AWS Certified: Cloud Practitioner, Foundations, Architecting",
    "Oracle Certified: OCI 2025 Generative AI Professional",
    "MongoDB University: Intermediate DB Admin",
];

export const resumeAchievements = [
    "LeetCode 500+ Solved (1800+ Rating, Knight Badge)",
    "CodeChef 2 Stars (1400+ Rating)",
];
