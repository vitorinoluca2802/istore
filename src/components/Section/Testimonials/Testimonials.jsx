const testimonials = [
  {
    quote:
      "The checkout was so smooth and my iPhone showed up faster than expected. Exactly the color I wanted, no surprises.",
    name: "Sofía M.",
    location: "Buenos Aires, AR",
  },
  {
    quote:
      "I was on the fence between the Air and the Pro. The specs on each product page made the decision easy.",
    name: "Diego R.",
    location: "Córdoba, AR",
  },
  {
    quote:
      "Being able to compare colors before buying my Watch made all the difference. Looks even better in person.",
    name: "Valentina P.",
    location: "Rosario, AR",
  },
];

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" className="fill-text" aria-hidden="true">
    <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />
  </svg>
);

import { Reveal } from "../../Reveal/Reveal";

export const Testimonials = () => {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20 md:px-8">
      <Reveal>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Testimonials
        </p>
        <h2 className="mb-12 mt-2 text-center text-4xl font-semibold tracking-[-0.02em] text-text">
          Loved by our customers
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 80}>
            <div className="flex h-full flex-col rounded-3xl border border-divider bg-surface-secondary p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <span className="text-4xl leading-none text-link/30">“</span>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text">
                {testimonial.quote}
              </p>
              <p className="mt-6 text-sm font-semibold text-text-secondary">
                {testimonial.name} · {testimonial.location}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
