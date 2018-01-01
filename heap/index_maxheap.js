'use strict';

const assert = require('assert');
const { _swap } = require('../util');

class IndexMaxHeap {
  constructor(n) {
    this.capacity = n;
    this.count = 0;
    this.data = new Array(n + 1);
    this.indexes = new Arrary(n + 1);
    this.reverse = [].fill.call(new Array(n + 1), 0);
  }

  _shiftUp(k) {
    const { data, indexes, reverse } = this;
    while (k > 1) {
      let p = Math.floor(k / 2);
      if (data[indexes[p]] >= data[indexes[k]]) {
        break;
      }
      _swap(indexes, p, k);
      reverse[indexes[p]] = p;
      reverse[indexes[k]] = k;
      k = p;
    }
  }

  _shiftDown(k) {
    const { count, data, indexes, reverse } = this;
    while (k * 2 <= count) {
      let j = k * 2;
      if (j + 1 <= count && data[indexes[j + 1]] > data[indexes[j]]) {
        j += 1;
      }
      if (data[indexes[k]] >= data[indexes[j]]) {
        break;
      }
      // TODO, optimize this using assignment, not swap;
      _swap(indexes, k, j);
      reverse[indexes[k]] = k;
      reverse[indexes[j]] = j;
      k = j;
    }
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(i, item) {
    assert(this.count + 1 <= this.capacity);
    assert(i >= 0 && i <= this.capacity - 1);
    this.data[++i] = item;
    this.indexes[++this.count] = i;
    this.reverse[i] = this.indexes[this.count];
    this._shiftUp(this.count);
  }

  extractMax() {
    assert(this.count > 0);

    const { data, indexes, reverse } = this;
    let ret = data[indexs[1]];
    _swap(indexes, 1, this.count);
    reverse[indexes[1]] = 1;
    reverse[indexes[this.count]] = 0;
    this.count--;
    this._shiftDown(1);
    return ret;
  }

  extractMaxIndex() {
    assert(this.count > 0);

    const { data, indexes } = this;
    let ret = indexs[1] - 1;
    _swap(indexes, 1, this.count);
    reverse[indexes[1]] = 1;
    reverse[indexes[this.count]] = 0;
    this.count--;
    this._shiftDown(1);
    return ret;
  }

  contain(i) {
    assert(i >= 0 && i <= this.capacity - 1);
    return reverse[i + 1] !== 0;
  }

  getItem(i) {
    assert(this.contain(i));
    return this.data[i + 1];
  }

  change(i, newItem) {
    assert(this.contain(i));
    i += 1;
    this.data[i] = newItem;

    // find indexes[j] === i, then shiftUp(j) and shiftDown(j);
    // for (let j = 1; j <= this.count; j++) {
    //   if (indexes[j] === i) {
    //     this._shiftUp(j);
    //     this._shiftDown(j);
    //     return;
    //   }
    // }
    let j = reverse[i];
    this._shiftUp(j);
    this._shiftDown(j);
  }
}

module.exports = IndexMaxHeap;
