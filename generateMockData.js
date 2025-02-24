const { faker } = require("@faker-js/faker");
const fs = require("fs");

// sponsors
const generateSponsors = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    slug: null,
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

// challenge descriptions
const generateDescriptionBody = () => {
  const paragraphs = [
    "Imagine a world where education is exciting and learning is fun.",
    "",
    "What would that look like? How can we make school more engaging and find new ways to get our voices heard?",
    "",
    "Let’s talk about what needs to change to make learning enjoyable and how schools can better support us, especially when it comes to listening to our ideas.",
  ];

  return paragraphs.map((text) => ({
    type: "paragraph",
    children: [{ text, type: "text" }],
  }));
};

// challenges
const generateChallenges = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    slug: `Challenge-${faker.number.int({ min: 1, max: 999 })}`,
    name: faker.company.catchPhrase(),
    title: faker.lorem.sentence(),
    category: faker.helpers.arrayElement([
      "default",
      "education",
      "health",
      "technology",
    ]),
    descriptionBody: generateDescriptionBody(),
    startAt: faker.date.future().toISOString(),
    endAt: faker.date.future({ years: 1 }).toISOString(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    publishedAt: faker.date.past().toISOString(),
    isPrivate: faker.datatype.boolean(),
    password: null,
    lastNotified: {},
  }));
};

//survey data
const generateMockSurveys = (count) => {
  return {
    data: Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: faker.company.name(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      publishedAt: faker.date.past().toISOString(),
    })),
    meta: {
      pagination: {
        page: 1,
        pageSize: count,
        pageCount: 1,
        total: count,
      },
    },
  };
};

//user submissions
const generateMockUserSubmissions = (count) => {
  return {
    data: Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      challengeId: faker.number.int({ min: 1, max: 20 }),
      userId: faker.number.int({ min: 1, max: 100 }),
      state: faker.helpers.arrayElement(["draft", "submitted", "reviewed"]),
      body: faker.lorem.paragraphs(3),
      rewardTier: faker.helpers.arrayElement([
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
      ]),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      publishedAt: faker.date.past().toISOString(),
      videoId: faker.string.uuid(),
      videoThumbnail: faker.image.urlPicsumPhotos({ width: 640, height: 360 }),
      videoHLS: `https://videos.example.com/${faker.string.uuid()}.m3u8`,
      videoMP4: `https://videos.example.com/${faker.string.uuid()}.mp4`,
      title: faker.lorem.sentence(),
      publicImageUrl: faker.image.urlLoremFlickr({ category: "nature" }),
      publicAudioUrl: `https://audios.example.com/${faker.string.uuid()}.mp3`,
      publicDocumentUrl: `https://documents.example.com/${faker.string.uuid()}.pdf`,
      surveyAnswers: {
        question1: faker.lorem.sentence(),
        question2: faker.lorem.sentence(),
        question3: faker.lorem.sentence(),
      },
      comment: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      toDisplay: faker.datatype.boolean(),
    })),
  };
};

//users
const generateMockUsers = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1, // Incremental ID
    username: faker.internet.email(), // Random email-based username
    email: faker.internet.email(), // Random email
    provider: "local", // Keeping "local" as default
    confirmed: faker.datatype.boolean(), // Random boolean for confirmation
    blocked: faker.datatype.boolean(), // Random boolean for blocked status
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    uid: faker.string.uuid(), // Generates a unique ID
    firstName: faker.person.firstName(), // Random first name
    lastName: faker.person.lastName(), // Random last name
    restricted: faker.datatype.boolean() ? faker.lorem.sentence() : null, // Random restriction reason or null
    birthDate: faker.date
      .birthdate({ min: 18, max: 60, mode: "age" })
      .toISOString()
      .split("T")[0], // Random birthdate
    occupation: faker.person.jobTitle(), // Random job title
    organisationName: faker.company.name(), // Random organization name
    bio: faker.lorem.sentence(), // Random bio
    profileImage: faker.image.avatar(), // Random avatar image
    ethnicity: faker.helpers.arrayElement([
      "Asian",
      "Black",
      "White",
      "Hispanic",
      "Other",
      "Prefer not to say",
    ]), // Random ethnicity
    gender: faker.helpers.arrayElement([
      "Male",
      "Female",
      "Non-binary",
      "Other",
      "Prefer not to say",
    ]), // Random gender
    isSponsor: faker.datatype.boolean(), // Random sponsor status
    reminderSent: faker.datatype.boolean(), // Random boolean for reminder status
    publicProfileName: faker.internet.userName(), // Random public profile name
  }));
};

// Generate mock data
const sponsorsData = generateSponsors(5);
const challengesData = generateChallenges(5);
const surveysData = generateMockSurveys(5);
const submissionsData = generateMockUserSubmissions(5);
const usersData = generateMockUsers(5);

// Write each type of data to its own JSON file
fs.writeFileSync("sponsor.json", JSON.stringify(sponsorsData, null, 2));
fs.writeFileSync("challenge.json", JSON.stringify(challengesData, null, 2));
fs.writeFileSync("survey.json", JSON.stringify(surveysData, null, 2));
fs.writeFileSync(
  "user-submissions.json",
  JSON.stringify(submissionsData, null, 2)
);
fs.writeFileSync("user.json", JSON.stringify(usersData, null, 2));

console.log("Mock data generated and saved to JSON files!");
