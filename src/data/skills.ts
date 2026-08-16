export type SkillLevel = "Advanced" | "Intermediate" | "Basic";

export interface SkillCategory {
    category: string;
    icon: string;
    description: string;
    skills: { name: string; level: SkillLevel }[];
}

export const skillCategories: SkillCategory[] = [
    {
        category: "Programming Languages",
        icon: "Code2",
        description: "Core languages for systems and application development.",
        skills: [
            { name: "Python", level: "Advanced" },
            { name: "SQL", level: "Advanced" },
            { name: "JavaScript", level: "Intermediate" },
            { name: "Java", level: "Intermediate" },
            { name: "C", level: "Intermediate" },
        ],
    },
    {
        category: "Data Science Libraries",
        icon: "Brain",
        description: "Libraries for data manipulation and analysis.",
        skills: [
            { name: "Pandas", level: "Advanced" },
            { name: "NumPy", level: "Advanced" },
            { name: "Scikit-learn", level: "Intermediate" },
            { name: "Matplotlib", level: "Advanced" },
            { name: "Seaborn", level: "Intermediate" },
        ],
    },
    {
        category: "Machine Learning",
        icon: "Zap",
        description: "ML algorithms and model development techniques.",
        skills: [
            { name: "Linear Regression", level: "Advanced" },
            { name: "Logistic Regression", level: "Advanced" },
            { name: "Decision Trees", level: "Advanced" },
            { name: "Random Forest", level: "Intermediate" },
            { name: "KNN", level: "Intermediate" },
        ],
    },
    {
        category: "Computer Vision",
        icon: "Search",
        description: "Image processing and object detection systems.",
        skills: [
            { name: "OpenCV", level: "Advanced" },
            { name: "TensorFlow", level: "Intermediate" },
            { name: "Image Processing", level: "Advanced" },
            { name: "Object Detection", level: "Intermediate" },
        ],
    },
    {
        category: "Data Visualization",
        icon: "Target",
        description: "Creating interactive dashboards and visualizations.",
        skills: [
            { name: "Power BI", level: "Advanced" },
            { name: "Tableau", level: "Intermediate" },
            { name: "Excel", level: "Advanced" },
            { name: "Charts & Graphs", level: "Advanced" },
        ],
    },
    {
        category: "Tools & Databases",
        icon: "Terminal",
        description: "Development tools and database management.",
        skills: [
            { name: "Jupyter Notebook", level: "Advanced" },
            { name: "Git", level: "Advanced" },
            { name: "MySQL", level: "Advanced" },
            { name: "MongoDB", level: "Intermediate" },
            { name: "VS Code", level: "Advanced" },
        ],
    },
    {
        category: "Cloud Platforms",
        icon: "Cloud",
        description: "Cloud infrastructure and services.",
        skills: [
            { name: "AWS", level: "Intermediate" },
            { name: "Azure", level: "Basic" },
        ],
    },
];
