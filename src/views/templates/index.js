
import { Grid, Box, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Marketplace from 'views/marketplace/Options';
import { motion } from 'framer-motion';
import background from 'assets/images/landing/bg.svg';

const TemplatesPage = ({ id }) => {

    return (
       <MainCard sx={{ width:'100%', position: 'relative' }}>
            <Grid item xs={12} sx={{ background: `url(${background})`, 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        m: -3,
                        minHeight: 550,
                        textAlign: 'center',
                        py: 8
                    }}>
                    <motion.div
                        initial={{ opacity: 0, translateY: 550 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 30
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.25rem', sm: '4rem', md: '4rem', color: '#fff' },
                                fontWeight: 900,
                                lineHeight: 1
                            }}
                        >
                            Smart Templates for every<br />use case in
                            <Box component="span" sx={{ ml: 2, color: '#fff' }}>
                                <em><b>Web3</b></em>
                            </Box>
                        </Typography>
                        <Typography variant="h3" sx={{ mt: 2, color: '#fff', opacity: 0.75 }}>
                            <i>Scroll down and install templates below</i>
                        </Typography>
                    </motion.div>
            </Grid>
            <Grid container spacing={3} sx={{ width: '100%' }}>
                <Marketplace />
            </Grid>
       </MainCard>
    );
};

export default TemplatesPage;
