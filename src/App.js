// Lib
import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// Context
import { SearchContext } from './contexts/SearchContext';

// Component
import JobList from './components/JobList';
import JobItem from './components/JobItem';
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';

function App() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        setSearchHistory,
        jobList,
        setJobList,
        setLoading,
      }}
    >
      {loading && <Loader />}
      <SearchBar />

      <Route path="/:id" render={(props) => <JobItem {...props} />} />
      <Route exact path="/">
        <JobList
          {...{
            jobList,
            loading,
          }}
        />
      </Route>
    </SearchContext.Provider>
  );
}

export default App;
