import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar, { View } from 'react-big-calendar';

type AppState = {
  view: View;
};

export default class App extends Component<{}, AppState> {
  public readonly state: AppState = { view: 'week' };
  private readonly localizer = BigCalendar.momentLocalizer(moment);
  render() {
    const events = [
      { start: moment().set({ hour: 7, minute: 0 }).toDate(), end: moment().set({ hour: 9, minute: 0 }).toDate() },
      { start: moment().toDate(), end: moment().add(2, 'hours').toDate() },
    ];
    return (
      <div className="App">
        <h1>CRA RBC Test {(window as any).hack}</h1>
        <BigCalendar
          localizer={this.localizer}
          view={this.state.view}
          scrollToTime={moment().set({ hour: 7, minute: 0 }).toDate()}
          events={events}
          onView={this.onBigCalendarView}
        />
      </div>
    );
  }

  private readonly onBigCalendarView = (view: View) => {
    this.setState({ view });
  };
}
