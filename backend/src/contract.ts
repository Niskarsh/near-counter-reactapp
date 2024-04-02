import { NearBindgen, near, call, view } from 'near-sdk-js';


@NearBindgen({})
class Counter {
    counter:number = 0;

    @view({})
    get_num(): number {
        near.log(this.counter)
        return this.counter;
    }

    @call({})
    increment({ step = 1 }): void {
        this.counter += step;
        near.log(`New counter`, this.counter)
    }

    @call({})
    decrement({ step = 1 }): void {
        this.counter -= step;
        near.log(`New counter`, this.counter)
    }

    @call({})
    reset(): void {
        this.counter = 0;
        near.log(`New counter`, this.counter)
    }
}
