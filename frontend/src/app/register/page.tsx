"use client"

import { useState } from "react";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

const backendURL = process.env.NEXT_PUBLIC_BACKEND;

function Register() {
    const [credentials, setCredentials] = useState({username: '', email: '', password: '', role: 'User', groupName: "", groupCode: ''});
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
        ...credentials,
        [event.target.name]: event.target.value
        });
        console.log(credentials);
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCredentials({
            ...credentials,
        role: event.target.value
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let path;
    credentials.role === "Student" ? path = "/api/students/register" : path = "/api/users/register"; 
    console.log(path);
    const response = await fetch(`https://${backendURL}${path}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        router.push("/login");
  }

  console.log(credentials);
};

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                <label>
                    <label>
                        <p>Uživateľské meno:</p>
                        <input type="text" name="username" minLength={2} maxLength={64} value={credentials.username} onChange={handleChange} required />
                    </label>
                        <p>Email:</p>
                        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                    </label>
                    <label>
                        <p>Heslo:</p>
                        <input type="password" name="password" maxLength={64} value={credentials.password} onChange={handleChange} required />
                    </label>
                    <label>
                        <p>Som:</p>
                        <select name="role" onChange={handleRoleChange}>
                            <option value="User">Normálny Uživateľ</option>
                            <option value="Student">Žiak</option>
                            <option value="Teacher">Učiteľ</option>
                        </select>
                    </label>
                    {
                    credentials.role === "Student" ? 
                    (
                    <div>
                    <label>
                        <p>Meno vašej skupiny:</p>
                        <input type="text" name="groupName" maxLength={64} value={credentials.groupName} onChange={handleChange} required />
                    </label>
                        <label>
                            <p>Heslo vašej skupiny:</p>
                            <input type="text" name="groupCode" maxLength={64} value={credentials.groupCode} onChange={handleChange} required />
                        </label>
                    </div>) : ""
                    }
                    <button type="submit" value="Prihlásiť sa">Prihlásiť sa</button>
                </form>
            </div>
        </div>
    );
}

export default Register;