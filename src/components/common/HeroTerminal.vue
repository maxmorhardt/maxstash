<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

type Kind = 'cmd' | 'out' | 'ok';

interface LineLink {
  text: string;
  href: string;
}

interface ScriptLine {
  text: string;
  kind: Kind;
  link?: LineLink;
  label?: string;
}

interface RenderedLine {
  text: string;
  kind: Kind;
  typing: boolean;
  link?: LineLink;
  label?: string;
  menu?: boolean;
}

interface NavItem {
  label: string;
  to: string;
  external: boolean;
}

const router = useRouter();

const EMAIL = 'max@maxstash.io';
const GITHUB = 'https://github.com/maxmorhardt';
const LINKEDIN = 'https://www.linkedin.com/in/max-morhardt-60b9121b8/';

const STACK = [
  { label: 'languages', value: 'java · typescript · go · python · sql' },
  { label: 'backend', value: 'spring boot · gin · gorm · jpa' },
  { label: 'frontend', value: 'react · angular · vue · primeng · material ui' },
  { label: 'cloud', value: 'aws · eks · ec2 · s3 · lambda · cloudflare' },
  { label: 'platform', value: 'kubernetes · docker · helm · envoy gateway · dex · nats' },
  { label: 'ops', value: 'github actions · jenkins · prometheus · grafana · loki · datadog' },
];

const MOBILE_STACK = [
  { label: 'languages', value: 'java · ts · go · py · sql' },
  { label: 'backend', value: 'spring · gin · gorm · jpa' },
  { label: 'frontend', value: 'react · ng · vue · mui' },
  { label: 'cloud', value: 'aws · eks · cloudflare' },
  { label: 'platform', value: 'k8s · helm · envoy · dex' },
  { label: 'ops', value: 'actions · prometheus · grafana' },
];

const isMobile =
  typeof window !== 'undefined' && (window.matchMedia?.('(max-width: 880px)')?.matches ?? false);

const whoamiLine: ScriptLine = {
  text: 'Max Morhardt, software engineer @ Fidelity',
  kind: 'out',
};

const stackSource = isMobile ? MOBILE_STACK : STACK;

const boot: ScriptLine[] = [
  { text: 'whoami', kind: 'cmd' },
  whoamiLine,
  { text: 'cat stack.txt', kind: 'cmd' },
  ...stackSource.map((s) => ({ text: s.value, kind: 'out' as const, label: s.label })),
  { text: 'kubectl get httproute -A', kind: 'cmd' },
  {
    text: '',
    kind: 'out',
    label: 'maxstash',
    link: { text: 'maxstash.io ↗', href: 'https://maxstash.io' },
  },
  {
    text: '',
    kind: 'out',
    label: 'squares',
    link: { text: 'squares.maxstash.io ↗', href: 'https://squares.maxstash.io' },
  },
  {
    text: '',
    kind: 'out',
    label: 'olympics',
    link: { text: 'olympics.maxstash.io ↗', href: 'https://olympics.maxstash.io' },
  },
  {
    text: '',
    kind: 'out',
    label: 'squares-api',
    link: {
      text: 'api.maxstash.io/squares ↗',
      href: 'https://api.maxstash.io/squares/swagger',
    },
  },
  { text: 'ls ~', kind: 'cmd' },
];

const nav: NavItem[] = [
  { label: 'projects', to: '/projects', external: false },
  { label: 'about', to: '/about', external: false },
  { label: 'contact', to: '/contact', external: false },
  { label: 'github', to: GITHUB, external: true },
  { label: 'linkedin', to: LINKEDIN, external: true },
];

const lines = ref<RenderedLine[]>([]);
const ready = ref(false);
const input = ref('');

// index of the launchpad item highlighted by the arrow-key cursor
const selected = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);

// only the most recently printed `ls` menu is keyboard-interactive
const lastMenuIndex = computed(() => {
  for (let i = lines.value.length - 1; i >= 0; i--) {
    if (lines.value[i].menu) return i;
  }
  return -1;
});

let alive = true;
const reduced =
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false);

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function out(text: string, kind: Kind = 'out', link?: LineLink, label?: string) {
  lines.value.push({ text, kind, typing: false, link, label });
  scrollToBottom();
}

function echo(text: string) {
  lines.value.push({ text, kind: 'cmd', typing: false });
}

function printMenu() {
  selected.value = 0;
  lines.value.push({ text: '', kind: 'out', typing: false, menu: true });
  scrollToBottom();
}

async function type(line: ScriptLine) {
  if (line.kind !== 'cmd') {
    out(line.text, line.kind, line.link, line.label);
    return;
  }

  const i = lines.value.push({ text: '', kind: 'cmd', typing: true }) - 1;
  scrollToBottom();
  for (const ch of line.text) {
    if (!alive) return;
    lines.value[i].text += ch;
    await sleep(38 + Math.random() * 45);
  }
  lines.value[i].typing = false;
}

async function run() {
  for (const line of boot) {
    if (!alive) return;
    await type(line);
    await sleep(line.kind === 'cmd' ? 240 : 120);
  }
  if (alive) {
    printMenu();
    enable();
    scrollToBottom();
  }
}

function enable() {
  ready.value = true;
  // only grab focus when the terminal is on screen so the page never jumps back to it
  nextTick(() => {
    if (isTerminalInView()) focusInput();
  });
}

function isTerminalInView() {
  const rect = bodyRef.value?.getBoundingClientRect();
  if (!rect) return false;
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function focusInput() {
  inputRef.value?.focus({ preventScroll: true });
}

function scrollToBottom() {
  nextTick(() => {
    if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight;
  });
}

function activate(item: NavItem) {
  out(`> ${item.external ? 'opening' : 'cd'} ${item.to}`, 'ok');
  if (item.external) window.open(item.to, '_blank', 'noopener');
  else router.push(item.to);
  scrollToBottom();
}

function help() {
  out('available commands:');
  out('  help       show this list');
  out('  name       who is this');
  out('  whoami     current role');
  out('  stack      tools i use');
  out('  email      get my email');
  out('  social     github · linkedin · email');
  out('  projects   view my work');
  out('  about      more about me');
  out('  contact    reach out');
  out('  clear      clear the screen');
  out(
    isMobile
      ? 'tip: tap a directory to open'
      : 'tip: use the arrow keys to pick a directory, enter to open',
    'out'
  );
}

function runCommand(raw: string) {
  const cmd = raw.trim();
  echo(cmd);

  switch (cmd.toLowerCase()) {
    case '':
      break;
    case 'help':
    case '?':
      help();
      break;
    case 'name':
      out('Max Morhardt');
      break;
    case 'whoami':
      out(whoamiLine.text);
      break;
    case 'stack':
    case 'skills':
      stackSource.forEach((s) => out(s.value, 'out', undefined, s.label));
      break;
    case 'email':
      out('', 'out', { text: EMAIL, href: `mailto:${EMAIL}` });
      break;
    case 'social':
      out('', 'out', { text: GITHUB, href: GITHUB }, 'github');
      out('', 'out', { text: LINKEDIN, href: LINKEDIN }, 'linkedin');
      out('', 'out', { text: EMAIL, href: `mailto:${EMAIL}` }, 'email');
      break;
    case 'ls':
      printMenu();
      break;
    case 'projects':
      activate(nav[0]);
      return;
    case 'about':
      activate(nav[1]);
      return;
    case 'contact':
      activate(nav[2]);
      return;
    case 'github':
      activate(nav[3]);
      return;
    case 'linkedin':
      activate(nav[4]);
      return;
    case 'clear':
      lines.value = [];
      break;
    default:
      out(`command not found: ${cmd} (try 'help')`);
  }

  scrollToBottom();
}

function onKeydown(e: KeyboardEvent) {
  const empty = input.value.trim() === '';
  const hasMenu = lastMenuIndex.value >= 0;

  if (empty && hasMenu && (e.key === 'ArrowDown' || e.key === 'ArrowRight')) {
    e.preventDefault();
    selected.value = (selected.value + 1) % nav.length;
    return;
  }
  if (empty && hasMenu && (e.key === 'ArrowUp' || e.key === 'ArrowLeft')) {
    e.preventDefault();
    selected.value = selected.value <= 0 ? nav.length - 1 : selected.value - 1;
    return;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    if (!empty) {
      runCommand(input.value);
      input.value = '';
    } else if (hasMenu) {
      activate(nav[selected.value]);
    }
  }
}

onMounted(() => {
  if (reduced) {
    lines.value = boot.map((l) => ({
      text: l.text,
      kind: l.kind,
      typing: false,
      link: l.link,
      label: l.label,
    }));
    printMenu();
    enable();
    scrollToBottom();
    return;
  }
  run();
});

onBeforeUnmount(() => {
  alive = false;
});
</script>

<template>
  <div class="term" @click="focusInput">
    <div class="term__bar">
      <span class="term__dot term__dot--r" />
      <span class="term__dot term__dot--y" />
      <span class="term__dot term__dot--g" />
      <span class="term__title">max@maxstash: ~</span>
    </div>
    <div ref="bodyRef" class="term__body">
      <div v-for="(l, i) in lines" :key="i" class="term__line" :class="`term__line--${l.kind}`">
        <nav v-if="l.menu" class="term__menu" aria-label="Explore the site">
          <component
            :is="item.external ? 'a' : RouterLink"
            v-for="(item, idx) in nav"
            :key="item.label"
            class="term__item"
            :class="{ 'is-active': i === lastMenuIndex && selected === idx }"
            v-bind="
              item.external
                ? { href: item.to, target: '_blank', rel: 'noreferrer' }
                : { to: item.to }
            "
            @mouseenter="i === lastMenuIndex && (selected = idx)"
            @click.stop
          >
            <span class="term__pointer">{{
              i === lastMenuIndex && selected === idx ? '❯' : ' '
            }}</span>
            <span>{{ item.label }}{{ item.external ? ' ↗' : '/' }}</span>
          </component>
        </nav>
        <div v-else-if="l.label" class="term__cols">
          <span class="term__col-label">{{ l.label }}</span>
          <span class="term__col-value"
            >{{ l.text
            }}<a
              v-if="l.link"
              class="term__out-link"
              :href="l.link.href"
              target="_blank"
              rel="noreferrer"
              @click.stop
              >{{ l.link.text }}</a
            ></span
          >
        </div>
        <template v-else>
          <span v-if="l.kind === 'cmd'" class="term__prompt">~ $</span>
          <span class="term__text">{{ l.text }}</span>
          <a
            v-if="l.link"
            class="term__out-link"
            :href="l.link.href"
            target="_blank"
            rel="noreferrer"
            @click.stop
            >{{ l.link.text }}</a
          >
          <span v-if="l.typing" class="term__cursor" />
        </template>
      </div>

      <div v-if="ready" class="term__input-line">
        <span class="term__prompt">~ $</span>
        <input
          ref="inputRef"
          v-model="input"
          class="term__input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          aria-label="Terminal command input"
          @keydown="onKeydown"
        />
      </div>

      <div v-if="ready" class="term__hint">
        <span class="term__hint-full">
          type a command (try 'help') · arrow keys to select · enter to open
        </span>
        <span class="term__hint-short"> try 'help' · enter to open </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.term {
  width: 100%;
  max-width: 720px;
  max-height: calc(100svh - var(--header-h) - 6.5rem);
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  background: #0d1117;
  border: 1px solid var(--accent-border);
  box-shadow:
    var(--shadow),
    0 0 100px -18px var(--hero-glow-1);
  font-family: var(--mono);
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 0.85rem;
  background: #161b22;
  border-bottom: 1px solid #21262d;
}

.term__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.term__dot--r {
  background: #ff5f56;
}

.term__dot--y {
  background: #ffbd2e;
}

.term__dot--g {
  background: #27c93f;
}

.term__title {
  margin-left: 0.5rem;
  font-size: 0.78rem;
  color: #8b949e;
}

.term__body {
  flex: 1;
  min-height: 0;
  padding: 1.15rem 1.3rem 1.25rem;
  font-size: 0.88rem;
  line-height: 1.6;
  overflow-y: auto;
}

.term__line {
  white-space: pre-wrap;
  word-break: break-word;
}

.term__cols {
  display: grid;
  grid-template-columns: 12ch 1fr;
  column-gap: 0.75rem;
}

.term__col-label,
.term__col-value {
  color: #8b949e;
  min-width: 0;
}

.term__prompt {
  margin-right: 0.5rem;
  color: #a855f7;
}

.term__line--cmd .term__text {
  color: #e6edf3;
}

.term__line--out .term__text {
  color: #8b949e;
}

.term__line--ok .term__text {
  color: #27c93f;
}

.term__out-link {
  color: #58a6ff;
  text-decoration: none;
}

.term__out-link:hover {
  text-decoration: underline;
}

.term__cursor {
  display: inline-block;
  width: 8px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: #a855f7;
  animation: term-blink 1s step-end infinite;
}

.term__menu {
  display: flex;
  flex-direction: column;
  margin: 0.6rem 0 0.2rem;
  animation: term-fade 0.4s ease both;
}

.term__item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.18rem 0.5rem;
  border-radius: 6px;
  color: #58a6ff;
  text-decoration: none;
  font-size: 0.86rem;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.term__item.is-active {
  background: var(--accent-bg);
  color: var(--accent);
}

.term__pointer {
  width: 0.8em;
  color: var(--accent);
}

.term__input-line {
  display: flex;
  align-items: center;
  margin-top: 0.35rem;
}

.term__input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #e6edf3;
  font: inherit;
  caret-color: #a855f7;
}

.term__hint {
  margin-top: 0.6rem;
  color: #56607a;
  font-size: 0.78rem;
  font-style: italic;
}

.term__hint-short {
  display: none;
}

@keyframes term-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}

@keyframes term-fade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 880px) {
  .term {
    max-height: calc(100svh - var(--header-h) - 3rem);
  }

  .term__body {
    padding: 0.9rem 0.9rem 1rem;
    font-size: 0.72rem;
  }

  .term__cols {
    grid-template-columns: 12ch 1fr;
    column-gap: 0.45rem;
  }

  .term__item {
    font-size: 0.72rem;
    padding: 0.15rem 0.4rem;
  }

  .term__input {
    font-size: 16px;
  }

  .term__hint {
    font-size: 0.68rem;
  }

  .term__hint-full {
    display: none;
  }

  .term__hint-short {
    display: inline;
  }
}

@media (prefers-reduced-motion: reduce) {
  .term__cursor {
    animation: none;
  }

  .term__menu,
  .term__hint {
    animation: none;
  }
}
</style>
