const ContactInfo = () => {
  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="h3-bold">Контактна інформація</div>
      <div>
        <div className="uppercase font-bold">адреса</div>
        <div>
          Україна, Патріотична вулиця, 16, Одеса, Одеська область, 65000
          Показати на мапі (посилання на точку)
        </div>
      </div>
      <div>
        <div className="uppercase font-bold">КЕРІВНИК</div>
        <div>Престецький Роман</div>
      </div>
      <div>
        <div className="uppercase font-bold">ТЕЛЕФОНИ ПІДПРИЄМСТВА</div>
        <div>+380 Показати телефон (вкажемо телефон пізніше)</div>
      </div>
      <div>
        <div className="uppercase font-bold">ІНТЕРНЕТ</div>
        <div>Email: ultratechu0@gmail.com</div>
        <div>Сайт: UltraTech.com.ua (приклад)</div>
      </div>
    </div>
  );
};

export default ContactInfo;
