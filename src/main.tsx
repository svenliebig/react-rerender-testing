import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./router";

// I removed strict mode
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Router />);
