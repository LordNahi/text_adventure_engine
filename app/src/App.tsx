import path from "path";
import fs from "fs";

import "./App.css";

const PATH_TO_WORLDS = path.resolve(__dirname, "./worlds");
const PATH_TO_WORLD = path.resolve(PATH_TO_WORLDS, "./intranel.json");

const loadWorld = () => {
  const data = fs.readFileSync(PATH_TO_WORLD, "utf8");

  console.log(data);
};

function App() {
  return (
    <div className="app-container">
      <section className="section-base menu-context">
        <div className="grid-container"></div>
      </section>
      <section className="section-base menu-grid"></section>
    </div>
  );
}

export default App;
