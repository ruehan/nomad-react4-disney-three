import React, { useState, useEffect } from 'react';
import { fetchAllCharacters } from '../../api/api';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {useForm} from 'react-hook-form';
import { MotionStyled } from '../../styles/styles';
import { debounce } from "lodash"
import { useQuery } from 'react-query';

const FormDiv = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};
  /* background-color: ${(props) => props.theme.cardBackground}; */
  margin-top: 20px;

  input {
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.cardBackground};
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.cardBackground};
    margin-right: 16px;
    height: 100%;
    font-size: 1.2rem;
  }

  select {
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.cardBackground};
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.cardBackground};
    margin-right: 16px;
    height: 100%;
  }

  input::placeholder {
    color: ${(props) => props.theme.text};
  }
`

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
  transition: transform 0.3s ease-in-out;
`;

const Image = styled.img`
  width: 150px; // 카드 너비에 맞게 이미지 너비를 설정
  height: 150px; // 이미지 높이를 고정 값으로 설정
  object-fit: cover; // 이미지가 지정된 너비와 높이에 맞게 조정되도록 설정
  border-radius: 100%;
`;


function CharacterImage({ src, alt }: { src: string; alt: string }) {
    const [imageSrc, setImageSrc] = useState('https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'); // 여기에 로딩 이미지의 경로를 지정하세요
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
    const [cardsPerRow, setCardsPerRow] = useState<number>(0);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    const { register, watch, handleSubmit } = useForm();
    const searchTerm = watch('searchTerm', '');
    const displayCount = watch('displayCount', 50);

    useEffect(() => {
        const debouncedUpdate = debounce(() => setDebouncedSearchTerm(searchTerm), 1000);
        debouncedUpdate();
        return () => debouncedUpdate.cancel();
    }, [searchTerm]);

    const { data: allCharacters, isLoading, isError } = useQuery(
      ['characters', debouncedSearchTerm, displayCount],
      async () => {
          const characters = await fetchAllCharacters();
          let result = characters;
          if (debouncedSearchTerm) {
              result = result.filter((character: any) =>
                  character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
              );
          }
          return result.slice(0, displayCount);
      },
      {
          // enabled: true // debouncedSearchTerm과 상관 없이 항상 쿼리 활성화
      }
  );

    useEffect(() => {
      const updateCardsPerRow = () => {
          const cardWidth = 200 + 16 * 2 + 2; // 카드 너비 + 마진 + 테두리
          setCardsPerRow(Math.floor(window.innerWidth / cardWidth) - 1);
        };
    
        window.addEventListener('resize', updateCardsPerRow);
        updateCardsPerRow(); // 초기 로드 시 호출
    }, [])


    const onValid = (data: any) => console.log(data, "onvalid");
    const onInvalid = (data: any) => console.log(data, "onInvalid");
  

    if (isLoading) return <span>isLoading...</span>;
    if (isError) return <span>Error: {isError}</span>;
    if (!allCharacters) return null;

    if(cardsPerRow === 0) {
      return <div> cardsPerRow = 0 </div>
    };

  return (
    <div>
      <form style={{marginBottom: '16px'}} onSubmit={handleSubmit(onValid, onInvalid)} >
        <FormDiv>
          <input {
              ...register('searchTerm')
          }
          type="text"
          placeholder="Search..."
          style={{width: '50%', padding: '8px'}}
          />
          <select {
              ...register('displayCount')
          }
          value={displayCount}
          style={{ padding: '8px' }}
          >
              <option value="5">5개 보기</option>
              <option value="10">10개 보기</option>
              <option value="20">20개 보기</option>
              <option value="50">50개 보기</option>
              <option value="100">100개 보기</option>
          </select>
        </FormDiv>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allCharacters.map((character: any, index: number) => (

          <MotionStyled to={`/character/${character.id}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.max(0, Math.floor(index / cardsPerRow) * 0.6) }}
            key={character.id}>
               {/* backgroundColor: isdarkmode ? 'white' : 'black', color: isdarkmode ? 'black' : 'white' */}
            <Card
              whileHover={{ scale: 1.2, }} // Backgroundcolor와 fontcolor 바꾸면 darkmode와 충돌 생김 확인 필요!!
              transition={{ duration: 0.15 }}>
              <CharacterImage src={character.imageUrl} alt={character.name} />
              <div>{character.name}</div>
            </Card>
          </MotionStyled>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
