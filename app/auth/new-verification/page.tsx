"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/lib/actions";
import Link from "next/link";
import { motion } from "framer-motion";

function VerificationContent() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      setIsVerifying(false);
      return;
    }

    try {
      const result = await newVerification(token);
      if (result.success) {
        setSuccess(result.success);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong!");
    } finally {
      setIsVerifying(false);
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="py-8">
      {isVerifying && (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl flex flex-col items-center gap-2">
          <span className="text-2xl">✓</span>
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl flex flex-col items-center gap-2">
          <span className="text-2xl">⚠</span>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default function NewVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-50 tracking-tight uppercase">
            Ascension Protocol
          </h1>
          <p className="text-zinc-400 text-sm">Email Verification</p>
        </div>

        <Suspense fallback={
          <div className="py-8 flex justify-center">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <VerificationContent />
        </Suspense>

        <div className="pt-4">
          <Link 
            href="/auth/login"
            className="inline-block w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98]"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
