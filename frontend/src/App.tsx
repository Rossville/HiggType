import TypeInContainer from "./components/TypeInContainer"
import { useSelector } from "react-redux";
import './App.css';
import { RootState } from "./store/store";

function App() {
  const typeData = useSelector((state:RootState)=>state.TypingData);
  console.log(typeData);
  return (
    <>
      <TypeInContainer/>
    </>
  )
}

export default App
