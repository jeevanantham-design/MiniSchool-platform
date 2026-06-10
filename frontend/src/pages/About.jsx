import React from 'react';
import AboutHero from '../components/AboutHero';
import VisionMission from '../components/VisionMission';
import PrincipalMessage from '../components/PrincipalMessage';
import Infrastructure from '../components/Infrastructure';
import CampusLife from '../components/CampusLife';
import Milestones from '../components/Milestones';
import Values from '../components/Values';

const About = () => {
  return (
    <main>
      <AboutHero />
      <VisionMission />
      <PrincipalMessage />
      <Infrastructure />
      <CampusLife />
      <Milestones />
      <Values />
    </main>
  );
};

export default About;
