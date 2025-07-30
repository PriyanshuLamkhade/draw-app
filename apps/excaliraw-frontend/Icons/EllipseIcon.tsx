export function EllipseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="12" rx="10" ry="6" />
    </svg>
  );
}
