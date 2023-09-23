import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Ear = styled.div`
  background-color: ${(props) => props.theme.text}; // 미키 마우스 색상
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const Face = styled.div`
  background-color: ${(props) => props.theme.text}; // 미키 마우스 색상
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: relative;
`;

const Loader= () => (
  <SpinnerContainer>
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
      <Face>
        <Ear style={{ position: 'absolute', top: 0, left: -30 }} />
        <Ear style={{ position: 'absolute', top: 0, right: -30 }} />
      </Face>
    </motion.div>
  </SpinnerContainer>
);

export default Loader;
