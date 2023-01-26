import React from "react";
import Input from "@/components/Input";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Input
        type="search"
        variant="outlined"
        placeholder="텍스트 검색"
        icon={<CiSearch />}
      />
    </div>
  );
}
