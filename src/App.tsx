import { useEffect, useRef, useState, type MouseEvent } from "react";
import AmbientCanopy from "./components/AmbientCanopy";
import {
  aboutIntro,
  contactLinks,
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
  type WritingEntry,
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
    text: "AI / ML engineer connecting research depth with production systems.",
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
    text: "Graduating May 2026 and looking for AI / ML engineering roles in LLM systems, efficient inference, evaluation, and applied ML infrastructure.",
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
    case "research":
      return "Research";
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

function writingStatusLabel(status: WritingEntry["status"]) {
  switch (status) {
    case "published":
      return "Published";
    case "draft":
      return "Draft";
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
      {project.proofLinks.length > 0 ? (
        <div className="link-row">
          {project.proofLinks.map((link) => (
            <LinkPill
              key={`${project.slug}-${link.label}`}
              link={link}
            />
          ))}
        </div>
      ) : project.status === "planned" ? (
        <p className="muted-line">Public repo, write-up, and demo will be added as the build ships.</p>
      ) : null}
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
    ["Email", "LinkedIn", "GitHub", "Resume PDF"].includes(link.label),
  );
  const featuredPapers = papers.filter((paper) => paper.featured);
  const archivePapers = papers.filter((paper) => !paper.featured);
  const publishedWritings = writings.filter((entry) => entry.status === "published");
  const draftWritings = writings.filter((entry) => entry.status === "draft");

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
                <h1>AI and ML systems built for real constraints.</h1>
                <p className="hero-lede">
                  I build AI and ML systems where accuracy, latency, cost, and reliability are
                  design constraints from the start. My work spans LLM routing, efficient
                  inference research, forecasting systems, retrieval and evaluation pipelines, and
                  production AI prototypes.
                </p>

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

                <a
                  className="scroll-cue"
                  href="#featured"
                  onClick={handleSectionLink("featured")}
                >
                  <span className="scroll-cue-line" />
                  <span>Scroll into selected work</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="featured"
          className={`section-shell ${visibleSections.featured ? "is-visible" : ""}`}
        >
          <SectionHeading
            eyebrow="Selected work"
            title="Selected systems work."
            body="A mix of public repos, write-ups, and research-backed builds across efficient inference, forecasting, and applied ML."
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
              <p className="eyebrow">Research labs</p>
              <h3>Research prototypes and original builds.</h3>
              <p className="detail-copy">
                Self-directed projects where I test ideas from scratch, build algorithms, and make technical behavior easier to inspect.
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

          {plannedProjects.length > 0 ? (
            <div className="project-roadmap">
              <div className="project-roadmap-heading">
                <p className="eyebrow">Building next</p>
                <h3>Two public labs in progress.</h3>
                <p className="detail-copy">
                  These are the next public builds meant to turn private or missing skills into visible systems work.
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
          ) : null}
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
                  The thesis and core papers sit above; the rest stays visible here without pretending every item belongs at the same level of emphasis.
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
            title="Private AI systems work."
            body="These case studies focus on ownership, system design, and constraints while leaving confidential implementation details out."
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
            title="Technical writing."
            body="I write to make technical systems easier to inspect."
          />
          <div className="project-roadmap">
            <div className="project-roadmap-heading">
              <p className="eyebrow">Published</p>
              <h3>Published pieces.</h3>
            </div>
            <div className="simple-grid">
              {publishedWritings.map((entry) => (
                <article
                  key={entry.title}
                  className="surface-card simple-card"
                >
                  <div className="card-topline">
                    <span className={`status-pill status-${entry.status}`}>{writingStatusLabel(entry.status)}</span>
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
          </div>

          <div className="project-roadmap">
            <div className="project-roadmap-heading">
              <p className="eyebrow">In progress</p>
              <h3>Drafts in progress.</h3>
            </div>
            <div className="simple-grid">
              {draftWritings.map((entry) => (
                <article
                  key={entry.title}
                  className="surface-card simple-card"
                >
                  <div className="card-topline">
                    <span className={`status-pill status-${entry.status}`}>{writingStatusLabel(entry.status)}</span>
                    <span className="year-pill">{entry.date}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <p className="muted-line">Writing now.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`section-shell section-shell-last ${visibleSections.contact ? "is-visible" : ""}`}
        >
          <article className="surface-card contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Open to AI systems, ML engineering, research engineering, and applied AI roles.</h2>
            <p className="contact-copy">
              I am especially interested in work involving LLM infrastructure, model evaluation,
              retrieval, forecasting, efficient inference, and production AI systems.
            </p>
            <p className="contact-copy">
              I like work where model behavior has to survive deployment: evaluation, retrieval,
              routing, and inference decisions that affect cost, latency, and reliability. I&apos;m
              also exploring the founder path by building systems that turn the efficiency question
              into a product.
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
