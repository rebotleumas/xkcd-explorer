import { Comic } from '../services/models/Comic';
import { Modal } from './Modal';
import { useState } from 'react';
import styles from './Comic.module.css';

export const ComicThumbNail: FC<Comic> = ({ comic }): JSX.Element => {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.container} key={comic?.id} data-cy="thumbnail">
			<img className={styles.thumbnail} src={`${comic?.img}`} loading="lazy" onClick={() => setOpen(true)}/>
			<h4 className={styles.thumbnailTitle}>{getComicTitle(comic)}</h4>
			{open && <Modal setIsOpen={setOpen} imgSrc={`${comic?.img}`} heading={`${comic?.title} (${getComicDate(comic)})`} />}
		</div>
	)
}

const getComicTitle = (comic) => {
	const len = comic?.title.length;
	const maxLen = 25;
	return len > maxLen ? `${comic?.title.slice(0, maxLen)}...` : comic?.title;
}

const getComicDate = (comic) => {
	return `${comic?.year}-${comic?.month < 10 ? '0' + comic?.month : comic?.month}-${comic?.day < 10 ? '0' + comic?.day : comic?.day}`;
}