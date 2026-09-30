import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  categoryValues,
  languages,
  translations,
  type Lang,
} from "@/lib/seminar-i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Healthy Lifestyle & Longevity Seminar Registration | Esentepe, Cyprus 2026",
      },
      {
        name: "description",
        content:
          "Free registration for the international healthy lifestyle and longevity seminar in Esentepe, North Cyprus, 26 October 2026, 18:00–20:00. Available in EN, TR, EL, CS and RU.",
      },
      {
        property: "og:title",
        content: "Healthy Lifestyle & Longevity Seminar – Esentepe, North Cyprus",
      },
      {
        property: "og:description",
        content:
          "26 October 2026, 18:00–20:00, Esentepe (Girne). Free entry for businesses and professionals focused on healthy lifestyle and longevity. Register online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputClass =
  "field-input focus:field-input-focus placeholder:text-muted-foreground/70";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyS5lEIeerKwtGCyCXx0uxEU1ZK_dbJkvZzuCvD0y-hwenjXIoyQ1lvSgU2rL_7UxJo/exec";

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = translations[lang];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    body.set("language", lang);
    body.set("name", String(form.get("fullName") ?? ""));
    body.set("company", String(form.get("companyName") ?? ""));
    body.set("address", String(form.get("companyAddress") ?? ""));
    body.set("email", String(form.get("email") ?? ""));
    body.set("phone", String(form.get("phone") ?? ""));
    body.set("participants", String(form.get("participantCount") ?? ""));
    body.set("category", String(form.get("category") ?? ""));
    body.set("notes", String(form.get("notes") ?? ""));

    setSending(true);
    setFailed(false);
    try {
      try {
        await fetch(ENDPOINT, { method: "POST", body });
      } catch {
        await fetch(ENDPOINT, { method: "POST", mode: "no-cors", body });
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }


  return (
    <main
      lang={t.htmlLang}
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat py-8 px-4 sm:py-14"
      style={{ backgroundImage: 'url("/pozadi.png")' }}
    >
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)]">
        <header className="relative bg-hero px-6 py-12 text-center text-primary-foreground sm:px-10">
          <div
            role="group"
            aria-label="Language"
            className="mx-auto mb-8 flex w-fit gap-1 rounded-full bg-[oklch(1_0_0/0.15)] p-1 backdrop-blur-sm"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  lang === l.code
                    ? "bg-card text-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                <span className="mr-1">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.25em] opacity-80">
            {t.kicker}
          </p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-3 text-sm opacity-90 sm:text-base">{t.when}</p>
          <span className="mt-5 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            {t.freeBadge}
          </span>
        </header>

        <section className="grid gap-3 border-b border-border bg-sand px-6 py-6 sm:grid-cols-2 sm:px-10">
          {t.details.map((d) => (
            <div key={d.label} className="text-sm">
              <div className="font-semibold text-foreground">{d.label}</div>
              <div className="text-muted-foreground">{d.value}</div>
            </div>
          ))}
        </section>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {submitted ? (
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-8 text-center">
              <h2 className="text-2xl text-foreground">{t.thanksTitle}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t.thanksBody}</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t.again}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label={t.fullName} required>
                <input
                  name="fullName"
                  required
                  autoComplete="name"
                  placeholder={t.fullNamePlaceholder}
                  className={inputClass}
                />
              </Field>

              <Field label={t.company} required>
                <input
                  name="companyName"
                  required
                  autoComplete="organization"
                  placeholder={t.companyPlaceholder}
                  className={inputClass}
                />
              </Field>

              <Field label={t.address} required>
                <textarea
                  name="companyAddress"
                  required
                  rows={3}
                  autoComplete="street-address"
                  placeholder={t.addressPlaceholder}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <Field label={t.email} required hint={t.emailHint}>
                <input
                  type="email"
                  name="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="info@company.com"
                  className={inputClass}
                />
              </Field>

              <Field label={t.phone} required>
                <input
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+90 392 900 10 00"
                  className={inputClass}
                />
              </Field>

              <Field label={t.count} required hint={t.countHint}>
                <input
                  type="number"
                  name="participantCount"
                  min={1}
                  max={10}
                  defaultValue={1}
                  required
                  inputMode="numeric"
                  className={inputClass}
                />
              </Field>

              <Field label={t.category}>
                <select name="category" className={inputClass} defaultValue="">
                  <option value="">{t.categoryPlaceholder}</option>
                  {t.categories.map((label, i) => (
                    <option key={categoryValues[i]} value={categoryValues[i]}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>

              <label className="flex items-start gap-3 rounded-xl bg-muted p-4 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="confirmation"
                  required
                  className="mt-0.5 size-5 accent-[var(--color-primary)]"
                />
                <span>
                  {t.confirm}
                  <span className="ml-1 text-destructive">*</span>
                </span>
              </label>

              <Field label={t.notes}>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder={t.notesPlaceholder}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              {failed && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                  Connection error — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {t.submit}
              </button>
            </form>
          )}

          <section className="mt-8 rounded-2xl border border-border bg-sand p-6 text-center">
            <h2 className="text-xl font-semibold text-foreground">{t.ticketTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.ticketNote}</p>
            <a
              href="/vstupenka-seminar-esentepe.png"
              download
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
            >
              {t.ticketDownload}
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
