import { Link } from 'react-router';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  label?: string;
  labelColor?: string;
  description?: string;
  link?: string;
  comingSoon?: boolean;
  onClick?: () => void;
};

function Card({
  title,
  label,
  labelColor,
  comingSoon,
  description,
  link,
  onClick,
}: CardProps) {
  return (
    <Link
      to={link ? link : '#'}
      className={`${styles.modeCard} ${comingSoon ? styles.comingSoon : ''}`}
      onClick={onClick}
    >
      {label && (
        <span
          className={`${styles.difficulty} ${labelColor && styles[labelColor]}`}
        >
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
      )}

      <h2 className={styles.title}>
        {title}
        {comingSoon && (
          <span className={styles.comingSoonBadge}>Coming Soon</span>
        )}
      </h2>

      <p className={styles.description}>{description ? description : ''}</p>
    </Link>
  );
}

export default Card;
