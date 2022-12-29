import { Select, Text } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import Selectdata from "./Selectdata";
import useFetch from "./useFetch";

const Dropdowncomponent = () => {
const [parentid,setParentid]=useState([]);
const [selected, setSelected] = useState("baby");
// useFetch Hook
const seldata = useFetch(parentid);
     const handleSelectChange=(e)=>{
        setSelected(e);
        if(JSON.parse(e).hasChildren){
            setParentid(JSON.parse(e).id);
        }
        
     }
  return (
    <>
      <Text variant="heading4xl" as="h1">
        Dependent Dropdown List
      </Text>
      <p>helo</p>
      {
        seldata.map((item,i)=>{
            console.log(item[i])
               return <Selectdata  
                label="Main Category"
                options={
                    item.map((item1) => {
                        return {label:item1.name,value:JSON.stringify({
                            id:item1.parent_id, hasChildren:item1.hasChildren
                        })};
                      })
                }
                handleSelectChange={handleSelectChange}
                selected={selected}
                />
            
            
        })}


      {/* {
        seldata.map((item,i)=>{
            console.log(item[i])
            if(item[i].hasChildren==false){  
               return <p></p>
            } 
            else{
                return <Select
                label="Main Category"
                options={
                    item.map((item1) => {
                        return {label:item1.name,value:JSON.stringify({
                            id:item1.parent_id, hasChildren:item1.hasChildren
                        })};
                      })
                }
                onChange={handleSelectChange}
                value={selected}
              />  
            }
        })
      }
         <p>hi</p> */}
    </>
  );
};

export default Dropdowncomponent;
