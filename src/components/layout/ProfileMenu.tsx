"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import ConfirmModal from "@/components/modal/ConfirmModal";
import Popover from "@/components/popover/Popover";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleLogoutClick = () => {
    setOpen(false);
    setLogoutOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLoggingOut(true);
    window.setTimeout(() => {
      setLoggingOut(false);
      setLogoutOpen(false);
    }, 700);
  };

  return (
    <>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          aria-label="Profile"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-border bg-card/60 text-text-secondary transition-all hover:border-cyan-border hover:text-cyan hover:shadow-[0_0_18px_-6px_rgba(0,217,255,0.55)]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </button>

        <Popover
          open={open}
          onClose={() => setOpen(false)}
          triggerRef={triggerRef}
          placement="bottom-end"
          className="w-56"
        >
          <div className="border-b border-border-soft px-4 py-3">
            <p className="text-sm font-medium text-text">Guest</p>
            <p className="text-xs text-text-muted">Not signed in</p>
          </div>
          <div className="p-1">
            <Link href="/login" className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-card hover:text-text">
              Sign in
            </Link>
            <Link href="/signup" className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-card hover:text-text">
              Create account
            </Link>
            <Link href="/cart" className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-card hover:text-text">
              Cart
            </Link>
            <button
              type="button"
              onClick={handleLogoutClick}
              className="block w-full rounded-md px-3 py-2 text-left text-sm text-danger hover:bg-card"
            >
              Log out
            </button>
          </div>
        </Popover>
      </div>

      <ConfirmModal
        open={logoutOpen}
        onClose={() => !loggingOut && setLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Log out of GameVault?"
        message="You'll need to sign back in to access your library, cart, and wishlist."
        confirmText={loggingOut ? "Logging out…" : "Yes, log out"}
        cancelText="No, stay"
        tone="danger"
        loading={loggingOut}
        Icon={LogoutIcon}
      />
    </>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
