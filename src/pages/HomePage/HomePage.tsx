import React, { useState, useEffect, useMemo } from 'react';
import { fetchAllCharacters } from '../../api/api';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {useForm} from 'react-hook-form';
import { MotionStyled } from '../../styles/styles';
import { darkMode } from '../../utils/atoms';
import { useRecoilState } from 'recoil';

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
    const [characters, setCharacters] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cardsPerRow, setCardsPerRow] = useState<number>(0);
    const {register, watch, setValue} = useForm();
    const searchTerm = watch('searchTerm', '');
    const [displayCount, setDisplayCount] = useState<number>(50);
    // const [isdarkmode, setisDarkMode] = useRecoilState(darkMode);

    const filteredCharacters = useMemo(() => {
        return characters.filter((character: any) => {
            return character.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }, [characters, searchTerm])

    const displayedCharacters = useMemo(() => {
        return filteredCharacters.slice(0, displayCount);
      }, [filteredCharacters, displayCount]);

    const handleChangeDisplayCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDisplayCount(Number(event.target.value));
    }

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

  useEffect(() => {
    setValue('displayCount', displayCount)
  }, [displayCount, setValue])

  if (isloading) return <div>Loading...</div>; // 나중에 로딩 애니메이션 추가 예정
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <form style={{marginBottom: '16px'}}>
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
          onChange={handleChangeDisplayCount}
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
        {displayedCharacters.map((character: any, index: number) => (

          <MotionStyled to={`/character/${character.id}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.floor(index / cardsPerRow) * 0.6 }}
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
