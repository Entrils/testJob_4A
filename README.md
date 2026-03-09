# 4A.Консалтинг - тестовое задание от Савельева Андрея

Тестовое задание для 4A.Консалтинг с pixel-perfect версткой экранов тарифов (desktop / 375 / 320), таймером оффера, выбором тарифа, проверкой согласия и анимациями цен.

Демо: https://testtask4a.netlify.app/

## Технологии

- Next.js
- React
- Tailwind
- Redux Toolkit + RTK Query
- GSAP
- Jest + RTL

## Что сделано

- Загрузка тарифов с внешнего сервиса через серверный API-прокси
- Нормализация тарифов и расчет скидки в процентах
- Выделение выбранного тарифа (по умолчанию `is_best`).
- Fixed offer-header с таймером 2:00:
  - больше 30 сек: желтый
  - <= 30 сек: красный + мигание
  - 0 сек: скидочные цены и бейджи скидок исчезают
- Кнопка «Купить» с миганием
- Валидация чекбокса согласия (ошибка подсвечивается красным)
- GSAP-анимация появления страницы и смены цен
- SEO:
  - `metadata` в `app/layout.js`
  - JSON-LD в `app/page.js`

## Оптимизации

- Шрифты через `next/font/google`:
  - `Montserrat` (только нужные веса)
  - `Raleway` только `700` (таймер)
  - `display: "swap"`
- GSAP загружается лениво через `import("gsap")`.
- Включено `optimizePackageImports` для GSAP в `next.config.mjs`.

## Структура

- FSD-подход, код разделен на слайсы (`widgets`, `features`, `entities`, `shared`).

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Тесты (Jest + RTL)

Запуск:

```bash
npm run test
```

Что покрыто:

- `src/features/offer-timer/model/use-offer-timer.test.jsx`
  - обратный отсчет до `00:00`
  - переход в `isExpired`
  - активация `isAlert` на `30` секундах
- `src/features/purchase-consent/model/use-purchase-consent.test.jsx`
  - установка ошибки без галочки
  - сброс ошибки после проставления галочки
- `src/widgets/tariffs-page/ui/purchase-consent.test.jsx`
  - вызов `toggleConsent` при клике
  - красная рамка при `hasError=true`
- `src/widgets/tariffs-page/ui/purchase-action.test.jsx`
  - вызов обработчика покупки
  - рендер сообщения и текста политики

Вывод при успешном прогоне:

```text
PASS src/features/offer-timer/model/use-offer-timer.test.jsx
PASS src/features/purchase-consent/model/use-purchase-consent.test.jsx
PASS src/widgets/tariffs-page/ui/purchase-consent.test.jsx
PASS src/widgets/tariffs-page/ui/purchase-action.test.jsx

Test Suites: 4 passed, 4 total
Tests:       7 passed, 7 total
```
