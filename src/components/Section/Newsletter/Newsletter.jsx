import { useState } from "react";
import { Reveal } from "../../Reveal/Reveal";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-black px-6 py-24 text-center text-white md:px-8">
      <Reveal className="mx-auto max-w-[560px]">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/50">
          Newsletter
        </p>
        <h2 className="mt-2 text-4xl font-semibold tracking-[-0.02em]">
          Stay up to date
        </h2>
        <p className="mx-auto mt-3 max-w-[440px] text-white/60">
          Sign up to get the latest news on product launches, offers, and
          events from iStore.
        </p>
        {subscribed ? (
          <p className="mt-8 font-semibold text-link">
            Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-[420px] gap-2 max-[500px]:flex-col"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className="h-11 flex-1 rounded-full border border-white/15 bg-white/[0.08] px-5 text-white outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-white/30 focus:bg-white/[0.12]"
            />
            <button className="h-11 cursor-pointer rounded-full border-none bg-link px-6 font-medium text-white transition-colors duration-200 hover:bg-link-hover">
              Subscribe
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
};
