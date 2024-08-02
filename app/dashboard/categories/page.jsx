"use client"
import {useEffect, useState} from "react";
import {getDocs, collection} from "firebase/firestore";
import {database} from "@/utils/database/firebase/firebaseConfig";
import {v4 as uuidv4} from 'uuid';
import HomeQuizzCard from "@/components/quizz/HomeQuizzCard";
import Link from "next/link";

const Categories = () => {
    const [quizzCollection, setQuizzCollection] = useState([])
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(database, "categories"));
            let quizzs = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                quizzs.push({id: doc.id, quizz: doc.data()})
            });
            setQuizzCollection(quizzs)

        })()
    }, [])
    const quizzList = quizzCollection.map(
        (quizz, index) => <Link key={uuidv4()} href={`/dashboard/newQuestion?id=${quizz.id}&name=${quizz.quizz.title}`}>
            <HomeQuizzCard quizz={quizz.quizz}/></Link>
    )

    return (
        <main className="w-screen pt-10">
            <div className="w-full row flex-wrap gap-5 px-10">
                {quizzList}

            </div>
        </main>
    );
}

export default Categories