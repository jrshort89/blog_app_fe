import { useQuery, gql } from "@apollo/client";
export default function Blogs() {
	const GET_BLOGS = gql`
		query {
			allBlogs {
				id
				title
				body
			}
		}
	`;

	const { data } = useQuery(GET_BLOGS);
	console.log(data);

	return <div>Blogs</div>;
}
