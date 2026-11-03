/**
 * =================================================================
 * PublierAvisTab — src/components/tabs/PublierAvisTab.jsx
 * -----------------------------------------------------------------
 * NOTE (structure fix): per Figma inspector (Frame 358) — the WHOLE
 * form is ONE white rounded card, not two separate blocks:
 *   radius: 10px
 *   padding: top 16px / right 20px / bottom 16px / left 20px
 *   gap: 20px between every item
 * This also fixes the gradient bleed-through — there's no gap
 * between white blocks anymore for the background to show through.
 * =================================================================
 */
import { useState } from "react";
import { isValidEmail } from "../../utils/helpers.js";
import { useReviews } from "../../hooks/useReviews.js";


function StarPicker({ rating, setRating }) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || rating;

  return (
    <div className="cp-flex cp-items-center cp-gap-[4px]" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setRating(n)}
          onMouseEnter={() => setHoverRating(n)}
          aria-label={`${n} étoile(s)`}
          className={`
            cp-text-[26px] cp-leading-none cp-bg-transparent cp-border-0 cp-p-0 cp-cursor-pointer
            cp-transition-colors cp-duration-100
            ${n <= displayRating ? "cp-text-cp-accent-star" : "cp-text-cp-border"}
          `}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function FormField({ label, hint, optional, error, children }) {
  return (
    <div className="cp-flex cp-flex-col cp-gap-[6px]">
      <label className="cp-text-[12.5px] cp-font-semibold cp-text-cp-text-dark">
        {label}
        {optional && (
          <span className="cp-font-normal cp-text-cp-text-light"> (en option)</span>
        )}
      </label>
      {hint && <p className="cp-text-[11px] cp-text-cp-text-light cp-m-0">{hint}</p>}
      {children}
      {error && <span className="cp-text-[11px] cp-text-red-500">{error}</span>}
    </div>
  );
}

const inputClasses = `
  cp-w-full cp-px-[10px] cp-py-[8px]
  cp-rounded-[8px] cp-border-0
  cp-text-[13px] cp-text-cp-text-dark cp-bg-[rgba(115,114,108,0.05)]
  cp-outline-none focus:cp-border-cp-primary
  cp-transition-colors cp-duration-150
  cp-box-border
`;

export default function PublierAvisTab({ clientId }) {
  const { submitReview, submitStatus } = useReviews(clientId);

  const [rating, setRating] = useState(0);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [avis, setAvis] = useState("");
  const [titre, setTitre] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Merci de choisir une note.";
    if (!nom.trim()) newErrors.nom = "Le nom est requis.";
    if (!prenom.trim()) newErrors.prenom = "Le prénom est requis.";
    if (!isValidEmail(email)) newErrors.email = "Merci de saisir un email valide.";
    if (!avis.trim()) newErrors.avis = "Merci de partager votre expérience.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitReview({
        rating,
        nom,
        prenom,
        email,
        avis,
        titre,
        dateDebut,
        dateFin,
        suggestions,
      });
    } catch (err) {
      console.error("[Custplace Widget] Erreur d'envoi:", err);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="cp-flex cp-flex-col cp-items-center cp-justify-center cp-h-full cp-gap-[10px] cp-py-[40px] cp-text-center">
        <span className="cp-text-cp-success cp-text-[40px] cp-leading-none">✓</span>
        <h3 className="cp-text-[16px] cp-font-bold cp-text-cp-text-dark cp-m-0">Merci pour votre avis !</h3>
        <p className="cp-text-[13px] cp-text-cp-text-light cp-m-0">
          Votre avis a bien été envoyé et sera publié après vérification.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 👉 ONE card, matching Figma's Frame 358 exactly:
          radius 10px, padding top16/right20/bottom16/left20, gap 20px */}
      <div
        className="
          cp-bg-white cp-rounded-[10px]
          cp-shadow-[0_2px_10px_rgba(16,24,40,0.08)]
          cp-pt-[16px] cp-pr-[20px] cp-pb-[16px] cp-pl-[20px]
          cp-flex cp-flex-col cp-gap-[20px]
          cp-box-border
        "
      >
        <FormField
          label="Donnez une note générale"
          hint="Survolez les étoiles puis cliquez pour valider la note."
          error={errors.rating}
        >
          <StarPicker rating={rating} setRating={setRating} />
        </FormField>

        <FormField label="Donnez votre nom" error={errors.nom}>
          <input className={inputClasses} value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
        </FormField>

        <FormField label="Donnez votre prénom" error={errors.prenom}>
          <input className={inputClasses} value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" />
        </FormField>

        <FormField label="Donnez votre adresse email" error={errors.email}>
          <input
            type="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exe@gmail.com"
          />
        </FormField>

        <FormField label="Donnez votre avis" error={errors.avis}>
          <textarea
            className={`${inputClasses} cp-min-h-[90px] cp-resize-none`}
            value={avis}
            onChange={(e) => setAvis(e.target.value)}
            placeholder="Partagez votre expérience sur Optical Center"
          />
        </FormField>

        <FormField label="Titre de votre avis">
          <input
            className={inputClasses}
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ajoutez un titre à votre avis"
          />
        </FormField>

        <FormField
          label="Date de votre expérience"
          optional
          hint="avec une durée (vacances, travaux)"
        >
          <div className="cp-grid cp-grid-cols-2 cp-gap-[10px]">
            <input
              type="date"
              className={inputClasses}
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
            <input
              type="date"
              className={inputClasses}
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
        </FormField>

        <FormField label="Avez vous des suggestions ?" optional>
          <input
            className={inputClasses}
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            placeholder="Proposez une nouvelle idée, une amelioration, etc"
          />
        </FormField>

        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="
            cp-w-full cp-flex cp-items-center cp-justify-center cp-gap-[8px]
            cp-py-[12px]
            cp-rounded-[10px] cp-bg-cp-primary
            hover:cp-bg-[#16A34A]
            cp-text-white cp-text-[14px] cp-font-bold
            cp-border-0 cp-cursor-pointer
            cp-transition-colors cp-duration-150
            disabled:cp-opacity-60 disabled:cp-cursor-not-allowed disabled:hover:cp-bg-cp-primary
          "
        >
          {submitStatus === "submitting" ? "Envoi en cours..." : "Publiez votre avis"}
        </button>

        <p className="cp-text-[10.5px] cp-leading-snug cp-text-cp-text-light cp-m-0">
          En cliquant sur Publiez votre message, je reconnais avoir lu et
          j'accepte{" "}
          <a href="#" className="cp-text-cp-primary cp-font-semibold">les Conditions d'utilisation</a>,{" "}
          <a href="#" className="cp-text-cp-primary cp-font-semibold">la Politique de Confidentialité</a>{" "}
          de Custplace et de ses partenaires.
        </p>

        <p className="cp-text-center cp-text-[10px] cp-text-cp-text-light cp-m-0">
          Powered by{" "}
          <span className="cp-font-bold cp-text-cp-text-muted">Custplace</span>
        </p>
      </div>
    </form>
  );
}