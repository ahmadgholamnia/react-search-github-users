import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)

  const lang = repos.filter((repo) => {
    return repo.language !== null
  })

  const languages = lang.reduce((total, item) => {
    const { language, stargazers_count } = item
    if (total[language]) {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    } else {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      }
    }
    return total
  }, {})

  /////////////
  ////////////
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)
  ///////////////
  //////////////
  const mostStars = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)
  ///////////////
  //////////////

  let starForks = lang.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    {
      stars: {},
      forks: {},
    }
  )

  const stars = Object.values(starForks.stars).reverse().slice(0, 5)

  const forks = Object.values(starForks.forks)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  return (
    <div className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStars} />
        <Bar3D data={forks} />
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
// const chartData = [
//   {
//     label: 'HTML',
//     value: '13',
//   },
//   {
//     label: 'CSS',
//     value: '160',
//   },
//   {
//     label: 'JAVASCRIPT',
//     value: '80',
//   },
// ]

// const names = lang
//   .map((item) => {
//     return { label: item.name, value: item.stargazers_count }
//   })
//   .sort((a, b) => {
//     return b.value - a.value
//   })
//   .slice(0, 5)

// console.log(names)

// const forks = lang
//   .map((item) => {
//     return { label: item.name, value: item.forks }
//   })
//   .sort((a, b) => {
//     return b.value - a.value
//   })
//   .slice(0, 5)
// console.log(forks)
