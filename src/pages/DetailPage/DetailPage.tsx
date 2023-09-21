import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterDetail } from '../../api/api';
import styled from 'styled-components'
import { MotionStyled} from '../../styles/styles';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2em;
  color: ${(props) => props.theme.text};
`;


const FilmList = styled.ul`
  margin-top: 1em;
  list-style-type: disc;
  padding-left: 1em;
  
`;

const DetailImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
`

function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<any | null>(null);
    const [isloading, setIsLoading] = useState(true);
    const [isloadingtemp, setIsLoadingTemp] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
            const data = await fetchCharacterDetail(id);
            setCharacter(data);
        }else{
            console.log('id가 없습니다')
        }
      } catch (e:any) {
        setError(e);
      }
      setIsLoadingTemp(false)
    };
    fetchData();

  }, [id]);

    if (isloadingtemp) {
        return <div>Loading...</div>;
    }

    if(character === null){

      const tempCharacter = {
        id: "404",
        name: "해당 데이터가 없습니다.",
        imageUrl: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
        films: ["해당 데이터가 없습니다."],
        sourceUrl: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
      }

      return (
        <DetailContainer>
        <DetailImg src={tempCharacter.imageUrl} alt={tempCharacter.name} />
        <h1>{tempCharacter.name}</h1>
        
        <MotionStyled to={tempCharacter.sourceUrl} target="_blank" style={{fontSize : '25px'}}>
          Source URL
        </MotionStyled>
  
        <FilmList>
          {tempCharacter.films.map((film: string, index: number) => (
            <li key={index}>{film}</li>
          ))}
        </FilmList>
        </DetailContainer>
      )
    }

    console.log(character)

    return (
      <DetailContainer>
        <DetailImg src={character.imageUrl} alt={character.name} />
        <h1>{character.name}</h1>
        
        <MotionStyled to={character.sourceUrl} target="_blank" style={{fontSize : '25px'}}>
          Source URL
        </MotionStyled>
  
        <FilmList>
          {character.films.map((film: string, index: number) => (
            <li key={index}>{film}</li>
          ))}
        </FilmList>
      </DetailContainer>
    );
}

export default DetailPage;
