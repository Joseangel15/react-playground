"use client";

import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import Link from "next/link";

export default function Header() {
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo.name && userInfo.age) {
      console.log(`Username: ${userInfo.name}, Age: ${userInfo.age}`);
    }
  }, [userInfo]);

  return (
    <header className="p-2.5 bg-gray-800 flex justify-between">
      <nav>
        <ul className="flex gap-2.5">
          <Link href="/">Home</Link>
          <Link href="/context-api">Context API</Link>
          <Link href="/sound-manager">Sound Manager</Link>
        </ul>
      </nav>
      <div className="flex gap-2.5">
        <div className="flex gap-1.5">
          <span>Username</span>
          <span>{userInfo.name}</span>
        </div>
        <div className="flex gap-1.5">
          <span>Age</span>
          <span>{userInfo.age}</span>
        </div>
      </div>
    </header>
  );
}
