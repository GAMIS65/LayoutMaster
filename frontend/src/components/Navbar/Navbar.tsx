import Link from 'next/link'
import styles from "@/components/Navbar/Navbar.module.css"

function Navbar() {
    return (
        <nav>
            <div className={styles.left}>
                <ul>
                    <li>
                        <Link href={"/"} className={styles.navItem}>
                            <h1>
                                <span style={{color: "var(--ring-right"}}>L</span>
                                <span style={{color: "var(--pinky-left"}}>a</span>
                                <span style={{color: "var(--index-right"}}>y</span>
                                <span style={{color: "var(--ring-right"}}>o</span>
                                <span style={{color: "var(--index-right"}}>u</span>
                                <span style={{color: "var(--index-left"}}>t</span>
                                <span style={{color: "var(--index-right"}}>M</span>
                                <span style={{color: "var(--pinky-left"}}>a</span>
                                <span style={{color: "var(--ring-left"}}>s</span>
                                <span style={{color: "var(--index-left"}}>t</span>
                                <span style={{color: "var(--middle-left"}}>e</span>
                                <span style={{color: "var(--index-left"}}>r</span>
                            </h1>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
            <ul>
                <li>
                    <Link href={"/stats"} className={styles.navItem}>Štatistiky</Link>
                </li>
                <li>
                    <Link href={"/login"} className={styles.navItem}>Prihlásiť sa</Link>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;