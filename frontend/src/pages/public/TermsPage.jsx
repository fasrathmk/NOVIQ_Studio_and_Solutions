import Seo from '../../components/common/Seo';

export default function TermsPage() {
  return (
    <>
      <Seo title="Terms" description="Terms of use for the NOVIQ Studio & Solutions website." />
      <article className="container-wide max-w-3xl py-16">
        <h1 className="heading">Terms</h1>
        <p className="mt-6 text-ink-muted">Last updated: 24 August 2026</p>
        <div className="mt-8 space-y-5 leading-relaxed text-ink-muted">
          <p>This website describes NOVIQ Studio & Solutions and allows visitors to submit project inquiries. Submitting a form is not a contract and does not create an obligation to proceed with work.</p>
          <p>Portfolio items marked as demonstration content are examples that can be edited from the admin dashboard. They should not be read as client endorsements or performance claims.</p>
          <p>All design, text, and code on this site remain the property of NOVIQ unless a separate agreement says otherwise.</p>
          <p>The local installation is intended for development and administration. Production hosting, backups, and public domain configuration will be handled separately.</p>
        </div>
      </article>
    </>
  );
}
