export default function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-[3px] text-[#00ADDB]">
      {children}
      <span aria-hidden="true" className="h-px w-10 bg-[#00ADDB]" />
    </p>
  );
}
