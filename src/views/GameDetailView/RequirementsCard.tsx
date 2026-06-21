import { cn } from "@/utils/cn";

type Props = {
  label: string;
  data: Record<string, string>;
  accent?: boolean;
};

export default function RequirementsCard({ label, data, accent = false }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5",
        accent ? "border-cyan-border shadow-[0_0_24px_-12px_rgba(0,217,255,0.4)]" : "border-border",
      )}
    >
      <p
        className={cn(
          "mb-3 text-xs font-semibold uppercase tracking-widest",
          accent ? "text-cyan" : "text-text-muted",
        )}
      >
        {label}
      </p>
      <dl className="grid grid-cols-[100px_1fr] gap-x-3 gap-y-2 text-sm">
        {Object.entries(data).map(([k, v]) => (
          <Row key={k} k={k} v={v} />
        ))}
      </dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-text-muted">{k}</dt>
      <dd className="text-text-secondary">{v}</dd>
    </>
  );
}
