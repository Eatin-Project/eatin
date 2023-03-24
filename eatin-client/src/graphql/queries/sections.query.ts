import { useEffect, useState } from "react";

export function useGetSections(userId: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/graphql`, {
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
        })
            .then((res) => res.json())
            .then((res) => setData(res.data.sections))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
