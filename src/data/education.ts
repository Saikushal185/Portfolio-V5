export interface EducationEntry {
    title: string;
    major: string;
    org: string;
    date: string;
    place: string;
    grade: string;
    featured?: boolean;
    icon: string;
    courses: string[];
}

export const education: EducationEntry[] = [
    {
        title: "Bachelor of Technology",
        major: "Computer Science and Engineering",
        org: "Vellore Institute of Technology",
        date: "Jul 2022 — Jun 2026",
        place: "Andhra Pradesh, India",
        grade: "8.44 CGPA",
        featured: true,
        icon: "Library",
        courses: [
            "Data Structures & Algorithms",
            "Operating Systems",
            "OOP",
            "Software Engineering",
            "Networks",
        ],
    },
    {
        title: "Intermediate Education",
        major: "MPC",
        org: "Sri Chaitanya Junior College",
        date: "2020 — 2022",
        place: "Vijayawada, India",
        grade: "94.6%",
        icon: "BookOpen",
        courses: ["Mathematics", "Physics", "Chemistry"],
    },
    {
        title: "Secondary Education",
        major: "",
        org: "Sri Chaitanya High School",
        date: "2020",
        place: "Vijayawada, India",
        grade: "93.1%",
        icon: "GraduationCap",
        courses: ["Foundation", "General Sciences", "Mathematics"],
    },
];
