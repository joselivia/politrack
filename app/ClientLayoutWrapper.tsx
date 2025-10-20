"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/Admin/components/Navbar";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    // Redirect admin away from public pages
    if (adminStatus && (pathname === "/" || pathname === "/Admin")) {
      router.replace("/Admin/Reports");
    }

    if (!adminStatus && pathname.startsWith("/Admin") && pathname !== "/Admin") {
      router.replace("/Admin");
    }
  }, [pathname, router]);

  if (isAdmin === null) return null; // Prevent flicker before checking localStorage

  const hideNavbarOnLogin = pathname === "/Admin";

  return (
    <>
      {isAdmin && !hideNavbarOnLogin && pathname.startsWith("/Admin") ? (
        <Navbar />
      ) : (
        !isAdmin && <Header />
      )}

      <main>{children}</main>

      {/* Footer only on public pages */}
      {!isAdmin && <Footer />}
    </>
  );
}
