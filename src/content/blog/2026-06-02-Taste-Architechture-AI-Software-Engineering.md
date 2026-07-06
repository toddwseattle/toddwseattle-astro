---
category: "software-engineering"
title: "Building toddwseattle.com in Astro"
date: "2026-06-02"
tags: ["software engineering", "AI", "UX design", "architecture"]
description: "Thoughts for solo and team devs on software product development in the age of AI based on teaching software engineering in 2026 and a couple of personal projects."
draft: true
---

In 2026, I have been teaching software engineering and software product development in some form at Northwestern University for 17 years. The rise of AI tools makes clear whats still important for the human in the loop; and new things the human needs to do to keep the AI Genie in check. In particular, many have talked about the need for "Taste" and "Architecture". Those terms are abstract; and the real problem is a need for overall App Coherence, and in this post I will try to be concrete about what that is and how developers at all experience levels can be more effective. Taste is about UX design, Information and UI structure, and architecture is about decomposing subsystems to be DRY enough and simple enough to compose and maintain over time. These thoughts are based on what I saw from student projects, as well as my three main side projects (autosofttoday, an attendance system newly built, and a port of Pitch Evaluator with a collaborator).

## What AI Does for you

AI is very good at generating code. Sometimes a lot of it. It's ok at taking a general prompt and through token prediction giving a "good" average answer to the narrow question; or a broad guess at a broad problem like a whole one shot app. It's not good at understanding the core problem to be solved to deliver value by the app; nor is it good at striping things to the simplicity of the smallest thing needed to solve that problem (either technical or user) in the broader context of delivering value--really the core value via the app.

## The Problem

The core problem is keeping the app coherent. This has the dimensions of both user experience (UX) and code and data structure and app architecture (Architecture). Because UI can solve coding problems quickly, it can cause apps to become unnecessarily broad and complex in both UX Architecture.

Left unchecked, the app can evolve into "Spaghetti Frankenstein". A sprawling codebase and UI that is a patchwork of different styles and approaches, with no clear structure or coherence with a pretty tailwind front end a neat looking shadcn component but less fit to purpose and easy to learn and use than a well thought through Windows 3.0 app. This can lead to a poor user experience, as well as a codebase that is difficult to maintain and evolve over time.

AI in general causes software engineering problems to happen faster than ever before. For example, in student projects, over five weeks before AI the amount of technical debt was small after 5 weeks. There might still be some ugly code only a few people know and that is kind of buggy; Now, with AI a team can quickly get a 10k line code base that no one on the team understands and limps along; that with enough tokens will be patched together to demo forever---good for token consumption but bad for users and development teams. I would call this problem one of horizontal spread.

Teams often have a problem focusing on value. Apps that require huge amounts of user input in forms, complicated login flows, and limited end value in synthesizing and transforming the data into something that solves a uniques problem for the user have often been a problem for new and even experienced developers who get lost in their implementation and lose sight of the problem to solve. Often this manifests in a deep backend and incoherent, concept heavy front end where the end result leaves the user with the same problem they came to the app to solve. This is even more so in AI apps; since it's so easy to generate the code and UI for initial notions that aren't focused and as simple as possible.

## Some Solutions

A solution is to insure that product designers intentionally describe the elements of user experience coherence and systems architecture coherence to the AI tools and human team members working on the project.

## The three elements of UX coherence

The most important aspect is to be intentional about the problem your solving and who it's for. In this respect, having a good **not** list is more important than ever. What are you not doing? Where are you overbuilding or building with real data on whether something is useful. A positive about AI is that it permits product developers to test more concepts and designs. A negative is the things on the "not" list are more tempting. As a team always ask, "how does this work support the value we are trying to create for the user". Ideally, a project has 3-5 guiding principles on where it going.

In addition to a top level vision and focus; Being clear on the payoff, application concepts relative to your users context, application structure (focus areas, data, and functions) and having a design system will help keep your application hang together.

### Core Value, The Payoff

I'm a big fan of a tool many of us at Northwestern have been using to teach value proposition creation, the [four panel storyboard](https://allcritiquesgreatandsmall.blogspot.com/2015/01/the-4-panel-storyboard.html). It summarizes the user, problem, payoff (value), and ultimate benefit. For building the product getting very clear on the payoff (3rd panel) is key. This should be the focus of the first prototype and the first thing to share with user. Usually the payoff is very narrow--no login, now big bunch of forms to fill out; just the main value. Often in using this, product designers build too much into their initial concept.

The challenge in building is to not build anything that doesn't contribute directly to the user being able to see the payoff screen--always think: how can i defer asking for user input and compute via other context clues instead? Do I really need login?

### Application Concepts

For me, the notion of Application Concepts was something I was introduced to by Jim Allchin when I was working at Microsoft. At the time I was a program manager working on the administration of active directory. Jim when doing UI review of our work would keep of each new concept a user needed to know, things like organization unit containment, and access inheritance. A related idea is thinking through the user model of the application--how does the user build a mental model of the system, often through a metaphor. It's been formalized through the work of MIT professor [Daniel Jackson](https://press.princeton.edu/taxonomy/term/24870) who has a book [The Essence of Software: Why Concepts Matter for Great Design](https://press.princeton.edu/books/paperback/9780691230832/the-essence-of-software). An overview is provided by a good [slide deck on What Makes Software Work](https://people.csail.mit.edu/dnj/talks/google-24/google-24-no-builds.pdf) and [companion video](https://www.youtube.com/watch?v=pCr3GjdoTbg&list=PLSIUOFhnxEiBpdkDZOezCeA-Od-QlsAGK].

### Design System

In addition to defining the concepts of the product, product designers must define a design system within which to develop the application. The design systems defines the essential elements of the look and feel of the application--common components and controls (sometimes through a component library like shadcn or material design), colors, layout and branding elements that unify the application. In the LLM assisted code repository this is contained in DESIGN.MD file that is used to provide look and feel consistency across the application. Several good tools are available to assist product developers in putting this together.

### User Flow and Information Architecture.

The other element of UX is understanding the user interface structure, and it's relationship to the data architecture and functions performed on the data. In particular, understanding what the main focus areas (principal interaction areas), with their functions and
underlying data. Focus areas are the main parts of the app; for example in an email application the list of messages. The functions are the actions that can be performed on the elements; like reply, forward, and delete. The data is the collection of messages. These concepts I borrow from the User Environment in [Holtzblatt/Byers[Contextual Design](https://www.oreilly.com/library/view/contextual-design-2nd/9780128011362/).

## Decide Architecture Coherence and Implement systems to prevent drift and evolve

Concretely, describing your system as a directed graph of subsystems and how they interact with the core data, architectural patterns, libraries and technologies of the overall system represent a way to keep the system coherent and prevent codebase drift.

For example, describing the system through a high level diagram; but also describing how libraries are used and organized. Specifically, I have in recent projects been using a data model library that manages storage and it's versioning and relates it to the model used to present to the view of the application (see [firebase-models](https://github.com/bridgenodelabs/firestore-models)). Having a set of documentation that describe the subsystems, major architectural flow, and any major architectural decisions (The ADR Pattern is useful for this see: [Architecture Decision Records](https://adr.github.io/)).

### Choose stack first

### Decide Layering

### Organize Layers and links between them

## Techniques that Help

### UI Coherence--Payoff, minimize concepts, user environment, design system.

#### The underpinning - understanding users and user needs.

#### Payoff (Core Value)

#### Concept Documentation

#### Structured User Environment

#### Design System

### Architecture Coherence

#### Build and update a shared architectural vision

#### Provide just enough structure

#### think about hierarchial subsystems with a directed graph of dependencies between them

#### Manage and Prevent Codebase Drift

## Tools that Help

### For UX Coherence

#### Conceptualizing the User, Their Problem, and the Payoff

#### The Holtzblatt User Environment

#### Design Systems: Use tools like stitch and Claude Design.

### For Architecture Coherence

#### High Level Architecture Diagrams

#### Database Design

#### Subsystem Descriptions and Skills

#### Feedforward and Feedback: Testing, Deterministic static analysis, skills for team practices.

## Conclusion

AI is a powerful tool for software development, but it can also lead to incoherent apps if not used carefully. By being intentional about UX coherence and architecture coherence, developers can create apps that are both user-friendly and maintainable over time. This requires a focus on the core value of the app, as well as a clear understanding of the user's needs and the problem to be solved. It also requires a shared architectural vision and systems to prevent codebase drift. With the right techniques and tools, developers can harness the power of AI while still creating coherent and valuable software products.
