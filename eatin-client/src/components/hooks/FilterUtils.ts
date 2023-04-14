import { FilterableKeys, FilterWrapper, Recipe } from "../types";

export function assertEquals(item: Recipe, field: FilterableKeys, values: string[]) {
    return values.includes(<string>item[field]);
}

export function assertBigger(item: Recipe, field: FilterableKeys, values: string[]) {
    return item[field] >= Number(values[0].slice(0, values.length > 1 ? values.length - 1 : 1));
}

export function assertSmaller(item: Recipe, field: FilterableKeys, values: string[]) {
    return item[field] <= Number(values[0]);
}

export function filterRecipes(items: Recipe[], filters: FilterWrapper[]) {
    filters.forEach(
        (filterOption) =>
            (items = filterOption.filter.length
                ? items.filter((item) =>
                      filterOption.operator(item, filterOption.field, filterOption.filter),
                  )
                : items),
    );

    return items;
}
