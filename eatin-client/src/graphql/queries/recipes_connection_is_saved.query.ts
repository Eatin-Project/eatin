import { useCallback, useEffect, useState } from "react";

export function useGetRecipesConnectionIsSaved(userId: string, isSaved: boolean) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const getRecipesConnectionIsSaved = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/graphql`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query {
                            recipes_connection_is_saved(user_id: "${userId}", is_saved: ${isSaved}) {
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
                        }`,
                }),
            });
            const resJson = await res.json();
            const newData = resJson.data.recipes_connection_is_saved;
            newData.forEach((i: any) => {
                i["is_saved"] = true;
            });
            setData(newData);
            setLoading(false);
        } catch (e) {
            console.log(`Error has occured in recipes_connection_is_saved query - ${e}`);
            setError(e);
        }
    }, [isSaved, userId]);

    useEffect(() => {
        getRecipesConnectionIsSaved();
    }, [getRecipesConnectionIsSaved]);

    return { data, loading, error };
}
