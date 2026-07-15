<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'maxstash – Apps by Max Morhardt',
  description:
    'maxstash is home to the apps Max Morhardt builds and runs for game day and get-togethers, including Squares and Olympics. Start a game, share the link, and everyone plays along live.',
  canonical: 'https://maxstash.io/apps',
});

interface App {
  name: string;
  icon: string;
  tagline: string;
  description: string;
  howToPlay: string[];
  href: string;
}

const apps: App[] = [
  {
    name: 'Squares',
    icon: 'pi pi-th-large',
    tagline: 'Football squares for the whole party',
    description:
      'The classic Super Bowl squares pool, online. One person sets up the board for a game, everyone else claims squares, and the app draws the numbers and figures out who wins each quarter.',
    howToPlay: [
      'Create a pool for an upcoming football game',
      'Friends join and claim the squares they want',
      'Numbers are drawn at random once the board fills up',
      'Winners light up automatically as each quarter ends',
    ],
    href: 'https://squares.maxstash.io',
  },
  {
    name: 'Olympics',
    icon: 'pi pi-sitemap',
    tagline: 'Backyard tournament, bracket and all',
    description:
      'Run a backyard olympics without the spreadsheet. Add everyone playing, let the app build fair teams and group stages, then record results as you go and watch the bracket play out to a champion.',
    howToPlay: [
      'Add the people playing and the events',
      'Random teams and group stages are generated for you',
      'Punch in match results as each game finishes',
      'Standings and the playoff bracket update in real time',
    ],
    href: 'https://olympics.maxstash.io',
  },
];

const steps = [
  {
    icon: 'pi pi-plus-circle',
    title: 'Start a game',
    body: 'Pick an app and set up a squares pool or an olympics bracket in a couple of taps.',
  },
  {
    icon: 'pi pi-share-alt',
    title: 'Invite everyone',
    body: 'Share a link and friends join from their own phones, with nothing to install.',
  },
  {
    icon: 'pi pi-shield',
    title: 'Sign in once',
    body: 'Players sign in with Google or GitHub, and the same account works across every maxstash app.',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Play along live',
    body: 'Squares, numbers, scores, and standings update instantly for everyone as the game unfolds.',
  },
];
</script>

<template>
  <section class="apps">
    <!-- hero: what maxstash is -->
    <div class="hero full-bleed">
      <div class="hero__bg" aria-hidden="true">
        <div class="glow glow--1" />
        <div class="glow glow--2" />
      </div>
      <div class="container hero__inner">
        <RevealSection as="span" class="eyebrow">
          <span class="pi pi-box" />
          Live apps
        </RevealSection>
        <RevealSection :delay="1" as="h1" class="hero__title">maxstash</RevealSection>
        <RevealSection :delay="2" as="p" class="hero__lede">
          maxstash is home to a couple of apps built for game day and get-togethers. Start a game,
          share the link, and everyone plays along on their own phone while it updates live.
        </RevealSection>
        <RevealSection :delay="3" as="div" class="hero__meta">
          <span class="pill"><span class="pi pi-th-large" /> {{ apps.length }} live apps</span>
          <span class="pill"><span class="pi pi-users" /> Play with friends</span>
          <span class="pill"><span class="pi pi-bolt" /> Live updates</span>
        </RevealSection>
      </div>
    </div>

    <div class="container body">
      <!-- apps: what each game is and how it plays -->
      <RevealSection as="h2" class="section-heading">The apps</RevealSection>
      <div class="grid">
        <RevealSection
          v-for="(app, i) in apps"
          :key="app.name"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="card"
        >
          <div class="card__top">
            <span class="card__icon"><span :class="app.icon" /></span>
            <div class="card__titles">
              <h3>{{ app.name }}</h3>
              <span class="card__tagline">{{ app.tagline }}</span>
            </div>
          </div>
          <p class="card__desc">{{ app.description }}</p>
          <ol class="how">
            <li v-for="play in app.howToPlay" :key="play">{{ play }}</li>
          </ol>
          <a :href="app.href" target="_blank" rel="noreferrer" class="card__link">
            <span>Play {{ app.name }}</span>
            <span class="pi pi-external-link" />
          </a>
        </RevealSection>
      </div>

      <!-- how a game comes together, sign-in included -->
      <RevealSection as="h2" class="section-heading">How it works</RevealSection>
      <RevealSection :delay="1" as="p" class="section-lede">
        Getting a game going takes about a minute, and everyone follows along together.
      </RevealSection>
      <div class="steps">
        <RevealSection
          v-for="(s, i) in steps"
          :key="s.title"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="step"
        >
          <span class="step__num">{{ i + 1 }}</span>
          <span class="step__icon"><span :class="s.icon" /></span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
        </RevealSection>
      </div>

      <!-- sign-in: what data is used, for OAuth transparency -->
      <RevealSection as="h2" class="section-heading">Signing in</RevealSection>
      <RevealSection :delay="1" as="div" class="prose">
        <p>
          When an app needs an account, you can sign in with Google or GitHub. One sign-in works
          across every maxstash app, so you never make a separate account per game. Signing in is
          used only to create your account and identify you while you play. maxstash requests your
          basic profile and email address and does not access anything else in your Google or GitHub
          account.
        </p>
        <p>
          You can delete your account at any time from within any app, which removes your personal
          data from maxstash.
        </p>
      </RevealSection>

      <!-- legal -->
      <RevealSection as="div" class="legal-callout">
        <div class="legal-callout__text">
          <h2>Terms &amp; policies</h2>
          <p>How maxstash apps may be used and how your data is handled.</p>
        </div>
        <div class="legal-links">
          <RouterLink to="/terms-of-service" class="legal-links__item">
            <span class="pi pi-file" />
            <span>Terms of Service</span>
          </RouterLink>
          <RouterLink to="/privacy-policy" class="legal-links__item">
            <span class="pi pi-shield" />
            <span>Privacy Policy</span>
          </RouterLink>
        </div>
      </RevealSection>
    </div>
  </section>
</template>

<style scoped>
.apps {
  width: 100%;
}

/* hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 4rem 0 3.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-soft);
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.55;
}

.glow--1 {
  width: 420px;
  height: 420px;
  top: -160px;
  left: -100px;
  background: var(--hero-glow-1);
}

.glow--2 {
  width: 360px;
  height: 360px;
  bottom: -180px;
  right: -80px;
  background: var(--hero-glow-2);
}

.hero__inner {
  position: relative;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
}

.hero__title {
  font-family: var(--mono);
  font-size: clamp(2.75rem, 8vw, 4.5rem);
  line-height: 1.05;
  margin: 1.25rem 0 0;
  letter-spacing: -0.02em;
}

.hero__lede {
  max-width: 62ch;
  margin: 1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.75rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--text-h);
  background: var(--bg);
  border: 1px solid var(--border);
}

.pill .pi {
  color: var(--accent);
  font-size: 0.9rem;
}

/* body */
.body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.section-heading {
  margin: 3rem 0 0.5rem;
  font-size: 1.4rem;
}

.section-lede {
  max-width: 62ch;
  margin: 0 0 1.75rem;
  color: var(--text);
}

/* app cards */
.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border-radius: 16px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  min-width: 0;
  overflow-wrap: anywhere;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}

.card__top {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 1.3rem;
  border: 1px solid var(--accent-border);
}

.card__titles h3 {
  margin: 0;
  font-family: var(--mono);
  font-size: 1.25rem;
}

.card__tagline {
  font-size: 0.85rem;
  color: var(--text);
  opacity: 0.8;
}

.card__desc {
  color: var(--text);
  line-height: 1.65;
  margin: 0 0 1rem;
}

/* how-to-play steps inside each app card */
.how {
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
  counter-reset: how;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.how li {
  position: relative;
  counter-increment: how;
  padding-left: 2rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text);
}

.how li::before {
  content: counter(how);
  position: absolute;
  left: 0;
  top: -0.05rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  align-self: flex-start;
  margin-top: auto;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.card__link:hover {
  transform: translateY(-1px);
}

/* how it works steps */
.steps {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

@media (min-width: 760px) and (max-width: 1000px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

.step {
  position: relative;
  padding: 1.5rem;
  border-radius: 14px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.step:hover {
  transform: translateY(-3px);
  border-color: var(--accent-border);
}

.step__num {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-family: var(--mono);
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text);
  opacity: 0.18;
}

.step__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 1.3rem;
  border: 1px solid var(--accent-border);
  margin-bottom: 0.9rem;
}

.step h3 {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
}

.step p {
  margin: 0;
  color: var(--text);
  line-height: 1.6;
  font-size: 0.9rem;
}

/* prose sections */
.prose {
  max-width: 68ch;
}

.prose p {
  color: var(--text);
  line-height: 1.7;
  margin: 0 0 1rem;
}

/* legal callout */
.legal-callout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
  padding: 1.75rem;
  border-radius: 16px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

.legal-callout__text h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.legal-callout__text p {
  margin: 0;
  color: var(--text);
  opacity: 0.85;
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.legal-links__item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-h);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.legal-links__item:hover {
  transform: translateY(-1px);
  border-color: var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
}
</style>
