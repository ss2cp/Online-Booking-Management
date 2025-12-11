import React, { FC, Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

const PARTIAL_DATES: Date[] = [
  new Date("2025-12-10"),
  new Date("2025-12-12"),
  new Date("2025-12-15"),
];

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const SectionDateRange = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const onChangeDate = (date: Date | null) => {
    setSelectedDate(date);
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          <DatePicker
            selected={selectedDate}
            onChange={onChangeDate}
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            renderDayContents={(day, date) => {
              if (!date) {
                return <DatePickerCustomDay dayOfMonth={day} date={date} />;
              }
              const isPartial = PARTIAL_DATES.some((partialDate) =>
                isSameDay(partialDate, date)
              );
              return (
                <div className="relative">
                  <DatePickerCustomDay dayOfMonth={day} date={date} />
                  {isPartial && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  )}
                </div>
              );
            }}
          />
          <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Partially available</span>
            </div>
            {selectedDate && (
              <p>
                Selected date:{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                {PARTIAL_DATES.some((d) => isSameDay(d, selectedDate))
                  ? "(Partially available)"
                  : "(Available)"}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
