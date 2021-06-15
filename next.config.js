module.exports = {
  async redirects() {
    return [
      {
        source: '/category/news',
        destination: '/',
        permanent: true
      },
      {
        source: '/category/mims-procedure',
        destination: '/',
        permanent: true
      },
      {
        source: '/category/benefits',
        destination: '/',
        permanent: true
      },
      {
        source: '/category/about-us',
        destination: '/',
        permanent: true
      }
    ];
  }
};
