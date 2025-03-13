import styles from './ModesPage.module.css';
import Card from '../../components/Card/Card';

function ModesPage() {
  const modes = [
    {
      title: 'Key by Key',
      label: 'beginner',
      labelColor: 'green',
      description:
        'Master the basics with guided key-by-key practice. Perfect for learning proper finger placement and building muscle memory.',
      link: '/keybykey',
    },
    {
      title: 'N-gram',
      label: 'intermediate',
      labelColor: 'orange',
      description:
        'Improve your fluency and speed by practicing sequences of letters, digraphs, or trigraphs that appear frequently in real-world typing.',
      comingSoon: true,
      link: '#',
    },
    {
      title: 'Bursts',
      label: 'intermediate',
      labelColor: 'orange',
      description: 'Practice common short words in rapid succession.',
      comingSoon: true,
      link: '#',
    },
    {
      title: 'Quotes',
      label: 'Advanced',
      labelColor: 'red',
      description:
        'Type famous quotes and passages from literature. Improve your rhythm and flow with meaningful text.',
      comingSoon: true,
      link: '#',
    },
    {
      title: 'Code',
      label: 'Expert',
      labelColor: 'purple',
      description:
        'Practice typing code snippets in various programming languages.',
      comingSoon: true,
      link: '#',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Typing Practice Modes</h1>
      </div>

      <div className={styles.modesGrid}>
        {modes.map((mode, index) => (
          <Card
            key={index}
            title={mode.title}
            description={mode.description}
            label={mode.label}
            labelColor={mode.labelColor}
            comingSoon={mode.comingSoon}
            link={mode.link}
          />
        ))}
      </div>
    </div>
  );
}

export default ModesPage;
