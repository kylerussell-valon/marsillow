import React, { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Calculator,
  Camera,
  ChevronDown,
  EyeOff,
  Globe2,
  Hammer,
  Heart,
  Home as HomeIcon,
  Info,
  Map as MapIcon,
  MapPin,
  Menu,
  MoreHorizontal,
  Ruler,
  Search,
  Share2,
  TrendingUp,
  Trees,
} from "lucide-react";
import * as THREE from "three";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const listings = [
  {
    id: "jez-delta-01",
    title: "Jezero Delta Terraces",
    region: "Jezero Crater, Mars",
    address: "Octavia E. Butler Landing · 18.44°N, 77.45°E",
    propertyType: "Lakebed parcel",
    badge: "Showcase",
    lat: 18.4446,
    lon: 77.4509,
    elevation: -2550,
    acres: 38.4,
    habPads: 6,
    recyclerSuites: 4,
    price: 18400000,
    marsestimate: 19250000,
    daysListed: 12,
    yearSurveyed: 2021,
    score: 96,
    rover: "Perseverance",
    listingAgent: "PERSEVERANCE PROPERTIES",
    image:
      "https://images-assets.nasa.gov/image/PIA24485/PIA24485~small.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA24485/PIA24485~small.jpg",
      "https://images-assets.nasa.gov/image/PIA24487/PIA24487~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA24264/PIA24264~medium.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech/ASU/MSSS",
    source:
      "https://mars.nasa.gov/mars2020/mission/where-is-the-rover/",
    tags: ["Delta", "Sample cache", "Lakebed", "Prime science"],
    description:
      "A premium block along Jezero's western fan, priced for a terraformed future where preserved delta strata, shallow basin water access, and Perseverance sample-cache adjacency create durable civic and scientific scarcity.",
    highlights: [
      "Premium delta frontage with sweeping fan-deposit views",
      "Crater walls shield the parcel from regional dust storms on three sides",
      "Five-minute walk to Perseverance's sample-cache district",
      "Top-decile equatorial daylight and southern-aspect solar yield",
      "Pre-graded hab pads and direct rover-route access",
    ],
    nearby: [
      { name: "Octavia E. Butler Landing", distance: "0.4 km" },
      { name: "Perseverance sample cache depot", distance: "1.2 km" },
      { name: "Jezero crater rim trailhead", distance: "6.8 km" },
      { name: "Future Jezero spaceport (planned)", distance: "22 km" },
    ],
    environment: {
      daylight: "Equatorial — long, even sols year-round",
      temperature: "Avg surface −63°C · habitat conditioned to +18°C",
      pressure: "8.3 mbar · 3rd-percentile basin advantage",
      dust: "Low — sheltered by 600 m crater walls",
      wind: "Calm. Gusts < 18 m/s in dust season",
    },
    amenities: [
      "Future Jezero Heritage District (proposed)",
      "Direct fiber tap to Mars Relay backbone",
      "Crater-shielded dust-storm safe haven",
      "Pre-routed slurry water lines to delta tap point",
    ],
    settlementScore: {
      overall: 96,
      water: 95,
      daylight: 92,
      pressure: 88,
      scenery: 99,
      terraformReady: 90,
    },
    priceHistory: [
      { date: "Mar 14, 2026", event: "Listed for sale", price: 18400000 },
      { date: "Sep 02, 2024", event: "Pre-listing comp", price: 16200000 },
      { date: "Feb 18, 2021", event: "Heritage benchmark set", price: 9100000 },
    ],
  },
  {
    id: "gale-sharp-02",
    title: "Aeolis Palisades at Mount Sharp",
    region: "Gale Crater, Mars",
    address: "Bradbury Landing · 4.59°S, 137.44°E",
    propertyType: "Mountain-base parcel",
    badge: "Open: Sol 2:30 – 4:30pm",
    lat: -4.5895,
    lon: 137.4417,
    elevation: -4500,
    acres: 52.8,
    habPads: 8,
    recyclerSuites: 5,
    price: 15100000,
    marsestimate: 14820000,
    daysListed: 21,
    yearSurveyed: 2012,
    score: 91,
    rover: "Curiosity",
    listingAgent: "BRADBURY GROUP REALTY",
    image:
      "https://images-assets.nasa.gov/image/PIA16104/PIA16104~medium.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA16104/PIA16104~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA16032/PIA16032~small.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech/MSSS",
    source: "https://mars.nasa.gov/msl/mission/where-is-the-rover/",
    tags: ["Layered terrain", "Crater basin", "Long traverse", "Protected views"],
    description:
      "A view-forward basin parcel at the base of Aeolis Mons, valued for terraced geology, strong navigation precedent from Curiosity, and the long-term importance of Gale's deep lowland microclimate.",
    highlights: [
      "Cliffside parcel with the largest sedimentary view on Mars",
      "Lowest pressure of any rover-validated site on the planet",
      "Direct trailhead to Curiosity's twelve-year sample corridor",
      "South-facing slope with all-sol passive solar gain",
      "Drilled basalt foundations approved by orbital survey",
    ],
    nearby: [
      { name: "Bradbury Landing", distance: "0.2 km" },
      { name: "Yellowknife Bay archive", distance: "1.4 km" },
      { name: "Mount Sharp ridge access", distance: "5.1 km" },
      { name: "Future Aeolis Loop transit", distance: "31 km" },
    ],
    environment: {
      daylight: "Tropical — even sols, mild axial tilt effect",
      temperature: "Avg surface −65°C · habitat conditioned to +18°C",
      pressure: "11.5 mbar · top 1% of all Mars sites",
      dust: "Low–moderate · benefits from crater-floor shelter",
      wind: "Light overnight downslope drainage flows",
    },
    amenities: [
      "Sedimentary archive overlook (private)",
      "Roverway 1 trail stop within 200 m",
      "Direct relay link to Aeolis Mons science station",
      "Reserved easement to future ridge tram",
    ],
    settlementScore: {
      overall: 91,
      water: 80,
      daylight: 90,
      pressure: 99,
      scenery: 96,
      terraformReady: 86,
    },
    priceHistory: [
      { date: "Apr 11, 2026", event: "Listed for sale", price: 15100000 },
      { date: "Jan 22, 2025", event: "Pre-listing comp", price: 14200000 },
      { date: "Aug 06, 2012", event: "Heritage benchmark set", price: 7400000 },
    ],
  },
  {
    id: "meridiani-03",
    title: "Meridiani Blueberry Flats",
    region: "Meridiani Planum, Mars",
    address: "Eagle Crater · 1.95°S, 354.47°E",
    propertyType: "Equatorial plain",
    badge: "Heritage corridor",
    lat: -1.9462,
    lon: 354.4734,
    elevation: -1400,
    acres: 84.2,
    habPads: 4,
    recyclerSuites: 3,
    price: 12900000,
    marsestimate: 12450000,
    daysListed: 7,
    yearSurveyed: 2004,
    score: 87,
    rover: "Opportunity",
    listingAgent: "OPPORTUNITY HOLDINGS",
    image:
      "https://images-assets.nasa.gov/image/PIA05273/PIA05273~small.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA05273/PIA05273~small.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech/Cornell Univ./Arizona State Univ.",
    source: "https://mars.nasa.gov/mer/mission/rover-status/opportunity/",
    tags: ["Equatorial", "Heritage route", "Flat build", "Hematite"],
    description:
      "A broad equatorial tract along Opportunity's historic traverse, carrying logistics value from flat constructability and cultural value from one of the most important surface exploration routes in planetary history.",
    highlights: [
      "Wide flat tract — minimal grading, maximum constructable area",
      "On the Opportunity heritage promenade — built-in cultural value",
      "Hematite-rich substrate ideal for in-situ resource yields",
      "Equatorial daylight: longest growing window outside the basins",
      "Frontage on the future Endeavour ring road",
    ],
    nearby: [
      { name: "Eagle Crater monument", distance: "0.5 km" },
      { name: "Endurance Crater overlook", distance: "8.0 km" },
      { name: "Victoria Crater visitor zone", distance: "12.4 km" },
      { name: "Endeavour rim district", distance: "21.6 km" },
    ],
    environment: {
      daylight: "Equatorial — among the longest sols on Mars",
      temperature: "Avg surface −60°C · habitat conditioned to +18°C",
      pressure: "9.6 mbar · gentle plain at ideal cargo elevation",
      dust: "Moderate · classic blueberry-fine regolith",
      wind: "Steady afternoon dust devils, easy to forecast",
    },
    amenities: [
      "Heritage promenade pedestrian easement",
      "Pre-graded settlement-grid access points",
      "Future hematite refinery zone within 14 km",
      "ISRU water electrolyzer hookup ready",
    ],
    settlementScore: {
      overall: 87,
      water: 70,
      daylight: 95,
      pressure: 84,
      scenery: 78,
      terraformReady: 88,
    },
    priceHistory: [
      { date: "Apr 25, 2026", event: "Listed for sale", price: 12900000 },
      { date: "May 02, 2024", event: "Pre-listing comp", price: 11800000 },
      { date: "Jan 25, 2004", event: "Heritage benchmark set", price: 5200000 },
    ],
  },
  {
    id: "gusev-04",
    title: "Columbia Hills Preserve",
    region: "Gusev Crater, Mars",
    address: "Columbia Memorial Station · 14.57°S, 175.47°E",
    propertyType: "Volcanic highland",
    badge: "Volcanic outcrops",
    lat: -14.5684,
    lon: 175.4726,
    elevation: -1900,
    acres: 67.5,
    habPads: 4,
    recyclerSuites: 3,
    price: 9400000,
    marsestimate: 9620000,
    daysListed: 33,
    yearSurveyed: 2004,
    score: 82,
    rover: "Spirit",
    listingAgent: "SPIRIT HILLS REALTY",
    image:
      "https://images-assets.nasa.gov/image/PIA06960/PIA06960~medium.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA06960/PIA06960~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA08813/PIA08813~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA09467/PIA09467~medium.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech/Cornell",
    source: "https://mars.nasa.gov/mer/mission/rover-status/spirit/",
    tags: ["Columbia Hills", "Volcanic", "Historic", "Southern tropics"],
    description:
      "A protected district in the Columbia Hills influence zone, priced below Jezero and Gale because of lower basin-water upside, but supported by volcanic diversity and Spirit mission heritage.",
    highlights: [
      "Volcanic outcrops minutes from your front airlock",
      "Gentle southern-tropics light angle for design-forward habitats",
      "Spirit-era heritage corridor — protected viewshed",
      "Diverse mineralogy: jarosite, basalts, carbonates",
      "Quiet, low-traffic district off the main rover routes",
    ],
    nearby: [
      { name: "Columbia Memorial Station", distance: "0.3 km" },
      { name: "Home Plate volcanic feature", distance: "2.1 km" },
      { name: "Husband Hill summit", distance: "3.6 km" },
      { name: "Future Gusev geothermal pilot", distance: "9.0 km" },
    ],
    environment: {
      daylight: "Southern tropics — strong summer sols",
      temperature: "Avg surface −58°C · habitat conditioned to +18°C",
      pressure: "9.0 mbar · steady mid-elevation plain",
      dust: "Moderate · seasonal devils common",
      wind: "Gentle thermal gradients — mild exposure",
    },
    amenities: [
      "Columbia Hills protected viewshed",
      "Future geothermal pilot tap-in option",
      "Volcanic-glass quarry rights included",
      "Pre-laid Spirit memorial walkway",
    ],
    settlementScore: {
      overall: 82,
      water: 60,
      daylight: 86,
      pressure: 80,
      scenery: 90,
      terraformReady: 78,
    },
    priceHistory: [
      { date: "Mar 30, 2026", event: "Listed for sale", price: 9400000 },
      { date: "Nov 02, 2024", event: "Pre-listing comp", price: 8950000 },
      { date: "Jan 04, 2004", event: "Heritage benchmark set", price: 3200000 },
    ],
  },
  {
    id: "elysium-05",
    title: "Elysium Quiet Basin",
    region: "Elysium Planitia, Mars",
    address: "InSight Static Station · 4.50°N, 135.62°E",
    propertyType: "Lowland basin",
    badge: "New construction",
    lat: 4.5024,
    lon: 135.6234,
    elevation: -2600,
    acres: 120,
    habPads: 12,
    recyclerSuites: 8,
    price: 8700000,
    marsestimate: 9180000,
    daysListed: 18,
    yearSurveyed: 2018,
    score: 78,
    rover: "InSight lander",
    listingAgent: "INSIGHT LAND TRUST",
    image:
      "https://images-assets.nasa.gov/image/PIA22232/PIA22232~medium.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA22232/PIA22232~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA22236/PIA22236~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA22744/PIA22744~medium.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech",
    source: "https://mars.nasa.gov/insight/mission/where-is-the-lander/",
    tags: ["Lowland", "Smooth terrain", "Seismic", "Infrastructure"],
    description:
      "A large, buildable lowland tract around the InSight setting, valued less for scenery and more for early infrastructure suitability, pressure advantage, and settlement operations.",
    highlights: [
      "Largest buildable lowland tract on the active market",
      "InSight seismic baseline — built on the most-studied subsurface on Mars",
      "Pressure-advantaged basin perfect for early greenhouse build-outs",
      "Approved for up to twelve hab pads under the planned settlement code",
      "Dedicated industrial easement for staging yards",
    ],
    nearby: [
      { name: "InSight Static Station", distance: "0.1 km" },
      { name: "Cerberus Fossae fissure overlook", distance: "11.8 km" },
      { name: "Elysium Mons base camp (planned)", distance: "320 km" },
      { name: "Future Elysium Logistics Park", distance: "3.4 km" },
    ],
    environment: {
      daylight: "Tropical — mild seasonal swings",
      temperature: "Avg surface −60°C · habitat conditioned to +18°C",
      pressure: "8.8 mbar · pressure-favored lowland",
      dust: "Low · open plain, no katabatic basin trap",
      wind: "Mild · ideal for lightweight inflatable structures",
    },
    amenities: [
      "Pre-graded 12-pad settlement layout",
      "Dedicated industrial easement (5 ha)",
      "Direct trunk to InSight seismic data link",
      "Reserved capacity in the planned Elysium Logistics Park",
    ],
    settlementScore: {
      overall: 78,
      water: 65,
      daylight: 88,
      pressure: 92,
      scenery: 60,
      terraformReady: 82,
    },
    priceHistory: [
      { date: "Apr 14, 2026", event: "Listed for sale", price: 8700000 },
      { date: "Jul 19, 2025", event: "Pre-listing comp", price: 8150000 },
      { date: "Nov 26, 2018", event: "Heritage benchmark set", price: 3000000 },
    ],
  },
  {
    id: "utopia-06",
    title: "Utopia Ice Rights",
    region: "Utopia Planitia, Mars",
    address: "Viking 2 Heritage Zone · 48.27°N, 134.00°E",
    propertyType: "Northern lowland",
    badge: "Ice rights included",
    lat: 48.269,
    lon: 134.0,
    elevation: -4100,
    acres: 210,
    habPads: 10,
    recyclerSuites: 6,
    price: 11200000,
    marsestimate: 11650000,
    daysListed: 9,
    yearSurveyed: 1976,
    score: 84,
    rover: "Zhurong / Viking 2",
    listingAgent: "NORTHERN BASIN LLC",
    image:
      "https://images-assets.nasa.gov/image/PIA17633/PIA17633~medium.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA17633/PIA17633~medium.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech/Univ. of Arizona",
    source:
      "https://science.nasa.gov/photojournal/utopia-planitias-surface/",
    tags: ["Ice potential", "Northern lowland", "Agriculture", "Large tract"],
    description:
      "A northern-basin land bank where future terraforming converts low elevation and near-surface volatile potential into agricultural and water-rights value. Higher latitude tempers near-term demand but boosts long-duration utility.",
    highlights: [
      "Subsurface ice rights conveyed with the parcel",
      "Long northern summer — extended growing window",
      "210-acre tract suitable for greenhouse-scale farming",
      "Patterned-ground subsurface confirmed by HiRISE imaging",
      "Future polar logistics corridor frontage",
    ],
    nearby: [
      { name: "Viking 2 heritage marker", distance: "0.6 km" },
      { name: "Patterned-ground research site", distance: "4.3 km" },
      { name: "Future Utopia Reservoir tap", distance: "12.0 km" },
      { name: "Mars Polar Logistics Hub (planned)", distance: "640 km" },
    ],
    environment: {
      daylight: "Northern mid-latitude — long summer sols, polar nights in winter",
      temperature: "Avg surface −78°C · habitat conditioned to +18°C",
      pressure: "9.4 mbar · favorable for greenhouse pressurization",
      dust: "Low–moderate · annual polar-cap recession effects",
      wind: "Cyclic thermal flows · ideal for wind-power yields",
    },
    amenities: [
      "Subsurface ice (water-rights) deed transfer",
      "Pre-permitted 40-ha greenhouse footprint",
      "Cold-chain freight bay reservation",
      "Easement for the planned polar logistics highway",
    ],
    settlementScore: {
      overall: 84,
      water: 99,
      daylight: 70,
      pressure: 88,
      scenery: 72,
      terraformReady: 91,
    },
    priceHistory: [
      { date: "Apr 23, 2026", event: "Listed for sale", price: 11200000 },
      { date: "Oct 14, 2024", event: "Pre-listing comp", price: 10400000 },
      { date: "Sep 03, 1976", event: "Heritage benchmark set", price: 2400000 },
    ],
  },
  {
    id: "valles-07",
    title: "Noctis Canyon Rim",
    region: "Valles Marineris, Mars",
    address: "Noctis Labyrinthus · 7.00°S, 263.00°E",
    propertyType: "Canyon-rim parcel",
    badge: "Canyon view",
    lat: -7.0,
    lon: 263.0,
    elevation: -3200,
    acres: 45.6,
    habPads: 6,
    recyclerSuites: 5,
    price: 16700000,
    marsestimate: 18020000,
    daysListed: 4,
    yearSurveyed: 2018,
    score: 90,
    rover: "Orbital reconnaissance",
    listingAgent: "GRAND CANYON ESTATES",
    image:
      "https://images-assets.nasa.gov/image/PIA00407/PIA00407~medium.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA00407/PIA00407~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA02818/PIA02818~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA00422/PIA00422~medium.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech",
    source:
      "https://science.nasa.gov/resource/valles-marineris-the-grand-canyon-of-mars/",
    tags: ["Canyon rim", "Viewshed", "Scarcity", "Transit"],
    description:
      "A tightly held rim parcel near the western Valles Marineris system, priced for future cultural and tourism demand once atmosphere, water management, and slope stabilization make canyonfront development possible.",
    highlights: [
      "Direct rim frontage on the largest canyon in the solar system",
      "Unmatched view corridor — protected by orbital easement",
      "Adjoining Noctis Labyrinthus mesa network",
      "Future cliffside transit and tourism district",
      "Limited inventory — only 28 rim parcels in the entire western system",
    ],
    nearby: [
      { name: "Noctis Labyrinthus mesa network", distance: "1.2 km" },
      { name: "Tithonium Chasma overlook", distance: "78 km" },
      { name: "Future canyon-rim tram terminus", distance: "5.4 km" },
      { name: "Tharsis bulge access road", distance: "112 km" },
    ],
    environment: {
      daylight: "Equatorial — long sols, dramatic shadow play",
      temperature: "Avg surface −62°C · habitat conditioned to +18°C",
      pressure: "10.1 mbar · canyon-edge advantage",
      dust: "Moderate · canyon updrafts intermittent",
      wind: "Up-canyon thermals · stable engineering envelope",
    },
    amenities: [
      "Reserved easement for cliffside cable car",
      "Protected viewshed with rim-development covenant",
      "Future Valles Marineris National Park adjacency",
      "Direct fiber to Tharsis backbone",
    ],
    settlementScore: {
      overall: 90,
      water: 70,
      daylight: 92,
      pressure: 86,
      scenery: 100,
      terraformReady: 80,
    },
    priceHistory: [
      { date: "Apr 28, 2026", event: "Listed for sale", price: 16700000 },
      { date: "Feb 11, 2025", event: "Pre-listing comp", price: 15800000 },
      { date: "Jan 09, 2010", event: "Heritage benchmark set", price: 6900000 },
    ],
  },
  {
    id: "olympus-08",
    title: "Olympus Aureole Reserve",
    region: "Olympus Mons, Mars",
    address: "Tharsis Plateau · 18.65°N, 226.20°E",
    propertyType: "Volcano aureole",
    badge: "Tharsis tourism zone",
    lat: 18.65,
    lon: 226.2,
    elevation: 21200,
    acres: 95.3,
    habPads: 4,
    recyclerSuites: 3,
    price: 7600000,
    marsestimate: 7050000,
    daysListed: 50,
    yearSurveyed: 2010,
    score: 75,
    rover: "Orbital reconnaissance",
    listingAgent: "AUREOLE HOLDINGS GROUP",
    image:
      "https://images-assets.nasa.gov/image/PIA22581/PIA22581~medium.jpg",
    images: [
      "https://images-assets.nasa.gov/image/PIA22581/PIA22581~medium.jpg",
      "https://images-assets.nasa.gov/image/PIA00216/PIA00216~medium.jpg",
    ],
    imageCredit: "NASA/JPL-Caltech/ASU",
    source:
      "https://science.nasa.gov/resource/olympus-mons-the-largest-volcano-in-the-solar-system/",
    tags: ["Volcano", "Tourism", "High elevation", "Tharsis"],
    description:
      "A marquee-name holding on the Olympus Mons aureole. Visually unmatched, but the price is moderated because very high elevation remains harder to pressurize and terraform than northern and equatorial lowlands.",
    highlights: [
      "Address that sells itself: the largest volcano in the solar system",
      "Aureole bench geology — stable foundations on lava skirts",
      "Sky-deck altitudes for aerosport, gliding, and observatory uses",
      "Tharsis tourism corridor frontage at street level",
      "Marquee parcel for branded resort or research campus development",
    ],
    nearby: [
      { name: "Olympus Mons summit caldera", distance: "240 km" },
      { name: "Pavonis Mons climbing base", distance: "1,180 km" },
      { name: "Future Tharsis Aerosport Park", distance: "62 km" },
      { name: "Tharsis ring road interchange", distance: "8.4 km" },
    ],
    environment: {
      daylight: "Equatorial — high-altitude clarity above most dust",
      temperature: "Avg surface −56°C · habitat conditioned to +18°C",
      pressure: "1.4 mbar · ultra-thin atmosphere · pressurized hab required",
      dust: "Very low · above the regional dust ceiling",
      wind: "Light · orographic uplift mostly over slopes, not aureole",
    },
    amenities: [
      "Aureole rim observation deck",
      "Reserved Tharsis tourism easement",
      "Helipad / VTOL landing pad pre-graded",
      "Direct branding rights for the Olympus Mons district",
    ],
    settlementScore: {
      overall: 75,
      water: 35,
      daylight: 90,
      pressure: 40,
      scenery: 100,
      terraformReady: 60,
    },
    priceHistory: [
      { date: "Mar 12, 2026", event: "Listed for sale", price: 7600000 },
      { date: "Aug 30, 2024", event: "Pre-listing comp", price: 8200000 },
      { date: "Jul 14, 2010", event: "Heritage benchmark set", price: 2900000 },
    ],
  },
];

const roverRoutes = [
  {
    name: "Perseverance",
    color: "#1e7fd9",
    points: [
      [18.4446, 77.4509],
      [18.455, 77.42],
      [18.47, 77.39],
      [18.49, 77.36],
    ],
  },
  {
    name: "Curiosity",
    color: "#e0a800",
    points: [
      [-4.5895, 137.4417],
      [-4.64, 137.39],
      [-4.7, 137.35],
      [-4.78, 137.32],
    ],
  },
  {
    name: "Opportunity",
    color: "#3aa55a",
    points: [
      [-1.9462, 354.4734],
      [-2.0, 354.2],
      [-2.18, 354.0],
      [-2.28, 354.78],
    ],
  },
  {
    name: "Spirit",
    color: "#d2232a",
    points: [
      [-14.5684, 175.4726],
      [-14.61, 175.51],
      [-14.64, 175.54],
      [-14.58, 175.59],
    ],
  },
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortMoney(value) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1000)}K`;
  return formatMoney(value);
}

function estPaymentPerSol(price) {
  // playful "monthly" placeholder, shown as per-sol
  return Math.round((price * 0.0042) / 28);
}

function marsToXY(lat, lon) {
  const normalizedLon = lon > 180 ? lon - 360 : lon;
  return {
    x: ((normalizedLon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

function marsToVector(lat, lon, radius = 2.06) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createMarsTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, "#bb714f");
  base.addColorStop(0.33, "#a95535");
  base.addColorStop(0.66, "#793825");
  base.addColorStop(1, "#c47c53");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const features = [
    { lon: 226, lat: 18, rx: 170, ry: 95, color: "rgba(231,166,110,.58)" },
    { lon: 263, lat: -7, rx: 300, ry: 38, color: "rgba(73,34,25,.55)" },
    { lon: 137, lat: -5, rx: 86, ry: 54, color: "rgba(104,47,30,.38)" },
    { lon: 77, lat: 18, rx: 74, ry: 46, color: "rgba(91,48,37,.42)" },
    { lon: 134, lat: 48, rx: 260, ry: 140, color: "rgba(216,143,94,.35)" },
    { lon: 354, lat: -2, rx: 210, ry: 60, color: "rgba(184,93,54,.35)" },
  ];
  for (const feature of features) {
    const { x, y } = marsToXY(feature.lat, feature.lon);
    ctx.beginPath();
    ctx.ellipse(
      (x / 100) * canvas.width,
      (y / 100) * canvas.height,
      feature.rx,
      feature.ry,
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = feature.color;
    ctx.fill();
  }

  const noise = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < noise.data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 38;
    noise.data[i] += grain;
    noise.data[i + 1] += grain * 0.55;
    noise.data[i + 2] += grain * 0.35;
  }
  ctx.putImageData(noise, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

function BrandLogo({ size = 32 }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <circle cx="17" cy="18" r="11" fill="#c8362b" />
      <circle cx="13" cy="15" r="2" fill="#9b2920" opacity="0.7" />
      <circle cx="21" cy="21" r="1.5" fill="#9b2920" opacity="0.7" />
      <circle cx="19" cy="14" r="0.9" fill="#9b2920" opacity="0.45" />
      <path
        d="M5 11 L10 5 L15 11"
        stroke="#0a3d80"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 5 L10 13"
        stroke="#0a3d80"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function TopNav({ saved, onBrandClick }) {
  return (
    <header className="topnav">
      <button className="icon-btn" aria-label="Menu">
        <Menu size={22} />
      </button>
      <a className="brand" href="#" onClick={onBrandClick} aria-label="Marsillow">
        <BrandLogo size={32} />
        <span className="brand-name">
          Mars<em>illow</em>
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <button className="nav-link">
          Buy <ChevronDown size={14} />
        </button>
        <button className="nav-link muted">Rent</button>
        <button className="nav-link muted">Sell</button>
        <button className="nav-link muted">
          Mars Loans <ChevronDown size={14} />
        </button>
        <button className="nav-link muted">Agent finder</button>
        <button className="nav-link muted">Help</button>
      </nav>
      <div className="nav-right">
        <button className="nav-link muted">
          <Heart size={16} /> Saved {saved > 0 && `(${saved})`}
        </button>
        <button className="btn-outline">Sign in</button>
      </div>
    </header>
  );
}

const PARCEL_TYPES = [
  "Lakebed parcel",
  "Mountain-base parcel",
  "Equatorial plain",
  "Volcanic highland",
  "Lowland basin",
  "Northern lowland",
  "Canyon-rim parcel",
  "Volcano aureole",
];

function FilterPill({ label, value, active, isOpen, onToggle, children }) {
  const ref = React.useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onToggle();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen, onToggle]);
  return (
    <div className="filter-pill-wrap" ref={ref}>
      <button
        className={`filter-pill ${active ? "active" : ""}`}
        onClick={onToggle}
      >
        {value || label} <ChevronDown size={14} />
      </button>
      {isOpen && <div className="filter-popover">{children}</div>}
    </div>
  );
}

function FilterBar({
  query,
  setQuery,
  filters,
  setFilters,
  savedSearch,
  onSaveSearch,
}) {
  const [open, setOpen] = useState(null);
  const toggle = (k) => setOpen((cur) => (cur === k ? null : k));

  const setField = (patch) => setFilters({ ...filters, ...patch });
  const reset = (patch) => setFilters({ ...filters, ...patch });

  const priceLabel =
    filters.priceMin || filters.priceMax
      ? `${filters.priceMin ? shortMoney(filters.priceMin) : "Any"}–${
          filters.priceMax ? shortMoney(filters.priceMax) : "Any"
        }`
      : null;
  const habLabel =
    filters.minHabPads || filters.minRecyclers
      ? `${filters.minHabPads}+ hab · ${filters.minRecyclers}+ rec`
      : null;
  const parcelLabel =
    filters.parcelTypes.length > 0
      ? `${filters.parcelTypes.length} type${
          filters.parcelTypes.length > 1 ? "s" : ""
        }`
      : null;

  return (
    <div className="searchbar">
      <div className="searchbox">
        <Search size={16} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Region, rover, crater, lat/lon..."
        />
      </div>
      <div className="filter-pills">
        <button className="filter-pill active" disabled>
          For sale <ChevronDown size={14} />
        </button>
        <FilterPill
          label="Price"
          value={priceLabel}
          active={!!priceLabel}
          isOpen={open === "price"}
          onToggle={() => toggle("price")}
        >
          <PricePopover
            filters={filters}
            setField={setField}
            onClose={() => setOpen(null)}
          />
        </FilterPill>
        <FilterPill
          label="Hab pads & recyclers"
          value={habLabel}
          active={!!habLabel}
          isOpen={open === "hab"}
          onToggle={() => toggle("hab")}
        >
          <HabPopover
            filters={filters}
            setField={setField}
            onClose={() => setOpen(null)}
          />
        </FilterPill>
        <FilterPill
          label="Parcel type"
          value={parcelLabel}
          active={!!parcelLabel}
          isOpen={open === "parcel"}
          onToggle={() => toggle("parcel")}
        >
          <ParcelPopover
            filters={filters}
            setField={setField}
            onClose={() => setOpen(null)}
          />
        </FilterPill>
        <button
          className="filter-pill"
          onClick={() =>
            reset({
              priceMin: null,
              priceMax: null,
              parcelTypes: [],
              minHabPads: 0,
              minRecyclers: 0,
            })
          }
        >
          Reset
        </button>
      </div>
      <button
        className={`btn-primary save-search ${savedSearch ? "saved" : ""}`}
        onClick={onSaveSearch}
      >
        {savedSearch ? "Search saved ✓" : "Save search"}
      </button>
    </div>
  );
}

function PricePopover({ filters, setField, onClose }) {
  const [min, setMin] = useState(filters.priceMin || "");
  const [max, setMax] = useState(filters.priceMax || "");
  const presetMin = [0, 5000000, 8000000, 12000000, 15000000];
  const presetMax = [8000000, 12000000, 15000000, 18000000, 25000000];
  return (
    <div className="popover-pad">
      <div className="popover-title">Price range</div>
      <div className="price-presets">
        <select
          value={min}
          onChange={(e) => setMin(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">No min</option>
          {presetMin.map((v) => (
            <option key={v} value={v}>
              {shortMoney(v)}
            </option>
          ))}
        </select>
        <span>–</span>
        <select
          value={max}
          onChange={(e) => setMax(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">No max</option>
          {presetMax.map((v) => (
            <option key={v} value={v}>
              {shortMoney(v)}
            </option>
          ))}
        </select>
      </div>
      <div className="popover-actions">
        <button
          className="btn-outline"
          onClick={() => {
            setField({ priceMin: null, priceMax: null });
            setMin("");
            setMax("");
            onClose();
          }}
        >
          Clear
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setField({
              priceMin: min === "" ? null : Number(min),
              priceMax: max === "" ? null : Number(max),
            });
            onClose();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function HabPopover({ filters, setField, onClose }) {
  const [hab, setHab] = useState(filters.minHabPads);
  const [rec, setRec] = useState(filters.minRecyclers);
  const opts = [0, 2, 4, 6, 8, 10];
  return (
    <div className="popover-pad">
      <div className="popover-title">Hab pads</div>
      <div className="chip-row">
        {opts.map((n) => (
          <button
            key={n}
            className={`chip ${hab === n ? "active" : ""}`}
            onClick={() => setHab(n)}
          >
            {n === 0 ? "Any" : `${n}+`}
          </button>
        ))}
      </div>
      <div className="popover-title" style={{ marginTop: 14 }}>
        Recycler suites
      </div>
      <div className="chip-row">
        {opts.map((n) => (
          <button
            key={n}
            className={`chip ${rec === n ? "active" : ""}`}
            onClick={() => setRec(n)}
          >
            {n === 0 ? "Any" : `${n}+`}
          </button>
        ))}
      </div>
      <div className="popover-actions">
        <button
          className="btn-outline"
          onClick={() => {
            setField({ minHabPads: 0, minRecyclers: 0 });
            onClose();
          }}
        >
          Clear
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setField({ minHabPads: hab, minRecyclers: rec });
            onClose();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function ParcelPopover({ filters, setField, onClose }) {
  const [selected, setSelected] = useState(filters.parcelTypes);
  const toggle = (t) => {
    setSelected((s) =>
      s.includes(t) ? s.filter((x) => x !== t) : [...s, t]
    );
  };
  return (
    <div className="popover-pad popover-wide">
      <div className="popover-title">Parcel type</div>
      <div className="check-grid">
        {PARCEL_TYPES.map((t) => (
          <label key={t} className="check-item">
            <input
              type="checkbox"
              checked={selected.includes(t)}
              onChange={() => toggle(t)}
            />
            <span>{t}</span>
          </label>
        ))}
      </div>
      <div className="popover-actions">
        <button
          className="btn-outline"
          onClick={() => {
            setSelected([]);
            setField({ parcelTypes: [] });
            onClose();
          }}
        >
          Clear
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setField({ parcelTypes: selected });
            onClose();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function ListingCard({ listing, hovered, saved, onSelect, onHover, onSave }) {
  return (
    <article
      className={`listing-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={() => onHover(null)}
    >
      <button
        className="card-photo"
        onClick={() => onSelect(listing)}
        aria-label={`View ${listing.title}`}
      >
        <img src={listing.image} alt={`${listing.region} terrain`} />
        {listing.badge && <span className="card-ribbon">{listing.badge}</span>}
        <span className="card-dots" aria-hidden="true">
          <i className="active" />
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
      <button
        className={`card-heart ${saved ? "saved" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          onSave(listing.id);
        }}
        aria-label={saved ? "Unsave listing" : "Save listing"}
      >
        <Heart size={22} fill={saved ? "currentColor" : "none"} strokeWidth={2.4} />
      </button>
      <div className="card-body" onClick={() => onSelect(listing)}>
        <div className="card-price-row">
          <div className="card-price">{formatMoney(listing.price)}</div>
          <button className="card-more" aria-label="More" onClick={(e) => e.stopPropagation()}>
            <MoreHorizontal size={18} />
          </button>
        </div>
        <div className="card-stats">
          <b>{listing.habPads}</b> hab pads
          <span className="sep">|</span>
          <b>{listing.recyclerSuites}</b> recyclers
          <span className="sep">|</span>
          <b>{listing.acres.toLocaleString()}</b> acres
          <span className="sep">-</span>
          <span className="type">{listing.propertyType} for sale</span>
        </div>
        <div className="card-address">{listing.address}</div>
        <div className="card-broker">Listing by: {listing.listingAgent}</div>
      </div>
    </article>
  );
}

const MARS_TILES = {
  viking: {
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    label: "Viking color",
    maxZoom: 7,
  },
  mola: {
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    label: "MOLA shaded relief",
    maxZoom: 6,
  },
};

function MarsMap({ listings, selectedId, hoveredId, onSelect, onHover, layer = "viking" }) {
  const mountRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const tileRef = React.useRef(null);
  const markersRef = React.useRef({});
  const routesRef = React.useRef([]);

  // Init map once
  useEffect(() => {
    const div = mountRef.current;
    if (!div) return;
    const map = L.map(div, {
      crs: L.CRS.EPSG4326,
      center: [0, 100],
      zoom: 1,
      minZoom: 1,
      maxZoom: 6,
      worldCopyJump: false,
      attributionControl: true,
      zoomControl: true,
      zoomSnap: 0.25,
    });
    mapRef.current = map;
    map.setMaxBounds([
      [-90, -180],
      [90, 180],
    ]);

    // Force a re-measure once the container has settled.
    const resizer = new ResizeObserver(() => map.invalidateSize());
    resizer.observe(div);
    requestAnimationFrame(() => map.invalidateSize());

    return () => {
      resizer.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
      routesRef.current = [];
    };
  }, []);

  // Swap base tile layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileRef.current) tileRef.current.remove();
    const cfg = MARS_TILES[layer] || MARS_TILES.viking;
    tileRef.current = L.tileLayer(cfg.url, {
      attribution: `<a href="https://trek.nasa.gov/mars/" target="_blank" rel="noreferrer">NASA Mars Trek</a> · ${cfg.label}`,
      maxZoom: cfg.maxZoom,
      tileSize: 256,
      noWrap: true,
      bounds: [
        [-90, -180],
        [90, 180],
      ],
    }).addTo(map);
  }, [layer]);

  // Draw rover route polylines once (stay constant)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    routesRef.current.forEach((p) => p.remove());
    routesRef.current = roverRoutes.map((route) => {
      const latlngs = route.points.map(([lat, lon]) => [
        lat,
        lon > 180 ? lon - 360 : lon,
      ]);
      return L.polyline(latlngs, {
        color: route.color,
        weight: 2.4,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
    });
  }, []);

  // (Re)render markers when listings or selection change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const latLngs = [];
    listings.forEach((listing) => {
      const lon = listing.lon > 180 ? listing.lon - 360 : listing.lon;
      latLngs.push([listing.lat, lon]);
      const isSelected = listing.id === selectedId;
      const isHovered = listing.id === hoveredId;
      const html = `<div class="pill">${shortMoney(listing.price)}</div>`;
      const icon = L.divIcon({
        className: `mars-pill-marker${isSelected ? " selected" : ""}${
          isHovered ? " hovered" : ""
        }`,
        html,
        iconSize: [62, 26],
        iconAnchor: [31, 13],
      });
      const marker = L.marker([listing.lat, lon], {
        icon,
        riseOnHover: true,
        title: listing.title,
      });
      marker.on("click", () => onSelect(listing));
      marker.on("mouseover", () => onHover(listing.id));
      marker.on("mouseout", () => onHover(null));
      marker.addTo(map);
      markersRef.current[listing.id] = marker;
    });
  }, [listings, selectedId, hoveredId, onSelect, onHover]);

  // Fit map to listings on first load.
  const fittedRef = React.useRef(false);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || fittedRef.current || listings.length === 0) return;
    const latLngs = listings.map((l) => [
      l.lat,
      l.lon > 180 ? l.lon - 360 : l.lon,
    ]);
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 1.75 });
    fittedRef.current = true;
  }, [listings]);

  return <div className="leaflet-mars" ref={mountRef} aria-label="Interactive Mars map" />;
}

function MarsGlobe({ listings, selectedId, hoveredId, onSelect }) {
  const mountRef = React.useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.25, 6.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2, 128, 128),
      new THREE.MeshStandardMaterial({
        map: createMarsTexture(),
        roughness: 0.92,
        metalness: 0.02,
      })
    );
    group.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 128, 128),
      new THREE.MeshBasicMaterial({
        color: "#f7b286",
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
      })
    );
    group.add(atmosphere);

    const markerGroup = new THREE.Group();
    group.add(markerGroup);
    listings.forEach((listing) => {
      const isSelected = listing.id === selectedId;
      const isHovered = listing.id === hoveredId;
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(isSelected || isHovered ? 0.06 : 0.04, 24, 24),
        new THREE.MeshBasicMaterial({
          color: isSelected ? "#006aff" : "#d2232a",
        })
      );
      marker.position.copy(marsToVector(listing.lat, listing.lon));
      marker.userData = { id: listing.id };
      markerGroup.add(marker);
    });

    const ambient = new THREE.AmbientLight("#f5c6a8", 1.9);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight("#fff4d7", 2.7);
    sun.position.set(5, 4, 6);
    scene.add(sun);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const handleClick = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(markerGroup.children)[0];
      if (hit) {
        const listing = listings.find((item) => item.id === hit.object.userData.id);
        if (listing) onSelect(listing);
      }
    };
    renderer.domElement.addEventListener("click", handleClick);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [listings, selectedId, hoveredId, onSelect]);

  return <div className="globe-canvas" ref={mountRef} aria-label="3D Mars globe" />;
}

function MapPane({ listings, selectedId, hoveredId, onSelect, onHover, view, setView }) {
  const [tileLayer, setTileLayer] = useState("viking");
  return (
    <section className="map-pane">
      {view === "map" ? (
        <MarsMap
          listings={listings}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
          layer={tileLayer}
        />
      ) : (
        <MarsGlobe
          listings={listings}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
        />
      )}
      <div className="map-overlay">
        <div className="map-toggle" role="tablist" aria-label="Map view">
          <button
            className={view === "map" ? "active" : ""}
            onClick={() => setView("map")}
          >
            <MapIcon size={14} /> Map
          </button>
          <button
            className={view === "globe" ? "active" : ""}
            onClick={() => setView("globe")}
          >
            <Globe2 size={14} /> Globe
          </button>
        </div>
        {view === "map" && (
          <div className="map-toggle layer-toggle">
            <button
              className={tileLayer === "viking" ? "active" : ""}
              onClick={() => setTileLayer("viking")}
            >
              Color
            </button>
            <button
              className={tileLayer === "mola" ? "active" : ""}
              onClick={() => setTileLayer("mola")}
            >
              Topo
            </button>
          </div>
        )}
      </div>
      {view === "map" && (
        <div className="map-legend">
          {roverRoutes.map((route) => (
            <span key={route.name}>
              <i style={{ background: route.color }} />
              {route.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

const SORT_OPTIONS = [
  { id: "picks", label: "Marsillow Picks" },
  { id: "priceAsc", label: "Price (Low to High)" },
  { id: "priceDesc", label: "Price (High to Low)" },
  { id: "acresDesc", label: "Acres (Largest)" },
  { id: "newest", label: "Newest" },
  { id: "score", label: "Settlement Score" },
];

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);
  const current = SORT_OPTIONS.find((o) => o.id === value) || SORT_OPTIONS[0];
  return (
    <div className="sort-dropdown" ref={ref}>
      <button
        className="sort-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Sort: <b>{current.label}</b> <ChevronDown size={14} />
      </button>
      {open && (
        <div className="sort-menu">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`sort-item ${value === opt.id ? "active" : ""}`}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultsPane({
  listings,
  total,
  hoveredId,
  savedSet,
  sort,
  setSort,
  onSelect,
  onHover,
  onSave,
}) {
  return (
    <section className="results-pane">
      <header className="results-header">
        <h1>Mars Real Estate &amp; Plots For Sale</h1>
        <div className="results-meta">
          <span>
            <strong>{listings.length}</strong> of {total} results
          </span>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </header>
      <div className="results-grid">
        {listings.length === 0 ? (
          <div className="empty-state">
            <strong>No matching parcels.</strong>
            <span>Try widening price, parcel type, or search terms.</span>
          </div>
        ) : (
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              hovered={listing.id === hoveredId}
              saved={savedSet.has(listing.id)}
              onSelect={onSelect}
              onHover={onHover}
              onSave={onSave}
            />
          ))
        )}
      </div>
    </section>
  );
}

function Gallery({ listing }) {
  const images = listing.images && listing.images.length > 0 ? listing.images : [listing.image];
  const totalLabel = `See all ${Math.max(images.length, 12)} photos`;
  if (images.length >= 3) {
    return (
      <div className="gallery">
        <div className="gallery-main">
          <img src={images[0]} alt={`${listing.region} hero photo`} />
        </div>
        <div className="gallery-side">
          <div>
            <img src={images[1]} alt={`${listing.region} alternate view`} />
          </div>
          <div>
            <img src={images[2]} alt={`${listing.region} alternate view 2`} />
            <span className="all-photos">
              <Camera size={14} /> {totalLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div className="gallery gallery-two">
        <div className="gallery-main">
          <img src={images[0]} alt={`${listing.region} hero photo`} />
        </div>
        <div className="gallery-main">
          <img src={images[1]} alt={`${listing.region} alternate view`} />
          <span className="all-photos">
            <Camera size={14} /> {totalLabel}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="gallery gallery-one">
      <div className="gallery-main">
        <img src={images[0]} alt={`${listing.region} hero photo`} />
        <span className="all-photos">
          <Camera size={14} /> {totalLabel}
        </span>
      </div>
    </div>
  );
}

function ContactModal({ listing, kind, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const title =
    kind === "tour" ? "Schedule a rover tour" : "Request more info";
  const cta = kind === "tour" ? "Schedule tour" : "Send request";
  return (
    <div className="modal-shroud" role="dialog" aria-modal="true">
      <div className="modal-card">
        <header className="modal-head">
          <strong>{title}</strong>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        {submitted ? (
          <div className="modal-thanks">
            <h3>You're on the list.</h3>
            <p>
              A Mars settlement specialist with {listing.listingAgent} will
              respond about{" "}
              <b>{listing.title}</b> within 1 sol.
            </p>
            <button className="btn-block primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form
            className="modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              <span>Name</span>
              <input required placeholder="Aria Vasquez" />
            </label>
            <label>
              <span>Email</span>
              <input required type="email" placeholder="you@settler.mars" />
            </label>
            <label>
              <span>Phone</span>
              <input placeholder="+1 (555) 010-2049" />
            </label>
            {kind === "tour" && (
              <label>
                <span>Preferred sol</span>
                <input type="date" />
              </label>
            )}
            <label>
              <span>Message</span>
              <textarea
                rows={3}
                defaultValue={
                  kind === "tour"
                    ? `I'd like to walk ${listing.title} via the rover-tour rig.`
                    : `Tell me more about ${listing.title}.`
                }
              />
            </label>
            <button className="btn-block primary" type="submit">
              {cta}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function DetailSidebar({ listing }) {
  const [modal, setModal] = useState(null);
  return (
    <aside className="detail-side">
      <div className="cta-card">
        <h3>Tour this plot</h3>
        <p>
          Walk the parcel via remote rover or speak with a Mars settlement
          specialist about access.
        </p>
        <div className="stack">
          <button
            className="btn-block primary"
            onClick={() => setModal("tour")}
          >
            Schedule rover tour
          </button>
          <button
            className="btn-block outline"
            onClick={() => setModal("info")}
          >
            Request info
          </button>
        </div>
      </div>
      <div className="broker-card">
        <b>Listed by</b>
        {listing.listingAgent}
        <div style={{ marginTop: 6 }}>
          Listed {listing.daysListed} sols ago · MLS #
          {listing.id.toUpperCase()}
        </div>
      </div>
      <div className="broker-card">
        <b>Marsillow analyst note</b>
        <span style={{ color: "var(--ink)" }}>
          Marsestimate® of {formatMoney(listing.marsestimate)} reflects current
          settlement-zone comps. List price is{" "}
          {listing.marsestimate > listing.price ? "below" : "above"} the
          Marsestimate by{" "}
          {formatMoney(Math.abs(listing.marsestimate - listing.price))}.
        </span>
      </div>
      {modal && (
        <ContactModal
          listing={listing}
          kind={modal}
          onClose={() => setModal(null)}
        />
      )}
    </aside>
  );
}

function DetailPage({ listing, saved, onBack, onSave }) {
  const perAcre = Math.round(listing.price / listing.acres);
  const estimateDelta = listing.marsestimate - listing.price;
  const estimateUp = estimateDelta >= 0;
  return (
    <main className="detail-shell">
      <div className="detail-bar">
        <button className="back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to search
        </button>
        <div className="detail-bar-center">
          <a className="brand" href="#" onClick={onBack}>
            <BrandLogo size={28} />
            <span className="brand-name" style={{ fontSize: 20 }}>
              Mars<em>illow</em>
            </span>
          </a>
        </div>
        <div className="detail-bar-actions">
          <button
            className={saved ? "saved" : ""}
            onClick={() => onSave(listing.id)}
          >
            <Heart size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
          </button>
          <button>
            <Share2 size={16} /> Share
          </button>
          <button>
            <EyeOff size={16} /> Hide
          </button>
          <button>
            <MoreHorizontal size={16} /> More
          </button>
        </div>
      </div>

      <div className="detail-content">
        <Gallery listing={listing} />


        <div className="detail-grid">
          <div>
            <div style={{ marginTop: 18 }}>
              <span className="status-pill">
                <i /> For sale
              </span>
            </div>
            <div className="detail-price">{formatMoney(listing.price)}</div>
            <div className="detail-stats">
              <span>
                <BedDouble size={20} /> <b>{listing.habPads}</b> hab pads
              </span>
              <span>
                <Bath size={20} /> <b>{listing.recyclerSuites}</b> recyclers
              </span>
              <span>
                <Ruler size={20} /> <b>{listing.acres.toLocaleString()}</b> acres
              </span>
            </div>
            <div className="detail-address">
              {listing.title} · {listing.address} · {listing.region}
            </div>
            <div className="payment-pill">
              <span>
                Est. terraform payment:{" "}
                <b>{formatMoney(estPaymentPerSol(listing.price))}/sol</b>
              </span>
              <span className="info-icon">
                <Info size={14} />
              </span>
              <a href="#">Get pre-qualified</a>
            </div>

            <div className="fact-grid">
              <div className="fact-cell">
                <HomeIcon size={20} />
                <div>
                  <b>{listing.propertyType}</b>
                  <span>Parcel type</span>
                </div>
              </div>
              <div className="fact-cell">
                <Hammer size={20} />
                <div>
                  <b>Surveyed {listing.yearSurveyed}</b>
                  <span>{listing.rover}</span>
                </div>
              </div>
              <div className="fact-cell">
                <Trees size={20} />
                <div>
                  <b>{listing.acres.toLocaleString()} acres</b>
                  <span>Lot size</span>
                </div>
              </div>
              <div className="fact-cell">
                <TrendingUp size={20} />
                <div>
                  <b>{formatMoney(listing.marsestimate)} Marsestimate®</b>
                  <span style={{ color: estimateUp ? "#0a7d3a" : "#b8242b" }}>
                    {estimateUp ? "▲" : "▼"} {formatMoney(Math.abs(estimateDelta))}
                  </span>
                </div>
              </div>
              <div className="fact-cell">
                <Calculator size={20} />
                <div>
                  <b>{formatMoney(perAcre)}/acre</b>
                  <span>Price per acre</span>
                </div>
              </div>
              <div className="fact-cell">
                <MapPin size={20} />
                <div>
                  <b>{listing.elevation.toLocaleString()} m</b>
                  <span>MOLA elevation</span>
                </div>
              </div>
            </div>

            <section className="section">
              <h2>What's special</h2>
              <div className="tag-row">
                {listing.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p style={{ marginTop: 14 }}>{listing.description}</p>
            </section>

            <section className="section">
              <h2>Why you'll love {listing.region.split(",")[0]}</h2>
              <ul className="check-list">
                {listing.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="section">
              <h2>Settlement Score™</h2>
              <p className="score-hero">
                <span className="score-num">{listing.settlementScore.overall}</span>
                <span className="score-out">/ 100</span>
                <span className="score-label">
                  Marsillow's all-in livability rating
                </span>
              </p>
              <div className="score-bars">
                {[
                  ["Water access", listing.settlementScore.water],
                  ["Daylight", listing.settlementScore.daylight],
                  ["Pressure", listing.settlementScore.pressure],
                  ["Scenery", listing.settlementScore.scenery],
                  ["Terraform-ready", listing.settlementScore.terraformReady],
                ].map(([label, value]) => (
                  <div key={label} className="score-row">
                    <span className="score-row-label">{label}</span>
                    <span className="score-bar">
                      <span
                        className="score-bar-fill"
                        style={{ width: `${value}%` }}
                      />
                    </span>
                    <span className="score-row-value">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>Environment &amp; climate</h2>
              <div className="env-grid">
                <div>
                  <b>Daylight</b>
                  <span>{listing.environment.daylight}</span>
                </div>
                <div>
                  <b>Temperature</b>
                  <span>{listing.environment.temperature}</span>
                </div>
                <div>
                  <b>Atmosphere</b>
                  <span>{listing.environment.pressure}</span>
                </div>
                <div>
                  <b>Dust</b>
                  <span>{listing.environment.dust}</span>
                </div>
                <div>
                  <b>Wind</b>
                  <span>{listing.environment.wind}</span>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>What's nearby</h2>
              <ul className="nearby-list">
                {listing.nearby.map((item) => (
                  <li key={item.name}>
                    <MapPin size={16} />
                    <span className="nearby-name">{item.name}</span>
                    <span className="nearby-distance">{item.distance}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="section">
              <h2>Amenities &amp; rights included</h2>
              <ul className="check-list">
                {listing.amenities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="section">
              <h2>Price &amp; Marsestimate® history</h2>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.priceHistory.map((row) => (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td>{row.event}</td>
                      <td>{formatMoney(row.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <DetailSidebar listing={listing} />
        </div>
      </div>
    </main>
  );
}

const DEFAULT_FILTERS = {
  priceMin: null,
  priceMax: null,
  parcelTypes: [],
  minHabPads: 0,
  minRecyclers: 0,
};

function App() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("map");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [savedSet, setSavedSet] = useState(() => new Set());
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("picks");
  const [savedSearch, setSavedSearch] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return listings.filter((listing) => {
      if (
        needle &&
        ![
          listing.title,
          listing.region,
          listing.address,
          listing.rover,
          listing.propertyType,
          listing.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
        return false;
      if (filters.priceMin != null && listing.price < filters.priceMin) return false;
      if (filters.priceMax != null && listing.price > filters.priceMax) return false;
      if (
        filters.parcelTypes.length > 0 &&
        !filters.parcelTypes.includes(listing.propertyType)
      )
        return false;
      if (listing.habPads < filters.minHabPads) return false;
      if (listing.recyclerSuites < filters.minRecyclers) return false;
      return true;
    });
  }, [query, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "priceAsc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "acresDesc":
        arr.sort((a, b) => b.acres - a.acres);
        break;
      case "newest":
        arr.sort((a, b) => a.daysListed - b.daysListed);
        break;
      case "score":
        arr.sort(
          (a, b) =>
            b.settlementScore.overall - a.settlementScore.overall
        );
        break;
      default:
        break;
    }
    return arr;
  }, [filtered, sort]);

  const toggleSave = (id) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Reset save-search confirmation when filters/query change
  useEffect(() => {
    if (savedSearch) setSavedSearch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, sort]);

  useEffect(() => {
    if (selectedListing) {
      window.scrollTo(0, 0);
    }
  }, [selectedListing]);

  if (selectedListing) {
    return (
      <DetailPage
        listing={selectedListing}
        saved={savedSet.has(selectedListing.id)}
        onBack={() => setSelectedListing(null)}
        onSave={toggleSave}
      />
    );
  }

  return (
    <>
      <TopNav saved={savedSet.size} onBrandClick={(e) => e.preventDefault()} />
      <FilterBar
        query={query}
        setQuery={setQuery}
        filters={filters}
        setFilters={setFilters}
        savedSearch={savedSearch}
        onSaveSearch={() => setSavedSearch(true)}
      />
      <div className="split">
        <MapPane
          listings={sorted}
          selectedId={null}
          hoveredId={hoveredId}
          onSelect={setSelectedListing}
          onHover={setHoveredId}
          view={view}
          setView={setView}
        />
        <ResultsPane
          listings={sorted}
          total={listings.length}
          hoveredId={hoveredId}
          savedSet={savedSet}
          sort={sort}
          setSort={setSort}
          onSelect={setSelectedListing}
          onHover={setHoveredId}
          onSave={toggleSave}
        />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
