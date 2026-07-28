/**
 * Placeholder tiles for Indian trekking states/regions we haven't researched
 * or built out yet. These render as simple "coming soon" cards on the trails
 * index — no individual treks, just a marker that the region is on the roadmap.
 * A state graduates out of this list once it has real trek records in
 * _data/trails/ (Maharashtra, Himachal Pradesh, and Uttarakhand already have).
 */
module.exports = () => [
  {
    id: "jammu-kashmir-ladakh",
    name: "Jammu & Kashmir / Ladakh",
    blurb: "Markha Valley, Kashmir Great Lakes, and the trans-Himalayan Ladakh circuits.",
  },
  {
    id: "sikkim",
    name: "Sikkim",
    blurb: "Goecha La and the Kanchenjunga base treks — India's other 8,000m massif.",
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    blurb: "Sandakphu–Phalut — the Singalila ridge with four-8,000er views.",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    blurb: "Western Ghats peak treks — Kudremukh, Kumara Parvatha, and the Coorg hills.",
  },
  {
    id: "kerala",
    name: "Kerala",
    blurb: "Western Ghats rainforest and grassland treks around Munnar and Wayanad.",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    blurb: "Nilgiri and Palani hill treks in the Western Ghats' southern reach.",
  },
];
