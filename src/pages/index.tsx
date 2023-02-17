import React, { useState } from 'react';
import Header from '@/components/Header';
import JoinModal from '@/components/modal/JoinModal';
import useModal from '@/hooks/useModal';

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

export default function Home() {
  const joinModal = useModal();

  return (
    <>
      <Header right={<SampleRight />} />
      <main>
        <h1>메인페이지</h1>
        <JoinModal isOpen={joinModal.isOpen} handleCloseModal={joinModal.handleCloseModal} />
      </main>
    </>
  );
}
