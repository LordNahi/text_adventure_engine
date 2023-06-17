import DungeonGrid from './components/DungeonGrid';

import { appContainer, sectionBase, menuContext, menuContent } from './AppStyle';
import { classes } from 'typestyle/lib/internal/utilities';

function App() {
  return (
    <div className={appContainer}>
      <section className={classes(sectionBase, menuContext)}></section>
      <section className={classes(sectionBase, menuContent)}>
        <DungeonGrid />
      </section>
    </div>
  );
}

export default App;
