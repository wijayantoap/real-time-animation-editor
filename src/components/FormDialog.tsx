import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Alert, Box, Divider, Typography } from '@mui/material';
import supabase from '../client/supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleForm } from '../redux/slices/overlaySlice';

const FormDialog: FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const showForm = useSelector((state: RootState) => state.overlay.showForm);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleForm());
  };

  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    handleAuth(data, error);
    handleClose();
  };

  const signInWithEmail = async (email: string, password: string) => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    handleAuth(data, error);
    handleClose();
  };

  const handleAuth = (data: any, error: any) => {
    if (data?.user) navigate('/workspace');
    if (error) setError(error?.message || 'Something went wrong');
    setLoading(false);
  };

  return (
    <>
      <Dialog
        open={showForm}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            const password = formJson.password;
            if (isLogin) {
              signInWithEmail(email, password);
            } else {
              signUpNewUser(email, password);
            }
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
            onChange={() => {
              setError('');
              setLoading(false);
            }}
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
            onChange={() => {
              setError('');
              setLoading(false);
            }}
          />
          <DialogActions>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 4,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                disabled={loading}
              >
                {isLogin ? 'Log in' : 'Sign up'}
              </Button>
              {error && (
                <Alert
                  variant="filled"
                  severity="error"
                  sx={{
                    mt: 2,
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
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
