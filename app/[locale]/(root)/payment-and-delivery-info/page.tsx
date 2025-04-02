const PaymentAndDeliveryInfo = () => {
  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="h2-bold">Доставка і оплата</div>
      {/* Payment info */}
      <div>
        <div className="h3-bold">Оплата</div>
        <div className="space-y-2">
          <div>Варіанти оплати:</div>
          <ul className="list-decimal list-inside">
            <li>
              <span className="font-bold italic underline">Безготівковий</span>
              &nbsp; &mdash; Оплата по банківським реквізитам Приватбанку.
              Рахунок доступний відразу після оформлення замовлення.
            </li>
            <li>
              <span className="font-bold italic underline">Післяплата</span>
              &nbsp; &mdash; Післяплата при отриманні замовлення на поштовому
              відділені &quot;Нова пошта&quot;.
            </li>
          </ul>
          <div>
            Оплата за товар можлива на умовах передплати та при отриманні
            замовлення на поштовому відділенні.
          </div>
        </div>
      </div>
      {/* Delivery info */}
      <div>
        <div className="h3-bold">Доставка</div>
        <div className="space-y-2">
          <div>
            Обробка замовлення протягом 1-2 днів та передається перевізнику
            &quot;Нова пошта&quot;. Термін доставки розраховується перевізником
            в залежності від відстані до пункту призначення і складає 2-4 дні.
          </div>
          <div>Варіанти доставки:</div>
          <ul className="list-decimal list-inside">
            <li>
              <span className="font-bold italic underline">Кур&apos;єр</span>
              &nbsp; &mdash; Адресна доставка кур&apos;єрською служою
              перевізника. Вартість та строк доставки згідно з тарифами та
              умовами перевізника. Уточняйте у продавця.
            </li>
            <li>
              <span className="font-bold italic underline">
                Траспортна компанія
              </span>
              &nbsp; &mdash; Доставка послугами транспортної компанії Нова
              Пошта. Вартість та термін доставки відповідно тарифам перевізника.
            </li>
            <li>
              <span className="font-bold italic underline">Нова Пошта</span>
              &nbsp; &mdash; Відправка товару здійснюється послугами та за
              тарифами поштової компанії &quot;Нова Пошта&quot;.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentAndDeliveryInfo;
