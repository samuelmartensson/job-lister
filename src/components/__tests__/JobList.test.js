import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import JobList from '../JobList';

describe('Job List', () => {
  const obj = {
    company: 'Test Company',
    company_logo:
      'https://github.githubassets.com/images/modules/open_graph/github-mark.png',
    company_url: 'https://github.com/',
    title: 'Github Dev',
    type: 'Full time',
    id: '123-123',
  };
  const wrapper = mount(
    <BrowserRouter>
      <JobList jobList={[obj]} />
    </BrowserRouter>
  );

  it('renders heading correctly', () => {
    expect(wrapper.find('h2').text()).toContain(
      `${obj.company} - ${obj.title}`
    );
  });
  it('renders link path correctly', () => {
    expect(wrapper.find('a').props()['href']).toEqual('/' + obj.id);
  });
  it('renders image url correctly', () => {
    expect(wrapper.find('img').props()['src']).toEqual(obj.company_logo);
  });
  it('renders type correctly', () => {
    expect(wrapper.find('strong').text()).toEqual(obj.type);
  });
  it('renders company url correctly', () => {
    expect(wrapper.find('li div').text()).toEqual(obj.company_url);
  });
  it('renders no results correctly', () => {
    const empty = mount(
      <BrowserRouter>
        <JobList jobList={[]} />
      </BrowserRouter>
    );
    expect(empty.find('h1').text()).toEqual('No results :(');
  });
});
