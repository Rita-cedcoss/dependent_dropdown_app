import { createAsyncThunk, createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
  attributeArr: [],
  loading: false,
  message:""
};
// data fetch attribute api
export const fetchAttribute = createAsyncThunk(
  "dropdownSlice/fetchAttribute",
  async (obj,thunk) => {
    let response1;
    let response = await fetch(
      "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify({
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          user_id: "63329d7f0451c074aa0e15a8",
          data: {
            barcode_exemption: false,
            browser_node_id: obj.browseNodeId,
            category: obj.category,
            sub_category: obj.subcategory,
          },
          source: {
            marketplace: "amazon",
            shopId: "530",
          },
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        }),
      }
    ).catch(err=>{return err});
        try{
          response1 = await response.json();
        }catch(err){
           return err
        }
       
        console.log(response1);
        if(!response1.success)
        {
          return thunk.rejectWithValue(response1.data);
        }
        else{
          return response1.data;  
        }
      
  }
);
// Dropdown slice
const dropdownSlice = createSlice({
  name: "attributesData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttribute.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAttribute.fulfilled, (state, action) => {
        state.attributeArr = action.payload.Mandantory;
        state.loading = false;
      })
      .addCase(fetchAttribute.rejected, (state, action) => {
         
          state.message=action.error.message;
          state.loading=false;
      });
  },
});
export default dropdownSlice.reducer;
