<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

type Kind = 'cmd' | 'out' | 'ok';

interface ScriptLine {
  text: string;
  kind: Kind;
}

interface RenderedLine {
  text: string;
  kind: Kind;
  typing: boolean;
}

const script: ScriptLine[] = [
  { text: 'whoami', kind: 'cmd' },
  { text: 'max morhardt — software engineer', kind: 'out' },
  { text: 'cat stack.txt', kind: 'cmd' },
  { text: 'go · typescript · react · vue · kubernetes', kind: 'out' },
  { text: 'kubectl get pods -A', kind: 'cmd' },
  { text: 'authentik    authentik-server   Running', kind: 'out' },
  { text: 'cnpg         postgres-cluster   Running', kind: 'out' },
  { text: 'squares      squares-api        Running', kind: 'out' },
  { text: 'monitoring   grafana            Running', kind: 'out' },
  { text: 'curl -s maxstash.io/status', kind: 'cmd' },
  { text: '{"status":"online","open_to_work":true}', kind: 'ok' },
];

const lines = ref<RenderedLine[]>([]);

let alive = true;
const reduced =
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function pushIdlePrompt() {
  lines.value.push({ text: '', kind: 'cmd', typing: true });
}

async function type(line: ScriptLine) {
  if (line.kind !== 'cmd') {
    lines.value.push({ text: line.text, kind: line.kind, typing: false });
    return;
  }

  const i = lines.value.push({ text: '', kind: 'cmd', typing: true }) - 1;
  for (const ch of line.text) {
    if (!alive) return;
    lines.value[i].text += ch;
    await sleep(38 + Math.random() * 45);
  }
  lines.value[i].typing = false;
}

async function run() {
  for (const line of script) {
    if (!alive) return;
    await type(line);
    await sleep(line.kind === 'cmd' ? 260 : 130);
  }
  if (alive) pushIdlePrompt();
}

onMounted(() => {
  if (reduced) {
    lines.value = script.map((l) => ({ text: l.text, kind: l.kind, typing: false }));
    pushIdlePrompt();
    return;
  }
  run();
});

onBeforeUnmount(() => {
  alive = false;
});
</script>

<template>
  <div class="term" aria-hidden="true">
    <div class="term__bar">
      <span class="term__dot term__dot--r" />
      <span class="term__dot term__dot--y" />
      <span class="term__dot term__dot--g" />
      <span class="term__title">max@maxstash: ~</span>
    </div>
    <div class="term__body">
      <div v-for="(l, i) in lines" :key="i" class="term__line" :class="`term__line--${l.kind}`">
        <span v-if="l.kind === 'cmd'" class="term__prompt">~ $</span>
        <span class="term__text">{{ l.text }}</span>
        <span v-if="l.typing" class="term__cursor" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.term {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #0d1117;
  border: 1px solid var(--accent-border);
  box-shadow:
    var(--shadow),
    0 0 70px -24px var(--hero-glow-1);
  font-family: var(--mono);
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.8rem;
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
  padding: 0.95rem 1.05rem 1.25rem;
  font-size: 0.85rem;
  line-height: 1.7;
  min-height: 250px;
}

.term__line {
  white-space: pre-wrap;
  word-break: break-word;
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

.term__cursor {
  display: inline-block;
  width: 8px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: #a855f7;
  animation: term-blink 1s step-end infinite;
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

@media (prefers-reduced-motion: reduce) {
  .term__cursor {
    animation: none;
  }
}
</style>
