import type { TimelineConfig } from "./shared";

export const smartphoneRevolutionTimeline: TimelineConfig<"smartphone-revolution"> =
  {
    key: "smartphone-revolution",
    title: "The Smartphone Revolution",
    subtitle: "How an industry was disrupted in a decade (2004–2015)",
    framing:
      "How did incumbents with dominant market share, deep engineering talent, and massive distribution lose to new entrants — and what does the pattern teach us about recognizing and responding to platform shifts?",
    categoryOrder: ["platforms", "devices", "strategy", "market", "startups"],
    eras: [
      {
        id: "analog-era",
        label: "Analog Era",
        startYear: 1973,
        endYear: 1991,
      },
      {
        id: "feature-phone-era",
        label: "Feature Phone Era",
        startYear: 1992,
        endYear: 2006,
      },
      {
        id: "smartphone-disruption",
        label: "Smartphone Disruption",
        startYear: 2007,
        endYear: 2012,
      },
      {
        id: "post-disruption",
        label: "Post-Disruption",
        startYear: 2013,
        endYear: 2016,
      },
    ],
    events: [
      {
        id: "martin-cooper-mobile-call",
        yearDisplay: "1973",
        sortYear: 1973,
        title: "Martin Cooper makes first handheld cellular call",
        description:
          "Motorola engineer Martin Cooper, with designer Rudy Krolopp, completes the DynaTAC prototype and calls a Bell Labs rival from 6th Avenue in New York — the first handheld cellular phone call. The prototype weighs ~1 kg and stands 33 cm tall. Crucially, it required 10 more years of R&D and regulatory work before any commercial product existed. The gap between invention and viable market illustrates how long platform shifts take to materialize.",
        categories: ["devices"],
        significance: "major",
        links: [
          {
            label: "Motorola Solutions: Cell Phone Development History",
            url: "https://www.motorolasolutions.com/en_us/about/history/explore-motorola-heritage/cell-phone-development.html",
          },
        ],
      },
      {
        id: "dynatac-8000x-fcc",
        yearDisplay: "1983",
        sortYear: 1983,
        title: "Motorola DynaTAC 8000X: first commercial cellular phone",
        description:
          "After a 10-year development cycle and $100M investment, the DynaTAC 8000X earns FCC approval (September 21, 1983) and goes on sale at $3,995 (~$12,400 in 2025 dollars). It weighs 790 g, delivers 30 minutes of talk time per 10-hour charge, and stores 30 numbers. The FCC spectrum allocation delay (1968–1983) — not the technology — was the real bottleneck. Motorola's vertically integrated semiconductor and RF expertise gave it first-mover advantage; the brick-phone form factor and keypad interaction model would define the industry for two decades.",
        categories: ["market"],
        significance: "major",
        links: [
          {
            label: "PMI: DynaTAC 8000X Project Case Study",
            url: "https://www.pmi.org/learning/library/top-50-projects-dynatac-8000x-11725",
          },
        ],
        image: {
          src: "https://upload.wikimedia.org/wikipedia/commons/7/74/DynaTAC8000X.jpg",
          alt: "Motorola DynaTAC 8000X — the first commercial handheld cellular phone, 1983",
        },
      },
      {
        id: "motorola-microtac",
        yearDisplay: "1989",
        sortYear: 1989,
        title: "Motorola MicroTAC: clamshell flip form factor emerges",
        description:
          "Motorola's MicroTAC was dramatically smaller and lighter than the DynaTAC, introducing the clamshell flip design that would influence phone design for two decades. It signals that miniaturization — not raw capability — would be the primary competitive lever in the feature phone era. Motorola's continued refinement of analog architecture masked a deeper vulnerability: design excellence optimized for keypad + flip could not easily absorb fundamentally different input paradigms.",
        categories: ["devices"],
        significance: "notable",
      },
      {
        id: "gsm-sms-launch",
        yearDisplay: "1992",
        sortYear: 1992,
        title: "GSM networks launch in Europe; SMS deployed as afterthought",
        description:
          "GSM (Global System for Mobile) networks go live across Europe, standardizing cellular technology across borders. SMS is included as a niche side protocol — carriers initially dismiss it as redundant with voice. By the late 1990s it becomes the killer app, especially among youth. GSM standardization reduced handset vendor switching costs and intensified price competition. SMS illustrates a recurring pattern: the highest-value application of a platform often isn't the one its builders intended.",
        categories: ["platforms", "market"],
        significance: "major",
        links: [
          {
            label: "GSMA: History of Mobile Technology",
            url: "https://www.gsma.com/",
          },
        ],
      },
      {
        id: "arm7tdmi",
        yearDisplay: "1994",
        sortYear: 1994,
        title:
          "Feature Phone Era Begins: ARM7TDMI ships enabling the design of the Nokia 6110",
        description:
          "Mobile phones coalesce around ARM's first mass-market core. The ARM7 provided enough functionality at (performance and low-power consumption for battery life) at an affordable price that when coupled with GSM or CDMA modems (Qualcomm), high quality, all day mobile phones could be built",
        categories: ["platforms"],
        significance: "major",
        links: [
          {
            label: "Arm Newsroom: 200 Billion Chips",
            url: "https://newsroom.arm.com/blog/200bn-arm-chips",
          },
        ],
      },
      // Event 1: Palm Pilot Launch (March 1996)
      {
        id: "palm-pilot-1996",
        yearDisplay: "1996",
        sortYear: 1996,
        title: "Palm Pilot Launches: Stylus-Based Simplicity Wins Market",
        description:
          "Jeff Hawkins, Donna Dubinsky, and Ed Colligan release the Palm Pilot (1000 and 5000 models) in March 1996, priced at $299–$399. Featuring the proprietary Graffiti handwriting recognition system, 16 MHz processor, monochrome touchscreen, and pocket-sized form factor (5.2 x 3.1 x 0.6 inches), the Pilot outsells Apple's Newton within its first 18 months: over 1 million units sold vs. 60,000 MessagePads that year. The success stems from ruthless simplification—Jeff Hawkins famously carried a wooden prototype in his pocket for a week—and focus on practical PIM tasks (calendar, contacts, notes) over multimedia. This becomes the category-defining success in PDAs and sets the strategic template: small, focused, synchronized with the desktop. Palm OS establishes a parallel ecosystem to Windows-based handhelds, proving the market will support multiple simultaneous form factors.",
        categories: ["startups", "devices"],
        significance: "major",
        image: {
          src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Palm_Pilot_Professional_01.JPG",
          alt: "Palm Pilot Professional (1997) - Museum8bits, CC-BY-SA 3.0",
        },
        links: [
          {
            label: "Palm Pilot Wikipedia",
            url: "https://en.wikipedia.org/wiki/Palm_(PDA)",
            description:
              "Full history of Palm computing devices and market impact",
          },
          {
            label: "Jeff Hawkins Oral History",
            url: "https://lemelson.mit.edu/resources/jeff-hawkins",
            description:
              "MIT Lemelson Center interview: design philosophy and market insights",
          },
          {
            label: "PCWorld: Brief History of Palm (1992–1998)",
            url: "https://www.pcworld.com/article/195199/article.html",
            description:
              "Timeline of founders, acquisitions, and product launches",
          },
        ],
      },

      // Event 2: Pocket PC / Windows CE Handhelds Era (1997–2000)
      {
        id: "pocket-pc-windows-ce-1997",
        yearDisplay: "1997–2000",
        sortYear: 1997,
        title:
          "Windows CE Pocket PCs: Dual Architecture Emerges (Hitachi SH-3, Intel StrongARM)",
        description:
          "Hewlett-Packard and Compaq release the first Windows CE–powered Handheld PCs and Pocket PCs, beginning with the HP Jornada 620LX (1997, 75 MHz Hitachi SH-3) and later the HP Jornada 548 (2000, 133 MHz Hitachi SH-3). These stylus-driven, color-screen devices compete directly with Palm OS while maintaining full compatibility with Microsoft Office via ActiveSync. However, they establish a critical architectural fork in the Windows Mobile roadmap: the stylus-based 'Pocket PC' line diverges from the keyboard-driven 'Smartphone' line (e.g., Samsung BlackJack). Both lines sell well—briefly outselling BlackBerry—yet their architectural independence, combined with resistive touchscreen technology, locks Microsoft into a costly dual-platform strategy. When the iPhone arrives in 2007 with capacitive touch and unified interface, converging these two lines AND transitioning the entire stack to capacitive becomes prohibitively expensive, contributing to Microsoft's strategic loss.",
        categories: ["platforms", "devices"],
        significance: "major",
        image: {
          src: "https://upload.wikimedia.org/wikipedia/commons/7/70/HP_Jornada_720.JPG",
          alt: "HP Jornada 720 Handheld PC - CC-BY-SA, Wikimedia Commons",
        },
        links: [
          {
            label: "HP Jornada Wikipedia",
            url: "https://en.wikipedia.org/wiki/HP_Jornada",
            description:
              "Complete line history: processor specs (SH-3, StrongARM), launch dates, and market positioning",
          },
          {
            label: "Hitachi SuperH Architecture Overview",
            url: "https://en.wikipedia.org/wiki/SuperH",
            description:
              "Technical details on SH-3 RISC processor family and use in Pocket PCs and PDAs",
          },
          {
            label: "Windows CE Processor Support",
            url: "https://devblogs.microsoft.com/oldnewthing/20190805-00/?p=102749",
            description:
              "Microsoft's Old New Thing: how Windows CE supported SH-3 and SH-4 architectures",
          },
          {
            label: "HP Jornada 548 Review (First Pocket PC)",
            url: "https://the-gadgeteer.com/2000/08/06/hp_jornada_548_color_pocket_pc_review/",
          },
        ],
      },
      {
        id: "nokia-6110",
        yearDisplay: "1998",
        sortYear: 1998,
        title: "Nokia 6110 launches",
        description:
          "The Nokia 6110 was a blockbuster hit with 130 million units sold, showcasing the potential of ARM-powered feature phones.   a low enabled the design of the Nokia 6110. The Nokia 6110 was a blockbuster hit with 130 million units sold.  The feature phone era was defined by incremental improvements to this basic formula: keypad-driven devices with small screens, limited web access, and a focus on voice and SMS.",
        categories: ["devices", "market"],
        significance: "major",
        links: [
          {
            label: "Wikipedia — Nokia 6110",
            url: "https://en.wikipedia.org/wiki/Nokia_6110",
          },
        ],
        image: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nokia_6110_blue-92107.jpg/250px-Nokia_6110_blue-92107.jpg",
          alt: "Nokia 6110, one of the best-selling feature phones of all time, courtesy of Wikipedia",
        },
      },
      {
        id: "kyocera-vp210-camera-phone",
        yearDisplay: "1999",
        sortYear: 1999,
        title: "Kyocera Visual Phone VP-210: first commercial camera phone",
        description:
          "The Kyocera Visual Phone VP-210, released in Japan in May 1999, became the first commercial phone with a built-in color camera. While inventor Philippe Kahn had soldered together a prototype in the late 1990s, Kyocera's VP-210 marked the first mass-market camera phone. The device required physical connection to a PC to upload photos — the convenience of smartphone-era photo sharing was still years away. Camera phones would become a killer feature during the feature-phone era, especially in Japan and Asia, before reaching Western markets.",
        categories: ["devices"],
        significance: "notable",
        links: [
          {
            label: "Wikipedia — Camera phone",
            url: "https://en.wikipedia.org/wiki/Camera_phone#:~:text=A%20camera%20phone%20is%20a,in%20Japan%20in%20May%201999.",
          },
        ],
      },
      {
        id: "arm926ej-s",
        yearDisplay: "2001",
        sortYear: 2001,
        title: "ARM926EJ-S: first fully synthesizable core with MMU",
        description:
          "ARMv5TEJ architecture. 5-stage pipeline, integrated memory management unit (MMU), hardware Java acceleration, and DSP extensions. The MMU meant ARM could now run full operating systems with virtual memory — a prerequisite for general-purpose computing. Licensed by 100+ silicon vendors and shipped billions of units.",
        categories: ["platforms"],
        isToolingSpine: true,
        significance: "major",
        links: [
          {
            label: "Arm Blog: Brief History Part 2",
            url: "https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/a-brief-history-of-arm-part-2",
          },
        ],
      },
      {
        id: "arm11",
        yearDisplay: "2002",
        sortYear: 2002,
        title: "ARM11 (ARMv6): OS-capable ARM arrives",
        description:
          "Deeper 8-stage pipeline, SIMD media extensions (for audio/video), improved MMU with support for multiple page sizes, and hardware floating point (VFP). ARM11 made ARM genuinely OS-capable — able to run full Linux, Symbian, and later the original iPhone OS. Clock speeds reached 600+ MHz at well under a watt.",
        categories: ["platforms"],
        isToolingSpine: true,
        significance: "major",
        links: [
          {
            label: "Wikipedia — ARM11",
            url: "https://en.wikipedia.org/wiki/ARM11",
          },
        ],
      },
      {
        id: "arm-1b-cumulative",
        yearDisplay: "2002",
        sortYear: 2002.5,
        title: "ARM passes 1 billion cumulative chips shipped",
        description:
          "Arm partners crossed the 1 billion cumulative chip milestone. At this point ARM was primarily in feature phones and embedded controllers — invisible to the PC industry. Intel's x86 shipped ~142M PCs that year.",
        categories: ["market"],
        significance: "notable",
        links: [
          {
            label: "Arm Newsroom: 200 Billion Chips",
            url: "https://newsroom.arm.com/blog/200bn-arm-chips",
          },
        ],
      },
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
        links: [
          {
            label: "Wikipedia — BlackBerry",
            url: "https://en.wikipedia.org/wiki/BlackBerry",
          },
        ],
        image: {
          alt: "BlackBerry 8700 series, the dominant enterprise smartphone of the mid-2000s",
          src: "https://upload.wikimedia.org/wikipedia/commons/8/83/Bb-curve-8520%281%29.jpg",
        },
      },
      {
        id: "cortex-a8",
        yearDisplay: "2005",
        sortYear: 2005,
        title: "Cortex-A8 (ARMv7): ARM becomes PC-capable",
        description:
          "The inflection point. First superscalar ARM core — dual-issue, in-order pipeline targeting 600 MHz–1 GHz+ at under 1 watt. Included NEON SIMD for media/DSP, full VFPv3 floating point, and TrustZone security. Delivered PC-class compute at a fraction of x86 power. Many skeptics said mobile users would never want to browse the web on their phones. Powered iPhone 3GS, BeagleBoard, Kindle, TI OMAP3.",
        categories: ["platforms"],
        isToolingSpine: true,
        significance: "major",
        links: [
          {
            label: "Arm Newsroom: Cortex-A8 skeptics",
            url: "https://newsroom.arm.com/blog/200bn-arm-chips",
          },
        ],
      },
      {
        id: "arm-98pct-phones",
        yearDisplay: "2005",
        sortYear: 2005.5,
        title: "ARM inside 98% of all mobile phones sold",
        description:
          "By 2005, ARM's dominance in mobile was near-total: 98% of all mobile phones sold worldwide contained at least one ARM processor. At ~820M phones shipped that year, ARM was already outselling the PC market ~4:1 in units — but the industry barely noticed because these were 'just phones.'",
        categories: ["market"],
        significance: "major",
        links: [
          {
            label: "Arm Newsroom: 200 Billion Chips",
            url: "https://newsroom.arm.com/blog/200bn-arm-chips",
          },
        ],
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
        image: {
          alt: "Various Mid 00's Nokia phones, illustrating the design language that dominated the pre-smartphone era, courtesy of wikipedia",
          src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Nokia_mobile_phones.jpg",
        },
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
        links: [
          {
            label: "Qualcomm 10-K (FY 2009) — SEC EDGAR",
            url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=804328&type=10-K&dateb=&owner=include&count=10",
          },
        ],
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
          src: "https://upload.wikimedia.org/wikipedia/commons/6/67/Steve_Jobs_Headshot_2010.JPG",
          alt: "Steve Jobs holding the original iPhone on stage at Macworld 2007 Matthew Yohe at en.wikipedia, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
        },
      },
      {
        id: "ballmer-laughs-at-iphone",
        yearDisplay: "2007",
        sortYear: 2007,
        title: "Steve Ballmer laughs at the iPhone",
        description:
          "In a CNBC interview, Microsoft's CEO dismissed the iPhone: '$500 fully subsidized with a plan! It doesn't appeal to business customers because it doesn't have a keyboard.' Internally, the reaction was very different — the Windows Mobile team was scared. Microsoft had two divergent product lines: keypad-driven 'Smartphone' devices (like the Samsung BlackJack and stylus-driven touchscreen Pocket PC Phone Edition devices (like [Palm's Treo 700w](https://en.wikipedia.org/wiki/Treo_700w) handsets). Both were selling well — WM was briefly outselling BlackBerry — but the iPhone showed that the answer was neither of those form factors. Ballmer's public dismissal masked a genuine internal strategic crisis.",
        categories: ["strategy"],
        significance: "major",
        image: {
          src: "https://fortune.com/img-assets/wp-content/uploads/2014/10/453792926.jpg?format=webp&w=576&q=100",
          alt: "Steve Ballmer in 2010, courtesy of Fortune",
        },
        links: [
          {
            label: "Fortune — 'That time Steve Ballmer laughed at the iPhone'",
            url: "https://fortune.com/2017/01/10/steve-ballmer-apple-iphone/",
          },
          {
            label: "CNBC interview clip (reddit)",
            url: "https://www.reddit.com/r/StockMarket/comments/pkwk4d/steve_ballmer_ex_ceo_of_microsoft_laughs_at_iphone/",
          },
          {
            label: "Samsung BlackJack — Wikipedia",
            url: "https://en.wikipedia.org/wiki/Samsung_BlackJack",
          },
          {
            label: "Palm Treo 700w - Wikipedia",
            url: "https://en.wikipedia.org/wiki/Treo_700w",
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
          "Windows Mobile shipped as two distinct product lines: 'Smartphone' (keypad-driven devices like the Samsung BlackJack II) and 'Pocket PC Phone Edition' (stylus-driven touchscreen devices). Both were selling — WM handsets briefly outsold BlackBerry. But the iPhone revealed that the future was neither keypad nor stylus: it was capacitive finger touch on a converged device. Responding meant simultaneously merging two platform codebases and making the resistive-to-capacitive hardware transition — a combination that made the pivot extraordinarily expensive and ultimately led to scrapping everything for Windows Phone 7.",
        categories: ["platforms", "devices", "strategy"],
        significance: "major",
        links: [
          {
            label: "Wikipedia — Windows Mobile",
            url: "https://en.wikipedia.org/wiki/Windows_Mobile",
          },
          {
            label: "Microsoft Press Release — Windows Mobile 6 (Feb 12, 2007)",
            url: "https://news.microsoft.com/source/2007/02/11/microsoft-reveals-new-windows-mobile-6-smartphone-software-improves-worlds-fastest-growing-mobile-operating-system/",
          },
        ],
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
        links: [
          {
            label: "Nokia 20-F (FY 2007) — SEC EDGAR",
            url: "https://www.sec.gov/Archives/edgar/data/924613/000110465908019905/a08-4391_120f.htm",
          },
        ],
      },
      {
        id: "iphone-2007",
        yearDisplay: "2007",
        sortYear: 2007,
        title: "Apple iPhone launches (ARM11-based)",
        description:
          "The original iPhone used a Samsung ARM1176JZF-S (ARM11, ARMv6) at 412 MHz. Despite not yet using the newer Cortex-A architecture, it redefined what a phone could be — full multitouch web browser, visual voicemail, iPod integration. Sold 6.1M units in its first year. Proved ARM silicon could power a premium computing experience.",
        categories: ["devices"],
        isToolingSpine: true,
        significance: "major",
        links: [
          {
            label: "Wikipedia — iPhone (1st generation)",
            url: "https://en.wikipedia.org/wiki/IPhone_(1st_generation)",
          },
        ],
      },
      {
        id: "qualcomm-snapdragon",
        yearDisplay: "2007",
        sortYear: 2007.3,
        title: "Qualcomm launches Snapdragon (ARM + integrated modem)",
        description:
          "Qualcomm's QSD8250 combined an ARM Cortex-based CPU with an integrated cellular modem, GPU (Adreno), and DSP on a single SoC. This system-on-chip approach — impossible with x86 — meant a complete smartphone brain on one chip. Snapdragon became the reference platform for Android flagships.",
        categories: ["platforms"],
        significance: "notable",
        links: [
          {
            label: "Wikipedia — Qualcomm Snapdragon",
            url: "https://en.wikipedia.org/wiki/Qualcomm_Snapdragon",
          },
        ],
      },
      {
        id: "cortex-a9",
        yearDisplay: "2007",
        sortYear: 2007.5,
        title: "Cortex-A9: multicore ARM",
        description:
          "First ARM core with out-of-order execution and symmetric multiprocessing (up to 4 cores). Answered the demand for richer smartphone experiences — full-screen video, 3D gaming — without blowing the power budget. Shipped in TI OMAP4, Nvidia Tegra 2, Samsung Exynos, and Apple's A5.",
        categories: ["platforms"],
        significance: "notable",
        links: [
          {
            label: "Wikipedia — ARM Cortex-A9",
            url: "https://en.wikipedia.org/wiki/ARM_Cortex-A9",
          },
        ],
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
          "The G1 was announced on September 23 and shipped on October 22 with a hardware keyboard, trackball, and Android 1.0. It was rough but functional, with Google Maps, Gmail, and YouTube built in. The device mattered less than the proof of concept: a viable open-source alternative to iOS existed, and OEMs could build on it without paying Microsoft-style licensing fees.",
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
        links: [
          {
            label: "Wikipedia — BlackBerry Storm",
            url: "https://en.wikipedia.org/wiki/BlackBerry_Storm",
          },
        ],
      },
      {
        id: "android-launch",
        yearDisplay: "2008",
        sortYear: 2008.3,
        title: "Android 1.0 and HTC Dream ship",
        description:
          "Google's open-source mobile OS launched on ARM hardware (Qualcomm MSM7201A, ARM11). Android gave every handset OEM access to a smartphone platform without building their own OS. Combined with low-cost ARM silicon, this opened the floodgates for sub-$200 smartphones that would drive ARM volumes exponentially.",
        categories: ["devices", "platforms"],
        significance: "major",
        links: [
          {
            label: "Wikipedia — Android version history",
            url: "https://en.wikipedia.org/wiki/Android_version_history",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Palm Pre",
            url: "https://en.wikipedia.org/wiki/Palm_Pre",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Motorola Droid",
            url: "https://en.wikipedia.org/wiki/Motorola_Droid",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — iPad (1st generation)",
            url: "https://en.wikipedia.org/wiki/IPad_(1st_generation)",
          },
        ],
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
        links: [
          {
            label: "Garrett Camp — 'The Beginning of Uber' (Medium)",
            url: "https://medium.com/@gc/the-beginning-of-uber-7fb17e544851",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Windows Phone 7",
            url: "https://en.wikipedia.org/wiki/Windows_Phone_7",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Symbian",
            url: "https://en.wikipedia.org/wiki/Symbian",
          },
        ],
      },
      {
        id: "apple-a4",
        yearDisplay: "2010",
        sortYear: 2010,
        title: "Apple A4: first Apple-designed ARM SoC",
        description:
          "Apple's acquisition of P.A. Semi (2008) and Intrinsity bore fruit with the A4 — a custom Cortex-A8 derivative with Apple's own memory controller and GPU integration. Debuted in the iPad and iPhone 4. Began Apple's trajectory of designing custom ARM silicon that would eventually outperform Intel laptop chips (M1, 2020).",
        categories: ["platforms", "devices"],
        significance: "notable",
        links: [
          {
            label: "Wikipedia — Apple A4",
            url: "https://en.wikipedia.org/wiki/Apple_A4",
          },
        ],
      },
      {
        id: "ipad-2010",
        yearDisplay: "2010",
        sortYear: 2010.3,
        title: "Apple iPad launches — ARM enters 'PC territory'",
        description:
          "Apple's A4 chip (Cortex-A8 based, designed by P.A. Semi/Apple) powered a device that directly competed with laptops for casual computing: web, email, video, documents. Sold 14.8M units in its first year. Proved ARM could deliver a full-day computing experience that x86 laptops couldn't match on battery life.",
        categories: ["devices"],
        significance: "major",
        links: [
          {
            label: "Wikipedia — iPad (1st generation)",
            url: "https://en.wikipedia.org/wiki/IPad_(1st_generation)",
          },
        ],
      },
      {
        id: "arm-6b-2010",
        yearDisplay: "2010",
        sortYear: 2010.5,
        title: "ARM ships 6.1 billion chips — 95% of smartphones",
        description:
          "ARM-architecture producers reported 6.1 billion chip shipments in 2010, representing 95% of smartphones, 35% of digital televisions and set-top boxes, and 10% of mobile computers. ARM was no longer just a phone chip — it was becoming the default processor for all consumer electronics.",
        categories: ["market"],
        significance: "notable",
        links: [
          {
            label: "Arm Newsroom: 200 Billion Chips",
            url: "https://newsroom.arm.com/blog/200bn-arm-chips",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Verizon iPhone",
            url: "https://en.wikipedia.org/wiki/IPhone_4#Verizon_model",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Motorola Mobility acquisition",
            url: "https://en.wikipedia.org/wiki/Acquisition_of_Motorola_Mobility_by_Google",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — HP TouchPad",
            url: "https://en.wikipedia.org/wiki/HP_TouchPad",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Steve Jobs",
            url: "https://en.wikipedia.org/wiki/Steve_Jobs",
          },
        ],
        image: {
          src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Steve_Jobs_Headshot_2010-CROP.jpg",
          alt: "Steve Jobs portrait, 2010, the year before his death",
        },
      },
      {
        id: "smartphones-surpass-pcs",
        yearDisplay: "2011",
        sortYear: 2011,
        title: "Smartphones surpass PCs in annual shipments",
        description:
          "Global smartphone shipments reached ~494M units, surpassing worldwide PC shipments of ~353M for the first time. The crossover happened just 4 years after the iPhone launch. PCs peaked at ~365M in 2011 and never recovered; smartphones were just getting started.",
        categories: ["market"],
        isToolingSpine: true,
        significance: "major",
        links: [
          {
            label: "Wikipedia — Smartphone § Market share",
            url: "https://en.wikipedia.org/wiki/Smartphone#Market_share",
          },
        ],
      },
      {
        id: "big-little",
        yearDisplay: "2011",
        sortYear: 2011.3,
        title: "big.LITTLE: heterogeneous multiprocessing",
        description:
          "ARM's answer to the power-performance dilemma: pair high-performance Cortex-A15 cores with energy-efficient Cortex-A7 cores on a single SoC. The OS could migrate tasks between clusters based on load. This architectural innovation had no x86 equivalent and became standard in Android flagships.",
        categories: ["platforms"],
        significance: "notable",
        links: [
          {
            label: "Wikipedia — ARM big.LITTLE",
            url: "https://en.wikipedia.org/wiki/ARM_big.LITTLE",
          },
        ],
      },
      {
        id: "chromebook-2011",
        yearDisplay: "2011",
        sortYear: 2011.5,
        title: "First Chromebooks ship (initially x86, ARM in 2012)",
        description:
          "Google launched Chrome OS laptops — thin clients for the browser era. The Samsung Chromebook (Oct 2012) was the first ARM-based model, using Samsung's Exynos 5 Dual (Cortex-A15). At $249, it became Amazon's #1 best-selling laptop. ARM had entered the traditional laptop form factor.",
        categories: ["devices"],
        significance: "notable",
        links: [
          {
            label: "Wikipedia — Chromebook",
            url: "https://en.wikipedia.org/wiki/Chromebook",
          },
        ],
      },
      {
        id: "armv8-64bit",
        yearDisplay: "2011",
        sortYear: 2011.7,
        title: "ARMv8-A announced: ARM goes 64-bit",
        description:
          "Fundamental architecture change introducing AArch64 — a new 64-bit execution state with a clean 64-bit instruction set (A64). Maintained backward compatibility with 32-bit code via AArch32. Signaled ARM's ambition to move from mobile into servers and infrastructure. Cortex-A53 and A57 cores announced October 2012.",
        categories: ["platforms"],
        significance: "major",
        links: [
          {
            label: "Wikipedia — AArch64",
            url: "https://en.wikipedia.org/wiki/AArch64",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Android (operating system) § Market share",
            url: "https://en.wikipedia.org/wiki/Android_(operating_system)#Market_share",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — BlackBerry 10",
            url: "https://en.wikipedia.org/wiki/BlackBerry_10",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — BlackBerry Z10",
            url: "https://en.wikipedia.org/wiki/BlackBerry_Z10",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Microsoft Mobile",
            url: "https://en.wikipedia.org/wiki/Microsoft_Mobile",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Uber § History",
            url: "https://en.wikipedia.org/wiki/Uber#History",
          },
        ],
      },
      {
        id: "arm-10b-annual",
        yearDisplay: "2013",
        sortYear: 2013,
        title: "ARM ships 10 billion chips in a single year",
        description:
          "ARM-based chip shipments hit 10 billion annually — roughly 28x the entire x86 PC+server market. ARM chips were found in nearly 60% of the world's mobile devices. The total ARM silicon ecosystem had grown far beyond phones to include tablets, set-top boxes, automotive, IoT sensors, and networking equipment.",
        categories: ["market"],
        significance: "major",
        links: [
          {
            label: "Arm Newsroom: 200 Billion Chips",
            url: "https://newsroom.arm.com/blog/200bn-arm-chips",
          },
        ],
      },
      {
        id: "smartphones-majority-phones",
        yearDisplay: "2013",
        sortYear: 2013.5,
        title: "Smartphones become majority of all phone sales",
        description:
          "Per Gartner, smartphone sales accounted for 53.6% of all mobile phone sales in 2013, surpassing feature phones for the first time. IDC reported 1.004 billion smartphones shipped — crossing the billion-unit milestone. Total mobile phone market was ~1.81B, meaning feature phones still sold ~800M units but were in terminal decline. Low-cost sub-$150 Android devices drove the crossover.",
        categories: ["market"],
        isToolingSpine: true,
        significance: "major",
        links: [
          {
            label: "Gartner: Smartphones Surpass Feature Phones in 2013",
            url: "https://www.gartner.com/en/newsroom/press-releases/2014-02-13-gartner-says-annual-smartphone-sales-surpassed-sales-of-feature-phones-for-the-first-time-in-2013",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — WhatsApp § Acquisition by Facebook",
            url: "https://en.wikipedia.org/wiki/WhatsApp#Acquisition_by_Facebook",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — iPhone 6",
            url: "https://en.wikipedia.org/wiki/IPhone_6",
          },
        ],
      },
      {
        id: "smartphones-two-thirds",
        yearDisplay: "2014",
        sortYear: 2014,
        title: "Smartphones reach two-thirds of all phone sales",
        description:
          "Smartphone sales hit 1.2 billion units — two-thirds of the ~1.9B total mobile phone market (Gartner). Feature phones contracted to ~690M. The substitution curve was accelerating as sub-$100 Android devices brought smartphones to developing markets. Meanwhile PCs continued declining to ~309M units.",
        categories: ["market"],
        significance: "notable",
        links: [
          {
            label: "Gartner: 1 Billion Smartphones in 2014",
            url: "https://www.gartner.com/en/newsroom/press-releases/2015-03-03-gartner-says-smartphone-sales-surpassed-one-billion-units-in-2014",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — Microsoft Mobile",
            url: "https://en.wikipedia.org/wiki/Microsoft_Mobile",
          },
        ],
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
        links: [
          {
            label: "Wikipedia — BlackBerry Priv",
            url: "https://en.wikipedia.org/wiki/BlackBerry_Priv",
          },
        ],
      },
      {
        id: "smartphone-peak-2016",
        yearDisplay: "2016",
        sortYear: 2016,
        title: "Smartphone shipments peak at 1.47 billion",
        description:
          "Global smartphone shipments reached their all-time peak of 1.47B units (IDC). Feature phones had shrunk to ~500M. The smartphone was now shipping 5.4x the volume of PCs (~270M). ARM's total chip shipments approached 18B annually. The disruption was complete: ARM-based smartphones had become the world's default computing platform.",
        categories: ["market"],
        significance: "major",
        links: [
          {
            label: "Wikipedia — Smartphone § Market share",
            url: "https://en.wikipedia.org/wiki/Smartphone#Market_share",
          },
        ],
      },
    ],
  };
