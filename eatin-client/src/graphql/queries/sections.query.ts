import { useEffect, useState } from "react";
import { RecipesSection } from "../../components/types";

// TODO: maybe delete this?
export function useGetSections(userId: string) {
    const [data, setData] = useState<RecipesSection[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                // const res = await fetch(`http://localhost:8000/graphql`, {
                const res = await fetch(`http://eatin.cs.colman.ac.il:8000/graphql`, {
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
                                    is_saved
                                    is_uploaded
                                }
                            }
                        }`,
                    }),
                });
                const resJson = await res.json();
                setData(resJson.data.sections);
                setLoading(false);
            } catch (e) {
                console.log(`Error has occurred in sections query - ${e}`);
                setError(e);
            }
        })();
    }, [userId]);

    return { data, loading, error };
}
