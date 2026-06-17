import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import Team from "./components/Team/Team";
import Journey from "./components/Journey/Journey";
import SkillsTools from "./components/Skills/Skillstools";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Hero />
    <Stats />
    <Team />
    <Journey />
    <SkillsTools />
    <Footer />
    </>
  )
}

export default App
