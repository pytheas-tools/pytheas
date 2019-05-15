module.exports = {
  "globDirectory": "output/",
  "globPatterns": [
    "**/*.{svg,html,css,js,ts,json}"
  ],
  "swDest": "output/sw.js",
  "maximumFileSizeToCacheInBytes": "8388608",
  'runtimeCaching': [{
    'urlPattern': new RegExp('https://unpkg.com/ionicons', 'g'),
    'handler': 'StaleWhileRevalidate'
  }]
};