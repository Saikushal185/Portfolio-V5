export interface Certification {
    title: string;
    issuer: string;
    link: string;
    /** Badge artwork in public/badges. Only the credentials that ship one. */
    badge?: string;
}

export const certifications: Certification[] = [
    {
        title: "OCI 2025 Generative AI Professional",
        issuer: "Oracle",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=06CF7015C882785A659FEBEDE4FF4D61ABDA6264DBDD5665EFE44A41E45A3576",
        badge: "/badges/OCI25GAIOCP.webp",
    },
    {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        link: "https://www.credly.com/badges/df2bb7bc-e174-42b3-b165-7961243609d1/public_url",
        badge: "/badges/aws-certified-cloud-practitioner.webp",
    },
    {
        title: "Azure Data Fundamentals",
        issuer: "Microsoft",
        link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/",
        badge: "/badges/microsoft-certified-azure-data-fundamentals.webp",
    },
    {
        title: "AWS Cloud Foundations",
        issuer: "Amazon Web Services",
        link: "https://www.credly.com/badges/2be3c996-e8ef-49f2-85fe-27f79b3d6da5/public_url",
    },
    {
        title: "AWS Cloud Architecting",
        issuer: "Amazon Web Services",
        link: "https://www.credly.com/badges/ce1aa37f-bfd0-44d1-a83e-fc61fbfafe40/public_url",
    },
    {
        title: "MongoDB Intermediate Database Administration",
        issuer: "MongoDB University",
        link: "https://learn.mongodb.com/",
    },
];
