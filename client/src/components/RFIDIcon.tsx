/* RFID chip icon — standard ISO-style radio-wave-from-chip symbol */
export default function RFIDIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Chip body */}
      <rect x="8.5" y="8.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
      {/* Left wave near */}
      <path d="M6.5 14.2C5.6 13.1 5.6 10.9 6.5 9.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Left wave far */}
      <path d="M4.2 16C2.6 13.9 2.6 10.1 4.2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Right wave near */}
      <path d="M17.5 9.8C18.4 10.9 18.4 13.1 17.5 14.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Right wave far */}
      <path d="M19.8 8C21.4 10.1 21.4 13.9 19.8 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Chip contact pads top */}
      <line x1="10.5" y1="8.5" x2="10.5" y2="6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13.5" y1="8.5" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Chip contact pads bottom */}
      <line x1="10.5" y1="15.5" x2="10.5" y2="17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13.5" y1="15.5" x2="13.5" y2="17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
