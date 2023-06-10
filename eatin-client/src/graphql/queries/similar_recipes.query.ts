import { useEffect, useState } from "react";
import { PYTHON_SERVER_URI } from "../../index";

export function useGetSimilarRecipes(recipeIndex: number, userId: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const res = await fetch(PYTHON_SERVER_URI, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `query {
                            similar_recipes(recipe_index: ${recipeIndex}, user_id: "${userId}") {
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
                                      is_saved
                                }
                            }
                        }`,
                    }),
                });
                const resJson = await res.json();
                setData(resJson.data.similar_recipes);
                setLoading(false);
            } catch (e) {
                console.log(`Error has occurred in similar_recipes query - ${e}`);
                setError(e);
            }
        })();
    }, [recipeIndex]);

    return { data, loading, error };
}
