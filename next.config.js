module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/submitform",
        destination: "/api/submitform",
      },
    ];
  },
};
