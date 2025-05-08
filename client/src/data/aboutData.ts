import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import React from "react";

export const aboutData = {
  intro: "I'm a passionate Software Developer and Machine Learning enthusiast with a strong foundation in computer science fundamentals. I enjoy building creative solutions and exploring new technologies.",
  passion: "I believe in hands-on learning and practical application of concepts. I'm constantly challenging myself with new projects and problem-solving tasks.",
  experience: "1+ year",
  projects: "5+",
  education: "B.Tech CSE",
  location: "Bangalore, India",
  details: [
    {
      question: "Who am I?",
      answer: "I'm a Computer Science student at KIIT University with a focus on software development and machine learning. I love creating applications that solve real-world problems."
    },
    {
      question: "What do I do?",
      answer: "I develop web applications, work on machine learning projects, and continuously expand my knowledge in software engineering and computer science."
    },
    {
      question: "My approach to learning",
      answer: "I believe in hands-on learning and practical application of concepts. I'm constantly challenging myself with new projects and problem-solving tasks."
    },
    {
      question: "Where am I headed?",
      answer: "I aim to become a versatile full-stack developer with expertise in AI and machine learning, creating innovative solutions that make a positive impact."
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
