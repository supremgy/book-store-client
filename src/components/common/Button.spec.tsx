import { render, screen } from '@testing-library/react';
import Button from '@/components/common/Button';
import { BookStoreThemeProvider } from '@/context/themeContext';
describe('Button 컴포넌트 테스트', () => {
  it('렌더를 확인', () => {
    //1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          button
        </Button>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(screen.getByText('button')).toBeInTheDocument();
  });
  it('size props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          button
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({ fontSize: '1.5rem' });
  });
  //   it('color props 적용', () => {
  //     const { container } = render(
  //       <BookStoreThemeProvider>
  //         <Button size='large' color='primary'>
  //           제목 button
  //         </Button>
  //       </BookStoreThemeProvider>
  //     );

  //     expect(container?.firstChild).toHaveStyle({ color: 'brown' });
  //   });
});
