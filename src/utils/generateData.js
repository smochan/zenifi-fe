function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData(numEntries) {
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Michael",
    "Rachel",
    "Joshua",
    "Emily",
    "Daniel",
    "Laura",
    "Kevin",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Green",
    "Lee",
    "Davis",
    "Martinez",
    "Garcia",
    "Wilson",
  ];
  const statusOptions = ["pending", "cancelled"];
  const currentTimestamp = Date.now();
  const oneWeekAgoTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
  const data = [];

  for (let i = 0; i < numEntries; i++) {
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomTimestamp = getRandomInt(oneWeekAgoTimestamp, currentTimestamp);
    const uniqueIdentifier = getRandomInt(1000, 9999);
    data.push({
      name: `${randomFirstName} ${randomLastName}`,
      email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}${uniqueIdentifier}@example.com`,
      phone_num: `${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
      time: randomTimestamp,
      tier: getRandomInt(1, 2),
      status: statusOptions[getRandomInt(0, statusOptions.length - 1)],
    });
  }

  return data;
}

export default generateRandomData;
