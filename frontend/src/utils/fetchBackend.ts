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
            return response.json();
        } else if (response.status === 401) {
            console.error(response.status)
            redirect("/login");
        } else {
            throw new Error(`Error fetching data: ${response.status}`);
        }
}