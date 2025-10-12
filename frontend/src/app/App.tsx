import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CreateLinkPage } from "../pages/CreateLinkPage/CreateLinkPage";
import { Redirector } from "../pages/Redirector/Redirector";

export const App: React.FC = () => (
    <BrowserRouter>
        <Toaster />
        <Routes>
            <Route path="/" element={<CreateLinkPage />} />
            <Route path="/:shortCode" element={<Redirector />} />
        </Routes>
    </BrowserRouter>
)