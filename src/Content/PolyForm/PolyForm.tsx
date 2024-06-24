import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { SingleSelect } from './SingleSelect'; // should be passed as prop
import { MultiSelect } from './MultiSelect';
import { Model } from '../types';
import { endpoints } from '../../configs';
import { 
    VehicleVariable,
    PolyFormProps,
    ApiSuccessResponse,
    SetModel
} from './types';
import styles from './style.module.scss';


export function PolyForm ({ setModel }: PolyFormProps) {
    const tempYVariables = ['price']; // temp input hardcodes
    const polynomialMax = 10;
    const defaultPolynomial = 3;

    const [ vehicleVariables, setVehicleVariables ] = useState<VehicleVariable[]>([]);
    const [ polynomial, setPolynomial ] = useState(defaultPolynomial);
    const [ yVariable, setYVariable ] = useState<string>(tempYVariables[0]);
    const [ xVariables, setXVariables ] = useState<Set<string>>(new Set<string>());
    

    // fetch car attributes to use as model inputs
    useEffect(() => {
        try {
            const url = endpoints[MODE] + '/vehicle/variables';
            axios.get<ApiSuccessResponse<VehicleVariable[]>>(url)
            .then(response => {
                response.data.data.sort(
                    (a: VehicleVariable, b: VehicleVariable) => a.displayName < b.displayName ? -1 : 1
                );
                setVehicleVariables(response.data.data);
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
            const url = endpoints[MODE] + '/model';
            const result = await axios.post<ApiSuccessResponse<Model>>(url, body)
            setModel(result.data.data)
        } catch(e) {
            setModel(undefined)
        } 
    }

    function getSubmitButton(polynomial: number, yVariable: string, xVariables: Set<string>) {
        if (polynomial !== undefined && 
            yVariable !== undefined &&
            xVariables.size > 0
        ) {
            return (
                <Button className={styles.submitForm} variant="outlined" onClick={formSubmit}> 
                    Build 
                </Button>
            )
        }

        return (
            <Button className={styles.submitForm} variant="outlined" disabled> 
                Build 
            </Button>
        ) 
    }

    const formSubmit = () => {
        return getModel(
            yVariable,
            Array.from(xVariables.keys()),
            polynomial,
            setModel
        )
    };


    return (
        <div className={styles.wrapper}>

            {/* Dependent variable input */}
            <div  className={styles.dependentVariable}>
                {SingleSelect({
                    value: yVariable,
                    setValue: setYVariable,
                    label: "Dependent Variable",
                    items: tempYVariables
                })}
            </div>

            {/* Polynomial input */}
            <div  className={styles.polynomial}>
                {SingleSelect({
                    value: polynomial,
                    setValue: setPolynomial,
                    label: "Polynomial",
                    items: [...Array(polynomialMax).keys()]
                })}
            </div>
    
            <div className={styles.formDivider2}  >
                Independent Variables:
            </div>

            {/* Independent variable input */}
            {MultiSelect({
                defaultValue: undefined,
                activeItems: xVariables,
                items: vehicleVariables,
                setActiveItems: setXVariables
            })}
            
            {getSubmitButton(polynomial, yVariable, xVariables)}            
        </div>
    );
};
