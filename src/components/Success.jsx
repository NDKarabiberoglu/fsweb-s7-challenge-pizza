import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import logo from '../assets/TeknolojikYemekler.png';
import { useLocation } from 'react-router-dom';
export default function Success() {
  const location = useLocation();
  const responseData = location.state?.responseData;

  return (
    <div className="suc">
      <section>
        <img className="logoSuc " src={logo} alt="teknolojik yemekker logo" />
      </section>
      <p className="satisfy-regular">lezzetin yolda</p>
      <p className="barlow-thin">SİPARIŞİNİZ ALINDI</p>
      <section className="sucText">
        <hr></hr>
        <legend>Position Absolute Acı Pizza</legend>
        <p>Boyut: {responseData.size}</p>
        <p>Hamur: {responseData.thickness}</p>
        <p>Ek Malzemeler: {responseData.material.join(', ')}</p>
      </section>
      <footer>
        <Card
          style={{
            border: 'white 1px solid',
            backgroundColor: '#CE2829',
            color: '#FAF7F2',
            width: '18rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CardTitle style={{ marginTop: '1rem' }} tag="h5">
            Sipariş Toplamı
          </CardTitle>
          <CardBody>
            <CardText>Seçimler: {responseData.totalPrice - 85.5} ₺</CardText>
            <CardText>Toplam: {responseData.totalPrice}</CardText>
          </CardBody>
        </Card>
      </footer>
    </div>
  );
}