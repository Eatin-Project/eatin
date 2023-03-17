export function getSections(userId: string, callback: (arg: any) => void) {
    fetch(`http://localhost:8000/graphql`, {
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
                    }`
        })
    })
        .then(res => res.json())
        .then(res => callback(res.data.sections))
        .catch(console.error)
}