"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKeyDown);

    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onDismiss}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl z-[60] w-8 h-8 flex items-center justify-center font-bold bg-white rounded-full cursor-pointer shadow-sm border border-gray-100"
        >
          &times;
        </button>
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
