export const parseStringArray = (str: string | undefined): string[] => {
    if (!str) return [];

    try {
        if (str.startsWith("{"))
            return JSON.parse(
                "[" +
                    str
                        .substring(1, str.length - 1)
                        .replaceAll('\\"', '"')
                        .replaceAll(",/ ", "") +
                    "]",
            );
        else if (str.startsWith("["))
            return JSON.parse(
                str.replaceAll(/\\\\/g, "\\").replaceAll(/\\"/g, '"').replaceAll(/\\,/g, ","),
            );
        return JSON.parse(str);
    } catch (e) {
        console.log(e);
        return ["problem parsing string to json", "fix is coming soon! :D"];
    }
};

export const arrayToString = (arr: string[]): string => {
    return JSON.stringify(
        arr.map((str) =>
            str.replaceAll(/\\/g, "\\\\").replaceAll(/"/g, '\\"').replaceAll(/,/g, "\\,"),
        ),
    );
};

export const upperCaseFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
