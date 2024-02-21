import { enqueueSnackbar } from "notistack";

export const successNotification = (message: string) => {
    enqueueSnackbar(message, {
        autoHideDuration: 2000,
        variant: 'success',
        anchorOrigin: { 'horizontal': 'right', 'vertical': 'bottom' }
    });
}