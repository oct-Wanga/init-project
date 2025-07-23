export const MAIN_URL = {
  ChatEXAONE: {
    path: '/chatexaone',
    tabs: [],
  },
  EXAONE_4: {
    path: '/models',
    tabs: ['exaone', 'exaone-path', 'exaone-vl'],
  },
  APIs: {
    path: '/apis',
    tabs: [],
  },
  Solutions: {
    path: '/solutions',
    tabs: ['data-foundry', 'aibi'],
  },
  Labs: {
    path: '/labs',
    tabs: ['mol-design', 'ddu', 'discovery-note'],
  },
};

export const SERVICE_URL = [
  {
    id: 1,
    path: `${MAIN_URL.Solutions.path}?tab=${MAIN_URL.Solutions.tabs[0]}`,
  },
  {
    id: 2,
    path: `${MAIN_URL.Solutions.path}?tab=${MAIN_URL.Solutions.tabs[1]}`,
  },
  {
    id: 3,
    path: `${MAIN_URL.Labs.path}?tab=${MAIN_URL.Labs.tabs[0]}`,
  },
  {
    id: 4,
    path: `${MAIN_URL.Labs.path}?tab=${MAIN_URL.Labs.tabs[1]}`,
  },
  {
    id: 5,
    path: `${MAIN_URL.EXAONE_4.path}?tab=${MAIN_URL.EXAONE_4.tabs[1]}`,
  },
  {
    id: 6,
    path: `${MAIN_URL.Labs.path}?tab=${MAIN_URL.Labs.tabs[2]}`,
  },
];
