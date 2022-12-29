import { Select, Text } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import Selectdata from "./Selectdata";
import useFetch from "./useFetch";

const Dropdowncomponent = () => {
  const [parentid, setParentid] = useState([]);
  const [selected, setSelected] = useState("baby");
  const [loading,setLoading]=useState(false);
  // useFetch Hook
  const seldata = useFetch(parentid,setLoading);
  console.log(seldata);
  const handleSelectChange = (e) => {
    setSelected(e);
    if (JSON.parse(e).hasChildren) {
      setParentid(JSON.parse(e).id);
    }
  };
  return (
    <>
      <Text variant="heading4xl" as="h1">
        Dependent Dropdown List
      </Text>
      {seldata.map((item, i) => {
        return (
          <Selectdata
            label="Main Category"
            options={item.map((item1) => {
              return {
                label: item1.name,
                value: JSON.stringify({
                  id: item1.parent_id,
                  hasChildren: item1.hasChildren,
                }),
              };
            })}
            handleSelectChange={handleSelectChange}
            selected={selected}
          />
        );
      })}
      {(loading)?<p><img alt="" height="50px" width="50px" src="https://media.tenor.com/hlKEXPvlX48AAAAC/loading-loader.gif"/></p>:''}
      {/* <p>helo</p> */}
    </>
  );
};

export default Dropdowncomponent;
