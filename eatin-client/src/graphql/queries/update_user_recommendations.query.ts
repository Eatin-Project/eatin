import { useEffect, useState } from "react";

export function useUpdateUserRecommendations(userId: string, isActive: Boolean, setIsActive: any) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [isUpdated, setIsUpdated] = useState<Boolean>(false);

    useEffect(() => {
        if (isActive || isActive === undefined) {
            (async function () {
                try {
                    setLoading(true);
                    const res = await fetch(`http://localhost:8000/graphql`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            query: `mutation {
                          update_user_recommendations(user_id: "${userId}")
                        }`,
                        }),
                    });
                    const resJson = await res.json();
                    setData(resJson.data.similar_recipes);
                    setIsUpdated(true);
                    setLoading(false);
                } catch (e) {
                    console.log(`Error has occurred in similar_recipes query - ${e}`);
                    setError(e);
                } finally {
                    if (isActive && !!setIsActive) {
                        setIsActive(false);
                    }
                }
            })();
        }
    }, [userId, isActive]);

    return { data, loading, error, isUpdated };
}
