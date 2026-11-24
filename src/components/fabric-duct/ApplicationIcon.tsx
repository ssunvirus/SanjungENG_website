type ApplicationIconProps = {
  index: number;
  className?: string;
};

// One view box and stroke weight keep the four tab icons visually consistent.
export default function ApplicationIcon({ index, className }: ApplicationIconProps) {
  const drawings = [
    <g key="logistics">
      <path d="M4 27V12l12-7 12 7v15H4Z" />
      <path d="M11 27V16h10v11M11 20h10M11 24h10M14 11h4" />
    </g>,
    <g key="production">
      <path d="M4 27V15l8-5v7l8-5v15H4ZM23 27V6h4l1 21M8 22h1M14 22h1" />
    </g>,
    <g key="commercial">
      <path d="m5 5-2 8v2a4 4 0 0 0 7 2 4 4 0 0 0 6 0 4 4 0 0 0 6 0 4 4 0 0 0 7-2v-2l-2-8H5ZM3 13h26M11 5l-1 8M21 5l1 8M5 19v8h22v-8M12 27v-7h8v7" />
    </g>,
    <g key="public">
      <path d="m3 12 13-8 13 8H3ZM5 27h22M7 24V15M13 24V15M19 24V15M25 24V15M4 24h24" />
    </g>,
  ];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {drawings[index]}
    </svg>
  );
}
