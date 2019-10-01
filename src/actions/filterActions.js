import {FILTER_BY_DAY} from './types';

export const filterByDay = payload => {
    return {
        type: FILTER_BY_DAY,
        payload
    }
}