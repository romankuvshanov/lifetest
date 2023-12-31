export const initialState = [
  {
    name: "Архив",
    tasks: [],
    id: 0,
    canDelete: false,
    isArchive: true,
  },
  {
    name: "Основные задачи",
    tasks: [],
    id: 1,
    canDelete: false,
    isArchive: false,
  },
  {
    name: "Аутсорс",
    tasks: [],
    id: 2,
    canDelete: true,
    isArchive: false,
  },
  {
    name: "Задачи на февраль",
    tasks: [],
    id: 3,
    canDelete: true,
    isArchive: false,
  },
  {
    name: "Задачи дениса",
    tasks: [
      {
        id: 0,
        title: "Провести митап",
        completed: false,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: "Wed Aug 02 2023",
      },
      {
        id: 1,
        title: "Сделать UI-kit",
        completed: false,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: "Wed Aug 02 2023",
      },
      {
        id: 2,
        title: "Провести митап",
        completed: false,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: "Wed Aug 02 2023",
      },
      {
        id: 3,
        title: "Задизайнить плакат",
        completed: false,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: "Wed Aug 02 2023",
      },
      {
        id: 4,
        title: "Сделать поздстравление девочкам",
        completed: false,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: "Wed Aug 02 2023",
      },
      {
        id: 5,
        title: "Задизайнить плакат",
        completed: true,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: "Wed Aug 02 2023",
      },
    ],
    id: 4,
    canDelete: true,
    isArchive: false,
  },
];
