export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-cream)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--color-ink)]/20 border-t-[var(--color-chile)] rounded-full animate-spin" />
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink)]/60">
          Cargando
        </p>
      </div>
    </div>
  );
}
