import { Link } from 'react-router-dom';
import Seo from '../../components/common/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The requested NOVIQ page does not exist." />
      <section className="container-wide py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="heading mt-4">This page is not available.</h1>
        <p className="lede mx-auto mt-4">The address may be incorrect, or the page may have been moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">Back home</Link>
          <Link to="/contact" className="btn-secondary">Start a Project</Link>
        </div>
      </section>
    </>
  );
}
