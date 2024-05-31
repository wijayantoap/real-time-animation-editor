import { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Typography } from '@mui/material';

interface FormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormDialog: FC<FormDialogProps> = ({ open, setOpen }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
          sx: { borderRadius: 4 },
        }}
      >
        <Typography align="center" fontWeight={'bold'} variant="h4" mt={2}>
          {isLogin ? 'Log in' : 'Create an account'}
        </Typography>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <DialogActions>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </Button>
          </DialogActions>
          <Divider sx={{ my: 2 }} />
          <Typography color={'gray'} align="center">
            {isLogin ? 'New to RottieEditor?' : 'Already have an account?'}{' '}
            <Typography
              component={'span'}
              onClick={() => setIsLogin((prevState) => !prevState)}
              sx={{ color: 'primary.main', cursor: 'pointer', display: 'inline-block' }}
              fontWeight={'bold'}
            >
              {isLogin ? 'Create an account' : 'Log in'}
            </Typography>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormDialog;
