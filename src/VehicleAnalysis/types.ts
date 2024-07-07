export interface Model {
    figure: string;
    mse: string;
    rsquared: string;
}

export enum LoadStatus {
    Loading = 'Loading',
    Loaded = 'Loaded',
    Error = 'Error',
}
