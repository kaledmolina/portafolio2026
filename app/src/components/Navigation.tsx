import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Tech Stack', id: 'tech-stack' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-off-white/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="micro-label text-terminal-slate hover:text-accent-red transition-colors"
            >
              KALED MOLINA
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`micro-label transition-colors relative ${
                    activeSection === item.id 
                      ? 'text-accent-red' 
                      : 'text-text-secondary hover:text-terminal-slate'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-accent-red" />
                  )}
                </button>
              ))}
            </nav>

            {/* Role - Desktop */}
            <div className="hidden xl:block micro-label text-text-secondary">
              FULLSTACK DEVELOPER
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-terminal-slate hover:text-accent-red transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-terminal-slate/90 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-off-white shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-8">
            {/* Close button */}
            <div className="flex justify-end mb-12">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-terminal-slate hover:text-accent-red transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <li 
                    key={item.id}
                    style={{ 
                      transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease'
                    }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`headline-sm text-left w-full transition-colors ${
                        activeSection === item.id 
                          ? 'text-accent-red' 
                          : 'text-terminal-slate hover:text-accent-red'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Info */}
            <div 
              className="pt-8 border-t border-terminal-slate/10"
              style={{ 
                opacity: isMenuOpen ? 1 : 0,
                transition: 'opacity 0.4s ease 0.3s'
              }}
            >
              <div className="flex justify-between micro-label text-text-secondary">
                <span>© 2026</span>
                <span>LIMA, PERU</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Footer Info - Desktop */}
      <div className="fixed bottom-5 left-6 lg:left-10 z-30 micro-label text-text-secondary hidden lg:block">
        © 2026
      </div>
      <div className="fixed bottom-5 right-6 lg:right-10 z-30 micro-label text-text-secondary hidden lg:block">
        BASED IN LIMA
      </div>
    </>
  );
}
