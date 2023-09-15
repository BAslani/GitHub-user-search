import React from 'react';
import { Info, Repos, User, Search } from '../components';
import loadingImage from '../images/preloader.gif';
import { useGlobal } from '../context/context';
const Dashboard = () => {
  const {loading} = useGlobal();
  if (loading) {
    return <main>
      <Search />
      <img src={loadingImage} alt="loading" className="loading-img" />
    </main>
  }
  return (
    <main>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
