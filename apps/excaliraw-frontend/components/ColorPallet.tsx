import { Check } from "lucide-react";
import { useRef, useState } from "react";
interface ColorPalletInterface  {
  strokeColor: string;
  setStrokeColor: (a: string) => void;
  selectedTool: string;
  boxClicked:boolean;
  setBoxClicked:(a:any)=>void 
}
export function ColorPallet({
  strokeColor,
  setStrokeColor,
  selectedTool,
  boxClicked,
  setBoxClicked
}:ColorPalletInterface) {
  const colorRef = useRef<HTMLInputElement>(null);
  

  return (
    <div>
      <div
        className={`bg-zinc-800 flex flex-col gap-4 px-4 py-2 rounded-b-lg w-77 ml-5 border border-t-0 border-zinc-700 ${
          selectedTool === "hand" || selectedTool === "mouse" || selectedTool === "img" ? "hidden" : ""
        }`}
      >
        {[
          "#ffffff",
          "#f56363",
          "#2f9e44",
          "#1971c2",
          "#f08c00",
        ].map((color) => (
          <div
            key={color}
            className={`h-6 w-7 rounded border border-gray-600 hover:scale-110 cursor-pointer`}
            style={{ backgroundColor: color }}
            onClick={() => {
                setCurrentColor(color)
                setBoxClicked(false)
            }}
          ></div>
        ))}
        <p className="text-gray-400">|</p>

        <div
          style={{ "--current-color": strokeColor } as React.CSSProperties}
          className="h-6 w-7 rounded border bg-[var(--current-color)] border-gray-600 hover:scale-110 cursor-pointer"
          onClick={() => setBoxClicked((x: boolean) => !x)}
        ></div>
      </div>

      <div
        className={`${
          !boxClicked ? "hidden" : ""
        } flex bg-white max-w-56 border border-zinc-700 rounded-md gap-1 m-auto p-1 justify-evenly`}
      >
        <input
          ref={colorRef}
          type="text"
          placeholder="Color Code"
          className="w-36 border-none focus:outline-none"
        />
        <button
          className="cursor-pointer hover:scale-125  "
          onClick={() => {
            const color = colorRef.current?.value;
            if (color) {
              setCurrentColor(color);
            }
          }}
        >
          <Check color="black" size={20} />
        </button>
      </div>
    </div>
  );

  function setCurrentColor(color: string) {
    setStrokeColor(color);
  }
}
