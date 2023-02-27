import React from 'react';
import Header from '@/components/header/Header';

const SampleLeft = () => {
  return <h1>musbi</h1>;
};

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

const Sample = () => {
  return (
    <div>
      <Header left={<SampleLeft />} right={<SampleRight />} />
    </div>
  );
};

export default Sample;
