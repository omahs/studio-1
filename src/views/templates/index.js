import * as React from 'react';
import { Dialog, Chip, Box, Grid, Paper, Button, Toolbar, AppBar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import * as Starter from "views/templates/content/Starter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 350,
    borderRadius: '4px'
}));

const TemplateManager = ({ open, handleClose, editor }) => {


    const availableTemplates = [Starter];

    const handleTemplateSelect = (template) => {
        console.log(template);
        console.log(editor);
        editor.setComponents(template.html);
        editor.setStyle(template.style);
        handleClose();
    }

  return (
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ 
            "& .MuiPaper-root": {
                padding: "0px"
            }
        }}
    >
        <AppBar sx={{ position: 'relative', background: "#1d2023" }}>
        <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: '#00e6e6' }} variant="h2" component="div">
            🎉 Choose a new template for your project
            </Typography>
            <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            >
            <CloseIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{p:2}}>
        {availableTemplates.map((template, index) => (
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
                                {/*<Grid item>
                                    <Button>Preview</Button>
                    </Grid>*/}
                                <Grid item>
                                    <Button variant="outlined" onClick={() => handleTemplateSelect(template)}>Select</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
}

export default TemplateManager;
