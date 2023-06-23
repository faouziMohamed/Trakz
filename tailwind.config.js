const {
  CloudConfig,
  URLConfig,
  CloudinaryImage,
} = require('@cloudinary/url-gen');
const { scale } = require('@cloudinary/url-gen/actions/resize');
const PageTitles = {
  MyDay: 'My Day',
  Important: 'Important',
  Planned: 'Planned',
  Tasks: 'Tasks',
  Projects: 'Projects',
};

const babMorocco = getImage('trakz/assets/bab_morocco.webp');
const darkRoad = getImage('trakz/assets/dark_road.webp');
const moroccanTamazight = getImage('trakz/assets/moroccan_tamazight.webp');
const nightRoad = getImage('trakz/assets/night_road.webp');
const wallBike = getImage('trakz/assets/wall_bike.webp');
const riverSky = getImage('trakz/assets/river_sky.webp');
const darkSea = getImage('trakz/assets/dark_sea.webp');
const skyMirror = getImage('trakz/assets/sky_mirror.webp');
const seaLand = getImage('trakz/assets/sea_land.webp');
const palmDark = getImage('trakz/assets/palm_dark.webp');
const rabatLandscape = getImage('trakz/assets/rabat_landscape.webp');
const nycNight = getImage('trakz/assets/nyc_night.webp');
const chefchaouenMorocco = getImage('trakz/assets/chefchaouen_morocco.webp');
const camelDune = getImage('trakz/assets/camel_dune.webp');
const duneSand = getImage('trakz/assets/dune_sand.webp');

const bgImg = {};
bgImg[PageTitles.MyDay] = { light: duneSand, dark: camelDune, babMorocco };
bgImg[PageTitles.Important] = { light: rabatLandscape, dark: nycNight };
bgImg[PageTitles.Planned] = { light: seaLand, dark: palmDark };
bgImg[PageTitles.Tasks] = { light: wallBike, dark: nightRoad };
bgImg[PageTitles.Projects] = { light: chefchaouenMorocco, dark: darkSea };
console.log({ downloadedImages: bgImg });
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
        'dark-my-day': `url('${bgImg[PageTitles.MyDay].dark}')`,
        'light-my-day': `url('${bgImg[PageTitles.MyDay].light}')`,
        'dark-important': `url('${bgImg[PageTitles.Important].dark}')`,
        'light-important': `url('${bgImg[PageTitles.Important].light}')`,
        'dark-planned': `url('${bgImg[PageTitles.Planned].dark}')`,
        'light-planned': `url('${bgImg[PageTitles.Planned].light}')`,
        'dark-tasks': `url('${bgImg[PageTitles.Tasks].dark}')`,
        'light-tasks': `url('${bgImg[PageTitles.Tasks].light}')`,
        'dark-projects': `url('${bgImg[PageTitles.Projects].dark}')`,
        'light-projects': `url('${bgImg[PageTitles.Projects].light}')`,
        'bab-morocco': `url('${bgImg[PageTitles.MyDay].babMorocco}')`,
        'dark-road': `url('${darkRoad}')`,
        'moroccan-tamazight': `url('${moroccanTamazight}')`,
        'night-road': `url('${nightRoad}')`,
        'wall-bike': `url('${wallBike}')`,
        'river-sky': `url('${riverSky}')`,
        'dark-sea': `url('${darkSea}')`,
        'sky-mirror': `url('${skyMirror}')`,
        'sea-land': `url('${seaLand}')`,
        'palm-dark': `url('${palmDark}')`,
        'rabat-landscape': `url('${rabatLandscape}')`,
        'nyc-night': `url('${nycNight}')`,
        'chefchaouen-morocco': `url('${chefchaouenMorocco}')`,
        'camel-dune': `url('${camelDune}')`,
        'dune-sand': `url('${duneSand}')`,
      },
      fontFamily: {
        inter: ['Inter', 'Kanit', 'sans-serif'],
        kanit: ['Kanit', 'Inter', 'Ubuntu', 'sans-serif'],
        primary: ['Roboto', 'Inter', 'Ubuntu', 'sans-serif'],
        ubuntu: ['Ubuntu', 'Roboto', 'Inter', 'sans-serif'],
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
    .resize(scale().width(1653))
    .quality(quality)
    .format('webp')
    .toURL();
}
