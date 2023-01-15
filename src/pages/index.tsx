import Head from "next/head";
import { Inter } from "@next/font/google";
import AppLayout from "@/components/AppLayout/AppLayout";
import Header from "@/components/Header";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  return (
    <AppLayout>
      <Header left={<SampleLeft />} right={<SampleRight />} />
    </AppLayout>
  );
}
