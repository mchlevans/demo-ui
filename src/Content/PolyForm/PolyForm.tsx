import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { SingleSelect } from './SingleSelect'; // should be passed as prop
import { MultiSelect } from './MultiSelect';
import { Model } from '../types';
import { 
    VehicleVariable,
    PolyFormProps,
    ApiSuccessResponse,
    SetModel,
    
} from './types';
import styles from './style.module.scss';


export function PolyForm ({ setModel }: PolyFormProps) {
    const tempYVariables = ['price']; // temp input hardcodes
    const polynomialMax = 10;

    const [ vehicleVariables, setVehicleVariables ] = useState<VehicleVariable[]>([]);
    const [ polynomial, setPolynomial ] = useState(0);
    const [ yVariable, setYVariable ] = useState<string>(tempYVariables[0]);
    const [ xVariables, setXVariables ] = useState<Set<string>>(new Set<string>());
    

    // fetch car attributes to use as model inputs
    useEffect(() => {
        try {
            axios.get<VehicleVariable[]>('http://localhost:80/vehicle/variables')
            .then(response => {
                response.data.sort(
                    (a: VehicleVariable, b: VehicleVariable) => a.displayName < b.displayName ? -1 : 1
                );
                setVehicleVariables(response.data);
            })
        } catch (e) {
            setVehicleVariables([]);
        }
    }, [])


    // fetch model for given inputs
    async function getModel(
        yVariable: string,
        xVariables: string[],
        polynomial: number,
        setModel: SetModel
    ) {
        try {
            const body = {
                xVarNames: xVariables,
                yVarName: yVariable,
                polynomial: polynomial
            }
            const path = 'http://localhost:80/model';
            
            const result = await axios.post<ApiSuccessResponse<Model>>(path, body)
            setModel(result.data.data)
        } catch(e) {
            setModel(undefined)
        } 
    }


    const formSubmit = () => getModel(
        yVariable,
        Array.from(xVariables.keys()),
        polynomial,
        setModel
    );


    return (
        <div className={styles.polyForm}>
            {/* Polynomial input */}
            {SingleSelect({
                value: polynomial,
                setValue: setPolynomial,
                label: "Polynomial",
                items: [...Array(polynomialMax).keys()]
            })}

            {/* Dependent variable input */}
            {SingleSelect({
                value: yVariable,
                setValue: setYVariable,
                label: "y Variable",
                items: tempYVariables
            })}

            {/* Independent variable input */}
            {MultiSelect({
                defaultValue: undefined,
                activeItems: xVariables,
                items: vehicleVariables,
                setActiveItems: setXVariables
            })}
            
            
            {/* Submit Model request */}
            <Button variant="outlined" onClick={formSubmit}> 
                Build 
            </Button>
        </div>
    );
};
