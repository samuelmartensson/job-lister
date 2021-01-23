import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
  height: 80px;
  max-width: 80px;
  margin-bottom: 1rem;
  border-radius: 1000px;
  object-fit: contain;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;
const H1 = styled.h1`
  text-align: center;
`;
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const List = styled.ul`
  list-style-type: none;

  h2 {
    word-break: break-word;
  }
  a {
    text-decoration: none;
    color: #1b1919;
  }

  li {
    margin-bottom: 1rem;
    padding: 2rem;
    background: #f1f1f1;
    animation: downFade 0.2s ease forwards;

    @keyframes downFade {
      0% {
        transform: translateY(-10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

export default function JobList({ jobList, loading }) {
  if (jobList.length === 0 && !loading) return <H1>No results :(</H1>;

  return (
    <Container>
      <List className="job-list">
        {jobList.length > 0 &&
          jobList.map((job) => {
            const { company, company_logo, company_url, title, type, id } = job;
            return (
              <li key={id}>
                <Link to={{ pathname: `/${id}`, state: job }}>
                  <Image src={company_logo} alt="company pic" />
                  <h2>
                    {company} - {title}
                  </h2>
                  <strong>{type}</strong>
                  <div>{company_url}</div>
                </Link>
              </li>
            );
          })}
      </List>
    </Container>
  );
}
