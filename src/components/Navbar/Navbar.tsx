import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex items-center justify-between px-2 sm:px-12 md:px-24">
      <Link href="/" className="">
        <Image src="/logo.png" alt="LeetCode-clone" className="" width={200} height={200} />
      </Link>
      <div className="">
        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium border-2 border-transparent
        hover:text-brand-orange hover:bg-white hover:border-brand-orange transition duration-300 ease-in-out"
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
