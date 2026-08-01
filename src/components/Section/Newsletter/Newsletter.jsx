import { useState } from "react";

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
    <section className="bg-text px-8 py-16 text-center text-white">
      <h2 className="text-3xl font-semibold">Stay up to date</h2>
      <p className="mx-auto mt-2 max-w-[500px] text-white/70">
        Sign up to get the latest news on product launches, offers, and
        events from iStore.
      </p>
      {subscribed ? (
        <p className="mt-6 font-semibold text-link">
          Thanks for subscribing!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-[420px] gap-2 max-[500px]:flex-col"
        >
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="h-11 flex-1 rounded-full border-none bg-white/10 px-5 text-white outline-none placeholder:text-white/50 focus:bg-white/20"
          />
          <button className="h-11 cursor-pointer rounded-full border-none bg-link px-6 font-medium text-white hover:bg-link-hover">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
};
