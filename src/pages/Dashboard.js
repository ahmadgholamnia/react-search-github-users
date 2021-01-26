import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/preloader.gif'
import { GithubContext } from '../context/context'
const Dashboard = () => {
  const { loading } = React.useContext(GithubContext)

  return (
    <main>
      <Navbar />
      <Search />
      {loading === true ? (
        <img src={loadingImage} className='loading-img' alt='loading' />
      ) : (
        <section>
          <Info />
          <User />
          <Repos />
        </section>
      )}
    </main>
  )
}

export default Dashboard
