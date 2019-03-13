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
    description: 'Architectural documentation',
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
        repo: 'vogloblinsky/pytheas',
        displayAllHeaders: false,
        docsDir: 'packages/pytheas-documentation',
        docsBranch: 'develop',
        editLinks: true,
        editLinkText: 'Edit Page',
        lastUpdated: 'Last Updated',
        sidebarDepth: 2
    }
}