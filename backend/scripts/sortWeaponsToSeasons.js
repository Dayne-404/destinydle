import fs from "fs";
import readline from "readline";

const FILE_PATH = "./scripts/data/seasonMap.json";
const BUNGIE_NET_PATH = "https://www.bungie.net";
const EXOTIC_HASH = 2759499571;
const WEAPON_CATEGORY_HASH = 1;

// Load JSON
const loadSeasonMap = () => {
  if (!fs.existsSync(FILE_PATH)) {
    console.log(
      "seasonMap.json does not exist. Run generateSeasonMap.js first.",
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
};

// Prompt helper
const askUser = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

// Save JSON to file
const saveSeasonMap = (seasonMap) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(seasonMap, null, 2));
};

// Main
const main = async () => {
  const confirm = await askUser(
    "Do you want to sort exotic weapons into seasons? (Y/N) ",
  );
  if (confirm.toLowerCase() !== "y") {
    console.log("Operation cancelled.");
    process.exit(0);
  }

  const seasonMap = loadSeasonMap();

  // Fetch manifest
  const manifestRes = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest/",
    {
      headers: { "X-API-Key": process.env.BUNGIE_KEY },
    },
  );
  const manifestData = await manifestRes.json();
  const paths = manifestData.Response.jsonWorldComponentContentPaths.en;

  // Load inventory items
  const inventory = await fetch(
    `${BUNGIE_NET_PATH}${paths.DestinyInventoryItemDefinition}`,
  ).then((res) => res.json());

  // Filter exotic weapons
  const exotics = Object.values(inventory).filter(
    (item) =>
      item.inventory?.tierTypeHash === EXOTIC_HASH &&
      item.itemCategoryHashes?.includes(WEAPON_CATEGORY_HASH) &&
      item.displayProperties?.name,
  );

  console.log(`Found ${exotics.length} exotic weapons.`);

  for (const weapon of exotics) {
    const weaponName = weapon.displayProperties.name;

    // Skip if weapon already assigned
    let alreadyAssigned = false;
    for (const seasonNum in seasonMap) {
      if (seasonMap[seasonNum].weapons.includes(weaponName)) {
        alreadyAssigned = true;
        break;
      }
    }
    if (alreadyAssigned) continue;

    console.log(`\nWeapon: ${weaponName}`);

    const seasonNumber = await askUser(
      "Enter the season number for this weapon: ",
    );
    if (!seasonMap[seasonNumber]) {
      console.log("Invalid season number. Skipping weapon.");
      continue;
    }

    // Add weapon name only
    seasonMap[seasonNumber].weapons.push(weaponName);

    // Save after each weapon
    saveSeasonMap(seasonMap);
    console.log(
      `Saved ${weaponName} to season ${seasonMap[seasonNumber].name}`,
    );
  }

  console.log("\nAll weapons processed!");
};

main();
