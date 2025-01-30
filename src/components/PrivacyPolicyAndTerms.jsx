import React from "react";

const PrivacyPolicyAndTerms = () => {
    return (
        <div className=" sm:px-36 p-2 mx-auto px-6 py-12 bg-black text-gray-300">
            {/* Privacy Policy Section */}
            <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                We collect and process visitor analytics, including IP addresses and
                session data, to improve our services. No personally identifiable
                information (PII) is stored.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-3">Data Collection</h2>
            <p className="mb-4">
                - Visitor IPs are logged for analytics.<br />
                - No personal user accounts or sensitive data are stored.<br />
                - Data is stored securely using Appwrite.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Services</h2>
            <p className="mb-4">
                We use third-party services such as Vercel, Appwrite, and Google OAuth.
                These services may collect additional data under their own privacy policies.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-3">User Rights</h2>
            <p className="mb-4">
                If you wish to request data deletion or have questions, contact us at
                <a href="mailto:support@yourdomain.com" className="text-blue-400"> amanraj12.ar@gmail.com</a>.
            </p>
            <p className="text-sm mt-8 text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            {/* Terms of Service Section */}
            <div className="mt-12">
                <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>
                <p className="mb-4">
                    By using our services, you agree to the following terms:
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">General Terms</h2>
                <p className="mb-4">
                    - You agree to use the site and services for lawful purposes only.<br />
                    - We reserve the right to modify, suspend, or discontinue any part of our service.<br />
                    - You must not interfere with or disrupt the operation of the site or services.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Limitations of Liability</h2>
                <p className="mb-4">
                    - We are not responsible for any damages arising from the use of the website, including
                    direct, indirect, incidental, punitive, or consequential damages.<br />
                    - Our liability is limited to the maximum extent allowed by law.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">User Conduct</h2>
                <p className="mb-4">
                    You agree not to engage in any conduct that:
                    <ul className="list-disc pl-6">
                        <li>Violates any applicable laws or regulations.</li>
                        <li>Interferes with other users' access to the service.</li>
                        <li>Exploits, harms, or intimidates others, including minors.</li>
                    </ul>
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Termination</h2>
                <p className="mb-4">
                    We may suspend or terminate your access to our services if you violate these terms or
                    engage in conduct that is harmful to the site or its users.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Changes to Terms</h2>
                <p className="mb-4">
                    We reserve the right to update these terms at any time. We will notify users of significant changes.
                </p>
                <p className="text-sm mt-8 text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default PrivacyPolicyAndTerms;
