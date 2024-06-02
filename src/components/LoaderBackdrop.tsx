import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function LoaderBackdrop() {
  const showBackdrop = useSelector((state: RootState) => state.overlay.showBackdrop);

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showBackdrop} onClick={() => {}}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
