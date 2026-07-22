"use client";

import { useState } from "react";

const services = [
  { name: "Инъекционная косметология", items: ["Ботулинотерапия", "Контурная пластика", "Биоревитализация"] },
  { name: "Аппаратная косметология", items: ["SMAS-лифтинг", "Фотоомоложение", "Лазерное омоложение"] },
  { name: "Уход за кожей", items: ["Чистка лица", "Пилинги", "Персональный уход"] },
];

const prices = [
  ["Консультация врача-косметолога", "2 000 ₽"],
  ["Ботулинотерапия", "от 350 ₽ / ед."],
  ["Биоревитализация", "от 12 000 ₽"],
  ["SMAS-лифтинг", "от 28 000 ₽"],
];

const specialists = [
  { initials: "АС", name: "Анна Сергеевна", role: "Врач-косметолог, дерматолог", exp: "Стаж 12 лет" },
  { initials: "МВ", name: "Мария Викторовна", role: "Врач-косметолог", exp: "Стаж 9 лет" },
  { initials: "ЕК", name: "Елена Константиновна", role: "Специалист по аппаратным методикам", exp: "Стаж 8 лет" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="ÉLAN — на главную">
          <span>ÉLAN</span><small>кабинет косметологии</small>
        </a>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Открыть меню">
          <i/><i/><i/>
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Основная навигация">
          <a href="#services" onClick={closeMenu}>Услуги</a>
          <a href="#specialists" onClick={closeMenu}>Специалисты</a>
          <a href="#prices" onClick={closeMenu}>Цены</a>
          <a href="#offers" onClick={closeMenu}>Акции</a>
          <a href="#about" onClick={closeMenu}>О нас</a>
          <a href="#contacts" onClick={closeMenu}>Контакты</a>
        </nav>
        <a className="headerCta" href="#booking">Записаться</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Доказательная косметология · Москва</p>
          <h1>Красота, которая <em>остаётся вами</em></h1>
          <p className="heroText">Персональный план процедур — бережно, честно и с естественным результатом.</p>
          <div className="heroActions">
            <a className="button primary" href="#booking">Записаться на консультацию</a>
            <a className="button secondary" href="#services">Смотреть услуги</a>
          </div>
          <div className="trustRow">
            <span><b>8+</b> лет опыта врачей</span>
            <span><b>100%</b> сертифицированные препараты</span>
          </div>
        </div>
        <div className="heroVisual">
          <img src="/hero-production.png" alt="Консультация врача-косметолога в кабинете ÉLAN" />
          <div className="glassCard"><span>Индивидуальный подход</span><small>Диагностика, план и сопровождение</small></div>
        </div>
      </section>

      <section className="section intro" id="about">
        <div><p className="eyebrow">О кабинете</p><h2>Научный подход.<br/>Деликатный результат.</h2></div>
        <div className="introText"><p>Мы не меняем внешность — мы помогаем коже выглядеть здоровой и ухоженной. Каждое назначение объясняем, а план процедур составляем без лишнего.</p><a className="textLink" href="#specialists">Познакомиться с командой →</a></div>
      </section>

      <section className="section services" id="services">
        <div className="sectionHead"><div><p className="eyebrow">Услуги</p><h2>Забота, подобранная для вас</h2></div><p>Выберите направление, чтобы посмотреть процедуры и ориентировочную стоимость.</p></div>
        <div className="servicePanel">
          <div className="serviceTabs" role="tablist">
            {services.map((service, i) => <button key={service.name} className={activeService === i ? "active" : ""} onClick={() => setActiveService(i)} role="tab" aria-selected={activeService === i}><span>0{i+1}</span>{service.name}</button>)}
          </div>
          <div className="serviceContent" role="tabpanel">
            <p>Направление</p><h3>{services[activeService].name}</h3>
            <ul>{services[activeService].items.map((item, i) => <li key={item}><span>{item}</span><b>{i === 0 ? "от 8 000 ₽" : i === 1 ? "от 12 000 ₽" : "от 6 500 ₽"}</b></li>)}</ul>
            <a className="button primary" href="#booking">Подобрать процедуру</a>
          </div>
        </div>
      </section>

      <section className="section specialists" id="specialists">
        <div className="sectionHead"><div><p className="eyebrow">Специалисты</p><h2>В надёжных руках</h2></div><p>Врачи с медицинским образованием, регулярным повышением квалификации и бережным отношением.</p></div>
        <div className="doctorGrid">{specialists.map((doctor, i) => <article className="doctorCard" key={doctor.name}><div className={`doctorPhoto tone${i+1}`}><span>{doctor.initials}</span></div><p>{doctor.exp}</p><h3>{doctor.name}</h3><span>{doctor.role}</span><a href="#booking" aria-label={`Записаться к специалисту ${doctor.name}`}>Записаться →</a></article>)}</div>
      </section>

      <section className="section priceSection" id="prices">
        <div className="sectionHead"><div><p className="eyebrow">Прайс-лист</p><h2>Понятные цены</h2></div><p>Финальная стоимость определяется после консультации и зависит от выбранного препарата и объёма процедуры.</p></div>
        <div className="priceList">{prices.map(([name, price], i) => <div className="priceRow" key={name}><span className="priceNum">0{i+1}</span><strong>{name}</strong><b>{price}</b></div>)}</div>
        <a className="textLink" href="#booking">Получить полный прайс →</a>
      </section>

      <section className="section offer" id="offers">
        <div className="offerCopy"><p className="eyebrow">Предложение месяца</p><h2>Диагностика кожи в подарок</h2><p>При записи на первичную консультацию до 31 августа. Врач оценит состояние кожи и составит персональную карту ухода.</p><a className="button light" href="#booking">Воспользоваться акцией</a></div>
        <div className="offerBadge"><span>−20%</span><small>на комплексный уход</small></div>
      </section>

      <section className="section gallery" id="gallery">
        <div className="sectionHead"><div><p className="eyebrow">Фотогалерея</p><h2>Пространство заботы</h2></div><p>Светлый кабинет, современное оборудование и спокойная атмосфера для комфортных процедур.</p></div>
        <div className="galleryGrid"><figure className="galleryMain"><img src="/hero-production.png" alt="Светлый кабинет косметологии"/></figure><figure className="galleryCrop cropOne"><img src="/hero-production.png" alt="Консультация косметолога"/></figure><figure className="galleryCrop cropTwo"><img src="/hero-production.png" alt="Врач косметолог"/></figure></div>
      </section>

      <section className="section blog" id="blog">
        <div className="sectionHead"><div><p className="eyebrow">Блог врача</p><h2>О коже — понятно</h2></div><p>Разбираем процедуры, домашний уход и частые вопросы без мифов и сложных терминов.</p></div>
        <div className="blogGrid"><article><span>Уход · 6 минут</span><h3>Как понять, что коже не хватает увлажнения</h3><p>Пять признаков, которые легко заметить дома, и когда стоит обратиться к специалисту.</p><a href="#booking">Читать статью →</a></article><article><span>Процедуры · 8 минут</span><h3>Ботулинотерапия: естественный результат без эффекта маски</h3><p>Как работает методика, кому она подходит и почему важна правильная дозировка.</p><a href="#booking">Читать статью →</a></article><article><span>Экспертное мнение · 5 минут</span><h3>С чего начать знакомство с косметологией</h3><p>Почему первым шагом должна быть диагностика, а не случайно выбранная процедура.</p><a href="#booking">Читать статью →</a></article></div>
      </section>

      <section className="section faq" id="faq">
        <div><p className="eyebrow">Ответы на вопросы</p><h2>Спокойно объясняем важное</h2></div>
        <div className="faqList">
          {["Как подготовиться к первой консультации?", "Можно ли сочетать разные процедуры?", "Когда будет заметен результат?"].map((q, i) => <article key={q} className={faqOpen === i ? "faqItem active" : "faqItem"}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{q}</span><b>{faqOpen === i ? "−" : "+"}</b></button>{faqOpen === i && <p>{i === 0 ? "За сутки не используйте агрессивные пилинги и возьмите список домашнего ухода. Приходить без макияжа необязательно." : i === 1 ? "Да, если методики совместимы. Безопасную последовательность и интервалы определит врач после осмотра." : "Срок зависит от методики: уходовые процедуры дают эффект сразу, аппаратные и инъекционные раскрываются постепенно."}</p>}</article>)}
        </div>
      </section>

      <section className="booking" id="booking">
        <div><p className="eyebrow">Запись на приём</p><h2>Начните с консультации</h2><p>Оставьте контакты — администратор свяжется с вами, ответит на вопросы и подберёт удобное время.</p><div className="contactLinks"><a href="tel:+74951234567">+7 (495) 123-45-67</a><a href="mailto:hello@elan-clinic.ru">hello@elan-clinic.ru</a></div></div>
        <form onSubmit={(e) => {e.preventDefault(); alert("Спасибо! Мы свяжемся с вами в ближайшее время.");}}><label>Ваше имя<input required name="name" placeholder="Анна"/></label><label>Телефон<input required name="phone" type="tel" placeholder="+7 (___) ___-__-__"/></label><label className="consent"><input required type="checkbox"/> <span>Согласен(на) на обработку персональных данных</span></label><button className="button primary" type="submit">Отправить заявку</button></form>
      </section>

      <footer id="contacts"><div className="brand footerBrand"><span>ÉLAN</span><small>кабинет косметологии</small></div><div><b>Москва, ул. Примерная, 12</b><span>Ежедневно 09:00–21:00</span></div><div className="messengers"><a href="#booking">WhatsApp</a><a href="#booking">Telegram</a></div><small>© 2026 ÉLAN · Информация на сайте не является публичной офертой</small></footer>
    </main>
  );
}
