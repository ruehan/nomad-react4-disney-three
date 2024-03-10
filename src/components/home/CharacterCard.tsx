import { useState } from "react";
import { MotionStyled } from "../../styles/styles";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
	character: any;
	index: number;
	cardsPerRow: number;
}

const Image = styled.img`
	width: 150px;
	height: 150px;
	object-fit: cover;
	border-radius: 100%;
`;

const Card = styled(motion.div)`
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	padding: 16px;
	margin: 16px;
	width: 200px;
	text-align: center;
	font-size: 1.2rem;
	background-color: ${(props) => props.theme.cardBackground};
	color: ${(props) => props.theme.text};
	transition: transform 0.1s ease-in-out;
`;

function CharacterImage({ src, alt }: { src: string; alt: string }) {
	const [tempImgUrl, setTempImgUrl] = useState<string>(src);

	const fallbackImageUrl: string =
		"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";

	return <Image src={src} alt={alt} />;
}

function CharacterCard({ character, index, cardsPerRow }: Props) {
	return (
		<MotionStyled
			to={`/character/${character.id}`}
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				delay: Math.max(0, Math.floor(index / cardsPerRow) * 0.3),
			}}
			key={character.id}
		>
			<Card
				whileHover={{ scale: 1.2 }} // Backgroundcolor와 fontcolor 바꾸면 darkmode와 충돌 생김 확인 필요!!
				transition={{ duration: 0.15 }}
			>
				<CharacterImage src={character.imageUrl} alt={character.name} />
				<div>{character.name}</div>
			</Card>
		</MotionStyled>
	);
}

export default CharacterCard;
