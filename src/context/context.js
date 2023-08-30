import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    return <GithubContext.Provider value={'hi there'}>
        {children}
    </GithubContext.Provider>
}

const useGlobal = () => React.useContext(GithubContext);

export {GithubProvider, useGlobal};
