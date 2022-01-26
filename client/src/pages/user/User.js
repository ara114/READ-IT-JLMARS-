
import React from 'react'
import Container from '../../components/container/container'
import NavBar from '../../components/navbar/NavBar'
import UserNav from '../user/UserNav'

function User() {
    return (
        <Container nav={<UserNav/>}>
			Hello
		</Container>
    )
}

export default User
