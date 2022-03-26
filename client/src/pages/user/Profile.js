import React from 'react'
import Container from '../../components/container/container'
import NavBar from '../../components/navbar/NavBar'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const { id: userID } = useParams()
  return (
    <Container nav={<NavBar />}>
        <div>{userID}</div>
    </Container>
  )
}

export default Profile