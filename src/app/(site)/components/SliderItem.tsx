export default function SliderItem({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <li className="min-w-9/10 md:min-w-2/5 snap-start group relative *:transition-opacity *:duration-500">
      {children}
    </li>
  );
}
