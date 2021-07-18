import ClearableTextField from "App/components/shared/ClearableTextField";
import {
  END_DATE,
  OnFocusChange,
  START_DATE,
} from "App/components/shared/DatesSelector";
import ReservationDates from "App/components/shared/ReservationDates";
import { Moment } from "moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import React, { useRef, useState } from "react";
import { FocusedInputShape } from "react-dates";
import { useOutsideAlerter } from "../../../../../hooks/outsideAlerter";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 24px;
`;

const DatesInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReservationDatesContainer = styled.div`
  position: absolute;
  top: 110px;
  z-index: 9;
`;

interface ReservationFormProps {
  adults?: number;
  infants?: number;
  children?: number;
}
const ReservationForm: React.VFC<ReservationFormProps> = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [
    focusedCalendarDate,
    setFocusedCalendarDate,
  ] = useState<FocusedInputShape | null>(START_DATE);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onCalendarFocusChange: OnFocusChange = (focusedShape) => {
    // calendar MUST be focused for dates to be selected. null can happen when you have selected startDate and endDate.
    // force it to keep endDate selected
    if (!focusedShape) {
      setFocusedCalendarDate(END_DATE);
      // setSelectedId(ComponentId.CheckOutDate);
      return;
    }

    if (focusedShape === START_DATE) {
      // setSelectedId(ComponentId.CheckInDate);
    }

    if (focusedShape === END_DATE) {
      // setSelectedId(ComponentId.CheckOutDate);
    }

    setFocusedCalendarDate(focusedShape);
  };
  const calendarRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(calendarRef, () => {
    setIsCalendarOpen(false);
  });

  return (
    <Form>
      <DatesInputContainer>
        <ClearableTextField
          variant="outlined"
          helperText="Check In"
          value={startDate?.format("D MMM") ?? ""}
          onFocus={() => {
            setIsCalendarOpen(true);
            setFocusedCalendarDate(START_DATE);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon />
              </InputAdornment>
            ),
          }}
          onClear={() => setStartDate(null)}
          showClearButton
        />
        <ClearableTextField
          variant="outlined"
          helperText="Check Out"
          value={endDate?.format("D MMM") ?? ""}
          onFocusCapture={() => {
            setIsCalendarOpen(true);
            setFocusedCalendarDate(END_DATE);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon />
              </InputAdornment>
            ),
          }}
          onClear={() => setEndDate(null)}
          showClearButton
        />
      </DatesInputContainer>

      {isCalendarOpen && (
        <ReservationDatesContainer ref={calendarRef}>
          <ReservationDates
            startDate={startDate}
            endDate={endDate}
            setStartDate={(d: Moment | null) => setStartDate(d)}
            setEndDate={(d: Moment | null) => setEndDate(d)}
            focusedCalendarDate={focusedCalendarDate}
            onCalendarFocusChange={onCalendarFocusChange}
          />
        </ReservationDatesContainer>
      )}

      <ClearableTextField variant="outlined" helperText="Guests" disabled />
    </Form>
  );
};

export default ReservationForm;
