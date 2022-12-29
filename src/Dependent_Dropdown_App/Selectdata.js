import { Select } from "@shopify/polaris";
import React, { memo, useState } from "react";

const Selectdata = (props) => {
    console.log("helo")
    console.log(props);
    const [selected,setSelected]=useState(props.selected)
  return (
    <Select
     label={props.label}
     options={props.options}
     onChange={(e)=>{props.handleSelectChange(e);setSelected(e)}}
     value={selected}
    />
  );
};

export default memo(Selectdata);
