import { useEffect, useRef, useState, type MouseEvent } from "react";
import AmbientCanopy from "./components/AmbientCanopy";
import {
  aboutIntro,
  contactLinks,
  currentSignal,
  experimentProjects,
  featuredProjects,
  githubProfileUrl,
  heroMetrics,
  navSections,
  papers,
  plannedProjects,
  privateProjects,
  researchIntro,
  thesis,
  writings,
  type EvidenceLink,
  type PaperEntry,
  type ProjectEntry,
} from "./content/site";

type TerminalEntry = {
  kind: "command" | "output";
  text: string;
  accent?: boolean;
};

const terminalEntries: TerminalEntry[] = [
  {
    kind: "command",
    text: "whoami",
  },
  {
    kind: "output",
    text: "AI / ML engineer working between research and shipped systems.",
  },
  {
    kind: "command",
    text: "cat about.txt",
  },
  {
    kind: "output",
    text: aboutIntro,
  },
  {
    kind: "command",
    text: "tail -n 1 current_focus.log",
  },
  {
    kind: "output",
    text: "Current focus: efficient inference, model routing, and LLM systems that behave well in the real world.",
    accent: true,
  },
];

function linkKindLabel(kind: EvidenceLink["kind"]) {
  switch (kind) {
    case "repo":
      return "Repo";
    case "article":
      return "Article";
    case "paper-index":
      return "Index";
    case "preprint":
      return "Preprint";
    case "linkedin-post":
      return "LinkedIn";
    case "demo":
      return "Demo";
    case "download":
      return "Download";
    case "contact":
      return "Contact";
    default:
      return "Link";
  }
}

function statusLabel(status: ProjectEntry["status"] | PaperEntry["status"]) {
  switch (status) {
    case "live":
      return "Live proof";
    case "private-case-study":
      return "Private case study";
    case "in-progress":
      return "In progress";
    case "planned":
      return "Planned";
    case "under-review":
      return "Under review";
    default:
      return status;
  }
}

function paperMetaLabel(paper: PaperEntry) {
  return paper.venue ?? paper.year;
}

function LinkPill({ link }: { link: EvidenceLink }) {
  const opensNewTab = link.href.startsWith("http");

  return (
    <a
      className="link-pill"
      href={link.href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
    >
      <span>{link.label}</span>
      <span className="link-pill-kind">{linkKindLabel(link.kind)}</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{body}</p>
    </div>
  );
}

function TerminalTranscript({ entries }: { entries: TerminalEntry[] }) {
  const [progress, setProgress] = useState(() => entries.map(() => 0));

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(entries.map((entry) => entry.text.length));
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    setProgress(entries.map(() => 0));

    const revealEntry = (entryIndex: number) => {
      if (cancelled || entryIndex >= entries.length) {
        return;
      }

      const entry = entries[entryIndex];
      const speed = entry.kind === "command" ? 32 : 16;
      const pauseAfter = entry.kind === "command" ? 180 : 320;
      let charIndex = 0;

      const tick = () => {
        if (cancelled) {
          return;
        }

        charIndex += 1;
        setProgress((current) =>
          current.map((value, index) =>
            index === entryIndex ? Math.min(charIndex, entry.text.length) : value,
          ),
        );

        if (charIndex < entry.text.length) {
          timers.push(window.setTimeout(tick, speed));
          return;
        }

        timers.push(window.setTimeout(() => revealEntry(entryIndex + 1), pauseAfter));
      };

      timers.push(window.setTimeout(tick, entry.kind === "command" ? 140 : 100));
    };

    timers.push(window.setTimeout(() => revealEntry(0), 220));

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [entries]);

  const currentIndex = progress.findIndex((count, index) => count < entries[index].text.length);
  const activeIndex = currentIndex === -1 ? entries.length - 1 : currentIndex;
  const sequenceComplete = progress.every((count, index) => count >= entries[index].text.length);

  return (
    <>
      {entries.map((entry, index) => {
        const visibleCount = progress[index];

        if (visibleCount === 0 && index > activeIndex) {
          return null;
        }

        if (visibleCount === 0 && index !== activeIndex) {
          return null;
        }

        const text = entry.text.slice(0, visibleCount);
        const isCurrentLine = index === activeIndex;
        const showCursor = isCurrentLine && (!sequenceComplete || index === entries.length - 1);
        const className = [
          "terminal-line",
          entry.kind === "command" ? "terminal-line-command" : "terminal-line-output",
          entry.accent ? "intro-card-note" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <p
            key={`${entry.kind}-${entry.text}`}
            className={className}
          >
            {entry.kind === "command" ? <span className="terminal-prompt">$</span> : null}
            {text}
            {showCursor ? (
              <span
                className="terminal-cursor"
                aria-hidden="true"
              />
            ) : null}
          </p>
        );
      })}
    </>
  );
}

function getInitialSectionId(): (typeof navSections)[number]["id"] {
  if (typeof window === "undefined") {
    return "hero";
  }

  const hash = window.location.hash.replace(/^#/, "");
  const matched = navSections.find((section) => section.id === hash);
  return matched?.id ?? "hero";
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <article className="surface-card project-card">
      <div className="card-topline">
        <span className={`status-pill status-${project.status}`}>{statusLabel(project.status)}</span>
        <span className="year-pill">{project.year}</span>
      </div>
      <p className="project-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      <p className="project-impact">{project.impact}</p>
      <div className="stack-list">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="link-row">
        {project.proofLinks.length > 0 ? (
          project.proofLinks.map((link) => (
            <LinkPill
              key={`${project.slug}-${link.label}`}
              link={link}
            />
          ))
        ) : (
          <p className="muted-line">
            Placeholder for the public repo, write-up, and demo that will land when this build ships.
          </p>
        )}
      </div>
    </article>
  );
}

function PaperRow({
  paper,
  expanded,
  onToggle,
}: {
  paper: PaperEntry;
  expanded: boolean;
  onToggle: (slug: string) => void;
}) {
  return (
    <article className="surface-card paper-row">
      <button
        type="button"
        className="paper-trigger"
        onClick={() => onToggle(paper.slug)}
        aria-expanded={expanded}
        aria-controls={`${paper.slug}-detail`}
      >
        <div className="paper-trigger-copy">
          <p className="paper-theme">{paper.theme}</p>
          <h3>{paper.displayTitle}</h3>
          <p className="paper-full-title">{paper.fullTitle}</p>
        </div>
        <div className="paper-trigger-meta">
          <span className="status-pill status-under-review">{statusLabel(paper.status)}</span>
          <span className="year-pill">{paperMetaLabel(paper)}</span>
        </div>
      </button>

      <div
        className={`expand-region ${expanded ? "open" : ""}`}
        id={`${paper.slug}-detail`}
      >
        <div className="expand-region-content">
          <p className="detail-copy">{paper.summary}</p>
          {paper.proofLinks.length > 0 ? (
            <div className="link-row">
              {paper.proofLinks.map((link) => (
                <LinkPill
                  key={`${paper.slug}-${link.label}`}
                  link={link}
                />
              ))}
            </div>
          ) : (
            <p className="muted-line">Public proof can be attached when the review cycle is ready.</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const initialSectionId = getInitialSectionId();
  const mainRef = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState<(typeof navSections)[number]["id"]>(initialSectionId);
  const [openPaper, setOpenPaper] = useState(papers[0]?.slug ?? "");
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navSections.map((section) => [section.id, section.id === initialSectionId])),
  );
  const portraitAsset = "/portrait-hero.jpg";
  const primaryContactLinks = contactLinks.filter((link) =>
    ["Email", "LinkedIn"].includes(link.label),
  );
  const featuredPapers = papers.filter((paper) => paper.featured);
  const archivePapers = papers.filter((paper) => !paper.featured);

  const scrollToSection = (
    sectionId: (typeof navSections)[number]["id"],
    behavior: ScrollBehavior = "smooth",
  ) => {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    setActiveSection(sectionId);
    setVisibleSections((current) => ({
      ...current,
      [sectionId]: true,
    }));

    target.scrollIntoView({
      behavior,
      block: "start",
    });
  };

  const handleSectionLink =
    (sectionId: (typeof navSections)[number]["id"]) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, "", `#${sectionId}`);
      }

      scrollToSection(sectionId);
    };

  useEffect(() => {
    const syncToHash = () => {
      const nextSection = getInitialSectionId();
      scrollToSection(nextSection, "auto");
    };

    window.requestAnimationFrame(syncToHash);
    window.addEventListener("hashchange", syncToHash);

    const elements = navSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((current) => ({
              ...current,
              [entry.target.id]: true,
            }));
          }
        });

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as (typeof navSections)[number]["id"]);
        }
      },
      {
        root:
          mainRef.current && mainRef.current.scrollHeight > mainRef.current.clientHeight + 1
            ? mainRef.current
            : null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.14, 0.32, 0.6],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncToHash);
    };
  }, []);

  return (
    <div className="site-shell">
      <AmbientCanopy />

      <header className="topbar">
        <div className="topbar-shell">
          <nav className="section-nav">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={activeSection === section.id ? "active" : ""}
                onClick={handleSectionLink(section.id)}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
            </a>
            <a href="/downloads/nelson-lubah-thesis.pdf">Thesis PDF</a>
            <a href="/downloads/nelson-lubah-resume.pdf">Resume PDF</a>
          </div>
        </div>
      </header>

      <main ref={mainRef} className="page-main">
        <section
          id="hero"
          className={`section-shell hero-shell ${visibleSections.hero ? "is-visible" : ""}`}
        >
          <div className="hero-stage">
            <article className="surface-card intro-card intro-terminal-card">
              <div className="intro-terminal-bar" aria-hidden="true">
                <div className="intro-terminal-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="intro-terminal-title">about.sh</p>
                <p className="intro-terminal-status">live session</p>
              </div>

              <div className="intro-terminal-body">
                <div className="intro-terminal-profile">
                  <span className="intro-terminal-avatar-shell" aria-hidden="true">
                    <img
                      src={portraitAsset}
                      alt=""
                      className="intro-terminal-avatar"
                    />
                  </span>
                  <div className="intro-terminal-heading">
                    <p className="intro-terminal-name">Lubah Nelson</p>
                    <p className="intro-terminal-role">AI / ML engineer</p>
                  </div>
                </div>

                <div className="intro-terminal-screen" aria-label="About terminal">
                  <TerminalTranscript entries={terminalEntries} />
                </div>
              </div>
            </article>

            <div className="hero-grid">
              <div className="hero-copy-column">
                <p className="eyebrow">AI systems built with constraints in mind</p>
                <h1>AI systems that do more with less.</h1>
                <p className="hero-lede">
                  I build AI systems across research and production: edge models that stop early,
                  routing and retrieval systems that cut wasted compute, and public projects that
                  make the work easy to inspect.
                </p>

                <div className="hero-cta-row">
                  <a
                    className="primary-cta"
                    href="#featured"
                    onClick={handleSectionLink("featured")}
                  >
                    Explore the work
                  </a>
                  <a
                    className="secondary-cta"
                    href={githubProfileUrl}
                  >
                    GitHub
                  </a>
                </div>

                <div className="hero-copy-grid">
                  <p>
                    My background spans Berkeley, federal forecasting work, graduate research at
                    WSU, and private startup AI systems.
                  </p>
                  <p>
                    This site starts with public proof, then moves into the paper line and the
                    private work that is harder to show in full.
                  </p>
                </div>

                <div className="metric-grid">
                  {heroMetrics.map((metric) => (
                    <article
                      key={metric.label}
                      className="surface-card metric-card"
                    >
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                      <p>{metric.detail}</p>
                    </article>
                  ))}
                </div>

                <a
                  className="scroll-cue"
                  href="#featured"
                  onClick={handleSectionLink("featured")}
                >
                  <span className="scroll-cue-line" />
                  <span>Scroll into selected work</span>
                </a>
              </div>

              <aside className="hero-side-column">
                <article className="surface-card signal-card">
                  <p className="eyebrow">Current signal</p>
                  <h3>{currentSignal.title}</h3>
                  <p>{currentSignal.detail}</p>
                </article>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="featured"
          className={`section-shell ${visibleSections.featured ? "is-visible" : ""}`}
        >
          <SectionHeading
            eyebrow="Selected work"
            title="Projects you can actually inspect."
            body="This section is the public proof: code, write-ups, and artifacts you can open right away."
          />
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>

          <div className="project-roadmap">
            <div className="project-roadmap-heading">
              <p className="eyebrow">Original work</p>
              <h3>Research prototypes and original builds.</h3>
              <p className="detail-copy">
                This is where I explore ideas from scratch: testing model behavior, designing
                algorithms, and turning rough questions into working systems.
              </p>
            </div>

            <div className="project-grid">
              {experimentProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>

          <div className="project-roadmap">
            <div className="project-roadmap-heading">
              <p className="eyebrow">Building next</p>
              <h3>Public builds queued up for the next skill gaps.</h3>
              <p className="detail-copy">
                These are placeholders on purpose. Each one is a real build queue item meant to
                turn private or missing skills into public proof.
              </p>
            </div>

            <div className="project-grid">
              {plannedProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="research"
          className={`section-shell ${visibleSections.research ? "is-visible" : ""}`}
        >
          <SectionHeading
            eyebrow="Papers & Thesis"
            title="The research line behind the systems work."
            body={researchIntro}
          />

          <div className="research-grid">
            <article className="surface-card thesis-card">
              <div className="card-topline">
                <span className="status-pill status-thesis">Flagship thesis</span>
                <span className="year-pill">{thesis.date}</span>
              </div>
              <h3>{thesis.title}</h3>
              <p className="project-summary">{thesis.summary}</p>
              <p className="muted-line">{thesis.institution}</p>

              <div className="finding-list">
                {thesis.keyFindings.map((finding) => (
                  <div
                    key={finding}
                    className="finding-item"
                  >
                    <span className="finding-dot" />
                    <p>{finding}</p>
                  </div>
                ))}
              </div>

              <div className="link-row">
                {thesis.proofLinks.map((link) => (
                  <LinkPill
                    key={`thesis-${link.label}`}
                    link={link}
                  />
                ))}
              </div>
            </article>

            <div className="research-side">
              {featuredPapers.map((paper) => (
                <article
                  key={paper.slug}
                  className="surface-card paper-teaser-card"
                >
                  <div className="card-topline">
                    <span className="status-pill status-under-review">{statusLabel(paper.status)}</span>
                    <span className="year-pill">{paperMetaLabel(paper)}</span>
                  </div>
                  <p className="paper-theme">{paper.theme}</p>
                  <h3>{paper.displayTitle}</h3>
                  <p className="project-summary">{paper.summary}</p>
                  <div className="link-row">
                    {paper.proofLinks.length > 0 ? (
                      paper.proofLinks.map((link) => (
                        <LinkPill
                          key={`${paper.slug}-${link.label}`}
                          link={link}
                        />
                      ))
                    ) : (
                      <p className="muted-line">Proof links can stay private until the review cycle is ready.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {archivePapers.length > 0 ? (
            <div className="paper-archive">
              <div className="paper-archive-heading">
                <p className="eyebrow">Further papers</p>
                <h3>Additional work from the same research line.</h3>
                <p className="detail-copy">
                  The thesis and core papers sit above; the rest of the under-review work stays visible
                  here without pretending everything belongs at the same level of emphasis.
                </p>
              </div>

              <div className="paper-list">
                {archivePapers.map((paper) => (
                  <PaperRow
                    key={paper.slug}
                    paper={paper}
                    expanded={openPaper === paper.slug}
                    onToggle={(slug) => setOpenPaper(openPaper === slug ? "" : slug)}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section
          id="private-work"
          className={`section-shell ${visibleSections["private-work"] ? "is-visible" : ""}`}
        >
          <SectionHeading
            eyebrow="Private work"
            title="Real systems, shared without the confidential parts."
            body="These projects show the problem, the ownership, and the technical difficulty without oversharing details that should stay private."
          />
          <div className="project-grid">
            {privateProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        </section>

        <section
          id="writing"
          className={`section-shell ${visibleSections.writing ? "is-visible" : ""}`}
        >
          <SectionHeading
            eyebrow="Writing"
            title="Writing that explains the work clearly."
            body="I like making technical work legible. These pieces are the public explanation layer for some of the projects above."
          />
          <div className="simple-grid">
            {writings.map((entry) => (
              <article
                key={entry.title}
                className="surface-card simple-card"
              >
                <div className="card-topline">
                  <span className="status-pill status-published">Published</span>
                  <span className="year-pill">{entry.date}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <div className="link-row">
                  {entry.proofLinks.map((link) => (
                    <LinkPill
                      key={`${entry.title}-${link.label}`}
                      link={link}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={`section-shell section-shell-last ${visibleSections.contact ? "is-visible" : ""}`}
        >
          <article className="surface-card contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Open to AI systems, research, and applied ML roles.</h2>
            <p className="contact-copy">
              If you want to talk about the thesis, the private systems work, the public projects,
              or what I am building next, this is the best place to start.
            </p>
            <div className="link-row">
              {primaryContactLinks.map((link) => (
                <LinkPill
                  key={`contact-${link.label}`}
                  link={link}
                />
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
