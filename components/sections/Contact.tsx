"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { links, profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialList } from "@/components/ui/SocialLinks";
import { isPlaceholder, mailtoHref } from "@/lib/links";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const EMPTY: Record<Field, string> = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 10;

function validate(values: Record<Field, string>): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address so I can reply.";
  }
  if (values.message.trim().length < MESSAGE_MIN) {
    errors.message = `Please write at least ${MESSAGE_MIN} characters.`;
  }

  return errors;
}

const FIELD_CLASS =
  "w-full rounded-[10px] border bg-ink-950/40 px-3.5 py-2.5 text-[14.5px] text-paper placeholder:text-haze-dim transition-colors duration-300 focus:border-saffron/50";

export function Contact() {
  const [values, setValues] = useState<Record<Field, string>>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const submitting = status === "submitting";

  const handleChange =
    (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((previous) => ({ ...previous, [field]: undefined }));
      }
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      const data: unknown = await response.json().catch(() => null);
      const payload = (data ?? {}) as { ok?: boolean; code?: string; message?: string };

      if (payload.code === "NOT_CONFIGURED") {
        setStatus("unconfigured");
        return;
      }

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setServerError(payload.message ?? "The message could not be sent. Please try again.");
        return;
      }

      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
      setServerError("Network error — please check your connection and try again.");
    }
  }

  const emailHref = mailtoHref(links.email, `Portfolio enquiry from ${values.name || "a visitor"}`);

  return (
    <Section id="contact">
      <SectionHeading id="contact" title="Contact" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="min-w-0">
          <p className="font-display text-display-sm text-paper">
            Happy to talk about internships, projects or anything I&apos;ve built.
          </p>
          <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-haze">
            I&apos;m a student in {profile.campus}, still learning, and I read everything that
            comes in. Whichever route is easiest for you is fine.
          </p>

          <SocialList className="mt-9" />

          {isPlaceholder(links.email) ? (
            <p className="mt-5 text-[12.5px] leading-relaxed text-haze">
              Note to self: add your email, GitHub and LinkedIn in{" "}
              <code className="font-mono text-[11.5px] text-saffron/85">data/profile.ts</code> and
              these rows become real links.
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <div className="panel p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-start">
                <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-saffron" />
                <h3 className="mt-4 font-display text-[1.5rem] text-paper">Message sent</h3>
                <p role="status" className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-haze">
                  Thanks for getting in touch — I&apos;ll reply to the address you gave as soon as
                  I can.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-7"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[13px] text-paper-dim">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange("name")}
                      disabled={submitting}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      placeholder="Your name"
                      className={cn(
                        FIELD_CLASS,
                        "mt-2",
                        errors.name ? "border-red-400/60" : "border-white/[0.09]",
                      )}
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="mt-2 text-[12.5px] text-red-300">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[13px] text-paper-dim">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      disabled={submitting}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      placeholder="you@example.com"
                      className={cn(
                        FIELD_CLASS,
                        "mt-2",
                        errors.email ? "border-red-400/60" : "border-white/[0.09]",
                      )}
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="mt-2 text-[12.5px] text-red-300">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[13px] text-paper-dim">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={handleChange("message")}
                      disabled={submitting}
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : "contact-message-hint"
                      }
                      placeholder="What would you like to talk about?"
                      className={cn(
                        FIELD_CLASS,
                        "mt-2 resize-y",
                        errors.message ? "border-red-400/60" : "border-white/[0.09]",
                      )}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="mt-2 text-[12.5px] text-red-300">
                        {errors.message}
                      </p>
                    ) : (
                      <p id="contact-message-hint" className="mt-2 text-[12.5px] text-haze">
                        A sentence or two is plenty — {MESSAGE_MIN} characters minimum.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Button type="submit" variant="accent" disabled={submitting}>
                    {submitting ? (
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send aria-hidden="true" className="h-4 w-4" />
                    )}
                    {submitting ? "Sending…" : "Send message"}
                  </Button>

                  <p role="status" aria-live="polite" className="text-[12.5px] text-haze">
                    {submitting ? "Sending your message…" : null}
                  </p>
                </div>

                {status === "error" ? (
                  <p
                    role="alert"
                    className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-400/30 bg-red-500/[0.06] p-3.5 text-[13px] leading-relaxed text-red-200"
                  >
                    <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    {serverError}
                  </p>
                ) : null}

                {status === "unconfigured" ? (
                  <div
                    role="alert"
                    className="mt-5 rounded-lg border border-dashed border-saffron/40 bg-saffron/[0.06] p-4 text-[13px] leading-relaxed text-paper-dim"
                  >
                    <p>
                      This form isn&apos;t connected to an email service yet, so nothing was sent —
                      I&apos;d rather say so than pretend it arrived.
                    </p>
                    {emailHref ? (
                      <p className="mt-2.5">
                        <a href={emailHref} className="text-saffron underline underline-offset-4">
                          Email me directly instead
                        </a>
                        .
                      </p>
                    ) : (
                      <p className="mt-2.5 text-haze">
                        Owner: add a provider in{" "}
                        <code className="font-mono text-[11.5px] text-saffron/85">
                          app/api/contact/route.ts
                        </code>{" "}
                        (integration point is marked) and set the keys in{" "}
                        <code className="font-mono text-[11.5px] text-saffron/85">.env.local</code>.
                      </p>
                    )}
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
