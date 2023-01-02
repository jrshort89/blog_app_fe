import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const TRANSLATION_HISTORY = gql`
	query {
		translationHistory {
			englishText
			spanishText
		}
	}
`;
export default function TranslationHistory({ reload }: { reload: boolean }) {
	const { loading, error, data, client } = useQuery(TRANSLATION_HISTORY);

	useEffect(() => {
		client.refetchQueries({ include: [TRANSLATION_HISTORY] });
	}, [reload]);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>`Error loading history: ${error.message}`</p>;
	return (
		<>
			{!!data &&
				data?.translationHistory?.map((t: any) => (
					<div key={t.englishText}>
						{t.englishText}:&nbsp;
						{t.spanishText}
						<br />
					</div>
				))}
		</>
	);
}
