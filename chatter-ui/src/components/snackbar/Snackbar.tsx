import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useReactiveVar } from '@apollo/client/react';
import { snackVar } from '../../constants/snackbar';

const CustomizedSnackbar = () => {
  const snack = useReactiveVar(snackVar);

  console.log("snack", snack);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    snackVar(undefined);
  };

  return (
    <div>
      {
        snack && (
      <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snack.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
        )
      }

    </div>
  );
}

export default CustomizedSnackbar
