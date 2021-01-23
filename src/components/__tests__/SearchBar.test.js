import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('Search Bar', () => {
  it('Renders SearchBar elements', () => {
    const wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(wrapper.find('input').props()['data-test']).toBeTruthy();
    expect(wrapper.text()).toContain('Search for tech jobs');
    expect(wrapper.find('button').text()).toContain('GO');
  });
  it('Searchbar gives results on valid search', () => {
    const wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    wrapper.find('input').simulate('change', { target: { value: 'react' } });
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.job-list')).toBeTruthy();
  });
});
