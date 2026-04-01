const EXOTIC_HASH = 2759499571;

const WEAPON_CATEGORY_HASH = 1;
const MAG_HASH = 3871231066;
const RPM_HASH = 4284893193;

const AMMO_MAP = {
  1: "Primary",
  2: "Special",
  3: "Heavy",
};

const VERSION_TO_SEASONS = {
  100: ["Red War", "Curse of Osiris", "Warmind"],
  200: ["Forsaken", "Season of the Forge", "Drifter", "Opulence"],
  300: ["Shadowkeep", "Undying", "Dawn", "Worthy", "Arrivals"],
  400: ["Beyond Light", "Hunt", "Chosen", "Splicer", "Lost"],
  500: ["Witch Queen", "Risen", "Haunted", "Plunder", "Seraph"],
  600: ["Lightfall", "Defiance", "Deep", "Witch", "Wish"],
  700: ["Final Shape", "Echoes", "Revenant", "Heresy"],
};

async function main() {
  const res = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    { headers: { "X-API-Key": process.env.BUNGIE_KEY } },
  );

  const manifestData = await res.json();
  console.log("Fetched manifest data");
  console.log(manifestData.Response);

  const paths = manifestData.Response.jsonWorldComponentContentPaths.en;
  const bungieNetPath = "https://www.bungie.net";

  const damageTypes = await fetch(
    `${bungieNetPath}${paths.DestinyDamageTypeDefinition}`,
  ).then((res) => res.json());
  console.log("Damage types loaded: ", Object.keys(damageTypes).length);
  console.log(Object.keys(damageTypes));

  const statsDefinition = await fetch(
    `${bungieNetPath}${paths.DestinyStatDefinition}`,
  ).then((res) => res.json());
  console.log("Stats loaded: ", Object.keys(statsDefinition).length);

  const categories = await fetch(
    `${bungieNetPath}${paths.DestinyItemCategoryDefinition}`,
  ).then((res) => res.json());
  console.log("Categories loaded: ", Object.keys(categories).length);

  const inventory = await fetch(
    `${bungieNetPath}${paths.DestinyInventoryItemDefinition}`,
  ).then((res) => res.json());
  console.log("Items loaded: ", Object.keys(inventory).length);

  const exotics = Object.values(inventory).filter(
    (item) =>
      item.inventory?.tierTypeHash === EXOTIC_HASH &&
      item.itemCategoryHashes?.includes(1) &&
      item.displayProperties?.name,
  );

  const weaponExotics = exotics.map((item) => ({
    name: item.displayProperties.name,
    type: getWeaponType(item, categories),
    ammo: AMMO_MAP[item.equippingBlock?.ammoType],
    element: getElement(item, damageTypes),
    rpm: getStat(item, RPM_HASH),
    magazine: getStat(item, MAG_HASH),
    season: "TODO",
    icon: `${bungieNetPath}${item.displayProperties.icon}`,
  }));
}

const getWeaponType = (item, categories) => {
  const cat = item.itemCategoryHashes
    ?.map((h) => categories[h])
    .find((c) => c?.displayProperties?.name !== "Weapon");

  return cat?.displayProperties?.name || "Unknown";
};

const getElement = (item, damageTypes) => {
  const dmg = damageTypes[item.defaultDamageTypeHash];
  return dmg?.displayProperties?.name || "Unknown";
};

const getReleaseVersion = (item) => {
  const releaseTrait = item.traitIds?.find((t) => t.startsWith("releases."));
  if (!releaseTrait) return null;

  const match = releaseTrait.match(/releases\.v(\d+)/);
  return match ? Number(match[1]) : null;
};

const getStat = (item, statHash) => {
  return item.stats?.stats?.[statHash]?.value ?? "Unknown";
};

main();
