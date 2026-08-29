import Seo from '../../components/common/Seo';

export default function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy Policy" description="How NOVIQ Studio & Solutions handles inquiry and website information." />
      <article className="container-wide max-w-3xl py-16">
        <h1 className="heading">Privacy Policy</h1>
        <p className="mt-6 text-ink-muted">Last updated: 24 August 2026</p>
        <div className="mt-8 space-y-5 leading-relaxed text-ink-muted">
          <p>NOVIQ Studio & Solutions collects information that you submit through the project inquiry form, including your name, email, optional phone number, company name, and project details.</p>
          <p>That information is stored in the local NOVIQ database so the administrator can review and respond to requests. It is not sold or used for advertising.</p>
          <p>The public website also uses standard server and browser behaviour such as page titles and local storage for administrator sign-in. The administrator login is not a public registration system.</p>
          <p>If you want an inquiry removed, contact the studio using the email published in the website settings.</p>
        </div>
      </article>
    </>
  );
}
