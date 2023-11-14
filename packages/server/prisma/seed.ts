import { PrismaClient, Tags } from '@prisma/client';
import { USER_REQUEST_NOT_FOUND } from 'src/errors';

const prisma = new PrismaClient();

const randomUserEmails = [
  'mraynor@hotmail.com',
  'silas88@kunze.com',
  'msatterfield@grant.net',
  'balistreri.dagmar@boyer.com',
  'vborer@bradtke.com',
  'alexa48@gmail.com',
  'qwolf@witting.biz',
  'thompson.pierre@gmail.com',
  'carter.mikel@hotmail.com',
  'pchristiansen@yahoo.com',
];

const PROJECT_COUNT = 3;
const FEATURE_COUNT = 10;
const USER_REQUEST_COUNT = 15;

// Create Projects
async function createProject(projectTitle: string, userId: string) {
  const newProject = await prisma.project.create({
    data: {
      title: projectTitle,
      userUid: userId,
    },
  });

  return newProject;
}

// Create Features

async function createFeature(feature: string, projectID: string, tags: Tags[]) {
  const newFeature = await prisma.feature.create({
    data: {
      projectId: projectID,
      feature: feature,
      tags: tags,
    },
  });

  return newFeature;
}

// Create User-Requests
async function createUserRequest(request: string, projectID: string) {
  const createdUserRequest = await prisma.userRequest.create({
    data: {
      request: request,
      requestBy: randomUserEmails[Math.floor(Math.random() * (9 - 0 + 1)) + 0],
      projectId: projectID,
    },
  });

  return createUserRequest;
}

async function main() {
  console.log('Seeding Database....');

  let projectIDList = [];
  for (let index = 0; index <= PROJECT_COUNT; index++) {
    const data = await createProject(
      `Project ${index}`,
      'cloxs1fh00000oyap9wdo4mnr',
    );
    projectIDList.push(data.id);
  }

  for (let index = 0; index < FEATURE_COUNT; index++) {
    const data = await createFeature(
      `Feature ${index}`,
      projectIDList[Math.floor(Math.random() * (PROJECT_COUNT - 0 + 1)) + 0],
      [
        Math.random() < 0.5 ? 'IN_PROGRESS' : undefined,
        Math.random() < 0.5 ? 'NEWLY_ADDED' : undefined,
      ],
    );
  }

  for (let index = 0; index < USER_REQUEST_COUNT; index++) {
    await createUserRequest(
      `User-Request ${index}`,
      projectIDList[Math.floor(Math.random() * (PROJECT_COUNT - 0 + 1)) + 0],
    );
  }

  console.log('Seeding Complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
