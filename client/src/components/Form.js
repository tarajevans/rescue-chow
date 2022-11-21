import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/shopping/GlobalState";
import { ADD_RESCUE_CHECKOUT, TOGGLE_CART, UPDATE_RESCUES } from "../utils/shopping/actions";

import { QUERY_RESCUES } from "../utils/shopping/queries";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../utils/helpers";

function RescueForm() {
  const [state, dispatch] = useStoreContext();
  //const { currentCategory } = state;
  const [radio, setRadio] = useState({});

  const { loading, data } = useQuery(QUERY_RESCUES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_RESCUES,
        rescues: data.rescues,
      });
      data.rescues.forEach((rescue) => {
        idbPromise("rescues", "put", rescue);
      });
    } else if (!loading) {
      idbPromise("rescues", "get").then((rescues) => {
        dispatch({
          type: UPDATE_RESCUES,
          rescues: rescues,
        });
      });
    }
    
  }, [data, loading, dispatch,]);

  function submitCheckout(e) {
    e.preventDefault();
    dispatch({
      type: ADD_RESCUE_CHECKOUT,
      selectedRescueValue: radio,
    });
    dispatch({ type: TOGGLE_CART });
  }

  function deleteAllSelectedRescues(){
    
  }
  
  function pickRadio(rescue){
    dispatch({
      type: ADD_RESCUE_CHECKOUT,
      selectedRescueValue: rescue,
    });
    idbPromise("selectedRescue", "get").then ((selectedRescues) => {
      selectedRescues.forEach(selRescue => {
        idbPromise("selectedRescue", "delete", selRescue)
      })
    }).then((results) => {
      idbPromise("selectedRescue", "put", rescue)
    })
  }
  return (
    <div>
      <legend className="text-lg font-medium text-gray-900">Our Rescues</legend>
      <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
        {state.rescues.map((rescue) =>
            <div className="relative flex items-start py-4" key={rescue._id}>
              <div className="min-w-0 flex-1 text-sm hover:cursor-pointer">
                <a target="_blank" rel="noopener noreferrer" href={rescue.website} >
                  <label
                    htmlFor={rescue.name}
                    className="select-none font-medium text-gray-700 hover:cursor-pointer hover:underline"
                  >
                    {rescue.name}
                  </label>
                </a>
              </div>
              <div className="ml-3 flex h-5 items-center">
                <input
                  checked={radio === rescue}
                  type="radio"
                  value={rescue.name}
                  onChange={(e) => {
                    setRadio(rescue);
                    pickRadio(rescue);
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
        )}
      </div>
      <div className="flex justify-center align-center">
       
      </div>
    </div>
  );
}

export default RescueForm;
