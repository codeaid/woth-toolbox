import { Flip, ToastContainer } from 'react-toastify';
import styles from './Notifications.module.css';

export const Notifications = () => (
  <ToastContainer
    autoClose={3000}
    bodyClassName={styles.NotificationsBody}
    closeButton={false}
    closeOnClick
    draggable={false}
    hideProgressBar
    newestOnTop={false}
    pauseOnFocusLoss
    pauseOnHover
    position="bottom-center"
    theme="dark"
    toastClassName={styles.NotificationsToast}
    transition={Flip}
  />
);
