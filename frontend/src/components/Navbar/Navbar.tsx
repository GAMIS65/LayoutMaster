"use client"
import Link from 'next/link'
import styles from "@/components/Navbar/Navbar.module.css"
import { cookies } from 'next/headers'
import decodeToken from "@/utils/decodeToken"
import { useEffect, useState } from 'react'

function Navbar() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        if(document.cookie) {
            setUsername(decodeToken(document.cookie).name)
        }
    }, [username])
    return (
        <div className={styles.navBar}>
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
                {username ? (
                    <>
                        <li>
                            <Link href={"/stats"} className={styles.navItem}>Štatistiky</Link>
                        </li>
                        <li>
                            <Link href={"/login"} className={styles.navItem}>{username}</Link>
                        </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link href={"/register"} className={styles.navItem}>Registrovať sa</Link>
                    </li>
                    <li>
                        <Link href={"/login"} className={styles.navItem}>Prihlásiť sa</Link>
                    </li>
                    </>
                )}
            </ul>
            </div>
        </nav>
        </div>
    )
}

export default Navbar;