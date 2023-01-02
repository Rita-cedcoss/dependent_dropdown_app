import {
  Button,
  ButtonGroup,
  Card,
  DataTable,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttribute } from "../ReduxToolkit/dropdownSlice";
import Selectdata from "./Selectdata";
import useFetch from "./useFetch";
const Dropdowncomponent = () => {
  const [parentid, setParentid] = useState([]);
  const [selected, setSelected] = useState("baby");
  const [loading, setLoading] = useState(false);
  const[errData,setErrData]=useState("");
  const [selectAttribute, setAttribute] = useState("brand_name");
  const [attrlabel, setAttrlabe] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // useFetch Hook
  const seldata = useFetch(parentid, setLoading,setErrData);
  const handleSelectChange = (e) => {
    setSelected(e);
    if (JSON.parse(e).hasChildren) {
      setParentid(JSON.parse(e).id);
    } else {
      let obj = {};
      seldata[seldata.length - 1].map((item) => {
        if (JSON.parse(e).value === item.name) {
          obj = {
            name: item.name,
            browseNodeId: item.browseNodeId,
            category: item.category["primary-category"],
            subcategory: item.category["sub-category"],
          };
        }
      });
      dispatch(fetchAttribute(obj));
    }
  };
  // attribute Selector
  const attributeSelected = (e) => {
    setAttribute(e);
    attrlabel.push(e);
    setAttrlabe(attrlabel);
  };
  // input handler
  const [inpValue, setValue] = useState("");
  const [attributeArr, setAttributeArr] = useState([]);
  const inputHandler = (e) => {
    setValue(e);
  };
  // add attribute
  const add_attribute = () => {
    let obj = [selectAttribute, inpValue];
    if (inpValue == "") {
      alert("Please fill this field");
    } else {
      attributeArr.push(obj);
      setAttributeArr(attributeArr);
      console.log(obj, attributeArr);
      setValue("");
      setAttribute("brand_name");
    }
  };
  return (
    <>
      {/* Categories Data */}
      <div className="dropDown">
        <Text variant="heading4xl" as="h1">
          Dependent Dropdown List
        </Text>
        {seldata.map((item, i) => {
          return (
            <Selectdata
              key={item}
              label="Categories"
              options={item.map((item1) => {
                return {
                  label: item1.name,
                  value: JSON.stringify({
                    id: item1.parent_id,
                    hasChildren: item1.hasChildren,
                    value: item1.name,
                  }),
                };
              })}
              handleSelectChange={handleSelectChange}
              selected={selected}
            />
          );
        })}
        {/* loadings */}
        {loading ? (
          <div className="loading">
            <img
              alt=""
              height="50px"
              width="50px"
              src="https://acegif.com/wp-content/uploads/loading-45.gif"
            />
          </div>
        ) : (
          ""
        )}
        {/* error message */}
        {errData?<p>{errData}</p>:""}
      </div>
      {/* Attribute Data */}
      {state.dropdownSliceReducer.attributeArr.length == 0 ? (
        <p></p>
      ) : (
        <div className="dropDown">
          <Text variant="heading4xl" as="h1">
            Fill Attributes Detail
          </Text>
          <Select
            label="Attributes"
            options={Object.keys(state.dropdownSliceReducer.attributeArr).map(
              (item) => {
                return { label: item, value: item, disabled: false };
              }
            )}
            onChange={(e) => attributeSelected(e)}
            value={selectAttribute}
          />
          <TextField
            value={inpValue}
            onChange={inputHandler}
            label={selectAttribute}
            type="text"
          />
          <ButtonGroup>
            <Button onClick={add_attribute} primary>
              Save
            </Button>
          </ButtonGroup>
        </div>
      )}
      {state.dropdownSliceReducer.loading ? (
        <div className="dropDown">
          <div className="loading">
            <img
              alt=""
              height="50px"
              width="50px"
              padding="20px"
              src="https://acegif.com/wp-content/uploads/loading-45.gif"
            />
          </div>
        </div>
      ) : (
        <p></p>
      )}
      {state.dropdownSliceReducer.message == "" ? (
        <p></p>
      ) : (
        <div className="dropDown">
           <p className="error">Error:{state.dropdownSliceReducer.message}</p>
        </div>
       
      )}
      {/* display data */}
      {attributeArr.length > 0 ? (
        <div className="dropDown">
          <Page title="Attribute Table">
            <Card>
              <DataTable
                columnContentTypes={["text", "text"]}
                headings={["Attribute Name", "Attribute Value"]}
                rows={attributeArr}
                totals={[]}
              />
            </Card>
          </Page>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Dropdowncomponent;
