import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { SingleSelect } from './SingleSelect';
import { MultiSelect } from './MultiSelect';
import { Model } from '../types';
import { endpoints } from '../../configs';
import { 
    VehicleVariable,
    PolyFormProps,
    ApiSuccessResponse,
    SetModel
} from './types';
import { LoadStatus } from '../types'
import styles from './style.module.scss';


export function PolyForm ({ setModel, setModelStatus }: PolyFormProps) {
    /* 
        Hard coding dependent variable to "price"
        from the vehicle data set for now. Considering
        making this dynamic to be any vehicle attribute.
    */
    const tempYVariables = ['price'];
    const polynomialMax = 10;
    const defaultPolynomial = 3;

    const [ vehicleVariablesStatus, setVehicleVariablesStatus ] = useState<LoadStatus>(LoadStatus.Loading);
    const [ vehicleVariables, setVehicleVariables ] = useState<VehicleVariable[]>([]);
    const [ polynomial, setPolynomial ] = useState(defaultPolynomial);
    const [ yVariable, setYVariable ] = useState<string>(tempYVariables[0]);
    const [ xVariables, setXVariables ] = useState<Set<string>>(new Set<string>());
    
    // fetch car attributes to use as model inputs
    useEffect(() => {
        const url = endpoints[MODE] + '/vehicle/variables';
        axios.get<ApiSuccessResponse<VehicleVariable[]>>(url)
            .then(response => {
                response.data.data.sort(
                    (a: VehicleVariable, b: VehicleVariable) => a.displayName < b.displayName ? -1 : 1
                );
                setVehicleVariables(response.data.data);
                setVehicleVariablesStatus(LoadStatus.Loaded);
            })
            .catch(error => {
                setVehicleVariablesStatus(LoadStatus.Error);
                setVehicleVariables([]);
            })
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
            setModelStatus(LoadStatus.Loading);
            const url = endpoints[MODE] + '/model';
            const result = await axios.post<ApiSuccessResponse<Model>>(url, body);
            setModel(result.data.data);
            setModelStatus(LoadStatus.Loaded);
        } catch(e) {
            setModelStatus(LoadStatus.Error);
            setModel(undefined)
        } 
    }

    function displaySubmitButton(polynomial: number, yVariable: string, xVariables: Set<string>) {
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

    function displayIndependentVariables(vehicleVariablesStatus: string) {
        if (vehicleVariablesStatus === LoadStatus.Loading) {
            return <CircularProgress/>
        } else if (vehicleVariablesStatus === LoadStatus.Error) {
            return <p> Unable to load vehicle variables, please try again later </p>
        } else {
            return MultiSelect({
                activeItems: xVariables,
                items: vehicleVariables,
                setActiveItems: setXVariables
            })
        }
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
            {/* Dependent Variables */}
            <div  className={styles.dependentVariable}>
                {SingleSelect({
                    value: yVariable,
                    setValue: setYVariable,
                    label: "Dependent Variable",
                    items: tempYVariables
                })}
            </div>

            {/* Polynomial */}
            <div  className={styles.polynomial}>
                {SingleSelect({
                    value: polynomial,
                    setValue: setPolynomial,
                    label: "Polynomial",
                    items: [...Array(polynomialMax).keys()]
                })}
            </div>
    
            {/* Independent Variables */}
            <div className={styles.formDivider2}  >
                Independent Variables:
            </div>
            {displayIndependentVariables(vehicleVariablesStatus)}
            
            {/* Submit */}
            {displaySubmitButton(polynomial, yVariable, xVariables)}            
        </div>
    );
};
