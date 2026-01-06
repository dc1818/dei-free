import React from "react";

type TitleBoxProps = {
  line1?: string;
  line2?: string;
  className?: string;
};

export function TitleBox({
  line1 = "DEI-FREE",
  line2 = "COMPANY INDEX",
  className = "",
}: TitleBoxProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-3xl px-4",
        className,
      ].join(" ")}
    >
      <div
        className={[
            "relative rounded-none border-2 border-orange-500/90",
            "bg-black/30 backdrop-blur-md",
            "px-6 py-6 sm:px-10 sm:py-8",
            "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.45),0_0_0_2px_rgba(255,106,0,0.35),0_0_18px_rgba(255,106,0,0.65),0_0_44px_rgba(255,106,0,0.35)]",
          ].join(" ")}
      >
        <div className="text-center leading-none">
          <div
            className={[
              "uppercase font-extrabold tracking-widest",
              "text-orange-500",
              "text-3xl sm:text-4xl md:text-5xl",
              "drop-shadow-[0_0_10px_rgba(255,106,0,0.55)]",
            ].join(" ")}
          >
            {line1}
          </div>

          <div
            className={[
              "mt-2 uppercase font-extrabold tracking-widest",
              "text-orange-500",
              "text-3xl sm:text-4xl md:text-5xl",
              "drop-shadow-[0_0_10px_rgba(255,106,0,0.55)]",
            ].join(" ")}
          >
            {line2}
          </div>
        </div>
      </div>
    </div>
  );
}
