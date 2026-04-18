import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ResumeAI",
  description:
    "ResumeAI terms of service. Read our terms and conditions for using the AI resume builder, payment policies, and intellectual property rights.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="prose prose-gray mx-auto max-w-3xl px-4 py-20">
        <h1>Terms of Service</h1>
        <p className="text-sm text-gray-500">Last updated: April 2026</p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the ResumeAI website
          and services at resumeai.site (the &quot;Service&quot;), operated by ResumeAI
          (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using the
          Service, you agree to be bound by these Terms. If you do not agree, do not use the
          Service.
        </p>

        <h2>1. Service Description</h2>
        <p>
          ResumeAI is an AI-powered resume building platform that provides the following
          features:
        </p>
        <ul>
          <li>AI-generated resume content based on user-provided information.</li>
          <li>ATS (Applicant Tracking System) compatibility scoring and optimization.</li>
          <li>Professional resume templates for PDF and DOCX download.</li>
          <li>AI-generated cover letters (Pro plan).</li>
        </ul>
        <p>
          The AI-generated content is provided as a starting point and suggestion. You are
          solely responsible for reviewing, editing, and verifying the accuracy of all content
          in your resume before using it for job applications. We do not guarantee that
          AI-generated content is accurate, complete, or suitable for any particular purpose.
        </p>

        <h2>2. Use Conditions</h2>

        <h3>2.1 Eligibility</h3>
        <p>
          You must be at least 16 years of age to use the Service. By using the Service, you
          represent that you meet this age requirement.
        </p>

        <h3>2.2 Acceptable Use</h3>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Service to generate false, misleading, or fraudulent resume content,
            including fabricated credentials, degrees, certifications, or employment history.
          </li>
          <li>
            Attempt to reverse-engineer, decompile, or extract the source code of the Service
            or its AI models.
          </li>
          <li>
            Use automated tools (bots, scrapers, or scripts) to access or interact with the
            Service without our written permission.
          </li>
          <li>
            Redistribute, resell, or sublicense access to the Service or its generated content
            on a commercial basis.
          </li>
          <li>
            Interfere with or disrupt the Service, servers, or networks connected to the
            Service.
          </li>
          <li>
            Upload content that is unlawful, defamatory, obscene, or violates the rights of
            any third party.
          </li>
        </ul>

        <h3>2.3 Account Responsibility</h3>
        <p>
          You are responsible for maintaining the confidentiality of your account and for all
          activities that occur under your account. You agree to notify us immediately of any
          unauthorized use of your account.
        </p>

        <h2>3. Payment &amp; Refunds</h2>

        <h3>3.1 Pricing</h3>
        <p>
          ResumeAI offers one-time payment plans. Prices are displayed on the pricing page and
          are subject to change. Price changes will not affect existing purchases.
        </p>
        <ul>
          <li>
            <strong>Free plan:</strong> unlimited AI-generated resumes with preview. No
            download.
          </li>
          <li>
            <strong>Basic plan ($9):</strong> one-time payment for 1 PDF download.
          </li>
          <li>
            <strong>Pro plan ($19):</strong> one-time payment for unlimited PDF and DOCX
            downloads, AI cover letter, and 30 days of access.
          </li>
        </ul>

        <h3>3.2 Payment Processing</h3>
        <p>
          All payments are processed securely through Gumroad, our payment processor. By
          making a purchase, you agree to Gumroad&apos;s{" "}
          <a
            href="https://gumroad.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          . We do not store your full credit card information on our servers.
        </p>

        <h3>3.3 No Subscription</h3>
        <p>
          All plans are one-time payments. There are no recurring charges, no auto-renewal, and
          no hidden fees. You will never be charged again after your initial purchase unless you
          make a new, separate purchase.
        </p>

        <h3>3.4 Refund Policy</h3>
        <p>
          We offer a refund within 7 days of purchase, provided you have not downloaded your
          resume. Once a resume has been downloaded, the purchase is considered fulfilled and is
          non-refundable. To request a refund, contact us at{" "}
          <a href="mailto:support@resumeai.site">support@resumeai.site</a> with your purchase
          confirmation.
        </p>

        <h2>4. Intellectual Property</h2>

        <h3>4.1 Your Content</h3>
        <p>
          You retain full ownership of the personal information and content you provide to the
          Service (your work history, education, skills, etc.). You also own the final resume
          documents generated using your content.
        </p>

        <h3>4.2 Our Service</h3>
        <p>
          The Service, including its design, code, templates, AI models, algorithms, and
          branding, is owned by ResumeAI and protected by intellectual property laws. You may
          not copy, modify, distribute, or create derivative works based on the Service without
          our written permission.
        </p>

        <h3>4.3 Templates</h3>
        <p>
          Resume templates provided by the Service are licensed for your personal use in
          creating resumes. You may not redistribute, sell, or sublicense the templates
          themselves. The formatted resume you create using a template is yours to use freely
          for job applications.
        </p>

        <h2>5. Disclaimers</h2>

        <h3>5.1 Service Availability</h3>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without
          warranties of any kind, whether express or implied, including but not limited to
          implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>

        <h3>5.2 AI-Generated Content</h3>
        <p>
          AI-generated content may contain errors, inaccuracies, or suggestions that are not
          appropriate for your specific situation. You are solely responsible for reviewing and
          verifying all content before using it. We do not guarantee that AI-generated resumes
          will result in job interviews or employment.
        </p>

        <h3>5.3 ATS Scoring</h3>
        <p>
          Our ATS compatibility scoring is based on common ATS criteria and industry best
          practices. Actual ATS systems vary by employer, and we do not guarantee that your
          resume will pass any specific employer&apos;s ATS system.
        </p>

        <h3>5.4 Limitation of Liability</h3>
        <p>
          To the maximum extent permitted by law, ResumeAI shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of
          profits, revenue, data, or use, arising from or related to your use of the Service.
          Our total liability for any claim arising from these Terms shall not exceed the amount
          you paid to us in the 12 months preceding the claim.
        </p>

        <h2>6. Changes to These Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify you of
          material changes by posting the updated Terms on this page with a revised &quot;Last
          updated&quot; date. Your continued use of the Service after changes are posted
          constitutes acceptance of the revised Terms. If you disagree with any changes, you
          must stop using the Service.
        </p>

        <h2>7. Dispute Resolution</h2>

        <h3>7.1 Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the
          State of Delaware, United States, without regard to its conflict of law provisions.
        </p>

        <h3>7.2 Informal Resolution</h3>
        <p>
          Before filing any formal dispute, you agree to contact us at{" "}
          <a href="mailto:support@resumeai.site">support@resumeai.site</a> and attempt to
          resolve the dispute informally within 30 days.
        </p>

        <h3>7.3 Arbitration</h3>
        <p>
          Any dispute that cannot be resolved informally shall be resolved by binding
          arbitration administered in accordance with the rules of the American Arbitration
          Association. The arbitration shall be conducted in English. Judgment on the
          arbitration award may be entered in any court of competent jurisdiction.
        </p>

        <h3>7.4 Class Action Waiver</h3>
        <p>
          You agree that any dispute resolution proceedings will be conducted only on an
          individual basis and not as a class, consolidated, or representative action.
        </p>

        <h2>8. Termination</h2>
        <p>
          We may suspend or terminate your access to the Service at any time, without notice,
          if we believe you have violated these Terms. Upon termination, your right to use the
          Service will cease immediately. Provisions of these Terms that by their nature should
          survive termination shall survive, including ownership provisions, warranty
          disclaimers, and limitation of liability.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us:
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
