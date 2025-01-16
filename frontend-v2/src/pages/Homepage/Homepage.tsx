import styles from './Homepage.module.css';
import { Link } from 'react-router';

function App() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Learn To Type On Any Layout</h1>
        <p>
          A modern, fast, and efficient approach to improve your typing speed
          and accuracy. Built for everyone.
        </p>
        <Link to="/layouts" className={styles.ctaButton} viewTransition>
          Start Typing
        </Link>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h3>Real-time Analytics</h3>
          <p>
            Track your WPM, accuracy, and progress with detailed metrics and
            beautiful visualizations.
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>Layout Editor</h3>
          <p>
            Using an alternative layout? Easily create it in our layout editor
            or import it from a file!
          </p>
        </div>
        <div className={styles.featureCard}>
          <h3>Free and Open Source</h3>
          <p>
            LayoutMaster is completely free to use with no registration
            required. Support us by starring the project on{' '}
            <a href="https:github.com/gamis65/layoutmaster">GitHub</a>!
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
