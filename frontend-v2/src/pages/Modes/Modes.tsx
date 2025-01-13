import styles from './Modes.module.css';
import ModeCard from '../../components/ModeCard/ModeCard';

const Modes = () => {
  const modes = [
    {
      title: 'Key by Key',
      difficulty: 'beginner',
      description:
        'Master the basics with guided key-by-key practice. Perfect for learning proper finger placement and building muscle memory.',
      comingSoon: false,
      link: '/key-by-key',
    },
    {
      title: 'N-gram',
      difficulty: 'intermediate',
      description:
        'Improve your fluency and speed by practicing sequences of letters, digraphs, or trigraphs that appear frequently in real-world typing.',
      comingSoon: true,
      link: '/ngram',
    },
    {
      title: 'Bursts',
      difficulty: 'intermediate',
      description:
        'Practice common letter combinations and short words in rapid succession.',
      comingSoon: true,
      link: '/bursts',
    },
    {
      title: 'Quotes',
      difficulty: 'advanced',
      description:
        'Type famous quotes and passages from literature. Improve your rhythm and flow with meaningful text.',
      comingSoon: true,
      link: '/quotes',
    },
    {
      title: 'Code',
      difficulty: 'expert',
      description:
        'Practice typing code snippets in various programming languages.',
      comingSoon: true,
      link: '/code',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Typing Practice Modes</h1>
      </div>

      <div className={styles.modesGrid}>
        {modes.map((mode, index) => (
          <ModeCard
            key={index}
            title={mode.title}
            description={mode.description}
            difficulty={mode.difficulty}
            comingSoon={mode.comingSoon}
            link={mode.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Modes;
