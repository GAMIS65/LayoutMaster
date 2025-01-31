import Keyboard from '../../components/Keyboard/Keyboard';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import layouts from '../../layouts.json'
import styles from './Homepage.module.css';
import { Link } from 'react-router';

function App() {
  return (
    <>
      <section className={styles.hero}>
        <h1>LayoutMaster</h1>
        <p>
          A modern, fast, and efficient platform to improve your typing speed
          and accuracy on any keyboard layout. Built for everyone.
        </p>
        <Link to="/layouts" className={styles.ctaButton} viewTransition>
          Start Typing
        </Link>
      </section>

      <section className={styles.keyboard}>
        <Keyboard layout={layouts.qwerty} />
      </section>

      <section className={styles.features}>
        <FeatureCard title={"Real-time Analytics"} description={"Track your WPM, accuracy, and progress with detailed metrics and beautiful visualizations."} />
        <FeatureCard title={"Layout Editor"} description={"Using an alternative layout? Easily create it in our layout editor or import it from a file!"} />
        <FeatureCard title={"Free and Open Source"} description={"LayoutMaster is completely free to use with no registration required."} />
      </section>
    </>
  );
}

export default App;
