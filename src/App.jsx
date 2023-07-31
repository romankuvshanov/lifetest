import Header from "./components/Header/Header";
import FoldersSection from "./components/FoldersSection/FoldersSection";
import TasksSection from "./components/TasksSection/TasksSection";
import './App.scss';

export default function App() {
  return (
    <div className={"app"}>
      <Header />
      <div className={"mainSection"}>
          <FoldersSection />
          <TasksSection />
      </div>
    </div>
  );
}
