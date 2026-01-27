import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layout, Server, Users, Sparkles, Zap, Shield, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Applications',
    description: 'Full-stack Laravel apps with modern UI/UX'
  },
  {
    icon: Server,
    title: 'APIs & Integrations',
    description: 'RESTful APIs and third-party integrations'
  },
  {
    icon: Layout,
    title: 'Code Audits',
    description: 'Performance and security reviews'
  },
  {
    icon: Users,
    title: 'Team Support',
    description: 'Mentoring and technical leadership'
  },
  {
    icon: Sparkles,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces'
  },
  {
    icon: Cpu,
    title: 'Cloud Architecture',
    description: 'Scalable cloud-native solutions'
  }
];

const expertise = [
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimized code that scales with your business'
  },
  {
    icon: Shield,
    title: 'Security Focused',
    description: 'Best practices for data protection'
  }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftColumnRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Right column animation
      gsap.fromTo(
        rightColumnRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Service cards animation
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards) {
        gsap.fromTo(
          serviceCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Expertise animation
      const expertiseItems = expertiseRef.current?.querySelectorAll('.expertise-item');
      if (expertiseItems) {
        gsap.fromTo(
          expertiseItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: expertiseRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-off-white py-20 lg:py-32 z-20"
      id="about"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[30vw] h-[40vh] bg-accent-red/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-24">
          
          {/* Left column */}
          <div ref={leftColumnRef}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent-red" />
              <span className="micro-label text-accent-red">ABOUT ME</span>
            </div>
            <h2 className="headline-lg text-terminal-slate mb-6">
              BUILDING DIGITAL EXPERIENCES
            </h2>
            <div className="space-y-4 body-text text-text-secondary">
              <p>
                I'm a passionate fullstack developer with over 8 years of experience 
                crafting digital solutions that make a difference. My journey began with 
                PHP and Laravel, and has evolved to embrace modern technologies like 
                Flutter for mobile development.
              </p>
              <p>
                I specialize in building scalable web applications, RESTful APIs, and 
                cross-platform mobile apps. My approach combines clean architecture 
                principles with agile methodologies to deliver robust, maintainable code.
              </p>
              <p>
                Whether it's a complex enterprise system or an innovative startup MVP, 
                I bring the same level of dedication and attention to detail to every project.
              </p>
            </div>

            {/* Expertise */}
            <div ref={expertiseRef} className="mt-8 space-y-4">
              {expertise.map((item) => (
                <div 
                  key={item.title}
                  className="expertise-item flex items-start gap-4 p-4 bg-white border border-terminal-slate/10"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-accent-red/10 text-accent-red flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="micro-label text-terminal-slate mb-1">{item.title}</h4>
                    <p className="body-text-sm text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div ref={rightColumnRef}>
            <h3 className="micro-label text-text-secondary mb-6">WHAT I DO</h3>
            
            {/* Services Grid */}
            <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <div 
                  key={service.title}
                  className="service-card group"
                >
                  <service.icon className="w-6 h-6 text-accent-red mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="micro-label text-terminal-slate mb-2">
                    {service.title}
                  </h4>
                  <p className="body-text-sm text-text-secondary">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Experience Stats */}
            <div className="mt-8 p-6 bg-terminal-slate text-off-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="headline-sm text-accent-red">8+</div>
                  <div className="micro-label text-off-white/60 mt-1">Years</div>
                </div>
                <div>
                  <div className="headline-sm text-accent-red">50+</div>
                  <div className="micro-label text-off-white/60 mt-1">Projects</div>
                </div>
                <div>
                  <div className="headline-sm text-accent-red">30+</div>
                  <div className="micro-label text-off-white/60 mt-1">Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
