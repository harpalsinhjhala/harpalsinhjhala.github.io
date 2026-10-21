// Real before/after for the QIC reporting pipeline: 48 hours before, under 2 hours after.
// Bars grow in on scroll via .draw-bar in globals.css.
export function TurnaroundBars() {
  return (
    <div className="w-full max-w-[220px] space-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint" aria-hidden>
      <div className="flex items-center gap-2">
        <span className="w-12">before</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel-2">
          <div className="draw-bar h-full w-full rounded-full bg-neg" />
        </div>
        <span className="tnum w-6 text-right">48h</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-12">after</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel-2">
          <div className="draw-bar h-full w-[4.2%] rounded-full bg-pos" />
        </div>
        <span className="tnum w-6 text-right">2h</span>
      </div>
    </div>
  );
}
