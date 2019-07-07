import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '../../components/Pagination/Pagination';

let wrapper;
const props = {
  page: 1,
  pages: 5,
  goToPage: jest.fn()
}
describe('Panigation.jsx', () => {
  test('should render Pagination.jsx', () => {
    wrapper = shallow(<Pagination {...props} />)
    expect(wrapper).toMatchSnapshot()
  });

  test('should render dots for current page > 3', () => {
    const newProps = {...props};
    const page = 4;
    newProps.page = page;
    wrapper = mount(<Pagination {...newProps} />);
    expect(wrapper.props().page).toEqual(page)
  });

  describe('when clicking on next page', () => {
    test('should call goToPage', () => {
      const newProps = {...props};
      wrapper = shallow(<Pagination {...newProps} />);
      wrapper.find('.pagination-nav.next-btn').simulate('click');
      expect(newProps.goToPage).toHaveBeenCalled()
    });
  });

  describe('when clicking on previous page', () => {
    test('should call goToPage', () => {
      const newProps = {...props};
      newProps.page = 3;
      wrapper = shallow(<Pagination {...newProps} />);
      wrapper.find('.pagination-nav.prev-btn').simulate('click');
      expect(newProps.goToPage).toHaveBeenCalled()
    });
  });

  describe('when clicking on page 1', () => {
    test('should call goToPage', () => {
      const newProps = {...props};
      newProps.page = 3;
      wrapper = shallow(<Pagination {...newProps} />);
      wrapper.find('.page-1-btn').simulate('click');
      expect(newProps.goToPage).toHaveBeenCalled()
    });
  });

  describe('when clicking on last page 1', () => {
    test('should call goToPage', () => {
      const newProps = {...props};
      newProps.pages = 5;
      wrapper = shallow(<Pagination {...newProps} />);
      wrapper.find(`.page-${newProps.pages}-btn`).simulate('click');
      expect(newProps.goToPage).toHaveBeenCalled()
    });
  });

  describe('when clicking on current page - 1', () => {
    test('should call goToPage', () => {
      const newProps = {...props};
      newProps.pages = 5;
      newProps.page = 3;
      wrapper = shallow(<Pagination {...newProps} />);
      wrapper.find(`.page-2-btn`).simulate('click');
      expect(newProps.goToPage).toHaveBeenCalled()
    });
  });

  describe('when clicking on current page + 1', () => {
    test('should call goToPage', () => {
      const newProps = {...props};
      newProps.pages = 5;
      newProps.page = 3;
      wrapper = shallow(<Pagination {...newProps} />);
      wrapper.find(`.page-4-btn`).simulate('click');
      expect(newProps.goToPage).toHaveBeenCalled()
    });
  });
});