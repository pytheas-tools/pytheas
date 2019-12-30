/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/logo-512.svg",
    "revision": "c807de421b56c2ade03cc2e75d537ef2"
  },
  {
    "url": "assets/logo.svg",
    "revision": "098179a15876154e84d86fb8fcac8bd9"
  },
  {
    "url": "demos/demos.json",
    "revision": "1912b130ba9bbc5b86d845b2dc72281e"
  },
  {
    "url": "demos/javascript/es6/game.js",
    "revision": "c7a964c181610ff7b14d643fcb35b90a"
  },
  {
    "url": "demos/javascript/es6/main.js",
    "revision": "664856b65b061ecf42e2e32783c0b993"
  },
  {
    "url": "demos/javascript/es6/player/player-types.js",
    "revision": "d7239a9f284c39495cdadad457d0e887"
  },
  {
    "url": "demos/javascript/es6/player/player.js",
    "revision": "5eb0a155e3b5b6f893b098c875c23869"
  },
  {
    "url": "demos/javascript/es6/rule/rule.js",
    "revision": "2d5abe16b18f372a142eaf2dfa980d41"
  },
  {
    "url": "demos/typescript/typescript/game.css",
    "revision": "2f2c413517a0f78dbaa7929bcdcb4b35"
  },
  {
    "url": "demos/typescript/typescript/game.ts",
    "revision": "5b11c5fd3389185a2e0b00a64d6e7db0"
  },
  {
    "url": "demos/typescript/typescript/main-backup.ts",
    "revision": "1f4d79c46c1f0ab05ba7f864e19f8521"
  },
  {
    "url": "demos/typescript/typescript/main.ts",
    "revision": "3c874dc0cfac6aceb7d6b67a41c1ae63"
  },
  {
    "url": "demos/typescript/typescript/player/player-types.ts",
    "revision": "d7239a9f284c39495cdadad457d0e887"
  },
  {
    "url": "demos/typescript/typescript/player/player.ts",
    "revision": "14b3e21a44d76d166889be5aaa3420a5"
  },
  {
    "url": "demos/typescript/typescript/rule/rule.ts",
    "revision": "3f7ea22c14d7ac6b8e823e48c7e881e2"
  },
  {
    "url": "demos/typescript/typescript/settings.ts",
    "revision": "e39cf90cdd9de706475e52082cb07f99"
  },
  {
    "url": "demos/typescript/typescript/weapon/weapon.ts",
    "revision": "13bee3de23967921ddaf30af6ffbc26b"
  },
  {
    "url": "index.html",
    "revision": "bb0bd4014d9278a5c0b8222303dc0b5b"
  },
  {
    "url": "manifest.json",
    "revision": "119b0d9fc151ce32f96b0be81f9fa3bb"
  },
  {
    "url": "scripts/app_es6.js",
    "revision": "5cf534d3f1cefec3b2638ee70fd86724"
  },
  {
    "url": "scripts/app.js",
    "revision": "5cf534d3f1cefec3b2638ee70fd86724"
  },
  {
    "url": "scripts/codemirror.js",
    "revision": "e08b5336eaa62dbd261684dd12fbc7b2"
  },
  {
    "url": "scripts/mxgraph/css/common.css",
    "revision": "7142e2f0ed75672962db1428973c01cb"
  },
  {
    "url": "scripts/mxgraph/mxClient.min.js",
    "revision": "4ffa9d82e75f85888eed71d90c971e8b"
  },
  {
    "url": "scripts/tsquery.js",
    "revision": "e229b1c0cfb4337e51f34ba91a181a31"
  },
  {
    "url": "scripts/vue-template-compiler.js",
    "revision": "4ce344236ed3397d094792d7b3dc1792"
  },
  {
    "url": "styles/app.css",
    "revision": "56e0adf62ec620838b5168be36847564"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/unpkg.com\/ionicons/g, new workbox.strategies.StaleWhileRevalidate(), 'GET');

self.addEventListener('message', (event) => {
    if (!event.data) {
        return;
    }

    switch (event.data) {
        case 'skipWaiting':
            self.skipWaiting();
            break;
        default:
            break;
    }
});