import imacFallback from "../assets/imac-hero.jpg";
import iphoneFallback from "../assets/iphone-14.jpg";
import watchFallback from "../assets/watch-series-8.jpg";
import homepodFallback from "../assets/homepod.jpg";
import ipadFallback from "../assets/ipad.svg";

// Product photos are loaded straight from the AppleDB device-image service
// (https://github.com/littlebyteorg/apple-device-images), one real photo per
// color: https://img.appledb.dev/device@<size>/<imageKey>/<colorName>.png
// `imageKey` is *not* always the same as the device's own identifier (e.g.
// the current iPad/iPad Air/iPad Pro re-use an older, visually identical
// sibling's render) — always take it from AppleDB's device JSON, never guess
// it from the marketing identifier.
const APPLEDB_IMAGE_BASE = "https://img.appledb.dev/device@256";

export const deviceImageUrl = (imageKey, colorName) =>
  `${APPLEDB_IMAGE_BASE}/${imageKey}/${colorName.replace(/\s+/g, "%20")}.png`;

// Local fallback photo shown via <img onError> if the AppleDB service is
// unreachable from the visitor's browser.
export const categoryFallbackImage = {
  Mac: imacFallback,
  iPhone: iphoneFallback,
  Watch: watchFallback,
  accessories: homepodFallback,
  iPad: ipadFallback,
};

export const products = [
  // Mac
  {
    title: "iMac 8-Core GPU",
    subtitle: "Impressively big. Impossibly thin.",
    price: 1299,
    category: "Mac",
    imageKey: "Mac16,2",
    colors: [
      { name: "Blue", hex: "#4f78a7" },
      { name: "Green", hex: "#3a8b57" },
      { name: "Orange", hex: "#dd6a45" },
      { name: "Pink", hex: "#da5d7d" },
      { name: "Purple", hex: "#7c78ab" },
      { name: "Silver", hex: "#c5c6c9" },
      { name: "Yellow", hex: "#e6c73b" },
    ],
    info: [
      "Apple M4 chip with 8-core CPU and 8-core GPU",
      "24-inch 4.5K Retina display (4480 x 2520)",
      "12MP Center Stage camera with Desk View",
      "Six-speaker sound system with spatial audio",
      "Two Thunderbolt / USB 4 ports",
      "16GB unified memory, up to 2TB storage",
    ],
  },
  {
    title: "iMac 10-Core GPU",
    subtitle: "Even more powerhouse.",
    price: 1499,
    category: "Mac",
    imageKey: "Mac16,3",
    colors: [
      { name: "Blue", hex: "#4f78a7" },
      { name: "Green", hex: "#3a8b57" },
      { name: "Orange", hex: "#dd6a45" },
      { name: "Pink", hex: "#da5d7d" },
      { name: "Purple", hex: "#7c78ab" },
      { name: "Silver", hex: "#c5c6c9" },
      { name: "Yellow", hex: "#e6c73b" },
    ],
    info: [
      "Apple M4 chip with 8-core CPU and 10-core GPU",
      "24-inch 4.5K Retina display (4480 x 2520)",
      "12MP Center Stage camera with Desk View",
      "Magic Keyboard with Touch ID",
      "Two Thunderbolt / USB 4 ports plus two USB 3 ports",
      "16GB unified memory, up to 2TB storage",
    ],
  },
  // iPhone
  {
    title: "iPhone 17",
    subtitle: "Bigger, brighter, tougher.",
    price: 799,
    category: "iPhone",
    imageKey: "iPhone18,3",
    colors: [
      { name: "Black", hex: "#464747" },
      { name: "Lavender", hex: "#e7d7f2" },
      { name: "Mist Blue", hex: "#a6bddd" },
      { name: "Sage", hex: "#bac79c" },
      { name: "White", hex: "#f7f7f5" },
    ],
    info: [
      "6.3-inch Super Retina XDR display with ProMotion",
      "A19 chip",
      "48MP Fusion main camera, 12MP Ultra Wide",
      "18MP Center Stage front camera",
      "Ceramic Shield 2, front and back",
      "All-day battery life",
    ],
  },
  {
    title: "iPhone Air",
    subtitle: "The thinnest iPhone ever.",
    price: 999,
    category: "iPhone",
    imageKey: "iPhone18,4",
    colors: [
      { name: "Space Black", hex: "#0e0e0e" },
      { name: "Cloud White", hex: "#fcfcfc" },
      { name: "Light Gold", hex: "#faf2e5" },
      { name: "Sky Blue", hex: "#e5f2fa" },
    ],
    info: [
      "5.6mm thin, titanium unibody",
      "6.5-inch Super Retina XDR display with ProMotion",
      "A19 Pro chip",
      "48MP Fusion camera",
      "eSIM only, no physical SIM tray",
    ],
  },
  {
    title: "iPhone 17 Pro",
    subtitle: "A total powerhouse.",
    price: 1099,
    category: "iPhone",
    imageKey: "iPhone18,1",
    colors: [
      { name: "Silver", hex: "#e7e7e7" },
      { name: "Cosmic Orange", hex: "#f8833e" },
      { name: "Deep Blue", hex: "#4a5680" },
    ],
    info: [
      "6.3-inch Super Retina XDR display with ProMotion",
      "A19 Pro chip with vapor chamber cooling",
      "48MP Fusion triple-camera system",
      "8x optical-quality zoom",
      "Aerospace-grade aluminum unibody",
    ],
  },
  {
    title: "iPhone 17 Pro Max",
    subtitle: "Bigger. And also a total powerhouse.",
    price: 1199,
    category: "iPhone",
    imageKey: "iPhone18,2",
    colors: [
      { name: "Silver", hex: "#e7e7e7" },
      { name: "Cosmic Orange", hex: "#f8833e" },
      { name: "Deep Blue", hex: "#4a5680" },
    ],
    info: [
      "6.9-inch Super Retina XDR display with ProMotion",
      "A19 Pro chip with vapor chamber cooling",
      "48MP Fusion triple-camera system",
      "8x optical-quality zoom",
      "Longest battery life ever in an iPhone",
    ],
  },
  // iPad
  {
    title: "iPad",
    subtitle: "Colorful. Capable. Affordable.",
    price: 349,
    category: "iPad",
    imageKey: "iPad13,18",
    colors: [
      { name: "Blue", hex: "#627e9c" },
      { name: "Pink", hex: "#be4d5f" },
      { name: "Silver", hex: "#d0d1d3" },
      { name: "Yellow", hex: "#cdb546" },
    ],
    info: [
      "11-inch Liquid Retina display",
      "A16 chip",
      "12MP back camera, 12MP Center Stage front camera",
      "USB-C connector",
      "Supports Apple Pencil (USB-C) and Apple Pencil Pro",
    ],
  },
  {
    title: "iPad Air",
    subtitle: "Serious performance in a thin design.",
    price: 599,
    category: "iPad",
    imageKey: "iPad14,8",
    colors: [
      { name: "Blue", hex: "#aac0c1" },
      { name: "Purple", hex: "#c4bdc9" },
      { name: "Space Gray", hex: "#515052" },
      { name: "Starlight", hex: "#c2bbb1" },
    ],
    info: [
      "11-inch or 13-inch Liquid Retina display",
      "M3 chip",
      "12MP back camera, 12MP Center Stage front camera",
      "Landscape stereo speakers",
      "Supports Apple Pencil Pro",
    ],
  },
  {
    title: "iPad Pro",
    subtitle: "Unbelievably thin. Unbelievably powerful.",
    price: 999,
    category: "iPad",
    imageKey: "iPad16,3",
    colors: [
      { name: "Silver", hex: "#bebfc0" },
      { name: "Space Black", hex: "#262326" },
    ],
    info: [
      "Tandem OLED Ultra Retina XDR display",
      "M5 chip",
      "Thinnest Apple product ever, at 5.1mm",
      "Adaptive True Tone flash",
      "Thunderbolt / USB 4",
    ],
  },
  {
    title: "iPad mini",
    subtitle: "Mega power. Mini size.",
    price: 499,
    category: "iPad",
    imageKey: "iPad16,1",
    colors: [
      { name: "Blue", hex: "#9fb6b8" },
      { name: "Purple", hex: "#c4bcc8" },
      { name: "Space Gray", hex: "#555456" },
      { name: "Starlight", hex: "#ccc5bc" },
    ],
    info: [
      "8.3-inch Liquid Retina display",
      "A17 Pro chip",
      "12MP back camera, 12MP Center Stage front camera",
      "5G capable",
      "Supports Apple Pencil Pro",
    ],
  },
  // Watch
  {
    title: "Apple Watch Series 11",
    subtitle: "A whole new thin.",
    price: 399,
    category: "Watch",
    imageKey: "Watch7,17",
    colors: [
      { name: "Jet Black", hex: "#0a0a0a" },
      { name: "Rose Gold", hex: "#a58377" },
      { name: "Silver", hex: "#9c9c9e" },
      { name: "Space Gray", hex: "#6c6b69" },
    ],
    info: [
      "Wide-angle OLED display, thinnest Apple Watch yet",
      "S10 chip",
      "Sleep apnea notifications",
      "Water resistance to 50 meters",
      "Up to 18-hour battery life",
    ],
  },
  {
    title: "Apple Watch Ultra 3",
    subtitle: "The most rugged and capable Apple Watch.",
    price: 799,
    category: "Watch",
    imageKey: "Watch7,12",
    colors: [
      { name: "Titanium - Natural", hex: "#a7a29c" },
      { name: "Titanium - Black", hex: "#4e4949" },
    ],
    info: [
      "49mm titanium case",
      "Brightest Apple display ever, up to 3000 nits",
      "Satellite connectivity",
      "Up to 42-hour battery life",
      "Water resistance to 100 meters",
    ],
  },
  {
    title: "Apple Watch SE 3",
    subtitle: "A great deal to love.",
    price: 249,
    category: "Watch",
    imageKey: "Watch7,13",
    colors: [
      { name: "Midnight", hex: "#161b21" },
      { name: "Starlight", hex: "#a1948c" },
    ],
    info: [
      "Retina display",
      "S10 chip",
      "Crash Detection and Fall Detection",
      "Up to 18-hour battery life",
    ],
  },
  // Accessories
  {
    title: "HomePod",
    subtitle: "Room-filling sound.",
    price: 299,
    category: "accessories",
    imageKey: "AudioAccessory6,1",
    colors: [
      { name: "Midnight", hex: "#232629" },
      { name: "White", hex: "#d7d8da" },
    ],
    info: [
      "360º high-fidelity audio",
      "Spatial awareness technology",
      "Hands-free Siri control",
      "Intercom and Handoff",
      "Temperature and humidity sensor",
    ],
  },
  {
    title: "HomePod mini",
    subtitle: "Big sound. Tiny package.",
    price: 99,
    category: "accessories",
    imageKey: "AudioAccessory5,1",
    colors: [
      { name: "Midnight", hex: "#404145" },
      { name: "Space Gray", hex: "#3d4042" },
      { name: "White", hex: "#e6e6e8" },
      { name: "Blue", hex: "#274b61" },
      { name: "Yellow", hex: "#eaa626" },
      { name: "Orange", hex: "#eb6d49" },
    ],
    info: [
      "360º audio",
      "Intercom around the house",
      "Temperature and humidity sensor",
      "Thread border router built in",
    ],
  },
];
