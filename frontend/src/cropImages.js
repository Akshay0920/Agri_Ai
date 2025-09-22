// frontend/src/cropImages.js
import riceImage from './assets/images/rice.jpg';
import maizeImage from './assets/images/maize.jpg';
import coffeeImage from './assets/images/coffee.jpg';
import chickpeaImage from './assets/images/chickpea.jpg';
import mungbeanImage from './assets/images/mungbean.jpg';
import pomegranateImage from './assets/images/pomegranate.jpg';
import bananaImage from './assets/images/banana.jpg';
import mangoImage from './assets/images/mango.jpg';
import grapesImage from './assets/images/grapes.jpg';
import watermelonImage from './assets/images/watermelon.jpg';
import muskmelonImage from './assets/images/muskmelon.jpg';
import appleImage from './assets/images/apple.jpg';
import orangeImage from './assets/images/orange.jpg';
import papayaImage from './assets/images/papaya.jpg';
import coconutImage from './assets/images/coconut.jpg';
import cottonImage from './assets/images/cotton.jpg';   
import juteImage from './assets/images/jute.jpg';
import lentilImage from './assets/images/lentil.jpg';
import blackgramImage from './assets/images/blackgram.jpg';
import kidneybeansImage from './assets/images/kidneybeans.jpg';
import pigeonpeasImage from './assets/images/pigeonpeas.jpg';
import mothbeansImage from './assets/images/mothbeans.jpg';     

const cropImages = {
  rice: riceImage,
  maize: maizeImage,
  chickpea: chickpeaImage,
  kidneybeans: kidneybeansImage,
  pigeonpeas: pigeonpeasImage,
  mothbeans: mothbeansImage, // Using a reliable Imgur link as a fallback
  mungbean: mungbeanImage, // Similar to chickpea
  blackgram: blackgramImage, // Similar to kidneybeans
  lentil: lentilImage, // Similar to mungbean
  pomegranate: pomegranateImage,
  banana: bananaImage,
  mango: mangoImage,
  grapes: grapesImage,
  watermelon: watermelonImage,
  muskmelon: muskmelonImage,
  apple: appleImage,
  orange: orangeImage,
  papaya: papayaImage,
  coconut: coconutImage,
  cotton: cottonImage,
  jute: juteImage, // Natural fiber texture
  coffee: coffeeImage,
  default: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1974' // A default image
};

export default cropImages;