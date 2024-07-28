/* eslint-disable react/prop-types */
export const CircularProgress = ({
  size = 40,
  thickness = 3.6,
  color = "primary",
}) => {
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - circumference * 0.75;

  const svgStyle = {
    transform: "rotate(-90deg)",
    transformOrigin: "center",
  };

  return (
    <svg width={size} height={size} style={svgStyle}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeWidth={thickness}
        style={{ transition: "stroke-dashoffset 0.35s" }}
        className={`text-${color}-500`}
      />
    </svg>
  );
};
