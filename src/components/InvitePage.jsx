import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  MessageCircle,
  Pen,
  CheckCircle2,
  Shield,
} from 'lucide-react';
// se o arquivo está em /public/convite.jpeg:
import conviteImage from '/convite.jpeg';
import RSVPForm from './RSVPForm';

const InvitePage = ({
  formData,
  setFormData,
  submitted,
  onSubmit,
  goToAdmin,
}) => {
  const [activeSection, setActiveSection] = useState('local');
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

  const localRef = useRef(null);
  const mensagemRef = useRef(null);
  const recadosRef = useRef(null);
  const rsvpRef = useRef(null);

  const sectionConfig = {
    local: { id: 'local', label: 'Local', icon: MapPin, ref: localRef },
    mensagem: {
      id: 'mensagem',
      label: 'Mensagem',
      icon: MessageCircle,
      ref: mensagemRef,
    },
    recados: { id: 'recados', label: 'Recados', icon: Pen, ref: recadosRef },
    confirmacao: {
      id: 'confirmacao',
      label: 'Confirmação',
      icon: CheckCircle2,
      ref: rsvpRef,
    },
  };

  const sections = Object.values(sectionConfig);

  const scrollToSection = (section) => {
    setActiveSection(section.id);
    section.ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0.2,
      },
    );

    [localRef, mensagemRef, recadosRef, rsvpRef].forEach((r) => {
      if (r.current) observer.observe(r.current);
    });

    return () => observer.disconnect();
  }, []);

  const activeLabel = sectionConfig[activeSection]?.label ?? 'Local';

  const openRsvpModal = () => setIsRsvpModalOpen(true);
  const closeRsvpModal = () => setIsRsvpModalOpen(false);

  return (
    <div className="app home-page">
      <div className="home-container">
        <div className="layout-two-columns">
          {/* ESQUERDA – convite fixo */}
          <aside className="left-panel">
            <div className="left-card">
              <img
                src={conviteImage}
                alt="Convite 26 da Nath"
                className="left-image"
              />
            </div>
          </aside>

          {/* DIREITA – hero + seções + menu lateral */}
          <div className="right-panel">
            {/* HERO – primeira "página" */}
            <header className="hero hero--main">
              <h2 className="hero-event-title">Aniversário da Nath</h2>

              <p className="hero-subtitle">
                Confirme sua presença e ajude a anfitriã a organizar a festa
              </p>

              <p className="hero-deadline">
                Prazo para confirmações até 20/12/2025
              </p>

              <div className="hero-rsvp-row">
                <button
                  type="button"
                  className="hero-rsvp-btn hero-rsvp-btn--yes"
                  onClick={openRsvpModal}
                >
                  Eu vou ✨
                </button>

                <button
                  type="button"
                  className="hero-rsvp-btn hero-rsvp-btn--no"
                  onClick={openRsvpModal}
                >
                  Não vou...
                </button>
              </div>

              <div className="hero-date-block">
                <div className="hero-date-line">
                  <Calendar size={16} />
                  <span>20/12/2025 · a partir das 13:00</span>
                </div>
              </div>
            </header>

            {/* MAIN – seções + menu lateral */}
            <div className="right-main">
              {/* Seções */}
              <main className="sections-wrapper">
                {/* LOCAL */}
                <section id="local" ref={localRef} className="section-card">
                  <h3 className="section-title">Local</h3>
                  <p className="section-subtitle">
                    Restaurante Flutuante Rio · Urca
                  </p>

                  <a
                    href="https://www.google.com/maps/search/Restaurante+Flutuante+Rio+Urca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maps-button maps-button--inline"
                  >
                    <MapPin size={18} />
                    <span>Ver no mapa</span>
                  </a>
                </section>

                {/* MENSAGEM */}
                <section id="mensagem" ref={mensagemRef} className="section-card">
                  <h3 className="section-title">Mensagem</h3>

                  <p className="section-text">
                    No dia 20/12, farei meus 26 anos. E nada faria mais sentido
                    do que comemorar com quem ilumina meus dias.
                  </p>
                  <p className="section-text">
                    Te espero às 13h, no Restaurante Flutuante Rio, pra gente
                    brindar, abraçar apertado e guardar mais um capítulo bonito
                    na memória.
                  </p>
                  <p className="section-text">
                    Sua presença é o meu melhor presente. ✨💕
                  </p>
                </section>

                {/* (Opcional) RECADOS – já mapeado no sectionConfig se quiser voltar depois */}
                {/*
                <section id="recados" ref={recadosRef} className="section-card">
                  ...
                </section>
                */}

                {/* CONFIRMAÇÃO */}
                <section
                  id="confirmacao"
                  ref={rsvpRef}
                  className="section-card"
                >
                  <RSVPForm
                    formData={formData}
                    setFormData={setFormData}
                    submitted={submitted}
                    onSubmit={onSubmit}
                  />
                </section>
              </main>

              {/* MENU lateral */}
              <nav className="side-menu">
                <div className="side-menu-label">{activeLabel}</div>

                <div className="side-menu-icons">
                  {/* Ícones das seções */}
                  {sections.map((s) => {
                    const Icon = s.icon;
                    const isActive = activeSection === s.id;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={
                          'side-menu-button' +
                          (isActive ? ' side-menu-button--active' : '')
                        }
                        onClick={() => scrollToSection(s)}
                      >
                        <Icon className="side-menu-icon" size={20} />
                      </button>
                    );
                  })}

                  {/* ADMIN NO MENU LATERAL */}
                  <button
                    type="button"
                    className="side-menu-button"
                    onClick={goToAdmin}
                    title="Administração"
                  >
                    <Shield className="side-menu-icon" size={20} />
                  </button>
                </div>
              </nav>
            </div>

            {/* MODAL – RSVP disparado pelo HERO */}
            {isRsvpModalOpen && (
              <div className="modal-backdrop" onClick={closeRsvpModal}>
                <div
                  className="modal-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={closeRsvpModal}
                  >
                    ×
                  </button>

                  <h3 className="modal-title">Confirme sua presença ✨</h3>

                  <RSVPForm
                    formData={formData}
                    setFormData={setFormData}
                    submitted={submitted}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
