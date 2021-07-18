import moment, { Moment } from "moment";
import React from "react";
import { FocusedInputShape } from "react-dates";
import DatesSelector from "../DatesSelector";

export const START_DATE = "startDate";
export const END_DATE = "endDate";

export type OnDateChange = (arg: {
  startDate: Moment | null;
  endDate: Moment | null;
}) => void;
export type OnFocusChange = (arg: FocusedInputShape | null) => void;

interface ReservationDatesProps {
  initialVisibleMonth?: Moment;
  startDate: Moment | null;
  endDate: Moment | null;
  setStartDate: (d: Moment | null) => void;
  setEndDate: (d: Moment | null) => void;
  onCalendarFocusChange: OnFocusChange;
  focusedCalendarDate: FocusedInputShape | null;
}
const ReservationDates: React.VFC<ReservationDatesProps> = ({
  initialVisibleMonth = moment(),
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onCalendarFocusChange,
  focusedCalendarDate,
}) => {
  const onDatesChange: OnDateChange = ({
    startDate: changedStartDate,
    endDate: changedEndDate,
  }) => {
    setStartDate(changedStartDate);
    setEndDate(changedEndDate);
  };

  return (
    <DatesSelector
      initialVisibleMonth={() => initialVisibleMonth}
      startDate={startDate}
      endDate={endDate}
      onDatesChange={onDatesChange}
      focusedInput={focusedCalendarDate}
      onFocusChange={onCalendarFocusChange}
    />
  );
};

export default ReservationDates;
