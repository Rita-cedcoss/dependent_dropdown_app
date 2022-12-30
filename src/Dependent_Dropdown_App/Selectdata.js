import { Select } from "@shopify/polaris";
import React, { memo, useState } from "react";

const Selectdata = (props) => {
  const [selected, setSelected] = useState(props.selected);
  return (
    // Category Dropdown
    <Select
      label={props.label}
      options={props.options}
      onChange={(e) => {
        props.handleSelectChange(e);
        setSelected(e);
      }}
      value={selected}
    />
  );
};

export default memo(Selectdata);
