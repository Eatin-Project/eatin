import { useCallback, useEffect, useRef, useState } from "react";

export function useGetSections(userId: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const isDataFetched = useRef(false);

    const fetchResults = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query {
                            sections(user_id: "${userId}") {
                                name
                                recipes {
                                      author
                                      category
                                      cook_time
                                      course
                                      cuisine
                                      description
                                      diet
                                      difficulty
                                      image
                                      index
                                      ingredients
                                      instructions
                                      prep_time
                                      rating
                                      recipe_title
                                      record_health
                                      tags
                                      total_time
                                      url
                                      vote_count
                                }
                            }
                        }`,
                }),
            });
            const resJson = await res.json();
            const newData = resJson.data.sections;
            newData.map(async (item: { name: any; recipes: any }) => {
                // const recipeRes =
            });
            setData(newData);
            setLoading(false);
        } catch (e) {
            console.log(`Error has occured in sections query - ${e}`);
            setError(e);
        }
        // .then((res) => res.json())
        // .then((res) => {
        //     const sectionData = res.data.sections;
        //     sectionData.map((item: { name: any; recipes: any }) => {

        //     });
        //     setData(sectionData);
        // })
        // .catch((e) => setError(e))
        // .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!isDataFetched.current) fetchResults();
        isDataFetched.current = true;
    }, []);

    return { data, loading, error };
}
