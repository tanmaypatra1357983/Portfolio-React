import { useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Technologies from "./Technologies";
import Blog from "./Blog";
import Contact from "./Contact";

const Home = () => {
  // Set document title
  useEffect(() => {
    document.title = "Developer Portfolio | Full-Stack Developer";
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Technologies />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
};

export default Home;