import Timer from './Components/Timer/Timer';
import ToDoList from './Components/ToDoList/ToDoList';
export default function Home() {
  
  return (
    <main className="h-screen pt-5">
      <Timer />
      <ToDoList />
    </main>
  );
}
