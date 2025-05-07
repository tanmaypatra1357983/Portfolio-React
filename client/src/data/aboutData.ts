import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import React from "react";

export const aboutData = {
  intro: "I'm a full-stack developer with 5+ years of experience crafting elegant web solutions. My journey began with a curiosity about how things work, which led me to explore computer science and eventually specialize in modern web technologies.",
  passion: "I'm passionate about creating intuitive user experiences that solve real problems. My expertise lies in React, TypeScript, and Node.js ecosystems, with a growing interest in machine learning applications.",
  experience: "5+ years",
  projects: "30",
  education: "M.S. Computer Science",
  location: "San Francisco, CA",
  details: [
    {
      question: "What I do?",
      answer: "I build modern web applications with React, TypeScript, and Node.js. I focus on creating clean, maintainable code and intuitive user experiences."
    },
    {
      question: "What drives me?",
      answer: "I'm driven by solving complex problems through code. The constant evolution of technology keeps me engaged and excited to learn new things every day."
    },
    {
      question: "My approach to work",
      answer: "I believe in a collaborative approach, where communication and teamwork lead to the best results. I'm detail-oriented but always keep the bigger picture in mind."
    },
    {
      question: "Future goals",
      answer: "I aim to deepen my expertise in AI/ML applications and contribute to open-source projects that make a positive impact on how people use technology."
    }
  ]
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
    url: "https://github.com",
    iconType: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    iconType: "linkedin"
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    iconType: "twitter"
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    iconType: "instagram"
  }
];
