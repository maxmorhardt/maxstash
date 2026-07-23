<script setup lang="ts">
const awayNumbers = [3, 7, 1, 9, 4];
const homeNumbers = [2, 8, 0, 5, 6];
const winnerCell = '2,2';
const claimed: Record<string, string> = {
  '0,1': 'MM',
  '0,4': 'AK',
  '1,0': 'JD',
  '1,3': 'SR',
  '2,2': '',
  '3,1': 'TL',
  '3,4': 'BW',
  '4,0': 'CG',
  '4,3': 'RP',
};

function cellState(r: number, c: number): 'winner' | 'claimed' | 'open' {
  const key = `${r},${c}`;
  if (key === winnerCell) {
    return 'winner';
  }

  return key in claimed ? 'claimed' : 'open';
}
</script>

<template>
  <div class="board">
    <div class="board-grid" aria-hidden="true">
      <!-- corner + away numbers across the top -->
      <span class="board-corner"><span class="pi pi-th-large" /></span>
      <span v-for="n in awayNumbers" :key="`a-${n}`" class="axis">{{ n }}</span>

      <!-- home number then a row of cells, for each row -->
      <template v-for="(_, r) in 5" :key="`r-${r}`">
        <span class="axis">{{ homeNumbers[r] }}</span>
        <span
          v-for="(__, c) in 5"
          :key="`c-${r}-${c}`"
          class="cell"
          :class="`is-${cellState(r, c)}`"
          :style="{ animationDelay: `${(r * 5 + c) * 32}ms` }"
        >
          <span v-if="cellState(r, c) === 'winner'" class="pi pi-trophy" />
          <template v-else>{{ claimed[`${r},${c}`] }}</template>
        </span>
      </template>
    </div>
    <span class="board-caption" aria-hidden="true"> home &times; away &middot; winner: Q3 </span>
  </div>
</template>

<style scoped>
.board {
  width: min(340px, 100%);
}

.board-grid {
  display: grid;
  grid-template-columns: 1.3rem repeat(5, 1fr);
  gap: 0.4rem;
}

.axis,
.board-corner {
  display: grid;
  place-items: center;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--text);
}

.board-corner {
  color: var(--accent);
  opacity: 0.7;
}

.cell {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.03em;
  color: var(--text);
}

.cell.is-claimed {
  background: var(--accent-bg);
  border-color: var(--accent-border);
  color: var(--accent);
  font-weight: 600;
}

.cell.is-winner {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-size: 0.85rem;
  box-shadow: 0 0 0 3px var(--accent-bg);
}

.board-caption {
  display: block;
  margin-top: 0.7rem;
  text-align: center;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--text);
  opacity: 0.7;
}

.cell {
  opacity: 0;
  transform: scale(0.7);
}

.is-visible .board .cell {
  animation: cell-pop 0.4s var(--ease-spring) both;
}

@keyframes cell-pop {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cell,
  .is-visible .board .cell {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
