import darkLogo from "../../public/dark-logo.png";
import lightLogo from "../../public/light-logo.png";

export const site = {
  name: "Meezaan Davids",
  domain: "meezaan.dev",
  logo: {
    lightMode: darkLogo.src,
    darkMode: lightLogo.src,
  },
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
    {
      href: "https://www.linkedin.com/in/meezaan-davids/",
      label: "LinkedIn",
    },
  ],
  products: [
    {
      href: "https://cashflow.meezaan.dev/",
      label: "Cash Flow",
      description: "How I stay on top of my finances.",
    },
    {
      href: "https://cinema.meezaan.dev/",
      label: "Cinema",
      description: "My way of finding new movies and shows.",
    },
  ],
  references: [
    { href: "/Meezaan_Davids_CV.pdf", label: "CV" },
    { href: "/transcript", label: "Academic transcript" },
  ],
} as const;
