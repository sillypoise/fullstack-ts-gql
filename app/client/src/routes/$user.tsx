import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

export default function User() {
    let params = useParams();
    let user_id = params.id;
    let GET_USER = gql`
        query GetUserById {
            user(id: ${user_id}) {
                id
                username
                recipes {
                    id
                    title
                }
            }
        }
    `;

    let { loading, error, data } = useQuery(GET_USER);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    let user = data.user;

    return (
        <main className="center mlb-xl">
            <article className="stack">
                {loading ? (
                    <>
                        <h1 className="text-4">
                            Hang tight. We're getting your recipe!
                        </h1>
                    </>
                ) : (
                    <UserPresentation user={user} />
                )}
            </article>
        </main>
    );
}

function UserPresentation({
    user,
}: {
    user: {
        id: number;
        username: string;
        recipes: Array<{
            id: number;
            title: string;
        }>;
    };
}) {
    return (
        <>
            <h1 className="text-4">{user.username}</h1>
            <h2 className="text-2">Recipes</h2>
            {user.recipes.length === 0 ? (
                <p>No recipes yet!</p>
            ) : (
                <ul>
                    {user.recipes.map((recipe: any) => (
                        <li key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                                {recipe.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
