import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Appointments — Auréa" },
      {
        name: "description",
        content:
          "Reach Auréa client care, book a private appointment in Florence, or ask about repairs and sizing.",
      },
      { property: "og:title", content: "Contact & Appointments — Auréa" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Client care, private appointments and repairs." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="shell grid gap-16 py-20 md:grid-cols-[42fr_58fr] md:py-28">
      <Reveal>
        <p className="label-xs text-burgundy">Contact</p>
        <h1 className="display-xl mt-6">We answer within one day.</h1>
        <dl className="mt-12 space-y-8 text-sm">
          <div>
            <dt className="label-xs text-muted-foreground">Client care</dt>
            <dd className="mt-2">care@aurea.com · +39 055 000 000</dd>
          </div>
          <div>
            <dt className="label-xs text-muted-foreground">Atelier & showroom</dt>
            <dd className="mt-2 leading-relaxed">
              Via delle Conce 14
              <br />
              50122 Florence, Italy
              <br />
              Tuesday to Saturday, 10—18
            </dd>
          </div>
          <div>
            <dt className="label-xs text-muted-foreground">Repairs</dt>
            <dd className="mt-2">restore@aurea.com</dd>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={120}>
        {sent ? (
          <div className="border border-border p-12">
            <h2 className="font-display text-3xl">Thank you.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Your message has reached client care. We reply to every enquiry within one working day.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-8"
          >
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Subject" name="subject" />
            <label className="block">
              <span className="label-xs text-muted-foreground">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-sm outline-none focus:border-burgundy"
              />
            </label>
            <button
              type="submit"
              className="label-xs justify-self-start bg-burgundy px-10 py-4 text-primary-foreground transition-colors duration-500 hover:bg-burgundy-deep"
            >
              Send message
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="label-xs text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required
        className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm outline-none focus:border-burgundy"
      />
    </label>
  );
}
