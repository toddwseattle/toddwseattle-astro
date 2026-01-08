import { useEffect, useMemo, useRef, useState } from "react";

export interface Step {
  id: string;
  label: string;
}

interface Props {
  steps: Step[];
}

export default function TutorialProgress({ steps }: Props) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id || "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ids = useMemo(() => steps.map((s) => s.id), [steps]);
  const activeIndex = useMemo(
    () => ids.findIndex((id) => id === activeId),
    [ids, activeId],
  );

  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!("IntersectionObserver" in window) || headings.length === 0) {
      return;
    }

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the first intersecting entry (closest to viewport top)
        const intersecting = entries.find((e) => e.isIntersecting);
        if (intersecting?.target?.id) {
          setActiveId(intersecting.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [ids]);

  return (
    <nav
      aria-label="Tutorial steps"
      role="navigation"
      data-testid="tutorial-steps"
    >
      <ol className="relative space-y-2">
        {steps.map((step, index) => {
          const state =
            index < activeIndex
              ? "completed"
              : index === activeIndex
                ? "active"
                : "upcoming";
          const base = "flex items-start gap-2";
          const stateCls =
            state === "active"
              ? "font-semibold text-indigo-600"
              : state === "completed"
                ? "text-slate-500"
                : "text-slate-700";

          return (
            <li key={step.id} data-testid={`tutorial-step-${step.id}`}>
              <a
                href={`#${step.id}`}
                className={`${base} ${stateCls}`}
                aria-current={state === "active" ? "step" : undefined}
              >
                <span
                  className={`mt-1 inline-block w-2 h-2 rounded-full ${
                    state === "active"
                      ? "bg-indigo-600"
                      : state === "completed"
                        ? "bg-slate-400"
                        : "bg-slate-300"
                  }`}
                ></span>
                <span className="truncate" title={step.label}>
                  {step.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
