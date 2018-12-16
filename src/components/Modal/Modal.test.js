import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Modal from './index';
describe('<Modal />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Modal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<Modal show={true} />);
    expect(wrapper.props().show).to.equal(true);
    wrapper.setProps({ show: false });
    expect(wrapper.props().show).to.equal(false);
  });

  it('renders children when passed in with show', () => {
    const wrapper = shallow((
      <Modal show={true}>
        <div className="unique" />
      </Modal>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('renders children when passed in without show', () => {
    const wrapper = shallow((
      <Modal>
        <div className="unique" />
      </Modal>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(false);
  });
});