const { faker } = require("@faker-js/faker");
const fs = require("fs");

// Function to generate mock sponsors
const generateSponsors = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    organisationName: faker.company.name(),
    organisationType: faker.helpers.arrayElement([
      "corporate",
      "non-profit",
      "council",
    ]),
    website: faker.internet.url(),
    bio: faker.lorem.sentence(),
    profileImage: faker.image.avatar(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    publishedAt: faker.date.past().toISOString(),
  }));
};

// Function to generate mock challenges
const generateChallenges = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    slug: faker.lorem.slug(),
    name: faker.lorem.words(4),
    title: faker.lorem.sentence(),
    category: faker.helpers.arrayElement([
      "default",
      "innovation",
      "education",
    ]),
    descriptionBody: [
      {
        type: "paragraph",
        children: [{ text: faker.lorem.sentence(), type: "text" }],
      },
      {
        type: "paragraph",
        children: [{ text: faker.lorem.sentence(), type: "text" }],
      },
    ],
    startAt: faker.date.future().toISOString(),
    endAt: faker.date.future().toISOString(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    publishedAt: faker.date.past().toISOString(),
    isPrivate: faker.datatype.boolean(),
    password: null,
    lastNotified: {},
  }));
};

// Generate mock data
const mockData = {
  sponsors: generateSponsors(5), // Generate 5 mock sponsors
  challenges: generateChallenges(5), // Generate 5 mock challenges
};

// Write to a JSON file
fs.writeFileSync("mockData.json", JSON.stringify(mockData, null, 2));

console.log("Mock data generated and saved to mockData.json!");
