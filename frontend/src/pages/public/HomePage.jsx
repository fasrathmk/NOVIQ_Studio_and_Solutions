import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { publicApi } from '../../api/public';
import Seo from '../../components/common/Seo';
import ProjectCard from '../../components/common/ProjectCard';
import LoadingState from '../../components/common/LoadingState';
import { CAPABILITY_GROUPS, PROCESS_STEPS, TOOLS } from '../../utils/constants';
import ServiceCard from '../../components/common/ServiceCard';
import { siteUrl } from '../../utils/format';

export default function HomePage() {
  const { data: settings } = useQuery({ queryKey: ['public-settings'], queryFn: publicApi.getSettings });
  const { data: services = [], isLoading: servicesLoading } = useQuery({ queryKey: ['public-services'], queryFn: publicApi.getServices });
  const { data: featured = [], isLoading: featuredLoading } = useQuery({ queryKey: ['featured-projects'], queryFn: publicApi.getFeaturedProjects });
  const { data: testimonials = [] } = useQuery({ queryKey: ['public-testimonials'], queryFn: publicApi.getTestimonials });

  const heading = settings?.heroHeading || 'We understand businesses, design identities, build digital products, and automate what matters.';
  const supporting = settings?.heroSupportingText || 'NOVIQ combines business analysis, strategic design, software development, automation, and 3D visualization to turn business needs into purposeful solutions.';

  return (
    <>
      <Seo
        title="NOVIQ Studio & Solutions | Design, Technology, Visualization"
        description={settings?.defaultSeoDescription || supporting}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'NOVIQ Studio & Solutions',
          url: siteUrl(),
          email: settings?.primaryEmail,
          telephone: settings?.phone,
          description: settings?.footerDescription,
        }}
      />
      <section className="container-wide grid items-end gap-12 pb-8 pt-16 lg:grid-cols-[1.4fr_0.8fr] lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="eyebrow">NOVIQ Studio & Solutions</p>
          <h1 className="display mt-5 max-w-4xl">{heading}</h1>
          <p className="lede mt-6">{supporting}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/work" className="btn-primary">
              View Our Work
            </Link>
            <Link to="/contact" className="btn-secondary">
              Start a Project
            </Link>
          </div>
        </motion.div>
        <div className="card p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-ink-soft">Positioning</p>
          <p className="mt-4 font-display text-2xl leading-snug">
            NOVIQ Studio & Solutions analyzes business needs, designs brands, builds digital products, automates processes, and visualizes spaces.
          </p>
        </div>
      </section>

      <section className="section container-wide grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Introduction</p>
          <h2 className="heading mt-4">A multidisciplinary studio for launch, operations, and growth.</h2>
        </div>
        <p className="text-lg leading-relaxed text-ink-muted">
          NOVIQ works across business analysis, design, software, automation, and landscape visualization. The practice is built for businesses that need a clearer brief, a coherent identity, a working digital product, a more reliable process, or a clearer picture of an outdoor space — without treating those as disconnected services.
        </p>
      </section>

      <section className="bg-ink text-cream-100">
        <div className="section container-wide">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-4 font-display text-heading text-cream-100">
            Three groups. {services.length || 6} services.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAPABILITY_GROUPS.map((group) => (
              <article key={group.key} className="rounded-card border border-white/10 p-6">
                <h3 className="font-display text-2xl">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-300">{group.text}</p>
                <ul className="mt-5 space-y-1 text-sm">
                  {group.services.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-wide">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="heading mt-4">What we deliver</h2>
          </div>
          <Link to="/services" className="hidden text-sm font-semibold text-noviq sm:inline-flex">
            All services <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        {servicesLoading ? (
          <LoadingState />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} compact />
            ))}
          </div>
        )}
      </section>

      <section className="section container-wide">
        <p className="eyebrow">Work</p>
        <h2 className="heading mt-4">Featured projects</h2>
        {featuredLoading ? (
          <LoadingState />
        ) : featured.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-ink-muted">Published featured projects will appear here.</p>
        )}
      </section>

      <section className="bg-cream-200/60">
        <div className="section container-wide">
          <p className="eyebrow">Process</p>
          <h2 className="heading mt-4">How we work</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="card p-6">
                <p className="text-xs font-semibold text-noviq">{step.number}</p>
                <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section container-wide">
        <p className="eyebrow">Tools</p>
        <h2 className="heading mt-4">Technologies we work with</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {TOOLS.map((tool) => (
            <li key={tool} className="rounded-pill border border-cream-300 bg-cream-50 px-4 py-2 text-sm">
              {tool}
            </li>
          ))}
        </ul>
      </section>

      {testimonials.length ? (
        <section className="section container-wide">
          <p className="eyebrow">Testimonials</p>
          <h2 className="heading mt-4">Selected feedback</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote key={item.id} className="card p-6">
                {item.demonstration ? (
                  <p className="text-xs font-semibold uppercase tracking-wide text-noviq">Demonstration quote</p>
                ) : null}
                <p className="mt-3 font-display text-2xl leading-snug">“{item.quote}”</p>
                <footer className="mt-4 text-sm text-ink-muted">
                  {item.clientName}
                  {item.companyOrRole ? ` · ${item.companyOrRole}` : ''}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-wide pb-20">
        <div className="rounded-card bg-noviq px-8 py-12 text-white sm:px-12">
          <h2 className="font-display text-heading">Ready to start a project?</h2>
          <p className="mt-4 max-w-2xl text-white/90">
            Tell us about the process, brand, product, workflow, or landscape you want to move forward.
          </p>
          <Link to="/contact" className="btn mt-8 bg-white text-noviq hover:bg-cream-100">
            Start a Project
          </Link>
        </div>
      </section>
    </>
  );
}
