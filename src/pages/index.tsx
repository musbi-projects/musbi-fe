import Header from '@/components/header/Header';
import HeaderRight from '@/components/header/HeaderRight';

export default function Home() {
  return (
    <>
      <Header right={<HeaderRight />} />
      <main>
        <h1>메인페이지</h1>
      </main>
    </>
  );
}
