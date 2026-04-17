"use client";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>();
  async function joinRoom() {
    if (!slug) {
  alert("Enter slug");
  return;
}
    const res = await axios.get(`${HTTP_BACKEND}/room/${slug}`);
    if (!res.data.room) {
      alert("something went wrong");
    } else {
      const roomId = res.data.room.id;
      console.log("RoomId: " + res.data.room.id);
      router.push(`/canvas/${roomId}`);
    }
  }

  async function createRoom() {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${HTTP_BACKEND}/room`,
      { name: slug },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    const data = res.data;
    if (!data.roomId) {
      alert("something went wrong");
    } else {
      const roomId = data.roomId;
      console.log("RoomId: " + data.roomId);
      router.push(`/canvas/${roomId}`);
    }
  }
  return (
    <div>
      <input type="text" placeholder="enter room name" onChange={(e) => setSlug(e.target.value)}/>
      <button
        onClick={() => {
          joinRoom();
        }}
      >
        Join Room
      </button>
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        <span>+</span> Create Room
      </button>
      {modal && (
        <>
          <input
            type="text"
            placeholder="enter room name"
            onChange={(e) => {
              setSlug(e.target.value);
            }}
          />
          <button
            onClick={() => {
              createRoom();
            }}
          >
            Create Room
          </button>
        </>
      )}
    </div>
  );
};

export default page;
