const badges = [
  {
    title: "Free delivery",
    description: "On orders over $50",
    icon: (
      <path d="M3 4h11v9H3zM14 8h4l3 3v2h-7zM6.5 19a2 2 0 100-4 2 2 0 000 4zM17.5 19a2 2 0 100-4 2 2 0 000 4z" />
    ),
  },
  {
    title: "Free returns",
    description: "Within 14 days of delivery",
    icon: (
      <path d="M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0014.4 3M19.5 9A8 8 0 005.1 6" />
    ),
  },
  {
    title: "Trade In",
    description: "Get credit toward your next device",
    icon: (
      <path d="M7 8h13l-3-3M17 16H4l3 3M7 8v13M17 16V3" />
    ),
  },
  {
    title: "Expert support",
    description: "Chat with a Specialist, 24/7",
    icon: (
      <path d="M12 2a8 8 0 00-8 8v5a2 2 0 002 2h1v-6H5v-1a7 7 0 0114 0v1h-2v6h1a2 2 0 002-2v-5a8 8 0 00-8-8z" />
    ),
  },
];

export const TrustBadges = () => {
  return (
    <section className="border-y border-divider bg-surface-secondary">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 py-16 min-[600px]:grid-cols-2 min-[900px]:grid-cols-4 md:px-8">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-card">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-link"
              >
                {badge.icon}
              </svg>
            </div>
            <h3 className="text-base font-semibold tracking-[-0.01em] text-text">
              {badge.title}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
