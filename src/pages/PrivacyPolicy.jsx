import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <p className="text-sm text-gray-600 mb-8">Last Updated: December 7, 2025</p>

                <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Welcome to Airtable Form Builder ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Information You Provide</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Account Information:</strong> When you authenticate via Airtable OAuth, we receive your Airtable user ID, email address, and name</li>
                            <li><strong>Form Data:</strong> Information you provide when creating forms, including form titles, descriptions, and field configurations</li>
                            <li><strong>Response Data:</strong> Form submissions and responses collected through your forms</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Information Collected Automatically</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Usage Data:</strong> Information about how you use our Service, including access times, pages viewed, and features used</li>
                            <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
                            <li><strong>Cookies:</strong> We use cookies and similar technologies to maintain your session and improve user experience</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3 Information from Third Parties</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Airtable Data:</strong> Access to your Airtable bases, tables, and records as authorized through OAuth</li>
                            <li><strong>OAuth Tokens:</strong> Access and refresh tokens to maintain your connection with Airtable</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use your information to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Provide, operate, and maintain our Service</li>
                            <li>Authenticate and authorize your access to Airtable data</li>
                            <li>Create and manage forms connected to your Airtable bases</li>
                            <li>Store and process form responses</li>
                            <li>Synchronize data between our Service and Airtable via webhooks</li>
                            <li>Improve and optimize our Service</li>
                            <li>Communicate with you about updates, security alerts, and support</li>
                            <li>Detect, prevent, and address technical issues and security threats</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Data Storage</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We store your data in secure MongoDB databases and use Cloudinary for file uploads. Your Airtable OAuth tokens are encrypted using industry-standard encryption methods.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 Security Measures</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>HTTPS encryption for data in transit</li>
                            <li>Token encryption for sensitive credentials</li>
                            <li>JWT-based authentication with secure httpOnly cookies</li>
                            <li>Rate limiting to prevent abuse</li>
                            <li>Security headers (Helmet.js) to protect against common vulnerabilities</li>
                            <li>Regular security updates and monitoring</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mt-4">
                            While we implement robust security measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
                            <li><strong>Service Providers:</strong> With third-party services that help us operate (Airtable, MongoDB Atlas, Cloudinary, Vercel, Render)</li>
                            <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                            <li><strong>Security and Fraud Prevention:</strong> To protect the rights, property, or safety of our users</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our Service integrates with the following third-party services:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Airtable:</strong> For OAuth authentication and data synchronization (<a href="https://www.airtable.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Airtable Privacy Policy</a>)</li>
                            <li><strong>Cloudinary:</strong> For file upload and storage (<a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cloudinary Privacy Policy</a>)</li>
                            <li><strong>MongoDB Atlas:</strong> For database hosting (<a href="https://www.mongodb.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MongoDB Privacy Policy</a>)</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            These services have their own privacy policies, and we encourage you to review them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                            <li><strong>Revocation:</strong> Revoke Airtable OAuth access at any time through your Airtable account settings</li>
                            <li><strong>Data Portability:</strong> Request export of your data in a structured format</li>
                            <li><strong>Opt-Out:</strong> Opt out of non-essential communications</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            To exercise these rights, please contact us at <a href="mailto:sudharsan638294@gmail.com" className="text-blue-600 hover:underline">sudharsan638294@gmail.com</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use the following cookies:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Authentication Cookies:</strong> To maintain your login session (httpOnly, secure)</li>
                            <li><strong>Functional Cookies:</strong> To remember your preferences and settings</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            You can control cookies through your browser settings, but disabling cookies may affect Service functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We retain your personal data for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal or regulatory purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our Service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal data, please contact us, and we will take steps to delete such information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Service, you consent to such transfers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">
                                <strong>Email:</strong> <a href="mailto:sudharsan638294@gmail.com" className="text-blue-600 hover:underline">sudharsan638294@gmail.com</a>
                            </p>
                            <p className="text-gray-700 mt-2">
                                <strong>GitHub:</strong> <a href="https://github.com/Sudharsan-6955/Airtable-Form-Builder" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Airtable Form Builder Repository</a>
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
