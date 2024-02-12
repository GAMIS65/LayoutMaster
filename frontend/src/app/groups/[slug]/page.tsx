"use client"

import Navbar from "@/components/Navbar/Navbar";
import fetchBackend from "@/utils/fetchBackend";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import CloseButton from "@/components/CloseButton/CloseButton";
import { useRouter } from "next/navigation";

type Student = {
    id: string,
    username: string
}

type Data = {
    id: string,
    name: string,
    students: Array<Student>
}

function GroupPage({params}: {params: {slug: string}}) {
    const [students, setStudents] = useState<Array<Student>>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const deleteGroup = async () => {
        try {
            await fetchBackend(`/groups/${params.slug}`, 'DELETE', document.cookie.replace("token=", ""));
            router.push("/groups");
        } catch (error: any) {
            console.error(`An error occurred: ${error.message}`);
        }
    }

    useEffect(() => {
        setLoading(true);
            const fetchData = async () => {
                try {
                    const data = await fetchBackend(`/groups/${params.slug}`, 'GET', document.cookie.replace("token=", ""));
                    if (data.length === 0) {
                        setStudents(undefined);
                    } else {
                        setStudents(data.students);
                    }
                } catch (error: any) {
                        console.error(`An error occurred: ${error.message}`);
                    setStudents(undefined);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
    }, [params.slug]);

    return (
        <div>
            <Navbar />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1>Žiaci:</h1>
                    {students && students.map((student) => {
                        return (
                            <Link href={`/stats?id=${student.id}`} key={student.id} className={styles.studentContainer}> 
                                    <h2 key={student.id}>{student.username}</h2>
                            </Link>
                        )
                    })}
                    <button className={styles.deleteGroup} onClick={deleteGroup}>Vymazať skupinu</button>
                </div>
            </div>
        </div>
    )
}

export default GroupPage;