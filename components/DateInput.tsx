import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";
import { LabeledInput } from "./LabeledInput";

interface Props {
      label: string;
      value: string;
      onDateChange: (s: string) => void;
}

export const DateInput: FC<Props> = ({ label, value, onDateChange }) => {
      const [show, setShow] = useState(false);
      const [internal, setInternal] = useState(new Date());

      const onPicked = (e: DateTimePickerEvent, d?: Date) => {
            setShow(false);
            if (e.type === "set" && d) {
                  setInternal(d);
                  const display = `${d.getMonth() + 1}`.padStart(2, "0") +
                        `/${d.getDate()}`.padStart(2, "0") +
                        `/${d.getFullYear()}`;
                  onDateChange(display);
            }
      };

      if (show) {
            return (
                  <DateTimePicker
                        mode="date"
                        display="spinner"
                        themeVariant="dark"
                        textColor="white"
                        value={internal}
                        onChange={onPicked}
                  />
            );
      }

      return (
            <LabeledInput
                  label={label}
                  value={value}
                  placeholder="MM/DD/YYYY"
                  editable={false}
                  onPress={() => setShow(true)}
            />
      );
};
