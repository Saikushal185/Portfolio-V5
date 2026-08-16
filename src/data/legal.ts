export interface LegalSection {
    heading: string;
    subsections?: { subheading?: string; paragraphs?: string[]; list?: string[] }[];
    paragraphs?: string[];
    list?: string[];
}

export interface LegalDoc {
    title: string;
    updated: string;
    sections: LegalSection[];
    footer: string;
}

export const privacyDoc: LegalDoc = {
    title: "Privacy Policy",
    updated: "Last updated: January 2026",
    sections: [
        {
            heading: "Introduction",
            paragraphs: [
                'This Privacy Policy explains how Sai Kushal Vittanala ("I", "me", or "my") collects, uses, discloses, and safeguards personal information when you visit or interact with my personal portfolio website (the "Website").',
            ],
        },
        {
            heading: "Information I Collect",
            subsections: [
                {
                    subheading: "Information You Provide",
                    list: [
                        "Contact details you provide through forms or direct messages",
                        "Content of inquiries or requests submitted via chat or email",
                        "Any other information you voluntarily share while engaging with me",
                    ],
                },
                {
                    subheading: "Automatically Collected Information",
                    list: [
                        "Browser type and version",
                        "Operating system",
                        "Anonymized IP address or general location data",
                        "Pages viewed, time spent, and referring URLs",
                        "Device identifiers or other diagnostic data",
                    ],
                },
            ],
        },
        {
            heading: "How I Use Your Information",
            list: [
                "To respond to your inquiries and communications",
                "To improve the Website's functionality, performance, and accessibility",
                "To analyze engagement trends and diagnose technical issues",
                "To prevent fraud, abuse, or security incidents",
            ],
        },
        {
            heading: "Information Sharing",
            paragraphs: [
                "I do not sell, rent, or trade your personal information. I may disclose limited information only in the following circumstances:",
            ],
            list: [
                "With your explicit consent",
                "To comply with legal obligations",
                "To protect my rights, property, or safety, or the rights of others",
                "To service providers who assist with Website hosting or analytics, subject to confidentiality obligations",
            ],
        },
        {
            heading: "Data Security",
            paragraphs: [
                "I implement commercially reasonable technical and organizational safeguards to help protect your personal information against unauthorized access, alteration, disclosure, or destruction. Nevertheless, no method of transmission or storage is completely secure, and I cannot guarantee absolute security.",
            ],
        },
        {
            heading: "Cookies and Tracking",
            paragraphs: [
                "The Website may use cookies, analytics scripts, or similar tracking technologies to enhance your browsing experience and understand how visitors use the site. You can adjust your browser or device settings to refuse cookies or notify you when cookies are being used; doing so may affect certain features.",
            ],
        },
        {
            heading: "Your Rights",
            paragraphs: ["You have the right to:"],
            list: [
                "Request access to the personal information I hold about you",
                "Request correction of inaccurate or incomplete information",
                "Request deletion of your personal information, subject to legal obligations",
                "Object to or restrict certain processing activities",
                "Withdraw consent where processing is based on consent",
            ],
        },
        {
            heading: "Changes to This Policy",
            paragraphs: [
                "I may update this Privacy Policy periodically to reflect changes in practices, technologies, or legal requirements. Any updates will be posted on this page with an updated revision date, and material changes will be highlighted where appropriate.",
            ],
        },
        {
            heading: "Third-Party Services",
            paragraphs: [
                "The Website may integrate with third-party services (such as analytics providers, hosting services, or content delivery networks) that have their own privacy policies. I encourage you to review the privacy policies of any third-party services that may collect your information.",
            ],
        },
        {
            heading: "Data Retention",
            paragraphs: [
                "I retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce agreements. When personal information is no longer needed, it will be securely deleted or anonymized.",
            ],
        },
        {
            heading: "International Data Transfers",
            paragraphs: [
                "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using the Website, you consent to such transfers, and I will take appropriate measures to ensure your information receives adequate protection.",
            ],
        },
        {
            heading: "Contact Information",
            paragraphs: [
                "If you have questions or requests regarding this Privacy Policy, please contact me using the Website's contact form or via the email address listed there. I will respond within a reasonable timeframe.",
            ],
        },
    ],
    footer:
        "This Privacy Policy constitutes a legally binding agreement between you and Sai Kushal Vittanala. By continuing to use this Website, you acknowledge that you have read and understood this Privacy Policy.",
};

export const termsDoc: LegalDoc = {
    title: "Terms and Conditions",
    updated: "Last updated: January 2026",
    sections: [
        {
            heading: "Introduction",
            paragraphs: [
                'Welcome to the personal portfolio website of Sai Kushal Vittanala (the "Website"). These Terms and Conditions ("Terms") govern your access to and use of the Website and any related content or services made available through it.',
                "By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must refrain from using the Website.",
            ],
        },
        {
            heading: "Use of the Website",
            subsections: [
                {
                    subheading: "Permitted Use",
                    paragraphs: ["You may use this website for:"],
                    list: [
                        "Reviewing my portfolio, projects, and professional experience",
                        "Contacting me for legitimate business, collaboration, or employment opportunities",
                        "Downloading my resume solely for professional evaluation",
                        "Learning more about my skills, services, and accomplishments",
                    ],
                },
                {
                    subheading: "Prohibited Use",
                    paragraphs: ["You may not:"],
                    list: [
                        "Use the website for any unlawful purpose",
                        "Attempt to gain unauthorized access to any part of the website",
                        "Transmit malware, malicious code, or engage in disruptive activities",
                        "Scrape, copy, or reproduce content without explicit permission",
                        "Use the website to send unsolicited or fraudulent communications",
                        "Impersonate me or misrepresent your relationship with me",
                    ],
                },
            ],
        },
        {
            heading: "Intellectual Property",
            paragraphs: [
                "All content on the Website—including text, graphics, logos, photographs, videos, designs, and code—is owned by me or used with permission from the respective owners. You may not reproduce, distribute, modify, or create derivative works from the content without my prior written consent.",
                "You may view or download my resume and portfolio materials strictly for professional evaluation and not for commercial resale or redistribution.",
            ],
        },
        {
            heading: "User-Generated Content",
            paragraphs: [
                "When you submit information through contact forms, email, or chat features, you grant me a non-exclusive right to use that information for the sole purpose of responding to your inquiry and improving the Website and related services.",
                "You are solely responsible for ensuring that the information you provide is accurate, lawful, and does not infringe on any third-party rights.",
            ],
        },
        {
            heading: "Disclaimers",
            subsections: [
                {
                    subheading: "Website Availability",
                    paragraphs: [
                        "I strive to keep the Website available at all times but do not guarantee uninterrupted or error-free operation. Downtime may occur due to maintenance, updates, or unforeseen technical issues.",
                    ],
                },
                {
                    subheading: "Information Accuracy",
                    paragraphs: [
                        "While I make reasonable efforts to keep the content accurate and up to date, information on the Website may occasionally be incomplete, outdated, or contain errors. I make no warranties regarding the accuracy, reliability, or completeness of the content.",
                    ],
                },
                {
                    subheading: "External Links",
                    paragraphs: [
                        "The Website may include links to third-party websites for convenience. I do not endorse, and am not responsible for, the content, privacy practices, or terms of those external sites.",
                    ],
                },
            ],
        },
        {
            heading: "Limitation of Liability",
            paragraphs: [
                "To the fullest extent permitted by law, I shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of—or inability to use—the Website, even if I have been advised of the possibility of such damages.",
            ],
        },
        {
            heading: "Privacy",
            paragraphs: [
                "Your privacy is important to me. Please refer to my Privacy Policy to understand how your personal information is collected, used, and protected.",
            ],
        },
        {
            heading: "Modifications to Terms",
            paragraphs: [
                "I reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Material changes will be highlighted where appropriate. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.",
            ],
        },
        {
            heading: "Termination",
            paragraphs: [
                "I may terminate or suspend your access to the Website at any time, without prior notice, for conduct that I believe violates these Terms or is harmful to other users, me, or third parties, or for any other reason at my sole discretion.",
            ],
        },
        {
            heading: "Governing Law",
            paragraphs: [
                "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where I reside, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.",
            ],
        },
        {
            heading: "Severability",
            paragraphs: [
                "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.",
            ],
        },
        {
            heading: "Contact Information",
            paragraphs: [
                "If you have questions about these Terms and Conditions, please reach out via the contact form on the Website or by email at the address provided there.",
            ],
        },
    ],
    footer:
        "These Terms and Conditions constitute a legally binding agreement between you and Sai Kushal Vittanala. By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
};
