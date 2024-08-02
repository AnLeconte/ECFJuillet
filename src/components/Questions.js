import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Alert,
    Button,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
    CardActions,
    Box,
    Chip
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const questionsByLevel = [
    // Niveau 1
    [
        {
            question: "Quelle est la capitale de la France?",
            options: ["Paris", "Londres", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Quelle est la capitale de l'Allemagne?",
            options: ["Paris", "Londres", "Berlin", "Madrid"],
            answer: "Berlin"
        },
        {
            question: "Quelle est la capitale de l'Espagne?",
            options: ["Paris", "Londres", "Berlin", "Madrid"],
            answer: "Madrid"
        },
        {
            question: "Quelle est la capitale de l'Angleterre?",
            options: ["Paris", "Londres", "Berlin", "Madrid"],
            answer: "Londres"
        },
        {
            question: "Quelle est la capitale de l'Italie?",
            options: ["Rome", "Paris", "Berlin", "Madrid"],
            answer: "Rome"
        }
    ],
    // Niveau 2
    [
        {
            question: "Quelle est la capitale du Portugal?",
            options: ["Lisbonne", "Madrid", "Rome", "Paris"],
            answer: "Lisbonne"
        },
        {
            question: "Quelle est la capitale de la Belgique?",
            options: ["Bruxelles", "Amsterdam", "Berlin", "Paris"],
            answer: "Bruxelles"
        },
        {
            question: "Quelle est la capitale de la Suisse?",
            options: ["Berne", "Zurich", "Genève", "Lausanne"],
            answer: "Berne"
        },
        {
            question: "Quelle est la capitale de l'Autriche?",
            options: ["Vienne", "Salzbourg", "Innsbruck", "Graz"],
            answer: "Vienne"
        },
        {
            question: "Quelle est la capitale de la Suède?",
            options: ["Stockholm", "Oslo", "Copenhague", "Helsinki"],
            answer: "Stockholm"
        }
    ],
    // Ajoutez des niveaux supplémentaires jusqu'au niveau 10
    // Niveau 3
    [
        {
            question: "Quelle est la capitale de la Norvège?",
            options: ["Oslo", "Stockholm", "Copenhague", "Helsinki"],
            answer: "Oslo"
        },
        {
            question: "Quelle est la capitale du Danemark?",
            options: ["Copenhague", "Oslo", "Stockholm", "Helsinki"],
            answer: "Copenhague"
        },
        {
            question: "Quelle est la capitale de la Finlande?",
            options: ["Helsinki", "Oslo", "Stockholm", "Copenhague"],
            answer: "Helsinki"
        },
        {
            question: "Quelle est la capitale de l'Irlande?",
            options: ["Dublin", "Belfast", "Londres", "Edimbourg"],
            answer: "Dublin"
        },
        {
            question: "Quelle est la capitale de la Grèce?",
            options: ["Athènes", "Rome", "Istanbul", "Sofia"],
            answer: "Athènes"
        }
    ],
    // Niveau 4
    [
        {
            question: "Quelle est la capitale de la Turquie?",
            options: ["Ankara", "Istanbul", "Izmir", "Antalya"],
            answer: "Ankara"
        },
        {
            question: "Quelle est la capitale de la Russie?",
            options: ["Moscou", "Saint-Pétersbourg", "Kazan", "Novossibirsk"],
            answer: "Moscou"
        },
        {
            question: "Quelle est la capitale de la Pologne?",
            options: ["Varsovie", "Cracovie", "Gdansk", "Poznan"],
            answer: "Varsovie"
        },
        {
            question: "Quelle est la capitale de la Hongrie?",
            options: ["Budapest", "Vienne", "Prague", "Bratislava"],
            answer: "Budapest"
        },
        {
            question: "Quelle est la capitale de la République tchèque?",
            options: ["Prague", "Brno", "Ostrava", "Plzen"],
            answer: "Prague"
        }
    ],
    // Niveau 5
    [
        {
            question: "Quelle est la capitale de la Slovaquie?",
            options: ["Bratislava", "Prague", "Budapest", "Vienne"],
            answer: "Bratislava"
        },
        {
            question: "Quelle est la capitale de la Slovénie?",
            options: ["Ljubljana", "Zagreb", "Belgrade", "Sarajevo"],
            answer: "Ljubljana"
        },
        {
            question: "Quelle est la capitale de la Croatie?",
            options: ["Zagreb", "Ljubljana", "Belgrade", "Sarajevo"],
            answer: "Zagreb"
        },
        {
            question: "Quelle est la capitale de la Bosnie-Herzégovine?",
            options: ["Sarajevo", "Zagreb", "Belgrade", "Ljubljana"],
            answer: "Sarajevo"
        },
        {
            question: "Quelle est la capitale de la Serbie?",
            options: ["Belgrade", "Zagreb", "Sarajevo", "Ljubljana"],
            answer: "Belgrade"
        }
    ],
    // Niveau 6
    [
        {
            question: "Quelle est la capitale de la Macédoine du Nord?",
            options: ["Skopje", "Tirana", "Sofia", "Athènes"],
            answer: "Skopje"
        },
        {
            question: "Quelle est la capitale de l'Albanie?",
            options: ["Tirana", "Skopje", "Sofia", "Athènes"],
            answer: "Tirana"
        },
        {
            question: "Quelle est la capitale de la Bulgarie?",
            options: ["Sofia", "Skopje", "Tirana", "Athènes"],
            answer: "Sofia"
        },
        {
            question: "Quelle est la capitale de la Roumanie?",
            options: ["Bucarest", "Budapest", "Sofia", "Athènes"],
            answer: "Bucarest"
        },
        {
            question: "Quelle est la capitale de la Moldavie?",
            options: ["Chisinau", "Bucarest", "Sofia", "Athènes"],
            answer: "Chisinau"
        }
    ],
    // Niveau 7
    [
        {
            question: "Quelle est la capitale de l'Ukraine?",
            options: ["Kiev", "Minsk", "Moscou", "Varsovie"],
            answer: "Kiev"
        },
        {
            question: "Quelle est la capitale de la Biélorussie?",
            options: ["Minsk", "Kiev", "Moscou", "Varsovie"],
            answer: "Minsk"
        },
        {
            question: "Quelle est la capitale de la Lituanie?",
            options: ["Vilnius", "Riga", "Tallinn", "Helsinki"],
            answer: "Vilnius"
        },
        {
            question: "Quelle est la capitale de la Lettonie?",
            options: ["Riga", "Vilnius", "Tallinn", "Helsinki"],
            answer: "Riga"
        },
        {
            question: "Quelle est la capitale de l'Estonie?",
            options: ["Tallinn", "Riga", "Vilnius", "Helsinki"],
            answer: "Tallinn"
        }
    ],
    // Niveau 8
    [
        {
            question: "Quelle est la capitale de la Géorgie?",
            options: ["Tbilissi", "Bakou", "Erevan", "Ankara"],
            answer: "Tbilissi"
        },
        {
            question: "Quelle est la capitale de l'Arménie?",
            options: ["Erevan", "Tbilissi", "Bakou", "Ankara"],
            answer: "Erevan"
        },
        {
            question: "Quelle est la capitale de l'Azerbaïdjan?",
            options: ["Bakou", "Tbilissi", "Erevan", "Ankara"],
            answer: "Bakou"
        },
        {
            question: "Quelle est la capitale du Kazakhstan?",
            options: ["Astana", "Almaty", "Tachkent", "Bichkek"],
            answer: "Astana"
        },
        {
            question: "Quelle est la capitale de l'Ouzbékistan?",
            options: ["Tachkent", "Astana", "Almaty", "Bichkek"],
            answer: "Tachkent"
        }
    ],
    // Niveau 9
    [
        {
            question: "Quelle est la capitale du Kirghizistan?",
            options: ["Bichkek", "Tachkent", "Astana", "Almaty"],
            answer: "Bichkek"
        },
        {
            question: "Quelle est la capitale du Tadjikistan?",
            options: ["Douchanbé", "Bichkek", "Tachkent", "Astana"],
            answer: "Douchanbé"
        },
        {
            question: "Quelle est la capitale du Turkménistan?",
            options: ["Achgabat", "Douchanbé", "Bichkek", "Tachkent"],
            answer: "Achgabat"
        },
        {
            question: "Quelle est la capitale de l'Afghanistan?",
            options: ["Kaboul", "Achgabat", "Douchanbé", "Bichkek"],
            answer: "Kaboul"
        },
        {
            question: "Quelle est la capitale du Pakistan?",
            options: ["Islamabad", "Kaboul", "Achgabat", "Douchanbé"],
            answer: "Islamabad"
        }
    ],
    // Niveau 10
    [
        {
            question: "Quelle est la capitale de l'Inde?",
            options: ["New Delhi", "Islamabad", "Kaboul", "Achgabat"],
            answer: "New Delhi"
        },
        {
            question: "Quelle est la capitale du Népal?",
            options: ["Katmandou", "New Delhi", "Islamabad", "Kaboul"],
            answer: "Katmandou"
        },
        {
            question: "Quelle est la capitale du Bhoutan?",
            options: ["Thimphou", "Katmandou", "New Delhi", "Islamabad"],
            answer: "Thimphou"
        },
        {
            question: "Quelle est la capitale du Bangladesh?",
            options: ["Dacca", "Thimphou", "Katmandou", "New Delhi"],
            answer: "Dacca"
        },
        {
            question: "Quelle est la capitale du Sri Lanka?",
            options: ["Colombo", "Dacca", "Thimphou", "Katmandou"],
            answer: "Colombo"
        }
    ]
];

const Questions = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [levelScore, setLevelScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { playerName } = location.state || { playerName: '' };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleReplayButtonClick = () => {
        navigate('/', { state: { playerName: playerName } });
    };

    const handleCheckAnswer = () => {
        if (selectedOption === questionsByLevel[currentLevel][currentQuestionIndex].answer) {
            setIsCorrect(true);
            setScore(score + 1);
            setLevelScore(levelScore + 1);
        } else {
            setIsCorrect(false);
        }

        setTimeout(handleNextQuestion, 1000);
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questionsByLevel[currentLevel].length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            const nextLevel = currentLevel + 1;
            if (nextLevel < questionsByLevel.length) {
                setCurrentLevel(nextLevel);
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setIsCorrect(null);
                setShowLevelUpModal(true);
                setTimeout(() => setShowLevelUpModal(false), 5000);
            } else {
                setIsQuizFinished(true);
                saveScore();
            }
        }
    };

    const saveScore = () => {
        const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { name: playerName, score: score };
        const updatedScores = [...savedScores, newScore];
        localStorage.setItem('highScores', JSON.stringify(updatedScores));
    };

    const handleCloseModal = () => {
        setShowLevelUpModal(false);
        setLevelScore(0); // Reset level score for the next level
    };

    const handleHomeButtonClick = () => {
        navigate('/');
    };

    if (isQuizFinished) {
        return (
            <Stack justifyContent="center" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Quiz Terminé
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                    Votre score est: {score} / {questionsByLevel.reduce((acc, level) => acc + level.length, 0)}
                </Typography>
                <Button variant="contained" color="success" onClick={handleReplayButtonClick}>Rejouer</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleHomeButtonClick}
                    sx={{ position: 'fixed', bottom: 16, left: 16 }}
                >
                    Accueil
                </Button>
            </Stack>
        );
    }

    return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh", padding: 2 }}>
            <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                <Chip label={`Niveau: ${currentLevel + 1}`} />            </Box>
            <Card sx={{ maxWidth: 800, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <CardContent>
                    <Typography align="center" variant="h5" component="h2" gutterBottom>
                        {questionsByLevel[currentLevel][currentQuestionIndex].question}
                    </Typography>
                    <Stack alignItems="center" justifyContent="center" direction="row" spacing={1}>
                        {questionsByLevel[currentLevel][currentQuestionIndex].options.map((option, index) => (
                            <Button
                                variant={selectedOption === option ? "contained" : "outlined"}
                                color="secondary"
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                sx={{ margin: 0.5 }}
                            >
                                {option}
                            </Button>
                        ))}
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" endIcon={<CheckIcon />} color="success" onClick={handleCheckAnswer}>
                        Valider la réponse
                    </Button>
                </CardActions>
                {isCorrect !== null && (
                    <CardContent>
                        {isCorrect ?
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                Bonne réponse !
                            </Alert> :
                            <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                                Mauvaise réponse !
                            </Alert>
                        }
                    </CardContent>
                )}
            </Card>
            <Dialog open={showLevelUpModal} onClose={handleCloseModal}>
                <DialogTitle>Félicitations!</DialogTitle>
                <DialogContent>
                    <Typography>Vous avez atteint le niveau {currentLevel + 1}!</Typography>
                    <Typography>Points accumulés pendant le niveau: {levelScore}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Fermer</Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                color="primary"
                onClick={handleHomeButtonClick}
                sx={{ position: 'fixed', bottom: 16, left: 16 }}
            >
                Accueil
            </Button>
        </Stack>
    );
};

export default Questions;
