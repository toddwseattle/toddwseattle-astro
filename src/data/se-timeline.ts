export type TimelineCategory =
  | "practices-tools"
  | "teamwork-process"
  | "platforms-languages"
  | "ai-automation"
  | "platforms"
  | "devices"
  | "strategy"
  | "market"
  | "startups";

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
  key: "software-engineering-history" | "smartphone-revolution";
  title: string;
  subtitle: string;
  framing: string;
  categoryOrder: TimelineCategory[];
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
  platforms: {
    label: "Platforms & Ecosystems",
    pillClassName:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
  devices: {
    label: "Devices",
    pillClassName:
      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  },
  strategy: {
    label: "Corporate Strategy",
    pillClassName:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  market: {
    label: "Market Shifts",
    pillClassName:
      "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  },
  startups: {
    label: "Startups & New Entrants",
    pillClassName:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
};

const softwareEngineeringHistoryTimeline: TimelineConfig = {
  key: "software-engineering-history",
  title: "Software Engineering History Timeline",
  subtitle: "How software engineering practices, tools, and teamwork evolved",
  framing:
    "Use this timeline to connect technical changes with the way teams organize work. Filter by category to focus class discussions.",
  categoryOrder: [
    "practices-tools",
    "teamwork-process",
    "platforms-languages",
    "ai-automation",
  ],
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

const smartphoneRevolutionTimeline: TimelineConfig = {
  key: "smartphone-revolution",
  title: "The Smartphone Revolution",
  subtitle: "How an industry was disrupted in a decade (2004–2015)",
  framing:
    "How did incumbents with dominant market share, deep engineering talent, and massive distribution lose to new entrants — and what does the pattern teach us about recognizing and responding to platform shifts?",
  categoryOrder: ["platforms", "devices", "strategy", "market", "startups"],
  events: [
    {
      id: "motorola-razr-v3",
      yearDisplay: "2004",
      sortYear: 2004,
      title: "Motorola RAZR V3 launches",
      description:
        "The RAZR became the best-selling clamshell phone in history, moving over 130 million units. Designed by Jim Wicks, it represented the peak of the feature-phone industrial design era. Its massive commercial success arguably made Motorola complacent about the platform shift that was coming — a textbook case of the innovator's dilemma at the product level.",
      categories: ["devices", "market"],
      significance: "major",
      links: [
        {
          label: "Wikipedia — Motorola Razr V3",
          url: "https://en.wikipedia.org/wiki/Motorola_Razr",
        },
      ],
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/88/Motorola_RAZR_V3-4899.jpg",
        alt: "Motorola RAZR V3 flip phone, open position, showing the slim profile that defined the feature phone era",
      },
    },
    {
      id: "google-acquires-android",
      yearDisplay: "2005",
      sortYear: 2005,
      title: "Google acquires Android Inc.",
      description:
        "Google purchased Andy Rubin's startup for roughly $50 million. Rubin had previously co-founded Danger Inc. (maker of the T-Mobile Sidekick) and left in 2003 to start Android — a decision whose significance would become painfully clear when Microsoft acquired Danger three years later. The Android team had originally been building an OS for digital cameras, but pivoted to mobile phones before the acquisition closed. Almost nobody outside Google noticed the deal at the time — a reminder that platform shifts often begin as footnotes.",
      categories: ["platforms", "strategy"],
      isToolingSpine: true,
      significance: "major",
      links: [
        {
          label: "Wikipedia — Android acquisition history",
          url: "https://en.wikipedia.org/wiki/Android_(operating_system)#History",
        },
      ],
    },
    {
      id: "blackberry-enterprise-dominance",
      yearDisplay: "2005",
      sortYear: 2005,
      title: "BlackBerry dominates enterprise mobile",
      description:
        "RIM's push-email and physical keyboard made BlackBerry the default business smartphone. The term 'CrackBerry' entered the lexicon, and the device was ubiquitous in boardrooms, trading floors, and government offices. BlackBerry's grip on enterprise users would prove both its greatest strength and the reason it was slow to pivot toward consumer-oriented touchscreen devices.",
      categories: ["devices", "market"],
      significance: "notable",
    },
    {
      id: "nokia-40pct-market-share",
      yearDisplay: "2006",
      sortYear: 2006,
      title: "Nokia commands ~40% global handset market share",
      description:
        "Nokia's revenue peaks near €41 billion. Symbian OS powers most of the world's smartphones. Nokia is seen as untouchable — a position that looks strikingly different when you read their FY 2007 20-F filing, which radiates confidence about the future of Symbian. The 20-F (not a 10-K, because Nokia is a Finnish foreign private issuer) is a key 'before' document for understanding what disruption looks like from the inside before it arrives.",
      categories: ["market", "strategy"],
      significance: "major",
      links: [
        {
          label: "Nokia 20-F (FY 2007) — SEC EDGAR",
          url: "https://www.sec.gov/Archives/edgar/data/924613/000110465908019905/a08-4391_120f.htm",
        },
      ],
    },
    {
      id: "qualcomm-early-chipsets",
      yearDisplay: "2006",
      sortYear: 2006,
      title: "Qualcomm ships early smartphone chipsets",
      description:
        "Qualcomm's CDMA and WCDMA modem leadership positioned it as the behind-the-scenes enabler of mobile broadband. While the consumer-facing drama would play out between Apple, Google, and Nokia, Qualcomm was the 'picks and shovels' company that supplied infrastructure to nearly everyone — a strategic archetype worth studying in any platform shift.",
      categories: ["market"],
      significance: "notable",
    },
    {
      id: "iphone-unveiled-macworld",
      yearDisplay: "2007",
      sortYear: 2007,
      title: "Steve Jobs unveils the iPhone at Macworld",
      description:
        "On January 9, Jobs walked the Macworld audience through his famous setup: 'An iPod, a phone, an internet communicator… these are not three separate devices.' The capacitive multi-touch screen, the absence of a stylus and physical keyboard, and the full desktop-class web browser were all radical departures from existing smartphones. Industry skeptics were everywhere — and spectacularly wrong.",
      categories: ["devices", "platforms"],
      isToolingSpine: true,
      significance: "major",
      links: [
        {
          label: "Full Macworld 2007 Keynote (80 min) — Internet Archive",
          url: "https://archive.org/details/youtube-VQKMoT-6XSg",
        },
        {
          label: "Annotated keynote transcript — European Rhetoric",
          url: "http://www.european-rhetoric.com/analyses/ikeynote-analysis-iphone/transcript-2007/",
        },
      ],
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Steve_Jobs_presents_iPhone.jpg",
        alt: "Steve Jobs holding the original iPhone on stage at Macworld 2007",
      },
    },
    {
      id: "ballmer-laughs-at-iphone",
      yearDisplay: "2007",
      sortYear: 2007,
      title: "Steve Ballmer laughs at the iPhone",
      description:
        "In a CNBC interview, Microsoft's CEO dismissed the iPhone: '$500 fully subsidized with a plan! It doesn't appeal to business customers because it doesn't have a keyboard.' Internally, the reaction was very different — the Windows Mobile team was scared. Microsoft had two divergent product lines: keypad-driven 'Smartphone' devices (like the Samsung BlackJack) and stylus-driven touchscreen Pocket PC Phone Edition devices (like Palm's WM handsets). Both were selling well — WM was briefly outselling BlackBerry — but the iPhone showed that the answer was neither of those form factors. Ballmer's public dismissal masked a genuine internal strategic crisis.",
      categories: ["strategy"],
      significance: "major",
      links: [
        {
          label: "Fortune — 'That time Steve Ballmer laughed at the iPhone'",
          url: "https://fortune.com/2017/01/10/steve-ballmer-apple-iphone/",
        },
      ],
    },
    {
      id: "iphone-att-exclusive-launch",
      yearDisplay: "2007",
      sortYear: 2007,
      title: "iPhone launches exclusively on AT&T",
      description:
        "At $499/$599, the iPhone sold 270,000 units on its opening weekend despite being 2G-only with no App Store, no copy-paste, and no MMS. The exclusive carrier deal reshaped AT&T's subscriber growth — and strained its network to the breaking point. AT&T's FY 2008 10-K captures the full year of exclusivity effects, including the early signs of the data-hungry user problem that would define carrier economics for a decade.",
      categories: ["devices", "strategy"],
      significance: "major",
      links: [
        {
          label: "AT&T 10-K (FY 2008) — SEC EDGAR",
          url: "https://www.sec.gov/Archives/edgar/data/0000732717/000073271709000007/ye10k08.htm",
        },
      ],
    },
    {
      id: "open-handset-alliance-android-sdk",
      yearDisplay: "2007",
      sortYear: 2007,
      title: "Open Handset Alliance and Android SDK announced",
      description:
        "Google, HTC, Motorola, Qualcomm, T-Mobile and over 30 other companies formed the Open Handset Alliance on November 5. Android would be open source — a fundamentally different strategic bet than Apple's closed ecosystem. The announcement gave OEMs a credible touchscreen platform to rally around, even before a single Android phone shipped.",
      categories: ["platforms", "strategy"],
      isToolingSpine: true,
      significance: "major",
      links: [
        {
          label: "Open Handset Alliance press release",
          url: "https://www.openhandsetalliance.com/press_110507.html",
        },
      ],
    },
    {
      id: "windows-mobile-6",
      yearDisplay: "2007",
      sortYear: 2007,
      title: "Windows Mobile 6 released — two platforms, one problem",
      description:
        "Windows Mobile shipped as two distinct product lines: 'Smartphone' (keypad-driven devices like the Samsung BlackJack) and 'Pocket PC Phone Edition' (stylus-driven touchscreen devices). Both were selling — WM handsets briefly outsold BlackBerry. But the iPhone revealed that the future was neither keypad nor stylus: it was capacitive finger touch on a converged device. Responding meant simultaneously merging two platform codebases and making the resistive-to-capacitive hardware transition — a combination that made the pivot extraordinarily expensive and ultimately led to scrapping everything for Windows Phone 7.",
      categories: ["platforms", "devices", "strategy"],
      significance: "major",
    },
    {
      id: "nokia-dismisses-iphone",
      yearDisplay: "2007",
      sortYear: 2007,
      title: "Nokia leadership dismisses iPhone threat",
      description:
        "Nokia publicly called the iPhone a niche product. Internally, the response focused on adding touch to Symbian rather than a clean-sheet redesign. This is the innovator's dilemma playing out in real time: Nokia had the engineers, the manufacturing scale, and the brand — but the organizational incentives all pointed toward protecting the existing platform rather than cannibalizing it.",
      categories: ["strategy"],
      significance: "notable",
    },
    {
      id: "garrett-camp-ubercab-concept",
      yearDisplay: "2008",
      sortYear: 2008,
      title: "Garrett Camp conceives UberCab",
      description:
        "After spending $800 on a private driver on New Year's Eve, Garrett Camp began sketching a black-car-on-demand service. The original pitch deck explicitly cited smartphone penetration statistics as a market enabler — GPS, mobile payments, and always-on connectivity were preconditions that only existed because of the device disruption already underway. Uber is the 'born from smartphones' company in this timeline.",
      categories: ["startups"],
      significance: "major",
      links: [
        {
          label:
            "Garrett Camp — 'The Beginning of Uber' (Medium, with original deck)",
          url: "https://medium.com/@gc/the-beginning-of-uber-7fb17e544851",
        },
      ],
    },
    {
      id: "microsoft-acquires-danger",
      yearDisplay: "2008",
      sortYear: 2008,
      title: "Microsoft acquires Danger Inc. for ~$500 million",
      description:
        "Microsoft bought the maker of the T-Mobile Sidekick — the company Andy Rubin had co-founded in 1999 and left in 2003 to start Android. Google had acquired Rubin's second company for $50 million three years earlier. Microsoft paid ten times as much for the company Rubin left behind. The Danger acquisition was meant to jumpstart a consumer phone effort (Project Pink), but it produced the Microsoft Kin — a social phone launched in May 2010 and killed after just 48 days on the market, at a total cost approaching $1 billion.",
      categories: ["strategy"],
      significance: "major",
      links: [
        {
          label: "Wikipedia — Danger, Inc.",
          url: "https://en.wikipedia.org/wiki/Danger,_Inc.",
        },
        {
          label:
            "Engadget — 'Life and death of Microsoft Kin: the inside story'",
          url: "https://www.engadget.com/2010-07-02-life-and-death-of-microsoft-kin-the-inside-story.html",
        },
      ],
    },
    {
      id: "app-store-launches-iphone-3g",
      yearDisplay: "2008",
      sortYear: 2008,
      title: "App Store launches with iPhone 3G",
      description:
        "The App Store opened on July 11 with 500 apps. Apple's 70/30 revenue split became the industry model. This is the moment the iPhone shifted from product to platform — third-party developers became the killer feature.",
      categories: ["platforms", "market"],
      isToolingSpine: true,
      significance: "major",
      links: [
        {
          label: "Apple 10-K filings — SEC EDGAR",
          url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=10-K&dateb=&owner=include&count=40",
        },
      ],
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/IPhone_3G.png",
        alt: "Apple iPhone 3G, the first iPhone with App Store support and 3G connectivity",
      },
    },
    {
      id: "htc-dream-first-android-phone",
      yearDisplay: "2008",
      sortYear: 2008,
      title: "First Android phone: HTC Dream (T-Mobile G1)",
      description:
        "The G1 shipped in September with a hardware keyboard, trackball, and Android 1.0. It was rough but functional, with Google Maps, Gmail, and YouTube built in. The device mattered less than the proof of concept: a viable open-source alternative to iOS existed, and OEMs could build on it without paying Microsoft-style licensing fees.",
      categories: ["devices", "platforms"],
      significance: "major",
      links: [
        {
          label: "Wikipedia — HTC Dream",
          url: "https://en.wikipedia.org/wiki/HTC_Dream",
        },
      ],
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/HTC_Dream_Orange_FR.jpeg",
        alt: "HTC Dream (T-Mobile G1) with slide-out keyboard, the first commercially available Android phone",
      },
    },
    {
      id: "blackberry-storm-touchscreen",
      yearDisplay: "2008",
      sortYear: 2008,
      title: "BlackBerry Storm launches — first touchscreen BlackBerry",
      description:
        "RIM's answer to the iPhone used a 'SurePress' clickable touchscreen that was widely panned by reviewers and users. Returns exceeded sales at some carriers. The Storm illustrates the difficulty of grafting new interaction paradigms onto an organization optimized for a different one.",
      categories: ["devices", "strategy"],
      significance: "notable",
    },
    {
      id: "uber-incorporated",
      yearDisplay: "2009",
      sortYear: 2009,
      title: "Uber incorporated in San Francisco",
      description:
        "Travis Kalanick joined as co-founder. The company was originally a luxury black car service, not the mass-market ride-sharing platform it would become. Uber's S-1 (filed April 2019) contains a detailed founding narrative and explains how smartphone-enabled GPS and mobile payments made the entire model possible.",
      categories: ["startups"],
      significance: "notable",
      links: [
        {
          label: "Uber S-1 (April 2019) — SEC EDGAR",
          url: "https://www.sec.gov/Archives/edgar/data/1543151/000119312519103850/d647752ds1.htm",
        },
      ],
    },
    {
      id: "palm-pre-webos-launch",
      yearDisplay: "2009",
      sortYear: 2009,
      title: "Palm Pre launches with webOS",
      description:
        "webOS introduced card-based multitasking, gesture navigation, and unified notifications — UX innovations that iOS and Android would both eventually adopt. But Palm lacked the ecosystem, developer community, and financial resources to compete at platform scale. Acquired by HP in 2010 for $1.2 billion. webOS remains a cautionary tale about the gap between great product design and platform economics.",
      categories: ["platforms", "devices"],
      significance: "notable",
    },
    {
      id: "motorola-droid-verizon",
      yearDisplay: "2009",
      sortYear: 2009,
      title: "Motorola Droid launches on Verizon",
      description:
        "The 'iDon't' ad campaign attacked the iPhone directly. The Droid was the first major Android hit and saved Motorola's mobile division from irrelevance. Critically, Verizon's aggressive backing of Android — born from not having the iPhone — accelerated the platform's growth. Carrier incentives shaped platform adoption as much as product quality did.",
      categories: ["devices", "strategy"],
      significance: "major",
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Motorola-Droid.jpg",
        alt: "Motorola Droid with slide-out keyboard, the first major commercial Android hit on Verizon",
      },
    },
    {
      id: "ipad-launches",
      yearDisplay: "2010",
      sortYear: 2010,
      title: "iPad launches, creating the tablet category",
      description:
        "Apple sold 300,000 iPads on day one. The iPad extended the iOS app ecosystem into a new form factor and lent credibility to Jobs's 'post-PC' thesis. It also demonstrated that once you own a platform and a developer community, new hardware categories become much cheaper to enter.",
      categories: ["devices", "platforms"],
      significance: "notable",
    },
    {
      id: "ubercab-sf-launch",
      yearDisplay: "2010",
      sortYear: 2010,
      title: "UberCab launches in San Francisco",
      description:
        "Black town cars hailed via a smartphone app. $25 minimum fare. Early users were tech workers and VCs willing to pay a premium for reliability. The service depended entirely on smartphone penetration among both riders and drivers — it literally could not have existed before the iPhone.",
      categories: ["startups"],
      significance: "major",
    },
    {
      id: "windows-phone-7-launch",
      yearDisplay: "2010",
      sortYear: 2010,
      title: "Windows Phone 7 launches",
      description:
        "A clean break from Windows Mobile. The Metro UI was praised for design innovation, but the phone arrived late to market with a sparse app ecosystem and limited hardware partner enthusiasm. The 'reset' was driven by a hard architectural reality: Windows Mobile had forked into two incompatible product lines, and converging them while also transitioning to capacitive touch proved too expensive and slow to do incrementally. Microsoft chose to start from scratch — but starting over meant abandoning the OEM relationships and installed base that had been briefly outselling BlackBerry.",
      categories: ["platforms", "devices", "strategy"],
      significance: "major",
    },
    {
      id: "nokia-smartphone-decline-begins",
      yearDisplay: "2010",
      sortYear: 2010,
      title: "Nokia's smartphone share begins rapid decline",
      description:
        "Symbian touch phones like the N97 and X6 could not match the iOS or Android user experience. Nokia's internal MeeGo project showed promise but progressed too slowly to matter. The window for Nokia to establish a competitive third platform was closing fast.",
      categories: ["market", "strategy"],
      significance: "notable",
    },
    {
      id: "elop-burning-platform-memo",
      yearDisplay: "2011",
      sortYear: 2011,
      title: "Stephen Elop's 'burning platform' memo leaks",
      description:
        "One of the most important internal memos in business history. Nokia's CEO compared the company's position to standing on a burning oil platform where the only option is to jump into freezing water. Two days later, Nokia announced exclusive adoption of Windows Phone, abandoning Symbian and MeeGo. The memo triggered what critics called the 'Elop effect' — a combination of the Ratner effect (publicly attacking your own products) and the Osborne effect (pre-announcing a successor too early). Whether Elop was right to jump to Windows Phone — or whether the memo itself accelerated Nokia's decline — is one of the richest discussion questions in this timeline.",
      categories: ["strategy"],
      isToolingSpine: true,
      significance: "major",
      links: [
        {
          label: "Full 'Burning Platform' memo (PDF)",
          url: "https://sriramk.com/memos/elop-burning-platforms.pdf",
        },
        {
          label: "Engadget — original leak coverage (Feb 8, 2011)",
          url: "https://www.engadget.com/2011-02-08-nokia-ceo-stephen-elop-rallies-troops-in-brutally-honest-burnin.html",
        },
      ],
    },
    {
      id: "verizon-gets-iphone",
      yearDisplay: "2011",
      sortYear: 2011,
      title: "Verizon gets the iPhone, ending AT&T exclusivity",
      description:
        "AT&T lost its most powerful differentiator overnight. The carrier had to pivot toward a broader Android portfolio and massive network investment. For students analyzing AT&T's filings, this is the single most important inflection point in their story — the moment a structural advantage evaporated.",
      categories: ["strategy", "market"],
      significance: "major",
    },
    {
      id: "google-acquires-motorola-mobility",
      yearDisplay: "2011",
      sortYear: 2011,
      title: "Google acquires Motorola Mobility for $12.5 billion",
      description:
        "Primarily a patent portfolio play (17,000 patents), the acquisition sent shockwaves through Android OEM partners worried about Google competing with them directly. Google ultimately sold the hardware business to Lenovo for $2.9 billion in 2014, keeping most of the patents — an effective admission that owning an OEM was a distraction from the platform strategy.",
      categories: ["strategy"],
      significance: "major",
    },
    {
      id: "hp-kills-webos-touchpad",
      yearDisplay: "2011",
      sortYear: 2011,
      title: "HP kills webOS and the TouchPad after 49 days",
      description:
        "HP discontinued the TouchPad tablet just 49 days after its launch. A fire sale at $99 created a brief consumer frenzy. Combined with Palm Pre's failure, this is the definitive data point on why great product design alone cannot overcome an ecosystem deficit.",
      categories: ["platforms", "strategy"],
      significance: "notable",
    },
    {
      id: "steve-jobs-dies",
      yearDisplay: "2011",
      sortYear: 2011,
      title: "Steve Jobs dies",
      description:
        "Tim Cook took over as CEO on October 5. Jobs's final product launch — the iPhone 4S with Siri — carried his imprint. The transition from a visionary founder to an operational leader is itself a case study in corporate continuity, and Apple's sustained success under Cook became evidence that the platform and ecosystem mattered more than any individual.",
      categories: ["strategy"],
      significance: "major",
      image: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Steve_Jobs_Headshot_2010-CROP.jpg",
        alt: "Steve Jobs portrait, 2010, the year before his death",
      },
    },
    {
      id: "android-75pct-market-share",
      yearDisplay: "2012",
      sortYear: 2012,
      title: "Android reaches 75% global smartphone market share",
      description:
        "Led by Samsung's Galaxy S III, Android won the volume game decisively. But iOS retained a disproportionate share of industry profits and app developer revenue — an asymmetry that persists to this day. This split between unit share and profit share is one of the most instructive dynamics in platform economics.",
      categories: ["market", "platforms"],
      significance: "major",
    },
    {
      id: "blackberry-delays-bb10",
      yearDisplay: "2012",
      sortYear: 2012,
      title: "BlackBerry delays BB10 OS repeatedly",
      description:
        "Originally promised for early 2012, BB10 slipped multiple times. The company hemorrhaged market share while waiting for its Hail Mary. Each delay compounded the developer exodus. By the time BB10 shipped, the two-platform lock-in of iOS and Android was essentially irreversible.",
      categories: ["platforms", "strategy"],
      significance: "notable",
    },
    {
      id: "blackberry-z10-launches",
      yearDisplay: "2013",
      sortYear: 2013,
      title: "BlackBerry Z10 launches; company renames to BlackBerry",
      description:
        "The modern touchscreen BlackBerry arrived years too late. Sales disappointed massively, leading to a $1 billion inventory writedown. The company dropped 'Research In Motion' from its name in a rebranding attempt.",
      categories: ["devices", "strategy"],
      significance: "notable",
    },
    {
      id: "microsoft-acquires-nokia-phones",
      yearDisplay: "2013",
      sortYear: 2013,
      title: "Microsoft acquires Nokia's phone business for $7.2 billion",
      description:
        "Nokia exited the phone market it had once dominated, retaining its network equipment and mapping divisions. For Microsoft, the deal represented a bet that owning hardware manufacturing could revive Windows Phone. It couldn't. The acquisition is one of the most studied cautionary tales in technology M&A.",
      categories: ["strategy"],
      significance: "major",
    },
    {
      id: "uber-launches-uberx",
      yearDisplay: "2013",
      sortYear: 2013,
      title: "Uber launches UberX — low-cost rides with personal vehicles",
      description:
        "The pivot from luxury black cars to mass-market disruption of the taxi industry. UberX allowed anyone with a qualifying car to become a driver, dramatically expanding supply and lowering prices. This is when Uber became Uber — and when 'Uber for X' became the dominant startup pitch template.",
      categories: ["startups", "market"],
      significance: "major",
    },
    {
      id: "facebook-acquires-whatsapp",
      yearDisplay: "2014",
      sortYear: 2014,
      title: "Facebook acquires WhatsApp for $19 billion",
      description:
        "Mobile messaging became the most valuable app category. The deal validated that smartphones had become the primary computing platform worldwide and that the most important software companies of the smartphone era might not be the platform owners themselves, but the applications that dominated user time and attention.",
      categories: ["market"],
      significance: "major",
    },
    {
      id: "iphone-6-large-screens",
      yearDisplay: "2014",
      sortYear: 2014,
      title: "iPhone 6 and 6 Plus launch with large screens",
      description:
        "Apple finally went big-screen. The launch set records — 10 million units sold on the opening weekend. By adopting larger displays, Apple conceded that Samsung and the Android ecosystem had been right about screen size for years. Sometimes the fast follower wins the format war; sometimes the market leader can afford to wait and still capture the upside.",
      categories: ["devices", "market"],
      significance: "major",
    },
    {
      id: "microsoft-nokia-writedown",
      yearDisplay: "2015",
      sortYear: 2015,
      title: "Microsoft writes down Nokia acquisition — $7.6 billion",
      description:
        "The write-down covered effectively the entire purchase price. Windows Phone market share had fallen below 3%. CEO Satya Nadella pivoted Microsoft toward cloud and services. Bill Gates later called losing to Android his 'greatest mistake ever.' The write-down is the definitive punctuation mark on the Windows Phone story — and a powerful 'after' data point for understanding how disruption ends for the losers.",
      categories: ["strategy", "market"],
      significance: "major",
    },
    {
      id: "blackberry-priv-android",
      yearDisplay: "2015",
      sortYear: 2015,
      title: "BlackBerry Priv launches — first Android BlackBerry",
      description:
        "A physical keyboard married to the Android operating system. The Priv was too little, too late — BlackBerry would exit hardware entirely by 2016. The decision to finally adopt Android validated the platform's dominance but could not overcome BlackBerry's eroded brand and missing app ecosystem. An epilogue to the disruption story.",
      categories: ["devices", "strategy"],
      significance: "notable",
    },
  ],
};

const timelines: Record<TimelineConfig["key"], TimelineConfig> = {
  "software-engineering-history": softwareEngineeringHistoryTimeline,
  "smartphone-revolution": smartphoneRevolutionTimeline,
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
