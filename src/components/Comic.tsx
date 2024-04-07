import { Comic } from '../services/models/Comic';
import styles from './Comic.module.css';

export const ComicThumbNail: FC<Comic> = ({ comic }): JSX.Element => {
	return (
		<div className={styles.container}>
			<img className={styles.thumbnail} src={`${comic?.img}`} loading="lazy"/>
			<h4 className={styles.thumbnailTitle}>{`${comic?.title}`}</h4>
		</div>
	)
}