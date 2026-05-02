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
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trees,
} from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
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
    agentId: "elon-musk",
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
    agentId: "tosca-musk",
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
    agentId: "vivian-musk",
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
    agentId: "octavia-musk",
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
    agentId: "kimbal-musk",
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
    agentId: "maye-musk",
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
    agentId: "justine-musk",
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
    agentId: "elon-musk",
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

const agents = [
  {
    id: "elon-musk",
    name: "Elon Musk",
    title: "Founding broker · Tharsis & Olympus",
    region: "Tharsis & Olympus",
    specialties: ["Volcano aureole", "Tharsis", "Showcase parcels"],
    yearsExperience: 25,
    transactions: 127,
    rating: 5.0,
    reviewCount: 412,
    phone: "+1 (555) 010-1969",
    email: "elon@marsillow.com",
    motto: "Make Mars multiplanetary. And mortgageable.",
    bio: "Marsillow's founding broker. Closed the first Olympus aureole parcel in 2027 and has personally walked every Tharsis-bulge listing on the market. Best fit for buyers who want the tallest mailing address in the solar system.",
    soldRecent: [
      { region: "Pavonis Mons saddle", price: 11400000, sols: 84 },
      { region: "Ascraeus Mons rim", price: 9800000, sols: 162 },
      { region: "Olympus southern aureole", price: 6450000, sols: 305 },
    ],
    badges: ["Marsillow Founding Broker", "Top 1% volume"],
  },
  {
    id: "errol-musk",
    name: "Errol Musk",
    title: "Senior land partner · Crater estates",
    region: "Southern crater belt",
    specialties: ["Crater estates", "Hard-asset diligence"],
    yearsExperience: 41,
    transactions: 38,
    rating: 4.7,
    reviewCount: 56,
    phone: "+1 (555) 010-2719",
    email: "errol@marsillow.com",
    motto: "Buy the dirt, not the dream.",
    bio: "Veteran land broker. Knows every easement, mineral right, and survey peg in the southern highlands. Talks plainly about title quirks. Not on social media.",
    soldRecent: [
      { region: "Hellas rim hold", price: 5200000, sols: 220 },
      { region: "Argyre south parcel", price: 4100000, sols: 410 },
    ],
    badges: ["Title-clean specialist"],
  },
  {
    id: "maye-musk",
    name: "Maye Musk",
    title: "Polar broker · Northern lowlands",
    region: "Utopia & Vastitas Borealis",
    specialties: ["Ice rights", "Northern lowland", "Greenhouse-ready"],
    yearsExperience: 36,
    transactions: 64,
    rating: 4.9,
    reviewCount: 188,
    phone: "+1 (555) 010-3344",
    email: "maye@marsillow.com",
    motto: "Beautiful land has good bones. So does Mars.",
    bio: "Polar specialist. Brings a calm, fashion-forward sensibility to ice-rights deals. Has placed more greenhouse-ready acreage than any other agent on the planet.",
    soldRecent: [
      { region: "Utopia north tract", price: 9300000, sols: 71 },
      { region: "Vastitas Borealis 80-acre", price: 7800000, sols: 154 },
      { region: "Polar approach reserve", price: 6200000, sols: 233 },
    ],
    badges: ["Top closer · Northern hemisphere"],
  },
  {
    id: "kimbal-musk",
    name: "Kimbal Musk",
    title: "Agricultural broker · Greenhouse basins",
    region: "Elysium & lowland basins",
    specialties: ["Lowland basin", "Greenhouse zoning", "ISRU water"],
    yearsExperience: 18,
    transactions: 49,
    rating: 4.8,
    reviewCount: 142,
    phone: "+1 (555) 010-4711",
    email: "kimbal@marsillow.com",
    motto: "If we can grow it on Mars, we can sell it on Mars.",
    bio: "Cuts deals around water rights, soil amendment, and pre-permitted greenhouse footprints. Buyers planning to feed a settlement come to him first.",
    soldRecent: [
      { region: "Elysium ag corridor", price: 7100000, sols: 96 },
      { region: "Cerberus Fossae ag plot", price: 5450000, sols: 211 },
    ],
    badges: ["Certified greenhouse zoning"],
  },
  {
    id: "tosca-musk",
    name: "Tosca Musk",
    title: "Lifestyle broker · Mountain & summit",
    region: "Gale, Aeolis Mons, summit views",
    specialties: ["Mountain-base parcel", "Layered terrain", "Cinematic views"],
    yearsExperience: 22,
    transactions: 71,
    rating: 4.9,
    reviewCount: 267,
    phone: "+1 (555) 010-5560",
    email: "tosca@marsillow.com",
    motto: "Every parcel deserves a story (and a closing).",
    bio: "Lifestyle and view-driven sales. Pioneered the cliff-side hab format. Offers staged sunrise viewings via remote rover.",
    soldRecent: [
      { region: "Mount Sharp upper bench", price: 13900000, sols: 53 },
      { region: "Aeolis ridge plot", price: 11200000, sols: 121 },
      { region: "Gale north terrace", price: 9800000, sols: 178 },
    ],
    badges: ["Cinematic-view specialist"],
  },
  {
    id: "justine-musk",
    name: "Justine Musk",
    title: "Canyon-rim specialist",
    region: "Valles Marineris",
    specialties: ["Canyon-rim parcel", "Viewshed", "Limited inventory"],
    yearsExperience: 19,
    transactions: 42,
    rating: 4.95,
    reviewCount: 198,
    phone: "+1 (555) 010-6118",
    email: "justine@marsillow.com",
    motto: "The right parcel finds the right buyer.",
    bio: "Trusted advisor for the 28 protected rim parcels along the western Valles system. Walks every buyer through the viewshed easement before paperwork.",
    soldRecent: [
      { region: "Tithonium rim hold", price: 16200000, sols: 38 },
      { region: "Candor Chasma overlook", price: 14800000, sols: 89 },
    ],
    badges: ["Rim-parcel concierge"],
  },
  {
    id: "vivian-musk",
    name: "Vivian J. Musk",
    title: "Heritage corridor agent",
    region: "Meridiani & rover heritage routes",
    specialties: ["Heritage corridor", "Equatorial plain", "Cultural value"],
    yearsExperience: 8,
    transactions: 33,
    rating: 4.85,
    reviewCount: 121,
    phone: "+1 (555) 010-7222",
    email: "vivian@marsillow.com",
    motto: "History is the most underpriced amenity on Mars.",
    bio: "Specializes in parcels with rover-heritage premiums. Sharp on cultural-easement structures and protected-route covenants.",
    soldRecent: [
      { region: "Endurance rim parcel", price: 8200000, sols: 47 },
      { region: "Victoria approach lot", price: 7400000, sols: 102 },
    ],
    badges: ["Heritage easement specialist"],
  },
  {
    id: "strider-musk",
    name: "Strider Musk",
    title: "Lakebed & delta lead",
    region: "Jezero & paleo-lake basins",
    specialties: ["Lakebed parcel", "Sample cache adjacency", "Delta science"],
    yearsExperience: 4,
    transactions: 11,
    rating: 4.6,
    reviewCount: 28,
    phone: "+1 (555) 010-8334",
    email: "strider@marsillow.com",
    motto: "Old water. New addresses.",
    bio: "Up-and-coming agent specializing in paleo-lake parcels. Strong technical chops on sediment cores and water-rights filings.",
    soldRecent: [
      { region: "Eberswalde delta plot", price: 5900000, sols: 64 },
    ],
    badges: ["Rising star"],
  },
  {
    id: "talulah-musk",
    name: "Talulah Musk",
    title: "Press & PR · Marquee parcels",
    region: "All districts · branded properties",
    specialties: ["Showcase parcels", "Branding rights", "Press"],
    yearsExperience: 11,
    transactions: 17,
    rating: 4.9,
    reviewCount: 73,
    phone: "+1 (555) 010-9007",
    email: "talulah@marsillow.com",
    motto: "If your parcel gets a press release, I wrote it.",
    bio: "Handles communications and press for marquee-name parcels. Buyers come to her when their address will be on a billboard.",
    soldRecent: [
      { region: "Olympus PR-rights bundle", price: 4800000, sols: 88 },
    ],
    badges: ["Press concierge"],
  },
  {
    id: "damian-musk",
    name: "Damian Musk",
    title: "First-time settlers",
    region: "Equatorial starter parcels",
    specialties: ["Starter parcels", "Financing", "First-time settler"],
    yearsExperience: 3,
    transactions: 22,
    rating: 4.8,
    reviewCount: 64,
    phone: "+1 (555) 010-1117",
    email: "damian@marsillow.com",
    motto: "Your first hab pad is a big deal. I treat it that way.",
    bio: "Patient, education-first agent for first-time settlers. Walks buyers through life-support specs, financing, and what hab pads they actually need.",
    soldRecent: [
      { region: "Sinus Meridiani starter", price: 2400000, sols: 21 },
      { region: "Ares Vallis starter", price: 1850000, sols: 33 },
    ],
    badges: ["First-time settler advocate"],
  },
  {
    id: "saxon-musk",
    name: "Saxon Musk",
    title: "Equatorial logistics",
    region: "Cargo corridors & spaceports",
    specialties: ["Logistics", "Spaceport adjacency", "Industrial easements"],
    yearsExperience: 7,
    transactions: 26,
    rating: 4.7,
    reviewCount: 52,
    phone: "+1 (555) 010-1212",
    email: "saxon@marsillow.com",
    motto: "Land near the cargo lanes. Always.",
    bio: "Industrial and logistics-corridor specialist. Knows every planned spaceport, ring road, and port-of-entry permit on Mars.",
    soldRecent: [
      { region: "Equatorial ring-road yard", price: 4900000, sols: 110 },
    ],
    badges: ["Logistics-corridor expert"],
  },
  {
    id: "octavia-musk",
    name: "Octavia Musk",
    title: "Volcanic highlands broker",
    region: "Gusev & Columbia Hills",
    specialties: ["Volcanic highland", "Geothermal", "Quiet districts"],
    yearsExperience: 9,
    transactions: 31,
    rating: 4.85,
    reviewCount: 88,
    phone: "+1 (555) 010-1416",
    email: "octavia@marsillow.com",
    motto: "Quiet land. Loud potential.",
    bio: "Champion of the southern volcanic highlands — quieter, cheaper, and full of geothermal upside. Comfortable with rugged terrain access.",
    soldRecent: [
      { region: "Columbia Hills outcrop", price: 5400000, sols: 76 },
      { region: "Gusev west tract", price: 4200000, sols: 144 },
    ],
    badges: ["Highland district leader"],
  },
];

const agentsById = Object.fromEntries(agents.map((a) => [a.id, a]));

const rentals = [
  {
    id: "rent-jezero-cliff",
    name: "Jezero Cliffside Hab",
    kind: "short-term",
    region: "Jezero Crater, Mars",
    propertyType: "Cliffside short-term",
    pricePerSol: 4200,
    sleeps: 4,
    habPads: 2,
    recyclerSuites: 2,
    minStay: "3 sols",
    furnished: true,
    image:
      "https://images-assets.nasa.gov/image/PIA24487/PIA24487~medium.jpg",
    amenities: [
      "Crater rim viewdeck",
      "Pre-stocked rover parking",
      "Curated NASA archive library",
    ],
    description:
      "Three-sol minimum on the western fan of Jezero. Sunset over the delta, sample-cache walks at dawn.",
    agentId: "elon-musk",
  },
  {
    id: "rent-aeolis-studio",
    name: "Aeolis Mountain Studio",
    kind: "long-term",
    region: "Gale Crater, Mars",
    propertyType: "Studio · 1 hab",
    monthlyRent: 42000,
    habPads: 1,
    recyclerSuites: 1,
    sleeps: 2,
    minStay: "6 months",
    furnished: false,
    image:
      "https://images-assets.nasa.gov/image/PIA16032/PIA16032~small.jpg",
    amenities: [
      "Sedimentary archive view",
      "Pressurized garage bay",
      "Shared community greenhouse",
    ],
    description:
      "Bright single hab pad at the Mount Sharp basecamp. Walk to the geology corridor.",
    agentId: "tosca-musk",
  },
  {
    id: "rent-insight-bunk",
    name: "InSight Settlement Bunkhouse",
    kind: "long-term",
    region: "Elysium Planitia, Mars",
    propertyType: "Co-living · 6 habs",
    monthlyRent: 28000,
    habPads: 6,
    recyclerSuites: 4,
    sleeps: 12,
    minStay: "12 months",
    furnished: true,
    image:
      "https://images-assets.nasa.gov/image/PIA22236/PIA22236~medium.jpg",
    amenities: [
      "Per-bunk pressurization",
      "Hot-desk recycler suites",
      "Cargo-bay bike storage",
    ],
    description:
      "Co-living for early settlers. Bunk-by-bunk leases available for engineers on rotation.",
    agentId: "kimbal-musk",
  },
  {
    id: "rent-olympus-lodge",
    name: "Olympus Aerosport Lodge",
    kind: "short-term",
    region: "Olympus Mons, Mars",
    propertyType: "Lodge · sleeps 6",
    pricePerSol: 7800,
    sleeps: 6,
    habPads: 3,
    recyclerSuites: 2,
    minStay: "5 sols",
    furnished: true,
    image:
      "https://images-assets.nasa.gov/image/PIA22581/PIA22581~medium.jpg",
    amenities: [
      "Glider charter included",
      "Aurora observation cupola",
      "Tharsis tram passes",
    ],
    description:
      "Five-sol minimum on the Olympus aureole. Includes one tandem glider charter and tram day passes.",
    agentId: "elon-musk",
  },
  {
    id: "rent-utopia-greenhouse",
    name: "Utopia Greenhouse Loft",
    kind: "long-term",
    region: "Utopia Planitia, Mars",
    propertyType: "Greenhouse loft",
    monthlyRent: 35000,
    habPads: 2,
    recyclerSuites: 1,
    sleeps: 3,
    minStay: "9 months",
    furnished: true,
    image:
      "https://images-assets.nasa.gov/image/PIA17633/PIA17633~medium.jpg",
    amenities: [
      "Live-in greenhouse module",
      "Ice-rights tap (50 L/sol)",
      "Polar-night blackout shutters",
    ],
    description:
      "Live above the greenhouse. Lunar-style indoor garden with ice-tap utilities included.",
    agentId: "maye-musk",
  },
  {
    id: "rent-valles-tent",
    name: "Valles Canyon Tent",
    kind: "short-term",
    region: "Valles Marineris, Mars",
    propertyType: "Cliff tent · sleeps 2",
    pricePerSol: 9500,
    sleeps: 2,
    habPads: 1,
    recyclerSuites: 1,
    minStay: "2 sols",
    furnished: true,
    image:
      "https://images-assets.nasa.gov/image/PIA00407/PIA00407~medium.jpg",
    amenities: [
      "Cantilevered viewing tent",
      "Sunrise canyon-cable descent",
      "Private channel scout-rover",
    ],
    description:
      "A glass-floored canyon tent over the western Valles. Two-sol minimum, no kids.",
    agentId: "justine-musk",
  },
  {
    id: "rent-meridiani-hostel",
    name: "Meridiani Heritage Hostel",
    kind: "short-term",
    region: "Meridiani Planum, Mars",
    propertyType: "Hostel · sleeps 8",
    pricePerSol: 1800,
    sleeps: 8,
    habPads: 4,
    recyclerSuites: 2,
    minStay: "1 sol",
    furnished: true,
    image:
      "https://images-assets.nasa.gov/image/PIA05273/PIA05273~small.jpg",
    amenities: [
      "Bunk dorms",
      "Heritage walking tour included",
      "Communal recycler kitchen",
    ],
    description:
      "Backpacker hostel along Opportunity's traverse. Bring your own oxygen pack.",
    agentId: "vivian-musk",
  },
  {
    id: "rent-gusev-cabin",
    name: "Gusev Quiet District Cabin",
    kind: "long-term",
    region: "Gusev Crater, Mars",
    propertyType: "Cabin · 2 habs",
    monthlyRent: 19000,
    habPads: 2,
    recyclerSuites: 1,
    sleeps: 4,
    minStay: "6 months",
    furnished: false,
    image:
      "https://images-assets.nasa.gov/image/PIA08813/PIA08813~medium.jpg",
    amenities: [
      "Volcanic outcrop hiking",
      "Pre-laid Spirit memorial walkway",
      "Geothermal-pilot tap-in option",
    ],
    description:
      "A quiet two-pad cabin in the Columbia Hills district. Off the rover-traffic beat.",
    agentId: "octavia-musk",
  },
];

const HELP_FAQ = [
  {
    category: "Buying",
    q: "How is parcel ownership recorded on Mars?",
    a: "Marsillow records every closed sale to the Marsillow Title Ledger, an off-world deed registry mirrored at three orbital relays. Your title moves with you regardless of which settlement you live in.",
  },
  {
    category: "Buying",
    q: "Do I need pre-qualification before I can tour a parcel?",
    a: "No. You can schedule a remote rover tour without pre-qualification. Pre-qualification is required before submitting a binding offer.",
  },
  {
    category: "Buying",
    q: "Can I make an offer below the Marsestimate®?",
    a: "Yes. Marsestimate® is Marsillow's modeled forward value, not a list price floor. Your agent will help you frame an offer your seller will actually read.",
  },
  {
    category: "Selling",
    q: "How does the free Marsestimate® work?",
    a: "Submit your parcel's region, latitude/longitude, acreage, and parcel type. Marsillow returns a confidence range based on rover validation, elevation, water access, and recent settlement-zone comps.",
  },
  {
    category: "Selling",
    q: "What does Marsillow charge to list?",
    a: "Listing on Marsillow is free. We charge a 2.4% closing fee, payable in cash or in-kind ISRU output (water, oxygen, regolith bricks).",
  },
  {
    category: "Renting",
    q: "What's the difference between a short-term stay and a long-term lease?",
    a: "Short-term stays are priced per sol (Mars day) and cover anything from a 1-sol overnight to a 30-sol stay. Long-term leases are priced monthly with 6 to 24 month terms.",
  },
  {
    category: "Renting",
    q: "Are habitat utilities included in my rent?",
    a: "Marsillow listings show pressurization, water, and recycler-suite usage as included unless flagged otherwise. Power, comms, and rover-bay charging are usage-metered.",
  },
  {
    category: "Financing",
    q: "What is the inter-orbital prime rate?",
    a: "It's Marsillow's published reference rate for terraform mortgages — currently 8.50% APR. Your actual quoted rate depends on parcel type, settlement score, and down payment.",
  },
  {
    category: "Financing",
    q: "Can I pay my mortgage in sols?",
    a: "Yes. Marsillow auto-converts your monthly payment into a per-sol slice if you select sol-billing. Payments draft on Mars-local sol-end.",
  },
  {
    category: "Rovers & tours",
    q: "What's a rover tour?",
    a: "A rover tour is a real-time guided walk of the parcel via Marsillow's tour-rover fleet. You drive the rover, your agent narrates, the seller pays for the energy.",
  },
  {
    category: "Rovers & tours",
    q: "How long does a rover tour take?",
    a: "Most tours are 45 minutes to 2 hours. Bookings are slotted in 90-minute blocks. Cancel up to 6 hours before with no penalty.",
  },
  {
    category: "Settlement basics",
    q: "Are hab pads the same as bedrooms?",
    a: "Hab pads are pressurized sleeping modules — the Mars equivalent of bedrooms. Recycler suites are the equivalent of bathrooms. Both terms appear on every Marsillow listing.",
  },
  {
    category: "Settlement basics",
    q: "What is the Settlement Score™?",
    a: "Marsillow's Settlement Score™ blends water access, daylight, pressure, scenery, and terraform-readiness into a 0–100 livability rating. It's shown on every parcel detail page.",
  },
  {
    category: "Account",
    q: "How do I save a parcel?",
    a: "Tap the heart icon on any listing card. Your saved parcels live under Saved in the top nav and persist between visits.",
  },
];

const HELP_CATEGORIES = [
  { id: "Buying", label: "Buying", desc: "Touring, offers, closing" },
  { id: "Selling", label: "Selling", desc: "Listings, Marsestimate, fees" },
  { id: "Renting", label: "Renting", desc: "Stays, leases, utilities" },
  { id: "Financing", label: "Financing", desc: "Mortgages, sol-billing, rates" },
  { id: "Rovers & tours", label: "Rovers & tours", desc: "Remote walkthroughs" },
  { id: "Settlement basics", label: "Settlement basics", desc: "Hab pads, scores, glossary" },
  { id: "Account", label: "Account", desc: "Saved parcels, alerts, profile" },
];

const SELL_TESTIMONIALS = [
  {
    name: "Errol M.",
    listing: "Hellas rim hold",
    quote:
      "Listed Friday afternoon, three offers by Tuesday. Marsillow's agent matching put us with the right buyer on the first try.",
    saleDays: 4,
  },
  {
    name: "Vivian J.",
    listing: "Endurance rim parcel",
    quote:
      "Marsestimate came in within 2% of the sale price. The pricing call was the easy part.",
    saleDays: 47,
  },
  {
    name: "Strider M.",
    listing: "Eberswalde delta plot",
    quote:
      "I'm new to selling on Mars. My agent walked me through every covenant and the closing felt like a normal Earth deal.",
    saleDays: 64,
  },
];

function estimateParcelValue({ propertyType, acres, lat }) {
  const basePerAcre = {
    "Lakebed parcel": 480000,
    "Mountain-base parcel": 290000,
    "Equatorial plain": 153000,
    "Volcanic highland": 140000,
    "Lowland basin": 73000,
    "Northern lowland": 53000,
    "Canyon-rim parcel": 366000,
    "Volcano aureole": 80000,
  };
  const base = (basePerAcre[propertyType] || 110000) * Math.max(acres, 0);
  const latFactor = 1 - Math.min(Math.abs(lat) / 90, 1) * 0.18;
  const center = base * latFactor;
  return {
    center: Math.round(center),
    low: Math.round(center * 0.92),
    high: Math.round(center * 1.08),
  };
}

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

function TopNav({
  saved,
  onBrandClick,
  onBuy,
  onRent,
  onSell,
  onAgents,
  onSaved,
  onLoans,
  onHelp,
}) {
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
        <button className="nav-link" onClick={onBuy}>
          Buy <ChevronDown size={14} />
        </button>
        <button className="nav-link muted" onClick={onRent}>
          Rent
        </button>
        <button className="nav-link muted" onClick={onSell}>
          Sell
        </button>
        <button className="nav-link muted" onClick={onLoans}>
          Mars Loans <ChevronDown size={14} />
        </button>
        <button className="nav-link muted" onClick={onAgents}>
          Agent finder
        </button>
        <button className="nav-link muted" onClick={onHelp}>
          Help
        </button>
      </nav>
      <div className="nav-right">
        <button className="nav-link muted" onClick={onSaved}>
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

// Module-level cache so the Mars Trek tile stitch only happens once.
let marsTexturePromise = null;
function loadMarsGlobeTexture() {
  if (marsTexturePromise) return marsTexturePromise;
  marsTexturePromise = new Promise((resolve) => {
    const z = 2; // 8 cols x 4 rows of 256px tiles = 2048 x 1024 texture
    const cols = 2 << z; // 8 at z=2
    const rows = 1 << z; // 4 at z=2
    const tileSize = 256;
    const canvas = document.createElement("canvas");
    canvas.width = cols * tileSize;
    canvas.height = rows * tileSize;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#3a1f15";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    let pending = cols * rows;
    const finish = () => {
      pending -= 1;
      tex.needsUpdate = true;
      if (pending === 0) resolve(tex);
    };
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const url = `https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/${z}/${y}/${x}.jpg`;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
          finish();
        };
        img.onerror = () => finish();
        img.src = url;
      }
    }
    // Resolve immediately too — caller can swap in the texture as tiles paint.
    resolve(tex);
  });
  return marsTexturePromise;
}

function MarsGlobe({ listings, selectedId, hoveredId, onSelect, onHover }) {
  const mountRef = React.useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    camera.position.set(0, 0.4, 6.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    mount.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.inset = "0";
    labelRenderer.domElement.style.pointerEvents = "none";
    mount.appendChild(labelRenderer.domElement);

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.cos(phi);
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: "#ffffff",
        size: 0.18,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
      })
    );
    scene.add(stars);

    // Globe
    const placeholderTex = createMarsTexture();
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: placeholderTex,
      roughness: 0.95,
      metalness: 0.0,
    });
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2, 128, 128),
      globeMaterial
    );
    scene.add(globe);

    // Swap in the real Mars Trek texture as soon as it's available.
    let cancelTextureSwap = false;
    loadMarsGlobeTexture().then((tex) => {
      if (cancelTextureSwap) return;
      globeMaterial.map = tex;
      globeMaterial.needsUpdate = true;
    });

    // Atmosphere — Fresnel-style glow on a slightly larger inverted sphere.
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.18, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color("#f3a972") },
        },
        vertexShader: `
          varying vec3 vN;
          void main() {
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vN;
          void main() {
            float intensity = pow(0.55 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(glowColor, 1.0) * intensity;
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    scene.add(atmosphere);

    // Lighting
    scene.add(new THREE.AmbientLight("#f1c8a4", 1.6));
    const sun = new THREE.DirectionalLight("#fff4d8", 2.8);
    sun.position.set(5, 3, 6);
    scene.add(sun);

    // Markers — HTML pills overlaid via CSS2D
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);
    const markers = listings.map((listing) => {
      const el = document.createElement("button");
      el.className = "globe-pill";
      el.dataset.id = listing.id;
      el.textContent = shortMoney(listing.price);
      el.title = listing.title;
      el.style.pointerEvents = "auto";
      const obj = new CSS2DObject(el);
      obj.position.copy(marsToVector(listing.lat, listing.lon, 2.05));
      obj.userData = { id: listing.id };
      markersGroup.add(obj);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(listing);
      });
      el.addEventListener("mouseenter", () => onHover && onHover(listing.id));
      el.addEventListener("mouseleave", () => onHover && onHover(null));
      return { obj, el, listing };
    });

    // OrbitControls — drag to rotate, scroll to zoom.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.6;
    controls.minDistance = 3.4;
    controls.maxDistance = 12;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;

    // Halt auto-rotate as soon as the user interacts.
    const stopAuto = () => {
      controls.autoRotate = false;
    };
    renderer.domElement.addEventListener("pointerdown", stopAuto);
    renderer.domElement.addEventListener("wheel", stopAuto);

    // Frame loop with hover/select state and back-side hide.
    const camDir = new THREE.Vector3();
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Hide markers on the back side of the sphere.
      camera.getWorldDirection(camDir).negate(); // direction from origin to camera
      markers.forEach(({ obj, el, listing }) => {
        const worldPos = obj.getWorldPosition(new THREE.Vector3());
        const facing = worldPos.clone().normalize().dot(camDir);
        const hidden = facing < 0.05;
        const isSel = listing.id === selectedIdRef.current;
        const isHov = listing.id === hoveredIdRef.current;
        el.classList.toggle("hidden", hidden);
        el.classList.toggle("selected", isSel);
        el.classList.toggle("hovered", isHov);
      });

      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      labelRenderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      cancelTextureSwap = true;
      renderer.domElement.removeEventListener("pointerdown", stopAuto);
      renderer.domElement.removeEventListener("wheel", stopAuto);
      controls.dispose();
      markers.forEach(({ obj, el }) => {
        markersGroup.remove(obj);
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      if (labelRenderer.domElement.parentNode) {
        labelRenderer.domElement.parentNode.removeChild(
          labelRenderer.domElement
        );
      }
    };
    // We deliberately do not depend on listings/selectedId/hoveredId here
    // — those are read each frame via closures and the per-marker classes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-bind hover/select callbacks each render via refs.
  // (Markers are created once; their event handlers reference the closures
  // captured on first effect run, so we need to re-attach when callbacks
  // change. For our use, onSelect/onHover are stable enough — they're
  // passed as inline arrows from App but App is the parent. Simplification:
  // the per-frame loop handles class updates from selectedId/hoveredId via
  // captured refs below.)
  selectedIdRef.current = selectedId;
  hoveredIdRef.current = hoveredId;

  return (
    <div className="globe-canvas" ref={mountRef} aria-label="3D Mars globe">
      <div className="globe-hint">Drag to rotate · scroll to zoom</div>
    </div>
  );
}

const selectedIdRef = { current: null };
const hoveredIdRef = { current: null };

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
          onHover={onHover}
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

function DetailSidebar({ listing, onAgentClick }) {
  const [modal, setModal] = useState(null);
  const agent = listing.agentId ? agentsById[listing.agentId] : null;
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
      {agent && (
        <button
          className="agent-mini"
          onClick={() => onAgentClick(agent)}
          aria-label={`View profile for ${agent.name}`}
        >
          <Avatar name={agent.name} size={48} />
          <span className="agent-mini-text">
            <span className="agent-mini-kicker">Your agent</span>
            <strong>{agent.name}</strong>
            <span className="agent-mini-title">{agent.title}</span>
            <span className="agent-mini-rating">
              <StarRating value={agent.rating} count={agent.reviewCount} />
            </span>
          </span>
        </button>
      )}
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

function DetailPage({ listing, saved, onBack, onSave, onAgentClick }) {
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

          <DetailSidebar listing={listing} onAgentClick={onAgentClick} />
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

function Avatar({ name, size = 48 }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) % 360;
  }
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        background: `hsl(${h}, 36%, 32%)`,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function StarRating({ value, count }) {
  const full = Math.floor(value);
  const half = value - full >= 0.25 && value - full < 0.75;
  return (
    <span className="stars" aria-label={`${value.toFixed(2)} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        let cls = "star";
        if (i < full) cls += " full";
        else if (i === full && half) cls += " half";
        return (
          <span key={i} className={cls}>
            ★
          </span>
        );
      })}
      <span className="stars-meta">
        {value.toFixed(2)}
        {count != null && <> · {count} reviews</>}
      </span>
    </span>
  );
}

function PageHeader({ kicker, title, subtitle, children }) {
  return (
    <header className="page-header">
      {kicker && <span className="page-kicker">{kicker}</span>}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </header>
  );
}

function AgentCard({ agent, listingCount, onSelect }) {
  return (
    <button className="agent-card" onClick={() => onSelect(agent)}>
      <Avatar name={agent.name} size={56} />
      <div className="agent-card-body">
        <strong>{agent.name}</strong>
        <span className="agent-card-title">{agent.title}</span>
        <StarRating value={agent.rating} count={agent.reviewCount} />
        <span className="agent-card-stats">
          <b>{listingCount}</b> active · <b>{agent.transactions}</b> closed ·{" "}
          {agent.yearsExperience} yrs
        </span>
        <span className="agent-card-region">{agent.region}</span>
      </div>
    </button>
  );
}

function AgentsPage({ query, setQuery, sort, setSort, region, setRegion, onSelect }) {
  const regionOptions = useMemo(() => {
    const s = new Set(agents.map((a) => a.region));
    return ["All regions", ...Array.from(s)];
  }, []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return agents.filter((a) => {
      if (region !== "All regions" && a.region !== region) return false;
      if (!needle) return true;
      return [a.name, a.title, a.region, a.specialties.join(" "), a.bio]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query, region]);
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    else if (sort === "transactions")
      arr.sort((a, b) => b.transactions - a.transactions);
    else if (sort === "experience")
      arr.sort((a, b) => b.yearsExperience - a.yearsExperience);
    else if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [filtered, sort]);
  const counts = useMemo(() => {
    const m = {};
    listings.forEach((l) => {
      m[l.agentId] = (m[l.agentId] || 0) + 1;
    });
    return m;
  }, []);
  return (
    <main className="page">
      <PageHeader
        kicker="Agent finder"
        title="Find your Mars settlement agent"
        subtitle="Twelve specialists across hemispheres. Yes, they're all Musks."
      >
        <div className="agents-controls">
          <div className="searchbox">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, region, or specialty"
            />
          </div>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            {regionOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rating">Sort: highest rated</option>
            <option value="transactions">Sort: most closed</option>
            <option value="experience">Sort: most experienced</option>
            <option value="name">Sort: A → Z</option>
          </select>
        </div>
      </PageHeader>
      <div className="agents-grid">
        {sorted.map((a) => (
          <AgentCard
            key={a.id}
            agent={a}
            listingCount={counts[a.id] || 0}
            onSelect={onSelect}
          />
        ))}
        {sorted.length === 0 && (
          <div className="empty-state">
            <strong>No agents matched.</strong>
            <span>Try clearing the region or search.</span>
          </div>
        )}
      </div>
    </main>
  );
}

function AgentDetailPage({ agent, savedSet, onBackToAgents, onSelectListing, onSave }) {
  const [modal, setModal] = useState(false);
  const myListings = useMemo(
    () => listings.filter((l) => l.agentId === agent.id),
    [agent.id]
  );
  return (
    <main className="page">
      <button className="back-link" onClick={onBackToAgents}>
        <ArrowLeft size={16} /> All agents
      </button>
      <header className="agent-hero">
        <Avatar name={agent.name} size={120} />
        <div>
          <span className="page-kicker">Marsillow agent</span>
          <h1>{agent.name}</h1>
          <p className="agent-title">{agent.title}</p>
          <StarRating value={agent.rating} count={agent.reviewCount} />
          <p className="agent-motto">"{agent.motto}"</p>
          <div className="agent-badges">
            {agent.badges.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
        <div className="agent-cta">
          <button className="btn-block primary" onClick={() => setModal(true)}>
            Contact {agent.name.split(" ")[0]}
          </button>
          <div className="agent-contact">
            <span>{agent.phone}</span>
            <span>{agent.email}</span>
          </div>
        </div>
      </header>

      <section className="agent-stats-grid">
        <div>
          <b>{agent.transactions}</b>
          <span>Lifetime closings</span>
        </div>
        <div>
          <b>{myListings.length}</b>
          <span>Active listings</span>
        </div>
        <div>
          <b>{agent.yearsExperience}</b>
          <span>Years experience</span>
        </div>
        <div>
          <b>{agent.rating.toFixed(2)}</b>
          <span>Avg. rating</span>
        </div>
      </section>

      <section className="section">
        <h2>About {agent.name.split(" ")[0]}</h2>
        <p>{agent.bio}</p>
      </section>

      <section className="section">
        <h2>Specialties</h2>
        <div className="tag-row">
          {agent.specialties.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>

      {myListings.length > 0 && (
        <section className="section">
          <h2>{agent.name.split(" ")[0]}'s active listings</h2>
          <div className="agent-listings-grid">
            {myListings.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                hovered={false}
                saved={savedSet.has(l.id)}
                onSelect={onSelectListing}
                onHover={() => {}}
                onSave={onSave}
              />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>Recently sold by {agent.name.split(" ")[0]}</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Sale price</th>
              <th>Days on market</th>
            </tr>
          </thead>
          <tbody>
            {agent.soldRecent.map((s) => (
              <tr key={s.region}>
                <td>{s.region}</td>
                <td>{formatMoney(s.price)}</td>
                <td>{s.sols} sols</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {modal && (
        <ContactModal
          listing={{
            id: agent.id,
            title: agent.name,
            listingAgent: agent.name,
          }}
          kind="info"
          onClose={() => setModal(false)}
        />
      )}
    </main>
  );
}

function SavedPage({ savedSet, onBack, onSelectListing, onSave }) {
  const saved = listings.filter((l) => savedSet.has(l.id));
  return (
    <main className="page">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> Back to search
      </button>
      <PageHeader
        kicker="Your favorites"
        title="Saved parcels"
        subtitle={`${saved.length} ${
          saved.length === 1 ? "parcel" : "parcels"
        } saved`}
      />
      {saved.length === 0 ? (
        <div className="empty-state">
          <strong>No saved parcels yet.</strong>
          <span>Tap the heart on any listing to save it for later.</span>
        </div>
      ) : (
        <div className="agent-listings-grid">
          {saved.map((l) => (
            <ListingCard
              key={l.id}
              listing={l}
              hovered={false}
              saved
              onSelect={onSelectListing}
              onHover={() => {}}
              onSave={onSave}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function MarsLoansPage({ onBack, listings: ls, onSelectListing }) {
  const [price, setPrice] = useState(15100000);
  const [downPct, setDownPct] = useState(20);
  const [termYears, setTermYears] = useState(30);
  const apr = 0.085; // playful rate
  const principal = price * (1 - downPct / 100);
  const months = termYears * 12;
  const r = apr / 12;
  const monthly =
    months > 0 && r > 0
      ? (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1)
      : 0;
  const totalInterest = monthly * months - principal;
  // Slice the monthly payment into roughly one Earth month's worth of sols.
  const sols = Math.round(monthly / 30);
  return (
    <main className="page">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> Back to search
      </button>
      <PageHeader
        kicker="Mars Loans"
        title="Refinance your parcel — at interplanetary rates"
        subtitle="Use Marsillow's terraform-mortgage calculator to plan your monthly payment in sols. Inter-orbital prime rate today: 8.50%."
      />
      <div className="loans-layout">
        <div className="loan-form">
          <label>
            <span>Parcel price</span>
            <input
              type="number"
              min="100000"
              step="100000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
          </label>
          <label>
            <span>Down payment ({downPct}%)</span>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
            />
          </label>
          <label>
            <span>Loan term ({termYears} years)</span>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
            />
          </label>
          <p className="loan-note">
            Marsillow's terraform-mortgage assumes 1 sol = 24h 39m and a fixed
            inter-orbital prime rate of <b>8.50% APR</b>. Down payment is
            collected on Earth; principal is escrowed in low-Mars orbit.
          </p>
        </div>
        <div className="loan-summary">
          <div className="loan-stat hero">
            <b>{formatMoney(Math.round(monthly))}</b>
            <span>per month · ~{formatMoney(sols)} per sol</span>
          </div>
          <div className="loan-stat">
            <b>{formatMoney(Math.round(principal))}</b>
            <span>Loan principal</span>
          </div>
          <div className="loan-stat">
            <b>{formatMoney(Math.round(totalInterest))}</b>
            <span>Total interest over {termYears} years</span>
          </div>
          <div className="loan-stat">
            <b>{formatMoney(Math.round(price * (downPct / 100)))}</b>
            <span>Down payment ({downPct}% of {formatMoney(price)})</span>
          </div>
          <button className="btn-block primary">Get pre-qualified</button>
        </div>
      </div>
      <section className="section">
        <h2>Pre-qualify against an active listing</h2>
        <div className="agent-listings-grid">
          {ls.slice(0, 3).map((l) => (
            <button
              key={l.id}
              className="loan-listing-pick"
              onClick={() => {
                setPrice(l.price);
                onSelectListing(null); // stay on this page; just update inputs
              }}
            >
              <img src={l.image} alt={l.region} />
              <div>
                <strong>{l.title}</strong>
                <span>{formatMoney(l.price)} · {l.acres} acres</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function RentalCard({ rental, onSelect, onAgentClick }) {
  const agent = rental.agentId ? agentsById[rental.agentId] : null;
  return (
    <article className="rental-card">
      <button className="card-photo" onClick={() => onSelect(rental)}>
        <img src={rental.image} alt={rental.region} />
        <span className="card-ribbon">
          {rental.kind === "short-term" ? "Short-term" : "Long-term"}
        </span>
      </button>
      <div className="rental-body">
        <div className="rental-price-row">
          <strong className="rental-price">
            {rental.kind === "short-term"
              ? `${formatMoney(rental.pricePerSol)}/sol`
              : `${formatMoney(rental.monthlyRent)}/mo`}
          </strong>
          <span className="rental-min">Min stay {rental.minStay}</span>
        </div>
        <div className="rental-name">{rental.name}</div>
        <div className="rental-stats">
          <b>{rental.habPads}</b> hab pads · <b>{rental.recyclerSuites}</b>{" "}
          recyclers · sleeps <b>{rental.sleeps}</b>
        </div>
        <div className="rental-region">{rental.region}</div>
        <div className="rental-amenities">
          {rental.amenities.slice(0, 2).map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        {agent && (
          <button
            className="rental-agent"
            onClick={() => onAgentClick(agent)}
          >
            <Avatar name={agent.name} size={28} />
            <span>{agent.name}</span>
          </button>
        )}
      </div>
    </article>
  );
}

function RentalDetail({ rental, onBack, onAgentClick }) {
  const [modal, setModal] = useState(null);
  const agent = rental.agentId ? agentsById[rental.agentId] : null;
  return (
    <main className="page">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> All rentals
      </button>
      <div className="gallery gallery-one">
        <div className="gallery-main">
          <img src={rental.image} alt={rental.region} />
          <span className="all-photos">
            <Camera size={14} /> See all photos
          </span>
        </div>
      </div>
      <div className="detail-grid">
        <div>
          <div style={{ marginTop: 18 }}>
            <span className="status-pill">
              <i style={{ background: "#0a7d3a" }} />{" "}
              {rental.kind === "short-term" ? "Available now" : "Leasing"}
            </span>
          </div>
          <div className="detail-price">
            {rental.kind === "short-term"
              ? `${formatMoney(rental.pricePerSol)}/sol`
              : `${formatMoney(rental.monthlyRent)}/mo`}
          </div>
          <div className="detail-stats">
            <span>
              <BedDouble size={20} /> <b>{rental.habPads}</b> hab pads
            </span>
            <span>
              <Bath size={20} /> <b>{rental.recyclerSuites}</b> recyclers
            </span>
            <span>
              <HomeIcon size={20} /> sleeps <b>{rental.sleeps}</b>
            </span>
          </div>
          <div className="detail-address">
            {rental.name} · {rental.region}
          </div>
          <section className="section">
            <h2>About this rental</h2>
            <p>{rental.description}</p>
          </section>
          <section className="section">
            <h2>Amenities</h2>
            <ul className="check-list">
              {rental.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
          <section className="section">
            <h2>Stay rules</h2>
            <ul className="check-list">
              <li>Minimum stay {rental.minStay}</li>
              <li>{rental.furnished ? "Furnished" : "Unfurnished"}</li>
              <li>Cancel up to 6 hours before check-in (short-term)</li>
              <li>Pressurization, water, and recyclers included</li>
            </ul>
          </section>
        </div>
        <aside className="detail-side">
          <div className="cta-card">
            <h3>{rental.kind === "short-term" ? "Book this stay" : "Inquire about this lease"}</h3>
            <p>
              {rental.kind === "short-term"
                ? "Reserve your sols. Marsillow holds your booking until you confirm boarding."
                : "Schedule a walkthrough or apply for the lease through your Marsillow agent."}
            </p>
            <div className="stack">
              <button
                className="btn-block primary"
                onClick={() => setModal("tour")}
              >
                {rental.kind === "short-term" ? "Reserve dates" : "Apply for lease"}
              </button>
              <button
                className="btn-block outline"
                onClick={() => setModal("info")}
              >
                Ask a question
              </button>
            </div>
          </div>
          {agent && (
            <button
              className="agent-mini"
              onClick={() => onAgentClick(agent)}
            >
              <Avatar name={agent.name} size={48} />
              <span className="agent-mini-text">
                <span className="agent-mini-kicker">Your host's agent</span>
                <strong>{agent.name}</strong>
                <span className="agent-mini-title">{agent.title}</span>
              </span>
            </button>
          )}
        </aside>
      </div>
      {modal && (
        <ContactModal
          listing={{
            id: rental.id,
            title: rental.name,
            listingAgent: agent ? agent.name : "Marsillow rentals desk",
          }}
          kind={modal}
          onClose={() => setModal(null)}
        />
      )}
    </main>
  );
}

function RentPage({ kind, setKind, region, setRegion, sort, setSort, onSelect, onAgentClick }) {
  const regionOptions = useMemo(() => {
    const s = new Set(rentals.map((r) => r.region));
    return ["All regions", ...Array.from(s)];
  }, []);
  const filtered = useMemo(() => {
    return rentals.filter((r) => {
      if (kind !== "all" && r.kind !== kind) return false;
      if (region !== "All regions" && r.region !== region) return false;
      return true;
    });
  }, [kind, region]);
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const priceOf = (r) =>
      r.kind === "short-term" ? r.pricePerSol : r.monthlyRent;
    if (sort === "priceAsc") arr.sort((a, b) => priceOf(a) - priceOf(b));
    else if (sort === "priceDesc") arr.sort((a, b) => priceOf(b) - priceOf(a));
    else if (sort === "sleeps") arr.sort((a, b) => b.sleeps - a.sleeps);
    return arr;
  }, [filtered, sort]);

  const counts = {
    all: rentals.length,
    "long-term": rentals.filter((r) => r.kind === "long-term").length,
    "short-term": rentals.filter((r) => r.kind === "short-term").length,
  };

  return (
    <main className="page">
      <PageHeader
        kicker="Rent on Mars"
        title="Mars rentals & habitat leases"
        subtitle="Long-term hab leases for engineers on rotation. Short-term stays for the curious."
      >
        <div className="agents-controls">
          <div className="seg-control" role="tablist">
            <button
              className={kind === "all" ? "active" : ""}
              onClick={() => setKind("all")}
            >
              All ({counts.all})
            </button>
            <button
              className={kind === "long-term" ? "active" : ""}
              onClick={() => setKind("long-term")}
            >
              Long-term ({counts["long-term"]})
            </button>
            <button
              className={kind === "short-term" ? "active" : ""}
              onClick={() => setKind("short-term")}
            >
              Short-term ({counts["short-term"]})
            </button>
          </div>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            {regionOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="picks">Sort: Marsillow Picks</option>
            <option value="priceAsc">Sort: Price (Low to High)</option>
            <option value="priceDesc">Sort: Price (High to Low)</option>
            <option value="sleeps">Sort: Sleeps the most</option>
          </select>
        </div>
      </PageHeader>
      <div className="rentals-grid">
        {sorted.length === 0 ? (
          <div className="empty-state">
            <strong>No rentals match.</strong>
            <span>Try clearing the region or kind.</span>
          </div>
        ) : (
          sorted.map((r) => (
            <RentalCard
              key={r.id}
              rental={r}
              onSelect={onSelect}
              onAgentClick={onAgentClick}
            />
          ))
        )}
      </div>
    </main>
  );
}

function SellPage({ onAgentClick, onBack }) {
  const [form, setForm] = useState({
    region: "Jezero Crater, Mars",
    propertyType: "Lakebed parcel",
    acres: 38,
    lat: 18.4,
  });
  const [estimate, setEstimate] = useState(null);
  const update = (patch) => setForm({ ...form, ...patch });
  const submit = (e) => {
    e.preventDefault();
    setEstimate(estimateParcelValue(form));
  };
  const matchedAgent = useMemo(() => {
    const byType = agents.find((a) => a.specialties.includes(form.propertyType));
    return byType || agents[0];
  }, [form.propertyType]);

  return (
    <main className="page">
      <PageHeader
        kicker="Sell on Marsillow"
        title="The fastest way to sell a Mars parcel"
        subtitle="Get an instant Marsestimate®, match with a settlement specialist, and close in under 90 sols on average."
      />
      <section className="sell-stats">
        <div>
          <b>$284M</b>
          <span>Sold on Marsillow in 2026</span>
        </div>
        <div>
          <b>27 sols</b>
          <span>Median time on market</span>
        </div>
        <div>
          <b>97%</b>
          <span>Of sellers match an agent in under 1 sol</span>
        </div>
        <div>
          <b>2.4%</b>
          <span>Closing fee. No listing fees.</span>
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <div className="how-grid">
          <div>
            <span className="step">1</span>
            <strong>Tell us about your parcel</strong>
            <p>Region, lat/lon, acreage, parcel type. Takes a minute.</p>
          </div>
          <div>
            <span className="step">2</span>
            <strong>Get an instant Marsestimate®</strong>
            <p>We benchmark against rover-validated comps, water access, and pressure advantage.</p>
          </div>
          <div>
            <span className="step">3</span>
            <strong>Match with a Musk</strong>
            <p>One of our 12 specialists takes the lead, prices the listing, and handles tours.</p>
          </div>
          <div>
            <span className="step">4</span>
            <strong>Close in 27 sols (median)</strong>
            <p>Title moves on the Marsillow Title Ledger. You wire the down payment, we wire the rest.</p>
          </div>
        </div>
      </section>

      <section className="section sell-form-section">
        <h2>Get your free Marsestimate®</h2>
        <form className="sell-form" onSubmit={submit}>
          <label>
            <span>Region</span>
            <input
              value={form.region}
              onChange={(e) => update({ region: e.target.value })}
              required
            />
          </label>
          <label>
            <span>Parcel type</span>
            <select
              value={form.propertyType}
              onChange={(e) => update({ propertyType: e.target.value })}
            >
              {PARCEL_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Acreage</span>
            <input
              type="number"
              min="1"
              step="1"
              value={form.acres}
              onChange={(e) => update({ acres: Number(e.target.value) || 0 })}
            />
          </label>
          <label>
            <span>Latitude</span>
            <input
              type="number"
              step="0.01"
              value={form.lat}
              onChange={(e) => update({ lat: Number(e.target.value) || 0 })}
            />
          </label>
          <button className="btn-primary" type="submit">
            Get Marsestimate®
          </button>
        </form>
        {estimate && (
          <div className="estimate-result">
            <div>
              <span className="page-kicker">Your Marsestimate®</span>
              <strong>{formatMoney(estimate.center)}</strong>
              <span className="estimate-range">
                Range: {formatMoney(estimate.low)} –{" "}
                {formatMoney(estimate.high)}
              </span>
            </div>
            <div className="match-card">
              <Avatar name={matchedAgent.name} size={48} />
              <div>
                <span className="page-kicker">Suggested agent</span>
                <strong>{matchedAgent.name}</strong>
                <span>{matchedAgent.title}</span>
              </div>
              <button
                className="btn-block primary"
                onClick={() => onAgentClick(matchedAgent)}
              >
                View profile
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Why sellers pick Marsillow</h2>
        <div className="why-grid">
          <div>
            <ShieldCheck size={20} />
            <strong>Pricing you can trust</strong>
            <p>Marsestimate® uses rover-validated comps and is updated every cycle.</p>
          </div>
          <div>
            <Sparkles size={20} />
            <strong>Twelve specialist Musks</strong>
            <p>Match with an agent who knows your hemisphere, your parcel type, and your buyer pool.</p>
          </div>
          <div>
            <Globe2 size={20} />
            <strong>Off-world title</strong>
            <p>Every Marsillow sale closes onto the Marsillow Title Ledger, mirrored at three orbital relays.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Recent sellers say</h2>
        <div className="testimonial-grid">
          {SELL_TESTIMONIALS.map((t) => (
            <blockquote key={t.name}>
              <p>"{t.quote}"</p>
              <footer>
                <strong>{t.name}</strong>
                <span>
                  {t.listing} · sold in {t.saleDays} sols
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}

function HelpPage({ query, setQuery, category, setCategory }) {
  const [openId, setOpenId] = useState(null);
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return HELP_FAQ.filter((f) => {
      if (category && f.category !== category) return false;
      if (!needle) return true;
      return (f.q + " " + f.a + " " + f.category).toLowerCase().includes(needle);
    });
  }, [query, category]);

  return (
    <main className="page">
      <PageHeader
        kicker="Marsillow Help"
        title="How can we help?"
        subtitle="Search our knowledge base or pick a category."
      >
        <div className="help-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "rover tour" or "Marsestimate"'
          />
        </div>
      </PageHeader>

      <section className="help-categories">
        {HELP_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`help-category ${category === c.id ? "active" : ""}`}
            onClick={() => setCategory(category === c.id ? null : c.id)}
          >
            <strong>{c.label}</strong>
            <span>{c.desc}</span>
          </button>
        ))}
      </section>

      <section className="section">
        <h2>
          {category ? `${category} questions` : "Most asked"}{" "}
          <span style={{ color: "var(--ink-muted)", fontWeight: 500 }}>
            ({matches.length})
          </span>
        </h2>
        <div className="faq-list">
          {matches.length === 0 ? (
            <div className="empty-state">
              <strong>No articles matched.</strong>
              <span>Try clearing the category or searching for a different term.</span>
            </div>
          ) : (
            matches.map((f, i) => {
              const id = `${f.category}-${i}`;
              const open = openId === id;
              return (
                <div key={id} className={`faq-item ${open ? "open" : ""}`}>
                  <button
                    className="faq-q"
                    onClick={() => setOpenId(open ? null : id)}
                    aria-expanded={open}
                  >
                    <span>{f.q}</span>
                    <ChevronDown size={16} />
                  </button>
                  {open && (
                    <div className="faq-a">
                      <span className="faq-cat">{f.category}</span>
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="section help-contact">
        <h2>Still need help?</h2>
        <div className="contact-grid">
          <div>
            <strong>Live chat</strong>
            <p>Marsillow concierge · Earth and Mars hours</p>
            <button className="btn-outline">Start chat</button>
          </div>
          <div>
            <strong>Phone</strong>
            <p>+1 (555) 010-MARS · Average wait 1.4 minutes</p>
            <button className="btn-outline">Call us</button>
          </div>
          <div>
            <strong>Email</strong>
            <p>help@marsillow.com · Replies within 1 sol</p>
            <button className="btn-outline">Send email</button>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("map");
  const [hoveredId, setHoveredId] = useState(null);
  const [savedSet, setSavedSet] = useState(() => new Set());
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("picks");
  const [savedSearch, setSavedSearch] = useState(false);
  const [page, setPage] = useState({ kind: "search" });
  const [agentQuery, setAgentQuery] = useState("");
  const [agentSort, setAgentSort] = useState("rating");
  const [agentRegion, setAgentRegion] = useState("All regions");
  const [rentKind, setRentKind] = useState("all");
  const [rentRegion, setRentRegion] = useState("All regions");
  const [rentSort, setRentSort] = useState("picks");
  const [helpQuery, setHelpQuery] = useState("");
  const [helpCategory, setHelpCategory] = useState(null);

  const navigate = (next) => {
    window.scrollTo(0, 0);
    setPage(next);
  };

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

  const goSearch = () => navigate({ kind: "search" });
  const goAgents = () => navigate({ kind: "agents" });
  const goAgent = (agent) => navigate({ kind: "agent", agent });
  const goDetail = (listing) => navigate({ kind: "detail", listing });
  const goSaved = () => navigate({ kind: "saved" });
  const goLoans = () => navigate({ kind: "loans" });
  const goRent = () => navigate({ kind: "rent" });
  const goRental = (rental) => navigate({ kind: "rental", rental });
  const goSell = () => navigate({ kind: "sell" });
  const goHelp = () => navigate({ kind: "help" });

  const renderPage = () => {
    switch (page.kind) {
      case "detail":
        return (
          <DetailPage
            listing={page.listing}
            saved={savedSet.has(page.listing.id)}
            onBack={goSearch}
            onSave={toggleSave}
            onAgentClick={goAgent}
          />
        );
      case "agents":
        return (
          <AgentsPage
            query={agentQuery}
            setQuery={setAgentQuery}
            sort={agentSort}
            setSort={setAgentSort}
            region={agentRegion}
            setRegion={setAgentRegion}
            onSelect={goAgent}
          />
        );
      case "agent":
        return (
          <AgentDetailPage
            agent={page.agent}
            savedSet={savedSet}
            onBackToAgents={goAgents}
            onSelectListing={goDetail}
            onSave={toggleSave}
          />
        );
      case "saved":
        return (
          <SavedPage
            savedSet={savedSet}
            onBack={goSearch}
            onSelectListing={goDetail}
            onSave={toggleSave}
          />
        );
      case "loans":
        return (
          <MarsLoansPage
            onBack={goSearch}
            listings={sorted}
            onSelectListing={goDetail}
          />
        );
      case "rent":
        return (
          <RentPage
            kind={rentKind}
            setKind={setRentKind}
            region={rentRegion}
            setRegion={setRentRegion}
            sort={rentSort}
            setSort={setRentSort}
            onSelect={goRental}
            onAgentClick={goAgent}
          />
        );
      case "rental":
        return (
          <RentalDetail
            rental={page.rental}
            onBack={goRent}
            onAgentClick={goAgent}
          />
        );
      case "sell":
        return <SellPage onAgentClick={goAgent} onBack={goSearch} />;
      case "help":
        return (
          <HelpPage
            query={helpQuery}
            setQuery={setHelpQuery}
            category={helpCategory}
            setCategory={setHelpCategory}
          />
        );
      default:
        return (
          <>
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
                onSelect={goDetail}
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
                onSelect={goDetail}
                onHover={setHoveredId}
                onSave={toggleSave}
              />
            </div>
          </>
        );
    }
  };

  return (
    <>
      <TopNav
        saved={savedSet.size}
        onBrandClick={(e) => {
          e.preventDefault();
          goSearch();
        }}
        onAgents={goAgents}
        onSaved={goSaved}
        onLoans={goLoans}
        onBuy={goSearch}
        onRent={goRent}
        onSell={goSell}
        onHelp={goHelp}
      />
      {renderPage()}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
