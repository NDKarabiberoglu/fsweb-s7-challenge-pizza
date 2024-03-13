import {
    Form,
    FormText,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
    CardTitle,
    CardBody,
    Card,
    CardText,
} from "reactstrap";
import "../components/Order.css";
import Head from "../components/Head";
import OrderTop from "../components/OrderTop";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

const initialForm = {
    fullName: "",
    size: "",
    thickness: "",
    material: [],
    text: "",
};

const malzemeSecenekleri = [
    'Pepperoni',
    'Domates',
    'Biber',
    'Sosis',
    'Mısır',
    'Sucuk',
  
    'Tavuk',
    'Jalepeno',
    'Kabak',
    'Ananas',
    'Zeytin',
    'Mantar',
    'Kanada Jambonu',
];

const malzemeBedeli = {
    Pepperoni: 5,
    Domates: 5,
    Biber: 5,
    Sosis: 5,
    Mısır: 5,
    Sucuk: 5,
    Tavuk: 5,
    Jalepeno: 5,
    Kabak: 5,
    Ananas: 5,
    Zeytin: 5,
    Mantar: 5,
    "Kanada Jambonu": 5,
};

const sizePrices = {
    kucuk: 0,
    orta: 10,
    buyuk: 20,
};

export default function Order () {
    const [form, setForm] = useState(initialForm);
    const [formValid, setFormValid] = useState(false);
    const [secilenMalzemeler, setSecilenMalzemeler] = useState([]);
    const [totalFiyat, setTotalFiyat] = useState(85.5);
    const [secim, setSecim] = useState(1);

    useEffect(() => {
        const malzemeBedeli = secilenMalzemeler.reduce((total, material) => total + malzemeBedeli[material], 0);
        const sizePrice = sizePrices[form.size] || 0;

    }, [secilenMalzemeler, form.size]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedMalzeme = secilenMalzemeler
    
        if (type === 'checkbox') {
            if (checked) {
                updatedMalzeme = [...secilenMalzemeler, value];
            } else {
                updatedMalzeme = secilenMalzemeler.filter((material) => material !== value);
            }
        } else if (type === 'radio' && checked) {
            setForm({
                ...form,
                [name]: value,
            });
            validateForm({ ...form, [name]: value });
            return;
        }
    }

    const updateForm = (name, value) => {
        setForm({ ...form, [name]: value });
        setSecilenMalzemeler(updatedMalzeme);
        validateForm({ ...form, [name]: value });
    };

    const validateForm = (formData) => {
        const isNameValid = formData.fullName.length >= 3;
        const isMaterialValid = formData.material.length >= 4 && formData.material.length <= 10;
        const isSizeSelected = formData.size !== "";
        const isThicknessSelected = formData.thickness!== "";

        setFormValid(isNameValid && isMaterialValid && isSizeSelected && isThicknessSelected);
    }
    const history = useHistory();
    const handleSubmit = (event) => {
      event.preventDefault();
      const formDataWithTotalFiyat = {
        ...form,
        totalFiyat: totalFiyat,
        secim: secim,
      };
      return !formValid
        ? (disabled = { handleSubmit })
        : axios
            .post('https://reqres.in/api/pizza', formDataWithTotalFiyat)
            .then((response) => {
              console.log('API Response:', response.data);
  
              history.push('/success', { responseData: response.data });
            })
            .catch((error) => {
              console.error('API Request Error:', error);
            });
    };

    const handlePriceEk = (event) => {
        setSecim(secim + 1);
      };
      const handlePriceEksi = (event) => {
        if (secim > 1) {
            setSecim(secim - 1);
        }
    };


    return (
        <>
        <header>
            <Head />
        </header>
        <section className='dinamik'>
        <OrderTop />
        </section>
        <div className="orderContainer">
        <Form onSubmit={handleSubmit} disabled={!formValid}>
          <section className="hamur">
            <FormGroup tag="fieldset">
              <legend>
                Boyut Seç<FormText color="danger">*</FormText>
              </legend>
              <FormGroup check>
                <Label check>
                  <Input
                    id="size-small"
                    data-cy="size-small"
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value="kucuk"
                    checked={form.size == 'kucuk'}
                  />{' '}
                  Küçük
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="size-medium"
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value="orta"
                    checked={form.size == 'orta'}
                  />{' '}
                  Orta
                  <span style={{ color: 'rgba(255, 0, 0, 0.5)' }}>(+10 ₺)</span>
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="size-large"
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value="buyuk"
                    checked={form.size == 'buyuk'}
                  />{' '}
                  Büyük
                  <span style={{ color: 'rgba(255, 0, 0, 0.5)' }}>(+20 ₺)</span>
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <legend htmlFor="thickness">
                Hamur Seç<FormText color="danger">*</FormText>
              </legend>
              <Input
                id="thickness"
                data-cy="thickness"
                name="thickness"
                type="select"
                onChange={handleChange}
              >
                <option>Hamur Kalınlığı</option>
                <option>Ince</option>
                <option>Orta</option>
                <option>Kalın</option>
              </Input>
            </FormGroup>
          </section>

          <section className="materials">
            <FormGroup check>
              <legend>Ek Malzemeler</legend>
              <FormText color="danger">
                En az 4, en fazla 10 malzeme seçimi yapmalısınız.(+5 ₺)
              </FormText>
              <div className="checkbox-container">
                {malzemeSecenekleri.map((material, index) => (
                  <div className="checkbox-row" key={index}>
                    <Label for={`material${index + 1}`} check>
                      <Input
                        id={`material${index + 1}`}
                        data-cy={`material-checkbox-${material}`}
                        type="checkbox"
                        name="material"
                        value={material}
                        onChange={handleChange}
                      />{' '}
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
            </FormGroup>
          </section>
          <FormGroup>
            <Label for="fullName">Adınız Soyadınız:</Label>
            <Input
              id="fullName"
              name="fullName"
              data-cy="fullName"
              placeholder=""
              type="text"
              onChange={handleChange}
              invalid={form.fullName.length > 0 && form.fullName.length < 3}
            />
            <FormFeedback>En az 3 karakter girilmelidir.</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="text">Sipariş Notunuz:</Label>
            <Input
              id="text"
              data-cy="textarea"
              name="text"
              placeholder= "Siparişiniz ile ilgili notu bu alana yazabilirsiniz.."
              type="textarea"
              onChange={handleChange}
            />
          </FormGroup>
          <hr></hr>

          <footer className="formCard">
            <section className="piecesBtn">
              <Button type="button" color="warning" onClick={handlePriceEksi}>
                -
              </Button>
              <span style={{ margin: '0 10px' }}>{secim}</span>
              <Button type="button" color="warning" onClick={handlePriceEk}>
                +
              </Button>
            </section>
            <section>
              <Card style={{ width: '18rem' }}>
                <CardTitle tag="h5">Sipariş Toplamı</CardTitle>
                <CardBody>
                  <CardText>Seçimler: {totalFiyat - 85.5} ₺</CardText>
                  <CardText>
                    <span style={{ color: '#CE2829' }}>
                      Toplam: {totalFiyat} ₺ x{secim}
                    </span>
                  </CardText>
                </CardBody>
                <Button color="warning" type="submit" disabled={!formValid}>
                  Sipariş Ver
                </Button>
              </Card>
            </section>
          </footer>
        </Form>
      </div>
    </>
  );
}