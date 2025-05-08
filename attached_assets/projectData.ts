import React from "react";
import { RainIcon, TodoIcon, ShoppingCartIcon } from "@/assets/icons";

export const projectsData = [
  {
    title: "Finance Prediction Model",
    description:
      "ML-based financial forecasting model that analyzes market trends and predicts stock price movements using historical data.",
    icon: React.createElement(RainIcon),
    xp: 25,
    tags: ["Python", "TensorFlow", "Pandas", "Finance", "ML"],
    technologies: ["Python", "TensorFlow", "Pandas"],
    demoUrl: "https://example.com/demo",
    codeUrl: "https://github.com/financeML",
  },
  {
    title: "MERN Todo App",
    description:
      "Full-stack task manager with CRUD operations and persistent storage using MongoDB, Express, React, and Node.js.",
    icon: React.createElement(TodoIcon),
    xp: 40,
    tags: ["React", "Node.js", "MongoDB", "Express"],
    technologies: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://example.com/todo-demo",
    codeUrl: "https://github.com/ToDo",
  },
  {
    title: "Weather App",
    description:
      "Full-stack web application to fetch and display real-time weather data using the OpenWeatherMap API.",
    icon: React.createElement(ShoppingCartIcon),
    xp: 35,
    tags: ["React", "Express", "API Integration", "JavaScript"],
    technologies: ["React", "Express", "JavaScript"],
    demoUrl: "https://example.com/weather-demo",
    codeUrl: "https://github.com/Weather",
  },
  {
    title: "DSA Visualizer",
    description:
      "Interactive web application that visualizes data structures and algorithms to help understand complex CS concepts.",
    icon: React.createElement(ShoppingCartIcon),
    xp: 45,
    tags: ["JavaScript", "Data Structures", "Algorithms", "HTML/CSS"],
    technologies: ["JavaScript", "Data Structures", "HTML/CSS"],
    demoUrl: "https://example.com/dsa-demo",
    codeUrl: "https://github.com/dsa-visualizer",
  },
  {
    title: "LLM-Powered Assistant (In Progress)",
    description:
      "Building an intelligent assistant leveraging large language models to provide contextual responses and assist with complex tasks.",
    icon: React.createElement(TodoIcon),
    xp: 30,
    tags: ["Python", "LangChain", "Natural Language Processing", "AI"],
    technologies: ["Python", "LLM", "API"],
    demoUrl: "",
    codeUrl: "https://github.com/llm-assistant",
  },
];
