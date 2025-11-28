"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { baseURL } from "@/config/baseUrl";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState<"login" | "otp">("login");

  // NEW → OTP Countdown
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1 → Send email + password
  const handleLoginRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseURL}/api/admin/login-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("otp");
        setTimeLeft(60); // RESET TIMER
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/api/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isAdmin", "true");
        router.replace("/Admin/Reports");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 NEW → Auto-reset OTP after 1 minute
  useEffect(() => {
    if (step !== "otp") return; 

    if (timeLeft <= 0) {
      setStep("login");
      setOtp("");
      setError("OTP expired. Please login again.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {step === "login" && (
          <form onSubmit={handleLoginRequest} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              {loading ? "Processing..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-center text-gray-600">
              OTP has been sent to <strong>{email}</strong>
            </p>

            {/* 🔥 SHOW COUNTDOWN */}
            <p className="text-center text-sm text-gray-700">
              Time remaining: <strong>{timeLeft}s</strong>
            </p>

            <div>
              <label className="block text-sm text-gray-700">Enter OTP</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
