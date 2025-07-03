import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";
import { LabeledInput } from "./LabeledInput";

interface Props {
      label: string;
      value: string;
      onTimeChange: (s: string) => void;
}

const TimeInput: FC<Props> = ({ label, value, onTimeChange }) => {
      const [show, setShow] = useState(false);
      const [internal, setInternal] = useState(new Date());

      const onPicked = (e: DateTimePickerEvent, d?: Date) => {
            setShow(false);
            if (e.type === "set" && d) {
                  setInternal(d);

                  const hours = d.getHours() % 12 || 12;
                  const minutes = `${d.getMinutes()}`.padStart(2, "0");
                  const ampm = d.getHours() >= 12 ? "PM" : "AM";
                  onTimeChange(`${hours}:${minutes} ${ampm}`);
            }
      };

      if (show) {
            return (
                  <DateTimePicker
                        mode="time"
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
                  placeholder="HH:MM AM/PM"
                  editable={false}
                  onPress={() => setShow(true)}
            />
      );
};

export default TimeInput;
