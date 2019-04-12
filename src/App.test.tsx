import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';

debugger; // Or place a breakpoint when using the VS Code debugger

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  unmountComponentAtNode(div);
});

it('renders with heading', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<h1>CRA RBC Test </h1>)).toEqual(true);
});

it('renders the calendar', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.rbc-calendar')).toEqual(expect.anything());
});

it('renders children', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.children().length).toEqual(2);
});

// it('renders children of children with shallow+dive', () => {
//   const wrapper = shallow(<App />);
//   expect(wrapper.children().at(1).dive().children().length).toEqual(2);
// });

it('renders children of children with mount', () => {
  const wrapper = mount(<App />);
  expect(wrapper.childAt(0).childAt(1).children().length).toEqual(1);
});

it('renders two events', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.rbc-event').length).toEqual(2);
});

it('renders two events', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.rbc-event').length).toEqual(2);
});

it('renders selected event after click', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.rbc-selected').length).toBe(0);
  wrapper.find('.rbc-event').at(0).simulate('click');
  expect(wrapper.find('.rbc-selected').length).toBe(1);
});

it('renders one selected event after clicking two different', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.rbc-selected').length).toBe(0);
  wrapper.find('.rbc-event').at(0).simulate('click');
  expect(wrapper.find('.rbc-selected').length).toBe(1);
  wrapper.find('.rbc-event').at(1).simulate('click');
  expect(wrapper.find('.rbc-selected').length).toBe(1);
});

it('renders correct event date and time range texts', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.rbc-event').at(0).text()).toBe('7:00 AM — 9:00 AM');
  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  const ampm = now.getHours() > 12 ? 'PM' : 'AM';
  expect(wrapper.find('.rbc-event').at(1).text()).toBe(`${hour}:${minute} ${ampm} — ${hour + 2}:${minute} ${ampm}`);
});

it('renders with a side cause', () => {
  (window as any).hack = '1';
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<h1>CRA RBC Test 1</h1>)).toEqual(true);
  (window as any).hack = '2';
  wrapper.update();
  // expect(wrapper.contains(<h1>CRA RBC Test 2</h1>)).toEqual(true);
});

it('renders correct RBC props based on initial state', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.childAt(1).props().view).toEqual('week');
});

it('renders correct RBC props based on changed state', () => {
  const wrapper = mount(<App />);
  expect(wrapper.childAt(0).childAt(1).props().view).toEqual('week');
  expect(wrapper.find('.rbc-btn-group button').at(3).text()).toEqual('Month');
  wrapper.find('.rbc-btn-group button').at(3).simulate('click');
  expect(wrapper.childAt(0).childAt(1).props().view).toEqual('month');
});

// `simulate('change', { target: { name: '', value: '' } })`
