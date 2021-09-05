require('dotenv').config()

const serverUrl = process.env.GRAPHQL_SERVER || "https://jed.kuropen.org/graphql"

module.exports = {
  siteMetadata: {
    siteUrl: "https://jed.kuropen.org/",
    title: "Japan Electricity Dashboard",
  },
  plugins: [
    `gatsby-plugin-typegen`,
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/elecwarn_icon.png",
      },
    },
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "JED",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "jedGraph",
        // Url to query from
        url: serverUrl,
      },
    }
  ],
};
