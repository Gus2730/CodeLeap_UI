import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setUsername } from "@/lib/user-store";

export function SignupModal() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md">
      <div className="animate-slide-up w-full max-w-[500px] rounded-xl border-t-4 border-t-cyan-500 border border-slate-200 bg-white p-8 shadow-2xl">
        {/* Header with accent line */}
        <div className="mb-2 flex items-center gap-3">
          <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full" />
          <h1 className="text-3xl font-bold font-sans tracking-tighter text-slate-900">
            CodeLeap
          </h1>
        </div>
        <p className="mb-8 text-lg font-serif text-slate-600">
          Welcome to the developer network!
        </p>
        
        <form onSubmit={handleSubmit}>
          <label className="mb-3 block text-base font-sans font-semibold text-slate-700">
            Please enter your username
          </label>
          <Input
            type="text"
            placeholder="john_doe"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-8"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-11 min-w-[140px] bg-cyan-500 font-sans font-semibold uppercase text-white hover:bg-cyan-600 transition-smooth hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
            >
              Enter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
