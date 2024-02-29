import styled from 'styled-components';
import BookItem from '@/components/books/BookItem';
import { Book } from '@/models/book.model';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QUERYSTRING } from '@/constants/querystring';
import { ViewMode } from '@/components/books/BooksViewSwitcher';

interface Props {
  books: Book[];
}
const BooksList = ({ books }: Props) => {
  const location = useLocation();
  const [view, setView] = useState<ViewMode>('grid');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);
  return (
    <BooksListStyle view={view}>
      {books?.map((item) => (
        <BookItem key={item.id} book={item} view={view} />
      ))}
    </BooksListStyle>
  );
};
interface BooksListStyleProps {
  view: ViewMode;
}
const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === 'grid' ? 'repeat(4,1fr)' : 'repeat(1,1fr)'};
  gap: 24px;
`;

export default BooksList;
