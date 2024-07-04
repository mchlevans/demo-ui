import { Model, LoadStatus } from '../types';

export interface PolyFormProps {
    setModel: SetModel,
    setModelStatus: SetModelStatus
}

export interface MultiSelectProps {
   activeItems: Set<string>
   items: VehicleVariable[]
   setActiveItems:  React.Dispatch<React.SetStateAction<Set<string>>>
}

export type SetModel = React.Dispatch<React.SetStateAction<Model>>
export type SetModelStatus = React.Dispatch<React.SetStateAction<LoadStatus>>

export interface VehicleVariable {
    displayName: string,
    compressedName: string
}

export interface ApiSuccessResponse<T> {
    status: number,
    data: T
}

export type ActiveItemsMap = {[key: string]: boolean};
