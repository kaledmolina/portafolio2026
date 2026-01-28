import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, MapPin, Phone, Calendar, ArrowUpRight } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

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
    { icon: Mail, label: 'Email', value: 'kaledmoly@gmail.com', href: 'mailto:kaledmoly@gmail.com' },
    { icon: Phone, label: 'Teléfono', value: '+57 300 420 048', href: 'tel:+57300420048' },
    { icon: MapPin, label: 'Ubicación', value: 'Monteria, Cordoba', href: '#' },
    { icon: Calendar, label: 'Disponibilidad', value: 'Disponible', href: '#' },
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
            <span className="micro-label text-accent-red">CONTÁCTAME</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="headline-lg text-off-white leading-tight">
                CONSTRUYAMOS
              </h2>
              <h2 className="headline-lg text-off-white leading-tight">
                ALGO
              </h2>
              <h2 className="headline-lg text-accent-red leading-tight">
                ASOMBROSO.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="body-text text-off-white/70 max-w-md">
                ¿Tienes un proyecto en mente? Discutamos cómo podemos trabajar juntos
                para dar vida a tus ideas. Siempre estoy abierto a nuevas oportunidades y colaboraciones.
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
              <span className="micro-label text-off-white/50 mb-4 block">SÍGUEME</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: 'https://github.com/kaledmolina', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/kaled-molina-051a471a3/?skipRedirect=true', label: 'LinkedIn' },
                  { icon: XIcon, href: 'https://x.com/kaledmoly', label: 'X' },
                  { icon: WhatsAppIcon, href: 'https://wa.me/573004200048', label: 'WhatsApp' },
                  { icon: TikTokIcon, href: 'https://www.tiktok.com/@kaledmoly', label: 'TikTok' },
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
                  ¡MENSAJE ENVIADO!
                </h3>
                <p className="body-text text-off-white/70 mb-6">
                  Gracias por contactarme. Te responderé dentro de 1-2 días hábiles.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-accent"
                >
                  Enviar Otro Mensaje
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
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text placeholder:text-off-white/30"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div className="form-field">
                    <label className="micro-label text-off-white/60 block mb-2">
                      CORREO
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text placeholder:text-off-white/30"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="form-field mb-6">
                  <label className="micro-label text-off-white/60 block mb-2">
                    ASUNTO
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text placeholder:text-off-white/30"
                    placeholder="Consulta de Proyecto"
                  />
                </div>

                <div className="form-field mb-8">
                  <label className="micro-label text-off-white/60 block mb-2">
                    MENSAJE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-off-white/20 text-off-white py-3 focus:border-accent-red outline-none transition-colors body-text resize-none placeholder:text-off-white/30"
                    placeholder="Cuéntame sobre tu proyecto..."
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
                        ENVIANDO...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <span className="micro-label text-off-white/40">
                    Usualmente respondo en 24 horas
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-off-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="micro-label text-off-white/40">
            © 2026 KALED MOLINA. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 micro-label text-off-white/60 hover:text-accent-red transition-colors"
          >
            VOLVER ARRIBA
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
