import React from 'react';
import Input from '@/components/Input';
import { useTextDrawer } from './hooks/useTextDrawer';
import styled from 'styled-components';

const TextDrawer = () => {
  const { handleSubmitTextDrawer } = useTextDrawer();
  return (
    <StyledTextDrawerContainer onSubmit={handleSubmitTextDrawer}>
      <Input type='search' name='keyword' variant='outlined' placeholder='검색' height='40px' fullWidth />
    </StyledTextDrawerContainer>
  );
};

export default TextDrawer;

const StyledTextDrawerContainer = styled.form`
  padding: 28px 20px;
`;
