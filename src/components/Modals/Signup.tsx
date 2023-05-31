import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const router = useRouter();

  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };

  const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium text-white">Register to LeetCode-clone</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          onChange={handleChangeInput}
          className="border-2 outline-none sm:text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        />
      </div>
      <div>
        <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
          Display Name
        </label>
        <input
          type="displayName"
          name="displayName"
          id="displayName"
          placeholder="John Doe"
          onChange={handleChangeInput}
          className="border-2 outline-none sm:text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          onChange={handleChangeInput}
          className="border-2 outline-none sm:text-sm rounded-lg
       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
        />
      </div>
      <button type="submit" className="w-full text-white text-sm text-center px-2 py-2.5 font-medium bg-brand-orange hover:bg-brand-orange-s rounded-lg focus:ring-blue-300">
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="text-sm text-gray-300 ">
        Already have an account?{" "}
        <a href="#" className="text-blue-700 hover:underline" onClick={handleClick}>
          Log In
        </a>
      </div>
    </form>
  );
};
export default Signup;
