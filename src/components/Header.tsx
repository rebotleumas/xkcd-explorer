import styles from './Header.module.css';
import logoSvg from '../assets/filterlogo.svg';

const FilterButton = ({ dateFrom, dateTo, filterLabel, setFilter }) => {
    return (<button
            href="/" 
            className={styles.filterButton} 
            onClick={() => setFilter({dateFrom: dateFrom,dateTo: dateTo})}>
            {filterLabel}
        </button>);
};

const getFirstDateOfMonth = (month: number, year: number) => {
    return `${year}-${month+1 < 10 ? `0${month+1}`: month+1}-01`;
}

const getLastDateOfMonth = (month: number, year: number) => {
    return `${year}-${month+1 < 10 ? `0${month+1}`: month+1}-${(new Date(year, month + 1, 0)).getDate()}`;
}

export const Header = ({ setFilter, filter }): JSX.Element => {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const currentDate = new Date();
	const date = currentDate.getDate();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li className={styles.headerNavItem}>
                        <FilterButton dateFrom={`${currentYear}-01-01`} dateTo={currentDate.toISOString().split('T')[0]} filterLabel={currentYear} setFilter={setFilter}/>
                    </li>
                    <li className={styles.headerNavItem}>
                        <FilterButton dateFrom={getFirstDateOfMonth(currentMonth, currentYear)} dateTo={getLastDateOfMonth(currentMonth, currentYear)} filterLabel={monthNames[currentMonth]} setFilter={setFilter}/>
                    </li>
                    <li className={styles.headerNavItem}>
                        <FilterButton dateFrom={getFirstDateOfMonth(currentMonth-1, currentYear)} dateTo={getLastDateOfMonth(currentMonth-1, currentYear)} filterLabel={monthNames[(currentMonth-1)%12]} setFilter={setFilter}/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}