// src/data/terroirData.ts

export type ClimateRange = {
  /** Approximate average growing-season temperature range in °C */
  temperature: [number, number];
  /** Approximate annual rainfall in mm */
  rainfall: [number, number];
  /** Typical vineyard altitude range in meters above sea level */
  altitude: [number, number];
  /** Dominant soil types */
  soils: string[];
};

export type Region = {
  id: string;
  name: string;
  country: string;
  stateOrProvince?: string;
  appellation: string; // AVA / DOC / AOC etc
  climate: ClimateRange;
  keyGrapes: string[]; // grape IDs from Grape.id
  description: string;
};

export type FlavorProfile = {
  acidity: number;   // 1–5
  tannin: number;    // 1–5
  body: number;      // 1–5
  fruitiness: number; // 1–5
  earthiness: number; // 1–5
};

export type Grape = {
  id: string;
  name: string;
  color: "red" | "white" | "rosé";
  typicalRegions: string[]; // region IDs
  preferredClimate: ClimateRange;
  flavorProfile: FlavorProfile;
  notes: string;
};

export const regions: Region[] = [
  // ====== UNITED STATES ======

  {
    id: "willamette_valley",
    name: "Willamette Valley",
    country: "United States",
    stateOrProvince: "Oregon",
    appellation: "Willamette Valley AVA",
    climate: {
      // Cool-climate, mild summers; wet winters
      temperature: [13, 20],
      // Adjusted: Annual avg is ~1000-1200mm, though summers are dry
      rainfall: [800, 1200],
      altitude: [60, 300],
      soils: ["Volcanic basalt (Jory)", "Marine sedimentary (Willakenzie)", "Loess", "Silt"]
    },
    keyGrapes: ["pinot_noir", "chardonnay", "pinot_gris", "riesling", "gamay"],
    description:
      "Cool, maritime-influenced valley south of Portland known for elegant Pinot Noir and focused Chardonnay on volcanic and marine-derived soils."
  },

  {
    id: "columbia_valley",
    name: "Columbia Valley",
    country: "United States",
    stateOrProvince: "Washington",
    appellation: "Columbia Valley AVA",
    climate: {
      // Warm continental, long growing season
      temperature: [16, 23],
      // Rain shadow effect: 6–8 inches (150–200mm)
      rainfall: [150, 250],
      altitude: [150, 450],
      soils: ["Loess", "Sand", "Silt", "Gravel", "Basalt"]
    },
    keyGrapes: [
      "cabernet_sauvignon",
      "merlot",
      "syrah",
      "chardonnay",
      "riesling",
      "sauvignon_blanc"
    ],
    description:
      "Arid, irrigated desert in the rain shadow of the Cascades with a long, sunny growing season that ripens Bordeaux and Rhône varieties while preserving acidity."
  },

  {
    id: "finger_lakes",
    name: "Finger Lakes",
    country: "United States",
    stateOrProvince: "New York",
    appellation: "Finger Lakes AVA",
    climate: {
      // Cool continental moderated by deep lakes
      temperature: [12, 19],
      rainfall: [750, 1000],
      altitude: [150, 300],
      soils: ["Glacial till", "Shale", "Limestone", "Gravelly loam"]
    },
    keyGrapes: [
      "riesling",
      "cabernet_franc",
      "chardonnay",
      "pinot_noir",
      "gewurztraminer"
    ],
    description:
      "Cool, lake-moderated region in upstate New York producing high-acid Riesling, spicy Cabernet Franc, and other cool-climate varieties."
  },

  {
    id: "napa_valley",
    name: "Napa Valley",
    country: "United States",
    stateOrProvince: "California",
    appellation: "Napa Valley AVA",
    climate: {
      // Warm Mediterranean with cool nights
      temperature: [17, 24],
      // Valley floor ~585mm, mountains up to 1000mm
      rainfall: [550, 900],
      altitude: [0, 800],
      soils: ["Volcanic", "Gravel", "Alluvial", "Clay loam"]
    },
    keyGrapes: [
      "cabernet_sauvignon",
      "merlot",
      "cabernet_franc",
      "chardonnay",
      "sauvignon_blanc",
      "petit_verdot"
    ],
    description:
      "Iconic Mediterranean-climate valley with diverse mesoclimates and soils, best known for structured Cabernet Sauvignon and rich Chardonnay."
  },

  // ====== ARGENTINA ======

  {
    id: "mendoza",
    name: "Mendoza",
    country: "Argentina",
    appellation: "Mendoza",
    climate: {
      // High-altitude desert, hot summers, cool nights
      temperature: [16, 24],
      // Very dry, irrigation essential
      rainfall: [180, 300],
      // Key vineyards range 600m to 1500m+
      altitude: [600, 1500],
      soils: ["Alluvial", "Sandy", "Stony", "Gravel"]
    },
    keyGrapes: [
      "malbec",
      "cabernet_sauvignon",
      "bonarda",
      "syrah",
      "chardonnay",
      "torrontes"
    ],
    description:
      "High, sunny Andean desert with snowmelt irrigation, producing intensely colored, ripe Malbec and other reds with marked diurnal shifts."
  },

  // ====== AUSTRALIA ======

  {
    id: "barossa_valley",
    name: "Barossa Valley",
    country: "Australia",
    appellation: "Barossa Valley",
    climate: {
      // Warm Mediterranean
      temperature: [18, 25],
      // Adjusted: Annual avg is ~530mm, rising in ranges
      rainfall: [450, 650],
      altitude: [200, 550],
      soils: ["Clay loam", "Sandy loam", "Red-brown earths"]
    },
    keyGrapes: [
      "syrah",
      "grenache",
      "mourvedre",
      "cabernet_sauvignon",
      "semillon",
      "chardonnay"
    ],
    description:
      "Warm inland valley in South Australia famous for powerful Shiraz, old-vine Grenache, and rich GSM blends on varied clay and sandy soils."
  },

  // ====== NEW ZEALAND ======

  {
    id: "marlborough",
    name: "Marlborough",
    country: "New Zealand",
    appellation: "Marlborough",
    climate: {
      // Cool maritime
      temperature: [13, 20],
      // Moderately dry due to mountain protection
      rainfall: [600, 800],
      altitude: [0, 300],
      soils: ["Free-draining alluvial", "Gravel", "Silt loam"]
    },
    keyGrapes: [
      "sauvignon_blanc",
      "pinot_noir",
      "chardonnay",
      "pinot_gris",
      "riesling"
    ],
    description:
      "Sunny, cool maritime region at the top of New Zealand’s South Island, globally known for intensely aromatic Sauvignon Blanc and increasingly serious Pinot Noir."
  },

  // ====== SOUTH AFRICA ======

  {
    id: "stellenbosch",
    name: "Stellenbosch",
    country: "South Africa",
    appellation: "Stellenbosch",
    climate: {
      // Mediterranean: warm, dry summers; cool, wet winters
      temperature: [16, 23],
      rainfall: [600, 800],
      altitude: [100, 600],
      soils: ["Decomposed granite", "Sandstone", "Shale", "Alluvial"]
    },
    keyGrapes: [
      "cabernet_sauvignon",
      "merlot",
      "syrah",
      "pinotage",
      "chenin_blanc",
      "sauvignon_blanc",
      "chardonnay"
    ],
    description:
      "Historic Cape wineland with Mediterranean climate and diverse hillside soils, famed for Cabernet Sauvignon, Cape blends with Pinotage, and characterful Chenin Blanc."
  },

  // ====== FRANCE ======

  {
    id: "champagne",
    name: "Champagne",
    country: "France",
    appellation: "Champagne AOC",
    climate: {
      // Marginal cool climate
      temperature: [10, 17],
      rainfall: [600, 750],
      altitude: [90, 300],
      soils: ["Chalk (Belemnite/Micraster)", "Limestone", "Marl"]
    },
    keyGrapes: ["chardonnay", "pinot_noir", "pinot_meunier"],
    description:
      "Northern, cool, chalk-based region near the 49th parallel, producing high-acid base wines for traditional-method sparkling."
  },

  {
    id: "burgundy",
    name: "Burgundy",
    country: "France",
    appellation: "Bourgogne AOC",
    climate: {
      // Temperate continental
      temperature: [13, 22],
      rainfall: [700, 850],
      altitude: [150, 400],
      soils: ["Limestone", "Marl", "Clay", "Alluvial"]
    },
    keyGrapes: ["pinot_noir", "chardonnay", "aligote", "gamay"],
    description:
      "Patchwork of limestone-and-marl slopes with a continental climate, home to some of the world’s most terroir-expressive Pinot Noir and Chardonnay."
  },

  {
    id: "bordeaux",
    name: "Bordeaux",
    country: "France",
    appellation: "Bordeaux AOC",
    climate: {
      // Maritime warm; humid
      temperature: [15, 21],
      // Approx 900-950mm avg
      rainfall: [800, 1000],
      altitude: [0, 150],
      soils: ["Gravel", "Clay", "Limestone", "Sand"]
    },
    keyGrapes: [
      "cabernet_sauvignon",
      "merlot",
      "cabernet_franc",
      "malbec",
      "petit_verdot",
      "sauvignon_blanc",
      "semillon",
      "muscadelle"
    ],
    description:
      "Large Atlantic-influenced region with gravelly, clay, and limestone soils, best known for Cabernet–Merlot blends and Semillon–Sauvignon-based whites."
  },

  // ====== ITALY ======

  {
    id: "chianti_classico",
    name: "Chianti Classico",
    country: "Italy",
    appellation: "Chianti Classico DOCG",
    climate: {
      // Continental to warm; hot summers, cool winters
      temperature: [15, 24],
      rainfall: [700, 900],
      altitude: [250, 700],
      soils: ["Galestro (shaly clay)", "Alberese (limestone)", "Sandstone", "Clay"]
    },
    keyGrapes: ["sangiovese", "canaiolo", "colorino", "merlot", "cabernet_sauvignon"],
    description:
      "Hilly Tuscan heartland between Florence and Siena with higher-altitude vineyards, producing sour-cherry Sangiovese-based reds with firm tannins and bright acidity."
  },

  // ====== SPAIN ======

  {
    id: "rioja",
    name: "Rioja",
    country: "Spain",
    appellation: "Rioja DOCa",
    climate: {
      // Temperate mix of Atlantic and Mediterranean
      temperature: [12, 22],
      rainfall: [400, 600],
      altitude: [300, 700],
      soils: ["Clay-limestone", "Alluvial", "Ferrous clay", "Sandy"]
    },
    keyGrapes: [
      "tempranillo",
      "garnacha",
      "graciano",
      "mazuelo",
      "viura",
      "malvasia"
    ],
    description:
      "Historic region in north-central Spain with a blend of Atlantic and Mediterranean influences, known for Tempranillo-based reds aged in oak and fresh Viura whites."
  },

  // ====== PORTUGAL ======

  {
    id: "douro_valley",
    name: "Douro Valley",
    country: "Portugal",
    appellation: "Douro DOC / Porto DOC",
    climate: {
      // Hot continental summers, cool winters
      temperature: [16, 26],
      // Adjusted: Massive gradient from Baixo (900mm) to Superior (400mm)
      rainfall: [400, 1000],
      altitude: [100, 700],
      soils: ["Schist", "Granite", "Stony terraces"]
    },
    keyGrapes: [
      "touriga_nacional",
      "touriga_franca",
      "tinta_roriz",
      "tinta_barroca",
      "tinta_cao",
      "gouveio",
      "rabigato",
      "viosinho"
    ],
    description:
      "Steep, terraced river valley with hot summers and schistous soils, producing powerful Port wines and increasingly respected dry reds and whites."
  }
];

// ====== GRAPES ======

export const grapes: Grape[] = [
    {
      id: "pinot_noir",
      name: "Pinot Noir",
      color: "red",
      typicalRegions: ["willamette_valley", "burgundy", "marlborough", "finger_lakes"],
      preferredClimate: {
        temperature: [12, 20],
        rainfall: [600, 900],
        altitude: [100, 500],
        soils: ["Limestone", "Volcanic basalt", "Clay", "Shale", "Alluvial"]
      },
      flavorProfile: {
        acidity: 4,
        tannin: 2,
        body: 2,
        fruitiness: 4,
        earthiness: 4
      },
      notes:
        "Thin-skinned, early-ripening variety that prefers cool climates and well-drained slopes, giving red fruit, floral, and earthy notes."
    },
    
    {
      id: "chardonnay",
      name: "Chardonnay",
      color: "white",
      typicalRegions: [
        "burgundy",
        "champagne",
        "napa_valley",
        "willamette_valley",
        "marlborough"
      ],
      preferredClimate: {
        temperature: [13, 22],
        rainfall: [600, 900],
        altitude: [0, 500],
        soils: ["Limestone", "Clay", "Chalk", "Alluvial"]
      },
      flavorProfile: {
        acidity: 3,
        tannin: 1,
        body: 3,
        fruitiness: 3,
        earthiness: 2
      },
      notes:
        "Versatile white grape that reflects winemaking choices and terroir, from mineral, high-acid styles to rich, oak-aged versions."
    },
  
    {
      id: "pinot_gris",
      name: "Pinot Gris / Pinot Grigio",
      color: "white",
      typicalRegions: ["willamette_valley", "marlborough"],
      preferredClimate: {
        temperature: [13, 21],
        rainfall: [600, 900],
        altitude: [0, 400],
        soils: ["Volcanic", "Alluvial", "Clay", "Silt"]
      },
      flavorProfile: {
        acidity: 3,
        tannin: 1,
        body: 2,
        fruitiness: 3,
        earthiness: 2
      },
      notes:
        "Pink-skinned mutation of Pinot Noir making fresh, orchard-fruited whites; can be lean or textured depending on region and style."
    },
  
    {
      id: "riesling",
      name: "Riesling",
      color: "white",
      typicalRegions: ["finger_lakes", "willamette_valley", "marlborough"],
      preferredClimate: {
        temperature: [10, 19],
        rainfall: [600, 900],
        altitude: [100, 400],
        soils: ["Slate", "Shale", "Gravel", "Loam"]
      },
      flavorProfile: {
        acidity: 5,
        tannin: 1,
        body: 1,
        fruitiness: 4,
        earthiness: 2
      },
      notes:
        "Highly aromatic, cold-hardy grape producing high-acid wines from bone dry to lusciously sweet with citrus and stone-fruit character."
    },
  
    {
      id: "gamay",
      name: "Gamay",
      color: "red",
      typicalRegions: ["burgundy"],
      preferredClimate: {
        temperature: [13, 21],
        rainfall: [600, 800],
        altitude: [150, 400],
        soils: ["Granite", "Sand", "Schist", "Limestone"]
      },
      flavorProfile: {
        acidity: 3,
        tannin: 2,
        body: 2,
        fruitiness: 4,
        earthiness: 2
      },
      notes:
        "Early-ripening red variety associated with Beaujolais and some Burgundy, giving juicy red-fruited, floral wines with light tannins."
    },
  
    {
      id: "cabernet_sauvignon",
      name: "Cabernet Sauvignon",
      color: "red",
      typicalRegions: [
        "bordeaux",
        "napa_valley",
        "columbia_valley",
        "mendoza",
        "stellenbosch"
      ],
      preferredClimate: {
        temperature: [16, 24],
        rainfall: [400, 800],
        altitude: [0, 700],
        soils: ["Gravel", "Sand", "Clay", "Alluvial", "Decomposed granite"]
      },
      flavorProfile: {
        acidity: 3,
        tannin: 5,
        body: 4,
        fruitiness: 3,
        earthiness: 3
      },
      notes:
        "Late-ripening, thick-skinned Bordeaux variety that thrives in warm, sunny sites and gravelly soils, giving blackcurrant, cedar, and firm tannins."
    },
  
    {
      id: "merlot",
      name: "Merlot",
      color: "red",
      typicalRegions: ["bordeaux", "napa_valley", "columbia_valley", "stellenbosch"],
      preferredClimate: {
        temperature: [15, 23],
        rainfall: [500, 900],
        altitude: [0, 600],
        soils: ["Clay", "Limestone", "Alluvial"]
      },
      flavorProfile: {
        acidity: 2,
        tannin: 3,
        body: 3,
        fruitiness: 4,
        earthiness: 2
      },
      notes:
        "Softening partner to Cabernet Sauvignon, producing plummy, round wines on clay and limestone soils in moderate to warm climates."
    },
  
    {
        id: "cabernet_franc",
        name: "Cabernet Franc",
        color: "red",
        typicalRegions: ["bordeaux", "finger_lakes", "columbia_valley", "stellenbosch"],
        preferredClimate: {
          temperature: [14, 22],
          rainfall: [500, 900],
          altitude: [0, 500],
          soils: ["Sand", "Gravel", "Limestone", "Clay"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 3,
          body: 2,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "Earlier-ripening Bordeaux variety that does well in slightly cooler sites, giving red fruits, florals, and herbal/leafy notes."
      },
    
      {
        id: "malbec",
        name: "Malbec",
        color: "red",
        typicalRegions: ["mendoza", "bordeaux", "cahors"],
        preferredClimate: {
          temperature: [16, 24],
          rainfall: [300, 700],
          altitude: [200, 1500],
          soils: ["Alluvial", "Gravel", "Limestone", "Clay"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 4,
          fruitiness: 4,
          earthiness: 2
        },
        notes:
          "Thick-skinned grape thriving in sunny, often high-altitude sites, giving deeply colored wines with dark fruit and plush tannins."
      },
    
      {
        id: "sauvignon_blanc",
        name: "Sauvignon Blanc",
        color: "white",
        typicalRegions: ["bordeaux", "marlborough", "douro_valley", "stellenbosch"],
        preferredClimate: {
          temperature: [12, 20],
          rainfall: [500, 900],
          altitude: [0, 600],
          soils: ["Gravel", "Alluvial", "Chalk", "Limestone", "Sand"]
        },
        flavorProfile: {
          acidity: 5,
          tannin: 1,
          body: 2,
          fruitiness: 4,
          earthiness: 2
        },
        notes:
          "High-acid aromatic white grape showing citrus, herbal, and sometimes tropical character, very expressive of climate and picking date."
      },
    
      {
        id: "semillon",
        name: "Sémillon",
        color: "white",
        typicalRegions: ["bordeaux", "douro_valley", "stellenbosch"],
        preferredClimate: {
          temperature: [14, 22],
          rainfall: [600, 900],
          altitude: [0, 600],
          soils: ["Gravel", "Clay", "Sand", "Alluvial"]
        },
        flavorProfile: {
          acidity: 2,
          tannin: 1,
          body: 3,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "Moderate-acid white variety important in Bordeaux and some New World regions, giving waxy, honeyed, and citrus notes, especially with age."
      },
    
      {
        id: "syrah",
        name: "Syrah / Shiraz",
        color: "red",
        typicalRegions: ["barossa_valley", "stellenbosch", "columbia_valley"],
        preferredClimate: {
          temperature: [15, 24],
          rainfall: [300, 700],
          altitude: [0, 600],
          soils: ["Granite", "Schist", "Clay", "Sandy loam"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 4,
          fruitiness: 4,
          earthiness: 3
        },
        notes:
          "Adaptable Rhône variety making peppery, dark-fruited wines in cooler sites and richer, jammy styles in warmer ones; called Shiraz in Australia."
      },
    
      {
        id: "grenache",
        name: "Grenache / Garnacha",
        color: "red",
        typicalRegions: ["barossa_valley", "rioja", "douro_valley"],
        preferredClimate: {
          temperature: [16, 25],
          rainfall: [300, 600],
          altitude: [0, 600],
          soils: ["Sandy", "Schist", "Limestone", "Alluvial"]
        },
        flavorProfile: {
          acidity: 2,
          tannin: 3,
          body: 3,
          fruitiness: 4,
          earthiness: 2
        },
        notes:
          "Heat-tolerant grape suited to dry, sunny climates, giving high-alcohol wines with red fruit, spice, and often garrigue-like herbal notes."
      },
    
      {
        id: "mourvedre",
        name: "Mourvèdre / Monastrell",
        color: "red",
        typicalRegions: ["barossa_valley", "rioja", "douro_valley"],
        preferredClimate: {
          temperature: [17, 25],
          rainfall: [300, 600],
          altitude: [0, 600],
          soils: ["Limestone", "Clay", "Sand", "Pebbly soils"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 5,
          body: 4,
          fruitiness: 3,
          earthiness: 4
        },
        notes:
          "Late-ripening, drought-tolerant variety that likes heat and poor soils, giving deeply colored, tannic wines with dark fruit and gamey notes."
      },
    
      {
        id: "tempranillo",
        name: "Tempranillo",
        color: "red",
        typicalRegions: ["rioja", "douro_valley"],
        preferredClimate: {
          temperature: [14, 23],
          rainfall: [400, 700],
          altitude: [300, 800],
          soils: ["Clay-limestone", "Alluvial", "Schist"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 3,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "Early-ripening Spanish grape giving red-fruited, medium- to full-bodied wines that respond strongly to oak and altitude."
      },
    
      {
        id: "sangiovese",
        name: "Sangiovese",
        color: "red",
        typicalRegions: ["chianti_classico"],
        preferredClimate: {
          temperature: [15, 23],
          rainfall: [600, 900],
          altitude: [200, 700],
          soils: ["Galestro", "Limestone", "Clay", "Sandstone"]
        },
        flavorProfile: {
          acidity: 4,
          tannin: 4,
          body: 3,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "High-acid, tannic Tuscan grape producing sour-cherry, herbal wines that show best on rocky, well-drained hillside sites."
      },
    
      {
        id: "canaiolo",
        name: "Canaiolo Nero",
        color: "red",
        typicalRegions: ["chianti_classico"],
        preferredClimate: {
          temperature: [15, 23],
          rainfall: [600, 900],
          altitude: [200, 700],
          soils: ["Clay", "Limestone", "Sandstone"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 3,
          body: 2,
          fruitiness: 3,
          earthiness: 2
        },
        notes:
          "Traditional blending partner to Sangiovese in Chianti, softening tannins and adding floral and red-fruit notes."
      },
    
      {
        id: "colorino",
        name: "Colorino",
        color: "red",
        typicalRegions: ["chianti_classico"],
        preferredClimate: {
          temperature: [15, 23],
          rainfall: [600, 900],
          altitude: [200, 700],
          soils: ["Clay", "Limestone", "Galestro"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 3,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "Deeply colored Tuscan grape used in small proportions to boost color and structure in Sangiovese-based blends."
      },
    
      {
        id: "viura",
        name: "Viura / Macabeo",
        color: "white",
        typicalRegions: ["rioja"],
        preferredClimate: {
          temperature: [13, 22],
          rainfall: [400, 700],
          altitude: [300, 700],
          soils: ["Clay-limestone", "Alluvial"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 1,
          body: 2,
          fruitiness: 3,
          earthiness: 2
        },
        notes:
          "Main white grape of Rioja; can produce fresh citrus wines or richer, oak-aged styles with nutty complexity."
      },
    
      {
        id: "touriga_nacional",
        name: "Touriga Nacional",
        color: "red",
        typicalRegions: ["douro_valley"],
        preferredClimate: {
          temperature: [16, 25],
          rainfall: [500, 800],
          altitude: [100, 700],
          soils: ["Schist", "Granite"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 5,
          body: 4,
          fruitiness: 4,
          earthiness: 3
        },
        notes:
          "Key Port grape, producing deeply colored, intensely aromatic wines with dark fruit, violets, and firm tannins."
      },
    
      {
        id: "touriga_franca",
        name: "Touriga Franca",
        color: "red",
        typicalRegions: ["douro_valley"],
        preferredClimate: {
          temperature: [16, 24],
          rainfall: [500, 800],
          altitude: [100, 700],
          soils: ["Schist", "Granite"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 3,
          fruitiness: 4,
          earthiness: 3
        },
        notes:
          "Fragrant, slightly softer partner to Touriga Nacional in Douro blends, adding floral aromas and red fruit."
      },
    
      {
        id: "tinta_roriz",
        name: "Tinta Roriz / Tempranillo",
        color: "red",
        typicalRegions: ["douro_valley", "rioja"],
        preferredClimate: {
          temperature: [14, 23],
          rainfall: [400, 700],
          altitude: [300, 800],
          soils: ["Schist", "Clay-limestone", "Alluvial"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 3,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "Portuguese name for Tempranillo, contributing structure and savory red fruit to Douro blends."
      },
    
      {
        id: "gouveio",
        name: "Gouveio",
        color: "white",
        typicalRegions: ["douro_valley"],
        preferredClimate: {
          temperature: [14, 22],
          rainfall: [500, 800],
          altitude: [200, 700],
          soils: ["Schist", "Granite"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 1,
          body: 3,
          fruitiness: 3,
          earthiness: 2
        },
        notes:
          "Important white variety in Douro blends, bringing body, citrus fruit, and structure to both Port and dry wines."
      },
    
      {
        id: "pinot_meunier",
        name: "Pinot Meunier",
        color: "red",
        typicalRegions: ["champagne"],
        preferredClimate: {
          temperature: [10, 18],
          rainfall: [600, 700],
          altitude: [100, 300],
          soils: ["Chalk", "Clay", "Limestone"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 2,
          body: 2,
          fruitiness: 3,
          earthiness: 2
        },
        notes:
          "Early-budding Champagne grape that handles frost-prone sites, adding red-fruit charm and approachability to sparkling blends."
      },
    
      {
        id: "chenin_blanc",
        name: "Chenin Blanc",
        color: "white",
        typicalRegions: ["stellenbosch"],
        preferredClimate: {
          temperature: [14, 22],
          rainfall: [500, 800],
          altitude: [100, 500],
          soils: ["Decomposed granite", "Shale", "Sandstone"]
        },
        flavorProfile: {
          acidity: 4,
          tannin: 1,
          body: 3,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "Versatile, high-acid variety thriving in South Africa, capable of dry, off-dry, and sparkling styles with apple, quince, and honeyed notes."
      },
    
      {
        id: "pinotage",
        name: "Pinotage",
        color: "red",
        typicalRegions: ["stellenbosch"],
        preferredClimate: {
          temperature: [16, 24],
          rainfall: [400, 800],
          altitude: [100, 500],
          soils: ["Decomposed granite", "Sandstone", "Shale"]
        },
        flavorProfile: {
          acidity: 3,
          tannin: 4,
          body: 4,
          fruitiness: 3,
          earthiness: 3
        },
        notes:
          "South African crossing of Pinot Noir and Cinsault, producing dark-fruited, sometimes smoky wines; often used in Cape blends."
      }
];
