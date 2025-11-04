import classes from './Header.module.css'

export const Header = () => {
    return (
        <header className={classes.header}>
            <span>Antipov's shop</span>
            <div>
                <input placeholder="Search something"></input>
                <button>Q</button>
            </div>
            <div>
                <div>
                    <button>Q</button>
                </div>
            </div>
        </header>
    )
}