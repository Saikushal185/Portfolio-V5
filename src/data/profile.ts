// Single source of truth for owner identity, reused across the site.

export const profile = {
    name: "Sai Kushal Vittanala",
    fullName: "Vittanala Sai Kushal",
    role: "Data Scientist & Machine Learning Engineer",
    roleShort: "Data Scientist & ML Engineer",
    specialism: "Data Analytics & AI/ML Specialist",
    tagline:
        "Transforming data into stories worth reading — analytics, machine learning, and intelligent systems.",
    intro:
        "I am Vittanala Sai Kushal — transforming complex data into meaningful insights and building intelligent systems that make a real impact.",
    location: "Amaravati, India",
    locationShort: "Andhra Pradesh, IN",
    email: "saikushal185@gmail.com",
    phone: "+91 9121274005",
    phoneHref: "+919121274005",
    // Single-link fallback. Kept in sync with data/resumes.ts.
    resume: "/resume/SaiKushal.pdf",
    // Portrait pending — drop it in assets-inbox/portrait and it lands here.
    avatar: "",
    socials: {
        github: "https://github.com/Saikushal185",
        linkedin: "https://www.linkedin.com/in/sai-kushal-vittanala/",
        leetcode: "https://leetcode.com/u/saikushal18/",
        codechef: "https://www.codechef.com/users/Saikushal185",
        codeforces: "https://codeforces.com/profile/Saikushal185",
        interviewbit: "https://www.interviewbit.com/profile/sai-kushal_916/",
        codolio: "https://codolio.com/profile/Sai%20Kushal/card",
    },
} as const;

// The degree, stated as facts rather than buried in a sentence. About renders
// these as a strip above the prose so the opening paragraph is free to lead
// with the work. Kept in sync with data/education.ts, which is the long form.
export const credential = [
    { label: "Degree", value: "B.Tech CSE · Data Analytics" },
    { label: "Institution", value: "VIT-AP, 2022 — 2026" },
    { label: "Grade", value: "8.56 CGPA" },
] as const;

// Headline stats used on Home / About / Contact.
export const headlineStats = [
    {
        label: "LeetCode Knight",
        value: "500+",
        rating: "1800+ Rating",
        href: profile.socials.leetcode,
    },
    {
        label: "CodeChef Ranking",
        value: "2 Stars",
        rating: "1400+ Rating",
        href: profile.socials.codechef,
    },
    {
        label: "GitHub Presence",
        value: "25+",
        rating: "Open Source",
        href: profile.socials.github,
    },
] as const;

export const aboutStats = [
    { label: "Experience", value: "3+ Years", icon: "Layers" },
    { label: "Projects", value: "20+", icon: "Zap" },
    { label: "Problems", value: "500+", icon: "Binary" },
] as const;
