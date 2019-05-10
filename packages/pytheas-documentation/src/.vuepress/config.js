const sidebar = [
    ['/', 'Home'],
    ['/guide/', 'Introduction'],
    ['/architecture/', 'Architecture'],
    ['/technologies/', 'Technologies'],
    {
        title: 'How it works ?',
        children: [
            ['/how-it-works/', 'Workflow'],
            '/how-it-works/file-parsing',
            '/how-it-works/graph-window'
        ]
    }
]
module.exports = {
    title: 'Pytheas',
    base: '/pytheas/',
    description: 'Architectural & contributors documentation',
    themeConfig: {
        logo: '/logo.png',
        sidebar: {
            '/guide/': sidebar,
            '/architecture/': sidebar,
            '/technologies/': sidebar,
            '/how-it-works/': sidebar
        },
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/'
            }
        ],
        repo: 'pytheas-tools/pytheas',
        displayAllHeaders: false,
        docsDir: 'packages/pytheas-documentation',
        docsBranch: 'develop',
        editLinks: true,
        editLinkText: 'Edit Page',
        lastUpdated: 'Last Updated',
        sidebarDepth: 2
    },
    plugins: ['@vuepress/medium-zoom']
}