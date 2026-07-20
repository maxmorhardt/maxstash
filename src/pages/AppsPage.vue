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
  <section class="w-full">
    <!-- hero: what maxstash is -->
    <div class="relative w-full overflow-hidden border-b border-border bg-bg-soft pt-16 pb-14">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          class="absolute top-[-160px] left-[-100px] size-[420px] rounded-full bg-[var(--hero-glow-1)] opacity-55 blur-[100px]"
        />
        <div
          class="absolute right-[-80px] bottom-[-180px] size-[360px] rounded-full bg-[var(--hero-glow-2)] opacity-55 blur-[100px]"
        />
      </div>
      <div class="layout-container relative">
        <RevealSection
          as="span"
          class="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-bg px-[0.7rem] py-[0.3rem] font-mono text-xs tracking-[0.12em] text-accent uppercase"
        >
          <span class="pi pi-box" />
          Live apps
        </RevealSection>
        <RevealSection
          :delay="1"
          as="h1"
          class="mt-5 mb-0 font-mono text-[clamp(2.75rem,8vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
        >
          maxstash
        </RevealSection>
        <RevealSection
          :delay="2"
          as="p"
          class="mt-4 max-w-[62ch] text-[1.05rem] leading-[1.7] text-text"
        >
          maxstash is home to a couple of apps built for game day and get-togethers. Start a game,
          share the link, and everyone plays along on their own phone while it updates live.
        </RevealSection>
        <RevealSection :delay="3" as="div" class="mt-7 flex flex-wrap gap-[0.6rem]">
          <span class="pill">
            <span class="pi pi-th-large text-[0.9rem] text-accent" /> {{ apps.length }} live apps
          </span>
          <span class="pill">
            <span class="pi pi-users text-[0.9rem] text-accent" /> Play with friends
          </span>
          <span class="pill">
            <span class="pi pi-bolt text-[0.9rem] text-accent" /> Live updates
          </span>
        </RevealSection>
      </div>
    </div>

    <div class="layout-container py-4">
      <!-- apps: what each game is and how it plays -->
      <RevealSection as="h2" class="section-heading">The apps</RevealSection>
      <div class="mt-6 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        <RevealSection
          v-for="(app, i) in apps"
          :key="app.name"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="app-card flex min-w-0 flex-col rounded-panel border border-border bg-bg-soft p-7 [overflow-wrap:anywhere] hover:border-accent-border hover:shadow-card"
        >
          <div class="mb-4 flex items-center gap-[0.9rem]">
            <span
              class="inline-flex size-[46px] shrink-0 items-center justify-center rounded-xl border border-accent-border bg-accent-bg text-[1.3rem] text-accent"
            >
              <span :class="app.icon" />
            </span>
            <div>
              <h3 class="m-0 font-mono text-xl">{{ app.name }}</h3>
              <span class="text-[0.85rem] text-text opacity-80">{{ app.tagline }}</span>
            </div>
          </div>
          <p class="mt-0 mb-4 leading-[1.65] text-text">{{ app.description }}</p>
          <ol class="m-0 mb-6 flex list-none flex-col gap-[0.6rem] p-0">
            <li
              v-for="(play, pi) in app.howToPlay"
              :key="play"
              class="flex gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text"
            >
              <span
                class="inline-flex size-[1.4rem] shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-bg font-mono text-[0.72rem] text-accent"
              >
                {{ pi + 1 }}
              </span>
              <span>{{ play }}</span>
            </li>
          </ol>
          <a
            :href="app.href"
            target="_blank"
            rel="noreferrer"
            class="card__link mt-auto inline-flex items-center gap-[0.45rem] self-start rounded-full border border-accent-border bg-accent-bg px-4 py-[0.55rem] text-sm font-medium text-accent no-underline transition-[transform,background-color] duration-200 ease-out hover:-translate-y-px"
          >
            <span>Play {{ app.name }}</span>
            <span class="pi pi-external-link" />
          </a>
        </RevealSection>
      </div>

      <!-- how a game comes together, sign-in included -->
      <RevealSection as="h2" class="section-heading">How it works</RevealSection>
      <RevealSection :delay="1" as="p" class="mt-0 mb-7 max-w-[62ch] text-text">
        Getting a game going takes about a minute, and everyone follows along together.
      </RevealSection>
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 min-[760px]:max-[1000px]:grid-cols-2"
      >
        <RevealSection
          v-for="(s, i) in steps"
          :key="s.title"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="step-card relative rounded-card border border-border bg-bg-soft p-6 hover:border-accent-border"
        >
          <span
            class="absolute top-5 right-5 font-mono text-2xl leading-none text-text opacity-[0.18]"
          >
            {{ i + 1 }}
          </span>
          <span
            class="mb-[0.9rem] inline-flex size-[46px] items-center justify-center rounded-xl border border-accent-border bg-accent-bg text-[1.3rem] text-accent"
          >
            <span :class="s.icon" />
          </span>
          <h3 class="mt-0 mb-[0.4rem] text-[1.05rem]">{{ s.title }}</h3>
          <p class="m-0 text-[0.9rem] leading-[1.6] text-text">{{ s.body }}</p>
        </RevealSection>
      </div>

      <!-- sign-in: what data is used, for OAuth transparency -->
      <RevealSection as="h2" class="section-heading">Signing in</RevealSection>
      <RevealSection :delay="1" as="div" class="max-w-[68ch]">
        <p class="mt-0 mb-4 leading-[1.7] text-text">
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
        class="mt-12 mb-8 flex flex-wrap items-center justify-between gap-6 rounded-panel border border-border bg-bg-soft p-7"
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
@reference '../style.css';

.section-heading {
  @apply mt-12 mb-2 text-[1.4rem];
}

/* reveal and hover transitions must be declared together: a utility transition-*
   sits in the utilities layer and would override .reveal's, killing the fade-in */
.app-card {
  transition:
    opacity 0.7s var(--ease-reveal),
    transform 0.7s var(--ease-reveal),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.app-card.is-visible:hover {
  transform: translateY(-4px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.step-card {
  transition:
    opacity 0.7s var(--ease-reveal),
    transform 0.7s var(--ease-reveal),
    border-color 0.3s ease;
}

.step-card.is-visible:hover {
  transform: translateY(-3px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.pill {
  @apply inline-flex items-center gap-[0.45rem] rounded-full border border-border bg-bg px-[0.85rem] py-[0.4rem] text-[0.8125rem] text-text-h;
}

.legal-links__item {
  @apply inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-[0.6rem] text-text-h no-underline;
  @apply transition-[transform,border-color,background-color] duration-200 ease-out;
  @apply hover:-translate-y-px hover:border-accent-border hover:bg-accent-bg hover:text-accent;
}
</style>
