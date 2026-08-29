import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import Seo from '../../components/common/Seo';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import ServiceCard from '../../components/common/ServiceCard';

export default function ServicesPage() {
  const { data: services = [], isLoading, isError } = useQuery({ queryKey: ['public-services'], queryFn: publicApi.getServices });

  return (
    <>
      <Seo title="Services" description="NOVIQ services in business analysis, design, technology, and 3D landscape visualization." />
      <section className="container-wide py-16">
        <p className="eyebrow">Services</p>
        <h1 className="heading mt-4">Design, technology, and visualization</h1>
        <p className="lede mt-4">Six offerings grouped into identity, product, analysis, automation, and landscape work.</p>
        {isLoading ? <LoadingState /> : null}
        {isError ? <ErrorState /> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
