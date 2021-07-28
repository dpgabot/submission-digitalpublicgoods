// next.config.js
// solution file from https://vercel.com/support/articles/how-to-enable-cors#enabling-cors-in-a-next.js-app
module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          {key: "Access-Control-Allow-Credentials", value: "true"},
          {
            key: "Access-Control-Allow-Origin",
            value: "https://digitalpublicgoods.net",
          },
          {key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,POST"},
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
