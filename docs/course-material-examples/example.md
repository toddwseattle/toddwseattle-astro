---
title: "Form Validation with Zod"
description: "Small example showing how to validate a form using Zod."
courses: ["software-engineering"]
type: "example"
date: "2026-01-07"
---

### Problem

Validate a registration form's inputs.

### Solution

Use Zod schemas to validate and provide errors.

```ts
import { z } from "zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### Outcome

Users receive immediate feedback, and the server receives validated data.
