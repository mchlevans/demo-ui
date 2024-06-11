import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { SingleSelect } from './SingleSelect'; // should be passed as prop
import { MultiSelect } from './MultiSelect'; 
import styles from './style.module.scss';

interface Props {
    setModel: React.Dispatch<(prevState: undefined) => undefined>
}

export function PolyForm ({ setModel }: Props) {
    // temp input hardcodes
    const tempYVariables = ['price'];
    const tempXVariables = ['engineSize', 'peakRpm', 'highwayMpg']
    const [ polynomial, setPolynomial ] = useState(0);
    const [ yVariable, setYVariable ] = useState(tempYVariables[0]);
    const [ xVariables, setXVariables ] = useState({});
    const polynomialMax = 10;

    function getPolynomialList(size: number) {
        const list = new Array<number>();;
        for (let i = 0; i <= size; i++) {
            list.push(i);
        }
        return list
    }

    async function getModel(yVariable, xVariables, polynomial, setModel) {
        try {
            const body = {
                xVarName: Object.keys(xVariables)[0],
                yVarName: yVariable,
                polynomial: polynomial
            }
    
            // dynamically import SVG, note value is on "default" property
            const result = await axios.post('http://localhost:80/model', body)
            console.log(result.data.data)
            setModel(result.data.data)
        } catch(e) {
            setModel(undefined)
        } 
    }

    return (
        <div className={styles.polyForm}>
            <h2>
                Builder
            </h2>

            {/* polynomial input */}
            {SingleSelect({
                value: polynomial,
                setValue: setPolynomial,
                label: "Polynomial",
                items: getPolynomialList(polynomialMax)
            })}

            {/* y variable input */}
            {SingleSelect({
                value: yVariable,
                setValue: setYVariable,
                label: "y Variable",
                items: tempYVariables
            })}

            {/* x variable input */}
            {MultiSelect({
                activeItems: xVariables,
                items: tempXVariables,
                setActiveItems: setXVariables
            })}

            {/* submit model */}
            <Button variant="outlined" onClick={() => getModel(yVariable, xVariables, polynomial, setModel)}> 
                build 
            </Button>
        </div>
    );
};
