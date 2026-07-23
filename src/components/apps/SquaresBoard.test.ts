import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SquaresBoard from './SquaresBoard.vue';

describe('SquaresBoard', () => {
  it('renders claimed squares and the winner caption', () => {
    const wrapper = mount(SquaresBoard);
    expect(wrapper.text()).toContain('MM');
    expect(wrapper.text()).toContain('winner: Q3');
  });

  it('marks the winning cell with a trophy', () => {
    const wrapper = mount(SquaresBoard);
    expect(wrapper.find('.cell.is-winner').exists()).toBe(true);
    expect(wrapper.find('.cell.is-winner .pi-trophy').exists()).toBe(true);
  });

  it('renders a 5x5 grid of cells', () => {
    const wrapper = mount(SquaresBoard);
    expect(wrapper.findAll('.cell')).toHaveLength(25);
  });
});
