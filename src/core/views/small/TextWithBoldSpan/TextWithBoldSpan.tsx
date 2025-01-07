import React from "react";
import styles from "./TextWithBoldSpan.module.css";

interface TextWithBoldSpanProps {
  label: string;
  boldSpan: string;
}

const TextWithBoldSpan: React.FC<TextWithBoldSpanProps> = (props) => {
  const { label, boldSpan } = props;

  return (
    <p>
      {label}: <span className={styles.bold}>{boldSpan}</span>
    </p>
  );
};

export default TextWithBoldSpan;
