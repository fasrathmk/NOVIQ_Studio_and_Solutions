import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import Seo from '../../components/common/Seo';
import SmartImage from '../../components/common/SmartImage';
import { PROCESS_STEPS, TOOLS, VALUES } from '../../utils/constants';

export default function AboutPage() {
  const { data: team = [] } = useQuery({ queryKey: ['public-team'], queryFn: publicApi.getTeam });

  return (
    <>
      <Seo title="About" description="NOVIQ Studio & Solutions is a multidisciplinary practice for business analysis, brand, product, automation, and landscape visualization." />
      <section className="container-wide py-16">
        <p className="eyebrow">About</p>
        <h1 className="heading mt-4 max-w-3xl">A studio that analyzes, designs, builds, automates, and visualizes.</h1>
        <p className="lede mt-5">
          NOVIQ Studio & Solutions exists for businesses that need more than a single specialist. Requirements, identity, interfaces, software, workflows, and outdoor visualization sit in one practice so the work stays coherent from first conversation to delivery.
        </p>
      </section>
      <section className="container-wide grid gap-10 pb-16 lg:grid-cols-2">
        <article>
          <h2 className="font-display text-3xl">Story</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            NOVIQ was formed around a practical observation: brand, product, and operations work are often split across vendors who never see the full picture. The studio keeps those capabilities together, using a shared process and a preference for clear, maintainable delivery over spectacle.
          </p>
        </article>
        <article className="space-y-8">
          <div>
            <h2 className="font-display text-3xl">Mission</h2>
            <p className="mt-4 text-ink-muted">Help businesses launch, operate, and grow with analysis, design, software, automation, and visualization that can actually be used.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Vision</h2>
            <p className="mt-4 text-ink-muted">A compact multidisciplinary studio that clients can return to as their identity, products, and processes evolve.</p>
          </div>
        </article>
      </section>
      <section className="bg-cream-200/70">
        <div className="container-wide section">
          <h2 className="heading">Values</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {VALUES.map((value) => (
              <article key={value.title} className="card p-6">
                <h3 className="font-display text-2xl">{value.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wide section">
        <h2 className="heading">A multidisciplinary approach</h2>
        <p className="lede mt-4">
          NOVIQ brings together business analysis, design, technology, automation, and 3D visualization under one studio. Design defines how the business is seen. Technology makes the product and process work. Visualization helps people understand space before it is built. Those remain connected capabilities rather than isolated departments.
        </p>
      </section>
      <section className="container-wide pb-16">
        <h2 className="heading">Team</h2>
        {team.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <article key={member.id} className="card overflow-hidden">
                <SmartImage src={member.imageUrl} alt={member.name} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-display text-2xl">{member.name}</h3>
                  <p className="mt-1 text-sm text-noviq">{member.role}</p>
                  {member.biography ? <p className="mt-3 text-sm text-ink-muted">{member.biography}</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-ink-muted">
            Team profiles can be published from the admin dashboard. Until then, contact NOVIQ directly through the project inquiry form.
          </p>
        )}
      </section>
      <section className="container-wide pb-16">
        <h2 className="heading">Technology and skills</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {TOOLS.map((tool) => (
            <li key={tool} className="rounded-pill border border-cream-300 px-4 py-2 text-sm">{tool}</li>
          ))}
        </ul>
      </section>
      <section className="container-wide pb-16">
        <h2 className="heading">Working process</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <li key={step.title} className="card p-5">
              <p className="text-xs text-noviq">{step.number}</p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="container-wide pb-20">
        <div className="rounded-card bg-ink px-8 py-12 text-cream-100">
          <h2 className="font-display text-heading">Start a conversation</h2>
          <p className="mt-4 max-w-xl text-cream-300">Share the project you want to move, and we will respond with next steps.</p>
          <Link to="/contact" className="btn-primary mt-6">Start a Project</Link>
        </div>
      </section>
    </>
  );
}
