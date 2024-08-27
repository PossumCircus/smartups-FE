import NotificationsList from "../components/NotificationsList"
import {
    selectAllNotifications,
    notificationsStatus,
    notificationsError,
    fetchNotifications,
    setReadNotification,
    deleteNotification
} from "../index"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../users/"
import { AppDispatch } from "../../../app/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotificationsListContainer() {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector(selectAllNotifications)
    const statusState = useSelector(notificationsStatus)
    const errorState = useSelector(notificationsError)
    const loginUserId = useSelector(selectUser)._id
    const navigate = useNavigate();

    useEffect(() => {
        if (statusState === 'idle') {
            handleRefreshNotification();
        }
    }, [statusState, dispatch])

    const handleRefreshNotification = () => {
        dispatch(fetchNotifications({ loginUserId }))
    }
    const handleNotificationRead = (notificationId: string) => {
        dispatch(setReadNotification({ notificationId }))
    }
    const handleNotificationRemove = (notificationId: string) => {
        dispatch(deleteNotification(notificationId))
        window.location.reload()
    }
    const handleNavigateToLink = (url: string) => {
        navigate(url);
    }

    return <NotificationsList
        notifications={notifications}
        statusState={statusState}
        errorState={errorState}
        handleRefreshNotification={handleRefreshNotification}
        handleNotificationRead={handleNotificationRead}
        handleNotificationRemove={handleNotificationRemove}
        handleNavigateToLink={handleNavigateToLink}
    />
}
