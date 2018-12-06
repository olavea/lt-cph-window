module.exports = {
  siteMetadata: {
    title: 'Norway Yacht Charter Audio Guide Demo',
    description:
      'En udstilling af Berger Lylloff Huseby i Atelier Ahorn, København.',
    image: `${process.env.DEPLOY_PRIME_URL}/some.jpg`,
    lang: 'da',
    mainNav: [{ label: 'Info', path: 'info' }],
    pageNav: [{ label: 'Tilbage', path: '/' }],
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-129214628-2',
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `audio`,
        path: `${__dirname}/content/audio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: 'page',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: '... og siden har jeg haft den',
        short_name: '... og siden',
        start_url: '/',
        background_color: '#518159',
        theme_color: '#518159',
        display: 'minimal-ui',
        icon: 'static/icon.jpg', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
