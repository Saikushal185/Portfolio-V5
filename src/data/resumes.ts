// One résumé, covering analytics, ML and engineering together.
//
// This used to be three role-targeted PDFs on the theory that a backend
// recruiter and a data-science recruiter want different evidence. In practice
// it asked the reader to self-sort before they knew enough about the work to
// do it, and it meant three documents to keep in step. One document that reads
// well for all three is the better problem to solve.

export interface Resume {
    label: string;
    note: string;
    file: string;
}

export const resume: Resume = {
    label: "Résumé",
    note: "Analytics, ML and engineering",
    file: "/resume/SaiKushal.pdf",
};
