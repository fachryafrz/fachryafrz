import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const socials = [
    {
      name: "GitHub",
      icon: <Github />,
      url: "https://github.com/fachryafrz",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      url: "https://linkedin.com/in/fachryafrz",
    },
    {
      name: "GMail",
      icon: <Mail />,
      url: "mailto:fachrydwiafriza@gmail.com",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      url: "https://twitter.com/fachryafrz",
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      url: "https://instagram.com/fachryafrz",
    },
  ];

  return (
    <div className={`py-8 flex justify-center items-center`}>
      <ul className={`flex gap-8 text-accent flex-wrap px-4 justify-center`}>
        {socials.map((social, index) => (
          <li key={index}>
            <Link
              href={social.url}
              target={`_blank`}
              className={`flex hover:-translate-y-1 transition-all focus:outline-0 focus:-translate-y-1`}
            >
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
