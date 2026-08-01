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
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#f5a623">
    <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />
  </svg>
);

export const Testimonials = () => {
  return (
    <section className="mx-auto max-w-[1000px] px-8 py-16">
      <h2 className="mb-10 text-center text-4xl font-semibold text-text">
        Loved by our customers
      </h2>
      <div className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="rounded-2xl bg-surface p-6 text-left"
          >
            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} />
              ))}
            </div>
            <p className="text-[15px] leading-relaxed text-text">
              “{testimonial.quote}”
            </p>
            <p className="mt-4 text-sm font-semibold text-text-secondary">
              {testimonial.name} · {testimonial.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
