import { formatDistanceToNow, parseISO } from "date-fns"
import { ko } from 'date-fns/locale';
import { Check as CheckIcon, ArrowForward as ArrowForwardIcon, Clear as ClearIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { NotificationDataType } from "../../../types/notificationsType";

type NotificationsListProps = {
  notifications: NotificationDataType[]
  statusState: any
  errorState: string | null
  handleRefreshNotification: () => void
  handleNotificationRead: (notificationId: string) => void
  handleNotificationRemove: (notificationId: string) => void
  handleNavigateToLink: (url: string) => void
}

export default function NotificationsList({
  notifications,
  statusState,
  errorState,
  handleRefreshNotification,
  handleNotificationRead,
  handleNotificationRemove,
  handleNavigateToLink
}: NotificationsListProps) {

  const NotificationTypeRender = (type: string) => {
    if (type === 'comment_new_reply') return '댓글에 새로운 답글이 달렸습니다.'
    if (type === 'post_new_comment') return '게시글에 새로운 댓글이 달렸습니다.'
    if (type === 'post_like') return '게시글에 좋아요가 추가되었습니다.'
  }

  const NotificationsRender = () => {
    return (
      notifications.map((notification, index) => {
        const date = parseISO(notification.createdAt)
        const timeAgo = formatDistanceToNow(date, { locale: ko });

        return (
          <div key={`${notification._id}-${index}`} className={`notification w-[27%] ${notification.isRead ? 'bg-white' : 'bg-gradient-to-r from-sky-100'} border-2 my-1 p-1`}>
            <div>
              <div className="flex justify-between">
                {NotificationTypeRender(notification.notificationType)}
                <div className='-space-x-3 -mt-2'>
                  <IconButton onClick={() => handleNotificationRead(notification._id)} disabled={notification.isRead ? true : false}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={() => handleNotificationRemove(notification._id)}>
                    <ClearIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    handleNavigateToLink(notification.link as string)
                    handleNotificationRead(notification._id)
                  }}>
                    <ArrowForwardIcon />
                  </IconButton>
                </div>
              </div>
              <div>
                <b>by {notification.sender ? notification.sender.username : "Unknown User"}</b>
              </div>
              <div title={notification.createdAt}>
                <i>{`${timeAgo}전`}</i>
              </div>
            </div>
          </div>
        )
      })
    )
  }
  if (errorState) return <>알림을 불러오는데 실패하였습니다.</>
  if (notifications.length < 1) return <>새로운 알림이 없습니다.</>
  if (statusState === 'loading') return <>now loading..</>
  if (statusState === 'succeeded') {
    return (
      <>
        <IconButton onClick={handleRefreshNotification}>
          <RefreshIcon />
        </IconButton>
        <NotificationsRender />
      </>
    )
  }
}