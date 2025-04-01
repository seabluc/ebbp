/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /sequelize/, // A RegExp 
      },
    ];
    return config;
  },
  images: {
    domains: ['cdna.pcpartpicker.com',
      'm.media-amazon.com',
      'images-na.ssl-images-amazon.com',
      'images-eu.ssl-images-amazon.com',
      'i.redd.it',
      'static',
      'images-fe.ssl-images-amazon.com'
    ],
  },
};

export default nextConfig;
