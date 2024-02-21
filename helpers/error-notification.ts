import { enqueueSnackbar } from "notistack";

export const errorNotification = (message: string) => {
    enqueueSnackbar(message, {
        autoHideDuration: 2000,
        variant: 'error',
        anchorOrigin: { 'horizontal': 'right', 'vertical': 'bottom' }
    });
}