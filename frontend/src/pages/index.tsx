import type { NextPage } from 'next'
import { useState } from 'react'
import { DevelopersList } from '../components/DevelopersList'
import { Header } from '../components/Header'
import { NewDeveloperModal } from '../components/NewDeveloperModal'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <DevelopersList />
    </div>
  )
}

export default Home
