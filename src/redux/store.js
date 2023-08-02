import { configureStore } from "@reduxjs/toolkit";
import tasksAndFoldersReducer from "./tasksAndFoldersSlice";

export default configureStore({
  reducer: {
    tasksAndFolders: tasksAndFoldersReducer,
  },
});