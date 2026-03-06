export const forms = [
    {
        id: 1,
        title: "Patient Onboarding",
        category: "Healthcare",
        description: "Submit personal details, medical history, and insurance information to register as a new patient.",
        status: "Active",
        icon: "UserPlus",
        color: "#3b82f6", // Blue
        publicUrl: "http://localhost:3000/public/form/healthcarepocpatientintakevirtualcareregistration",
        embedUrl: "http://localhost:3001/healthcarepocpatientintakevirtualcareregistration"
    },
    {
        id: 2,
        title: "Business License Application",
        category: "Operations",
        description: "Apply for a new business license or renew an existing one to operate legally in the region.",
        status: "Active",
        icon: "FileText",
        color: "#10b981", // Green
        publicUrl: "https://trynow-formsflow-web.aot-technologies.com/public/form/ffpocmobile-businesslicenseapplication",
        embedUrl: "https://forms-flow-forms-prod.aot-technologies.com/ffpocmobile-businesslicenseapplication"
    }
];

export const categories = ["All Forms", "Healthcare", "Operations", "Finance"];
