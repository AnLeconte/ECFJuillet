import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box, Stack
} from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
        setHighScores(savedScores);
    }, []);

    const handlePlayButtonClick = () => {
        if (name.trim() !== '') {
            navigate('/questions', { state: { playerName: name } });
        } else {
            alert('Veuillez entrer votre prénom.');
        }
    };

    return (
        <Container>
            <Stack direction="column">
                <Stack alignItems="center" mt={5}>
                    <Typography variant="h1" component="h1" gutterBottom>
                        Bienvenue au Quiz
                    </Typography>
                </Stack>
                <Box mb={2}>
                    <TextField
                        label="Entrez votre prénom"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handlePlayButtonClick}
                >
                    Jouer
                </Button>
            </Stack>
            <Stack mt={5}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Meilleurs Scores
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {highScores.map((score, index) => (
                                <TableRow key={index}>
                                    <TableCell>{score.name}</TableCell>
                                    <TableCell>{score.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
    );
};

export default Home;
