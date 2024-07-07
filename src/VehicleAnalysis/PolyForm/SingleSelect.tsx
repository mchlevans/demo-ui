import React, { ReactElement } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    setValue: (value: any) => void; // update value input to be generic
    value: any; // update value input to be generic
    label: string;
    items: any[]; // update value input to be generic
}

export function SingleSelect({ setValue, value, label, items }: Props) {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    // update value input to be generic
    function generateItems(items: any[]) {
        const menuItems: ReactElement[] = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            menuItems.push(
                <MenuItem key={`${item}${i}`} value={item}>
                    {item}
                </MenuItem>
            );
        }
        return menuItems;
    }

    return (
        <div>
            <FormControl id="formcontrol" fullWidth={true}>
                <InputLabel id={`inputLabel${label}`}>{label}</InputLabel>
                <Select
                    labelId="single-select"
                    id="single-select"
                    value={value}
                    onChange={handleChange}
                    label={label}
                >
                    {generateItems(items)}
                </Select>
            </FormControl>
        </div>
    );
}
