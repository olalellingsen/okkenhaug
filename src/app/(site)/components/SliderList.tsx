import React from "react";

export default function SliderList({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ul className="w-full flex flex-row gap-2 md:gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar lg:grid lg:grid-cols-3">
      {children}
    </ul>
  );
}
