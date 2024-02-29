import Button from '@/components/common/Button';
import { useEffect } from 'react';

interface Props {
  onCompleted: (address: string) => void;
}
const SCRIPT_USL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
const FindAddressButton = ({ onCompleted }: Props) => {
  //스크립트 로드

  //핸들러

  //입력
  const handleOpen = () => {
    new window.daum.Postcode({
      oncompleted: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_USL;
    script.async = true;
    document.head.appendChild(script);
    //   <head>
    //       <script src='URL'></script>
    //   </head>

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <Button size='medium' scheme='normal' onClick={handleOpen} type='button'>
      주소 찾기
    </Button>
  );
};

export default FindAddressButton;
