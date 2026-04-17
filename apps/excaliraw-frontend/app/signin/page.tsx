"use client";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function signup() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h1>Signup Page</h1>

      <label>
        Email: <input type="text" ref={emailRef} className="border-1 mt-1 " />
      </label>
      <br />
      <label>
        Password:{" "}
        <input type="text" ref={passwordRef} className="border-1  mt-1" />
      </label>
      <br />

      <br />
      <span
        className="text-blue-700 cursor-pointer hover:text-blue-900"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Don't have a account?
      </span>
      <br />
      <button
        className="bg-cyan-500 py-2 px-4 rounded-xl cursor-pointer hover:-translate-y-0.5 mt-2"
        onClick={async () => {
          const data = await submitForm();

          if (data?.jwt) {
            localStorage.setItem("token", data.jwt);
            router.push("/rooms");
          } else {
            console.error("Signin failed");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
  async function submitForm() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await fetch(`${HTTP_BACKEND}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  }
}
