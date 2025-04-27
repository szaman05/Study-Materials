"use client";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - ZMN Admin Dashboard</p>
      </aside>
    </footer>
  );
}
