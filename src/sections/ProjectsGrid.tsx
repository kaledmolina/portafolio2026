import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Projects data
const projects = [
  {
    id: 1,
    title: 'Plataforma de Gestión de Inquilinos',
    category: 'Plataforma SaaS',
    description: 'Un panel multi-inquilino completo con control de acceso basado en roles, notificaciones en tiempo real y facturación automatizada.',
    image: '/project-01.jpg',
    tags: ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind', 'PostgreSQL'],
    stats: { users: '2.5K', uptime: '99.9%' },
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Panel de Análisis en Tiempo Real',
    category: 'Visualización de Datos',
    description: 'Gráficos dirigidos por eventos con actualizaciones WebSocket, reportes exportables y widgets personalizables.',
    image: '/project-02.jpg',
    tags: ['Laravel', 'React', 'PostgreSQL', 'Docker', 'Redis'],
    stats: { requests: '1M+', latency: '<50ms' },
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: 3,
    title: 'Plataforma de E-Commerce',
    category: 'Aplicación Web',
    description: 'Tienda en línea completa con integración de pagos, gestión de inventario y una experiencia de compra fluida.',
    image: '/project-03.jpg',
    tags: ['Laravel', 'Vue.js', 'Stripe', 'MySQL', 'AWS'],
    stats: { products: '10K+', orders: '50K+' },
    github: '#',
    live: '#',
    featured: false
  },
  {
    id: 4,
    title: 'App de Banca Móvil',
    category: 'Aplicación Móvil',
    description: 'Aplicación fintech segura con autenticación biométrica, transacciones en tiempo real y seguimiento de inversiones.',
    image: '/project-04.jpg',
    tags: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Bloc'],
    stats: { downloads: '100K+', rating: '4.8' },
    github: '#',
    live: '#',
    featured: false
  },
  {
    id: 5,
    title: 'Sistema de Gestión de Salud',
    category: 'Software Empresarial',
    description: 'Sistema de gestión de pacientes compatible con HIPAA con programación de citas e historial médico.',
    image: '/project-05.jpg',
    tags: ['Laravel', 'React', 'PostgreSQL', 'Docker', 'FHIR'],
    stats: { patients: '50K+', clinics: '25' },
    github: '#',
    live: '#',
    featured: false
  },
  {
    id: 6,
    title: 'Análisis de Redes Sociales',
    category: 'Plataforma de Análisis',
    description: 'Panel de influencers con análisis de seguidores, métricas de participación y seguimiento de contenido.',
    image: '/project-06.jpg',
    tags: ['Node.js', 'React', 'MongoDB', 'GraphQL', 'AWS'],
    stats: { influencers: '5K+', data: '10M+' },
    github: '#',
    live: '#',
    featured: false
  }
];

export function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Project cards animation
      const projectCards = gridRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-off-white py-20 lg:py-32 z-30"
      id="projects"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-accent-red/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent-red" />
            <span className="micro-label text-accent-red">PORTAFOLIO</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="headline-lg text-terminal-slate mb-4">
                TRABAJOS SELECCIONADOS
              </h2>
              <p className="body-text text-text-secondary max-w-2xl">
                Una colección curada de proyectos que muestran mi experiencia en desarrollo web,
                aplicaciones móviles y arquitectura en la nube. Cada proyecto representa un
                desafío único resuelto con código limpio y escalable.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="headline-sm text-accent-red">50+</div>
                <div className="micro-label text-text-secondary">Proyectos</div>
              </div>
              <div className="w-px h-10 hairline" />
              <div className="text-center">
                <div className="headline-sm text-accent-red">6</div>
                <div className="micro-label text-text-secondary">Países</div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card group cursor-pointer ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              onClick={() => openModal(project)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-terminal-slate/5 mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-700 ease-out"
                />

                {/* Overlay */}
                <div className="project-overlay absolute inset-0 bg-terminal-slate/80 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <p className="body-text-sm text-off-white/80 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent-red micro-label">
                    VER PROYECTO
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent-red text-off-white micro-label">
                    DESTACADO
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="project-content">
                <span className="micro-label text-text-secondary mb-2 block">
                  {project.category}
                </span>
                <h3 className="headline-sm text-terminal-slate mb-3 group-hover:text-accent-red transition-colors">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="tech-tag text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="tech-tag text-xs">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-terminal-slate/10">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <span className="micro-label text-accent-red">{value}</span>
                      <span className="micro-label text-text-secondary">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 lg:mt-16 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            Ver todo en GitHub
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-terminal-slate/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-off-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-terminal-slate text-off-white hover:bg-accent-red transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="aspect-video relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-slate/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="micro-label text-off-white/80 mb-2 block">
                  {selectedProject.category}
                </span>
                <h3 className="headline-md text-off-white">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-10">
              <p className="body-text text-text-secondary mb-8">
                {selectedProject.description}
              </p>

              {/* Tags */}
              <div className="mb-8">
                <span className="micro-label text-text-secondary mb-3 block">TECNOLOGÍAS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mb-8 p-4 bg-terminal-slate/5">
                <span className="micro-label text-text-secondary mb-3 block">MÉTRICAS CLAVE</span>
                <div className="flex flex-wrap gap-6">
                  {Object.entries(selectedProject.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="headline-sm text-accent-red">{value}</div>
                      <div className="micro-label text-text-secondary uppercase">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={selectedProject.live}
                  className="btn-primary flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo en Vivo
                </a>
                <a
                  href={selectedProject.github}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Ver Código
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
