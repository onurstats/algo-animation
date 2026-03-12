# AlgoAnimation — Animated LeetCode Problem Solutions

## Project Vision

AlgoAnimation is an educational content platform that brings LeetCode problems to life through step-by-step animated visualizations. Instead of reading static code solutions, users watch algorithms execute visually — seeing arrays shift, pointers move, trees traverse, and graphs explore in real time.

**Tagline:** "See the algorithm. Understand the solution."

**Target Audience:** Software engineers preparing for coding interviews, CS students, self-taught developers, and anyone who learns better visually.

---

## Core Concept

Each LeetCode problem gets a dedicated animation page that includes:

1. **Problem Statement** — Clean display of the LeetCode problem (title, difficulty, description, constraints)
2. **Animated Visualization** — The core feature: a step-by-step animation showing how the algorithm processes the input
3. **Code Walkthrough** — Syntax-highlighted code with the current executing line highlighted in sync with the animation
4. **Explanation Panel** — Text narration of what's happening at each step
5. **Interactive Controls** — Play, pause, step forward/back, speed control, and custom input

---

## Tech Stack

| Layer             | Technology                                                   | Reason                                                          |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| Framework         | **Next.js 14+ (App Router)**                                 | SSR, routing, SEO for each problem page                         |
| Language          | **TypeScript**                                               | Type safety for complex animation state                         |
| Animation Engine  | **Framer Motion** + **Custom Canvas (HTML5 Canvas / D3.js)** | Framer for UI transitions, Canvas/D3 for data structure visuals |
| Styling           | **Tailwind CSS**                                             | Rapid UI development, consistent design system                  |
| Code Highlighting | **Shiki** or **Prism.js**                                    | Syntax highlighting with line-level control                     |
| State Management  | **Zustand**                                                  | Lightweight store for animation state, playback controls        |
| Content           | **MDX** or **JSON configs**                                  | Each problem defined as structured data                         |
| Deployment        | **Vercel**                                                   | Optimized for Next.js                                           |
| Package Manager   | **pnpm**                                                     | Fast, disk-efficient                                            |

---

## Project Structure

```
algoanimation/
├── CLAUDE.md                    # Project context for Claude Code
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── public/
│   ├── og/                      # Open Graph images per problem
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with nav, footer, fonts
│   │   ├── page.tsx             # Landing page / problem catalog
│   │   ├── problems/
│   │   │   ├── page.tsx         # Problem listing with filters (difficulty, topic, pattern)
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual problem animation page
│   │   └── about/
│   │       └── page.tsx         # About the project
│   │
│   ├── components/
│   │   ├── ui/                  # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Slider.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── animation/           # Core animation components
│   │   │   ├── AnimationCanvas.tsx      # Main canvas/SVG rendering area
│   │   │   ├── PlaybackControls.tsx     # Play, pause, step, speed
│   │   │   ├── StepIndicator.tsx        # Progress bar / step counter
│   │   │   ├── AnimationProvider.tsx     # Context provider for animation state
│   │   │   └── visualizers/             # Data-structure-specific renderers
│   │   │       ├── ArrayVisualizer.tsx       # Arrays, strings
│   │   │       ├── LinkedListVisualizer.tsx  # Linked lists
│   │   │       ├── TreeVisualizer.tsx        # Binary trees, BSTs
│   │   │       ├── GraphVisualizer.tsx       # Graphs (adjacency)
│   │   │       ├── MatrixVisualizer.tsx      # 2D grids/matrices
│   │   │       ├── StackQueueVisualizer.tsx  # Stacks and queues
│   │   │       ├── HashMapVisualizer.tsx     # Hash maps
│   │   │       └── PointerVisualizer.tsx     # Two pointers, sliding window
│   │   │
│   │   ├── code/
│   │   │   ├── CodePanel.tsx           # Code display with line highlighting
│   │   │   ├── LanguageSelector.tsx    # Python / JS / Java / C++ toggle
│   │   │   └── LineHighlighter.tsx     # Highlights current executing line
│   │   │
│   │   ├── problem/
│   │   │   ├── ProblemCard.tsx         # Card for problem listing page
│   │   │   ├── ProblemHeader.tsx       # Title, difficulty badge, tags
│   │   │   ├── ProblemDescription.tsx  # Problem statement display
│   │   │   └── ExplanationPanel.tsx    # Step-by-step text narration
│   │   │
│   │   └── interactive/
│   │       ├── CustomInputForm.tsx     # Let users input their own test cases
│   │       └── ComplexityDisplay.tsx   # Time & space complexity visualization
│   │
│   ├── lib/
│   │   ├── animation/
│   │   │   ├── engine.ts              # Core animation engine (step management, timing)
│   │   │   ├── types.ts               # AnimationStep, AnimationState, VisualizerConfig
│   │   │   └── interpolation.ts       # Easing functions, smooth transitions
│   │   │
│   │   ├── algorithms/                # Algorithm implementations that generate animation steps
│   │   │   ├── two-sum.ts
│   │   │   ├── valid-parentheses.ts
│   │   │   ├── merge-two-sorted-lists.ts
│   │   │   ├── binary-search.ts
│   │   │   ├── maximum-subarray.ts
│   │   │   └── ... (one file per problem)
│   │   │
│   │   ├── problems/                  # Problem metadata and configuration
│   │   │   ├── registry.ts            # Central registry of all problems
│   │   │   ├── types.ts               # Problem, TestCase, DifficultyLevel types
│   │   │   └── data/                  # Individual problem configs
│   │   │       ├── two-sum.ts
│   │   │       ├── valid-parentheses.ts
│   │   │       └── ...
│   │   │
│   │   └── utils/
│   │       ├── colors.ts              # Color palette for visualizations
│   │       ├── layout.ts              # Auto-layout helpers for trees/graphs
│   │       └── cn.ts                  # classNames utility
│   │
│   ├── hooks/
│   │   ├── useAnimation.ts            # Hook to control animation playback
│   │   ├── useAnimationStore.ts       # Zustand store hook
│   │   ├── useKeyboardShortcuts.ts    # Space=play/pause, arrows=step
│   │   └── useResponsiveCanvas.ts     # Canvas sizing for mobile/desktop
│   │
│   ├── stores/
│   │   └── animationStore.ts          # Zustand store definition
│   │
│   └── styles/
│       └── globals.css                # Tailwind base + custom animations
│
├── content/                           # If using MDX for problem descriptions
│   └── problems/
│       ├── two-sum.mdx
│       └── ...
│
└── tests/
    ├── algorithms/                    # Unit tests for algorithm step generation
    └── components/                    # Component tests
```

---

## Core Types

```typescript
// src/lib/animation/types.ts

type Difficulty = "easy" | "medium" | "hard";

type DataStructureType =
  | "array"
  | "linked-list"
  | "tree"
  | "graph"
  | "matrix"
  | "stack"
  | "queue"
  | "hash-map"
  | "string"
  | "heap";

type AlgorithmPattern =
  | "two-pointers"
  | "sliding-window"
  | "binary-search"
  | "dfs"
  | "bfs"
  | "dynamic-programming"
  | "backtracking"
  | "greedy"
  | "divide-and-conquer"
  | "hash-map"
  | "stack"
  | "sorting"
  | "linked-list"
  | "tree-traversal"
  | "graph"
  | "heap"
  | "union-find"
  | "trie"
  | "bit-manipulation"
  | "math";

interface Problem {
  id: number; // LeetCode problem number
  slug: string; // URL-friendly slug
  title: string;
  difficulty: Difficulty;
  description: string; // Problem statement (supports markdown)
  constraints: string[];
  tags: AlgorithmPattern[];
  dataStructures: DataStructureType[];
  examples: TestCase[];
  defaultInput: any; // Default input for the animation
  complexity: {
    time: string; // e.g., "O(n)"
    space: string; // e.g., "O(1)"
  };
  solutions: SolutionConfig[]; // Multiple solution approaches
}

interface SolutionConfig {
  approach: string; // e.g., "Hash Map", "Brute Force", "Two Pointers"
  code: Record<Language, string>; // Code in multiple languages
  generateSteps: (input: any) => AnimationStep[]; // Step generator function
  visualizerType: DataStructureType; // Which visualizer to use
}

type Language = "python" | "javascript" | "java" | "cpp";

interface AnimationStep {
  id: number;
  description: string; // Human-readable explanation
  codeLine: number; // Which line of code is executing
  state: VisualizationState; // What the visual should show
  highlights: Highlight[]; // What elements to highlight
  variables: Record<string, any>; // Current variable values
  action: AnimationAction; // What's happening (compare, swap, insert, etc.)
}

type AnimationAction =
  | "compare"
  | "swap"
  | "insert"
  | "remove"
  | "highlight"
  | "unhighlight"
  | "move-pointer"
  | "push"
  | "pop"
  | "traverse"
  | "found"
  | "not-found"
  | "return"
  | "set-value"
  | "create-node"
  | "delete-node";

interface Highlight {
  indices: number[]; // Which elements to highlight
  color: HighlightColor;
  label?: string; // Optional label (e.g., "i", "j", "left", "right")
}

type HighlightColor =
  | "primary" // Currently processing (blue)
  | "secondary" // Secondary pointer (purple)
  | "success" // Found / correct (green)
  | "danger" // Removed / wrong (red)
  | "warning" // Comparing (yellow/orange)
  | "muted" // Already processed (gray)
  | "accent"; // Special highlight (teal)

interface VisualizationState {
  elements: any[]; // Current state of the data structure
  pointers?: Record<string, number>; // Named pointers and their positions
  auxiliary?: any; // Extra structures (hash map, result array, etc.)
}

interface AnimationPlaybackState {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number; // 0.5x, 1x, 1.5x, 2x
  direction: "forward" | "backward";
}

interface TestCase {
  input: any;
  output: any;
  explanation?: string;
}
```

---

## Animation Engine Design

The animation engine is the heart of the project. Here's how it works:

### Step Generation

Each algorithm implementation generates an array of `AnimationStep` objects. The algorithm runs through the solution and records what happens at each meaningful step.

```typescript
// Example: Two Sum step generation
function generateTwoSumSteps(nums: number[], target: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const map = new Map<number, number>();
  let stepId = 0;

  steps.push({
    id: stepId++,
    description: `Starting Two Sum with target = ${target}`,
    codeLine: 1,
    state: { elements: [...nums], auxiliary: {} },
    highlights: [],
    variables: { target, map: {} },
    action: "highlight",
  });

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    steps.push({
      id: stepId++,
      description: `Checking nums[${i}] = ${nums[i]}. Complement = ${target} - ${nums[i]} = ${complement}`,
      codeLine: 3,
      state: { elements: [...nums], auxiliary: Object.fromEntries(map) },
      highlights: [{ indices: [i], color: "primary", label: "i" }],
      variables: { i, complement, target },
      action: "compare",
    });

    if (map.has(complement)) {
      steps.push({
        id: stepId++,
        description: `Found! map[${complement}] = ${map.get(complement)}. Return [${map.get(complement)}, ${i}]`,
        codeLine: 5,
        state: { elements: [...nums], auxiliary: Object.fromEntries(map) },
        highlights: [
          { indices: [map.get(complement)!], color: "success", label: "j" },
          { indices: [i], color: "success", label: "i" },
        ],
        variables: { result: [map.get(complement)!, i] },
        action: "found",
      });
      return steps;
    }

    map.set(nums[i], i);
    steps.push({
      id: stepId++,
      description: `Not found. Adding nums[${i}] = ${nums[i]} to hash map.`,
      codeLine: 7,
      state: { elements: [...nums], auxiliary: Object.fromEntries(map) },
      highlights: [{ indices: [i], color: "muted" }],
      variables: { i, map: Object.fromEntries(map) },
      action: "set-value",
    });
  }

  return steps;
}
```

### Playback Controller

The Zustand store manages playback:

```typescript
// src/stores/animationStore.ts
interface AnimationStore {
  steps: AnimationStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number; // multiplier
  // Actions
  setSteps: (steps: AnimationStep[]) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (step: number) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}
```

---

## Design System

### Color Palette

```
Background:     #0F1117 (dark navy)
Surface:        #1A1D2E (card backgrounds)
Border:         #2A2D3E
Text Primary:   #E4E4E7
Text Secondary: #9CA3AF
Accent Blue:    #3B82F6
Accent Purple:  #8B5CF6
Success Green:  #22C55E
Warning Orange: #F59E0B
Danger Red:     #EF4444
Muted Gray:     #6B7280
```

### Typography

- **Headings:** Inter or Cal Sans (bold, clean)
- **Body:** Inter
- **Code:** JetBrains Mono or Fira Code

### Animation Visual Style

- Dark theme by default (easy on the eyes during long study sessions)
- Array elements as rounded rectangles with values inside
- Pointers as labeled arrows beneath elements
- Tree nodes as circles with connecting edges
- Smooth transitions between steps (300ms default)
- Color-coded highlights matching the palette above

---

## Problem Catalog (Initial Set)

### Phase 1: Core Problems (10 problems to launch)

| #   | Problem                     | Difficulty | Pattern        | Visualizer       |
| --- | --------------------------- | ---------- | -------------- | ---------------- |
| 1   | Two Sum                     | Easy       | Hash Map       | Array + HashMap  |
| 20  | Valid Parentheses           | Easy       | Stack          | String + Stack   |
| 21  | Merge Two Sorted Lists      | Easy       | Linked List    | LinkedList       |
| 53  | Maximum Subarray            | Medium     | DP / Kadane    | Array            |
| 70  | Climbing Stairs             | Easy       | DP             | Array (DP table) |
| 121 | Best Time to Buy/Sell Stock | Easy       | Sliding Window | Array + Pointers |
| 206 | Reverse Linked List         | Easy       | Linked List    | LinkedList       |
| 226 | Invert Binary Tree          | Easy       | Tree / DFS     | Tree             |
| 704 | Binary Search               | Easy       | Binary Search  | Array + Pointers |
| 15  | 3Sum                        | Medium     | Two Pointers   | Array + Pointers |

### Phase 2: Expand (next 15)

| #   | Problem                             | Difficulty | Pattern        |
| --- | ----------------------------------- | ---------- | -------------- |
| 3   | Longest Substring Without Repeating | Medium     | Sliding Window |
| 11  | Container With Most Water           | Medium     | Two Pointers   |
| 33  | Search in Rotated Sorted Array      | Medium     | Binary Search  |
| 49  | Group Anagrams                      | Medium     | Hash Map       |
| 56  | Merge Intervals                     | Medium     | Sorting        |
| 76  | Minimum Window Substring            | Hard       | Sliding Window |
| 98  | Validate BST                        | Medium     | Tree / DFS     |
| 102 | Binary Tree Level Order             | Medium     | Tree / BFS     |
| 104 | Max Depth of Binary Tree            | Easy       | Tree / DFS     |
| 141 | Linked List Cycle                   | Easy       | Two Pointers   |
| 200 | Number of Islands                   | Medium     | DFS / BFS      |
| 236 | Lowest Common Ancestor              | Medium     | Tree / DFS     |
| 322 | Coin Change                         | Medium     | DP             |
| 347 | Top K Frequent Elements             | Medium     | Heap / Hash    |
| 739 | Daily Temperatures                  | Medium     | Stack          |

---

## SEO & Metadata Strategy

Each problem page should have:

- **Title:** `{Problem Title} — Animated Solution | AlgoAnimation`
- **Description:** `Visual step-by-step animation of LeetCode #{id}: {title}. Watch the {pattern} algorithm solve this {difficulty} problem.`
- **Open Graph image:** Auto-generated card with problem title + difficulty badge + mini visualization preview
- **URL structure:** `/problems/{slug}` (e.g., `/problems/two-sum`)
- **Structured data:** JSON-LD for educational content

---

## Keyboard Shortcuts

| Key         | Action                         |
| ----------- | ------------------------------ |
| `Space`     | Play / Pause                   |
| `→`         | Step forward                   |
| `←`         | Step backward                  |
| `Shift + →` | Jump forward 5 steps           |
| `Shift + ←` | Jump backward 5 steps          |
| `Home`      | Go to first step               |
| `End`       | Go to last step                |
| `1-4`       | Set speed (0.5x, 1x, 1.5x, 2x) |
| `R`         | Reset animation                |
| `F`         | Fullscreen visualization       |

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm typecheck

# Add a new problem (future CLI tool)
pnpm new-problem --id 1 --slug two-sum
```

---

## Guidelines for Development

### When adding a new problem:

1. Create problem config in `src/lib/problems/data/{slug}.ts`
2. Create algorithm step generator in `src/lib/algorithms/{slug}.ts`
3. Register it in `src/lib/problems/registry.ts`
4. Write tests for the step generator in `tests/algorithms/{slug}.test.ts`
5. The page route `src/app/problems/[slug]/page.tsx` handles rendering dynamically

### Code style:

- Use TypeScript strict mode
- Prefer functional components with hooks
- Keep animation logic separate from rendering logic
- Every algorithm file should export a `generateSteps` function
- Use descriptive variable names in step descriptions (users read these)
- Write human-friendly explanations, not just "step 3 of 10"

### Animation quality:

- Every step must have a clear, concise `description`
- Highlight changes visually — the user should instantly see what changed
- Use appropriate colors (green = found/success, red = removed, blue = current, gray = processed)
- Transitions should be smooth (use easing, not instant jumps)
- Support mobile layouts (canvas should resize)

### Performance:

- Pre-generate all steps before animation starts (don't compute during playback)
- Use `requestAnimationFrame` for smooth canvas rendering
- Memoize expensive calculations
- Lazy load problem data (only load when user visits that problem)

---

## Future Features (Not in MVP)

- [ ] User accounts & progress tracking
- [ ] Speed run mode (watch all steps at 4x)
- [ ] Compare multiple approaches side by side
- [ ] Community-submitted animations
- [ ] Embed widget for blogs / documentation
- [ ] Mobile app (React Native)
- [ ] Video export (generate MP4 of animation)
- [ ] AI-generated explanations per step
- [ ] Dark/light theme toggle
- [ ] Problem difficulty filter & search
- [ ] "Animation of the Day" feature
- [ ] YouTube content pipeline (export animations as videos)
