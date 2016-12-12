const phantom = require('phantom');
const clear = require('clear');
const http = require('http');
const nodeStatic = require('node-static');
const {gray, yellow, green, red} = require('chalk');

let demo = new nodeStatic.Server('../demo');
let server = http.createServer((request, response) => {
    request.addListener('end', () => demo.serve(request, response)).resume();
}).listen(3000);

/* Pre recorded vhs.events */
const testEvents = JSON.stringify(require('./test-events.json'));
const url = 'http://localhost:3000';

const prettyOut = (message) => {
    let events = [];
    try {
        events = JSON.parse(message);
    } catch (err) {
        console.log(red(message));
        process.exit(1);
    }
    let render = events.map(event => {
        let prettyEvent = `${event.index} ${event.type} ${event.duration || event.key || ''}`;
        if (event.status === 'pending') return gray(prettyEvent)
        else if (event.status === 'passed') return green(prettyEvent)
        else return gray(prettyEvent);
    });

    /* Skip continous rendering on CI as we can't clear() */
    if (!process.env.CI) {
        clear();
        console.log(render.join('\n'));
    }

    /* End of tests */
    if (events.pop().status !== 'pending') {
        clear();
        console.log(render.join('\n'));
        phantomInstance.exit();
        server.close();
    }
};

let phantomInstance;

/* Create phantom instance */
phantom.create([], {
    logger: {info: prettyOut}
})
/* New page instance */
.then(instance => {
    phantomInstance = instance;
    return instance.createPage();
})
/* All console messages should come to terminal */
.then(page => {
    page.property('onConsoleMessage', (message) => {
        console.log(message);
    });
    page.property('onError', (message) => {
        console.log(message);
    });
    return page;
})

.then(page => page.open(url).then(() => page))
.then(page => {
    /* Can execute functions in page.evaluate */
    return page.evaluate(function(testEvents) {
        localStorage.setItem('vhs', testEvents);
        window.vhs.setupPlayback(true); // true for remote flag
        return 'done';
    }, testEvents);
})
.then(res => {
    console.log(yellow('Running tests'));
});