import imac from "../assets/imac-hero.jpg";
import iphone14 from "../assets/iphone-14.jpg";
import watchSeries8 from "../assets/watch-series-8.jpg";
import homepod from "../assets/homepod.jpg";
import ipad from "../assets/ipad.svg";

// Note: photos are reused across SKUs/colors since this project only ships one
// hero shot per product line locally (no per-color photography). The `colors`
// swatches communicate the real color options via name + swatch, without
// claiming the photo itself changes per color.

const imacColors = [
  { name: "Silver", hex: "#e3e4e5" },
  { name: "Blue", hex: "#6f87a0" },
  { name: "Green", hex: "#a0c7a4" },
  { name: "Pink", hex: "#e8b4be" },
  { name: "Orange", hex: "#e0844f" },
  { name: "Yellow", hex: "#f5d76e" },
  { name: "Purple", hex: "#8b7ca6" },
];

const iPadColors = [
  { name: "Blue", hex: "#7ba7cc" },
  { name: "Pink", hex: "#e8b4c8" },
  { name: "Yellow", hex: "#f0d264" },
  { name: "Silver", hex: "#e3e4e5" },
];

const iPadProColors = [
  { name: "Space Black", hex: "#3a3a3c" },
  { name: "Silver", hex: "#e3e4e5" },
];

export const products = [
  // Mac
  {
    title: "iMac 8-Core GPU",
    subtitle: "Impressively big. Impossibly thin.",
    price: 1299,
    category: "Mac",
    image: imac,
    colors: imacColors,
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
    image: imac,
    colors: imacColors,
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
    image: iphone14,
    colors: [
      { name: "Black", hex: "#3a3a3c" },
      { name: "White", hex: "#f5f5f0" },
      { name: "Sage", hex: "#a8b79b" },
      { name: "Mist Blue", hex: "#aec4d1" },
      { name: "Lavender", hex: "#c9c0de" },
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
    image: iphone14,
    colors: [
      { name: "Space Black", hex: "#2e2e30" },
      { name: "Cloud White", hex: "#f2f1ec" },
      { name: "Light Gold", hex: "#e7d9be" },
      { name: "Sky Blue", hex: "#b9d3e0" },
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
    image: iphone14,
    colors: [
      { name: "Silver", hex: "#e4e4e6" },
      { name: "Cosmic Orange", hex: "#c1611b" },
      { name: "Deep Blue", hex: "#2b3a55" },
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
    image: iphone14,
    colors: [
      { name: "Silver", hex: "#e4e4e6" },
      { name: "Cosmic Orange", hex: "#c1611b" },
      { name: "Deep Blue", hex: "#2b3a55" },
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
    image: ipad,
    colors: iPadColors,
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
    image: ipad,
    colors: [
      { name: "Space Gray", hex: "#6e6d71" },
      { name: "Blue", hex: "#7c9cbf" },
      { name: "Purple", hex: "#b7a8c9" },
      { name: "Starlight", hex: "#f0ead6" },
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
    image: ipad,
    colors: iPadProColors,
    info: [
      "Tandem OLED Ultra Retina XDR display",
      "M4 chip",
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
    image: ipad,
    colors: [
      { name: "Space Gray", hex: "#6e6d71" },
      { name: "Blue", hex: "#7c9cbf" },
      { name: "Purple", hex: "#b7a8c9" },
      { name: "Starlight", hex: "#f0ead6" },
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
    title: "Apple Watch Series 10",
    subtitle: "A whole new thin.",
    price: 399,
    category: "Watch",
    image: watchSeries8,
    colors: [
      { name: "Jet Black", hex: "#2b2b2e" },
      { name: "Rose Gold", hex: "#ddb9ae" },
      { name: "Silver", hex: "#e3e4e5" },
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
    title: "Apple Watch Ultra 2",
    subtitle: "The most rugged and capable Apple Watch.",
    price: 799,
    category: "Watch",
    image: watchSeries8,
    colors: [
      { name: "Natural Titanium", hex: "#b9b3a8" },
      { name: "Black Titanium", hex: "#2b2b2e" },
    ],
    info: [
      "49mm titanium case",
      "Brightest Apple display ever, up to 3000 nits",
      "S10 chip with precision dual-frequency GPS",
      "Up to 36-hour battery life",
      "Water resistance to 100 meters",
    ],
  },
  {
    title: "Apple Watch SE",
    subtitle: "A great deal to love.",
    price: 249,
    category: "Watch",
    image: watchSeries8,
    colors: [
      { name: "Midnight", hex: "#2b2b2e" },
      { name: "Starlight", hex: "#f0ead6" },
      { name: "Silver", hex: "#e3e4e5" },
    ],
    info: [
      "Retina display",
      "S8 chip",
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
    image: homepod,
    colors: [
      { name: "Midnight", hex: "#2b2b2e" },
      { name: "White", hex: "#f5f5f0" },
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
    image: homepod,
    colors: [
      { name: "Space Gray", hex: "#6e6d71" },
      { name: "White", hex: "#f5f5f0" },
      { name: "Blue", hex: "#6f94b3" },
      { name: "Yellow", hex: "#e8c468" },
      { name: "Orange", hex: "#d97a4d" },
    ],
    info: [
      "360º audio",
      "Intercom around the house",
      "Temperature and humidity sensor",
      "Thread border router built in",
    ],
  },
];
