import React, { useEffect, useMemo, useRef, useState } from "react";

type Company = {
  name: string;
  url: string;
  meta?: string;
};

const COMPANIES: Company[] = [
  { name: "Acme Systems", url: "/company/acme-systems/", meta: "Tech • Public" },
  { name: "BrightSide Retail", url: "/company/brightside-retail/", meta: "Retail • Private" },
  { name: "Cascade Bank", url: "/company/cascade-bank/", meta: "Finance • Public" },
  { name: "Evergreen Health", url: "/company/evergreen-health/", meta: "Healthcare • Public" },
  { name: "Forge Industries", url: "/company/forge-industries/", meta: "Manufacturing • Private" },
  { name: "Helios Cloud", url: "/company/helios-cloud/", meta: "Tech • Public" },
  { name: "Juniper Capital", url: "/company/juniper-capital/", meta: "Finance • Private" },
  { name: "Keystone Outdoors", url: "/company/keystone-outdoors/", meta: "Retail • Public" },
  { name: "Lakeshore Clinics", url: "/company/lakeshore-clinics/", meta: "Healthcare • Private" },
  { name: "Monarch Tools", url: "/company/monarch-tools/", meta: "Manufacturing • Public" },
  { name: "Northstar Software", url: "/company/northstar-software/", meta: "Tech • Private" },
  { name: "Oakline Payments", url: "/company/oakline-payments/", meta: "Finance • Public" }
];

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightParts(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;

  const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = text.split(re);

  return parts.map((p, idx) =>
    re.test(p) ? (
      <span
        key={idx}
        className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,106,0,0.20)]"
      >
        {p}
      </span>
    ) : (
      <React.Fragment key={idx}>{p}</React.Fragment>
    )
  );
}

export function TypeaheadSearch({
  className = "",
  maxResults = 8
}: {
  className?: string;
  maxResults?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COMPANIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, maxResults);
  }, [query, maxResults]);

  const listId = "dfCompanyList";

  function closeList() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function goTo(item: Company) {
    // If you use react-router, swap this with navigate(item.url)
    window.location.assign(item.url);
  }

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = e.target as Node | null;
      if (!el) return;
      if (wrapperRef.current?.contains(el)) return;
      closeList();
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Keyboard nav on the input
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < results.length) {
        e.preventDefault();
        goTo(results[activeIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeList();
    }
  }

  return (
    <div
      ref={wrapperRef}
      aria-label="Company search"
      className={[
        "relative mt-4 w-[min(760px,90vw)] max-w-[760px]",
        className
      ].join(" ")}
    >
      <input
        ref={inputRef}
        className={[
          // Big semi-transparent pill
          "w-full rounded-[18px] border-2",
          "border-orange-500/60 focus:border-orange-500/95",
          "bg-white/10 text-white/90 placeholder:text-white/60",
          "px-5 py-4",
          "text-[clamp(18px,2.0vw,28px)] tracking-[0.02em]",
          "outline-none backdrop-blur-[10px]",
          // Glow + inset
          "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),0_0_18px_rgba(255,106,0,0.25),0_14px_34px_rgba(0,0,0,0.30)]",
          "focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),0_0_26px_rgba(255,106,0,0.40),0_18px_42px_rgba(0,0,0,0.35)]"
        ].join(" ")}
        type="text"
        inputMode="search"
        autoComplete="off"
        spellCheck={false}
        placeholder="Search companies…"
        aria-label="Search companies"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={onKeyDown}
      />

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Company suggestions"
          className={[
            "mt-2 max-h-[340px] overflow-auto rounded-none border p-2",
            "border-orange-500/35 bg-black/40 backdrop-blur-[12px]",
            "shadow-[0_18px_42px_rgba(0,0,0,0.35)]"
          ].join(" ")}
        >
          {query.trim().length === 0 ? (
            <li className="px-3 py-3 text-sm text-white/65">
              Start typing to see companies…
            </li>
          ) : results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-white/65">
              No matches. Try another name.
            </li>
          ) : (
            results.map((c, i) => (
              <li
                key={c.url}
                role="option"
                aria-selected={i === activeIndex}
                className={[
                  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-white/90",
                  "transition-[background,transform] duration-100",
                  "hover:bg-orange-500/15 active:translate-y-[1px]",
                  i === activeIndex ? "bg-orange-500/15" : ""
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  // Prevent input blur before click handler runs
                  e.preventDefault();
                }}
                onClick={() => goTo(c)}
              >
                <span className="rounded-full border border-orange-500/45 bg-orange-500/10 px-2 py-1 text-xs text-white/80">
                  Company
                </span>

                <span className="min-w-0">
                  <span className="block text-[16px] font-bold leading-[1.1] tracking-[0.01em]">
                    {highlightParts(c.name, query)}
                  </span>
                  {c.meta ? (
                    <span className="mt-0.5 block text-[13px] text-white/65">
                      {c.meta}
                    </span>
                  ) : null}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
