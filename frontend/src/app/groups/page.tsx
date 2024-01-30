"use client"
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import fetchBackend from "@/utils/fetchBackend";

const backendURL = process.env.NEXT_PUBLIC_BACKEND;

type Group = {
    id: string,
    name: string,
}

function Groups() {
    const [groups, setGroups] = useState<Array<Group>>();
    const [groupInfo, setGroupInfo] = useState({name: "", inviteCode: ""});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setGroupInfo({
            ...groupInfo,
            [event.target.name]: event.target.value
            });
        };

        const handleSubmit = async (event: React.FormEvent) => {
        const response = await fetch(`https://${backendURL}/api/groups`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${document.cookie.replace("token=", "")}` 
            },
            body: JSON.stringify(groupInfo),
        });

        if (response.ok) {
                router.refresh();
        }
    }


    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const data = await fetchBackend(`/groups`, 'GET', document.cookie.replace("token=", ""));
                if (data.length === 0) {
                    setGroups(undefined);
                } else {
                    setGroups(data);
                }
            } catch (error: any) {
                    console.error(`An error occurred: ${error.message}`);
                setGroups(undefined);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [router]);
    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.groupContainer}>
                    <h1>Vaše skupiny</h1>
                    {groups && groups.map((group) => {
                        return (
                            <button key={group.id}><Link href={`/groups/${group.id}`} key={group.id}><h2>{group.name}</h2></Link></button>
                        )
                    })}
                    <div className={styles.add}>
                        <button onClick={() => setShowModal(!showModal)}>Pridať skupinu</button>
                    </div>
                    {showModal && 
                        <form onSubmit={handleSubmit}>
                            <label>
                        <p>Názov skupiny:</p>
                        <input type="text" name="name" value={groupInfo.name} onChange={handleChange} required />
                    </label>
                    <label>
                        <p>Heslo na pripojenie do skupiny:</p>
                        <input type="text" name="inviteCode" value={groupInfo.inviteCode} onChange={handleChange} required />
                    </label>
                    <button type="submit" value="Prihlásiť sa">Vytvoriť</button>
                </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default Groups;