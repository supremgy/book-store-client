import { getByAltText, render } from '@testing-library/react';
import { BookStoreThemeProvider } from '@/context/themeContext';
import BookItem from '@/components/books/BookItem';

const dummyBook = {
  id: 4,
  title: '설자은, 금성으로 돌아오다',
  img: 5,
  categoryId: 2,
  form: 'PRINTED',
  isbn: '3',
  summary: '설자은...',
  detail: '금성...',
  author: '설자은',
  pages: 100,
  contents: '목차입니다.',
  price: 20000,
  pubDate: '2023-08-31',
  likes: 1,
};

describe('BookItem', () => {
  it('렌더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('20,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
