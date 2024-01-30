"use client"

import { useState } from "react";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import fetchBackend from "@/utils/fetchBackend";
import Navbar from "@/components/Navbar/Navbar";

const backendURL = process.env.NEXT_PUBLIC_BACKEND;

function LogIn() {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
        ...credentials,
        [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const data = await fetchBackend("/users/login", "POST", undefined, credentials);
                if (data) {
                    document.cookie = `token=${data.token}; path=/`; 
                    router.push("/");       
                }
        } catch (error) {
            console.error(error);
        } 

    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                <label>
                        <p>Email:</p>
                        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                    </label>
                    <label>
                        <p>Heslo:</p>
                        <input type="password" name="password" maxLength={64} value={credentials.password} onChange={handleChange} required />
                    </label>
                    <button type="submit" value="Prihlásiť sa">Prihlásiť sa</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn