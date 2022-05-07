import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_APP } from 'store/actions';
import moment from 'moment';
import { getImage } from 'react-dappify/utils/image';

const getAppUrl = (subdomain) => `https://${subdomain}.dappify.us`;

const DetailsApp = ({ project = {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectProject = (appConfig) => {
        dispatch({ type: UPDATE_APP, configuration: appConfig });
        navigate(`/studio/overview`);
    };

    const fontColor = project.config.theme?.palette?.mode !== 'dark' ? 'black' : 'white';
    const backgroundColor = project.config.theme?.palette?.mode === 'dark' ? 'black' : 'white';

    return (
        <Paper
            sx={{
                borderRadius: 0,
                p: 3,
                position: 'relative',
                background: backgroundColor,
                color: fontColor,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                cursor: 'pointer'
            }}
            onClick={() => selectProject(project.config)}
            elevation="2"
        >
            <Grid container spacing={0.3} className="opacitated">
                <Grid item xs={12} sx={{height: 64}}>
                    {/* <QRCode size="128" value={getAppUrl(app.id)} /> */}
                    <img
                        src={getImage(project.config.logo)}
                        alt="banner"
                        style={{
                            maxHeight: '60px',
                            padding: '2px 0px',
                            maxWidth: '50%'
                        }}
                    />
                </Grid>
                <Grid item sx={{ mb: 3 }} xs={12}>
                    <Typography variant="h3" sx={{ color: fontColor }}>{project.config.name}</Typography>
                    <Typography variant="h6" fontSize="1em">
                        <a  style={{ color: fontColor }} href={getAppUrl(project.config.subdomain)}>{getAppUrl(project.config.subdomain)}</a>
                    </Typography>
                </Grid>
                <Typography fontSize="1em">Last updated {moment(project.updatedAt).format('lll')}</Typography>
            </Grid>
        </Paper>
    );
};

DetailsApp.propTypes = {
    app: PropTypes.object
};

export default DetailsApp;
