import { useEffect, useMemo, useRef, useState } from "react";

export interface Step {
  id: string;
  label: string;
}

interface Props {
  steps: Step[];
}

function getHashStepId() {
  const hash = window.location.hash.slice(1);

  if (!hash) {
    return "";
  }

  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
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
    const syncFromHash = () => {
      const hashId = getHashStepId();

      if (hashId && ids.includes(hashId)) {
        setActiveId(hashId);
        return;
      }

      setActiveId(steps[0]?.id || "");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [ids, steps]);

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
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              left.boundingClientRect.top - right.boundingClientRect.top,
          )[0];

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
              ? "font-semibold text-ink-800 underline decoration-accent-teal decoration-2 underline-offset-4 dark:text-paper-100"
              : state === "completed"
                ? "text-graphite-400"
                : "text-ink-600 dark:text-paper-200";

          return (
            <li key={step.id} data-testid={`tutorial-step-${step.id}`}>
              <a
                href={`#${step.id}`}
                className={`${base} ${stateCls}`}
                aria-current={state === "active" ? "step" : undefined}
                onClick={() => setActiveId(step.id)}
              >
                <span
                  className={`mt-1 inline-block w-2 h-2 rounded-full ${
                    state === "active"
                      ? "bg-accent-teal"
                      : state === "completed"
                        ? "bg-graphite-400"
                        : "bg-paper-200 dark:bg-graphite-600"
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
