import { useState, useEffect } from "react";
import { fetchAllCharacters } from "../api/api";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import { useQuery } from "react-query";
import Loader from "../utils/Loader";
import SearchBar from "../components/home/SearchBar";
import CharacterCard from "../components/home/CharacterCard";

function HomePage() {
	const [cardsPerRow, setCardsPerRow] = useState<number>(0);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

	const { register, watch, handleSubmit } = useForm();
	const searchTerm = watch("searchTerm", "");
	const displayCount = watch("displayCount", 50);

	useEffect(() => {
		const debouncedUpdate = debounce(
			() => setDebouncedSearchTerm(searchTerm),
			1000
		);
		debouncedUpdate();
		return () => debouncedUpdate.cancel();
	}, [searchTerm]);

	const {
		data: allCharacters,
		isLoading,
		isError,
	} = useQuery(["characters", debouncedSearchTerm, displayCount], async () => {
		const characters = await fetchAllCharacters();
		let result = characters;
		if (debouncedSearchTerm) {
			result = result.filter((character: any) =>
				character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
			);
		}
		return result.slice(0, displayCount);
	});

	useEffect(() => {
		const updateCardsPerRow = () => {
			const cardWidth = 200 + 16 * 2 + 2;
			setCardsPerRow(Math.floor(window.innerWidth / cardWidth) - 1);
		};

		window.addEventListener("resize", updateCardsPerRow);
		updateCardsPerRow();
	}, []);

	const onValid = (data: any) => console.log(data, "onvalid");
	const onInvalid = (data: any) => console.log(data, "onInvalid");

	if (isLoading) return <Loader />;
	if (isError) return <span>Error: {isError}</span>;
	if (!allCharacters) return null;

	if (cardsPerRow === 0) {
		return <div> cardsPerRow = 0 </div>;
	}

	return (
		<div>
			<SearchBar
				register={register}
				handleSubmit={handleSubmit}
				onValid={onValid}
				onInvalid={onInvalid}
				displayCount={displayCount}
			/>

			<div
				style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
			>
				{allCharacters.map((character: any, index: number) => (
					<CharacterCard
						character={character}
						index={index}
						cardsPerRow={cardsPerRow}
					/>
				))}
			</div>
		</div>
	);
}

export default HomePage;
