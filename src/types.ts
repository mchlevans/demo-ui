// MultiSelect
export type Items = string[];
export type ActiveItems = {[key in string]: boolean};
export type SetActiveItems = (activeItems: ActiveItems) => void
export interface Props {
    activeItems: ActiveItems,
    items: Items,
    setActiveItems: SetActiveItems
}

