import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DivWrapperScreen } from "./screens/DivWrapperScreen";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <DivWrapperScreen />
  </StrictMode>,
);
