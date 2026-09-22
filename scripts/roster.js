/**
 * Registry-derived roster for the Defold Games Kit.
 * 12 agents + 32 skills = 44 members.
 * Everything rendered on the page reads from this file — never hand-typed markup.
 *
 * Content is grounded in the Beat Runner Defold port (StudioProjects/beat-runner-defold):
 * its DEVLOG trap list, tools/check_*.py structural guards, and the reverse-engineering
 * spec workflow in specs/. Where a skill names an engine behaviour, that behaviour was
 * observed on a real build, not inferred from documentation.
 */

const AGENTS = [
  {
    name: 'Defold Game Developer',
    blurb:
      'Use when Defold implementation spans Lua gameplay code plus collections, game objects, components, factories, project settings, native extensions, or build configuration; use Game Tuning Workbench for a focused project-specific tuning panel and versioned settings handoff, and the dedicated Defold skills for debugging, project or dependency audits, reorganization, profiling, or HTML5 procedures.',
  },
  {
    name: 'Web Game Developer',
    blurb:
      'Use when implementing or debugging browser-game features and rendering with Three.js, Phaser, PixiJS, vanilla JavaScript, Canvas, WebGL, or a Defold HTML5 build; use Realtime Multiplayer Engineer when work spans authoritative server simulation and network lifecycles, Game Art Director for cross-surface visual direction, and focused skills for bounded audits, input, performance, tuning, or portal integration.',
  },
  {
    name: 'Realtime Multiplayer Engineer',
    blurb:
      'Use when real-time multiplayer implementation spans authoritative simulation, network protocol, admission and presence lifecycles, interest management, reconnection, persistence, spectators, or live-world recovery; use the dedicated Persistent Multiplayer Server Design skill when only that bounded procedure is needed.',
  },
  {
    name: 'Web Game Publishing Engineer',
    blurb:
      'Use when coordinating a web-game release across multiple portals, SDK workstreams, Defold build variants, submission planning, and dashboard handoff; use Web Game Multi-Portal Adapter for the focused shared facade and deterministic-variant procedure, a dedicated platform skill for one portal, and Game Monetization Manager for IAP or ad policy.',
  },
  {
    name: 'Game Remote Config & Analytics Engineer',
    blurb:
      'Use when a game on any engine or runtime needs remote configuration, feature flags, kill switches, analytics events, experiment instrumentation, staged rollout, or provider-neutral config and analytics adapters with an A/B experimentation workflow such as Firebase Remote Config, Analytics, and A/B Testing.',
  },
  {
    name: 'Game Monetization Manager',
    blurb:
      'Use when a game on any engine or runtime needs sustainable monetization strategy, an in-app purchase catalog or implementation, ad-format and placement decisions, store or mediation adapters, purchase lifecycle hardening, pricing plans, or monetization experiments with policy and player-experience guardrails.',
  },
  {
    name: 'Game UI/UX Designer',
    blurb:
      'Use when designing or implementing game HUD information architecture, GUI scenes, menus, onboarding, store, offer, ad, purchase, consent, navigation, focus, responsive interface, accessibility, or cross-device menu flows; use Game Juice & Feel for action feedback and Game Art Director for the broader visual language.',
  },
  {
    name: 'Game Systems Designer',
    blurb:
      'Use when a game-design problem spans multiple interacting mechanics and needs a coherent implementable design; use focused skills for bounded loop, difficulty, playtest, or interface work, Game Monetization Manager for commercial design, and Realtime Multiplayer Engineer for authoritative networking implementation.',
  },
  {
    name: 'Game Performance Engineer',
    blurb:
      'Use when coordinating and implementing a performance campaign across multiple targets or runtime subsystems; use Defold Performance Profiling or Browser Game Performance Audit for bounded profiling with measured evidence, and Realtime Multiplayer Engineer for network architecture and correctness.',
  },
  {
    name: 'Game QA and Playtest Analyst',
    blurb:
      'Use when game quality work spans ambiguous or multiple reports, exploratory coverage, severity and priority, test matrices, playtest classification, and release risk; use Defold Debugging for one focused Defold failure and Realtime Multiplayer Engineer for authoritative network repair.',
  },
  {
    name: 'Game Juice & Feel Designer',
    blurb:
      'Use when a game feels flat, weightless, unclear, unresponsive, or unsatisfying and needs coordinated input, motion, animation, camera, hit-stop, VFX, audio, haptics, or action-HUD feedback; use Game Art Director for broad visual language, Game UI/UX for interface structure, and Realtime Multiplayer Engineer for synchronization correctness.',
  },
  {
    name: 'Game Art Director',
    blurb:
      'Use when a game needs one coherent visual direction across gameplay, environments, characters, effects, interface styling, and honest marketing imagery, or when existing art lacks identity, hierarchy, readability, or a feasible production system.',
  },
];

const SKILLS = [
  {
    name: 'Defold Project Audit',
    blurb:
      'Audit an existing Defold project and map its architecture, collections, game objects, components, atlases, libraries, native extensions, game.project settings, collection proxies, factories, runtime references, risks, and prioritized improvements. Use when inheriting a project, planning a refactor or engine upgrade, preparing a release, diagnosing broad technical debt, or needing to understand how a Defold project is assembled before changing it.',
  },
  {
    name: 'Defold Safe Project Reorganization',
    blurb:
      'Plan and execute safe Defold asset, script, collection, atlas, and folder moves while preserving resource paths, component references, collection proxy targets, factory prototypes, and build configuration. Use when reorganizing a project tree, renaming or relocating Defold content, splitting modules into libraries, cleaning inherited project structure, or repairing a previous move without breaking dependencies.',
  },
  {
    name: 'Defold Collection and Dependency Audit',
    blurb:
      'Trace forward and reverse Defold dependency graphs across collections, collection proxies, game objects, factories, collection factories, Lua module requires, atlases, tilesources, and library dependencies. Use when locating the owner of a missing resource, finding what references an asset, investigating build inclusion, validating proxy-loaded flows, or determining move, delete, and shared-content blast radius; use Defold Debugging instead to reproduce and repair one focused failure.',
  },
  {
    name: 'Defold Debugging',
    blurb:
      'Reproduce, isolate, repair, and verify one focused Defold functional failure using the console, editor and player logs, Lua stack traces, the debugger, message passing traces, controlled experiments, and regression tests. Use for Lua runtime errors, message and address mistakes, functional crashes or hangs, missing resources, broken collection or factory behavior, lifecycle and state bugs, native-extension build failures, platform-only defects, and intermittent behavior. Knows the silent-failure classes that read as rendering bugs rather than errors: a missing `shared_state = 1` giving every script its own Lua context, a forward-referenced `local function` that is still nil and aborts `init` leaving a blank GUI, and an atlas sprite id carrying a file extension that makes an entire `.gui` fail to load. Use Defold Performance Profiling instead when the primary symptom is frame time, memory, loading cost, or resource exhaustion.',
  },
  {
    name: 'Defold Runtime Verification Harness',
    blurb:
      'Build and operate a trustworthy live-capture loop for a running Defold build so that visual claims are backed by frames rather than assumption. Covers a debug screenshot endpoint, scripted autoplay and animation-sequence flags driven from a `--settings` overlay, pairing every captured frame with the simulation state that produced it, and frame-diffing two captures to prove motion. Use before trusting any "verified" screenshot. Encodes the traps that silently invalidate a capture: a stale process owning the endpoint after an incomplete `pkill`, block-buffered `print()` output where a missing log line proves nothing, boot frames that render only the clear colour, and a bundled app detaching stdio so a dead simulation looks like a frozen character while rendering continues.',
  },
  {
    name: 'Defold Performance Profiling',
    blurb:
      'Diagnose Defold CPU, GPU, memory, Lua garbage-collection, rendering, physics, loading, and frame-pacing problems with reproducible evidence from the built-in profiler, web profiler, and render stats. Use for low frame rate, stutter, hitches, thermal or battery issues, memory pressure, loading spikes, excessive draw calls or batch breaks, or performance regressions on a specific Defold target device.',
  },
  {
    name: 'Defold HTML5 Optimization',
    blurb:
      'Measure and optimize Defold HTML5 build size, startup time, memory, runtime performance, browser compatibility, and hosting behavior. Use when a Defold game loads slowly, crashes or stutters in browsers, exceeds portal size limits, needs reliable compression, app-manifest stripping and caching, or must be prepared for desktop and mobile web deployment. Carries the web-only failure modes that never appear on desktop: the `wasm-web` platform running vanilla Lua 5.1 where `goto` is a load-time syntax error that blacks the canvas with no build error, a texture-profile web platform block switching bob to a different encoding path and growing the archive even with settings identical to generic, a custom HTML template whose inlined stock stylesheet overrides your own CSS, and splash-hide signals that fire long before the game is actually ready.',
  },
  {
    name: 'Defold Render Pipeline and Materials',
    blurb:
      'Design, audit, or repair a Defold render script, render targets, materials, shader programs, predicates, and draw order. Use when adding post-processing, custom lighting, screen-space effects, or multiple cameras, when batching breaks, when sprites draw in the wrong order, or when a custom render pipeline must stay readable and portable across desktop, mobile, and HTML5 targets. Treats material binding as a verified invariant rather than an assumption: Defold resolves model material overrides by name and a miss is silent, rendering an untextured white or unlit-black mesh, and a vertex program without bone attributes freezes a skinned mesh in bind pose instead of reporting an error.',
  },
  {
    name: 'Defold Structural Guard Scripts',
    blurb:
      'Write executable pre-ship guards for the bug classes that a value-by-value review cannot see, then prove each guard falsifiable against the known-bad input it was written for. Use for invariants that are emergent or invisible in source: material names a model file does not contain, count parity between a reference and a port where an absent entry looks like nothing at all, declared content that is never actually spawned or indexed at runtime, geometry intruding into playable space as a product of several independently-correct values, and fixes baked into assets that a re-export silently reverts. A guard that has never failed on purpose has not been shown to work.',
  },
  {
    name: 'Defold 3D Asset Pipeline',
    blurb:
      'Convert, normalize, and validate external 3D content into a Defold project: glTF and GLB import, scale and grounding normalization, material and texture wiring, animation clips, and the offline bake scripts that produce them. Use when imported models render at the wrong size, sink into the ground, lose their textures, or drift out of position during animation. Encodes the measured traps: mixed skinned and unskinned rigs drawing differently so skinned meshes sit vertically centred while unskinned ones sit grounded, height normalization on the wrong axis turning a flat coin into a slab and a long vehicle into a toy, non-in-place clips needing root-motion cancellation baked at conversion time with the vertical axis detected per rig rather than hardcoded, and engine point-release changes to whether imported node transforms are preserved.',
  },
  {
    name: 'Game Reverse Engineering Spec',
    blurb:
      'Read an existing game — a reference implementation, another engine\'s source, or a shipped build — and produce an implementable, per-screen specification that a port can be built and audited against. Covers tracing presentation values to their source file and line, separating observed behaviour from system chrome that must be measured on a running build, recording deliberate differences as decisions rather than defects, and explicitly listing what was not traced and why. Use before porting a game between engines, rebuilding a legacy title, or auditing a port for fidelity. A spec whose unknowns are unmarked will be implemented as guesses.',
  },
  {
    name: 'Defold Native Extension Engineering',
    blurb:
      'Plan, build, debug, or audit a Defold native extension in C or C++ across platforms, covering ext.manifest structure, the Lua binding boundary, platform conditionals, app manifests, third-party library linkage, and cloud-build behavior. Use when a required capability is missing from the engine API or an existing extension fails to build or link; prefer a pure Lua solution when one exists.',
  },
  {
    name: 'Browser Game Performance Audit',
    blurb:
      'Profile and improve browser-game loading, frame time, input latency, memory, garbage collection, rendering, network delivery, and lifecycle behavior with before-and-after evidence. Use for slow startup, low FPS, stutter, long tasks, mobile overheating, memory growth, WebGL context loss, large bundles, or regressions in Defold HTML5, Three.js, Phaser, PixiJS, Canvas, or vanilla WebGL games.',
  },
  {
    name: 'Responsive Game Input',
    blurb:
      'Design and verify one responsive browser-game input layer across keyboard, mouse, touch, pen, and gamepad, including Defold input bindings, coordinate scaling, focus, resize, orientation, and lifecycle handling. Use when adding cross-device controls, fixing duplicate or dropped input, mapping pointer coordinates to a scaled canvas or camera, reducing input latency, or making a web game reliable on desktop and mobile browsers.',
  },
  {
    name: 'Persistent Multiplayer Server Design',
    blurb:
      'Design, implement, or audit an authoritative real-time multiplayer server for a persistent game world, including simulation ticks, protocols, interest management, client reconciliation, admission queues, reconnects, spectators, checkpoints, safe restarts, security, and operational budgets. Use when players share a long-lived world or room and server correctness must survive churn and deployment; use Multiplayer Load and Soak Testing for capacity proof, and leave gameplay scoring, economy, and fairness values to the systems-design owner.',
  },
  {
    name: 'Web Game Multi-Portal Adapter',
    blurb:
      'Design, implement, migrate, or audit a reusable multi-portal adapter for browser games across Defold HTML5, JavaScript or TypeScript frameworks, and other engines with documented browser interop. Use when one game targets two or more portals, or when an existing shared portal subsystem has scattered vendor calls, and needs a stable game-facing lifecycle, capability matrix, isolated provider modules, ads, save, score, pause and audio contracts, deterministic build variants, local fakes, and SDK-isolation tests; use only the dedicated platform skill when the work targets one provider, and Web Portal Readiness Check for final artifact QA.',
  },
  {
    name: 'Poki SDK Integration',
    blurb:
      'Integrate, repair, migrate, or audit the current official Poki SDK in HTML5 and Defold HTML5 games. Use when preparing a game for Poki, wiring initialization and loading, gameplay, commercial-break, rewarded-break, or audio lifecycle behavior through the Defold HTML5 JavaScript interop boundary, validating in Poki Inspector, or diagnosing a rejected or broken Poki build.',
  },
  {
    name: 'CrazyGames SDK Integration',
    blurb:
      'Integrate, repair, migrate, or audit the current official CrazyGames SDK in HTML5 and Defold HTML5 games. Use when preparing a Basic or Full Launch, wiring SDK initialization, gameplay and loading events, ads, saves, accounts, or portal preview behavior, or diagnosing CrazyGames QA and integration failures.',
  },
  {
    name: 'GameDistribution SDK Integration',
    blurb:
      'Verify, integrate, repair, or audit the official current GameDistribution SDK for HTML5 or Defold HTML5 games. Use when preparing a GameDistribution build, adding ads or platform lifecycle handling, migrating an older GD integration, or diagnosing portal QA failures; require current first-party SDK evidence before changing code.',
  },
  {
    name: 'YouTube Playables Export',
    blurb:
      'Adapt, package, test, or audit an HTML5 or Defold HTML5 game for YouTube Playables. Use when integrating the current Playables SDK, readiness signals, pause and audio events, storage, score or ads APIs, making a self-contained compliant bundle, running the official test suite, or preparing an invitation-only Developer Portal certification release.',
  },
  {
    name: 'Wavedash SDK Integration',
    blurb:
      'Integrate, repair, migrate, or audit the current official Wavedash SDK in browser games across any engine that exports to the web, including Defold. Use when preparing a game for Wavedash, wiring initialization and load reporting, or adding player identity, achievements, leaderboards, cloud saves, UGC, multiplayer lobbies and P2P networking, or paid content. Always negotiate integration scope with the user before editing; never infer wanted features from the codebase.',
  },
  {
    name: 'Coolmath Games Integration',
    blurb:
      'Prepare, integrate, and audit an HTML5 or Defold HTML5 game for Coolmath Games, covering the public eligibility gate, licensing removals, the dedicated build variant, and integration of the partner-supplied SDK once it is provided. Use when targeting Coolmath Games from Defold, Three.js, Phaser, PixiJS, Canvas, or vanilla JavaScript. Coolmath’s SDK is not publicly documented, so never invent its API — obtain the developer’s own bundle and documentation before wiring any call.',
  },
  {
    name: 'itch.io Release Preparation',
    blurb:
      'Prepare, upload, and audit a Defold HTML5 or desktop build for itch.io, covering the embedded player frame size, fullscreen and SharedArrayBuffer settings, channel naming, butler pushes, and store-page metadata. Use when publishing a build or a devlog update to itch.io, or when the embedded game fails to size, focus, or load correctly in the itch player.',
  },
  {
    name: 'Web Portal Readiness Check',
    blurb:
      'Audit an HTML5, WebGL, Canvas, Phaser, PixiJS, Three.js, vanilla JavaScript, or Defold HTML5 build before submission to a web-game portal. Use for packaging, loading, iframe, browser, input, audio, storage, network, performance, SDK lifecycle, privacy, metadata, or multi-portal readiness checks and release go/no-go decisions.',
  },
  {
    name: 'Game UI/UX Audit',
    blurb:
      'Use when reviewing an existing game’s HUD, GUI scenes, menus, navigation, readability, input flow, accessibility, localization readiness, or responsive behavior and turning the findings into prioritized implementation changes.',
  },
  {
    name: 'First-Time User Experience Review',
    blurb:
      'Use when players are confused, abandoning early, skipping tutorials, or failing to reach the first satisfying moment and the game’s onboarding or first-session experience needs evidence-based improvement.',
  },
  {
    name: 'Core Loop Review',
    blurb:
      'Use when a game feels repetitive, aimless, unrewarding, unclear, or unable to retain interest and its moment-to-moment actions, feedback, rewards, progression, and repeated player decisions need analysis.',
  },
  {
    name: 'Difficulty Curve Analysis',
    blurb:
      'Use when players encounter difficulty spikes, boredom, repeated failure, inconsistent challenge, unfairness, or poor progression and the game needs evidence-based diagnosis and tuning across levels or encounters.',
  },
  {
    name: 'Playtest Feedback Triage',
    blurb:
      'Use when turning playtest notes, recordings, telemetry, surveys, bug reports, or conflicting player opinions into evidence clusters, root-cause hypotheses, and a prioritized change and validation plan.',
  },
  {
    name: 'Game Tuning Workbench',
    blurb:
      'Build a concept-specific, creator-facing game tuning workbench that exposes only meaningful camera, lighting, control, movement, difficulty, UI, VFX, audio, or other project parameters; previews candidates; and exports a versioned, validated draft settings package for specialist review and engine-specific application. Use only when the requested deliverable is an interactive tuning panel, visual variant workbench, or agent-readable settings handoff, not for ordinary tuning advice. Prefer an existing editor inspector or the smallest project-local tool.',
  },
  {
    name: 'Game Quality Gauntlet',
    blurb:
      'Run a Gauntlet Loop for game production by decomposing an ambitious playable goal into judgeable workstreams, pairing builders with fresh-context critics, comparing real artifacts against explicit references or metrics, integrating coupled systems, and iterating within a defined budget. Use for vertical slices, major visual or gameplay polish passes, or multi-system quality pushes where one-pass implementation is not enough; use a focused skill instead for one bug, audit, balance question, or regression check.',
  },
  {
    name: 'Game Release Regression Check',
    blurb:
      'Plan and execute a risk-based regression pass on a candidate game release across gameplay, saves, GUI, input, audio, performance, platform SDKs, packaging, and engine upgrades. Use before shipping a build, after engine or SDK changes, when validating a hotfix, or when deciding whether a release candidate is safe to promote.',
  },
];

const ROSTER = [
  ...AGENTS.map((a) => ({ ...a, kind: 'agent' })),
  ...SKILLS.map((s) => ({ ...s, kind: 'skill' })),
];

const REGISTRY = {
  version: '0.9.0',
  agents: AGENTS.length,
  skills: SKILLS.length,
  members: ROSTER.length,
  price: 39,
};
