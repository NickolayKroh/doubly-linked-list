const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data);

        if(!this.length) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            this._tail.next = newNode;
            newNode.prev = this._tail;
            this._tail = newNode;
        }

        ++this.length;

        return this;
    }

    head() {
        if(this._head)
            return this._head.data;
        return null;
    }

    tail() {
        if(this._tail)
            return this._tail.data;
        return null;
    }

    at(index) {
        if(index < 0 || index > this.length - 1)
            return null;

        let cursor = this._head;

        for(let i = 0; i < index; ++i)
                cursor = cursor.next;
        
        return cursor.data;
    }

    insertAt(index, data) {
        if(index < 0 || index > this.length)
            return false;

        if(index === this.length)
            return this.append(data);

        let current = this._head;

        for(let i = 0; i < index; ++i)
            current = current.next;
        
        let newNode = new Node(data);
        
        if(this.length === 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            if(index === 0)
                this._head = newNode;
            else
                current.prev.next = newNode;

            newNode.next = current;
            newNode.prev = current.prev;
            current.prev = newNode;
        }

        ++this.length;

        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        let cursor = this._head;

        for(let i = 0; i < this.length; ++i) {
            cursor.prev = null;
            cursor = cursor.next;
        }

        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if(index < 0 || index > this.length - 1)
            return false;

        let current = this._head;

        for(let i = 0; i < index && current.next; ++i)
            current = current.next;
        
        if(index === 0)
            this._head = current.next;
        else
            current.prev.next = current.next;

        if(index === this.length - 1)
            this._tail = current.prev;
        else
            current.next.prev = current.prev;

        --this.length;

        return this;
    }

    reverse() {
        if(this.length <= 1)
            return this;
    
        let cursor = this._head;
        
        for(let i = 0; i < this.length; ++i) {
            let t = cursor.next;
            cursor.next = cursor.prev;
            cursor.prev = t;

            //go to next whitch is previous now
            cursor = cursor.prev;
        }
    
        let t = this._head;
        this._head = this._tail;
        this._tail = t;

        return this;
    }

    indexOf(data) {
        let cursor = this._head;

        for(let i = 0; i < this.length; ++i) {
            if(cursor.data === data)
                return i;
            cursor = cursor.next;
        }

        return -1;
    }
}

module.exports = LinkedList;
