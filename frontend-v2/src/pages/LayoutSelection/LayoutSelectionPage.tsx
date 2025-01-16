import styles from './LayoutSelectionPage.module.css'
import Card from '../../components/Card/Card.tsx'
import useLayoutStore from '../../store/layoutStore.ts';

function LayoutSelectionPage() {
	const { setLayout } = useLayoutStore();
	// TODO: Load this from the layouts file
	const layouts = [
		{
			title: 'Qwerty ANSI',
			label: 'Most Popular',
			labelColor: 'orange',
		},
		{
			title: 'Dvorak',
		},
		{
			title: 'Colemak',
		},
		{
			title: 'Colemak DH',
		},
		{
			title: 'Semimak',
		},
		{
			title: 'Workman',
		},

	];

	// TODO: Add a keyboard showcase
	return (
		< div className={styles.container} >
			<div className={styles.header}>
				<h1 className={styles.title}>Choose your keyboard layout</h1>
			</div>
			<div className={styles.modesGrid}>
				{layouts.map((layout, index) => (
					<Card
						key={index}
						title={layout.title}
						label={layout.label}
						labelColor={layout.labelColor}
						link='/modes'
						onClick={() => setLayout(layout.title)}
					/>
				))}
			</div>
		</div >
	);
};

export default LayoutSelectionPage;
