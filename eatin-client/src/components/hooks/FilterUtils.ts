import { FilterableKeys, FilterWrapper, Recipe } from "../types";

export function assertEquals(item: Recipe, field: FilterableKeys, values: string[]) {
    return values.includes(<string>item[field]);
}

export function assertBigger(item: Recipe, field: FilterableKeys, values: string[]) {
    return item[field] >= Number(values.slice(0, values.length > 1 ? values.length - 1 : 1));
}

export function assertSmaller(item: Recipe, field: FilterableKeys, values: string[]) {
    return item[field] <= Number(values);
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
