import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeExecute = (id: string) => {
  const cumulativeCode = useTypedSelector((state) => {
    let codeArray = [
      `
        import _React from "react";
        import _ReactDOM from 'react-dom';
        const show = (value) => {
            const root = document.querySelector('#root');
            
            if( typeof value === 'object'){    
                if(value.$$typeof && value.props){
                    _ReactDOM.render(value, root);
                }
                else{
                     root.innerHTML = JSON.stringify(value);
                }
            } 
            else{
                root.innerHTML = value;
            }
        }
    `,
    ];
    const { cells, order } = state.CellReducer;
    const cellIndex = order.findIndex((index) => index === id);

    for (let i = 0; i < order.length; i++) {
      if (i <= cellIndex && cells[order[i]].type !== "text") {
        codeArray.push(cells[order[i]].content);
      }
    }
    return codeArray;
  }).join("\n");

  return cumulativeCode;
};
