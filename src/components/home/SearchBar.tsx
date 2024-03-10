import { UseFormHandleSubmit } from "react-hook-form";
import styled from "styled-components";

interface Props {
	register: any;
	handleSubmit: any;
	onValid: any;
	onInvalid: any;
	displayCount: any;
}

const FormDiv = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.text};
	margin-top: 20px;

	input {
		color: ${(props) => props.theme.text};
		background-color: ${(props) => props.theme.cardBackground};
		border-radius: 8px;
		border: 1px solid ${(props) => props.theme.cardBackground};
		margin-right: 16px;
		height: 100%;
		font-size: 16px;
	}

	select {
		color: ${(props) => props.theme.text};
		background-color: ${(props) => props.theme.cardBackground};
		border-radius: 8px;
		border: 1px solid ${(props) => props.theme.cardBackground};
		margin-right: 16px;
		height: 100%;
		font-size: 16px;
	}

	input::placeholder {
		color: ${(props) => props.theme.text};
	}
`;

function SearchBar({
	register,
	handleSubmit,
	onValid,
	onInvalid,
	displayCount,
}: Props) {
	return (
		<form
			style={{ marginBottom: "16px" }}
			onSubmit={handleSubmit(onValid, onInvalid)}
		>
			<FormDiv>
				<input
					{...register("searchTerm")}
					type="text"
					placeholder="Search..."
					style={{ width: "50%", padding: "8px" }}
				/>
				<select
					{...register("displayCount")}
					value={displayCount}
					style={{ padding: "8px" }}
				>
					<option value="5">5개 보기</option>
					<option value="10">10개 보기</option>
					<option value="20">20개 보기</option>
					<option value="50">50개 보기</option>
					<option value="100">100개 보기</option>
					<option value="3000">전부 보기</option>
				</select>
			</FormDiv>
		</form>
	);
}

export default SearchBar;
