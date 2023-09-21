import React, { useState, useEffect } from 'react';
import { fetchAllCharacters } from '../api/api';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 200px;
  text-align: center;
`;

const Image = styled.img`
  width: 150px; // 카드 너비에 맞게 이미지 너비를 설정
  height: 150px; // 이미지 높이를 고정 값으로 설정
  object-fit: cover; // 이미지가 지정된 너비와 높이에 맞게 조정되도록 설정
  border-radius: 100%;
`;


function CharacterImage({ src, alt }: { src: string; alt: string }) {
    const [imageSrc, setImageSrc] = useState('https://www.salonlfc.com/en/image-not-found-2'); // 여기에 로딩 이미지의 경로를 지정하세요
    const [error, setError] = useState(false);
  
    const handleImageLoad = () => {
      setImageSrc(src);
    };
  
    const handleImageError = () => {
    //   setError(true);
    };
  
    if (error) {
      return <div>이미지를 불러올 수 없습니다</div>;
    }
  
    return <Image src={src} alt={alt} onLoad={handleImageLoad} onError={handleImageError} />;
  }

function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardsPerRow, setCardsPerRow] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllCharacters();
        setCharacters(data);
      } catch (e:any) {
        setError(e);
      }
      setIsLoading(false);
    };
    fetchData();

    const updateCardsPerRow = () => {
        const cardWidth = 200 + 16 * 2 + 2; // 카드 너비 + 마진 + 테두리
        setCardsPerRow(Math.floor(window.innerWidth / cardWidth) - 1);
      };
  
      window.addEventListener('resize', updateCardsPerRow);
      updateCardsPerRow(); // 초기 로드 시 호출
  }, []);

  if (isloading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  console.log(characters)

  return (
    <div>
      Home Page
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {characters.map((character: any, index: number) => (
          <Card 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.floor(index / cardsPerRow) * 0.6 }} // 각 카드가 순차적으로 나타나도록 딜레이를 추가
            key={character.id}>
            {/* <Image src={imageSrc} alt={character.name} onLoad={() => handleImageLoad(character.imageUrl)} onError={handleImageError}/> */}
            <CharacterImage src={character.imageUrl} alt={character.name} />
            <div>{character.name}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
