<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RevealSection from '../components/common/RevealSection.vue';
import SquaresBoard from '../components/apps/SquaresBoard.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'maxstash – Apps by Max Morhardt',
  description:
    'maxstash is home to the apps Max Morhardt builds and runs for game day and get-togethers, including Squares. Start a game, share the link, and everyone plays along live.',
  canonical: 'https://maxstash.io/apps',
});

interface Step {
  title: string;
  body: string;
}

interface AppShowcase {
  name: string;
  icon: string;
  eyebrow: string;
  tagline: string;
  description: string;
  cta: string;
  href: string;
  visual: 'squares-board' | 'icon';
  stepsTitle: string;
  steps: Step[];
}

const apps: AppShowcase[] = [
  {
    name: 'Squares',
    icon: 'pi pi-th-large',
    eyebrow: 'Live app',
    tagline: 'Football squares for the whole party',
    description:
      "The classic Super Bowl squares pool, online. One person sets up the board, everyone claims their squares, and the app draws the numbers and calls the winner every quarter, live on everyone's phone.",
    cta: 'Play Squares',
    href: 'https://squares.maxstash.io',
    visual: 'squares-board',
    stepsTitle: 'How a game plays out',
    steps: [
      {
        title: 'Set up the board',
        body: 'Create a pool for an upcoming football game and share the link with everyone playing.',
      },
      {
        title: 'Friends claim squares',
        body: 'Everyone joins from their own phone and grabs the squares they want on the shared board.',
      },
      {
        title: 'Numbers are drawn',
        body: 'Once the board fills up, the app randomly assigns the digits 0–9 to every row and column.',
      },
      {
        title: 'Winners light up',
        body: 'As each quarter ends, the app matches the score and the winning square lights up for everyone.',
      },
    ],
  },
];

interface Perk {
  icon: string;
  title: string;
  body: string;
}

const perks: Perk[] = [
  {
    icon: 'pi pi-mobile',
    title: 'Nothing to install',
    body: 'Everyone joins from their own phone with just a link.',
  },
  {
    icon: 'pi pi-shield',
    title: 'One sign-in',
    body: 'Sign in once with Google or GitHub; the same account works across every maxstash app.',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Live updates',
    body: 'Squares, numbers, and winners update instantly for everyone as the game unfolds.',
  },
];
</script>

<template>
  <section class="w-full">
    <!-- one showcase per app: a split hero followed by its play-by-play timeline -->
    <div v-for="(app, ai) in apps" :key="app.name">
      <!-- hero: the app copy on one side, a visual on the other, sides alternate -->
      <div class="border-b border-border" :class="{ 'border-t': ai > 0 }">
        <div
          class="layout-container grid items-center gap-12 py-16"
          :class="
            ai % 2 === 1
              ? 'min-[900px]:grid-cols-[auto_1.1fr]'
              : 'min-[900px]:grid-cols-[1.1fr_auto]'
          "
        >
          <div :class="{ 'min-[900px]:order-2': ai % 2 === 1 }">
            <RevealSection
              as="span"
              class="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-bg px-[0.7rem] py-[0.3rem] font-mono text-xs tracking-[0.12em] text-accent uppercase"
            >
              <span class="size-[7px] rounded-full bg-accent" />
              {{ app.eyebrow }}
            </RevealSection>
            <RevealSection
              :delay="1"
              :as="ai === 0 ? 'h1' : 'h2'"
              class="mt-5 mb-3 text-[clamp(2.75rem,7vw,4.25rem)] leading-[1.02] tracking-[-0.03em]"
            >
              {{ app.name }}
            </RevealSection>
            <RevealSection :delay="1" as="p" class="mb-4 font-mono text-[0.95rem] text-accent">
              {{ app.tagline }}
            </RevealSection>
            <RevealSection
              :delay="2"
              as="p"
              class="max-w-[46ch] text-[1.05rem] leading-[1.7] text-text"
            >
              {{ app.description }}
            </RevealSection>
            <RevealSection :delay="2" as="div" class="mt-8">
              <a
                :href="app.href"
                target="_blank"
                rel="noreferrer"
                class="app-cta inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white no-underline"
              >
                <span>{{ app.cta }}</span>
                <span class="pi pi-arrow-right text-[0.85rem]" />
              </a>
            </RevealSection>
          </div>

          <RevealSection
            :delay="1"
            class="hidden justify-self-center min-[900px]:block"
            :class="
              ai % 2 === 1 ? 'min-[900px]:justify-self-start' : 'min-[900px]:justify-self-end'
            "
          >
            <SquaresBoard v-if="app.visual === 'squares-board'" />
            <div v-else class="app-tile" aria-hidden="true">
              <span class="app-tile__icon"><span :class="app.icon" /></span>
              <span class="app-tile__label font-mono">{{ app.tagline }}</span>
            </div>
          </RevealSection>
        </div>
      </div>

      <!-- how it plays: a connected timeline rather than a card grid -->
      <div class="layout-container py-4">
        <RevealSection as="h2" class="section-heading">{{ app.stepsTitle }}</RevealSection>
        <ol class="timeline mt-8 mb-4">
          <RevealSection
            v-for="(step, i) in app.steps"
            :key="step.title"
            :delay="Math.min(i + 1, 4) as 1 | 2 | 3 | 4"
            as="li"
            class="step"
            root-margin="0px 0px 15% 0px"
          >
            <span class="step-node font-mono">{{ i + 1 }}</span>
            <div class="min-w-0">
              <h3 class="mt-0 mb-1 text-[1.1rem]">{{ step.title }}</h3>
              <p class="m-0 max-w-[52ch] leading-[1.65] text-text">{{ step.body }}</p>
            </div>
          </RevealSection>
        </ol>
      </div>
    </div>

    <div class="layout-container py-4">
      <!-- made for playing together: a compact divided strip, not lift cards -->
      <RevealSection as="h2" class="section-heading">Made for playing together</RevealSection>
      <RevealSection
        :delay="1"
        as="div"
        class="perks mt-6 grid rounded-panel border border-border bg-bg-soft min-[720px]:grid-cols-3"
      >
        <div v-for="perk in perks" :key="perk.title" class="perk">
          <span class="perk-icon text-accent"><span :class="perk.icon" /></span>
          <h3 class="mt-3 mb-1 text-[1rem]">{{ perk.title }}</h3>
          <p class="m-0 text-[0.9rem] leading-[1.6] text-text">{{ perk.body }}</p>
        </div>
      </RevealSection>

      <!-- signing in: OAuth transparency about what data is used -->
      <RevealSection as="h2" class="section-heading">Signing in</RevealSection>
      <RevealSection :delay="1" as="div" class="max-w-[68ch]">
        <p class="mt-2 mb-4 leading-[1.7] text-text">
          When an app needs an account, you can sign in with Google or GitHub. One sign-in works
          across every maxstash app, so you never make a separate account per game. Signing in is
          used only to create your account and identify you while you play. maxstash requests your
          basic profile and email address and does not access anything else in your Google or GitHub
          account.
        </p>
        <p class="mt-0 mb-4 leading-[1.7] text-text">
          You can delete your account at any time from within any app, which removes your personal
          data from maxstash.
        </p>
      </RevealSection>

      <!-- legal -->
      <RevealSection
        as="div"
        class="mt-10 mb-8 flex flex-wrap items-center justify-between gap-6 rounded-panel border border-border bg-bg-soft p-7"
      >
        <div>
          <h2 class="mt-0 mb-[0.35rem] text-[1.2rem]">Terms &amp; policies</h2>
          <p class="m-0 text-text opacity-85">
            How maxstash apps may be used and how your data is handled.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
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
.section-heading {
  margin: 3rem 0 0.5rem;
  font-size: 1.4rem;
}

.app-cta {
  box-shadow: 0 8px 20px -10px var(--accent);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.app-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px -10px var(--accent);
}

.app-tile {
  display: grid;
  place-items: center;
  gap: 1rem;
  width: min(340px, 100%);
  aspect-ratio: 1;
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-panel);
  background: var(--accent-bg);
}

.app-tile__icon {
  display: grid;
  place-items: center;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 18px;
  border: 1px solid var(--accent-border);
  background: var(--bg);
  color: var(--accent);
  font-size: 2rem;
}

.app-tile__label {
  max-width: 22ch;
  padding: 0 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--text);
}

.timeline {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.step {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.1rem;
  padding-bottom: 2rem;
}

.step:last-child {
  padding-bottom: 0;
}

/* connector line linking the numbered nodes */
.step:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 2.4rem;
  bottom: -0.2rem;
  left: 1.2rem;
  width: 2px;
  background: linear-gradient(var(--accent-border), var(--border));
}

.step-node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  border: 1px solid var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 0.95rem;
  font-weight: 600;
}

.perk {
  padding: 1.6rem;
  border-top: 1px solid var(--border);
}

.perk:first-child {
  border-top: none;
}

@media (min-width: 720px) {
  .perk {
    border-top: none;
    border-left: 1px solid var(--border);
  }

  .perk:first-child {
    border-left: none;
  }
}

.perk-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--accent-border);
  background: var(--accent-bg);
  font-size: 1.15rem;
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

@media (prefers-reduced-motion: reduce) {
  .app-cta:hover {
    transform: none;
  }
}
</style>
