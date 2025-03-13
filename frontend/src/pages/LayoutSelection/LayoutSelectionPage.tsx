import styles from './LayoutSelectionPage.module.css';
import Card from '../../components/Card/Card.tsx';
import useLayoutStore from '../../store/layoutStore.ts';
import layoutsJSON from '../../layouts.json';
import { LayoutConfig } from '../../types/keyboardTypes.ts';

function LayoutSelectionPage() {
  const { setLayout } = useLayoutStore();
  const layouts = layoutsJSON as LayoutConfig;
  const layoutNames = Object.keys(layouts);

  // TODO: Add a keyboard showcase
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose your keyboard layout</h1>
      </div>
      <div className={styles.modesGrid}>
        {layoutNames.map((layout, index) => (
          <Card
            key={index}
            title={`${layout[0].toUpperCase()}${layout.slice(1, layout.length)}`}
            link="/modes"
            onClick={() => setLayout(layout)}
          />
        ))}
      </div>
    </div>
  );
}

export default LayoutSelectionPage;
