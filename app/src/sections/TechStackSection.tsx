import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tech stack data organized by category
const techCategories = [
  {
    name: 'Backend',
    color: '#D81C1C',
    technologies: [
      { name: 'Laravel', level: 95, icon: 'L' },
      { name: 'PHP', level: 92, icon: 'P' },
      { name: 'Node.js', level: 85, icon: 'N' },
      { name: 'Python', level: 78, icon: 'Py' },
    ]
  },
  {
    name: 'Frontend',
    color: '#3B82F6',
    technologies: [
      { name: 'React', level: 90, icon: 'R' },
      { name: 'Vue.js', level: 88, icon: 'V' },
      { name: 'TypeScript', level: 87, icon: 'TS' },
      { name: 'Tailwind', level: 95, icon: 'Tw' },
    ]
  },
  {
    name: 'Mobile',
    color: '#06B6D4',
    technologies: [
      { name: 'Flutter', level: 88, icon: 'F' },
      { name: 'Dart', level: 85, icon: 'D' },
      { name: 'React Native', level: 80, icon: 'RN' },
      { name: 'iOS/Android', level: 75, icon: 'M' },
    ]
  },
  {
    name: 'Database & Cloud',
    color: '#10B981',
    technologies: [
      { name: 'PostgreSQL', level: 90, icon: 'Pg' },
      { name: 'MySQL', level: 92, icon: 'My' },
      { name: 'Redis', level: 82, icon: 'Re' },
      { name: 'AWS/Docker', level: 85, icon: 'Cl' },
    ]
  },
];

const additionalTools = [
  'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'WebSockets', 
  'Nginx', 'Linux', 'Testing', 'Agile', 'Figma'
];

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
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

      // Categories stagger animation
      const categoryCards = categoriesRef.current?.querySelectorAll('.category-card');
      if (categoryCards) {
        gsap.fromTo(
          categoryCards,
          { y: 80, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Progress bars animation
      progressRefs.current.forEach((progressBar, index) => {
        if (progressBar) {
          const level = progressBar.getAttribute('data-level');
          gsap.fromTo(
            progressBar,
            { width: '0%' },
            {
              width: `${level}%`,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: progressBar,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              delay: index * 0.05
            }
          );
        }
      });

      // Tools animation
      const toolTags = toolsRef.current?.querySelectorAll('.tool-tag');
      if (toolTags) {
        gsap.fromTo(
          toolTags,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: toolsRef.current,
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
      id="tech-stack"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-accent-red/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent-red" />
            <span className="micro-label text-accent-red">EXPERTISE</span>
          </div>
          <h2 className="headline-lg text-terminal-slate mb-4">
            TECH STACK
          </h2>
          <p className="body-text text-text-secondary max-w-2xl">
            A comprehensive toolkit for building modern, scalable applications. 
            From backend architecture to mobile experiences, I leverage the right 
            technologies for each project's unique requirements.
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div 
          ref={categoriesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {techCategories.map((category, catIndex) => (
            <div 
              key={category.name}
              className="category-card bg-white border border-terminal-slate/10 p-6 lg:p-8 hover:border-accent-red/30 transition-all duration-300 hover:shadow-xl"
              style={{ 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="headline-sm text-terminal-slate">
                  {category.name}
                </h3>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => {
                  const globalIndex = catIndex * 4 + techIndex;
                  return (
                    <div key={tech.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold text-white"
                            style={{ backgroundColor: category.color }}
                          >
                            {tech.icon}
                          </div>
                          <span className="body-text text-terminal-slate font-medium">
                            {tech.name}
                          </span>
                        </div>
                        <span className="micro-label text-text-secondary">
                          {tech.level}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 bg-terminal-slate/10 overflow-hidden">
                        <div 
                          ref={(el) => { progressRefs.current[globalIndex] = el; }}
                          data-level={tech.level}
                          className="h-full transition-all duration-1000 ease-out"
                          style={{ 
                            backgroundColor: category.color,
                            width: '0%'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tools */}
        <div ref={toolsRef}>
          <h3 className="micro-label text-text-secondary mb-6 text-center">
            ADDITIONAL TOOLS & PRACTICES
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalTools.map((tool) => (
              <span 
                key={tool}
                className="tool-tag px-4 py-2 border border-terminal-slate/20 text-terminal-slate micro-label hover:border-accent-red hover:text-accent-red hover:bg-accent-red/5 transition-all duration-300 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Flutter Highlight */}
        <div className="mt-16 lg:mt-24 p-6 lg:p-10 bg-terminal-slate text-off-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/20 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl lg:text-5xl font-bold text-accent-red">F</span>
                <span className="micro-label text-off-white/60">MOBILE DEVELOPMENT</span>
              </div>
              <h3 className="headline-md text-off-white mb-2">
                FLUTTER SPECIALIST
              </h3>
              <p className="body-text text-off-white/70 max-w-xl">
                Building beautiful, natively compiled applications for mobile, web, and desktop 
                from a single codebase. Fast development, expressive UI, and native performance.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="headline-sm text-accent-red">15+</div>
                <div className="micro-label text-off-white/60">Apps Published</div>
              </div>
              <div className="text-center">
                <div className="headline-sm text-accent-red">50K+</div>
                <div className="micro-label text-off-white/60">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
