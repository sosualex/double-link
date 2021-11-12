let ptrs = [];

class Node {
    constructor(data, next, prev, index) {
        this.data = data;
        this.index = index
        this.next = next;
        this.prev = prev;
    }
    _next() {
        if (this.next == null) return null;
        return ptrs[this.next]
    }
    _prev() {
        if (this.prev == null) return null;
        return ptrs[this.prev]
    }
}
class Dll {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    show() {
        let pr = ''
        let curr = this.head
        for (let i = 0; i < this.size; i++) {
            pr = pr + ' --> ' + curr.data;
            curr = curr._next();
        }
        console.log(pr)
        console.log()
    }
    addAtEnd(d) {
        let newNode = new Node(d, null, null, ptrs.length)
        ptrs.push(newNode);

        if (this.tail != null) {
            this.tail.next = newNode.index;
            newNode.prev = this.tail.index
        }
        this.tail = newNode;

        if (this.head == null) {
            this.head = newNode
        }
        this.size++;
        return newNode;
    }
    findKafterP(p, k) {
        let pNode = p;
        let currNode = pNode
        for (let i = 0; i < k; i++) {
            currNode = currNode._next();
        }
        return currNode;
    }
    findKbeforeP(p, k) {
        let pNode = p;
        let currNode = pNode
        for (let i = 0; i < k; i++) {
            currNode = currNode._prev();
        }
        return currNode;
    }
    separate(p) {
        if (p.next != null && p.prev != null) {
            p._next().prev = p._prev().index;
            p._prev().next = p._next().index;
        }
        //todo: handle edge cases
        this.size--;

    }
    delete(p) {
        this.separate(p)
        p = null;
    }
    insertBefore(q, p) {
        p.next = q.index;
        p.prev = q.prev;
        q.prev = p.index;
        p._prev().next = p.index;
    }
}

let myLL = new Dll();
myLL.addAtEnd(11)
myLL.addAtEnd(10)
myLL.addAtEnd(9)
let p = myLL.addAtEnd(8)
myLL.addAtEnd(7)
myLL.addAtEnd(6)
myLL.addAtEnd(5)
console.log('myLL ----- Initial')
myLL.show()

k = 2
console.log(p);
let kAfter = myLL.findKafterP(p, k);
console.log(k, 'after', p.data, '=', kAfter);
myLL.delete(kAfter);
console.log('deleted k after p')
myLL.show()

let kBefore = myLL.findKbeforeP(p, k)
console.log(k, 'before', p.data, '=', kBefore);
myLL.separate(p)
console.log('p separated')
myLL.show();
myLL.insertBefore(kBefore, p);
console.log('p inserted', k, 'places back')
myLL.show()

