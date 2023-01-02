import * as React from 'react';
import { Chip, Box, Grid, Paper, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Starter from "views/templates/content/Starter";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 350,
    borderRadius: '4px'
}));

const Templates = ({ handleClose, editor }) => {

    const availableTemplates = [Starter];

    const handleTemplateSelect = (template) => {
        editor.setComponents(template.html);
        editor.setStyle(template.style);
        handleClose();
    }

    return availableTemplates.map((template, index) => (
        <Grid item xs={12} sm={4} md={3} key={index}>
        <Item elevation={10}>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{
                        width: '100%',
                        height: '200px',
                        background: `url(${template.metadata.image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h3" fontSize={16} sx={{ mb: 1 }}>{template.metadata.name}</Typography>
                        <span>
                            {template.metadata.description}
                        </span>
                        <Grid container direction="row" sx={{ mt: 1 }} spacing={1}>
                            <Grid item>
                                <Chip label={template.metadata.tag} />
                            </Grid>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Grid item>
                                <Button variant="outlined" onClick={() => handleTemplateSelect(template)}>Select</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Item>
        </Grid>
    ));
}

export default Templates;
