"use client";
import { useState } from "react";
import { Header } from "../../components/Hero/Header/header";
import { OffCanvas } from "../../components/Hero/OfCanvas/ofCanvas";
export function HeaderOffCanvas() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <Header onOpenOffcanvas={openOffcanvas} />
      <OffCanvas isOpen={isOffcanvasOpen} onClose={closeOffcanvas} />
    </>
  );
}
