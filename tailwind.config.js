const {
  CloudConfig,
  URLConfig,
  CloudinaryImage,
} = require('@cloudinary/url-gen');
const babMorocco = getImage('trakz/assets/bab_morocco.webp');
const nightDusk = getImage('trakz/assets/night_dusk.webp');
const nightBeach = getImage('trakz/assets/night_beach.webp');
const mountainBeach = getImage('trakz/assets/mountain_beach.webp');
const dune = getImage('trakz/assets/dune.webp');
const street = getImage('trakz/assets/street.webp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '2xs': '540px',
      },
      backgroundImage: {
        'night-bab': `url('${babMorocco.toURL()}')`,
        'night-dusk': `url('${nightDusk.toURL()}')`,
        'night-beach': `url('${nightBeach.toURL()}')`,
        'mountain-beach': `url('${mountainBeach.toURL()}')`,
        dune: `url('${dune.toURL()}')`,
        street: `url('${street.toURL()}')`,
      },
    },
  },
  plugins: [],
};

function getImage(publicId, quality = 75) {
  // Set the Cloud configuration and URL configuration
  const cloudConfig = new CloudConfig({ cloudName: 'mfaouzi' });
  const urlConfig = new URLConfig({ secure: true });
  return new CloudinaryImage(publicId, cloudConfig, urlConfig)
    .format('webp')
    .quality(quality);
}
