import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1">
      <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
        <Link href="/" className="h-[22px] flex-1">
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>
        {!user && (
          <Link
            href="/auth"
            onClick={() => {
              setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }));
            }}
          >
            <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded text-dark-gray-7  hover:text-brand-orange ">Sign In</button>
          </Link>
        )}
        {user && (
          <div className="cursor-pointer group relative">
            <Image src="/avatar.png" alt="user profile img" className="rounded-full px-2" width={45} height={45} />
            <div
              className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
				z-40 group-hover:scale-100 scale-0 
				transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
        {user && <Logout />}
      </div>
    </nav>
  );
};
export default Topbar;
