import { Link } from 'react-router';
import styles from './ModeCard.module.css';

type CardProps = {
	title: string,
	description: string,
	difficulty: string,
	link: string,
	comingSoon: boolean
}

const ModeCard = ({
	title,
	difficulty,
	description,
	comingSoon,
	link,
}: CardProps) => {
	return (
		<Link to={comingSoon ? '#' : link} className={`${styles.modeCard} ${comingSoon ? styles.comingSoon : ''}`}>
			<span className={`${styles.difficulty} ${styles[difficulty]}`}>
				{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
			</span>
			<h2 className={styles.title}>
				{title}
				{comingSoon && <span className={styles.comingSoonBadge}>Coming Soon</span>}
			</h2>
			<p className={styles.description}>{description}</p>
		</Link>
	);
};

export default ModeCard;
