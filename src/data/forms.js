export const forms = [
    {
        id: 1,
        title: "Patient Onboarding",
        category: "Healthcare",
        description: "Submit personal details, medical history, and insurance information to register as a new patient.",
        status: "Active",
        icon: "UserPlus",
        color: "#3b82f6", // Blue
        publicUrl: `${import.meta.env.VITE_PUBLIC_URL_BASE}/ffpocmobile-healthcarepocpatientintakevirtualcareregistration`,
        embedUrl: `${import.meta.env.VITE_EMBED_URL_BASE}/ffpocmobile-healthcarepocpatientintakevirtualcareregistration`,
        updatedAt: "2024-03-05T10:00:00Z"
    },
    {
        id: 2,
        title: "Business License Application",
        category: "Operations",
        description: "Apply for a new business license or renew an existing one to operate legally in the region.",
        status: "Active",
        icon: "FileText",
        color: "#10b981", // Green
        publicUrl: `${import.meta.env.VITE_PUBLIC_URL_BASE}/ffpocmobile-businesslicenseapplication`,
        embedUrl: `${import.meta.env.VITE_EMBED_URL_BASE}/ffpocmobile-businesslicenseapplication`,
        updatedAt: "2024-03-04T12:00:00Z"
    },
    {
        id: 3,
        title: "FOIPP Access Request",
        category: "Operations",
        description: "Request access to records or personal information held by public bodies under the Freedom of Information and Protection of Privacy Act.",
        status: "Active",
        icon: "ShieldAlert",
        color: "#6366f1", // Indigo
        publicUrl: `${import.meta.env.VITE_PUBLIC_URL_BASE}/ffpocmobile-freedomofinformationandprotectionofprivacy`,
        embedUrl: `${import.meta.env.VITE_EMBED_URL_BASE}/ffpocmobile-freedomofinformationandprotectionofprivacy`,
        updatedAt: "2024-03-03T15:30:00Z"
    },
    {
        id: 4,
        title: "Employee Onboarding",
        category: "Operations",
        description: "Submit personal details, tax forms, and account setup requests for new hires to streamline the onboarding process.",
        status: "Active",
        icon: "UserCheck",
        color: "#f59e0b", // Amber
        publicUrl: `${import.meta.env.VITE_PUBLIC_URL_BASE}/ffpocmobile-employeeonboardingform`,
        embedUrl: `${import.meta.env.VITE_EMBED_URL_BASE}/ffpocmobile-employeeonboardingform`,
        updatedAt: "2024-03-05T14:45:00Z"
    }
];

export const categories = ["All Forms", "Healthcare", "Operations", "Finance"];
