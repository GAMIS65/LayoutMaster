import styles from "./FeatureCard.module.css"

type FeatureCardProps = {
	title: string;
	description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
	return (
		<div className={styles.featureCard}>
			<h2>{title}</h2>
			<p>
				{description}
			</p>
		</div>
	)
}

export default FeatureCard;
