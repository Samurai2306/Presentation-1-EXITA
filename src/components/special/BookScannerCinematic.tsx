"use client";

import * as React from "react";

import styles from "./BookScannerCinematic.module.css";

type MarkTone = "neutral" | "good" | "bad";

type TokenData = {
  id: string;
  text: string;
  tone: MarkTone;
  shift: number;
};

type LineData = {
  id: string;
  tokens: TokenData[];
};

type PageData = {
  id: string;
  lines: LineData[];
};

const WORDS = [
  "policy",
  "context",
  "syntax",
  "evidence",
  "framework",
  "consistency",
  "source",
  "signal",
  "priority",
  "scope",
  "accuracy",
  "structure",
  "review",
  "vector",
  "flow",
  "index",
  "token",
  "metric",
  "timeline",
  "criteria",
  "quality",
  "baseline",
  "intent",
  "mapping",
  "segment",
  "gateway",
  "status",
  "contract",
  "article",
  "method",
  "citation",
  "result",
  "analysis",
  "checkpoint",
  "revision",
  "feedback",
];

const PAGE_COUNT = 4;
const LINES_PER_PAGE = 7;
const CYCLE_MS = 42000;
const INITIAL_SEED = 20260429;

function joinClasses(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(" ");
}

type Rng = () => number;

function createSeededRng(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function randomIntWithRng(min: number, max: number, rng: Rng): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randomWord(rng: Rng): string {
  return WORDS[randomIntWithRng(0, WORDS.length - 1, rng)];
}

function createLine(pageIndex: number, lineIndex: number, rng: Rng): LineData {
  const tokenCount = randomIntWithRng(4, 7, rng);
  const tokens: TokenData[] = [];

  for (let i = 0; i < tokenCount; i += 1) {
    const roll = rng();
    const tone: MarkTone = roll < 0.12 ? "bad" : roll < 0.24 ? "good" : "neutral";

    tokens.push({
      id: `p${pageIndex}-l${lineIndex}-t${i}`,
      text: randomWord(rng),
      tone,
      shift: Number((rng() * 4.8).toFixed(2)),
    });
  }

  return {
    id: `p${pageIndex}-l${lineIndex}`,
    tokens,
  };
}

function ensureTonePresence(lines: LineData[], rng: Rng): LineData[] {
  const allTokens = lines.flatMap((line) => line.tokens);
  if (allTokens.length < 2) {
    return lines;
  }

  const hasBad = allTokens.some((token) => token.tone === "bad");
  const hasGood = allTokens.some((token) => token.tone === "good");

  if (!hasBad) {
    const candidate = allTokens[randomIntWithRng(0, allTokens.length - 1, rng)];
    candidate.tone = "bad";
    candidate.shift = Number((rng() * 4.8).toFixed(2));
  }

  if (!hasGood) {
    const neutralTokens = allTokens.filter((token) => token.tone !== "bad");
    const fallbackPool = neutralTokens.length > 0 ? neutralTokens : allTokens;
    const candidate = fallbackPool[randomIntWithRng(0, fallbackPool.length - 1, rng)];
    candidate.tone = "good";
    candidate.shift = Number((rng() * 4.8).toFixed(2));
  }

  return lines;
}

function createPages(rng: Rng): PageData[] {
  return Array.from({ length: PAGE_COUNT }, (_, pageIndex) => {
    const lines = Array.from({ length: LINES_PER_PAGE }, (_, lineIndex) => createLine(pageIndex, lineIndex, rng));
    return {
      id: `page-${pageIndex}`,
      lines: ensureTonePresence(lines, rng),
    };
  });
}

function createRandomPages(): PageData[] {
  return createPages(() => Math.random());
}

function createInitialPages(): PageData[] {
  return createPages(createSeededRng(INITIAL_SEED));
}

function renderPageContent(lines: LineData[]) {
  return (
    <span className={styles.pageContent}>
      {lines.map((line) => (
        <span key={line.id} className={styles.line}>
          {line.tokens.map((token) => {
            const toneClass = token.tone === "good" ? styles.good : token.tone === "bad" ? styles.bad : styles.neutral;
            return (
              <span
                key={token.id}
                className={joinClasses(styles.word, toneClass)}
                style={{ "--mark-shift": `${token.shift}s` } as React.CSSProperties}
              >
                {token.text}
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export function BookScannerCinematic({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [pages, setPages] = React.useState<PageData[]>(() => createInitialPages());
  const primaryPage = pages[0];

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPages(createRandomPages());
    }, CYCLE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className={joinClasses(styles.scene, compact && styles.compactScene, className)}
      aria-label="Cinematic scanner book animation"
    >
      <div className={joinClasses(styles.book, compact && styles.compactBook)}>
        <span className={styles.rightPage} />
        <span className={styles.leftPage}>
          <span className={`${styles.sheetFace} ${styles.sheetFront}`}>{primaryPage ? renderPageContent(primaryPage.lines) : null}</span>
        </span>

        {pages.map((page) => (
          <span key={page.id} className={`${styles.page} ${styles.turn}`}>
            <span className={`${styles.sheetFace} ${styles.sheetFront}`}>
              {renderPageContent(page.lines)}
              <span className={styles.scanner} />
            </span>
            <span className={`${styles.sheetFace} ${styles.sheetBack}`}>{renderPageContent(page.lines)}</span>
          </span>
        ))}

      </div>
    </section>
  );
}
