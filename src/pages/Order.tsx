import { useLocation, useNavigate } from 'react-router-dom';
import Title from '@/components/common/Title';
import { CartStyle } from '@/pages/Cart';
import CartSummary from '@/components/books/CartSummary';
import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '@/models/order.model';
import FindAddressButton from '@/components/order/FindAddressButton';
import { order } from '@/api/order.api';
import { useAlert } from '@/hooks/useAlert';

interface DelieveryForm extends Delivery {
  addressDetail: string;
}

const Order = () => {
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DelieveryForm>();

  const handlePay = (data: DelieveryForm) => {
    console.log(data);
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };
    //서버로 넘겨준다
    showConfirm('주문을 진행하시겠습니까?', () => {
      order(orderData).then(() => {
        showAlert('주문이 처리되었습니다.');
        navigate('/orderlist');
      });
    });
  };

  return (
    <>
      <Title size='large'>주문서 작성</Title>
      <CartStyle>
        <div className='content'>
          <div className='order-info'>
            <Title size='medium' color='text'>
              배송 정보
            </Title>
            <form className='delivery'>
              <fieldset>
                <label>주소</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('address', { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue('address', address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className='error-text'>주소를 입력해 주세요.</p>
              )}

              <fieldset>
                <label>상세 주소</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('addressDetail', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className='error-text'>상세 주소를 입력해 주세요.</p>
              )}

              <fieldset>
                <label>수령인</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('receiver', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className='error-text'>수령인을 입력해 주세요.</p>
              )}

              <fieldset>
                <label>전화번호</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('contact', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className='error-text'>전화번호를 입력해 주세요.</p>
              )}
            </form>
          </div>
          <div className='order-info'>
            <Title size='medium' color='text'>
              주문상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>
        </div>
        <div className='summary'>
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size='large'
            scheme='primary'
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
};

export default Order;
