import { useEffect, useContext, useState } from 'react';
import { Typography, Grid, Container, Box, Paper } from '@mui/material';
import { gridSpacing } from 'store/constant';
import DetailsApp from 'views/application/DetailsApp';
import Project from 'react-dappify/model/Project';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { DappifyContext } from 'react-dappify';

const Projects = () => {
    const { isAuthenticated, user } = useContext(DappifyContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState();

    const loadApps = async() => {
        if (isAuthenticated) {
            const list = await Project.listAll(user);
            setProjects(list);
        }
    };

    useEffect(() => {
        loadApps();
    }, [isAuthenticated]);

    const createNew = isAuthenticated &&  (
        <Grid item xs={12} sm={6} md={4} key={0}>
            <Box>
                <Paper
                    sx={{
                        borderRadius: 4,
                        py: 8,
                        position: 'relative',
                        color:  theme.palette.primary.dark,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                        height: '207px'
                    }}
                    onClick={() => navigate('/new')}
                    onMouseOver={() => setSelected('create')}
                    onMouseOut={() => setSelected()}
                    elevation={selected === 'create' ? 20: 5}
                >
                    <Grid container spacing={0.3} direction="column">
                        <Grid item xs={12}  sx={{ textAlign: 'center' }}>
                            <AddIcon sx={{ fontSize: '3em' }} />
                        </Grid>
                        <Grid item xs={12}  sx={{ textAlign: 'center' }}>
                            <Typography variant="body" fontWeight="600" sx={{ color: theme.palette.primary.dark }}>Add Project</Typography>
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
                <Grid item xs={12} sm={6} md={4} key={app.id}>
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
            <Grid container spacing={gridSpacing}>
                {listApps()}
            </Grid>
        </Container>
    );
}

export default Projects;