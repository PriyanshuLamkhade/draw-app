"use client";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function signup() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h1>Signup Page</h1>

      <label>
        Email: <input type="text" ref={emailRef} className="border-1 mt-1 " />
      </label>
      <br />
      <label>
        Password: <input type="text"ref={passwordRef} className="border-1  mt-1" />
      </label>
      <br />
      <label>
        Name: <input type="text"ref={nameRef} className="border-1 mt-1 " />
      </label>
      <br />
      <span
        className="text-blue-700 cursor-pointer hover:text-blue-900"
        onClick={() => {
          router.push("/signin");
        }}
      >
        Already have a account?
      </span>
        <br />
      <button
        className="bg-cyan-500 py-2 px-4 rounded-xl cursor-pointer hover:-translate-y-0.5 mt-2"
        onClick={async () => {
          const res = await submitForm();
          if (res && res.ok) {
            router.push("/signin");
          } else {
            console.error("Signup failed");
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
    const name = nameRef.current?.value;
    const response = await fetch(`${HTTP_BACKEND}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    return response;
  }
}
