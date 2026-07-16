type OrnamentalDividerProps = {
  /** Center color for the diamond + dots */
  color?: string;
  /** Line color */
  lineColor?: string;
  className?: string;
};

/**
 * A slender decorative divider — two tapered lines meeting a central
 * diamond flanked by small dots. Used to separate sections with a touch
 * more elegance than a plain rule. Colors are configurable so it can sit
 * on light or dark backgrounds.
 */
export default function OrnamentalDivider({
  color = "#C9A227",
  lineColor = "#C9A227",
  className = "",
}: OrnamentalDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span
        className="h-px w-16 sm:w-24"
        style={{
          background: `linear-gradient(to right, transparent, ${lineColor})`,
          opacity: 0.6,
        }}
      />
      <span className="flex items-center gap-1.5">
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: color, opacity: 0.7 }}
        />
        <span
          className="h-2.5 w-2.5 rotate-45"
          style={{ backgroundColor: color }}
        />
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: color, opacity: 0.7 }}
        />
      </span>
      <span
        className="h-px w-16 sm:w-24"
        style={{
          background: `linear-gradient(to left, transparent, ${lineColor})`,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
