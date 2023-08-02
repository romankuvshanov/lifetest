import { createSlice } from "@reduxjs/toolkit";

const tasksAndFoldersSlice = createSlice({
  name: "tasksAndFolders",
  initialState: [
    {
      name: "Основные задачи",
      tasks: [],
      id: 0,
      canDelete: false,
    },
    {
      name: "Аутсорс",
      tasks: [],
      id: 1,
      canDelete: true,
    },
    {
      name: "Задачи на февраль",
      tasks: [],
      id: 2,
      canDelete: true,
    },
    {
      name: "Задачи дениса",
      tasks: [
        { id: 0, title: "Провести митап", completed: false, archived: false },
        { id: 1, title: "Сделать UI-kit", completed: false, archived: false },
        { id: 2, title: "Провести митап", completed: false, archived: false },
        {
          id: 3,
          title: "Задизайнить плакат",
          completed: false,
          archived: false,
        },
        {
          id: 4,
          title: "Сделать поздстравление девочкам",
          completed: false,
          archived: false,
        },
        {
          id: 5,
          title: "Задизайнить плакат",
          completed: true,
          archived: false,
        },
      ],
      id: 3,
      canDelete: true,
    },
  ],
  reducers: {
    addFolder: (state, action) => {
      const newFolder = {
        id: Date.now(),
        name: action.payload.name,
        tasks: [],
        canDelete: true,
      };
      state.push(newFolder);
    },
    deleteFolder: (state, action) => {
      return state.filter((folder) => folder.id !== action.payload.id);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      state[index].tasks[action.payload.taskId].completed =
        action.payload.completed;
    },
  },
});

export const { addFolder, deleteFolder, toggleComplete, deleteTodo } =
  tasksAndFoldersSlice.actions;
export default tasksAndFoldersSlice.reducer;
