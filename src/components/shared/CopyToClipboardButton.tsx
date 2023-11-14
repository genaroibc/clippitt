"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  textToCopy: string;
}

export function CopyToClipboardButton({ textToCopy, ...props }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timeoutId);
  }, [copied]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(textToCopy).then(() => setCopied(true));
  };

  return (
    <button {...props} title="Copy to clipboard" onClick={handleCopyCode}>
      {copied ? <IconCheck /> : <IconCopy />}
      {props.children}
    </button>
  );
}