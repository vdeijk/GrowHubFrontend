import React from "react";
import styles from "./TextWithBoldSpan.module.css";
import { TextWithBoldSpanData } from "../../../../auxiliary/interfaces/TextWithBoldSpanData";

interface TextWithBoldSpanProps {
  textWithBoldSpanData: TextWithBoldSpanData;
}

const TextWithBoldSpan: React.FC<TextWithBoldSpanProps> = ({
  textWithBoldSpanData = { label: "", boldSpan: "" },
}) => {
  const { label, boldSpan } = textWithBoldSpanData;

  return (
    <p>
      {label}: <span className={styles.bold}>{boldSpan}</span>
    </p>
  );
};

export default TextWithBoldSpan;
