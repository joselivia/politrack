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

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    if (!adminStatus && pathname.startsWith("/Admin") && pathname !== "/Admin") {
      router.replace("/Admin");
    }
  }, [pathname, router]);

  if (isAdmin === null) return null;

  const hideNavbarOnLogin = pathname === "/Admin";

  return (
    <>
      {isAdmin && !hideNavbarOnLogin  && pathname.startsWith("/Admin") ? (
        <Navbar />
      ) : (
        !isAdmin  && <Header />
      )}

      <main>{children}</main>

    </>
  );
}
