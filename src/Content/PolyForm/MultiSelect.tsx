import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { 
    VehicleVariable,
} from './types';

export function MultiSelect({ activeItems, items, setActiveItems }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        activeItems.has(name) ? activeItems.delete(name) : activeItems.add(name)
        setActiveItems(new Set(activeItems));        
    };

    function createFormControllerLabels(items: VehicleVariable[], activeItems: Set<string>) {
        const formControllerLabels = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const isActive = activeItems.has(item.compressedName);
            formControllerLabels.push(
                <FormControlLabel
                    key={`xOptions${i}`}
                    label = { item.displayName }
                    control = {
                        <Checkbox
                            name = { item.compressedName }
                            checked = { isActive }
                            onChange = { handleChange }
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
