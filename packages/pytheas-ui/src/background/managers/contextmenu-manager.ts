import { pubsub, EVENTS } from '../../utils';

function fadeElement(a, b) {
    if (b !== 'show') {
        return (a.style.opacity =
            setTimeout(() => {
                a.style.display = 'none';
            }, 200) * 0);
    }
    a.style.display = 'block';
    setTimeout(() => {
        a.style.opacity = 1;
    }, 30);
}

function isNotBatman(a, h) {
    for (; a && a !== document; a = a.parentNode) {
        if (a.classList.contains(h.substr(1))) {
            return 1;
        }
    }
}

/**
 * Manage settings
 */
class ContextmenuSingleton {
    private static instance: ContextmenuSingleton;
    private constructor() {}
    static getInstance() {
        if (!ContextmenuSingleton.instance) {
            ContextmenuSingleton.instance = new ContextmenuSingleton();
        }
        return ContextmenuSingleton.instance;
    }

    init() {
        this.updateHost();
        document.addEventListener('mousedown', e => {
            if (!isNotBatman(e.target, '.jctx-host') && document.querySelector('py-graph')) {
                Array.from(document.querySelectorAll('.jctx')).forEach((x, i) => {
                    fadeElement(x, 'hide');
                });
            }
        });
        Array.from(document.querySelectorAll('.jctx li')).forEach((x, i) => {
            x.addEventListener('click', () => {
                if (!x.classList.contains('disabled')) {
                    this.handleMenuAction(x.getAttribute('data-action'));
                }
                fadeElement(x.parentElement, 'hide');
            });
        });
    }

    handleMenuAction(evt) {
        // console.log('Action required: ' + evt);
        if (evt === 'saveasimage') {
            pubsub.publish(EVENTS.SAVEGRAPHASIMAGE);
        }
    }

    updateHost() {
        const graphContainer = document.querySelector('.graph-container');
        if (graphContainer && document.querySelector('py-graph')) {
            graphContainer.addEventListener('contextmenu', event => {
                /** COPYRIGHT https://github.com/turbo/justContext.js */
                Array.from(document.querySelectorAll('.jctx')).forEach((k, i) => {
                    k.style.display = 'none';
                });
                event.preventDefault();
                let mID = '';
                Array.from(graphContainer.classList).forEach((y, i) => {
                    if (~y.indexOf('jctx-id-')) {
                        mID = '.' + y;
                    }
                });
                const x = document.querySelector('.jctx' + mID);
                const maxLeft = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 10 - x.getBoundingClientRect().width;
                const maxTop =
                    (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 10 - x.getBoundingClientRect().height;
                fadeElement(x, 'show');
                (x.style.left = (event.pageX > maxLeft ? maxLeft : event.pageX) + 'px'), (x.style.top = (event.pageY > maxTop ? maxTop : event.pageY) + 'px');
            });
        }
    }
}

export const ContextmenuManager = ContextmenuSingleton.getInstance();
