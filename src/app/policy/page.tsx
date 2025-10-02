import React from 'react';

const PolicyPage = () => (
  <div className="container p-8">
    <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy & Terms of Service</h1>
    <main className="space-y-8 max-w-4xl mx-auto">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-sm text-subtitle mb-4">Effective Date: October 2, 2025</p>
        <p className="text-base text-text-800 mb-4">
          This page outlines the terms and policies regarding the collection, use, and disclosure of
          personal information when you use this portfolio website, located at{' '}
          <a href="https://gss-digit.vercel.app" className="text-primary hover:underline">
            https://gss-digit.vercel.app
          </a>
          .
        </p>
        <h3 className="text-lg font-medium mb-2">1. Information We Collect</h3>
        <p className="text-base text-text-800 mb-4">
          To provide an interactive experience, specifically the ability to leave comments on
          projects, we collect the following information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Information you provide via Google OAuth: When you choose to log in using your Google
            account to leave a comment, we receive your Name and Email Address from Google.
          </li>
        </ul>
        <p className="text-base text-text-800 mb-4">
          We only ask for personal information when we truly need it to provide a service to you. We
          collect it by fair and lawful means, with your knowledge and consent.
        </p>
        <h3 className="text-lg font-medium mb-2">2. How We Use Your Information</h3>
        <p className="text-base text-text-800 mb-4">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            To Display Your Comments: Your Name (as provided by Google) will be displayed publicly
            next to the comments you post (the displayed name may be changed on profile section).
          </li>
          <li>
            For Authentication: Your Email Address is used solely to identify you as a unique user
            within our system (managed by Supabase Auth). Your email address is never displayed
            publicly or shared with any third parties.
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2">3. Data Storage and Security</h3>
        <p className="text-base text-text-800 mb-4">
          Your information (name and email) is stored securely in our database, hosted by Supabase.
          We take commercially acceptable measures to protect your information from loss, theft, and
          unauthorized access. We do not share any personally identifying information publicly or
          with third parties, except when required to by law.
        </p>
        <h3 className="text-lg font-medium mb-2">4. Your Rights</h3>
        <p className="text-base text-text-800 mb-4">
          You are free to refuse our request for your personal information, with the understanding
          that we may be unable to provide you with some of your desired services (such as leaving
          named comments). You can also request the deletion of your account and associated comments
          at any time by contacting us.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
        <h3 className="text-lg font-medium mb-2">1. User Conduct</h3>
        <p className="text-base text-text-800 mb-4">
          You are solely responsible for the content of your comments. By posting comments on this
          website, you agree not to post any material that is:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Spam, advertising, or any form of commercial solicitation.</li>
          <li>
            Defamatory, abusive, harassing, threatening, or an invasion of a right of privacy of
            another person.
          </li>
          <li>Hateful, racially, or otherwise biased or offensive.</li>
          <li>Unlawful or encourages illegal activity.</li>
        </ul>
        <p className="text-base text-text-800 mb-4">
          We reserve the right to remove any comments that violate these terms without prior notice.
        </p>
        <h3 className="text-lg font-medium mb-2">2. Intellectual Property</h3>
        <p className="text-base text-text-800 mb-4">
          All content included on this site, such as text, graphics, logos, and software, is the
          property of Gustavo Sant&apos;Anna and protected by international copyright laws. The
          projects displayed are for showcase purposes.
        </p>
        <h3 className="text-lg font-medium mb-2">3. Disclaimer</h3>
        <p className="text-base text-text-800 mb-4">
          This website and its contents are provided &quot;as is&quot; without warranty of any kind.
          We do not guarantee that the site will be available at all times or that it will be free
          of errors.
        </p>
        <h3 className="text-lg font-medium mb-2">4. Limitation of Liability</h3>
        <p className="text-base text-text-800 mb-4">
          In no event shall Gustavo Sant&apos;Anna be liable for any damages arising out of the use
          or inability to use the materials on this website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-base text-text-800">
          If you have any questions about this Privacy Policy or our Terms of Service, please
          contact us at:
        </p>
        <p className="text-base text-text-800">
          Email:{' '}
          <a href="mailto:g_santanna@outlook.com" className="text-primary hover:underline">
            g_santanna@outlook.com
          </a>
        </p>
      </section>
    </main>
  </div>
);

export default PolicyPage;
