'use strict';

const assert = require('assert');

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.left = this.right = null;
}

class BST {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(key, value) {
    this.root = this._insert(this.root, key, value);
  }

  _insert(node, key, value) {
    if (node === null) {
      this.count++;
      return new Node(key, value);
    }
    if (key === node.key) {
      node.value = value;
    } else if (key < node.key) {
      node.left = this._insert(node.left, key, value);
    } else {
      node.right = this._insert(node.right, key, value);
    }
    return node;
  }

  contain(key) {
    function _contain(node, key) {
      if (node === null) {
        return false;
      }
      if (key === node.key) {
        return true;
      } if (key < node.key) {
        return _contain(node.left, key);
      } else {
        return _contain(node.right, key);
      }
    }
    return _contain(this.root, key);
  }

  search(key) {
    function _search(node, key) {
      if (node === null) {
        return null;
      }
      if (key === node.key) {
        return node;  // may return 'value' if we have pointer.
      } if (key < node.key) {
        return _search(node.left, key);
      } else {
        return _search(node.right, key);
      }
    }
    return _search(this.root, key);
  }

  preOrder(visit) {
    function _preOrder(node, visit) {
      if (node) {
        visit(node.key);
        _preOrder(node.left, visit);
        _preOrder(node.right, visit);
      }
    }
    _preOrder(this.root, visit);
  }

  inOrder(visit) {
    function _inOrder(node, visit) {
      if (node) {
        _inOrder(node.left, visit);
        visit(node.key);
        _inOrder(node.right, visit);
      }
    }
    _inOrder(this.root, visit);
  }

  postOrder(visit) {
    function _postOrder(node, visit) {
      if (node) {
        _postOrder(node.left, visit);
        _postOrder(node.right, visit);
        visit(node.key);
      }
    }
    _postOrder(this.root, visit);
  }

  levelOrder(visit) {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      visit(node.key);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  // destroy() {
  //   this._destroy(this.root);
  // }

  // _destroy(node) {
  //   if (node) {
  //     this._destroy(node.left);
  //     this._destroy(node.right);
  //     node = null;
  //     this.count--;
  //   }
  // }

  min() {
    assert(this.count !== 0);
    return  this._min(this.root).key;
  }

  _min(node) {
    if (!node.left) {
      return node;
    }
    return this._min(node.left);
  }

  max() {
    function _max(node) {
      if (!node.right) {
        return node;
      }
      return _max(node.right);
    }
    assert(this.count !== 0);
    return _max(this.root).key;
  }

  removeMin() {
    if (this.root) {
      this.root = this._removeMin(this.root);
    }
  }

  _removeMin(node) {
    if (!node.left) {
      let right = node.right;
      // node = null;
      this.count--;
      return right;
    }
    node.left = this._removeMin(node.left);
    return node;
  }

  removeMax() {
    if (this.root) {
      this.root = this._removeMax(this.root);
    }
  }

  _removeMax(node) {
    if (!node.right) {
      let left = node.left;
      // node = null;
      this.count--;
      return left;
    }
    node.right = this._removeMax(node.right);
    return node;
  }
  
  remove(key) {
    this.root = this._remove(this.root, key);
  }

  _remove(node, key) {
    if (!node) {
      return null;
    }

    if (key < node.key) {
      node.left = this._remove(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this._remove(node.right, key);
      return node;
    } else {  // key === node.key
      if (!node.left) {
        const right = node.right;
        // node = null;
        this.count--;
        return right;
      }

      if (!node.right) {
        const left = node.left;
        // node = null;
        this.count--;
        return left;
      }

      // node.left !== null and node.right !== null
      const successor = this._min(node.right);
      successor.right = this._removeMin(node.right); // this.count-- in removeMin
      successor.left = node.left;
      return successor;
    }
  }

}

module.exports = BST ;
