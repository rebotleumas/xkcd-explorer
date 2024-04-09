import styles from './Header.module.css';
import logoSvg from '../assets/filterlogo.svg'; // Import your SVG file

export const Header = (): JSX.Element => {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let newDate = new Date()
	let date = newDate.getDate();
	let month = newDate.getMonth();
	let year = newDate.getFullYear();

    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li className={styles.headerNavItem}><a href="/" className={styles.listTitle}>This month</a></li>
                    <li className={styles.headerNavItem}><a href="/about" className={styles.listTitle}>{year}</a></li>
                    <li className={styles.headerNavItem}><a href="/services" className={styles.listTitle}>{monthNames[month]}</a></li>
                    <li className={styles.headerNavItem}><a href="/services" className={styles.listTitle}>{monthNames[(month-1) % 12]}</a></li>
                    <li className={styles.headerNavItem}><a href="/services" className={styles.listTitle}>{monthNames[(month-2) % 12]}</a></li>
                </ul>
            </nav>
        </header>
    );
}