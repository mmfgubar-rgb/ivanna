import { FormEvent, ReactNode, useEffect, useState } from "react"

type Service = {
  title: string
  path: string
  image: string
  detail: string
  kicker: string
  intro: string
  text: string
  facts: string[]
}

const nav = [
  ["О компании", "/o-kompanii/"],
  ["Услуги", "/uslugi/"],
  ["Отзывы", "/otzyvy-o-nas/"],
  ["Статьи", "/category/stati/"],
  ["Контакты", "/kontakty/"],
]

const services: Service[] = [
  {
    title: "Эмалировка ванн",
    path: "/uslugi/emalirovka-vann/",
    image: "/ivanna/images/service-enamel.png",
    detail: "/ivanna/images/detail-enamel.jpg",
    kicker: "Проверенный способ",
    intro:
      "Эмалировка ванн от «Ivanna.by». Покрытие жидким акрилом продлевает срок службы ванны ещё на 10–15 лет.",
    text: "Восстановление покрытия ванн, раковин и душевых поддонов без демонтажа ванны и плитки.",
    facts: [
      "Работа занимает 2–3 часа",
      "Готовность через 36 часов",
      "Акрил без запаха",
      "Гарантия 2 года",
    ],
  },
  {
    title: "Наливная ванна",
    path: "/uslugi/nalivnaia-vanna/",
    image: "/ivanna/images/service-pour.png",
    detail: "/ivanna/images/detail-pour.jpg",
    kicker: "Абсолютная гладкость",
    intro:
      "Наливная ванна — современный способ реставрации металлических и чугунных ванн, раковин и душевых поддонов.",
    text: "Восстановление эмалированной поверхности методом налива — быстро, экологично и долговечно.",
    facts: [
      "Работа за 2–2,5 часа",
      "Готовность через 24 часа",
      "Срок службы до 15 лет",
      "Гладкое покрытие",
    ],
  },
  {
    title: "Акриловый вкладыш",
    path: "/uslugi/akrilovyi-vkladysh-v-vannu/",
    image: "/ivanna/images/service-liner.png",
    detail: "/ivanna/images/detail-liner.jpg",
    kicker: "Ванна в ванну",
    intro:
      "Вкладыш в ванну — один из самых простых способов вернуть былое великолепие старой ёмкости.",
    text: "Профессиональный подбор и установка готовой акриловой вставки с соблюдением технологии.",
    facts: [
      "Подбор подходящей вставки",
      "Монтаж без подрезки",
      "Использование через сутки",
      "Срок службы от 15 лет",
    ],
  },
]

const articles = [
  [
    "Эмалировка ванны",
    "08.09.2022",
    "/ivanna/images/article-enamel.jpg",
    "/emalirovka-vanny/",
    "Эмалировка — это не только новое покрытие, но и тщательная работа с основой, сколами и трещинами.",
  ],
  [
    "Как удалить плесень и грибок",
    "19.05.2021",
    "/ivanna/images/article-mold.jpg",
    "/kak-udalit-plesen-i-gribok/",
    "Почему в ванной появляется плесень и как правильно действовать.",
  ],
  [
    "Обновляем ванну своими руками",
    "19.05.2021",
    "/ivanna/images/article-clean.jpg",
    "/obnovlyaem-vannu-svoimi-rukami/",
    "Что происходит с эмалью под воздействием воды, чистящих средств и времени.",
  ],
  [
    "Обновить ванну",
    "19.05.2021",
    "/ivanna/images/article-renew.jpg",
    "/obnovit-vannu/",
    "Ремонт и реставрация бытовых ванн качественными сертифицированными материалами.",
  ],
]

const reviews = [
  "Сегодня воспользовались услугой эмалировка ванны. Была впечатлена индивидуальным подходом мастера Ивана. Работа сделана качественно, чувствовалась нацеленность специалиста на результат.",
  "Спасибо Ивану, реставрация ванн — это его дело, сразу видно! Качественно, быстро, всё аккуратно. Рекомендую!",
  "По совету подруги обратилась за реставрацией ванны жидким акрилом. Очень довольны: ванну обновили, как новая. Быстро и аккуратно.",
  "Идеальная работа, идеальный сервис, всё за собой убрал и помыл. Буду советовать родным и близким.",
]

const Icon = ({
  name,
}: {
  name: "arrow" | "check" | "menu" | "close" | "phone" | "mail" | "pin" | "clock" | "quote"
}) => {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-4-2-6-4-8-8l2-2-2-4Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    quote: (
      <path d="M5 9h5v5H5zm9 0h5v5h-5zM10 9c0-3-1-4-3-5m12 5c0-3-1-4-3-5" />
    ),
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Link({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (href.startsWith("/") && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          history.pushState({}, "", href)
          dispatchEvent(new PopStateEvent("popstate"))
          scrollTo({ top: 0, behavior: "smooth" })
          onClick?.()
        }
      }}
    >
      {children}
    </a>
  )
}

const Button = ({
  children,
  onClick,
  type = "button",
  light = false,
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  light?: boolean
  disabled?: boolean
}) => (
  <button
    className={`button ${light ? "button--light" : ""}`}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
)

function Header({ openForm }: { openForm: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="utility">
        <div className="container">
          <span>Минск · ежедневно 9:00–21:00</span>
          <a href="mailto:info@ivanna.by">info@ivanna.by</a>
          <a href="tel:+375447695180">+375 (44) 769-51-80</a>
        </div>
      </div>
      <header>
        <div className="container header">
          <Link href="/" className="logo">
            <i>iv</i>
            <span>
              <b>ivanna</b>
              <em>.by</em>
              <small>реставрация ванн</small>
            </span>
          </Link>
          <nav>
            {nav.map(([t, p]) => (
              <Link key={p} href={p}>
                {t}
              </Link>
            ))}
          </nav>
          <Button onClick={openForm}>Заказать звонок</Button>
          <button
            className="menu"
            aria-label="Меню"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
        {open && (
          <div className="mobile">
            <div className="container">
              {nav.map(([t, p]) => (
                <Link key={p} href={p} onClick={() => setOpen(false)}>
                  {t}
                  <Icon name="arrow" />
                </Link>
              ))}
              <Button
                onClick={() => {
                  setOpen(false)
                  openForm()
                }}
              >
                Заказать звонок
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

const Heading = ({
  over,
  title,
  text,
}: {
  over: string
  title: string
  text?: string
}) => (
  <div className="heading">
    <span>{over}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
)

function ServiceCards() {
  return (
    <div className="services">
      {services.map((s, i) => (
        <Link href={s.path} className="service" key={s.path}>
          <div className={`service__image tone-${i}`}>
            <img src={s.image} alt={s.title} />
          </div>
          <div className="service__body">
            <small>0{i + 1}</small>
            <span>{s.kicker}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <b>
              Подробнее <Icon name="arrow" />
            </b>
          </div>
        </Link>
      ))}
    </div>
  )
}

function Form() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "load" | "done">("idle")
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = "Укажите ваше имя"
    if (phone.replace(/\D/g, "").length < 12)
      next.phone = "Введите номер в формате +375"
    setErrors(next)
    setStatus("idle")
    if (Object.keys(next).length) return
    setStatus("load")
    setTimeout(() => setStatus("done"), 800)
  }
  return (
    <form onSubmit={submit} noValidate>
      <label>
        Имя
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrors({ ...errors, name: "" })
          }}
          placeholder="Как к вам обращаться?"
        />
        {errors.name && <small>{errors.name}</small>}
      </label>
      <label>
        Телефон
        <input
          value={phone}
          inputMode="tel"
          onChange={(e) => {
            setPhone(e.target.value)
            setErrors({ ...errors, phone: "" })
          }}
          placeholder="+375 (__) ___-__-__"
        />
        {errors.phone && <small>{errors.phone}</small>}
      </label>
      <Button type="submit" disabled={status === "load"}>
        {status === "load" ? "Отправляем…" : "Отправить заявку"}
      </Button>
      <p className="note">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>
      {status === "done" && (
        <div className="success">
          <Icon name="check" />
          Заявка принята. Мы перезвоним в течение 30 минут.
        </div>
      )}
    </form>
  )
}

function ContactBand({ openForm }: { openForm: () => void }) {
  return (
    <section className="contact-band">
      <div className="container">
        <div>
          <span>Остались вопросы?</span>
          <h2>Расскажите, какая у вас ванна</h2>
          <p>Подскажем способ реставрации и согласуем удобное время.</p>
        </div>
        <div>
          <a href="tel:+375447695180">+375 (44) 769-51-80</a>
          <Button light onClick={openForm}>
            Заказать звонок
          </Button>
        </div>
      </div>
    </section>
  )
}

function ArticleCards({ all = false }: { all?: boolean }) {
  return (
    <div className={`articles ${all ? "articles--all" : ""}`}>
      {(all ? articles : articles.slice(0, 3)).map((a) => (
        <Link href={a[3]} className="article" key={a[3]}>
          <div>
            <img src={a[2]} alt="" />
            <span>{a[1]}</span>
          </div>
          <h3>{a[0]}</h3>
          <p>{a[4]}</p>
          <b>
            Читать статью <Icon name="arrow" />
          </b>
        </Link>
      ))}
    </div>
  )
}

function Home({ openForm }: { openForm: () => void }) {
  return (
    <main>
      <section className="hero">
        <img src="/ivanna/images/hero.jpg" alt="Белая ванна после реставрации" />
        <div className="hero__shade" />
        <div className="container hero__content">
          <span>Реставрация ванн в Минске</span>
          <h1>
            Новая жизнь
            <br />
            вашей ванны
          </h1>
          <p>
            Работы выполняются без запаха и пыли. Уже через 2 часа у вас новая
            ванна.
          </p>
          <div className="hero__actions">
            <Button onClick={openForm}>Рассчитать реставрацию</Button>
            <Link href="/foto-galereya/" className="button outline">
              Посмотреть работы
            </Link>
          </div>
          <div className="facts">
            <div>
              <b>11</b>
              <small>лет опыта</small>
            </div>
            <div>
              <b>2 ч</b>
              <small>занимает работа</small>
            </div>
            <div>
              <b>2 года</b>
              <small>гарантия</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Heading
            over="Способы обновления"
            title="Выберите подходящий метод"
            text="Три проверенных варианта реставрации без большого ремонта и лишних расходов."
          />
          <ServiceCards />
        </div>
      </section>
      <section className="section about">
        <div className="container split">
          <div className="about__image">
            <img
              src="/ivanna/images/detail-enamel.jpg"
              alt="Процесс реставрации ванны"
            />
            <b>
              Гарантия 2 года<small>на выполненную работу</small>
            </b>
          </div>
          <div>
            <Heading
              over="Покраска ванны"
              title="Работаем на качество, а не на скорость"
            />
            <p className="lead">
              Реставрация ванн — это то, чем мы гордимся. Компания ivanna.by
              больше 10 лет обновляет чугунные, железные и акриловые ванны.
            </p>
            <ul className="checks">
              {[
                "Работа без запаха и пыли",
                "Никакой предоплаты",
                "Сертифицированные материалы",
              ].map((x) => (
                <li key={x}>
                  <Icon name="check" />
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/o-kompanii/" className="more">
              Подробнее о компании <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section process">
        <div className="container">
          <Heading over="До прихода мастера" title="Как подготовить ванную" />
          <div className="steps">
            {[
              [
                "01",
                "Завершите ремонт",
                "Ремонт должен быть закончен или ещё не начинаться.",
              ],
              [
                "02",
                "Проверьте краны",
                "Краны не должны течь, ванна должна быть сухой.",
              ],
              [
                "03",
                "Освободите пространство",
                "Уберите одежду и гигиенические принадлежности.",
              ],
              [
                "04",
                "Подготовьте ветошь",
                "Подойдёт впитывающая наволочка и пара газет.",
              ],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section works">
        <div className="container">
          <Heading over="Наши работы" title="До и после" />
          <div>
            {[1, 2, 3, 4].map((n) => (
              <img key={n} src={`/ivanna/images/work-${n}.jpg`} alt={`Работа ${n}`} />
            ))}
          </div>
        </div>
      </section>
      <section className="section review-section">
        <div className="container">
          <Heading over="Отзывы клиентов" title="Нас рекомендуют близким" />
          <ReviewGrid items={reviews.slice(0, 3)} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Heading over="Полезные материалы" title="Статьи о реставрации" />
          <ArticleCards />
        </div>
      </section>
      <ContactBand openForm={openForm} />
    </main>
  )
}

const ReviewGrid = ({ items }: { items: string[] }) => (
  <div className="reviews">
    {items.map((x, i) => (
      <article key={i}>
        <Icon name="quote" />
        <p>{x}</p>
        <small>Отзыв клиента ivanna.by</small>
      </article>
    ))}
  </div>
)

function PageHero({
  over,
  title,
  text,
  image,
}: {
  over: string
  title: string
  text: string
  image?: string
}) {
  return (
    <section className={`page-hero ${image ? "page-hero--image" : ""}`}>
      {image && <img src={image} alt="" />}
      <div className="container">
        <span>{over}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  )
}

function ServicesPage({ openForm }: { openForm: () => void }) {
  return (
    <main>
      <PageHero
        over="Ivanna.by"
        title="Услуги"
        text="Три бюджетных, стильных и выгодных варианта реставрации вашей ванны."
      />
      <section className="section">
        <div className="container">
          <ServiceCards />
        </div>
      </section>
      <Editorial openForm={openForm} />
      <ContactBand openForm={openForm} />
    </main>
  )
}

function Editorial({ openForm }: { openForm: () => void }) {
  return (
    <section className="section editorial">
      <div className="container split">
        <div>
          <Heading
            over="Рациональное решение"
            title="Сэкономим ваши время и деньги"
          />
        </div>
        <div>
          <p className="lead">
            Если ванна потемнела, эмаль стала шершавой, реставрация вернёт
            первоначальный вид за 2–4 часа без больших затрат.
          </p>
          <p>
            При демонтаже можно повредить плитку, коммуникации и дверной проём.
            Обновление покрытия позволяет избежать полноценного ремонта.
          </p>
          <Button onClick={openForm}>Получить консультацию</Button>
        </div>
      </div>
    </section>
  )
}

function ServicePage({
  service,
  openForm,
}: {
  service: Service
  openForm: () => void
}) {
  return (
    <main>
      <PageHero
        over="Услуги · Реставрация ванн"
        title={service.title}
        text={service.intro}
        image={service.detail}
      />
      <section className="section detail">
        <div className="container">
          <aside>
            <span>В этой услуге</span>
            {service.facts.map((x) => (
              <p key={x}>
                <Icon name="check" />
                {x}
              </p>
            ))}
          </aside>
          <article>
            <h2>{service.title} в Минске</h2>
            <p className="lead">{service.text}</p>
            <p>
              Перед началом мастер оценивает состояние поверхности и подбирает
              подходящий способ подготовки и восстановления.
            </p>
            <h3>Что входит в работу</h3>
            <ul>
              <li>Консультация и оценка состояния</li>
              <li>Подготовка и очистка поверхности</li>
              <li>Нанесение покрытия по технологии</li>
              <li>Рекомендации по уходу</li>
            </ul>
            <Button onClick={openForm}>Заказать услугу</Button>
          </article>
        </div>
      </section>
      <section className="section other">
        <div className="container">
          <Heading
            over="Другие способы"
            title="Сравните варианты реставрации"
          />
          <ServiceCards />
        </div>
      </section>
      <ContactBand openForm={openForm} />
    </main>
  )
}

function About({ openForm }: { openForm: () => void }) {
  return (
    <main>
      <PageHero
        over="Ivanna.by"
        title="О компании"
        text="Индивидуальный подход к каждому клиенту и каждой ванне."
        image="/ivanna/images/about.jpg"
      />
      <section className="section editorial">
        <div className="container split">
          <Heading
            over="11 лет опыта"
            title="Знаем, как обновить ванну без лишнего ремонта"
          />
          <div>
            <p className="lead">
              За 11 лет работы в сфере реставрации ванн мы знаем, чего вы
              хотите. Мастер приедет в удобное время и позвонит за час до
              выезда.
            </p>
            <p>
              Работа выполняется без запаха и пыли. Мы используем качественные
              сертифицированные материалы и механическую зачистку.
            </p>
            <Button onClick={openForm}>Оставить заявку</Button>
          </div>
        </div>
      </section>
      <section className="stats">
        <div className="container">
          {[
            ["11", "лет опыта"],
            ["2 часа", "на работу"],
            ["2 года", "гарантия"],
            ["без пыли", "и запаха"],
          ].map((x) => (
            <div key={x[0]}>
              <b>{x[0]}</b>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
      </section>
      <ContactBand openForm={openForm} />
    </main>
  )
}

function Reviews({ openForm }: { openForm: () => void }) {
  return (
    <main>
      <PageHero
        over="Опыт клиентов"
        title="Отзывы о нас"
        text="Отзывы клиентов о реставрации ванн жидким акрилом и работе мастеров ivanna.by."
      />
      <section className="section">
        <div className="container">
          <ReviewGrid items={[...reviews, ...reviews.slice(1)]} />
        </div>
      </section>
      <ContactBand openForm={openForm} />
    </main>
  )
}

function ArticlePage({
  data,
  openForm,
}: {
  data: string[]
  openForm: () => void
}) {
  return (
    <main>
      <section className="article-hero">
        <div className="container">
          <Link href="/category/stati/">← Все статьи</Link>
          <span>{data[1]}</span>
          <h1>{data[0]}</h1>
          <p>{data[4]}</p>
        </div>
      </section>
      <section className="section article-body">
        <div className="container">
          <article>
            <img src={data[2]} alt={data[0]} />
            <p className="lead">{data[4]}</p>
            <p>
              Восстановление начинается с оценки состояния и тщательной
              подготовки поверхности. Важно устранить дефекты основы: от этого
              зависит качество и срок службы нового покрытия.
            </p>
            <h2>Профессиональный подход</h2>
            <p>
              Способ реставрации выбирают с учётом материала, состояния
              заводской эмали, сколов и предыдущих покрытий. Специалист
              подскажет оптимальный вариант.
            </p>
          </article>
          <aside>
            <h3>Нужна консультация?</h3>
            <p>Опишите состояние ванны — подскажем подходящий метод.</p>
            <Button light onClick={openForm}>
              Заказать звонок
            </Button>
          </aside>
        </div>
      </section>
    </main>
  )
}

function Contacts() {
  const rows: [string, string, string, "phone" | "mail" | "pin" | "clock"][] = [
    ["A1 / Viber", "+375 (44) 769-51-80", "tel:+375447695180", "phone"],
    ["Городской", "+375 (17) 355-77-05", "tel:+375173557705", "phone"],
    ["Почта", "info@ivanna.by", "mailto:info@ivanna.by", "mail"],
    ["Адрес", "Минск, ул. Карла Маркса, 42", "#", "pin"],
    ["Режим работы", "Ежедневно, 9:00–21:00", "#", "clock"],
  ]
  return (
    <main>
      <PageHero
        over="Связаться с нами"
        title="Контакты"
        text="Принимаем звонки ежедневно с 9:00 до 21:00."
      />
      <section className="section contacts">
        <div className="container split">
          <div>
            {rows.map((x) => (
              <a href={x[2]} key={x[0]}>
                <i>
                  <Icon name={x[3]} />
                </i>
                <span>
                  <small>{x[0]}</small>
                  <b>{x[1]}</b>
                </span>
              </a>
            ))}
          </div>
          <div className="form-box">
            <h2>Заказать звонок</h2>
            <p>Перезвоним в течение 30 минут.</p>
            <Form />
          </div>
        </div>
      </section>
      <section className="requisites">
        <div className="container">
          <h2>Реквизиты</h2>
          <p>
            Индивидуальный предприниматель Ермаков Иван Васильевич. УНП:
            191672039.
          </p>
          <p>
            р/с BY03UNBS30130892830020001933, ЗАО «БеллСвиссБанк», г. Минск, пр.
            Победителей 23, корп. 3, код 175.
          </p>
        </div>
      </section>
    </main>
  )
}

function Gallery() {
  return (
    <main>
      <PageHero
        over="Портфолио"
        title="Фото галерея"
        text="Примеры работ по реставрации ванн."
      />
      <section className="section">
        <div className="container gallery">
          {[1, 2, 3, 4, 2, 1, 4, 3].map((n, i) => (
            <img
              key={i}
              src={`/ivanna/images/work-${n}.jpg`}
              alt={`Работа ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container footer">
        <div>
          <Link href="/" className="logo">
            <i>iv</i>
            <span>
              <b>ivanna</b>
              <em>.by</em>
              <small>реставрация ванн</small>
            </span>
          </Link>
          <p>
            Обновить ванну и сделать уют и красоту в вашем доме — наша цель.
          </p>
        </div>
        <div>
          <h3>Услуги</h3>
          {services.map((s) => (
            <Link href={s.path} key={s.path}>
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>Компания</h3>
          {nav.map((x) => (
            <Link href={x[1]} key={x[1]}>
              {x[0]}
            </Link>
          ))}
          <Link href="/foto-galereya/">Фото галерея</Link>
        </div>
        <div>
          <h3>Контакты</h3>
          <a href="tel:+375447695180">+375 (44) 769-51-80</a>
          <a href="mailto:info@ivanna.by">info@ivanna.by</a>
          <span>Минск, ул. Карла Маркса, 42</span>
        </div>
      </div>
      <div className="container copyright">
        © ivanna.by · Реставрация ванн в Минске
      </div>
    </footer>
  )
}

function Modal({ close }: { close: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close()
    addEventListener("keydown", esc)
    document.body.classList.add("locked")
    return () => {
      removeEventListener("keydown", esc)
      document.body.classList.remove("locked")
    }
  }, [close])
  return (
    <div
      className="backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal__close" onClick={close}>
          <Icon name="close" />
        </button>
        <span>Обратный звонок</span>
        <h2>Обсудим вашу ванну</h2>
        <p>Оставьте заявку — перезвоним в течение 30 минут.</p>
        <Form />
      </div>
    </div>
  )
}

export default function App() {
  const [path, setPath] = useState(location.pathname)
  const [modal, setModal] = useState(false)
  useEffect(() => {
    const update = () => setPath(location.pathname)
    addEventListener("popstate", update)
    return () => removeEventListener("popstate", update)
  }, [])
  const openForm = () => setModal(true)
  const service = services.find(
    (s) => s.path === path || s.path.replace("/uslugi", "") === path,
  )
  const article = articles.find((a) => a[3] === path)
  let page: ReactNode = <Home openForm={openForm} />
  if (path === "/uslugi/") page = <ServicesPage openForm={openForm} />
  else if (service) page = <ServicePage service={service} openForm={openForm} />
  else if (path.startsWith("/o-kompanii")) page = <About openForm={openForm} />
  else if (path === "/otzyvy-o-nas/") page = <Reviews openForm={openForm} />
  else if (path === "/category/stati/")
    page = (
      <main>
        <PageHero
          over="База знаний"
          title="Статьи о реставрации ванны"
          text="Материалы об уходе, ремонте и обновлении ванной комнаты."
        />
        <section className="section">
          <div className="container">
            <ArticleCards all />
          </div>
        </section>
      </main>
    )
  else if (article) page = <ArticlePage data={article} openForm={openForm} />
  else if (path === "/kontakty/") page = <Contacts />
  else if (path === "/foto-galereya/") page = <Gallery />
  return (
    <>
      <Header openForm={openForm} />
      {page}
      <Footer />
      {modal && <Modal close={() => setModal(false)} />}
    </>
  )
}
