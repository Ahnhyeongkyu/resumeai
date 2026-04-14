import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeAI",
  description: "ResumeAI Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none text-sm text-gray-700 space-y-6">
          <p><strong>Effective Date:</strong> April 15, 2026</p>
          <p>ResumeAI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website and services.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">1. Information We Collect</h2>
          <p><strong>Information you provide:</strong> Name, email address, phone number, work experience, education, and skills that you enter into our resume builder. Job descriptions you paste for AI analysis.</p>
          <p><strong>Automatically collected:</strong> IP address, browser type, device information, pages visited, and usage patterns through cookies and analytics tools (Google Analytics 4).</p>
          <p><strong>Payment information:</strong> Payment processing is handled by Stripe. We do not store credit card numbers on our servers.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To generate AI-powered resumes tailored to your job descriptions</li>
            <li>To calculate ATS compatibility scores</li>
            <li>To process payments and deliver PDF downloads</li>
            <li>To improve our AI models and service quality</li>
            <li>To send service-related communications</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">3. AI Data Processing</h2>
          <p>Your resume data and job descriptions are sent to Anthropic&apos;s Claude API for AI processing. This data is used solely for generating your resume and is not used to train AI models. Anthropic&apos;s data handling is governed by their privacy policy.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">4. Data Retention</h2>
          <p>We retain your resume data for 30 days after generation to allow re-downloads. After this period, data is automatically deleted. You may request immediate deletion at any time.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">5. Your Rights (GDPR/CCPA)</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li><strong>Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Opt-out:</strong> Opt out of marketing communications and data sale (we do not sell data)</li>
          </ul>
          <p>To exercise these rights, contact us at support@resumeai.site.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">6. Cookies</h2>
          <p>We use essential cookies for site functionality and analytics cookies (Google Analytics 4) to understand usage patterns. You can control cookies through your browser settings.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">7. Third-Party Services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Anthropic (Claude API):</strong> AI resume generation</li>
            <li><strong>Google Analytics 4:</strong> Website analytics</li>
            <li><strong>Vercel:</strong> Website hosting</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">8. Security</h2>
          <p>We implement industry-standard security measures including HTTPS encryption, secure API communications, and regular security reviews.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">9. Children&apos;s Privacy</h2>
          <p>Our service is not intended for children under 16. We do not knowingly collect personal information from children.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">10. Changes</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">11. Contact</h2>
          <p>For privacy-related inquiries: support@resumeai.site</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
