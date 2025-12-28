import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  
  // URL Backend của bạn trên Render
  const API_URL = "https://my-backend-ppne.onrender.com/api/auth"; 
  // const API_URL = "https://localhost:7159/api/auth"; 


  const handleSendOTP = async () => {
    await fetch(`${API_URL}/register-step1?email=${email}`, { method: 'POST' });
    setStep(2);
  };

  const handleVerify = async () => {
    const res = await fetch(`${API_URL}/verify-otp?email=${email}&userOtp=${otp}`, { method: 'POST' });
    if (res.ok) alert("Đăng ký thành công!");
    else alert("Mã OTP sai hoặc hết hạn!");
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '10px' }}>
      <h3>Đăng ký tài khoản</h3>
      {step === 1 ? (
        <>
          <input placeholder="Nhập Email" onChange={e => setEmail(e.target.value)} />
          <button onClick={handleSendOTP}>Gửi mã xác nhận</button>
        </>
      ) : (
        <>
          <p>Mã đã gửi tới: {email}</p>
          <input placeholder="Nhập mã OTP" onChange={e => setOtp(e.target.value)} />
          <button onClick={handleVerify}>Xác nhận OTP</button>
        </>
      )}
    </div>
  );
}

export default Register; // Quan trọng để App.jsx có thể gọi được