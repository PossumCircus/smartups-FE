import { useEffect } from "react";
import Home from "../components/Home";
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { notificationsStatus, fetchNotifications } from "../../notifications";
import { selectUser } from "../../users";

export default function HomeContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const statusState = useSelector(notificationsStatus)
  const loginUserId = useSelector(selectUser)._id

  useEffect(() => {
    if (loginUserId && statusState === 'idle') {
      dispatch(fetchNotifications({ loginUserId }));
    }
  }, [statusState, dispatch])

  return <Home />;
};