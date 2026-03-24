export type TimelineCategory =
  | "practices-tools"
  | "teamwork-process"
  | "platforms-languages"
  | "ai-automation";

export interface TimelineLink {
  label: string;
  url: string;
}

export interface TimelineEventImage {
  src: string;
  alt: string;
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
  image?: TimelineEventImage;
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
        "The term software engineering entered mainstream technical discussion at a NATO-sponsored conference in Garmisch, Germany. Teams started treating software work as an engineering discipline with explicit methods and constraints — a direct response to cost overruns and project failures that had come to be known as the 'software crisis.'",
      categories: ["teamwork-process"],
      significance: "major",
      links: [
        {
          label: "NATO 1968 report overview",
          url: "https://homepages.cs.ncl.ac.uk/brian.randell/NATO/",
        },
      ],
    },
    // ── NEW: Margaret Hamilton ────────────────────────────────────────────────
    {
      id: "margaret-hamilton-apollo",
      yearDisplay: "1965–1969",
      sortYear: 1967,
      title: "Margaret Hamilton coins 'software engineering' at NASA/MIT",
      description:
        "As director of the Software Engineering Division at MIT's Instrumentation Laboratory, Hamilton led the team that built the on-board flight software for the Apollo Guidance Computer. She deliberately adopted the term 'software engineering' to give the discipline the same legitimacy as hardware engineering — at the time considered a radical idea. Her software's priority-driven error recovery system famously saved the Apollo 11 lunar landing when an overloaded computer triggered alarms three minutes before touchdown. Her work established foundational concepts still relevant today: asynchronous software design, priority scheduling, and building systems that fail gracefully.",
      categories: ["teamwork-process", "practices-tools"],
      significance: "major",
      links: [
        {
          label: "NASA profile: Margaret Hamilton",
          url: "https://science.nasa.gov/people/margaret-hamilton/",
        },
        {
          label: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)",
        },
      ],
      // Public domain NASA/Draper Lab photo via Wikimedia Commons
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg",
        alt: "Margaret Hamilton standing next to the stacked printouts of Apollo Guidance Computer software she and her team wrote, MIT 1969",
      },
    },
    // ─────────────────────────────────────────────────────────────────────────
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
    // ── NEW: Mythical Man Month ───────────────────────────────────────────────
    {
      id: "mythical-man-month",
      yearDisplay: "1975",
      sortYear: 1975,
      title: "The Mythical Man Month — Brooks' Law",
      description:
        "Fred Brooks published his influential collection of essays on software project management, drawing on his experience leading IBM's OS/360 project. The central insight — that adding people to a late software project makes it later — became known as Brooks' Law. His observation that software has no 'silver bullet' for productivity gains still resonates. The book is required reading for understanding why team coordination overhead grows non-linearly, a lesson your second multi-team project makes viscerally real.",
      categories: ["teamwork-process"],
      significance: "major",
      links: [
        {
          label: "The Mythical Man-Month (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
        },
      ],
    },
    // ── NEW: Fagan Code Inspections ───────────────────────────────────────────
    // ── NEW: Boehm — Cost of Defects ─────────────────────────────────────────
    {
      id: "boehm-cost-of-defects",
      yearDisplay: "1976–1981",
      sortYear: 1976,
      title:
        "Boehm's cost-of-defects curve — the earlier you catch it, the cheaper",
      description:
        "Barry Boehm published empirical data showing that the cost of fixing a software defect rises sharply — and non-linearly — the later in the development lifecycle it is discovered. Formalized in his 1981 book 'Software Engineering Economics,' the finding produced the now-famous multiplier table: a defect costs roughly 1x to fix during requirements, ~5x in design, ~10x during coding, ~20x in testing, and potentially 100x or more once the software is in production. This gave the software engineering community its first rigorous economic argument for practices like code review, testing, and pair programming — not as quality rituals but as cost reduction strategies. It's also the empirical foundation underlying CI/CD pipelines and the DevOps push to shrink the feedback loop to minutes rather than months. Note: later research, including DORA's State of DevOps studies, has complicated the exact multipliers for iterative teams where production cycles are short, but the directional argument remains sound.",
      categories: ["practices-tools", "teamwork-process"],
      significance: "major",
      links: [
        {
          label: "Software Engineering Economics (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Software_Engineering_Economics",
        },
        {
          label: "Barry Boehm (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Barry_Boehm",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "fagan-inspections",
      yearDisplay: "1976",
      sortYear: 1976,
      title: "Fagan Code Inspections — peer review becomes a discipline",
      description:
        "Michael Fagan at IBM formalized code inspection as a repeatable, measurable process — the direct ancestor of today's pull request review. His research showed that structured peer review caught defects far earlier and more cheaply than testing alone, and that the process itself could be measured and improved. This work established the intellectual foundation for making code review a first-class engineering activity rather than an ad-hoc check, a principle baked into modern Git-based workflows.",
      categories: ["practices-tools", "teamwork-process"],
      significance: "notable",
      links: [
        {
          label: "Fagan inspection (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Fagan_inspection",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
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
    // ── NEW: SEI & Watts Humphrey ─────────────────────────────────────────────
    {
      id: "sei-humphrey-cmm",
      yearDisplay: "1984–1991",
      sortYear: 1984,
      title: "SEI founded; Watts Humphrey introduces the CMM",
      description:
        "The Software Engineering Institute was established at Carnegie Mellon in 1984 as a federally funded research center. Watts Humphrey founded its Software Process Program and introduced the Capability Maturity Model (CMM) — a five-level framework for assessing and improving how organizations develop software. CMM became the basis for US government evaluation of software contractors and drove widespread adoption of documented processes. Humphrey later extended this thinking to individuals and small teams through the Personal Software Process (PSP) and Team Software Process (TSP), recognizing that process maturity had to be internalized at every level, not just imposed from above.",
      categories: ["teamwork-process", "practices-tools"],
      significance: "major",
      links: [
        {
          label: "Software Engineering Institute",
          url: "https://www.sei.cmu.edu/",
        },
        {
          label: "Watts Humphrey (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Watts_Humphrey",
        },
      ],
    },
    // ── NEW: Boehm's Spiral Model ─────────────────────────────────────────────
    {
      id: "boehm-spiral-model",
      yearDisplay: "1986",
      sortYear: 1986,
      title: "Boehm's Spiral Model — risk-driven iterative development",
      description:
        "Barry Boehm published his Spiral Model as a direct reaction to the failures of pure Waterfall development. Rather than treating requirements as fixed, the Spiral Model placed risk assessment at the center of each iteration: teams would plan, build a small increment, evaluate risks, and decide whether to continue. This was one of the first mainstream process models to embrace iteration and incremental delivery as first-class concepts — a crucial stepping stone toward the Agile movement. The contrast between a Waterfall Gantt chart and the Spiral is still one of the clearest ways to explain why Agile exists.",
      categories: ["teamwork-process", "practices-tools"],
      significance: "major",
      links: [
        {
          label: "Spiral Model (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Spiral_model",
        },
        {
          label: "Boehm's 1986 paper (IEEE)",
          url: "https://ieeexplore.ieee.org/document/4798311",
        },
      ],
      // Widely reproduced public-domain diagram of the spiral
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Spiral_model_%28Boehm%2C_1988%29.svg",
        alt: "Boehm's Spiral Model diagram showing the four quadrants of planning, risk analysis, engineering, and evaluation",
      },
    },
    // ── NEW: Gang of Four — Design Patterns ──────────────────────────────────
    {
      id: "gang-of-four-patterns",
      yearDisplay: "1994",
      sortYear: 1994,
      title: "Gang of Four: Design Patterns codifies reusable solutions",
      description:
        "Gamma, Helm, Johnson, and Vlissides published 'Design Patterns: Elements of Reusable Object-Oriented Software,' cataloguing 23 recurring solutions to common software design problems. The book gave teams a shared vocabulary — Observer, Strategy, Composite, Factory, Singleton — that made architectural conversations dramatically more precise. These patterns are not historical curiosities: React's component model is a direct expression of the Composite pattern; its state management libraries lean on Observer; its hooks API uses Strategy. Students writing TypeScript React components are applying GoF patterns daily whether they know it or not.",
      categories: ["practices-tools", "platforms-languages"],
      significance: "major",
      links: [
        {
          label: "Design Patterns (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Design_Patterns",
        },
        {
          label: "Refactoring.Guru — patterns catalog",
          url: "https://refactoring.guru/design-patterns",
        },
      ],
      // Classic book cover is copyrighted; use the clean Wikipedia diagram of the pattern hierarchy instead
    },
    // ─────────────────────────────────────────────────────────────────────────
    // ── NEW: XP & Scrum precursors ────────────────────────────────────────────
    {
      id: "xp-scrum-precursors",
      yearDisplay: "1995–1999",
      sortYear: 1995,
      title: "Scrum and Extreme Programming emerge",
      description:
        "Before the Agile Manifesto was signed, practitioners were already converging on its ideas from different directions. Jeff Sutherland and Ken Schwaber formalized Scrum in 1995 — built around fixed-length sprints, a prioritized backlog, a daily standup, and a retrospective at the end of each cycle. Separately, Kent Beck developed Extreme Programming (XP), which pushed iterative practices further with pair programming, test-driven development, continuous integration, and frequent small releases. Both traditions fed directly into the 2001 manifesto and remain the most widely practiced Agile methodologies in industry today.",
      categories: ["teamwork-process", "practices-tools"],
      significance: "major",
      links: [
        {
          label: "Scrum (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Scrum_(software_development)",
        },
        {
          label: "Extreme Programming (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/Extreme_programming",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "agile-manifesto",
      yearDisplay: "2001",
      sortYear: 2001,
      title: "Agile Manifesto reorients delivery",
      description:
        "The Agile Manifesto encouraged shorter feedback cycles, retrospectives, and stronger collaboration with stakeholders. Planning became iterative instead of assuming fixed long-term requirements.",
      categories: ["teamwork-process"],
      significance: "major",
      links: [
        {
          label: "Agile Manifesto",
          url: "https://agilemanifesto.org/",
        },
      ],
      image: {
        src: "https://agilemanifesto.org/background.jpg",
        alt: "Agile Manifesto signatories at Snowbird",
      },
    },
    {
      id: "git-github",
      yearDisplay: "2005–2008",
      sortYear: 2005,
      title: "Git and GitHub modernize collaboration",
      description:
        "Distributed version control made branching and merging practical for more teams. Pull-request workflows improved traceability, review quality, and shared ownership — directly realizing Fagan's 1976 vision of structured peer review at a massive scale.",
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
    // ── NEW: DORA & Accelerate ────────────────────────────────────────────────
    {
      id: "dora-accelerate",
      yearDisplay: "2013–2018",
      sortYear: 2013,
      title: "DORA & Accelerate — empirical metrics for delivery performance",
      description:
        "The State of DevOps research program — started by Puppet in 2013 with Gene Kim and Jez Humble, then supercharged when Dr. Nicole Forsgren joined as a researcher — produced the first large-scale empirical study of what actually predicts software delivery performance. Forsgren, Humble, and Kim formalized their findings in the 2018 book 'Accelerate,' which defined four key metrics (Deployment Frequency, Lead Time for Changes, Mean Time to Recovery, and Change Failure Rate) as reliable predictors of both technical and organizational outcomes. The research drew on survey data from tens of thousands of professionals across industries and showed that high-performing teams deploy far more frequently and recover far faster than low performers — while maintaining equal or better stability. DORA became an independent company in 2015 and was acquired by Google in 2019. This work is the modern empirical answer to Boehm's 1976 cost-of-defects curve: rather than estimating the cost of a late bug in theory, DORA measured what delivery behaviors actually correlate with performance in practice.",
      categories: ["teamwork-process", "practices-tools"],
      significance: "major",
      links: [
        {
          label: "Accelerate (book)",
          url: "https://itrevolution.com/product/accelerate/",
        },
        {
          label: "DORA research program",
          url: "https://dora.dev/",
        },
        {
          label: "DORA (Wikipedia)",
          url: "https://en.wikipedia.org/wiki/DevOps_Research_and_Assessment",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "ai-code-assistants",
      yearDisplay: "2022+",
      sortYear: 2022,
      title: "AI coding assistants enter everyday workflows",
      description:
        "Generative AI tools changed how engineers draft code, tests, and documentation. Teams now need explicit review standards and governance for AI-assisted output — echoing Fagan's original insight that review processes must be intentional and structured to be effective.",
      categories: ["ai-automation", "teamwork-process", "practices-tools"],
      significance: "major",
    },
    // ── NEW: McKinney — The Mythical Agent-Month ──────────────────────────────
    {
      id: "mythical-agent-month",
      yearDisplay: "2025",
      sortYear: 2025,
      title: "The Mythical Agent-Month — Brooks' Law meets agentic AI",
      description:
        "Wes McKinney (creator of pandas) revisited Brooks' Law in light of AI coding agents and asked the obvious question: if you can spin up unlimited parallel agent sessions, do the old constraints disappear? His answer is a sharp no — and the reasoning maps directly back to Brooks. Agents eliminate the labor bottleneck but leave essential complexity completely untouched: the hard design decisions, the conceptual integrity of the system, the judgment about what to build and what to leave out. Worse, agents introduce a new threat — 'technical debt at machine speed,' generating bloated, overwrought codebases that eventually choke further agent progress (the 'brownfield barrier' around 100k lines). McKinney's conclusion: design taste and product scoping are now the binding constraints, more than ever. The developers who thrive won't be those running the most parallel sessions — they'll be the ones who can hold the system's conceptual model in their heads and exercise taste over enormous volumes of output.",
      categories: ["ai-automation", "teamwork-process"],
      significance: "major",
      links: [
        {
          label: "The Mythical Agent-Month — Wes McKinney",
          url: "https://wesmckinney.com/blog/mythical-agent-month/",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
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
