import styled from 'styled-components';
import { useCategory } from '@/hooks/useCategory';
import Button from '@/components/common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '@/constants/querystring';

const BooksFilter = () => {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, 'true');
    }
    setSearchParams(newSearchParams);
  };
  return (
    <BooksFilterStyle>
      <div className='category'>
        {category.map((item) => (
          <Button
            size='medium'
            scheme={item.isActive ? 'primary' : 'normal'}
            key={item.categoryId}
            onClick={() => handleCategory(item.categoryId)}
          >
            {item.categoryName}
          </Button>
        ))}
      </div>
      <div className='new'>
        <Button
          size='medium'
          scheme={searchParams.get(QUERYSTRING.NEWS) ? 'primary' : 'normal'}
          onClick={handleNews}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
