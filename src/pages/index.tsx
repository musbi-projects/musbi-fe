import React, { useState } from "react";
import Drawer from "@/components/Drawer";
import { useCurrentMenuValue } from "@/recoil/toolbox";

export default function Home() {
  const currentMenu = useCurrentMenuValue();
  return (
    <div>
      <h1>메인페이지</h1>
      <Drawer currentMenu={currentMenu} />
    </div>
  );
}
