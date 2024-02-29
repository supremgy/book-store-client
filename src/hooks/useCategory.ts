import { useEffect, useState } from 'react';
import { Category } from '@/models/category.model';
import { fetchCategory } from '@/api/category.api';
import { useLocation } from 'react-router-dom';

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);
  console.log(location.search);

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if (params.get('category_id')) {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: item.categoryId === Number(params.get('category_id')),
          };
        });
      });
    } else {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false,
          };
        });
      });
    }
  };
  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;
      const categoryWithAll = [
        { categoryId: null, categoryName: '전체' },
        ...category,
      ];
      setCategory(categoryWithAll);
      setActive();
    });
  }, []);
  useEffect(() => {
    setActive();
  }, [location.search]);
  return { category };
};
