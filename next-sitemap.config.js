/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gurunanakacademydehradun.org',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/api/*', '/admin/*'],
    robotsTxtOptions: {
        additionalSitemaps: [],
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
        ],
    },
    transform: async (config, path) => {
        // Set higher priority for important pages
        let priority = 0.7;
        let changefreq = 'weekly';

        if (path === '/') {
            priority = 1.0;
            changefreq = 'daily';
        } else if (path === '/about' || path === '/admission' || path === '/contact') {
            priority = 0.9;
            changefreq = 'weekly';
        } else if (path === '/facilities' || path === '/boarding' || path === '/events') {
            priority = 0.8;
            changefreq = 'weekly';
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
};

