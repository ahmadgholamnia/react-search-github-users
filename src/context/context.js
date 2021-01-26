import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

//Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  // request  loading
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState(0)
  // error
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGithubUser = async (user) => {
    setLoading(true)
    toggleError()
    console.log(user)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      console.log(response)
      setGithubUser(response.data)
      amountOfFollowers(user)
      userRepos(user)
    } else {
      toggleError(true, 'There is no user with this Username')
    }
    setLoading(false)
    checkRequests()
  }

  const amountOfFollowers = async (user) => {
    const response = await fetch(
      `${rootUrl}/users/${user}/followers?per_page=100`
    )

    const result = await response.json()
    console.log(result)
    if (result.length > 0) {
      setFollowers(result)
    } else {
      return setFollowers([])
    }
    console.log(result)
  }

  const userRepos = async (user) => {
    const response = await fetch(`${rootUrl}/users/${user}/repos?per_page=100`)
    const result = await response.json()
    console.log(result)

    if (result.length > 0) {
      setRepos(result)
    } else {
      setRepos([])
    }
    console.log(result)
  }
  // userRepos('bradtraversy')
  const checkRequests = (url) => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        // remaining = 0
        setRequest(remaining)
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit')
          // throw an error
          //hide search button
        }
      })
      .catch((err) => console.log(err))
  }

  const toggleError = (show = false, msg = '') => {
    setError({ show, msg })
  }

  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        loading,
        request,
        error,
        toggleError,
        searchGithubUser,
        amountOfFollowers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubContext, GithubProvider }
