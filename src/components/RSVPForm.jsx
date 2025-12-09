import React, { useState } from 'react';
import { Check } from 'lucide-react';

const RSVPForm = ({ formData, setFormData, submitted, onSubmit }) => {
  const [vai, setVai] = useState(true);

  const [showNaoVaiModal, setShowNaoVaiModal] = useState(false);
  const [showVaiModal, setShowVaiModal] = useState(false);

  const handleSubmitClick = () => {
    if (!vai) {
      setShowNaoVaiModal(true); 
      return;
    }

    onSubmit();          
    setShowVaiModal(true);
  };

  const closeNaoVaiModal = () => setShowNaoVaiModal(false);
  const closeVaiModal = () => setShowVaiModal(false);

  return (
    <div className="form-card">
      <h2 className="form-title">Confirme sua presença</h2>

      <div className="rsvp-choice">
        <button
          type="button"
          className={`rsvp-choice-button ${vai ? 'rsvp-choice-button--active' : ''}`}
          onClick={() => setVai(true)}
        >
          Eu vou ✨
        </button>

        <button
          type="button"
          className={`rsvp-choice-button ${!vai ? 'rsvp-choice-button--active' : ''}`}
          onClick={() => setVai(false)}
        >
          Não vou...
        </button>
      </div>

      {submitted ? (
        <div className="success-box">
          <Check size={48} className="success-icon" />
          <p className="success-title">Presença confirmada!</p>
          <p className="success-text">Nos vemos na festa! 🎉</p>
        </div>
      ) : (
        <div className="form-fields">
          <div className="field">
            <label className="label">Nome completo *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="input"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="field">
            <label className="label">Telefone (opcional)</label>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              className="input"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="field">
            <label className="label">Número de acompanhantes (opcional)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData.acompanhantes}
              onChange={(e) =>
                setFormData({ ...formData, acompanhantes: e.target.value })
              }
              className="input"
              placeholder="0"
            />
          </div>

          <button
            type="button"          
            onClick={handleSubmitClick}
            className="btn btn-gradient"
          >
            ✨ Confirmar Presença
          </button>
        </div>
      )}

      {showNaoVaiModal && (
        <div
          className="modal-backdrop"
          onClick={closeNaoVaiModal}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-button"
              onClick={closeNaoVaiModal}
            >
              ×
            </button>

            <h3 className="modal-title">Que pena que você não vai 😢</h3>

            <p style={{ textAlign: 'center', marginBottom: 20 }}>
              Mesmo assim agradecemos a confirmação 💕
            </p>

            <button
              type="button"
              className="btn btn-gradient"
              onClick={closeNaoVaiModal}
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      {showVaiModal && (
        <div
          className="modal-backdrop"
          onClick={closeVaiModal}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-button"
              onClick={closeVaiModal}
            >
              ×
            </button>

            <h3 className="modal-title">Presença confirmada! 🎉</h3>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Check size={48} className="success-icon" />
              <p style={{ marginTop: 12, fontSize: '1rem', color: '#166534' }}>
                Obrigada por confirmar 💕
              </p>
              <p style={{ fontSize: '0.9rem', color: '#111827' }}>
                Vai ser um dia muito especial com você lá ✨
              </p>
            </div>

            <button
              type="button"
              className="btn btn-gradient"
              onClick={closeVaiModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPForm;
