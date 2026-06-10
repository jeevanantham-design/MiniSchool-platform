import React from 'react';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import Highlights from '../components/Highlights';
import Announcements from '../components/Announcements';

const Home = () => {
  return (
    <main>
      <Hero />
      <Welcome />
      <Highlights />
      <Announcements />
    </main>
  );
};

export default Home;
