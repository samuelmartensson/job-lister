import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';

const Image = styled.img`
  max-width: 200px;
  margin: 1rem;
`;

const Description = styled.div`
  padding: 2rem;

  p {
    margin-bottom: 1rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background: #f1f1f1;
  padding: 1rem;
`;

export default function JobItem(props) {
  const [data, setData] = useState();

  useEffect(() => {
    let mounted = true;
    if (props.location.state) {
      setData(props.location.state);
    } else {
      fetch(`/positions/${props.location.pathname}.json`)
        .then((res) => res.json())
        .then((data) => {
          mounted && setData(data);
        });
    }

    return () => (mounted = false);
  }, [props.location.pathname, props.location.state]);

  const {
    company,
    company_logo,
    company_url,
    created_at,
    description,
    location,
    title,
    type,
    url,
  } = props.location.state || data || {};

  if (!data && !props.location.state) return <Loader />;

  return (
    <Container>
      <Header>
        <div>
          <h2>
            {company} - {title}
          </h2>
          <strong>{type}</strong> <small>Posted: {created_at}</small>
          <div>{location}</div>
          <a rel="noreferrer" target="_blank" href={url}>
            {company_url}
          </a>
        </div>
        <Image src={company_logo} alt="company pic" />
      </Header>
      <div>
        <Description
          dangerouslySetInnerHTML={{ __html: description }}
        ></Description>
      </div>
    </Container>
  );
}
