import Event from './Event.js';

export default class PageModule extends Event {
    constructor() {
        super();
    };

    start() {
        Page(this);
    }
}