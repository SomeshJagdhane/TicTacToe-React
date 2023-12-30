import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import "./style.css";

import Game from "./app.js";
const root = createRoot(document.getElementById(`root`));

root.render (
    <StrictMode>
        <Game />
    </StrictMode>
)
