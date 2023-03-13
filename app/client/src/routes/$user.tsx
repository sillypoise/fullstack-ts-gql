import { useParams } from "react-router-dom";

export default function User() {
    let params = useParams();
    let user_id = params.user_id;
    // let GET_USER = gql`
    //     query GetUserById(id: ${user_id}) {
    //         user(id: ${user_id}) {
    //             id
    //             username
    //             recipes {
    //         }
    //
    //     }`
}
