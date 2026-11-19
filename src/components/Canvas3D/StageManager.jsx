import React from "react";
import { useStore } from "../../store/useStore";
import OmnitrixStage from "./OmnitrixStage";
import AlienViewer from "./AlienViewer";
import ModeUI from "../ModeUI";

export default function StageManager() {
  const { mode } = useStore();

  if (!mode) return null;

  return (
    <div className="canvas-wrapper">
      {mode === "omnitrix" && <OmnitrixStage />}
      {mode === "viewer" && <AlienViewer />}
      <ModeUI />
    </div>
  );
}
