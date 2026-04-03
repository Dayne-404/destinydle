import fs from "fs";
import { get } from "http";
import { arch } from "os";

const EXOTIC_HASH = 2759499571;

const WEAPON_CATEGORY_HASH = 1;
const MAG_HASH = 3871231066;
const RPM_HASH = 4284893193;
const CHARGE_TIME_HASH = 2961396640;
const DRAW_TIME_HASH = 3614673599;

const SEASON_MAP_PATH = "./scripts/data/seasonMap.json";
const OUTPUT_FILE_PATH = "./scripts/data/weaponExotics.json";

const BASE_URL_PATH = "https://www.bungie.net";

const AMMO_TYPE_MAP = {
  1: "Primary",
  2: "Special",
  3: "Heavy",
};

async function main() {
  console.log("\n" + "=".repeat(50));
  console.log("Generating Weapon Exotics");
  console.log("=".repeat(50) + "\n");

  const manifest = await fetchManifest();

  const damageTypes = await fetchDefinition(
    manifest,
    "DestinyDamageTypeDefinition",
  );
  const categories = await fetchDefinition(
    manifest,
    "DestinyItemCategoryDefinition",
  );
  const inventory = await fetchDefinition(
    manifest,
    "DestinyInventoryItemDefinition",
  );

  const exoticWeapons = Object.values(inventory).filter(
    (item) =>
      item.inventory?.tierTypeHash === EXOTIC_HASH &&
      item.itemCategoryHashes?.includes(WEAPON_CATEGORY_HASH) &&
      item.displayProperties?.name &&
      item.itemTypeDisplayName !== "Weapon Ornament",
  );

  let weaponData = exoticWeapons.map((item) => ({
    name: item.displayProperties.name,
    type: getWeaponType(item, categories),
    archetype: getWeaponArchetype(item, categories),
    ammo: AMMO_TYPE_MAP[item.equippingBlock?.ammoType],
    element: getElement(item, damageTypes),
    rpm: calculateRPM(item),
    mag: getStat(item, MAG_HASH),
    season: getSeason(item),
    icon: `${BASE_URL_PATH}${item.displayProperties.icon}`,
  }));

  weaponData = removeDuplicateWeapons(weaponData);

  fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(weaponData, null, 2));
  console.log(`Weapon exotics data saved to ${OUTPUT_FILE_PATH}`);
}

// Fetch the Destiny 2 manifest and return the paths for English definitions
const fetchManifest = async () => {
  const res = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    {
      headers: { "X-API-Key": process.env.BUNGIE_KEY },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Destiny 2 manifest: ${res.status}`);
  }

  const data = await res.json();
  console.log("Manifest fetched successfully");

  // Return the English world component paths
  return data.Response.jsonWorldComponentContentPaths.en;
};

// Fetch a specific definition from the manifest paths
const fetchDefinition = async (manifestPaths, definitionName) => {
  const path = manifestPaths[definitionName];

  const res = await fetch(`${BASE_URL_PATH}${path}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${definitionName}: ${res.status}`);
  }

  const definition = await res.json();
  console.log(`${definitionName} loaded: `, Object.keys(definition).length);

  return definition;
};

const getWeaponType = (item, categories) => {
  const cat = item.itemCategoryHashes
    ?.map((hash) => categories[hash])
    .find((c) => c?.displayProperties?.name !== "Weapon");

  return cat?.displayProperties?.name ?? "Unknown";
};

function getWeaponArchetype(item, categories) {
  for (const hash of item.itemCategoryHashes ?? []) {
    const category = categories[hash];
    if (!category) continue;

    // Exclude basic categories
    if (category.hash > 4 && category.hash !== 2422292810) {
      return category.displayProperties?.name ?? "Unknown";
    }
  }
  return "Unknown";
}

const getElement = (item, damageTypes) => {
  if (!item.defaultDamageTypeHash || item.defaultDamageTypeHash === 0)
    return "Kinetic";

  const dmg = damageTypes[item.defaultDamageTypeHash];
  return dmg?.displayProperties?.name ?? "Unknown";
};

const calculateRPM = (item) => {
  const stats = item.stats?.stats;

  // Normal weapons
  if (stats[RPM_HASH]) return stats[RPM_HASH].value;

  // Fusion rifles / linear fusion rifles
  if (stats[CHARGE_TIME_HASH] && item.displayProperties.name !== "Wolfsbane")
    return Math.round(60000 / stats[CHARGE_TIME_HASH].value);

  // Combat bows
  if (stats[DRAW_TIME_HASH])
    return Math.round(60000 / stats[DRAW_TIME_HASH].value);

  return 20;
};

function getStat(item, statHash) {
  // Special case: Bows always have 1-round magazine
  if (statHash === MAG_HASH && item.itemCategoryHashes?.includes(3317538576))
    return 1;

  return item.stats?.stats?.[statHash]?.value ?? "Unknown";
}

const getSeason = (item) => {
  const seasonMap = loadSeasonMap();

  for (const [seasonNumber, season] of Object.entries(seasonMap)) {
    if (season.weapons.includes(item.displayProperties.name)) {
      return [Number(seasonNumber), season.name];
    }
  }

  console.warn(`Season not found for ${item.displayProperties.name}`);
  return ["Unknown", "Unknown"];
};

function removeDuplicateWeapons(weapons) {
  const map = new Map();
  weapons.forEach((weapon) => {
    if (!map.has(weapon.name)) map.set(weapon.name, weapon);
  });
  return Array.from(map.values());
}

const loadSeasonMap = () =>
  JSON.parse(fs.readFileSync(SEASON_MAP_PATH, "utf-8"));

main();
