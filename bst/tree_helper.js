'use strict';

const assert = require('assert');
const fs = require('fs');
const { performance } = require('perf_hooks');

const SearchHelper = function () { };

SearchHelper.prototype = {
  generateOrderArray(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  },

  generateWordsArrayFrom(file) {
    const words = [];
    const text = fs.readFileSync(file, 'utf8');
    text.split(/\r?\n/).forEach((line) => {
      let arr = line.match(/\w+/g);
      arr = arr ? arr.map(word => word.toLowerCase()) : [];
      words.push(...arr);
    });
    return words;
  },

  testSearch(searchName, search, arr) {
    const n = arr.length;
    const begin = performance.now();
    for (let i = 0, len = 2 * n; i < len; i++) {
      let v = search(arr, i);
      if (i < n) {
        assert(v === i);
      } else {
        assert(v === -1);
      }
    }
    const end = performance.now();
    console.info(`    ${searchName}: from ${n} items searched ${2 * n} items in ${end - begin} ms.`);
  },

  testTreeSearch(treeName, Tree, arr, key) {
    const begin = performance.now();

    const t = new Tree();
    for (let i = 0; i < arr.length; i++) {
      let node = t.search(arr[i]);
      if (node) {
        node.value++;
      } else {
        t.insert(arr[i], 1);
      }
    }
    if (t.contain(key)) {
      process.stdout.write(`    '${key}': ${t.search(key).value}`);
    } else {
      process.stdout.write(`no word "${key}"`);
    }
    const end = performance.now();
    console.info(`    ${treeName}, time: ${end - begin} ms.`);
  },

  testTraverse(treeName, Tree) {
    const t = new Tree();

    const N = 10;
    const M = 100;
    for (let i = 0; i < N; i++) {
      let key = Math.floor(Math.random() * M);
      let value = key;
      process.stdout.write(`${key} `);
      t.insert(key, value);
    }
    console.info(`\nsize: ${t.size()}`);
    process.stdout.write('preOrder   : ');
    t.preOrder((v) => { process.stdout.write(`${v} `) });
    console.info('');

    process.stdout.write('inOrder    : ');
    t.inOrder((v) => { process.stdout.write(`${v} `) });
    console.info('');

    process.stdout.write('postOrder  : ');
    t.postOrder((v) => { process.stdout.write(`${v} `) });
    console.info('');

    process.stdout.write('levelOrder : ');
    t.levelOrder((v) => { process.stdout.write(`${v} `) });
    console.info('');
  }
}

module.exports = new SearchHelper();
