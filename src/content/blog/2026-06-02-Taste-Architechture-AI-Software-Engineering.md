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

AI is very good at generating code. Sometimes ALOT of it. It's ok at taking a general prompt and through token prediction giving a "good" average answer to the narrow question; or a broad guess at a broad problem like a whole one shot app. It's not good at understanding the core problem to be solved to deliver value by the app; nor is it good at striping things to the simplicity of the smallest thing needed to solve that problem (either technical or user) in the broader context of delivering value--really the core value via the app.

## The Problem

The core problem is keeping the app coherent. This has the dimensions of both user experience (UX) and code and data structure and app architecture (Architecture). Because UI can solve coding problems quickly, it can cause apps to become unnecessarily broad and complex in both UX Architecture.

Left unchecked, the app can evolve into "Spaghetti Frankenstein". A sprawling codebase and UI that is a patchwork of different styles and approaches, with no clear structure or coherence with a pretty tailwind front end a neat looking shadcn component but less fit to purpose and easy to learn and use than a well thought through Windows 3.0 app. This can lead to a poor user experience, as well as a codebase that is difficult to maintain and evolve over time.

AI in general causes software engineering problems to happen faster than ever before. For example, in student projects, over five weeks before AI the amount of technical debt was small after 5 weeks. There might still be some ugly code only a few people know and that is kind of buggy; Now, with AI a team can quickly get a 10k line code base that no one on the team understands and limps along; that with enough tokens will be patched together to demo forever---good for token consumption but bad for users and development teams.

Teams often have a problem focusing on value. Apps that require huge amounts of user input in forms, complicated login flows, and limited end value in synthesizing and transforming the data into something that solves a uniques problem for the user have often been a problem for new and even experienced developers who get lost in their implementation and lose sight of the problem to solve. Often this manifests in a deep backend and incoherent, concept heavy front end where the end result leaves the user with the same problem they came to the app to solve. This is even more so in AI apps; since it's so easy to generate the code and UI for initial notions that aren't focused and as simple as possible.

## Some Solutions

## Be intentional about UX Coherence

### Core Value, The Payoff

### Application Concepts

### Design system

### User Flow and Information Architecture.

## Decide Architecture Coherence and Implement systems to prevent drift and evolve

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

#### Design Systems

### For Architecture Coherence

#### High Level Architecture Diagrams

#### Database Design

#### Subsystem Descriptions and Skills

#### Feedforward and Feedback: Testing, Deterministic static analysis, skills for team practices.

## Conclusion

AI is a powerful tool for software development, but it can also lead to incoherent apps if not used carefully. By being intentional about UX coherence and architecture coherence, developers can create apps that are both user-friendly and maintainable over time. This requires a focus on the core value of the app, as well as a clear understanding of the user's needs and the problem to be solved. It also requires a shared architectural vision and systems to prevent codebase drift. With the right techniques and tools, developers can harness the power of AI while still creating coherent and valuable software products.
