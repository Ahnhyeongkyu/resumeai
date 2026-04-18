import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ResumeAI",
  description:
    "ResumeAI privacy policy. Learn how we collect, use, and protect your personal information in compliance with GDPR and CCPA.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="prose prose-gray mx-auto max-w-3xl px-4 py-20">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: April 2026</p>

        <p>
          ResumeAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website
          resumeai.site (the &quot;Service&quot;). This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our Service, in compliance
          with the General Data Protection Regulation (GDPR) and the California Consumer
          Privacy Act (CCPA).
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Information You Provide</h3>
        <p>
          When you use our Service, you may provide us with personal information including but
          not limited to:
        </p>
        <ul>
          <li>
            <strong>Account information:</strong> email address and name when you create an
            account or make a purchase.
          </li>
          <li>
            <strong>Resume content:</strong> professional experience, education, skills, and
            other information you enter into the resume builder.
          </li>
          <li>
            <strong>Payment information:</strong> billing details processed securely through
            Gumroad, our payment processor. We do not store your full credit card number on our servers.
          </li>
          <li>
            <strong>Communications:</strong> messages you send to us through the contact form
            or email at support@resumeai.site.
          </li>
        </ul>

        <h3>1.2 Information Collected Automatically</h3>
        <p>
          When you access the Service, we may automatically collect certain information,
          including:
        </p>
        <ul>
          <li>
            <strong>Device information:</strong> browser type, operating system, device type,
            and screen resolution.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, features used, time spent on pages,
            and click patterns through Vercel Analytics.
          </li>
          <li>
            <strong>Log data:</strong> IP address, access times, referring URLs, and error
            logs through Sentry for performance monitoring and error tracking.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Service delivery:</strong> to generate your AI-powered resume, provide ATS
            scoring, and enable resume downloads.
          </li>
          <li>
            <strong>Payment processing:</strong> to process one-time payments and manage your
            purchase entitlements.
          </li>
          <li>
            <strong>Service improvement:</strong> to analyze usage patterns, fix bugs, and
            improve our resume builder and templates.
          </li>
          <li>
            <strong>Communication:</strong> to respond to your inquiries, send purchase
            confirmations, and provide customer support.
          </li>
          <li>
            <strong>Legal compliance:</strong> to comply with applicable laws, regulations, and
            legal processes.
          </li>
        </ul>
        <p>
          We do not use your resume content for training AI models. Your resume data is
          processed solely to generate your requested output and is not shared with third
          parties for their own purposes.
        </p>

        <h2>3. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share your information only with the
          following categories of service providers:
        </p>
        <ul>
          <li>
            <strong>Gumroad:</strong> for payment processing. Gumroad&apos;s privacy policy
            governs their handling of your payment data.
          </li>
          <li>
            <strong>Anthropic:</strong> for AI-powered resume generation. Resume content is
            sent to Anthropic&apos;s Claude API for processing and is subject to
            Anthropic&apos;s data usage policies.
          </li>
          <li>
            <strong>Vercel:</strong> for hosting, analytics, and content delivery.
          </li>
          <li>
            <strong>Sentry:</strong> for error monitoring and performance tracking.
          </li>
          <li>
            <strong>Resend:</strong> for transactional email delivery.
          </li>
        </ul>
        <p>
          We may also disclose your information if required by law, court order, or
          governmental request, or if we believe disclosure is necessary to protect our rights,
          your safety, or the safety of others.
        </p>

        <h2>4. Data Retention</h2>
        <p>We retain your information as follows:</p>
        <ul>
          <li>
            <strong>Resume content:</strong> stored for the duration of your active session and
            purchase period. After your plan expires or upon account deletion request, resume
            data is permanently deleted within 30 days.
          </li>
          <li>
            <strong>Payment records:</strong> retained for 7 years as required by tax and
            financial regulations.
          </li>
          <li>
            <strong>Analytics data:</strong> aggregated and anonymized data may be retained
            indefinitely for service improvement purposes.
          </li>
          <li>
            <strong>Communication records:</strong> retained for 2 years to provide customer
            support continuity.
          </li>
        </ul>

        <h2>5. Your Rights</h2>

        <h3>5.1 GDPR Rights (European Economic Area Residents)</h3>
        <p>If you are located in the EEA, you have the following rights:</p>
        <ul>
          <li>
            <strong>Right of access:</strong> request a copy of your personal data.
          </li>
          <li>
            <strong>Right to rectification:</strong> request correction of inaccurate data.
          </li>
          <li>
            <strong>Right to erasure:</strong> request deletion of your personal data.
          </li>
          <li>
            <strong>Right to restrict processing:</strong> request that we limit how we use
            your data.
          </li>
          <li>
            <strong>Right to data portability:</strong> receive your data in a structured,
            machine-readable format.
          </li>
          <li>
            <strong>Right to object:</strong> object to processing based on legitimate
            interests.
          </li>
        </ul>

        <h3>5.2 CCPA Rights (California Residents)</h3>
        <p>If you are a California resident, you have the right to:</p>
        <ul>
          <li>
            Know what personal information we collect, use, and disclose about you.
          </li>
          <li>Request deletion of your personal information.</li>
          <li>Opt out of the sale of your personal information (we do not sell your data).</li>
          <li>
            Non-discrimination for exercising your privacy rights.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:support@resumeai.site">support@resumeai.site</a>. We will respond to
          your request within 30 days.
        </p>

        <h2>6. Cookies</h2>
        <p>We use the following types of cookies and similar technologies:</p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> required for the Service to function, including
            session management and authentication. These cannot be disabled.
          </li>
          <li>
            <strong>Analytics cookies:</strong> used by Vercel Analytics to understand how
            visitors use our Service. These collect anonymized usage data.
          </li>
        </ul>
        <p>
          We do not use advertising cookies or tracking pixels. You can control cookies through
          your browser settings, though disabling essential cookies may affect Service
          functionality.
        </p>

        <h2>7. Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal
          information, including:
        </p>
        <ul>
          <li>HTTPS encryption for all data in transit.</li>
          <li>Encryption at rest for stored personal data.</li>
          <li>Secure payment processing through Gumroad (PCI DSS compliant).</li>
          <li>Regular security reviews and dependency updates.</li>
        </ul>
        <p>
          While we strive to protect your personal information, no method of electronic
          transmission or storage is 100% secure. We cannot guarantee absolute security.
        </p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our Service is not directed to individuals under the age of 16. We do not knowingly
          collect personal information from children. If you believe a child has provided us
          with personal information, please contact us at{" "}
          <a href="mailto:support@resumeai.site">support@resumeai.site</a> and we will delete
          such information promptly.
        </p>

        <h2>9. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your
          country of residence. We ensure appropriate safeguards are in place for international
          data transfers, including standard contractual clauses where required by GDPR.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material
          changes by posting the updated policy on this page with a revised &quot;Last
          updated&quot; date. Your continued use of the Service after any changes constitutes
          acceptance of the updated policy.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise your privacy
          rights, please contact us:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:support@resumeai.site">support@resumeai.site</a>
          </li>
          <li>Company: ResumeAI</li>
        </ul>
      </article>
    </main>
  );
}
