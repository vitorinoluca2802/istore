import imac from "../assets/imac-hero.jpg";
import iphone14 from "../assets/iphone-14.jpg";
import watchSeries8 from "../assets/watch-series-8.jpg";
import homepod from "../assets/homepod.jpg";

export const products = [
  {
    title: "iMac",
    subtitle: "Impressively big. Impossibly thin.",
    price: 1299,
    category: "Mac",
    image: imac,
    info: [
      "24-inch 4.5K Retina display",
      "Apple M3 chip with 8-core CPU",
      "1080p FaceTime HD camera",
      "Six-speaker sound system",
    ],
  },
  {
    title: "iPhone 14",
    subtitle: "Big and bigger.",
    price: 799,
    category: "iPhone",
    image: iphone14,
    info: [
      "6.1-inch Super Retina XDR display",
      "A15 Bionic chip",
      "Advanced dual-camera system",
      "All-day battery life",
    ],
  },
  {
    title: "iPhone 14 Pro",
    subtitle: "A total powerhouse.",
    price: 999,
    category: "iPhone",
    image: iphone14,
    info: [
      "Dynamic Island",
      "48MP Main camera with quad-pixel sensor",
      "Always-On display",
      "A16 Bionic chip",
    ],
  },
  {
    title: "Apple Watch Series 8",
    subtitle: "Redesigned. Redefined.",
    price: 399,
    category: "Watch",
    image: watchSeries8,
    info: [
      "Advanced health sensors",
      "Crash Detection",
      "Always-On Retina display",
      "18-hour battery life",
    ],
  },
  {
    title: "Apple Watch SE",
    subtitle: "A great deal to love.",
    price: 249,
    category: "Watch",
    image: watchSeries8,
    info: [
      "Retina display",
      "Crash Detection",
      "Fall Detection",
      "Up to 18 hours of battery life",
    ],
  },
  {
    title: "HomePod - Midnight",
    subtitle: "Room-filling sound.",
    price: 299,
    category: "accessories",
    image: homepod,
    info: [
      "360º high-fidelity audio",
      "Spatial awareness technology",
      "Hands-free Siri control",
      "Intercom and Handoff",
    ],
  },
  {
    title: "HomePod mini",
    subtitle: "Big sound. Tiny package.",
    price: 99,
    category: "accessories",
    image: homepod,
    info: [
      "360º audio",
      "Intercom around the house",
      "Temperature and humidity sensor",
      "Thread border router built in",
    ],
  },
];
