"use client"
import Image from "next/image";
import { storage } from "../utils/database/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../utils/database/firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import HomeQuizzCard from "@/components/quizz/HomeQuizzCard";
import Header from "@/components/header/Header";
import LoadingOverlay from "@/components/global/LoadingOverlay";
import Tilt from 'react-parallax-tilt';


export default function Home() {
  const [quizzCollection, setQuizzCollection] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const querySnapshot = await getDocs(collection(database, "categories"));
      let quizzs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        quizzs.push({ id: doc.id, quizz: doc.data() })
      });
      setQuizzCollection(quizzs)
      setLoading(false)
    })()
  }, [])

  const quizzList = quizzCollection.map((quizz, index) => <Tilt key={uuidv4()}><HomeQuizzCard quizz={quizz.quizz} /></Tilt>)

  return (
    <main className="w-screen">
      {loading && <LoadingOverlay />}
      <div className='w-full flex-center pb-10'>
        <Header />
      </div>
      <div className="w-full grid grid-cols-5 grid-rows-auto p-10 gap-5 px-10">
        {quizzList}
      </div>
      <div>
        
      </div>
    </main>
  );
}
