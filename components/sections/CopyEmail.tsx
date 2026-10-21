"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex min-w-0 items-stretch overflow-hidden rounded-lg border border-line-strong">
      <a href={`mailto:${email}`} className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-fg transition-colors hover:bg-panel-2">
        <Icon name="mail" className="size-4 shrink-0 text-muted" />
        <span className="truncate font-mono text-[13px] sm:text-sm">{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="flex shrink-0 items-center gap-2 border-l border-line-strong px-4 text-sm text-muted transition-colors hover:bg-panel-2 hover:text-fg"
        aria-label="Copy email address"
      >
        <Icon name={copied ? "check" : "copy"} className={`size-4 ${copied ? "text-pos" : ""}`} />
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
