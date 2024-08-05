"use client"
import CategoryAndQuestions from '@/components/game/CategoryAndQuestions';
import GameFooter from '@/components/game/GameFooter';
import GameHeader from '@/components/game/GameHeader';
import Question from '@/components/game/questions/Question';
import LoadingOverlay from '@/components/global/LoadingOverlay';
import {useStore} from '@/components/stateManager/DataStore';
import {database} from '@/utils/database/firebase/firebaseConfig';
import getGameAssets from '@/utils/database/functions/getGameAssets';
import defaultGameRecord from '@/utils/helpers/defaultGameRecord';
import {doc, getDoc} from 'firebase/firestore';
import {useRouter, useSearchParams} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';

const gameDefault = {
    "id": "KGcJsnz4di2Y3645Td8Q",
    "gameObj": {
        "team2": "b",
        "title": "my game",
        "team1": "a",
        "userId": "1",
        "categories": [
            {
                "questions": [
                    "eNejAzRZrsiqwa2Fbl7V",
                    "nFMiQYbaShO3Xs25Nuon",
                    "qdIcr5G91T7420ryHgTy",
                    "xaRorqwH40kgDdmNLPd7",
                    "i19JXgM9eBExG2LWxc7F",
                    "MuArW4ZneOn18KFQ7bl2"
                ],
                "levels": [
                    "easy",
                    "medium",
                    "medium",
                    "medium",
                    "hard",
                    "hard"
                ],
                "category": "mPpiny94vAUzEdAmMbFp"
            }, {
                "category": "NsC3g8Jzy24gDm2OpRFD",
                "levels": [
                    "easy",
                    "medium",
                    "medium",
                    "medium",
                    "hard",
                    "hard"
                ],
                "questions": [
                    "iM9f736YLzT9Yfrk7PMJ",
                    "corKwGQNK4cLT0hoPcQf",
                    "sIbehRld5erUlnXuDR4J",
                    "Xrr1vhsbNMQNg7hjaeE8",
                    "klMOaGEfrOQCU3x7Jde8",
                    "Jhs3pPb5ZEXpHE5nFGHf"
                ]
            }, {
                "questions": [
                    "nEcZWYTGKzD6g0bsf4jd",
                    "9KmOeif9flmjLWvKu5XZ",
                    "xDAKVxcv2WR1QXHinpGQ",
                    "AWEsBpJ0bexRNjisrSae",
                    "jvHVQmmd3JrVCPvonrJA",
                    "BYbLAajs9IymZAamaeb9"
                ],
                "levels": [
                    "easy",
                    "medium",
                    "medium",
                    "medium",
                    "hard",
                    "hard"
                ],
                "category": "07XFex8Hsez7BrbiLPWq"
            }, {
                "questions": [
                    "OFFDrlMqXuFPItplAGn0",
                    "PquxTTRfj1rrnOJKgPBg",
                    "YDX6bKWkuNRYUObCu903",
                    "ZhkIgJDruv9DMnW00UI3",
                    "uuIAWEpieDonhDt2QVF2",
                    "g0RuEuKoMv52m0I3iUpN"
                ],
                "levels": [
                    "easy",
                    "medium",
                    "medium",
                    "medium",
                    "hard",
                    "hard"
                ],
                "category": "49cur2P5rdiiuqdAKbq1"
            }, {
                "questions": [
                    "N642aLw6T8nR6wEt6NZt",
                    "3sY3wbNIpp3QiFff2DA8",
                    "JlaOvYrTrHSELnuDEAvY",
                    "RbO4HUh5uRD6wTBveCqg",
                    "tl8WMbKISZpZLbVhZNKc",
                    "mbXNu23ek9RIDKZz4lpe"
                ],
                "category": "OMFcZ5Wjz1hvPvX383FC",
                "levels": [
                    "easy",
                    "medium",
                    "medium",
                    "medium",
                    "hard",
                    "hard"
                ]
            }, {
                "questions": [
                    "rWfDI9lU2cybOL3RnTnx",
                    "T8XwcfhwRGvIfkZPnAhi",
                    "viSL5gPR4XAjPBoRXdmN",
                    "uxmcWrREhGrcrQOEsijn",
                    "BY9IvDHm3hIbydE480IH",
                    "hvwAMxseZovp9JxhSMN5"
                ],
                "levels": [
                    "easy",
                    "medium",
                    "medium",
                    "medium",
                    "hard",
                    "hard"
                ],
                "category": "fAi03mrs88Ca5yeHC2Z6"
            }
        ]
    },
    "categories": [
        {
            "categoryId": "07XFex8Hsez7BrbiLPWq",
            "category": {
                "easyQuestions": [
                    "9KmOeif9flmjLWvKu5XZ", "nEcZWYTGKzD6g0bsf4jd"
                ],
                "gamesCreated": 0,
                "hardQuestions": [
                    "D433m5H9skrnaw1JZYCw", "BYbLAajs9IymZAamaeb9", "jvHVQmmd3JrVCPvonrJA"
                ],
                "mediumQuestions": [],
                "easyQuestionsCount": 9,
                "mediumQuestionsCount": 0,
                "createdAt": {
                    "seconds": 1722585908,
                    "nanoseconds": 810000000
                },
                "title": "Movies",
                "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                        "zImages%2F39e89b09-7e8f-45d9-8021-cec42fbee6d9.jpg?alt=media&token=3b8560ef-fc" +
                        "46-4bca-b816-51b8fe87a55b",
                "hardQuestionsCount": 0,
                "medimQuestions": ["AWEsBpJ0bexRNjisrSae", "7PfLtVdQCefZrLoZgRdS", "xDAKVxcv2WR1QXHinpGQ", "cNmYbWuX6HVdrkUV2VSK"]
            },
            "questions": [
                {
                    "id": "9KmOeif9flmjLWvKu5XZ",
                    "question": {
                        "categoryId": "07XFex8Hsez7BrbiLPWq",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Fbd995e6d-60c6-453c-b4ae-07dc8816c652.mp4?alt=media&token=f49439bf-" +
                                "fe61-48f1-88ae-bfa4884e32dc",
                        "answer": " The Towering Inferno",
                        "level": "easy",
                        "category": "Movies",
                        "question": "What disaster movie features Steve McQueen, Faye Dunaway and Fred Astaire?",
                        "type": "video",
                        "points": "200"
                    }
                }, {
                    "id": "AWEsBpJ0bexRNjisrSae",
                    "question": {
                        "category": "Movies",
                        "answer": "Arnold Schwarzenegger",
                        "level": "medium",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F058c5e09-11d7-40ef-a913-a413140194af.mp4?alt=media&token=ca786e46-" +
                                "b392-4641-8302-22b6a82356dc",
                        "points": "500",
                        "type": "video",
                        "question": "Which actor played the role of Harry Tasker in the movie \"True Lies\"?",
                        "categoryId": "07XFex8Hsez7BrbiLPWq"
                    }
                }, {
                    "id": "BYbLAajs9IymZAamaeb9",
                    "question": {
                        "question": "Which actor played Robert Langdon in \"The Da Vinci Code\" (2005) and \"Angels" +
                                " and Demons\" (2009)?",
                        "category": "Movies",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Ff89f984f-fec9-42b3-a197-0e6d4d1d5b4d.mp4?alt=media&token=aeaa78d9-" +
                                "23fb-4fe6-8325-43d454d5be04",
                        "categoryId": "07XFex8Hsez7BrbiLPWq",
                        "answer": " Tom Hanks",
                        "type": "video",
                        "points": "800",
                        "level": "hard"
                    }
                }, {
                    "id": "jvHVQmmd3JrVCPvonrJA",
                    "question": {
                        "type": "video",
                        "categoryId": "07XFex8Hsez7BrbiLPWq",
                        "question": "Which actor played Larry Daley in \"Night at the Museum\" (2006) and \"Night a" +
                                "t the Museum 2: Battle of the Smithsonian\" (2009)?",
                        "points": "800",
                        "level": "hard",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Fc7e78f89-105b-4018-8278-6bef58f42ca4.mp4?alt=media&token=11e91495-" +
                                "6b34-4fb6-9fb1-bfb74c8b2a71",
                        "category": "Movies",
                        "answer": " Ben Stiller"
                    }
                }, {
                    "id": "nEcZWYTGKzD6g0bsf4jd",
                    "question": {
                        "level": "easy",
                        "type": "video",
                        "category": "Movies",
                        "points": "200",
                        "answer": " Will Smith",
                        "question": "Who played the title role in the movie \"Hancock\"?",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F4c108ed3-0963-4436-98ee-4da6d3b470a4.mp4?alt=media&token=bf9304a4-" +
                                "ea93-462c-9bfe-cc1ce9fca8e6",
                        "categoryId": "07XFex8Hsez7BrbiLPWq"
                    }
                }, {
                    "id": "xDAKVxcv2WR1QXHinpGQ",
                    "question": {
                        "question": "On which 1963 film is \"Chicken Run\" based?",
                        "type": "video",
                        "points": "500",
                        "level": "medium",
                        "category": "Movies",
                        "answer": " The Great Escape",
                        "categoryId": "07XFex8Hsez7BrbiLPWq",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F14afec1a-681f-47f1-bd90-2efe47134ed9.mp4?alt=media&token=b1962c19-" +
                                "8ad8-46cc-bdb1-b1ccb6a82a62"
                    }
                }
            ]
        }, {
            "categoryId": "49cur2P5rdiiuqdAKbq1",
            "category": {
                "medimQuestions": [
                    "TLqVXA8eV740g06jOdLF", "HlQGSYlBDukm62dXDZ3v", "ZhkIgJDruv9DMnW00UI3", "YDX6bKWkuNRYUObCu903"
                ],
                "mediumQuestions": [],
                "easyQuestions": [
                    "PquxTTRfj1rrnOJKgPBg", "OFFDrlMqXuFPItplAGn0"
                ],
                "hardQuestions": [
                    "uuIAWEpieDonhDt2QVF2", "g0RuEuKoMv52m0I3iUpN", "AUfCTtik6NYYCGB1JxdB"
                ],
                "createdAt": {
                    "seconds": 1722543512,
                    "nanoseconds": 673000000
                },
                "title": "Cartoon Characters",
                "mediumQuestionsCount": 0,
                "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                        "zImages%2F404b423f-bb14-49ef-8699-9df6e96f9733.jpg?alt=media&token=78fe9a03-b6" +
                        "1b-43e0-bdb6-b57cdf91408f",
                "gamesCreated": 0,
                "hardQuestionsCount": 0,
                "easyQuestionsCount": 9
            },
            "questions": [
                {
                    "id": "OFFDrlMqXuFPItplAGn0",
                    "question": {
                        "categoryId": "49cur2P5rdiiuqdAKbq1",
                        "category": "Cartoon Characters",
                        "points": "200",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F2d7e9dc6-8448-44e3-9f6d-ed2a747f9fe6.jpg?alt=media&token=5d46cb63-" +
                                "962c-4bbb-bd37-fb07a4b4baf6",
                        "level": "easy",
                        "type": "image",
                        "question": "What is the name of this character?",
                        "answer": "Donald duck"
                    }
                }, {
                    "id": "PquxTTRfj1rrnOJKgPBg",
                    "question": {
                        "question": "What is the name of this character?",
                        "categoryId": "49cur2P5rdiiuqdAKbq1",
                        "type": "image",
                        "level": "easy",
                        "category": "Cartoon Characters",
                        "answer": "winnie the pooh",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F84631aeb-f893-4ec8-8734-3d19084cec0a.jpg?alt=media&token=06061fe3-" +
                                "5229-45d9-b094-911797d51123",
                        "points": "200"
                    }
                }, {
                    "id": "YDX6bKWkuNRYUObCu903",
                    "question": {
                        "level": "medium",
                        "answer": "Finding Nemo",
                        "points": "200",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F5486a571-3fe1-43cb-bbd0-36ff331ec53c.jpg?alt=media&token=4f10c8e1-" +
                                "64e4-422f-98da-ebcf7a21c5e8",
                        "category": "Cartoon Characters",
                        "categoryId": "49cur2P5rdiiuqdAKbq1",
                        "type": "image",
                        "question": "From which movie this Image is ?"
                    }
                }, {
                    "id": "ZhkIgJDruv9DMnW00UI3",
                    "question": {
                        "question": "What is the name of this character?",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Fd686fcfe-f2d4-43f3-829c-5f521d72a0f0.jpg?alt=media&token=56650fa2-" +
                                "cb2d-4ac5-9310-165ac85934fe",
                        "type": "image",
                        "category": "Cartoon Characters",
                        "categoryId": "49cur2P5rdiiuqdAKbq1",
                        "answer": "Stitch",
                        "level": "medium",
                        "points": "200"
                    }
                }, {
                    "id": "g0RuEuKoMv52m0I3iUpN",
                    "question": {
                        "question": "What is the name of this character?",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Fd9029210-4876-40ce-872d-6d2decdbcc16.jpg?alt=media&token=1760ee55-" +
                                "0b89-4d7c-bbdf-b9de6858d8da",
                        "answer": "Doraemon",
                        "points": "800",
                        "categoryId": "49cur2P5rdiiuqdAKbq1",
                        "level": "hard",
                        "category": "Cartoon Characters",
                        "type": "image"
                    }
                }, {
                    "id": "uuIAWEpieDonhDt2QVF2",
                    "question": {
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F148377f9-fc43-4093-998d-8bf6e719b17c.jpg?alt=media&token=00190906-" +
                                "157b-40a4-bda2-319db6b26227",
                        "points": "800",
                        "type": "image",
                        "answer": "Mr. Burns",
                        "category": "Cartoon Characters",
                        "question": "What is the name of this character?",
                        "level": "hard",
                        "categoryId": "49cur2P5rdiiuqdAKbq1"
                    }
                }
            ]
        }, {
            "categoryId": "NsC3g8Jzy24gDm2OpRFD",
            "category": {
                "medimQuestions": [
                    "sIbehRld5erUlnXuDR4J", "Xrr1vhsbNMQNg7hjaeE8"
                ],
                "easyQuestions": [
                    "xxpUHxjKNbt7C6Nmf46m", "corKwGQNK4cLT0hoPcQf", "iM9f736YLzT9Yfrk7PMJ"
                ],
                "gamesCreated": 0,
                "mediumQuestionsCount": 0,
                "hardQuestions": [
                    "Jhs3pPb5ZEXpHE5nFGHf", "ZDOQnS3wm1H5D0sKOWBs", "klMOaGEfrOQCU3x7Jde8"
                ],
                "hardQuestionsCount": 0,
                "title": "Math",
                "createdAt": {
                    "seconds": 1722543906,
                    "nanoseconds": 612000000
                },
                "mediumQuestions": [],
                "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                        "zImages%2F5f16fdbd-5509-4c60-87bf-f19e11a78cbc.jpg?alt=media&token=db8c40de-30" +
                        "81-4cb4-8668-a755a3ff6509",
                "easyQuestionsCount": 8
            },
            "questions": [
                {
                    "id": "Jhs3pPb5ZEXpHE5nFGHf",
                    "question": {
                        "question": "80x9=",
                        "level": "hard",
                        "type": "text",
                        "category": "Math",
                        "points": "800",
                        "media": null,
                        "answer": "720",
                        "categoryId": "NsC3g8Jzy24gDm2OpRFD"
                    }
                }, {
                    "id": "Xrr1vhsbNMQNg7hjaeE8",
                    "question": {
                        "points": "500",
                        "question": "62/2",
                        "categoryId": "NsC3g8Jzy24gDm2OpRFD",
                        "category": "Math",
                        "type": "text",
                        "level": "medium",
                        "media": null,
                        "answer": "31"
                    }
                }, {
                    "id": "corKwGQNK4cLT0hoPcQf",
                    "question": {
                        "category": "Math",
                        "question": "1*1",
                        "categoryId": "NsC3g8Jzy24gDm2OpRFD",
                        "media": null,
                        "type": "text",
                        "answer": "1",
                        "level": "easy",
                        "points": "200"
                    }
                }, {
                    "id": "iM9f736YLzT9Yfrk7PMJ",
                    "question": {
                        "categoryId": "NsC3g8Jzy24gDm2OpRFD",
                        "question": "2+2",
                        "answer": "4",
                        "media": null,
                        "category": "Math",
                        "points": "200",
                        "type": "text",
                        "level": "easy"
                    }
                }, {
                    "id": "klMOaGEfrOQCU3x7Jde8",
                    "question": {
                        "categoryId": "NsC3g8Jzy24gDm2OpRFD",
                        "question": "88x99=",
                        "level": "hard",
                        "category": "Math",
                        "type": "text",
                        "answer": "8712",
                        "points": "800",
                        "media": null
                    }
                }, {
                    "id": "sIbehRld5erUlnXuDR4J",
                    "question": {
                        "question": "45x5=",
                        "category": "Math",
                        "level": "medium",
                        "categoryId": "NsC3g8Jzy24gDm2OpRFD",
                        "media": null,
                        "answer": "225",
                        "type": "text",
                        "points": "500"
                    }
                }
            ]
        }, {
            "categoryId": "OMFcZ5Wjz1hvPvX383FC",
            "category": {
                "gamesCreated": 0,
                "mediumQuestionsCount": 0,
                "createdAt": {
                    "seconds": 1722543737,
                    "nanoseconds": 96000000
                },
                "title": "Music",
                "medimQuestions": [
                    "RbO4HUh5uRD6wTBveCqg", "JlaOvYrTrHSELnuDEAvY"
                ],
                "hardQuestionsCount": 0,
                "hardQuestions": [
                    "tl8WMbKISZpZLbVhZNKc", "mbXNu23ek9RIDKZz4lpe", "Fv29Fccf2ZsNxWa3F05k"
                ],
                "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                        "zImages%2F28a4552b-e893-4743-935b-49f1ab0d8761.jpg?alt=media&token=8790849c-27" +
                        "2c-4dd5-b747-16a988094c5c",
                "easyQuestionsCount": 7,
                "mediumQuestions": [],
                "easyQuestions": ["N642aLw6T8nR6wEt6NZt", "3sY3wbNIpp3QiFff2DA8"]
            },
            "questions": [
                {
                    "id": "3sY3wbNIpp3QiFff2DA8",
                    "question": {
                        "categoryId": "OMFcZ5Wjz1hvPvX383FC",
                        "points": "200",
                        "type": "audio",
                        "answer": " Keith Moon",
                        "level": "easy",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F7aee68aa-d6f3-4e16-b438-b70ad50a66d2.mp3?alt=media&token=7f474c84-" +
                                "e2ff-41a2-adef-85351d37ea04",
                        "question": "Which member of \"The Who\" rock band died in 1978?",
                        "category": "Music"
                    }
                }, {
                    "id": "JlaOvYrTrHSELnuDEAvY",
                    "question": {
                        "type": "audio",
                        "points": "500",
                        "level": "medium",
                        "answer": " German",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F949e3b97-7852-46f8-b863-d142c0712e81.mp3?alt=media&token=55ac0b93-" +
                                "b33d-4d45-a1c1-5d3edf54ff1b",
                        "question": "Nena had a US number 2 hit with \"99 Luftballons\" in 1984. What nationality i" +
                                "s she?",
                        "categoryId": "OMFcZ5Wjz1hvPvX383FC",
                        "category": "Music"
                    }
                }, {
                    "id": "N642aLw6T8nR6wEt6NZt",
                    "question": {
                        "points": "200",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Ffb04b422-89e7-43ee-9d84-ae978eca2a01.mp3?alt=media&token=eedc212a-" +
                                "0380-458d-8224-591001069485",
                        "question": "The Stranglers released \"Don't Bring Harry\" in 1979. Who or what, was Harry?",
                        "answer": " Heroin",
                        "category": "Music",
                        "type": "audio",
                        "level": "easy",
                        "categoryId": "OMFcZ5Wjz1hvPvX383FC"
                    }
                }, {
                    "id": "RbO4HUh5uRD6wTBveCqg",
                    "question": {
                        "type": "audio",
                        "answer": "Romeo and Juliet",
                        "category": "Music",
                        "level": "medium",
                        "points": "500",
                        "question": "Which of Shakespeare's plays is Taylor Swift's song \"Love Story\" about?",
                        "categoryId": "OMFcZ5Wjz1hvPvX383FC",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Fd0aeb3de-d8f4-4d2a-bd3d-2aa3b7a9c748.mp3?alt=media&token=656f9a8f-" +
                                "2b27-4bc5-b2c3-5f2855c737e8"
                    }
                }, {
                    "id": "mbXNu23ek9RIDKZz4lpe",
                    "question": {
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F17729be8-bdfc-4bb5-b046-3a10e2ec645d.mp3?alt=media&token=d26791cf-" +
                                "444a-48bc-86e7-69879ee32502",
                        "points": "800",
                        "question": "Who sings the song \"The Climb\", from the film \"Hannah Montana: The Movie\"?",
                        "category": "Music",
                        "answer": "Miley Cyrus",
                        "type": "audio",
                        "level": "hard",
                        "categoryId": "OMFcZ5Wjz1hvPvX383FC"
                    }
                }, {
                    "id": "tl8WMbKISZpZLbVhZNKc",
                    "question": {
                        "type": "audio",
                        "categoryId": "OMFcZ5Wjz1hvPvX383FC",
                        "level": "hard",
                        "answer": "George Alan O'Dowd",
                        "points": "800",
                        "question": "What is the full birth name of Boy George?",
                        "category": "Music",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F7ca2381e-0380-47d1-9ca2-e4c9ba279ae9.mp3?alt=media&token=ac5442c3-" +
                                "6812-4dcf-923a-68f3b5ca1480"
                    }
                }
            ]
        }, {
            "categoryId": "fAi03mrs88Ca5yeHC2Z6",
            "category": {
                "mediumQuestions": [],
                "hardQuestions": [
                    "Dmh7dAGIT6Q2rFQ7YmVq", "hvwAMxseZovp9JxhSMN5", "BY9IvDHm3hIbydE480IH"
                ],
                "mediumQuestionsCount": 0,
                "title": "Anima Life",
                "easyQuestionsCount": 8,
                "createdAt": {
                    "seconds": 1722532821,
                    "nanoseconds": 760000000
                },
                "medimQuestions": [
                    "viSL5gPR4XAjPBoRXdmN", "uxmcWrREhGrcrQOEsijn"
                ],
                "easyQuestions": [
                    "MrSrTxG19Qcc7KWw8NAo", "rWfDI9lU2cybOL3RnTnx", "T8XwcfhwRGvIfkZPnAhi"
                ],
                "hardQuestionsCount": 0,
                "gamesCreated": 0,
                "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                        "zImages%2F68b59cd5-00c1-4778-8758-0a44e1f759d3.jpg?alt=media&token=ccd3728b-5c" +
                        "dd-441e-92d3-f4699fdbd45d"
            },
            "questions": [
                {
                    "id": "BY9IvDHm3hIbydE480IH",
                    "question": {
                        "categoryId": "fAi03mrs88Ca5yeHC2Z6",
                        "type": "image",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F34bd5fbe-a287-49d7-98d1-4cfa9729a1aa.jpg?alt=media&token=2696519f-" +
                                "5066-4be8-8136-5e12bf6fd21f",
                        "points": "800",
                        "answer": "silver fox",
                        "level": "hard",
                        "question": "what is the name of this animal?",
                        "category": "Anima Life"
                    }
                }, {
                    "id": "T8XwcfhwRGvIfkZPnAhi",
                    "question": {
                        "answer": "African Elephant",
                        "question": "Name this Animal",
                        "categoryId": "fAi03mrs88Ca5yeHC2Z6",
                        "level": "easy",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F4133ee49-021d-44ce-9c06-32e484c78c6a.jpg?alt=media&token=67628589-" +
                                "d3d9-4019-bb95-592100e15c64",
                        "category": "Anima Life",
                        "points": "200",
                        "type": "image"
                    }
                }, {
                    "id": "hvwAMxseZovp9JxhSMN5",
                    "question": {
                        "question": "Name this Animal",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F31a3febd-ceee-4987-a6bf-12c4b9766f87.jpeg?alt=media&token=c614dcfa" +
                                "-c63a-4741-8a65-62ce5f95de43",
                        "answer": "Arrd wolf",
                        "level": "hard",
                        "points": "800",
                        "categoryId": "fAi03mrs88Ca5yeHC2Z6",
                        "type": "image",
                        "category": "Anima Life"
                    }
                }, {
                    "id": "rWfDI9lU2cybOL3RnTnx",
                    "question": {
                        "level": "easy",
                        "category": "Anima Life",
                        "points": "200",
                        "type": "image",
                        "categoryId": "fAi03mrs88Ca5yeHC2Z6",
                        "question": "Name this Animal",
                        "answer": "African Lion",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F212ad0ba-0fbb-43b2-a98c-6715ee394113.jpg?alt=media&token=4d4ea06c-" +
                                "a55a-49c9-bcd2-dab4ce6e3756"
                    }
                }, {
                    "id": "uxmcWrREhGrcrQOEsijn",
                    "question": {
                        "type": "image",
                        "category": "Anima Life",
                        "question": "Name this Animal",
                        "categoryId": "fAi03mrs88Ca5yeHC2Z6",
                        "answer": "African Penguin",
                        "points": "500",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2Ffd05b230-6dcd-4371-9f54-bae1ff9dbbfe.jpg?alt=media&token=6e7d88f4-" +
                                "79ce-4204-9f46-ad0ee6142132",
                        "level": "medium"
                    }
                }, {
                    "id": "viSL5gPR4XAjPBoRXdmN",
                    "question": {
                        "answer": "African Buffalo",
                        "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                                "tionFiles%2F7d7b5cee-f4de-4004-96c9-5db5ac1cabf0.png?alt=media&token=4c15dce6-" +
                                "e75d-49f5-a561-ab5f022bf91e",
                        "question": "Name this Animal",
                        "level": "medium",
                        "points": "500",
                        "type": "image",
                        "category": "Anima Life",
                        "categoryId": "fAi03mrs88Ca5yeHC2Z6"
                    }
                }
            ]
        }, {
            "categoryId": "mPpiny94vAUzEdAmMbFp",
            "category": {
                "createdAt": {
                    "seconds": 1722543817,
                    "nanoseconds": 135000000
                },
                "gamesCreated": 0,
                "hardQuestions": [
                    "i19JXgM9eBExG2LWxc7F", "MuArW4ZneOn18KFQ7bl2"
                ],
                "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                        "zImages%2Fb715da25-088b-49df-8f13-212ab09e51cd.jpg?alt=media&token=6550067b-5f" +
                        "2a-4b09-9a03-c5787bc68b7e",
                "medimQuestions": [
                    "qdIcr5G91T7420ryHgTy", "nFMiQYbaShO3Xs25Nuon", "xaRorqwH40kgDdmNLPd7"
                ],
                "hardQuestionsCount": 0,
                "mediumQuestionsCount": 0,
                "easyQuestionsCount": 9,
                "title": "Sports",
                "easyQuestions": [
                    "RwEFYy59ddzQVGlpcPT5", "Lm3LnwQCIVJ9GgY22IcT", "Hu7RqGqX5GooDdHQB4Qj", "eNejAzRZrsiqwa2Fbl7V"
                ],
                "mediumQuestions": []
            },
            "questions": [
                {
                    "id": "MuArW4ZneOn18KFQ7bl2",
                    "question": {
                        "points": "800",
                        "category": "Sports",
                        "answer": "Graham Hill",
                        "type": "text",
                        "level": "hard",
                        "categoryId": "mPpiny94vAUzEdAmMbFp",
                        "media": null,
                        "question": "Who was the first British driver to win what is considered motor racing's \"Tr" +
                                "iple Crown\"?"
                    }
                }, {
                    "id": "eNejAzRZrsiqwa2Fbl7V",
                    "question": {
                        "media": null,
                        "points": "200",
                        "categoryId": "mPpiny94vAUzEdAmMbFp",
                        "question": "All these sports use the word \"pitch\". However, only in one of them it is us" +
                                "ed as a verb. Which one?",
                        "answer": " Baseball",
                        "type": "text",
                        "category": "Sports",
                        "level": "easy"
                    }
                }, {
                    "id": "i19JXgM9eBExG2LWxc7F",
                    "question": {
                        "type": "text",
                        "answer": "The Masters",
                        "media": null,
                        "level": "hard",
                        "points": "800",
                        "categoryId": "mPpiny94vAUzEdAmMbFp",
                        "question": "In which golf tournament is a green jacket awarded to the winner?",
                        "category": "Sports"
                    }
                }, {
                    "id": "nFMiQYbaShO3Xs25Nuon",
                    "question": {
                        "question": "In which sport did Donald Bradman make his name famous?",
                        "type": "text",
                        "level": "medium",
                        "categoryId": "mPpiny94vAUzEdAmMbFp",
                        "category": "Sports",
                        "media": null,
                        "points": "500",
                        "answer": " Cricket"
                    }
                }, {
                    "id": "qdIcr5G91T7420ryHgTy",
                    "question": {
                        "type": "text",
                        "categoryId": "mPpiny94vAUzEdAmMbFp",
                        "answer": " Baseball",
                        "media": null,
                        "question": "In which sport was Nolan Ryan famous?",
                        "points": "500",
                        "level": "medium",
                        "category": "Sports"
                    }
                }, {
                    "id": "xaRorqwH40kgDdmNLPd7",
                    "question": {
                        "answer": "The Masters",
                        "categoryId": "mPpiny94vAUzEdAmMbFp",
                        "level": "medium",
                        "question": "Which of golf's four Grand Slam tournaments is played at the same course each " +
                                "year?",
                        "category": "Sports",
                        "points": "500",
                        "media": null,
                        "type": "text"
                    }
                }
            ]
        }
    ]
}

const GamePage = () => {
    const searchParams = useSearchParams();
    const gameId = searchParams.get("id")

		const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!gameId) {
            router.push("/")
        }
    }, [])

    // game object containing team names, game name and categories with questions
    // use the categories that are directly inside the game object the categories
    // inside game.gameObj are refernces to fetch the documents
    const [game, setGame] = useState({});
    // chack if data is fetched
    const isGameReady = Object
        .keys(game)
        .length

    const gameRecord = useStore(state => state.gameRecord);
    const setgameRecord = useStore(state => state.setGameRecord);
    const showQuestion = useStore(state => state.showQuestion);

    // don't delete get game and game assets (categories and questions)
    useEffect(() => {
        (async () => {
					setLoading(true)
            const docRef = doc(database, "games", gameId);
            const docSnap = await getDoc(docRef);
            const gameData = docSnap.data()
            const categories = await getGameAssets(gameData)
            setGame({id: docSnap.id, gameObj: gameData, categories})
						setLoading(false)
        })()
    }, [])

    // set the current game record in gloal state and local storage
    useEffect(() => {
        if (isGameReady) {
            // get old game record
            const oldRecord = JSON.parse(localStorage.getItem(`gameRecord${gameId}`))
            // if there's an old record set the local state to that
            if (oldRecord && Object.keys(oldRecord).length) {
                setgameRecord(oldRecord)
                return;
            }
            // create new game record and set global state and local storage
            const newGameRecord = defaultGameRecord(game)
            localStorage.setItem(`gameRecord${gameId}`, JSON.stringify(newGameRecord))
            setgameRecord(newGameRecord)
        }
    }, [game])

    // update the local storage game record when global state changes
    useEffect(() => {
        if (isGameReady && Object.keys(gameRecord).length) {
            localStorage.setItem(`gameRecord${gameId}`, JSON.stringify(gameRecord))
        }
    }, [gameRecord])

    const categoriesList = isGameReady
        ? game
            .categories
            .map(cat => <CategoryAndQuestions key={uuidv4()} categoryObj={cat}/>)
        : [];

    return (
        <div className='screen pt-10 col '>
					{loading && <LoadingOverlay />}
            <div className='w-full h-1/6 '>
                {isGameReady && <GameHeader game={game}/>}
            </div>
            {
                showQuestion
                    ? <Question/>
                    : null
            }
            {
                !showQuestion
                    ? <div className='w-full h-4/6 grid grid-cols-3 grid-rows-2 p-3 gap-5 '>
                            {categoriesList}
                        </div>
                    : null
            }
            <div className='w-full h-1/6 '>
                {isGameReady && <GameFooter game={game}/>}
            </div>
        </div>
    )
}

export default GamePage