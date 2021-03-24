import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VerticalDivider from "../../shared/VerticalDivider";
import { ComponentId } from "../enums";
import SearchItem from "../common/SearchItem";
import DatesSelector, {
  OnDateChange,
  OnFocusChange,
  START_DATE,
  END_DATE,
} from "./DatesSelector";
import moment, { Moment } from "moment";
import type { FocusedInputShape } from "react-dates";
import SearchInput from "../common/SearchInput";

const DateSelectorContainer = styled.div`
  max-height: calc(100vh - 220px);
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  overflow-y: auto;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  border-radius: 32px;
  margin-top: 12px;
  padding: 16px 0px;
`;

interface DatesSelectorProps {
  selectedId: ComponentId | null;
  setSelectedId: (id: ComponentId) => void;
  getSelectedStatus: (id: ComponentId) => boolean | null;
}

const BookingDates: React.FC<DatesSelectorProps> = ({
  getSelectedStatus,
  setSelectedId,
}) => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const [
    focusedCalendarDate,
    setFocusedCalendarDate,
  ] = useState<FocusedInputShape | null>(START_DATE);

  const onDatesChange: OnDateChange = ({
    startDate: changedStartDate,
    endDate: changedEndDate,
  }) => {
    setStartDate(changedStartDate);
    setEndDate(changedEndDate);
  };

  const onCalendarFocusChange: OnFocusChange = (focusedShape) => {
    // calendar MUST be focused for dates to be selected. null can happen when you have selected startDate and endDate.
    // force it to keep endDate selected

    if (!focusedShape) {
      setFocusedCalendarDate(END_DATE);
      setSelectedId(ComponentId.CheckOutDate);
      return;
    }

    if (focusedShape === START_DATE) {
      setSelectedId(ComponentId.CheckInDate);
    }

    if (focusedShape === END_DATE) {
      setSelectedId(ComponentId.CheckOutDate);
    }

    setFocusedCalendarDate(focusedShape);
  };

  const startDateSelected = getSelectedStatus(ComponentId.CheckInDate);
  useEffect(() => {
    if (startDateSelected) {
      setFocusedCalendarDate(START_DATE);
      return;
    }
    setFocusedCalendarDate(END_DATE);
  }, [startDateSelected]);

  return (
    <>
      <SearchItem
        onClick={() => setSelectedId(ComponentId.CheckInDate)}
        selected={getSelectedStatus(ComponentId.CheckInDate)}
      >
        <SearchInput
          title="Check In"
          placeholder="Add dates"
          text={startDate?.format("D MMM") ?? ""}
          disabled
        />
      </SearchItem>
      <VerticalDivider
        transparent={
          !!(
            getSelectedStatus(ComponentId.CheckInDate) ||
            getSelectedStatus(ComponentId.CheckOutDate)
          )
        }
      />
      <SearchItem
        onClick={() => setSelectedId(ComponentId.CheckOutDate)}
        selected={getSelectedStatus(ComponentId.CheckOutDate)}
      >
        <SearchInput
          title="Check out"
          placeholder="Add dates"
          text={endDate?.format("D MMM") ?? ""}
          disabled
        />
      </SearchItem>

      {(getSelectedStatus(ComponentId.CheckInDate) ||
        getSelectedStatus(ComponentId.CheckOutDate)) && (
        <DateSelectorContainer>
          <DatesSelector
            startDate={startDate}
            endDate={endDate}
            initialVisibleMonth={() => moment()}
            onDatesChange={onDatesChange}
            onFocusChange={onCalendarFocusChange}
            focusedInput={focusedCalendarDate}
          />
        </DateSelectorContainer>
      )}
    </>
  );
};

export default BookingDates;
