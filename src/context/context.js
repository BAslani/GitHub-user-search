import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: "" })

    // search
    const searchGithubUser = async (user) => {
        toggleError();
        setLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        if (response) {
            setGithubUser(response.data);
            const {login, followers_url} = response.data;
            axios(`${rootUrl}/users/${login}/repos?per_page=100`)
                .then((response) => {
                    setRepos(response.data)
                });
            axios(`${followers_url}?per_page=100`)
                .then((response) => {
                    setFollowers(response.data)
                });
            } else {
            toggleError(true, 'no user matched your search')
        }
        checkRequests();
        setLoading(false)
    }

    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data: { rate: { used, remaining } } }) => {
                setRequests(used);
                if (remaining === 0) {
                    toggleError(true, 'sorry you have reached your hourly search limit :(');
                    // throw an error
                }
            }).catch((err) => console.log(err));
    }

    function toggleError(show = false, msg = '') {
        setError({ show, msg })
    }

    useEffect(checkRequests, [])
    return <GithubContext.Provider value={{
        githubUser, repos, followers, requests, error, searchGithubUser, loading
    }}>
        {children}
    </GithubContext.Provider>
}

const useGlobal = () => React.useContext(GithubContext);

export { GithubProvider, useGlobal };
