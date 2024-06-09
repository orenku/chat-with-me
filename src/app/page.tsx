'use client';

import { useRouter } from "next/navigation";
import React from "react";
import Chat from "./chat/page";


export default function Home() {
  const router = useRouter();

  return <>
    <Chat />
  </>
}
