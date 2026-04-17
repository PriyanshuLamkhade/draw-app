"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    
    <div>
      <p>Welcome to Excaliraw Home Page!</p>
      <br />
      <button className="bg-cyan-500 py-2 px-4 rounded-xl cursor-pointer hover:-translate-y-0.5 mt-2"
      onClick={()=>{router.push("/signup")}}
      >Sigup</button> 
      <button className="bg-red-500 py-2 px-4 rounded-xl  cursor-pointer hover:-translate-y-0.5 mt-2  "
      onClick={()=>{router.push("/signin")}}
      >Sigin</button>
    </div>
  );
}
