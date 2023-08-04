import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const tasksAndFoldersSlice = createSlice({
  name: "tasksAndFolders",
  initialState: initialState,
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
      const folderIndex = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      const taskIndex = state[folderIndex].tasks.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      state[folderIndex].tasks[taskIndex].completed = action.payload.completed;
    },
    addTodo: (state, action) => {
      const index = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      state[index].tasks.push({
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        archived: false,
        previousFolderId: null,
        timeSpentMs: 0,
        timeSpentTodayMs: 0,
        lastDayTracked: null,
        dateCreated: new Date().toDateString(),
      });
    },
    deleteTodo: (state, action) => {
      const folderIndex = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      const taskIndex = state[folderIndex].tasks.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      state[folderIndex].tasks.splice(taskIndex, 1);
    },
    archiveTodo: (state, action) => {
      const folderIndex = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      const taskIndex = state[folderIndex].tasks.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      const deletedTask = state[folderIndex].tasks.splice(taskIndex, 1)[0];

      const archiveFolderIndex = state.findIndex(
        (folder) => folder.id === 0,
        //     TODO: Change with isArchive
      );
      state[archiveFolderIndex].tasks.push({
        ...deletedTask,
        previousFolderId: action.payload.folderId,
      });
    },
    unArchiveTodo: (state, action) => {
      const folderIndex = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      const taskIndex = state[folderIndex].tasks.findIndex(
        (task) => task.id === action.payload.taskId,
      );
      const unArchivedTask = state[folderIndex].tasks.splice(taskIndex, 1)[0];

      const previousFolderIndex = state.findIndex(
        (folder) => folder.id === unArchivedTask?.previousFolderId,
      );
      state[previousFolderIndex].tasks.push({
        ...unArchivedTask,
        previousFolderId: null,
      });
    },
    addASecondToTaskTimeTracked: (state, action) => {
      const folderIndex = state.findIndex(
        (folder) => folder.id === action.payload.folderId,
      );
      const taskIndex = state[folderIndex].tasks.findIndex(
        (task) => task.id === action.payload.taskId,
      );

      if (
        new Date(
          state[folderIndex].tasks[taskIndex].lastDayTracked,
        ).toDateString() !== new Date().toDateString()
      ) {
        state[folderIndex].tasks[taskIndex].lastDayTracked = new Date();
        state[folderIndex].tasks[taskIndex].timeSpentTodayMs = 0;
      }

      state[folderIndex].tasks[taskIndex].timeSpentTodayMs += 1000;
      state[folderIndex].tasks[taskIndex].timeSpentMs += 1000;
    },
  },
});

export const {
  addFolder,
  deleteFolder,
  toggleComplete,
  addTodo,
  deleteTodo,
  archiveTodo,
  unArchiveTodo,
  addASecondToTaskTimeTracked,
} = tasksAndFoldersSlice.actions;
export default tasksAndFoldersSlice.reducer;
