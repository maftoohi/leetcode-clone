import { authModalState } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) return alert("Please fill all fields");
    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-2.5" onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium text-white">Sign In to LeetCode-clone</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          className="border-2 outline-none sm:text-sm rounded-lg
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          className="border-2 outline-none sm:text-sm rounded-lg
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        />
      </div>
      <button type="submit" className="w-full text-white text-sm text-center px-2 py-2.5 font-medium bg-brand-orange hover:bg-brand-orange-s rounded-lg focus:ring-blue-300">
        {loading ? "Loading..." : "Log In"}
      </button>
      <button className="flex justify-end w-full" onClick={() => handleClick("forgotPassword")}>
        <a href="#" className="text-sm text-brand-orange hover:underline">
          Forgot password?
        </a>
      </button>
      <div className="text-sm text-gray-300">
        Not Registered?{" "}
        <a href="#" className="text-blue-700 hover:underline" onClick={() => handleClick("register")}>
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;
