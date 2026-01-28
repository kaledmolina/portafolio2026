import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowDown, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const redPanelRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Red panel entrance
      tl.fromTo(
        redPanelRef.current,
        { x: '-100%', opacity: 1 },
        { x: 0, duration: 1.2 }
      );

      // Portrait entrance with reveal effect
      tl.fromTo(
        portraitRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
        { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power2.inOut' },
        0.2
      );

      // Hairline draw animation
      tl.fromTo(
        hairlineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1, transformOrigin: 'top', ease: 'power2.out' },
        0.4
      );

      // Headline lines stagger with character animation
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        headlineLines.forEach((line, i) => {
          tl.fromTo(
            line,
            { x: 100, opacity: 0, rotateX: -45 },
            { x: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'back.out(1.2)' },
            0.3 + i * 0.12
          );
        });
      }

      // Subheadline fade in
      tl.fromTo(
        subheadlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.7
      );

      // CTAs with bounce
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
        0.85
      );

      // Socials
      const socialLinks = socialsRef.current?.querySelectorAll('a');
      if (socialLinks && socialLinks.length > 0) {
        tl.fromTo(
          socialLinks,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          1
        );
      }

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      if (statNumbers) {
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          tl.fromTo(
            stat,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.5,
              ease: 'power2.out',
              snap: { innerText: 1 }
            },
            0.8
          );
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.8,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(redPanelRef.current, { x: 0, opacity: 1 });
            gsap.set(portraitRef.current, { x: 0, scale: 1, opacity: 1, clipPath: 'inset(0% 0 0 0)' });
            gsap.set(headlineRef.current, { x: 0, opacity: 1 });
            gsap.set(subheadlineRef.current, { x: 0, opacity: 1 });
            gsap.set(ctaRef.current, { x: 0, opacity: 1 });
            gsap.set(socialsRef.current, { x: 0, opacity: 1 });
            gsap.set(statsRef.current, { y: 0, opacity: 1 });
          }
        }
      });

      // EXIT (70-100%) - Dramatic exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power3.in' },
        0.70
      );

      scrollTl.fromTo(
        redPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-60vw', opacity: 0, ease: 'power3.in' },
        0.70
      );

      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-20vw', scale: 0.9, opacity: 0, ease: 'power3.in' },
        0.72
      );

      scrollTl.fromTo(
        [subheadlineRef.current, ctaRef.current, socialsRef.current, statsRef.current],
        { x: 0, opacity: 1 },
        { x: '15vw', opacity: 0, ease: 'power3.in', stagger: 0.02 },
        0.72
      );

      scrollTl.fromTo(
        hairlineRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'bottom' },
        0.78
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTech = () => {
    const element = document.getElementById('tech-stack');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-off-white z-10 flex items-center"
      id="hero"
    >
      {/* Red accent panel */}
      <div
        ref={redPanelRef}
        className="absolute left-0 top-0 w-full lg:w-[34vw] h-full bg-accent-red"
      />

      {/* Vertical hairline - hidden on mobile */}
      <div
        ref={hairlineRef}
        className="hidden lg:block absolute left-[34vw] top-0 w-px h-full hairline"
      />

      {/* Content Container */}
      <div className="relative w-full h-full flex flex-col lg:flex-row">

        {/* Left side - Portrait */}
        <div className="relative w-full lg:w-[34vw] h-[40vh] lg:h-full flex items-center justify-center lg:justify-start lg:pl-[6vw]">
          <img
            ref={portraitRef}
            src="/hero-portrait.png"
            alt="Kaled Molina"
            className="w-[60%] lg:w-[28vw] h-[80%] lg:h-[70vh] object-cover shadow-2xl"
          />
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-0 lg:pl-[6vw] py-8 lg:py-0">

          {/* Headline block */}
          <div
            ref={headlineRef}
            className="mb-4 lg:mb-6"
          >
            <div className="headline-line headline-xl text-off-white lg:text-terminal-slate">
              DESARROLLADOR
            </div>
            <div className="headline-line headline-xl text-off-white lg:text-terminal-slate">
              LARAVEL
            </div>
            <div className="headline-line headline-xl text-off-white lg:text-terminal-slate">
              FULLSTACK
            </div>
          </div>

          {/* Subheadline - FIXED POSITION */}
          <div
            ref={subheadlineRef}
            className="mb-6 lg:mb-8 max-w-md"
          >
            <p className="body-text text-off-white/90 lg:text-text-secondary">
              Construyo aplicaciones web escalables con arquitectura limpia,
              APIs robustas y experiencias frontend modernas. Especializado en
              Laravel, Flutter y soluciones nativas en la nube.
            </p>
          </div>

          {/* CTA row */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 lg:gap-6 mb-6 lg:mb-8"
          >
            <button
              onClick={scrollToWork}
              className="btn-primary flex items-center gap-2 bg-off-white text-terminal-slate lg:bg-terminal-slate lg:text-off-white"
            >
              Ver Proyectos
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToTech}
              className="btn-secondary border-off-white/50 text-off-white lg:border-terminal-slate lg:text-terminal-slate"
            >
              Tecnologías
            </button>
            <a
              href="#"
              className="micro-label text-off-white/80 lg:text-terminal-slate link-underline flex items-center gap-1"
            >
              Descargar CV
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="hidden lg:flex items-center gap-8 mb-8"
          >
            <div>
              <div className="headline-sm text-accent-red">
                <span className="stat-number" data-target="70">0</span>+
              </div>
              <div className="micro-label text-text-secondary">Proyectos</div>
            </div>
            <div className="w-px h-10 hairline" />
            <div>
              <div className="headline-sm text-accent-red">
                <span className="stat-number" data-target="3">0</span>+
              </div>
              <div className="micro-label text-text-secondary">Años Exp</div>
            </div>
            <div className="w-px h-10 hairline" />
            <div>
              <div className="headline-sm text-accent-red">
                <span className="stat-number" data-target="30">0</span>+
              </div>
              <div className="micro-label text-text-secondary">Clientes</div>
            </div>
          </div>

          {/* Social micro-row */}
          <div
            ref={socialsRef}
            className="flex items-center gap-4 lg:gap-8"
          >
            <a
              href="https://github.com/kaledmolina"
              target="_blank"
              rel="noopener noreferrer"
              className="micro-label text-off-white/70 lg:text-text-secondary hover:text-accent-red transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GITHUB</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kaled-molina-051a471a3/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="micro-label text-off-white/70 lg:text-text-secondary hover:text-accent-red transition-colors flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LINKEDIN</span>
            </a>
            <a
              href="mailto:kaledmoly@gmail.com"
              className="micro-label text-off-white/70 lg:text-text-secondary hover:text-accent-red transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">EMAIL</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
