import { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Most orders ship within 1 business day and arrive within 3-5 business days. Delivery estimates are shown on each product page before you add it to your bag.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return any item within 14 days of delivery for a full refund, as long as it's in its original condition and packaging.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Checkout accepts major credit and debit cards. You'll enter your card details on the payment step of checkout.",
  },
  {
    question: "What does AppleCare+ cover?",
    answer:
      "AppleCare+ extends your coverage to two years from the original purchase date and adds protection against accidental damage, with support available directly from the product page.",
  },
  {
    question: "Can I track my order?",
    answer:
      "After checkout, you'll get an order confirmation with a unique order ID. Keep it handy if you need to contact us about your purchase.",
  },
  {
    question: "How does Trade In work?",
    answer:
      "Trade in your eligible current device for credit toward a new one. The better condition it's in, the more credit you'll get.",
  },
];

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-divider py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between border-none bg-none text-left text-lg font-semibold text-text"
      >
        {question}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={
            "shrink-0 text-text-secondary transition-transform duration-200 " +
            (open ? "rotate-45" : "")
          }
        >
          <path d="M8 2v12M2 8h12" />
        </svg>
      </button>
      {open ? (
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          {answer}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export const Support = () => {
  return (
    <div className="mx-auto max-w-[800px] px-8 pb-24 pt-24">
      <h1 className="text-center text-5xl font-semibold text-text">
        How can we help?
      </h1>
      <p className="mx-auto mt-4 max-w-[500px] text-center text-lg text-text-secondary">
        Find answers to common questions, or get in touch with our team.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-5 min-[600px]:grid-cols-3">
        <a
          href="#"
          className="rounded-2xl bg-surface p-6 text-center no-underline"
        >
          <h3 className="font-semibold text-text">Chat with us</h3>
          <p className="mt-1 text-sm text-text-secondary">Available 24/7</p>
        </a>
        <a
          href="tel:+10000000000"
          className="rounded-2xl bg-surface p-6 text-center no-underline"
        >
          <h3 className="font-semibold text-text">Call us</h3>
          <p className="mt-1 text-sm text-text-secondary">
            1 (800) 000-0000
          </p>
        </a>
        <a
          href="mailto:support@istore.example"
          className="rounded-2xl bg-surface p-6 text-center no-underline"
        >
          <h3 className="font-semibold text-text">Email us</h3>
          <p className="mt-1 text-sm text-text-secondary">
            support@istore.example
          </p>
        </a>
      </div>

      <h2 className="mb-2 mt-16 text-2xl font-semibold text-text">
        Frequently asked questions
      </h2>
      <div>
        {faqs.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
    </div>
  );
};
