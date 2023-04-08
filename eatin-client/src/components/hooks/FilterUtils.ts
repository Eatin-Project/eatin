import {FilterWrapper, Recipe} from "../types";

export function assertEquals(item: Recipe, field: keyof Recipe, filter: string) {
    return item[field] === filter;
}

export function assertBigger(item: Recipe, field: keyof Recipe, filter: string) {
    // @ts-ignore
    return item[field] >= Number(filter.slice(0, filter.length > 1 ? filter.length - 1 : 1));
}

export function assertSmaller(item: Recipe, field: keyof Recipe, filter: string) {
    // @ts-ignore
    return item[field] <= Number(filter);
}

export function filterRecipes(items: Recipe[], filters: FilterWrapper[]) {
    filters.forEach(
        (filterOption) =>
            (items = !!filterOption.filter
                ? items.filter((item) =>
                    filterOption.operator(item, filterOption.field, filterOption.filter),
                )
                : items),
    );

    return items;
}
