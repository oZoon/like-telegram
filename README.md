## Содержание

- [о проекте](#about)
- [быстрый старт](#getting_started)
- [демо](#usage)
- [инструменты](#built_using)

## о проекте <a name = "about"></a>

Веб-проект, похожий на приложение Telegram

## быстрый старт <a name = "getting_started"></a>

```
clone https://github.com/oZoon/like-telegram.git
cd like-telegram
npm i
переименовать .env.example в .env
npm run start - для разработки
npm run build - для продакшн

```

## демо <a name="usage"></a>

<a href="http://on-cherry.ru/test-tasks/like-telegram/">ДЕМО</a>

пароли для входа:
```
Александр: "1",
Игорь: "2",
Николай: "3",
Юлия: "4",
Екатерина: "5",
Олег: "6",
Ирина: "7",
Админ: "0",
```

## инструменты <a name = "built_using"></a>

- [React](https://ru.react.js.org/) - React
- [Redux](https://redux.js.org/) - Redux
- [Typescript](https://www.typescriptlang.org/docs/) - Typescript

- адаптив по минималке
- большинство данных захардкожено

сделан следующий функционал:
- сообщение в любой доступный чат
- редактирование совего сообщения
- удаление своего сообщения
- ответ в публичном чате
- ответ в приватном чате
- смена пользователя (клик на никнейм в левом врхнем углу)
- нотификация при неверном пароле