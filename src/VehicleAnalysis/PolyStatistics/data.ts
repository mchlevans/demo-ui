import { ManufacturerMetrics } from './types';

// Summary data - these result came from a db query but
// keeping in memory here to reduce required network 
// requests and for simplicity
const manufacturerSummary: ManufacturerMetrics[] = [
    {manufacturer: 'toyota', count: 32},
    {manufacturer: 'nissan', count: 18},
    {manufacturer: 'mazda', count: 17},
    {manufacturer: 'mitsubishi', count: 13},
    {manufacturer: 'honda', count: 13},
    {manufacturer: 'volkswagen', count: 12},
    {manufacturer: 'subaru', count: 12},
    {manufacturer: 'volvo', count: 11},
    {manufacturer: 'peugot', count: 11},
    {manufacturer: 'dodge', count: 9},
    {manufacturer: 'mercedes-benz', count: 8},
    {manufacturer: 'bmw', count: 8},
    {manufacturer: 'plymouth', count: 7},
    {manufacturer: 'audi', count: 6},
    {manufacturer: 'saab', count: 6},
    {manufacturer: 'porsche', count: 4},
    {manufacturer: 'chevrolet', count: 3},
    {manufacturer: 'alfa-romero', count: 3},
    {manufacturer: 'jaguar', count: 3},
    {manufacturer: 'renault', count: 2},
    {manufacturer: 'isuzu', count: 2},
    {manufacturer: 'mercury', count: 1},
]
    
export { manufacturerSummary }
