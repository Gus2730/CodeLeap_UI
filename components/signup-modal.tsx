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
    <div className="fixed inset-0 flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[500px] rounded-2xl border border-border bg-card p-6">
        <h1 className="mb-6 text-[22px] font-bold text-card-foreground">
          Welcome to CodeLeap network!
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-base text-card-foreground">
            Please enter your username
          </label>
          <Input
            type="text"
            placeholder="John doe"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-4 h-8 border-border bg-card text-card-foreground placeholder:text-muted-foreground"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-8 min-w-[111px] bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ENTER
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
