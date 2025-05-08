import React from "react";
import { CodeIcon, BrainIcon, PeopleIcon } from "@/assets/icons";

export const skillsData = [
  {
    title: "PROGRAMMING",
    icon: React.createElement(CodeIcon),
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
      { name: "C", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 88 },
    ],
  },
  {
    title: "ML & DSA",
    icon: React.createElement(BrainIcon),
    skills: [
      { name: "TensorFlow", level: 82 },
      { name: "Pandas", level: 88 },
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 83 },
      { name: "Machine Learning", level: 80 },
    ],
  },
  {
    title: "TOOLS & FRAMEWORKS",
    icon: React.createElement(PeopleIcon),
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "VS Code", level: 90 },
      { name: "React.js", level: 85 },
      { name: "MongoDB", level: 78 },
      { name: "Express.js", level: 80 },
    ],
  },
  {
    title: "CONCEPTS",
    icon: React.createElement(CodeIcon),
    skills: [
      { name: "OOP", level: 88 },
      { name: "Computer Networks", level: 75 },
      { name: "DBMS", level: 82 },
      { name: "Operating Systems", level: 78 },
      { name: "Software Engineering", level: 85 },
    ],
  },
];
