import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, Twitter, MapPin, Phone, Calendar, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
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

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Info cards animation
      const infoCards = infoRef.current?.querySelectorAll('.info-card');
      if (infoCards) {
        gsap.fromTo(
          infoCards,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Form fields stagger
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(
          formFields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@kaledmolina.dev', href: 'mailto:hello@kaledmolina.dev' },
    { icon: Phone, label: 'Phone', value: '+51 999 888 777', href: 'tel:+51999888777' },
    { icon: MapPin, label: 'Location', value: 'Lima, Peru', href: '#' },
    { icon: Calendar, label: 'Availability', value: 'Open to work', href: '#' },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-terminal-slate z-50 py-20 lg:py-32"
      id="contact"
    >
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-accent-red/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-accent-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div ref={headlineRef} className="mb-12 lg:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent-red" />
            <span className="micro-label text-accent-red">GET IN TOUCH</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="headline-lg text-off-white leading-tight">
                LET'S BUILD
              </h2>
              <h2 className="headline-lg text-off-white leading-tight">
                SOMETHING
              </h2>
              <h2 className="headline-lg text-accent-red leading-tight">
                AMAZING.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="body-text text-off-white/70 max-w-md">
                Have a project in mind? Let's discuss how we can work together to bring 
                your ideas to life. I'm always open to new opportunities and collaborations.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left - Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="info-card flex items-center gap-4 p-4 bg-off-white/5 border border-off-white/10 hover:border-accent-red/50 hover:bg-off-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-accent-red/10 text-accent-red group-hover:bg-accent-red group-hover:text-off-white transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="micro-label text-off-white/50 mb-1">{item.label}</div>
                  <div className="body-text text-off-white group-hover:text-accent-red transition-colors">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="pt-6">
              <span className="micro-label text-off-white/50 mb-4 block">FOLLOW ME</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-off-white/5 text-off-white/60 hover:bg-accent-red hover:text-off-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center p-8 lg:p-12 bg-off-white/5 border border-off-white/10 text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-accent-red text-off-white mb-6">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="headline-md text-off-white mb-4">
                  MESSAGE SENT!
                </h3>
                <p className="body-text text-off-white/70 mb-6">
                  Thank you for reaching out. I'll get back to you within 1-2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-accent"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-6 lg:p-10 bg-off-white/5 border border-off-white/10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="form-field">
                    <label className="micro-label text-off-white/60 block mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text placeholder:text-off-white/30"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-field">
                    <label className="micro-label text-off-white/60 block mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text placeholder:text-off-white/30"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-field mb-6">
                  <label className="micro-label text-off-white/60 block mb-2">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text placeholder:text-off-white/30"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="form-field mb-8">
                  <label className="micro-label text-off-white/60 block mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text resize-none placeholder:text-off-white/30"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="form-field flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-accent flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-off-white/30 border-t-off-white rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  
                  <span className="micro-label text-off-white/40">
                    Usually reply within 24 hours
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-off-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="micro-label text-off-white/40">
            © 2026 KALED MOLINA. ALL RIGHTS RESERVED.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 micro-label text-off-white/60 hover:text-accent-red transition-colors"
          >
            BACK TO TOP
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
