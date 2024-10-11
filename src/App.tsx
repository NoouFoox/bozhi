import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { hexToRgba } from "./lib/utils";
import { ChangeColorEvent } from "./lib/types";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#fff4aa");

  const changeColor = async (e: ChangeColorEvent): Promise<void> => {
    const value = e.target.value;
    await invoke("set_background_color", { color: hexToRgba(value) })
    setColor(value);
  };
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container" style={{ background: color }}>
      <input
        value={color}
        type="color"
        name="color"
        id="color"
        onChange={changeColor}
      />
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
