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
import useGuestsSelector, {
  Actions,
} from "App/components/shared/GuestsSelectorForm/useGuestsSelector";
import GuestsSelector from "./GuestsSelector";

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

const ReserveButton = styled.button`
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primaryTitleText};
  font-size: 24px;
  border: 0;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;

  :hover {
    cursor: pointer;
  }
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
  const [isGuestsSelectorOpen, setIsGuestsSelectorOpen] = useState(false);

  const [
    guests,
    dispatchGuestsSelectorAction,
    canUpdateGuestState,
  ] = useGuestsSelector({
    adults: 16,
    children: 5,
    infants: 5,
  });

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

      <GuestsSelector
        open={isGuestsSelectorOpen}
        setOpen={(v: boolean) => setIsGuestsSelectorOpen(v)}
        guestsState={guests}
        dispatchGuestsSelectorAction={(action: Actions) =>
          dispatchGuestsSelectorAction({
            type: action,
          })
        }
        canUpdateGuestsValue={canUpdateGuestState}
      />

      <ReserveButton type="button">Reserve</ReserveButton>
    </Form>
  );
};

export default ReservationForm;
