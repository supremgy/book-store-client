import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { LoginProps } from '@/pages/Login';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { useAlert } from './useAlert';
import { SignupProps } from '@/pages/Signup';
import { useState } from 'react';

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        //상태 변화
        storeLogin(res.token);
        showAlert('로그인이 되었습니다.');
        navigate('/');
      },
      (error) => {
        showAlert('로그인이 실패하였습니다.');
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      //성공
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화 되었습니다.');
      navigate('/login');
    });
  };

  const [resetRequested, setResetRequested] = useState(false);
  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return {
    userLogin,
    userSignup,
    userResetRequest,
    resetRequested,
    userResetPassword,
  };
};
