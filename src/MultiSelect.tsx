import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Items, ActiveItems, Props } from './types';

export function MultiSelect({ activeItems, items, setActiveItems }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        console.log('event.target.name: ', event.target.name)
        if (activeItems[name]) {
            delete activeItems[name]
        } else {
            activeItems[name] = true;
        }
        setActiveItems(activeItems);
    };

    function createFormControllerLabels(items: Items, activeItems: ActiveItems) {
        const formControllerLabels = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            formControllerLabels.push(
                <FormControlLabel
                    key={`xOptions${i}`}
                    defaultChecked = { false }
                    label = { item }
                    control = {
                        <Checkbox
                            name={ item }
                            checked={ activeItems[item] }
                            onChange={ handleChange }
                        />
                    } 
                />
            );
        }
        return formControllerLabels;
    }

    return (
        <FormGroup>
            { createFormControllerLabels(items, activeItems) }
        </FormGroup>
    );
}
