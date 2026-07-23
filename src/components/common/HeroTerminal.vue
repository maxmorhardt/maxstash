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

const KIND_COLOR: Record<Kind, string> = {
  cmd: 'text-[#e6edf3]',
  out: 'text-[#8b949e]',
  ok: 'text-[#27c93f]',
};

const EMAIL = 'max@maxstash.io';
const GITHUB = 'https://github.com/maxmorhardt';
const LINKEDIN = 'https://www.linkedin.com/in/max-morhardt-60b9121b8/';

const STACK = [
  { label: 'languages', value: 'java · typescript · go · python · sql' },
  { label: 'backend', value: 'spring boot · gin · gorm · jpa' },
  { label: 'frontend', value: 'react · angular · vue · primeng · material ui' },
  { label: 'cloud', value: 'aws · eks · ec2 · s3 · lambda · cloudflare' },
  { label: 'platform', value: 'kubernetes · docker · helm · envoy gateway · dex · nats' },
  { label: 'ops', value: 'gha · jenkins · prometheus · grafana · loki · datadog' },
];

const MOBILE_STACK = [
  { label: 'languages', value: 'java · ts · go · py · sql' },
  { label: 'backend', value: 'spring · gin · gorm · jpa' },
  { label: 'frontend', value: 'react · ng · vue · mui' },
  { label: 'cloud', value: 'aws · eks · cloudflare' },
  { label: 'platform', value: 'k8s · docker · helm · envoy' },
  { label: 'ops', value: 'gha · prometheus · datadog' },
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
  { text: 'ls ~', kind: 'cmd' },
];

const nav: NavItem[] = [
  { label: 'projects', to: '/projects', external: false },
  { label: 'apps', to: '/apps', external: false },
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
    if (lines.value[i].menu) {
      return i;
    }
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
    if (!alive) {
      return;
    }

    lines.value[i].text += ch;
    await sleep(38 + Math.random() * 45);
  }
  lines.value[i].typing = false;
}

async function run() {
  for (const line of boot) {
    if (!alive) {
      return;
    }

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
  // only grab focus when the terminal is on screen
  nextTick(() => {
    if (isTerminalInView()) {
      focusInput();
    }
  });
}

function isTerminalInView() {
  const rect = bodyRef.value?.getBoundingClientRect();
  if (!rect) {
    return false;
  }

  return rect.top < window.innerHeight && rect.bottom > 0;
}

function focusInput() {
  inputRef.value?.focus({ preventScroll: true });
}

function scrollToBottom() {
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight;
    }
  });
}

function activate(item: NavItem) {
  out(`> ${item.external ? 'opening' : 'cd'} ${item.to}`, 'ok');

  if (item.external) {
    window.open(item.to, '_blank', 'noopener');
  } else {
    router.push(item.to);
  }

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
  out('  apps       live apps i run');
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
    case 'apps':
    case 'about':
    case 'contact':
    case 'github':
    case 'linkedin': {
      const item = nav.find((n) => n.label === cmd.toLowerCase());
      if (item) {
        activate(item);
      }

      return;
    }
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
  <div
    class="term flex max-h-[calc(100svh-var(--header-h)-6.5rem)] w-full max-w-[720px] flex-col overflow-hidden rounded-card border border-accent-border bg-[#0d1117] font-mono shadow-[var(--shadow),0_0_100px_-18px_var(--hero-glow-1)] max-[880px]:max-h-[calc(100svh-var(--header-h)-3rem)]"
    @click="focusInput"
  >
    <!-- title bar: traffic lights + prompt -->
    <div
      class="flex items-center gap-[0.45rem] border-b border-[#21262d] bg-[#161b22] px-[0.85rem] py-[0.6rem]"
    >
      <span class="size-[11px] rounded-full bg-[#ff5f56]" />
      <span class="size-[11px] rounded-full bg-[#ffbd2e]" />
      <span class="size-[11px] rounded-full bg-[#27c93f]" />
      <span class="ml-2 text-[0.78rem] text-[#8b949e]">max@maxstash: ~</span>
    </div>

    <!-- terminal body -->
    <div
      ref="bodyRef"
      class="min-h-0 flex-1 overflow-y-auto px-[1.3rem] pt-[1.15rem] pb-[1.25rem] text-[0.88rem] leading-[1.6] max-[880px]:px-[0.9rem] max-[880px]:pt-[0.9rem] max-[880px]:pb-4 max-[880px]:text-[0.72rem]"
    >
      <!-- printed lines: ls menu, labelled output, or plain text -->
      <div v-for="(l, i) in lines" :key="i" class="break-words whitespace-pre-wrap">
        <nav
          v-if="l.menu"
          class="term__menu mt-[0.6rem] mb-[0.2rem] flex flex-col"
          aria-label="Explore the site"
        >
          <component
            :is="item.external ? 'a' : RouterLink"
            v-for="(item, idx) in nav"
            :key="item.label"
            class="term__item flex items-center gap-[0.55rem] rounded-md px-2 py-[0.18rem] text-[0.86rem] text-[#58a6ff] no-underline transition-[background-color,color] duration-150 ease-out max-[880px]:px-[0.4rem] max-[880px]:py-[0.15rem] max-[880px]:text-[0.72rem]"
            :class="{ 'is-active': i === lastMenuIndex && selected === idx }"
            v-bind="
              item.external
                ? { href: item.to, target: '_blank', rel: 'noreferrer' }
                : { to: item.to }
            "
            @mouseenter="i === lastMenuIndex && (selected = idx)"
            @click.stop
          >
            <span class="w-[0.8em] text-accent">{{
              i === lastMenuIndex && selected === idx ? '❯' : ' '
            }}</span>
            <span>{{ item.label }}{{ item.external ? ' ↗' : '/' }}</span>
          </component>
        </nav>
        <div
          v-else-if="l.label"
          class="grid grid-cols-[12ch_1fr] gap-x-3 max-[880px]:gap-x-[0.45rem]"
        >
          <span class="min-w-0 text-[#8b949e]">{{ l.label }}</span>
          <span class="min-w-0 text-[#8b949e]"
            >{{ l.text
            }}<a
              v-if="l.link"
              class="term__out-link text-[#58a6ff] no-underline hover:underline"
              :href="l.link.href"
              target="_blank"
              rel="noreferrer"
              @click.stop
              >{{ l.link.text }}</a
            ></span
          >
        </div>
        <template v-else>
          <span v-if="l.kind === 'cmd'" class="mr-2 text-[#a855f7]">~ $</span>
          <span :class="KIND_COLOR[l.kind]">{{ l.text }}</span>
          <a
            v-if="l.link"
            class="term__out-link text-[#58a6ff] no-underline hover:underline"
            :href="l.link.href"
            target="_blank"
            rel="noreferrer"
            @click.stop
            >{{ l.link.text }}</a
          >
          <span
            v-if="l.typing"
            class="term__cursor ml-0.5 inline-block h-[1.05em] w-2 bg-[#a855f7] align-text-bottom"
          />
        </template>
      </div>

      <!-- command input -->
      <div v-if="ready" class="mt-[0.35rem] flex items-center">
        <span class="mr-2 text-[#a855f7]">~ $</span>
        <input
          ref="inputRef"
          v-model="input"
          class="term__input min-w-0 flex-1 border-none bg-transparent p-0 text-[#e6edf3] caret-[#a855f7] outline-none max-[880px]:text-[16px]"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          aria-label="Terminal command input"
          @keydown="onKeydown"
        />
      </div>

      <!-- usage hint -->
      <div
        v-if="ready"
        class="mt-[0.6rem] text-[0.78rem] text-[#56607a] italic max-[880px]:text-[0.68rem]"
      >
        <span class="max-[880px]:hidden">
          type a command (try 'help') · arrow keys to select · enter to open
        </span>
        <span class="hidden max-[880px]:inline"> try 'help' · enter to open </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.term__item.is-active {
  background: var(--accent-bg);
  color: var(--accent);
}

/* the blinking caret and the menu fade-in are keyframe-driven */
.term__cursor {
  animation: term-blink 1s step-end infinite;
}

.term__menu {
  animation: term-fade 0.4s ease both;
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

@media (prefers-reduced-motion: reduce) {
  .term__cursor,
  .term__menu {
    animation: none;
  }
}
</style>
