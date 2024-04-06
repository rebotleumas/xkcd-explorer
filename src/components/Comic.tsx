import { Comic } from '../services/models/Comic';
import styles from './Comic.module.css';

export const ComicThumbNail: FC<Comic> = ({ comic }): JSX.Element => {
	return (
		<div>
			<img className={styles.thumbnail} src={`${comic?.img}`}/>
			<h4 className={styles.thumbnailTitle}>{`${comic?.title}`}</h4>
		</div>
	)
}