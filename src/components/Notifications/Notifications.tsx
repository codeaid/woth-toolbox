import { Flip, ToastContainer } from 'react-toastify';
import styles from './Notifications.module.css';

export const Notifications = () => (
  <ToastContainer
    autoClose={3000}
    bodyClassName={styles.NotificationsBody}
    closeButton={false}
    closeOnClick={true}
    draggable={false}
    hideProgressBar={true}
    newestOnTop={false}
    pauseOnFocusLoss={true}
    pauseOnHover={true}
    position="bottom-center"
    theme="dark"
    toastClassName={styles.NotificationsToast}
    transition={Flip}
  />
);
