export interface CodingProfile {
    label: string;
    href: string;
    stats: string;
    desc: string;
    icon: string;       // lucide icon name, or image path when `image` is set
    image?: string;     // public path to a logo image
    featured?: boolean;
}

export const codingProfiles: CodingProfile[] = [
    {
        label: "LeetCode",
        href: "https://leetcode.com/u/saikushal18/",
        stats: "1800+ • Knight",
        desc: "Knight badge holder with 1800+ rating and 500+ algorithmic problems solved.",
        icon: "Code",
        image: "/LeetCode_logo_rvs.webp",
        featured: true,
    },
    {
        label: "CodeChef",
        href: "https://www.codechef.com/users/Saikushal185",
        stats: "2 Stars • 1400+",
        desc: "Active participant in long and short format competitive programming contests.",
        icon: "Code",
        image: "/codechef.webp",
        featured: true,
    },
    {
        label: "InterviewBit",
        href: "https://www.interviewbit.com/profile/sai-kushal_916/",
        stats: "Active",
        desc: "Mastering complex data structures and curated interview patterns.",
        icon: "Target",
        image: "/logos/InterviewBit.png",
    },
    {
        label: "Codeforces",
        href: "https://codeforces.com/profile/Saikushal185",
        stats: "Active",
        desc: "Engaging in rapid problem-solving and real-time algorithmic competitions.",
        icon: "Globe",
        image: "/logos/Codeforces.png",
    },
    {
        label: "Codolio",
        href: "https://codolio.com/profile/Sai%20Kushal/card",
        stats: "Global Rank",
        desc: "Unified analytics dashboard showcasing global programming footprint.",
        icon: "Code",
        image: "/logos/Codlio.svg",
    },
];
