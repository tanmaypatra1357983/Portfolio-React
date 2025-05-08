import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import React from "react";

export const aboutData = {
  intro:
  "Passionate Software Developer and Machine Learning enthusiast with a solid CS foundation, creating innovative solutions and exploring emerging technologies.",
  passion:
    "I believe in hands-on learning and practical application of concepts. I'm constantly challenging myself with new projects and problem-solving tasks.",
  experience: "1+ year",
  projects: "5+",
  education: "B.Tech CSE",
  location: "Bhubaneswar, Odisha, India",
};

// Social link types without JSX
export type SocialLinkType = {
  name: string;
  url: string;
  iconType: string;
};

// Social links data
export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/TanmayaPatra369",
    iconType: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tanmay-patra-86b250251/",
    iconType: "linkedin",
  },
  {
    name: "Mail",
    url: "tanmaypatra450@gmail.com",
    iconType: "Mail",
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    iconType: "instagram",
  },
];
