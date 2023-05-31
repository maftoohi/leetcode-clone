import React from "react";
import Image from "next/image";
import Link from "next/link";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1">
      <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="h-[22px] flex-1">
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>
        <Link href="/auth">
          <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded text-brand-orange hover:text-dark-gray-7 ">Sign In</button>
        </Link>
      </div>
    </nav>
  );
};
export default Topbar;
