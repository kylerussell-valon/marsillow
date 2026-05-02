import React, { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bath,
  BedDouble,
  ChevronLeft,
  Compass,
  ExternalLink,
  Globe2,
  Map,
  Mountain,
  Orbit,
  PanelLeftClose,
  PanelLeftOpen,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import * as THREE from "three";
import "./styles.css";

const listings = [
  {
    id: "jez-delta-01",
    title: "Jezero Delta Terraces",
    region: "Jezero Crater",
    lat: 18.4446,
    lon: 77.4509,
    elevation: -2550,
    acres: 38.4,
    price: 18400000,
    valueSignal: "Ancient lake delta, confirmed rover science corridor",
    futureUse: "Bioheritage district, waterfront research village",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 96,
    rover: "Perseverance",
    route: "Octavia E. Butler Landing to delta front",
    image:
      "https://images-assets.nasa.gov/image/PIA24485/PIA24485~small.jpg",
    imageCredit: "NASA/JPL-Caltech/ASU/MSSS",
    source:
      "https://mars.nasa.gov/mars2020/mission/where-is-the-rover/",
    tags: ["Delta", "Sample cache", "Lakebed", "Prime science"],
    description:
      "A compact premium block along Jezero's western fan, priced for a terraformed future where preserved delta strata, shallow basin water access, and Perseverance sample-cache adjacency create durable civic and scientific scarcity.",
    facts: [
      "Perseverance landed in Jezero on February 18, 2021.",
      "Jezero contains a preserved river delta interpreted as evidence of an ancient lake.",
      "The plot sits near the rover's high-value campaign area rather than the crater rim.",
    ],
  },
  {
    id: "gale-sharp-02",
    title: "Aeolis Palisades at Mount Sharp",
    region: "Gale Crater / Aeolis Mons",
    lat: -4.5895,
    lon: 137.4417,
    elevation: -4500,
    acres: 52.8,
    price: 15100000,
    valueSignal: "Long-duration Curiosity traverse and layered mountain geology",
    futureUse: "Vertical climate archive, slopefront estates",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 91,
    rover: "Curiosity",
    route: "Bradbury Landing toward lower Mount Sharp",
    image:
      "https://images-assets.nasa.gov/image/PIA16032/PIA16032~small.jpg",
    imageCredit: "NASA/JPL-Caltech/MSSS",
    source: "https://mars.nasa.gov/msl/mission/where-is-the-rover/",
    tags: ["Layered terrain", "Crater basin", "Long traverse", "Protected views"],
    description:
      "A view-forward basin parcel at the base of Aeolis Mons, valued for terraced geology, strong navigation precedent from Curiosity, and likely civic importance once Gale's deep lowland microclimate becomes livable.",
    facts: [
      "Curiosity landed in Gale Crater on August 6, 2012 UTC.",
      "Mount Sharp exposes layered sedimentary records in the crater interior.",
      "Low crater elevation supports the pricing model's future pressure and water-retention premium.",
    ],
  },
  {
    id: "meridiani-03",
    title: "Meridiani Blueberry Flats",
    region: "Meridiani Planum",
    lat: -1.9462,
    lon: 354.4734,
    elevation: -1400,
    acres: 84.2,
    price: 12900000,
    valueSignal: "Opportunity heritage corridor and hematite-rich plains",
    futureUse: "Equatorial logistics grid, heritage promenade",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 87,
    rover: "Opportunity",
    route: "Eagle Crater to Endeavour rim district",
    image:
      "https://images-assets.nasa.gov/image/PIA05273/PIA05273~small.jpg",
    imageCredit: "NASA/JPL-Caltech/Cornell Univ./Arizona State Univ.",
    source: "https://mars.nasa.gov/mer/mission/rover-status/opportunity/",
    tags: ["Equatorial", "Heritage route", "Flat build", "Hematite"],
    description:
      "A broad equatorial tract near Opportunity's historic traverse, carrying logistics value from flat constructability and cultural value from one of the most important surface exploration routes in planetary history.",
    facts: [
      "Opportunity explored Meridiani Planum from 2004 until 2018.",
      "The region is known for hematite-bearing spherules nicknamed blueberries.",
      "The pricing model favors equatorial daylight and low grading cost.",
    ],
  },
  {
    id: "gusev-04",
    title: "Columbia Hills Preserve",
    region: "Gusev Crater",
    lat: -14.5684,
    lon: 175.4726,
    elevation: -1900,
    acres: 67.5,
    price: 9400000,
    valueSignal: "Spirit traverse, volcanic plains, Columbia Hills outcrops",
    futureUse: "Geothermal resort edge, protected science park",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 82,
    rover: "Spirit",
    route: "Columbia Memorial Station to Home Plate",
    image:
      "https://images-assets.nasa.gov/image/PIA06960/PIA06960~medium.jpg",
    imageCredit: "NASA/JPL-Caltech/Cornell",
    source: "https://mars.nasa.gov/mer/mission/rover-status/spirit/",
    tags: ["Columbia Hills", "Volcanic", "Historic", "Southern tropics"],
    description:
      "A protected district in the Columbia Hills influence zone, priced below Jezero and Gale because of lower basin-water upside, but supported by volcanic diversity and Spirit mission heritage.",
    facts: [
      "Spirit landed in Gusev Crater on January 4, 2004 UTC.",
      "The Columbia Hills provided key geologic diversity after the rover crossed basaltic plains.",
      "The model assigns heritage value while discounting for rougher access.",
    ],
  },
  {
    id: "elysium-05",
    title: "Elysium Quiet Basin",
    region: "Elysium Planitia",
    lat: 4.5024,
    lon: 135.6234,
    elevation: -2600,
    acres: 120,
    price: 8700000,
    valueSignal: "InSight geophysics baseline and smooth lowland terrain",
    futureUse: "Seismic observatory suburb, infrastructure yard",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 78,
    rover: "InSight lander",
    route: "Static geophysics station",
    image:
      "https://images-assets.nasa.gov/image/PIA22232/PIA22232~medium.jpg",
    imageCredit: "NASA/JPL-Caltech",
    source: "https://mars.nasa.gov/insight/mission/where-is-the-lander/",
    tags: ["Lowland", "Smooth terrain", "Seismic", "Infrastructure"],
    description:
      "A large, buildable lowland tract around the InSight setting, valued less for scenery and more for early infrastructure suitability, pressure advantage, and settlement operations.",
    facts: [
      "InSight landed in Elysium Planitia on November 26, 2018.",
      "The landing ellipse was selected for smooth, safe terrain.",
      "Flat lowlands receive a construction multiplier in the terraformed-pricing model.",
    ],
  },
  {
    id: "utopia-06",
    title: "Utopia Ice Rights",
    region: "Utopia Planitia",
    lat: 48.269,
    lon: 134.0,
    elevation: -4100,
    acres: 210,
    price: 11200000,
    valueSignal: "Northern lowland basin and suspected shallow ice resources",
    futureUse: "Reservoir-adjacent agriculture, polar logistics",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 84,
    rover: "Zhurong / Viking 2 heritage region",
    route: "Utopia basin exploration zone",
    image:
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia17/pia17633/PIA17633.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1800&w=2880",
    imageCredit: "NASA/JPL-Caltech/Univ. of Arizona",
    source:
      "https://science.nasa.gov/photojournal/utopia-planitias-surface/",
    tags: ["Ice potential", "Northern lowland", "Agriculture", "Large tract"],
    description:
      "A northern-basin land bank where future terraforming converts low elevation and near-surface volatile potential into agricultural and water-rights value. Higher latitude tempers near-term demand but boosts long-duration utility.",
    facts: [
      "Utopia Planitia is a vast northern lowland impact basin.",
      "Viking 2 operated in Utopia Planitia after landing in 1976.",
      "The model prices water access and basin-scale agriculture as future-state advantages.",
    ],
  },
  {
    id: "valles-07",
    title: "Noctis Canyon Rim",
    region: "Valles Marineris / Noctis Labyrinthus",
    lat: -7.0,
    lon: 263.0,
    elevation: -3200,
    acres: 45.6,
    price: 16700000,
    valueSignal: "Canyon rim scarcity and spectacular terraformed viewshed",
    futureUse: "Canyonfront cultural capital, cliffside transit hub",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 90,
    rover: "Orbital reconnaissance",
    route: "Future canyon access corridor",
    image:
      "https://mars.nasa.gov/system/resources/detail_files/3313_20100723_VMselectD512-full2.jpg",
    imageCredit: "NASA/JPL-Caltech",
    source:
      "https://science.nasa.gov/resource/valles-marineris-the-grand-canyon-of-mars/",
    tags: ["Canyon rim", "Viewshed", "Scarcity", "Transit"],
    description:
      "A tightly held rim parcel near the western Valles Marineris system, priced for future cultural and tourism demand once atmosphere, water management, and slope stabilization make canyonfront development possible.",
    facts: [
      "Valles Marineris is the largest canyon system on Mars.",
      "No rover has driven this parcel; the listing uses orbital geography rather than surface traverse data.",
      "The pricing model treats viewshed scarcity as a post-terraforming premium.",
    ],
  },
  {
    id: "olympus-08",
    title: "Olympus Aureole Reserve",
    region: "Olympus Mons",
    lat: 18.65,
    lon: 226.2,
    elevation: 21200,
    acres: 95.3,
    price: 7600000,
    valueSignal: "Iconic volcano adjacency, high-altitude tourism risk",
    futureUse: "Aerosport base, protected volcanic monument",
    bedrooms: "hab pads",
    baths: "recycler suites",
    score: 75,
    rover: "Orbital reconnaissance",
    route: "Future Tharsis tourism corridor",
    image:
      "https://mars.nasa.gov/system/resources/detail_files/21948_PIA22581_hires.jpg",
    imageCredit: "NASA/JPL-Caltech/ASU",
    source:
      "https://science.nasa.gov/resource/olympus-mons-the-largest-volcano-in-the-solar-system/",
    tags: ["Volcano", "Tourism", "High elevation", "Tharsis"],
    description:
      "A marquee-name holding on the Olympus Mons aureole. It is visually unmatched, but the price is moderated because very high elevation remains harder to pressurize and terraform than northern and equatorial lowlands.",
    facts: [
      "Olympus Mons is the largest volcano in the solar system.",
      "The listing is based on orbital topography rather than rover access.",
      "The future-state model discounts extreme elevation despite the landmark premium.",
    ],
  },
];

const roverRoutes = [
  {
    name: "Perseverance",
    color: "#37a3ff",
    points: [
      [18.4446, 77.4509],
      [18.455, 77.42],
      [18.47, 77.39],
      [18.49, 77.36],
    ],
  },
  {
    name: "Curiosity",
    color: "#f6c15b",
    points: [
      [-4.5895, 137.4417],
      [-4.64, 137.39],
      [-4.7, 137.35],
      [-4.78, 137.32],
    ],
  },
  {
    name: "Opportunity",
    color: "#6fd080",
    points: [
      [-1.9462, 354.4734],
      [-2.0, 354.2],
      [-2.18, 354.0],
      [-2.28, 354.78],
    ],
  },
  {
    name: "Spirit",
    color: "#ff8d71",
    points: [
      [-14.5684, 175.4726],
      [-14.61, 175.51],
      [-14.64, 175.54],
      [-14.58, 175.59],
    ],
  },
];

const sources = [
  {
    label: "NASA Mars 2020 rover location",
    url: "https://mars.nasa.gov/mars2020/mission/where-is-the-rover/",
  },
  {
    label: "NASA Curiosity rover location",
    url: "https://mars.nasa.gov/msl/mission/where-is-the-rover/",
  },
  {
    label: "NASA MER Opportunity status",
    url: "https://mars.nasa.gov/mer/mission/rover-status/opportunity/",
  },
  {
    label: "NASA MER Spirit status",
    url: "https://mars.nasa.gov/mer/mission/rover-status/spirit/",
  },
  {
    label: "NASA InSight lander location",
    url: "https://mars.nasa.gov/insight/mission/where-is-the-lander/",
  },
  {
    label: "NASA Valles Marineris feature page",
    url: "https://science.nasa.gov/resource/valles-marineris-the-grand-canyon-of-mars/",
  },
  {
    label: "NASA Olympus Mons feature page",
    url: "https://science.nasa.gov/resource/olympus-mons-the-largest-volcano-in-the-solar-system/",
  },
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
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

function MarsGlobe({ selected, setSelected }) {
  const mountRef = React.useRef(null);

  React.useEffect(() => {
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
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(listing.id === selected.id ? 0.055 : 0.038, 24, 24),
        new THREE.MeshBasicMaterial({
          color: listing.id === selected.id ? "#fef3c7" : "#7dd3fc",
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
        setSelected(listing);
      }
    };
    renderer.domElement.addEventListener("click", handleClick);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.0018;
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
  }, [selected.id, setSelected]);

  return <div className="globe-canvas" ref={mountRef} aria-label="Interactive 3D Mars globe" />;
}

function MarsMap({ selected, setSelected }) {
  return (
    <div className="map-panel">
      <svg className="mars-map" viewBox="0 0 1000 500" role="img" aria-label="Equirectangular Mars map with listings and rover traverses">
        <defs>
          <linearGradient id="mapBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c97f5d" />
            <stop offset="45%" stopColor="#8b442d" />
            <stop offset="100%" stopColor="#d18b60" />
          </linearGradient>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="3" />
            <feColorMatrix type="saturate" values=".4" />
            <feBlend mode="multiply" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect width="1000" height="500" fill="url(#mapBase)" />
        <g opacity=".34" filter="url(#grain)">
          <ellipse cx="630" cy="270" rx="240" ry="38" fill="#351b16" />
          <ellipse cx="286" cy="198" rx="70" ry="44" fill="#4e2a21" />
          <ellipse cx="880" cy="255" rx="190" ry="52" fill="#b45f3a" />
          <ellipse cx="628" cy="198" rx="95" ry="55" fill="#e1a06c" />
          <ellipse cx="410" cy="116" rx="240" ry="88" fill="#e3a56f" />
          <ellipse cx="380" cy="360" rx="180" ry="54" fill="#5b2c20" />
        </g>
        <g opacity=".28" stroke="#ffe2bb" strokeWidth="1">
          {[100, 200, 300, 400].map((y) => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y} />
          ))}
          {[125, 250, 375, 500, 625, 750, 875].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="500" />
          ))}
        </g>
        {roverRoutes.map((routeItem) => {
          const points = routeItem.points
            .map(([lat, lon]) => {
              const point = marsToXY(lat, lon);
              return `${point.x * 10},${point.y * 5}`;
            })
            .join(" ");
          return (
            <polyline
              key={routeItem.name}
              points={points}
              fill="none"
              stroke={routeItem.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".84"
            />
          );
        })}
        {listings.map((listing) => {
          const point = marsToXY(listing.lat, listing.lon);
          const isSelected = listing.id === selected.id;
          const labelLeft = point.x > 82;
          return (
            <g
              key={listing.id}
              className="map-marker"
              transform={`translate(${point.x * 10} ${point.y * 5})`}
              onClick={() => setSelected(listing)}
            >
              <circle r={isSelected ? 13 : 9} fill={isSelected ? "#fff4ca" : "#dff7ff"} />
              <circle r={isSelected ? 21 : 15} fill="none" stroke={isSelected ? "#fff4ca" : "#dff7ff"} opacity=".35" />
              <text
                className={isSelected ? "primary-label" : "secondary-label"}
                x={labelLeft ? -16 : 16}
                y="4"
                textAnchor={labelLeft ? "end" : "start"}
              >
                {listing.region}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="map-legend">
        {roverRoutes.map((routeItem) => (
          <span key={routeItem.name}>
            <i style={{ background: routeItem.color }} />
            {routeItem.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ListingCard({ listing, selected, onSelect }) {
  return (
    <button
      className={`listing-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(listing)}
    >
      <img src={listing.image} alt={`${listing.region} Mars surface view`} />
      <span className="card-price">{formatMoney(listing.price)}</span>
      <div className="card-body">
        <strong>{listing.title}</strong>
        <span>{listing.region}</span>
        <p>{listing.valueSignal}</p>
        <div className="mini-facts">
          <span><BedDouble size={15} /> {listing.bedrooms}</span>
          <span><Bath size={15} /> {listing.baths}</span>
          <span>{listing.acres} acres</span>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ listing }) {
  return (
    <aside className="detail-panel">
      <img className="detail-image" src={listing.image} alt={`${listing.region} listing terrain`} />
      <div className="detail-body">
        <div className="detail-kicker">
          <span>{listing.rover}</span>
          <a href={listing.source} target="_blank" rel="noreferrer">
            NASA source <ExternalLink size={14} />
          </a>
        </div>
        <h1>{listing.title}</h1>
        <div className="price-line">
          <strong>{formatMoney(listing.price)}</strong>
          <span>{formatMoney(Math.round(listing.price / listing.acres))}/acre</span>
        </div>
        <p className="detail-description">{listing.description}</p>

        <div className="stat-grid">
          <div>
            <Mountain size={18} />
            <strong>{listing.elevation.toLocaleString()} m</strong>
            <span>MOLA elevation estimate</span>
          </div>
          <div>
            <Compass size={18} />
            <strong>{listing.lat.toFixed(3)}°, {listing.lon.toFixed(3)}°E</strong>
            <span>Planetocentric reference</span>
          </div>
          <div>
            <ShieldCheck size={18} />
            <strong>{listing.score}/100</strong>
            <span>Future-value score</span>
          </div>
          <div>
            <Route size={18} />
            <strong>{listing.acres} acres</strong>
            <span>{listing.route}</span>
          </div>
        </div>

        <section>
          <h2>Terraforming Price Thesis</h2>
          <p>
            {listing.futureUse}. The valuation blends lowland pressure advantage,
            equatorial daylight, water or ice potential, rover-validated terrain,
            landmark scarcity, and long-term cultural demand.
          </p>
        </section>

        <section>
          <h2>Geography Notes</h2>
          <ul>
            {listing.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <div className="tag-row">
          {listing.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="credit">Image: {listing.imageCredit}</p>
      </div>
    </aside>
  );
}

function App() {
  const [selected, setSelected] = useState(listings[0]);
  const [view, setView] = useState("globe");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return listings;
    return listings.filter((listing) =>
      [
        listing.title,
        listing.region,
        listing.rover,
        listing.valueSignal,
        listing.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Orbit size={22} /></div>
          <div>
            <strong>Marsillow</strong>
            <span>Future-state Martian land market</span>
          </div>
        </div>
        <div className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Jezero, rover, ice, canyon..."
          />
        </div>
        <div className="view-toggle" role="tablist" aria-label="View">
          <button className={view === "globe" ? "active" : ""} onClick={() => setView("globe")}>
            <Globe2 size={17} /> Globe
          </button>
          <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>
            <Map size={17} /> Map
          </button>
        </div>
      </header>

      <div className={`workspace ${sidebarOpen ? "" : "closed"}`}>
        <section className="results-panel">
          <div className="results-heading">
            <button className="panel-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <div>
              <strong>{filtered.length} Mars plots</strong>
              <span>priced for successful terraforming</span>
            </div>
          </div>
          <div className="listing-scroll">
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                selected={listing.id === selected.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        </section>

        <section className="visual-stage">
          <div className="stage-overlay">
            <button className="floating-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <ChevronLeft size={17} />
            </button>
            <div className="market-chip">
              <Sparkles size={16} />
              Terraformed NPV: {formatMoney(selected.price)}
            </div>
            <div className="water-chip">
              <Waves size={16} />
              {selected.valueSignal}
            </div>
          </div>
          {view === "globe" ? (
            <MarsGlobe selected={selected} setSelected={setSelected} />
          ) : (
            <MarsMap selected={selected} setSelected={setSelected} />
          )}
        </section>

        <DetailPanel listing={selected} />
      </div>

      <footer className="source-strip">
        <span>Geography and imagery references</span>
        {sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
            {source.label}
          </a>
        ))}
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
