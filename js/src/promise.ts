module bergecraft.rogue{
    interface IPromiseCallbacks{
        fulfilled:any[];
        rejected:any[];
    }
    export class Promise{
        _state:number;
        _value:string;
        _cb:IPromiseCallbacks;
        _thenPromises = [];
        constructor() {
            this._state = 0; /* 0 = pending, 1 = fulfilled, 2 = rejected */
            this._value = null; /* fulfillment / rejection value */

            this._cb = {
                fulfilled: [],
                rejected: []
            }

            this._thenPromises = []; /* promises returned by then() */
        }

        /**
         * @param {function} onFulfilled To be called once this promise gets fulfilled
         * @param {function} onRejected To be called once this promise gets rejected
         * @returns {Promise}
         */
        then(onFulfilled:Function, onRejected:Function) {
            this._cb.fulfilled.push(onFulfilled);
            this._cb.rejected.push(onRejected);

            var thenPromise = new Promise();

            this._thenPromises.push(thenPromise);

            if (this._state > 0) {
                setTimeout(this._processQueue.bind(this), 0);
            }

            /* 3.2.6. then must return a promise. */
            return thenPromise; 
        }

        /**
         * Fulfill this promise with a given value
         * @param {any} value
         */
        fulfill(value?) {
            if (this._state != 0) { return this; }

            this._state = 1;
            this._value = value;

            this._processQueue();

            return this;
        }

        /**
         * Reject this promise with a given value
         * @param {any} value
         */
        reject(value?) {
            if (this._state != 0) { return this; }

            this._state = 2;
            this._value = value;

            this._processQueue();

            return this;
        }

        /**
         * Pass this promise's resolved value to another promise
         * @param {Promise} promise
         */
        chain(promise:Promise) {
            return this.then(promise.fulfill.bind(promise), promise.reject.bind(promise));
        }

        /**
         * @param {function} onRejected To be called once this promise gets rejected
         * @returns {Promise}
         */
        catch(onRejected:Function) {
            return this.then(null, onRejected);
        }

        _processQueue() {
            while (this._thenPromises.length) {
                var onFulfilled = this._cb.fulfilled.shift();
                var onRejected = this._cb.rejected.shift();
                this._executeCallback(this._state == 1 ? onFulfilled : onRejected);
            }
        }

        _executeCallback(cb:Function) {
            var thenPromise = this._thenPromises.shift();

            if (typeof(cb) != "function") {
                if (this._state == 1) {
                    /* 3.2.6.4. If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value. */
                    thenPromise.fulfill(this._value);
                } else {
                    /* 3.2.6.5. If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason. */
                    thenPromise.reject(this._value);
                }
                return;
            }

            try {
                var returned:Promise = cb(this._value);

                if (returned && typeof(returned.then) == "function") {
                    /* 3.2.6.3. If either onFulfilled or onRejected returns a promise (call it returnedPromise), promise2 must assume the state of returnedPromise */
                    var fulfillThenPromise = function(value) { thenPromise.fulfill(value); }
                    var rejectThenPromise = function(value) { thenPromise.reject(value); }
                    returned.then(fulfillThenPromise, rejectThenPromise);
                } else {
                    /* 3.2.6.1. If either onFulfilled or onRejected returns a value that is not a promise, promise2 must be fulfilled with that value. */ 
                    thenPromise.fulfill(returned);
                }

            } catch (e) {

                /* 3.2.6.2. If either onFulfilled or onRejected throws an exception, promise2 must be rejected with the thrown exception as the reason. */
                thenPromise.reject(e); 

            }
        }  
    }
}