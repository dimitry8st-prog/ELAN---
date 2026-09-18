"use client";

import { FormEvent, useState } from "react";

const services = [
  { name: "Консультация и диагностика", items: [
    { name: "Первичная консультация", price: "2 000 ₽" },
    { name: "Диагностика состояния кожи", price: "включена" },
    { name: "Персональный план ухода", price: "включён" },
  ]},
  { name: "Инъекционные методики", items: [
    { name: "Ботулинотерапия", price: "от 350 ₽ / ед." },
    { name: "Биоревитализация", price: "от 12 000 ₽" },
    { name: "Контурная пластика", price: "после консультации" },
  ]},
  { name: "Аппаратные методики", items: [
    { name: "SMAS-лифтинг", price: "от 28 000 ₽" },
    { name: "Фотоомоложение", price: "после консультации" },
    { name: "Лазерное омоложение", price: "после консультации" },
  ]},
  { name: "Уход за кожей", items: [
    { name: "Чистка лица", price: "от 6 500 ₽" },
    { name: "Пилинг", price: "от 6 500 ₽" },
    { name: "Комплексный уход", price: "от 8 000 ₽" },
  ]},
];

const steps = [
  ["01", "Знакомство", "Обсуждаем ваш запрос, привычный уход и ожидаемый результат."],
  ["02", "Диагностика", "Оцениваем состояние кожи и исключаем противопоказания."],
  ["03", "План", "Объясняем варианты, сроки и стоимость до начала процедур."],
];

const faqs = [
  ["С чего начать?", "С консультации. Она помогает оценить состояние кожи и выбрать только те процедуры, которые действительно нужны."],
  ["Назначат ли процедуру сразу?", "Не обязательно. Сначала специалист уточняет запрос, анамнез и противопоказания, а затем предлагает безопасный план."],
  ["Когда будет понятна итоговая стоимость?", "После консультации, когда определены методика, препарат и необходимый объём. До процедуры стоимость согласуется с вами."],
];

type FormState = "idle" | "sending" | "success" | "error";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formMessage, setFormMessage] = useState("");

  const closeMenu = () => setMenuOpen(false);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          question: data.get("question"),
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Не удалось отправить заявку");
      form.reset();
      setFormState("success");
      setFormMessage("Заявка принята. Мы свяжемся с вами, чтобы уточнить детали.");
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  }

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="ÉLAN — на главную"><span>ÉLAN</span><small>кабинет косметологии</small></a>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}><i/><i/><i/></button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Основная навигация">
          <a href="#about" onClick={closeMenu}>Подход</a><a href="#services" onClick={closeMenu}>Услуги</a><a href="#consultation" onClick={closeMenu}>Консультация</a><a href="#faq" onClick={closeMenu}>Вопросы</a>
        </nav>
        <a className="headerCta" href="#booking">Записаться</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Доказательная косметология</p>
          <h1>Красота, которая <em>остаётся вами</em></h1>
          <p className="heroText">Помогаем коже выглядеть здоровой и ухоженной. Сначала разбираемся в вашем запросе, затем предлагаем понятный план без лишних процедур.</p>
          <div className="heroActions"><a className="button primary" href="#booking">Записаться на консультацию</a><a className="button secondary" href="#services">Посмотреть услуги</a></div>
          <div className="trustRow" aria-label="Принципы работы"><span><b>01</b> Медицинский подход</span><span><b>02</b> Естественный результат</span></div>
        </div>
        <div className="heroVisual"><img src="/hero-production.png" alt="Консультация специалиста по уходу за кожей"/><div className="glassCard"><span>Начинаем с консультации</span><small>Диагностика, рекомендации и понятная стоимость</small></div></div>
      </section>

      <section className="section intro" id="about">
        <div><p className="eyebrow">Наш подход</p><h2>Сначала понять.<br/>Потом действовать.</h2></div>
        <div className="introText"><p>Мы обсуждаем ваши ожидания, оцениваем состояние кожи и объясняем возможные решения. Вы заранее понимаете, зачем нужна процедура, какой результат реалистичен и сколько это стоит.</p><a className="textLink" href="#consultation">Как проходит консультация →</a></div>
      </section>

      <section className="section services" id="services">
        <div className="sectionHead"><div><p className="eyebrow">Услуги и цены</p><h2>Без скрытых условий</h2></div><p>Цены указаны ориентировочно. Точная сумма зависит от выбранной методики, препарата и объёма процедуры.</p></div>
        <div className="servicePanel">
          <div className="serviceTabs" role="tablist" aria-label="Направления услуг">{services.map((service, i) => <button key={service.name} className={activeService === i ? "active" : ""} onClick={() => setActiveService(i)} role="tab" aria-selected={activeService === i}><span>0{i+1}</span>{service.name}</button>)}</div>
          <div className="serviceContent" role="tabpanel"><p>Направление</p><h3>{services[activeService].name}</h3><ul>{services[activeService].items.map((item) => <li key={item.name}><span>{item.name}</span><b>{item.price}</b></li>)}</ul><a className="button primary" href="#booking">Обсудить с врачом</a></div>
        </div>
      </section>

      <section className="section consultation" id="consultation">
        <div className="sectionHead"><div><p className="eyebrow">Первая встреча</p><h2>Как проходит консультация</h2></div><p>Решение о процедуре принимается только после разговора и оценки состояния кожи.</p></div>
        <div className="stepGrid">{steps.map(([number, title, description]) => <article className="stepCard" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="principles"><div><p className="eyebrow">Главный принцип</p><h2>Не менять лицо.<br/>Поддерживать здоровье кожи.</h2></div><div><p>Мы выбираем деликатные решения, объясняем ограничения и не обещаем невозможного.</p><a className="button light" href="#booking">Задать вопрос</a></div></section>

      <section className="section faq" id="faq">
        <div><p className="eyebrow">Ответы на вопросы</p><h2>Спокойно объясняем важное</h2></div>
        <div className="faqList">{faqs.map(([question, answer], i) => <article key={question} className={faqOpen === i ? "faqItem active" : "faqItem"}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{question}</span><b>{faqOpen === i ? "−" : "+"}</b></button>{faqOpen === i && <p>{answer}</p>}</article>)}</div>
      </section>

      <section className="booking" id="booking">
        <div><p className="eyebrow">Запись на консультацию</p><h2>Расскажите, что вас беспокоит</h2><p>Оставьте удобный контакт. Мы уточним запрос и согласуем время консультации.</p><div className="bookingNote"><b>Важно</b><span>Окончательное решение о процедуре принимает специалист после консультации и исключения противопоказаний.</span></div></div>
        <form onSubmit={submitRequest} aria-busy={formState === "sending"}>
          <label>Ваше имя<input required name="name" autoComplete="name" maxLength={80} placeholder="Как к вам обращаться"/></label>
          <label>Телефон, email или мессенджер<input required name="contact" maxLength={120} placeholder="Удобный способ связи"/></label>
          <label>Ваш вопрос <span className="optional">необязательно</span><textarea name="question" maxLength={1000} placeholder="Коротко опишите запрос"/></label>
          <label className="honeypot" aria-hidden="true">Сайт<input name="website" tabIndex={-1} autoComplete="off"/></label>
          <label className="consent"><input required type="checkbox"/> <span>Согласен(на) на использование указанных данных только для ответа на моё обращение.</span></label>
          <button className="button primary" type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Отправляем…" : "Отправить заявку"}</button>
          {formMessage && <p className={`formMessage ${formState}`} role="status">{formMessage}</p>}
        </form>
      </section>

      <section className="privacy" id="privacy"><h2>Как используются данные</h2><p>Имя, контакт и текст обращения нужны только для связи по вашей заявке. Эти данные не публикуются и не используются для рекламной рассылки.</p></section>

      <footer><div className="brand footerBrand"><span>ÉLAN</span><small>кабинет косметологии</small></div><div><b>Консультации по предварительной записи</b><a href="#booking">Оставить заявку</a></div><small className="medicalNotice">Имеются противопоказания. Необходима консультация специалиста.</small><small>© 2026 ÉLAN · Информация на сайте не является публичной офертой</small></footer>
    </main>
  );
}
