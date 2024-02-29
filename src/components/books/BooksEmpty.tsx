import { FaSmileWink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Empty from '@/components/common/Empty';

const BooksEmpty = () => {
  return (
    <Empty
      title='검색 결과가 없습니다.'
      icon={<FaSmileWink />}
      description={<Link to='/books'>전체검색 결과로 이동</Link>}
    />
  );
};

export default BooksEmpty;
