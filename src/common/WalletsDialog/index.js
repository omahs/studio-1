import { forwardRef } from 'react';
import { Grid, Dialog, DialogContent,Slide, Button, Typography } from '@mui/material';
import { supportedWallets } from 'react-dappify';
import { useMoralis } from "react-moralis";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const WalletsDialog = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const { authenticate } = useMoralis();

    const renderSupportedWallets = () => {
        const list = [];
        supportedWallets.forEach((wallet) => {
            list.push(
                <Grid item xs={6} key={wallet.name}>
                    <Button id={`login-${wallet.id}-btn`} elevation={1} sx={{ p:4 }} fullWidth onClick={async () => {
                        await authenticate(wallet.payload);
                        onClose();
                    }}>
                        <Grid container direction="column" alignItems="left">
                            <Grid item>
                                <img src={wallet.image} alt={`Sign in with ${wallet.name}`} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h2">{wallet.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body" sx={{ color: 'rgba(0,0,0,0.5)'}}>{wallet.description}</Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
            );
        })
        return list;
    };

    return (
        <Dialog
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="content__modal">
            <Grid container sx={{ p: 0 }}>
                {renderSupportedWallets()}
            </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default WalletsDialog;
