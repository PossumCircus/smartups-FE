import React, { useState } from 'react'
import UserProfile from '../../components/profile/UserProfile'

export default function UserProfileContainer() {
    const [buttonState, setIsMyInfoOn] = useState<string>('info')
    const stateHandler = (section: string) => { setIsMyInfoOn(section) }
    return <UserProfile buttonState={buttonState} stateHandler={stateHandler} />
}
