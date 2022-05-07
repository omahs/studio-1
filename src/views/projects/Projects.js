import { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Grid, Container, Button, Box, Paper } from '@mui/material';
import { gridSpacing } from 'store/constant';
import useAppCatalog from 'hooks/useAppCatalog';
import DetailsApp from 'views/application/DetailsApp';
import Project from 'react-dappify/model/Project';
import { useTheme } from '@mui/material/styles';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useNavigate } from 'react-router-dom';
import { DappifyContext } from 'react-dappify';

export default function Projects() {
    const { isAuthenticated } = useContext(DappifyContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const [projects, setProjects] = useState([]);

    const loadApps = async() => {
        const list = await Project.listAll();
        setProjects(list);
    };

    useEffect(() => {
        loadApps();
    }, []);

    const createNew = isAuthenticated &&  (
        <Grid item xs={12} md={6} xxl={3} key={0}>
            <Box>
                <Paper
                    sx={{
                        borderRadius: 0,
                        p: 3,
                        position: 'relative',
                        background: theme.palette.primary.dark,
                        color:  theme.palette.primary.contrastText,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                        height: '207px'
                    }}
                    onClick={() => navigate('/new')}
                    elevation="2"
                >
                    <Grid container spacing={0.3} direction="row">
                        <Grid item xs={12}  sx={{ textAlign: 'center' }} className="opacitated">
                            <AddCircleTwoToneIcon sx={{ fontSize: '8em' }} />
                            <Typography variant="h2" sx={{ color: theme.palette.primary.contrastText }}>New Project</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    );

    const listApps = () => {
        const list = [
            (createNew)
        ];
        projects.forEach((app) => {
            list.push(
                <Grid item xs={12} md={6} xxl={3} key={app.id}>
                    <Box>
                        <DetailsApp project={app} />
                    </Box>
                </Grid>
            );
        });
        return list;
    };

    return (
        <Container sx={{ pb: 5 }}>
            <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '3rem',
                            fontWeight: 900,
                            lineHeight: 1.4
                        }}
                    >
                        My Projects
                    </Typography>
                </Grid>
                {listApps()}
            </Grid>
        </Container>
    );
}
