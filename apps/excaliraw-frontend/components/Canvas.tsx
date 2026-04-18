"use client";

import { ColorPallet } from "@/components/ColorPallet";
import { ImageDrop } from "@/components/ImageDrop";
import { ToolBar } from "@/components/ToolBar";
import { CanvasClass } from "@/lib/CanvasClass";
import getExistingShapes from "@/lib/getExsistingShapes";
import { useEffect, useRef, useState } from "react";

export default function Canvas({
  myUserId,
  roomId,
  socket,
}: {
  myUserId: string;
  roomId: number;
  socket: WebSocket;
}) {
  const [joined, setJoined] = useState(false);
  const [selectedTool, setSelectedTool] = useState("rectangle");
  const [strokeColor, setStrokeColor] = useState("#FFFFFF");
  const [cursorType, setCursorType] = useState("cursor-default");
  const [boxClicked, setBoxClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [files, setFiles] = useState<any[]>([]);
  const canvasInstanceRef = useRef<CanvasClass | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvasInstanceRef.current) {
      // initialize once
      const instance = new CanvasClass(canvasRef.current);
      canvasInstanceRef.current = instance;
      instance.addHandlers();
    }
  }, []);

  useEffect(() => {
    // update selected tool inside class
    canvasInstanceRef.current?.setSelectedTool(selectedTool);
    if (selectedTool == "mouse" || selectedTool == "img")
      setCursorType("cursor-default");
    else if (selectedTool == "hand") setCursorType("cursor-grab");
    else if (
      selectedTool == "rectangle" ||
      selectedTool == "pencile" ||
      selectedTool == "circle" ||
      selectedTool == "ellipse" ||
      selectedTool == "line"
    )
      setCursorType("cursor-crosshair");
  }, [selectedTool]);

  useEffect(() => {
    canvasInstanceRef.current?.setStrokeColor(strokeColor);
  }, [strokeColor]);

  useEffect(() => {
    canvasInstanceRef.current?.setFiles(files);
  }, [files]);
  //--------------ws-----------
  useEffect(() => {
    if (!canvasInstanceRef.current) return;

    canvasInstanceRef.current.setOnShapeComplete((shape) => {

      socket.send(
        JSON.stringify({
          type: "chat",
          roomId,
          message: shape,
          userId: myUserId,
        }),
      );
    });
  }, [socket, roomId, myUserId]);

  useEffect(() => {
    if (!socket) return;

    const handler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "joined") {
        setJoined(true);
      }

      if (data.type === "chat") {
        if (data.userId === myUserId) return;
        
        const shape = JSON.parse(data.message);
        canvasInstanceRef.current?.addShapeFromServer(shape);
      }
    };

    socket.addEventListener("message", handler);

    return () => socket.removeEventListener("message", handler);
  }, [socket]);
  useEffect(() => {
  async function loadShapes() {
    const shapes = await getExistingShapes(roomId);

    shapes.forEach((shape: any) => {
      canvasInstanceRef.current?.addShapeFromServer(shape);
    });
  }

  loadShapes();
}, [roomId]);
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden relative cursor bg-zinc-900 ">
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 ${cursorType}`}
      />
      <div className="fixed ">
        <ToolBar
          files={files}
          setFiles={setFiles}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          setBoxClicked={setBoxClicked}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          boxClicked={boxClicked}
        />
        {/* <ColorPallet strokeColor={strokeColor} setStrokeColor={setStrokeColor} selectedTool={selectedTool} boxClicked = {boxClicked} setBoxClicked={setBoxClicked} /> */}
        {/* <ImageDrop files={files}  setFiles={setFiles} selectedTool={selectedTool} /> */}
      </div>
    </div>
  );
}
