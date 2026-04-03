import weapons from "../scripts/data/weaponExotics.json" with { type: "json" };
const getDailyIndex = (date = new Date()) => {
  const start = new Date(2026, 0, 1);
  const diffTime = date - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const index = diffDays % weapons.length;
  return index;
};

const getDailyWeapon = (req, res) => {
  try {
    const todayIndex = getDailyIndex();
    const todayWeapon = weapons[todayIndex];

    const yesterdayIndex = (todayIndex - 1 + weapons.length) % weapons.length;
    const yesterdayWeapon = weapons[yesterdayIndex];

    res.status(200).json({
      today: todayWeapon,
      previous: yesterdayWeapon,
      index: todayIndex,
    });
  } catch (err) {
    console.error("Error fetching daily weapon:", err);
    res.status(500).json({ error: "Failed to fetch daily weapon" });
  }
};

const getAllWeapons = (req, res) => {
  try {
    res.status(200).json({weapons: weapons, count: weapons.length });
  } catch (err) {
    console.error("Error fetching all weapons:", err);
    res.status(500).json({ error: "Failed to fetch all weapons" });
  }
};

export { getDailyWeapon, getAllWeapons };
