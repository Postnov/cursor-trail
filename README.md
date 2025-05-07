# Плавный след за курсором на Canvas

Этот проект реализует эффект плавной линии, следующей за курсором мыши, с использованием HTML Canvas. Линия отрисовывается в реальном времени, создавая элегантный и современный визуальный эффект.

## Демо

Чтобы увидеть эффект в действии, откройте файл `index.html` в вашем браузере.

## Особенности

-   **Плавная анимация**: Использование Canvas API и `requestAnimationFrame` обеспечивает гладкое и производительное отображение.
-   **Настраиваемый хвост**: Длина и затухание "хвоста" линии могут быть настроены.
-   **Постоянный след**: Возможность оставлять постоянный след там, где проходил курсор, который исчезает только при продолжении движения.
-   **Адаптивность**: Учитывает `devicePixelRatio` для четкого отображения на Retina-дисплеях и экранах с высоким DPI.
-   **Простая интеграция**: Легко добавляется на любую веб-страницу.

## Использование

Есть два простых способа добавить эффект на свой сайт:

### Способ 1: Подключение отдельного файла

1.  **Скопируйте файл**: Скопируйте файл `cursor-trail.js` в ваш проект.
2.  **Добавьте на страницу**: Добавьте скрипт в ваш HTML-файл перед закрывающим тегом `</body>`:

    ```html
    <script src="путь/к/cursor-trail.js"></script>
    ```

3.  **Готово!** Эффект будет автоматически активирован при загрузке страницы.

### Способ 2: Встраивание скрипта напрямую

Вы также можете просто вставить код прямо в HTML без необходимости отдельного файла:

```html
<script>
document.addEventListener("DOMContentLoaded", () => { let t = { 
    color: "red", // цвет линии
    thickness: 1, // толщина линии
    maxSegments: 40, // максимальное количество сегментов
    minDistance: 3, // минимальное расстояние между точками
    fadeFactor: .95 // фактор затухания (чем ближе к 1, тем медленнее затухание)
}, e = [], n = null, l = null, i = !0; function s(n, l, i, s) { let a = document.createElement("div"); if (a.classList.add("trail-segment"), a.style.width = `${Math.sqrt(Math.pow(i - n, 2) + Math.pow(s - l, 2))}px`, a.style.height = `${t.thickness}px`, a.style.left = `${n}px`, a.style.top = `${l}px`, a.style.transform = `rotate(${180 * Math.atan2(s - l, i - n) / Math.PI}deg)`, a.style.transformOrigin = "0 0", a.style.backgroundColor = t.color, a.style.position = "fixed", a.style.pointerEvents = "none", a.style.zIndex = "9998", a.style.borderRadius = "0px", a.style.opacity = "1", a.style.transition = "opacity 0.3s", document.body.appendChild(a), e.push(a), e.length > t.maxSegments) { let r = e.shift(); r.style.opacity = "0", setTimeout(() => { r.remove() }, 300) } o() } function o() { e.forEach((t, n) => { let l = (n + 1) / e.length; t.style.opacity = l }) } document.addEventListener("mousemove", e => { if (i) { n = e.clientX, l = e.clientY, i = !1; return } if (null === n || null === l) { n = e.clientX, l = e.clientY; return } let o = e.clientX - n, a = e.clientY - l, r = Math.sqrt(o * o + a * a); r > t.minDistance && (s(n, l, e.clientX, e.clientY), n = e.clientX, l = e.clientY) }) });
</script>
```

Этот минифицированный код можно просто скопировать и вставить в ваш HTML, и эффект сразу начнет работать!

## Настройка

Параметры эффекта можно настроить через объект настроек в начале кода:

```javascript
// В отдельном файле cursor-trail.js
document.addEventListener('DOMContentLoaded', () => {
    // Настройки эффекта следа
    const trailSettings = {
        color: 'rgba(255, 255, 255, 0.85)', // Цвет линии (RGBA)
        thickness: 0.8,                     // Толщина линии в пикселях
        maxPoints: 300,                     // Максимальное количество точек в линии
        minDistance: 1,                     // Минимальное расстояние между точками
        trailPixelLength: 60,               // Длина "хвоста" в пикселях, который активно затухает
        minOpacity: 0.3                     // Минимальная непрозрачность постоянной части
    };
    // ... остальной код
});

// Или в случае встроенного кода:
let t = { 
    color: "red",          // цвет линии
    thickness: 1,          // толщина линии 
    maxSegments: 40,       // максимальное количество сегментов
    minDistance: 3,        // минимальное расстояние между точками
    fadeFactor: .95        // фактор затухания (чем ближе к 1, тем медленнее затухание)
};
```

### Описание параметров:

-   `color`: Цвет линии (CSS-цвет, включая HEX, RGB, RGBA).
-   `thickness`: Толщина линии в пикселях.
-   `maxPoints`/`maxSegments`: Максимальное количество точек/сегментов в линии (влияет на длину следа).
-   `minDistance`: Минимальное расстояние между точками для добавления нового сегмента.
-   `trailPixelLength`: Длина активного "хвоста" в пикселях (для canvas версии).
-   `minOpacity`/`fadeFactor`: Параметры, влияющие на скорость затухания линии.

## Структура проекта

-   `cursor-trail.js`: Основной JavaScript-файл с логикой эффекта.
-   `index.html`: Пример HTML-страницы для демонстрации (опционально).

## Совместимость

Работает во всех современных браузерах. Версия с Canvas требует поддержки HTML Canvas и ES6 JavaScript, версия с div-элементами работает практически везде. 