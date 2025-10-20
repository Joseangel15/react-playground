import Timer from './Components/Timer/Timer';
import ToDoList from './Components/ToDoList/ToDoList';
import ModalSection from './Components/ModalSection/ModalSection'
export default function Home() {
  
  return (
    <main className="h-screen pt-5">
      <Timer />
      <ToDoList />
      <ModalSection />
    </main>
  );
}
