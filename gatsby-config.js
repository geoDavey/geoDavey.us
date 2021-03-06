require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `🌍 🌎 🌏 🌍 🌎 🌏 🌍 🌎 🌏`,
    author: {
      name: `geoDavey`,
    },
    description: `geoDavey website`,
    siteUrl: `https://geoDavey.us/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/img`,
        name: `img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/maps`,
        name: `maps_md`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/components/maps`,
        name: `maps_js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/battlestations`,
        name: `battlestations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/components/page.js`),
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require('remark-unwrap-images')],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 500,
              ratio: 1.77,
              related: false,
              noIframeBorder: true,
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: (videoId) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ],
              containerClass: "",
            },
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              showCaptions: true
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.FAUNA_SECRET_KEY,
        index: `allUpdates`,
        type: "updates",
        size: 100,
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.FAUNA_SECRET_KEY,
        index: `allTracks`,
        type: "tracks",
        size: 100,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
        purge: false,
        ignore: [
          "src/styles/base.scss",
          "src/styles/ol-globe.scss",
          "gatsby-plugin-transition-link/",
          "prismjs/",
          "mapbox-gl/"
        ],
      },
    },
  ],
};

const cloudinary = [
  {
    resolve: `gatsby-source-cloudinary`,
    options: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      resourceType: `image`,
      maxResults: 500,
      context: true,
      tags: true,
    },
  },
  {
    resolve: `gatsby-transformer-cloudinary`,
    options: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      resourceType: `image`,
      maxResults: 500,
      context: true,
      tags: true,
    },
  },
];
