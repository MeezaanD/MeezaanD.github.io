export const site = {
  name: "Meezaan Davids",
  domain: "meezaan.dev",
  email: "meezaandavids365@gmail.com",
  description:
    "The digital home of Meezaan Davids: software, systems thinking, learning, and writing.",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/now", label: "Now" },
    { href: "/profile", label: "Profile" },
    { href: "mailto:meezaandavids365@gmail.com", label: "Contact" },
  ],
  social: [
    { href: "https://github.com/MeezaanD", label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/meezaan-davids/",
      label: "LinkedIn",
    },
  ],
  products: [
    {
      href: "https://cashflow.meezaan.dev/",
      label: "Cash Flow",
      description: "A personal finance tracker for everyday clarity.",
    },
    {
      href: "https://cinema.meezaan.dev/",
      label: "Cinema",
      description: "A calmer way to decide what to watch next.",
    },
  ],
  references: [
    { href: "/Meezaan_Davids_CV.pdf", label: "CV" },
    { href: "/transcript", label: "Academic transcript" },
  ],
} as const;

