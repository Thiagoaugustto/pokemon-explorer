'use client';

import { useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange,
}: PaginationProps) {
  return (
    <Container>
      <ArrowButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous Page"
      >
        &#8249;
      </ArrowButton>

      <PageInputForm
        key={currentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />

      <TotalPagesText>of {totalPages}</TotalPagesText>

      <ArrowButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
        aria-label="Next Page"
      >
        &#8250;
      </ArrowButton>
    </Container>
  );
}

interface PageInputFormProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

function PageInputForm({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: PageInputFormProps) {
  const [inputPage, setInputPage] = useState<string>(currentPage.toString());

  const submitPage = () => {
    const parsedPage = parseInt(inputPage, 10);
    
    if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
      onPageChange(parsedPage);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    submitPage();
  };

  return (
    <PageForm onSubmit={handleSubmit}>
      <PageInput
        type="text"
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        onBlur={submitPage}
        disabled={isLoading}
      />
    </PageForm>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: #333333;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const PageForm = styled.form`
  display: inline-block;
`;

const PageInput = styled.input`
  width: 44px;
  height: 44px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #d1d1d6;
  border-radius: 10px;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #0071e3;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15);
  }

  &:disabled {
    background-color: #f5f5f7;
    opacity: 0.6;
  }
`;

const TotalPagesText = styled.span`
  min-width: 40px;
  font-size: 16px;
  color: #6e6e73;
  font-weight: 400;
`;