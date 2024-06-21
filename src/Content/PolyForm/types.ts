import { Model } from '../types';

export interface PolyFormProps {
    setModel: SetModel
}

export interface MultiSelectProps {
   activeItems: Set<string> 
}

export type SetModel = React.Dispatch<React.SetStateAction<Model>>

export interface VehicleVariable {
    displayName: string,
    compressedName: string
}

export interface ApiSuccessResponse<T> {
    status: number,
    data: T
}

export type ActiveItemsMap = {[key: string]: boolean};
