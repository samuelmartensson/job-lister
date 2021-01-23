import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SearchContext } from '../contexts/SearchContext';

const Container = styled.div`
  h1 {
    text-align: center;
  }
`;

const TextInput = styled.input`
  padding: 1rem;
  display: block;
  font-size: 18px;
  position: relative;
  z-index: 9999;
  background: #f1f1f1;
  width: 100%;
  max-width: 400px;
  min-width: 140px;
  border: none;
`;

const InputContainer = styled.div`
  display: flex;
  margin: 1.5rem 0;
  padding: 1rem;
  justify-content: center;

  button {
    padding: 1rem 2.5rem;
    border: none;
    background: #2fccff;
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: #1e9ec9;
    }
  }
`;

export default function SearchBar() {
  const {
    searchHistory,
    setSearchHistory,
    setJobList,
    setLoading,
  } = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  function search() {
    const transformedSearchVal = searchValue.replace(' ', '+');
    const cachedValue = searchHistory.find((item) => item.term === searchValue);

    setJobList([]);
    setLoading(true);
    history.push('/');

    if (cachedValue) {
      setJobList(cachedValue.result);
      setLoading(false);
    } else {
      fetch(`/positions.json?description=${transformedSearchVal}`)
        .then((res) => res.json())
        .then((data) => {
          setJobList(data);
          setSearchHistory((prevState) => {
            return [...prevState, { term: searchValue, result: data }];
          });
          setLoading(false);
        });
    }
  }

  return (
    <Container>
      <h1>Search for tech jobs</h1>
      <InputContainer>
        <TextInput
          data-test="true"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={search}>GO</button>
      </InputContainer>
    </Container>
  );
}
