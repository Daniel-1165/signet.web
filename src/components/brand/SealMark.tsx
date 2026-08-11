/**
 * SealMark — the brand's signature device.
 *
 * A signet is a seal ring, so the mark is literally a seal: a mono legend
 * curved around a ring, with the monogram struck in the centre. The ring
 * rotates once every 40s — slow enough to read as "alive" rather than
 * animated, which is the point of a network that calls itself *silent*.
 *
 * Used in the hero, the footer, and on certificates.
 */

type SealMarkProps = {
  /** Rendered diameter in px. The type scales with it. */
  size?: number;
  /** `ink` for light backgrounds, `canvas` for dark ones. */
  tone?: "ink" | "canvas";
  legend?: string;
  className?: string;
};

export default function SealMark({
  size = 132,
  tone = "ink",
  legend = "SILENT · GROWTH · NETWORK · SIGNET · ",
  className = "",
}: SealMarkProps) {
  const stroke = tone === "ink" ? "#051F20" : "#DAF1DE";
  const accent = tone === "ink" ? "#8A5A37" : "#8EB69B";

  // Unique id per instance so multiple seals on one page don't share a path.
  const pathId = `seal-ring-${size}-${tone}`;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        fill="none"
        className="seal-ring"
      >
        <defs>
          {/* Radius 76 leaves the legend clear of both the outer rule and the
              monogram. Starting at the top and sweeping clockwise keeps the
              text upright through the readable arc. */}
          <path
            id={pathId}
            d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
          />
        </defs>

        {/* Two concentric rules — the outer one heavier, as struck metal */}
        <circle cx="100" cy="100" r="96" stroke={stroke} strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="100" cy="100" r="90" stroke={stroke} strokeOpacity="0.10" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="58" stroke={stroke} strokeOpacity="0.14" strokeWidth="0.5" />

        <text
          fill={stroke}
          fillOpacity="0.55"
          style={{
            fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.32em",
            fontWeight: 500,
          }}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {legend}
          </textPath>
        </text>
      </svg>

      {/* Monogram, struck into the centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display leading-none"
          style={{
            fontSize: size * 0.3,
            fontWeight: 600,
            fontStyle: "italic",
            fontVariationSettings: "'SOFT' 40, 'WONK' 1, 'opsz' 144",
            color: accent,
          }}
        >
          S
        </span>
      </div>

      <style>{`
        .seal-ring {
          animation: seal-rotate 40s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .seal-ring { animation: none; }
        }
        @keyframes seal-rotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
