"use client"
import Image from "next/image";
import { storage } from "./_lip/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { database } from "./_lip/firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import HomeQuizzCard from "@/components/quizz/HomeQuizzCard";


export default function Home() {
  const [QuizzCollection, setQuizzCollection] = useState([])
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(database, "questions"));
      let quizzs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        quizzs.push({ id: doc.id, quizz: doc.data() })
      });
      setQuizzCollection(quizzs)

    })()
  }, [])

  const quizzList = QuizzCollection.map((quizz, index) => <HomeQuizzCard key={uuidv4()} quizz={quizz.quizz} /> )

  return (
    <main className="w-screen">
      <div className="w-full row gap-5 px-10">
      {quizzList}

      </div>
    </main>
  );
}
