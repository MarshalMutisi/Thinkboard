import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreatePages from "./pages/CreatePages";
import NodeDetailPage from "./pages/NodeDetailPage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest" >

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePages />} />
        <Route path="/note/:id" element={<NodeDetailPage/>} />
      </Routes>
     
    </div>
  );
};
export default App;