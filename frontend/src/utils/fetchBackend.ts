import { redirect, useRouter } from "next/navigation";

const backendURL = process.env.NEXT_PUBLIC_BACKEND;

export default async function fetchBackend(path: string, method: string, token?: string, body?: any) {
    const response = await fetch(`https://${backendURL}/api${path}`, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const r = await response.text();
            return r ? JSON.parse(r) : {};
        } else if (response.status === 401) {
            console.error(response.status)
            redirect("/login");
        } else if(!response.ok) {
            const r = await response.json();
            throw new Error(`${response.status} ${r.statusText}`);
        }
}