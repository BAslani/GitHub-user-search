import React from 'react';
import styled from 'styled-components';
import { useGlobal } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useGlobal();

  // counting languages
  let languages = repos.reduce((total, item) => {
    const { language } = item;

    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1 };
    } else {
      total[language] = { ...total[language], value: total[language].value + 1 };
    }
    return total;
  }, {})

  // sorting languages
  languages = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 5);



  // counting languageStars
  let languageStars = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) return total;

    if (!total[language]) {
      total[language] = { label: language, value: stargazers_count };
    } else {
      total[language] = { ...total[language], value: total[language].value + stargazers_count };
    }
    return total;
  }, {})

  // sorting languageStars
  languageStars = Object.values(languageStars).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 5);


  // stars, forks
  let {stars, forks} = repos.reduce((total, item)=>{
    const {stargazers_count, name, forks} = item;
    total.stars[stargazers_count] = {label:name, value:stargazers_count}
    total.forks[forks] = {label:name, value:forks}
    return total;
  },{
    stars:{},
    forks:{}
  })

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return <section className="section">
    <Wrapper className='section-center'>
      <Pie3D data={languages} />
      <Column3D data={stars} />
      <Doughnut2D data={languageStars} />
      <Bar3D data={forks} />
    </Wrapper>
  </section>
};

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
`;

export default Repos;
