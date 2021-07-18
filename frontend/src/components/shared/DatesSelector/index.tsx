import React from "react";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import styled from "styled-components";
import type { Moment } from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DatesSelectorContainer = styled.div`
  .DayPicker__horizontal {
    margin: auto;
    font-family: "Airbnb Cereal App Light", Roboto, "Helvetica Neue", sans-serif,
      Arial;
    border: 0px;
  }

  .CalendarDay__default {
    border: 0px;
  }

  .CalendarDay__default:hover {
    border-radius: 64px;
    border: 1px solid ${(p) => p.theme.colors.primaryComponent};
    background-color: transparent;
  }

  .CalendarDay__selected {
    border-radius: 64px;
    background: ${(p) => p.theme.colors.primaryComponent};
    color: white;
  }

  .CalendarDay__selected_span {
    background: ${(p) => p.theme.colors.lighterPrimaryBackground};
    color: ${(p) => p.theme.colors.primaryComponent};
  }

  .CalendarMonth_table {
    border-collapse: separate;
  }

  .CalendarDay__hovered_span {
    background: ${(p) => p.theme.colors.lighterPrimaryBackground};
  }
`;

export const START_DATE = "startDate";
export const END_DATE = "endDate";

export type OnDateChange = (arg: {
  startDate: Moment | null;
  endDate: Moment | null;
}) => void;
export type OnFocusChange = (arg: FocusedInputShape | null) => void;

interface DatesSelectorProps {
  onDatesChange: OnDateChange;
  onFocusChange: OnFocusChange;
  focusedInput: FocusedInputShape | null;
  startDate: Moment | null;
  endDate: Moment | null;
  initialVisibleMonth: () => Moment;
  numberOfMonths?: number;
  minimumNights?: number;
  daySize?: number;
}

const DatesSelector: React.VFC<DatesSelectorProps> = ({
  onDatesChange,
  onFocusChange,
  focusedInput,
  startDate,
  endDate,
  initialVisibleMonth,
  numberOfMonths = 2,
  minimumNights = 1,
  daySize = 50,
}) => {
  return (
    <DatesSelectorContainer>
      <DayPickerRangeController
        startDate={startDate}
        endDate={endDate}
        initialVisibleMonth={initialVisibleMonth}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
        numberOfMonths={numberOfMonths}
        minimumNights={minimumNights}
        noBorder
        hideKeyboardShortcutsPanel
        daySize={daySize}
      />
    </DatesSelectorContainer>
  );
};

export default DatesSelector;
