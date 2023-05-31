import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const router = useRouter();
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  // const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (user) router.push("/");
    // if (!loading && !user) setPageLoading(false);
  }, [user, router /*, loading*/]);

  // if (pageLoading) return null;

  if (!loading && !user) {
    return (
      <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="flex justify-center items-center h-[calc(100vh-5rem)] pointer-events-none select-none ">
            <Image src="/hero.png" alt="Hero-image" height={500} width={500} />
          </div>
          {authModal.isOpen && <AuthModal />}
        </div>
      </div>
    );
  } else if (!user && loading) {
    return <>Loading User...</>;
  } else {
    return null;
  }
};
export default AuthPage;
