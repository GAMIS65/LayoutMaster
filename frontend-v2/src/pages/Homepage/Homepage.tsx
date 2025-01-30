import Keyboard from '../../components/Keyboard/Keyboard';
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
        <div className={styles.featureCard}>
          <h2>Real-time Analytics</h2>
          <p>
            Track your WPM, accuracy, and progress with detailed metrics and
            beautiful visualizations.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h2>Layout Editor</h2>
          <p>
            Using an alternative layout? Easily create it in our layout editor
            or import it from a file!
          </p>
        </div>
        <div className={styles.featureCard}>
          <h2>Free and Open Source</h2>
          <p>
            LayoutMaster is completely free to use with no registration
            required. If you like this project, {' '}
            <a href="https:github.com/gamis65/layoutmaster">consider supporting us!</a>
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
