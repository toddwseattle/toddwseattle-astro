export type TimelineCategory =
  | "practices-tools"
  | "teamwork-process"
  | "platforms-languages"
  | "ai-automation";

export interface TimelineLink {
  label: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  yearDisplay: string;
  sortYear: number;
  title: string;
  description: string;
  categories: TimelineCategory[];
  isToolingSpine?: boolean;
  significance: "major" | "notable";
  links?: TimelineLink[];
}

export interface TimelineConfig {
  key: "software-engineering-history";
  title: string;
  subtitle: string;
  framing: string;
  events: TimelineEvent[];
}

export interface CategoryMeta {
  label: string;
  pillClassName: string;
}

export const timelineCategoryMeta: Record<TimelineCategory, CategoryMeta> = {
  "practices-tools": {
    label: "Practices & Tools",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
  "teamwork-process": {
    label: "Teamwork & Process",
    pillClassName:
      "bg-paper-100 text-ink-700 dark:bg-graphite-600 dark:text-paper-100",
  },
  "platforms-languages": {
    label: "Platforms & Languages",
    pillClassName:
      "bg-paper-200 text-ink-700 dark:bg-graphite-700 dark:text-paper-100",
  },
  "ai-automation": {
    label: "AI & Automation",
    pillClassName:
      "bg-paper-100 text-ink-800 dark:bg-graphite-600 dark:text-paper-50",
  },
};

const softwareEngineeringHistoryTimeline: TimelineConfig = {
  key: "software-engineering-history",
  title: "Software Engineering History Timeline",
  subtitle: "How software engineering practices, tools, and teamwork evolved",
  framing:
    "Use this timeline to connect technical changes with the way teams organize work. Filter by category to focus class discussions.",
  events: [
    {
      id: "nato-1968",
      yearDisplay: "1968",
      sortYear: 1968,
      title: "NATO conference formalizes software engineering",
      description:
        "The term software engineering entered mainstream technical discussion. Teams started treating software work as an engineering discipline with explicit methods and constraints.",
      categories: ["teamwork-process"],
      significance: "major",
      links: [
        {
          label: "NATO 1968 report overview",
          url: "https://homepages.cs.ncl.ac.uk/brian.randell/NATO/",
        },
      ],
    },
    {
      id: "c-unix-era",
      yearDisplay: "Early 1970s",
      sortYear: 1972,
      title: "C and Unix shift systems programming",
      description:
        "Portable systems code became more realistic as C and Unix spread. Engineering decisions increasingly balanced hardware constraints with maintainability.",
      categories: ["platforms-languages", "practices-tools"],
      significance: "notable",
    },
    {
      id: "structured-programming",
      yearDisplay: "Late 1970s",
      sortYear: 1978,
      title: "Structured programming and code reviews gain ground",
      description:
        "Teams adopted clearer control flow, coding standards, and peer review habits. These practices improved readability and reduced costly defects.",
      categories: ["teamwork-process", "practices-tools"],
      significance: "notable",
    },
    {
      id: "object-oriented-mainstream",
      yearDisplay: "1980s",
      sortYear: 1986,
      title: "Object-oriented design becomes mainstream",
      description:
        "Object-oriented languages and design patterns influenced architecture decisions. Teams organized larger codebases around abstractions and reusable components.",
      categories: ["platforms-languages", "teamwork-process"],
      significance: "notable",
    },
    {
      id: "agile-manifesto",
      yearDisplay: "2001",
      sortYear: 2001,
      title: "Agile Manifesto reorients delivery",
      description:
        "The Agile Manifesto encouraged shorter feedback cycles and stronger collaboration with stakeholders. Planning became iterative instead of assuming fixed long-term requirements.",
      categories: ["teamwork-process"],
      significance: "major",
      links: [
        {
          label: "Agile Manifesto",
          url: "https://agilemanifesto.org/",
        },
      ],
    },
    {
      id: "git-github",
      yearDisplay: "2005–2008",
      sortYear: 2005,
      title: "Git and GitHub modernize collaboration",
      description:
        "Distributed version control made branching and merging practical for more teams. Pull-request workflows improved traceability, review quality, and shared ownership.",
      categories: ["practices-tools", "teamwork-process"],
      isToolingSpine: true,
      significance: "major",
    },
    {
      id: "cloud-devops",
      yearDisplay: "2010s",
      sortYear: 2012,
      title: "Cloud platforms and DevOps reshape operations",
      description:
        "Cloud infrastructure and automation shifted teams from manual deployment to repeatable pipelines. Engineering responsibilities expanded to include observability, reliability, and cost.",
      categories: [
        "platforms-languages",
        "practices-tools",
        "teamwork-process",
      ],
      isToolingSpine: true,
      significance: "major",
    },
    {
      id: "containers-kubernetes",
      yearDisplay: "2014+",
      sortYear: 2014,
      title: "Containers and Kubernetes standardize runtime deployment",
      description:
        "Containers reduced environment drift between local development and production. Teams gained consistent deployment targets and stronger automation patterns at scale.",
      categories: ["platforms-languages", "practices-tools"],
      isToolingSpine: true,
      significance: "notable",
    },
    {
      id: "ai-code-assistants",
      yearDisplay: "2022+",
      sortYear: 2022,
      title: "AI coding assistants enter everyday workflows",
      description:
        "Generative AI tools changed how engineers draft code, tests, and documentation. Teams now need explicit review standards and governance for AI-assisted output.",
      categories: ["ai-automation", "teamwork-process", "practices-tools"],
      significance: "major",
    },
    {
      id: "agentic-tooling",
      yearDisplay: "2025+",
      sortYear: 2025,
      title: "Agentic automation expands software delivery tasks",
      description:
        "Autonomous tooling increasingly supports implementation, verification, and refactoring. Engineering leadership now emphasizes system-level oversight and clear guardrails.",
      categories: ["ai-automation", "practices-tools"],
      significance: "notable",
    },
  ],
};

const timelines: Record<TimelineConfig["key"], TimelineConfig> = {
  "software-engineering-history": softwareEngineeringHistoryTimeline,
};

export const getTimelineByKey = (key: TimelineConfig["key"]) => timelines[key];

export const filterEvents = (
  events: TimelineEvent[],
  category: TimelineCategory | "all",
): TimelineEvent[] => {
  if (category === "all") {
    return [...events].sort((a, b) => a.sortYear - b.sortYear);
  }

  return events
    .filter((event) => event.categories.includes(category))
    .sort((a, b) => a.sortYear - b.sortYear);
};
