"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/Admin/components/Navbar";
import Header from "@/components/header";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isVotePage = /^\/Admin\/vote\/\d+$/i.test(pathname);
  const isLoginPage = pathname === "/Admin";
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    if (adminStatus && (pathname === "/" || pathname === "/Admin")) {
      router.replace("/Admin/Reports");
    }

    // Optional: redirect logged-out user away from admin pages
    if (!adminStatus && pathname.startsWith("/Admin") && !isVotePage && !isLoginPage) {
      router.replace("/Admin");
    }
 if (adminStatus && (pathname === "/" || isLoginPage)) {
      router.replace("/Admin/Reports");
    }
  }, [pathname, router]);

  if (isAdmin === null) return null;

  const hideNavbarOnLogin = pathname === "/Admin";

  return (
    <>
      {/* Admin Navbar on admin routes (except login) */}
      {isAdmin && !hideNavbarOnLogin && pathname.startsWith("/Admin") ? (
        <Navbar />
      ) : (
  !pathname.startsWith("/Admin") && <Header />
      )}

      <main>{children}</main>

    </>
  );
}
