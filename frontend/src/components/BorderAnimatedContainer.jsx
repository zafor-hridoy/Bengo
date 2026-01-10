function BorderAnimatedContainer({ children, color1 = "rgb(6, 182, 212)", color2 = "rgb(103, 232, 249)" }) {
  return (
    <div
      className="w-full h-full rounded-2xl border border-transparent animate-border flex overflow-hidden"
      style={{
        background: `linear-gradient(45deg,#172033, rgb(30, 41, 59) 50%,#172033) padding-box,
                    conic-gradient(from var(--border-angle), rgba(71, 85, 105, 0.48) 80%, ${color1} 86%, ${color2} 90%, ${color1} 94%, rgba(71, 85, 105, 0.48)) border-box`
      }}
    >
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;