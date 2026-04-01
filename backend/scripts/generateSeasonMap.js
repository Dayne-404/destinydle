import fs from "fs";
import readline from "readline";

const BUNGIE_NET_PATH = "https://www.bungie.net";
const FILE_PATH = "./scripts/data/seasonMap.json";

// Generate the season map from Bungie manifest
const generateSeasonMap = async () => {
  const res = await fetch("https://www.bungie.net/Platform/Destiny2/Manifest/", {
    headers: { "X-API-Key": process.env.BUNGIE_KEY },
  });

  const manifestData = await res.json();
  const paths = manifestData.Response.jsonWorldComponentContentPaths.en;

  const seasonDefinition = await fetch(`${BUNGIE_NET_PATH}${paths.DestinySeasonDefinition}`).then(res =>
    res.json()
  );

  const seasonsSorted = Object.values(seasonDefinition)
    .filter((s) => s.displayProperties?.name)
    .sort((a, b) => a.seasonNumber - b.seasonNumber);

  seasonsSorted.unshift({
    seasonNumber: 1,
    displayProperties: { name: "The Red War" },
  });

  const seasonMap = {};
  seasonsSorted.forEach((season) => {
    seasonMap[season.seasonNumber] = {
      name: season.displayProperties.name,
      weapons: [],
    };
  });

  return seasonMap;
};

// Ask user for input in the console
const askUser = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
};

// Check if JSON file exists
const checkFileExists = () => fs.existsSync(FILE_PATH);

// Merge new season map into existing file
const mergeSeasonMap = (existingData, newData) => {
  // Preserve existing weapons and add new seasons if missing
  const merged = { ...newData };
  for (const seasonNumber in existingData) {
    if (merged[seasonNumber]) {
      merged[seasonNumber].weapons = existingData[seasonNumber].weapons;
    } else {
      merged[seasonNumber] = existingData[seasonNumber];
    }
  }
  return merged;
};

// Main script logic
const main = async () => {
  const newSeasonMap = await generateSeasonMap();

  if (checkFileExists()) {
    console.log("seasonMap.json already exists.");
    const answer = await askUser("Overwrite (O) / Merge (M) / Cancel (C)? ");

    if (answer === "c") {
      console.log("Operation cancelled, exiting.");
      process.exit(0);
    } else if (answer === "o") {
      fs.writeFileSync(FILE_PATH, JSON.stringify(newSeasonMap, null, 2));
      console.log("File overwritten successfully!");
    } else if (answer === "m") {
      const existingData = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
      const merged = mergeSeasonMap(existingData, newSeasonMap);
      fs.writeFileSync(FILE_PATH, JSON.stringify(merged, null, 2));
      console.log("File merged successfully!");
    } else {
      console.log("Invalid option, exiting.");
      process.exit(0);
    }
  } else {
    
    fs.writeFileSync(FILE_PATH, JSON.stringify(newSeasonMap, null, 2));
    console.log("Season map generated and saved successfully!");
  }
};

main();