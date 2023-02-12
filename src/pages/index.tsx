import React, { useState } from 'react';
import Header from '@/components/Header';

const SampleLeft = () => {
  return <h1>musbi - main page</h1>;
};

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <main>
        <h1>메인페이지</h1>
      </main>
    </>
  );
}
