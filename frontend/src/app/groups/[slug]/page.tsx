"use client"

import Navbar from "@/components/Navbar/Navbar";
import fetchBackend from "@/utils/fetchBackend";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

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
        <div className={styles.mainContainer}>
            <Navbar />
            {students && students.map((student) => {
                return (
                    <h2 key={student.id}>{student.username}</h2>
                )
            })}
        </div>
    )
}

export default GroupPage;