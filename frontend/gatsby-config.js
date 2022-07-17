module.exports = {
  siteMetadata: {
    title: `boop`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `A website for you and your indecisive friends to make decisions quick.`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `boop`,
        short_name: `boop`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/assets/images/boopRectLogo.png`,
      },
    },
    "gatsby-plugin-styled-components",
  ],
};
