# Плавный след за курсором

Этот проект реализует эффект плавной линии, следующей за курсором мыши. Линия отрисовывается в реальном времени с помощью JavaScript, создавая элегантный и современный визуальный эффект.

## Демо

Чтобы увидеть эффект в действии, откройте файл `index.html` в вашем браузере.

## Особенности

- **Плавная анимация**: Гладкое и производительное отображение следа за курсором.
- **Настраиваемый след**: Длина и затухание линии могут быть настроены.
- **Постоянный след**: Линия остается видимой там, где прошел курсор.
- **Автоматическое затухание**: След автоматически плавно исчезает после 5 секунд бездействия.
- **Простая интеграция**: Легко добавляется на любую веб-страницу.
- **Минифицированная версия**: Компактный код с сохранением читаемости настроек.

## Использование

Есть два простых способа добавить эффект на свой сайт:

### Способ 1: Подключение отдельного файла

1. **Скопируйте файл**: Скопируйте файл `cursor-trail.js` в ваш проект.
2. **Добавьте на страницу**: Добавьте скрипт в ваш HTML-файл перед закрывающим тегом `</body>`:

```html
<script src="путь/к/cursor-trail.js"></script>
```

3. **Готово!** Эффект будет автоматически активирован при загрузке страницы.

### Способ 2: Встраивание минифицированного кода

Вы также можете встроить код прямо в HTML с сохранением читаемости настроек:

```html
<script>
document.addEventListener("DOMContentLoaded",()=>{
    // Настройки эффекта - удобно редактировать
    const trailSettings = {
        color: "rgba(255, 255, 255, 0.85)",  // Цвет линии
        thickness: 1,                        // Толщина линии
        maxSegments: 40,                     // Максимальное количество сегментов
        minDistance: 3,                      // Минимальное расстояние между точками
        fadeFactor: .95,                     // Фактор затухания
        inactivityTimeout: 5000              // Время бездействия до исчезновения (мс)
    };
    
    // Минифицированный код (не редактировать)
    let s=[],x=null,y=null,f=!0,t=null;function h(){s.length>0&&(s.forEach((e,i)=>{setTimeout(()=>{e.style.opacity="0"},50*i)}),setTimeout(()=>{s.forEach(e=>e.remove()),s.length=0},50*s.length+300))}function r(){t&&clearTimeout(t),t=setTimeout(h,trailSettings.inactivityTimeout)}function c(e,i,n,o){const a=document.createElement("div");a.classList.add("trail-segment");const l=Math.sqrt(Math.pow(n-e,2)+Math.pow(o-i,2)),d=180*Math.atan2(o-i,n-e)/Math.PI;if(a.style.width=`${l}px`,a.style.height=`${trailSettings.thickness}px`,a.style.left=`${e}px`,a.style.top=`${i}px`,a.style.transform=`rotate(${d}deg)`,a.style.transformOrigin="0 0",a.style.backgroundColor=trailSettings.color,a.style.position="fixed",a.style.pointerEvents="none",a.style.zIndex="9998",a.style.borderRadius="0px",a.style.opacity="1",a.style.transition="opacity 0.3s",document.body.appendChild(a),s.push(a),s.length>trailSettings.maxSegments){const e=s.shift();e.style.opacity="0",setTimeout(()=>{e.remove()},300)}s.forEach((e,t)=>{e.style.opacity=(t+1)/s.length})}document.addEventListener("mousemove",e=>{if(r(),f)return x=e.clientX,y=e.clientY,void(f=!1);if(null===x||null===y)return x=e.clientX,void(y=e.clientY);const t=e.clientX-x,i=e.clientY-y,n=Math.sqrt(t*t+i*i);n>trailSettings.minDistance&&(c(x,y,e.clientX,e.clientY),x=e.clientX,y=e.clientY)}),r()});
</script>
```

Этот подход позволяет легко настраивать эффект без необходимости вникать в весь код.

## Настройка

Настройка эффекта производится через объект `trailSettings`:

```javascript
const trailSettings = {
    color: "rgba(255, 255, 255, 0.85)",  // Цвет линии
    thickness: 1,                        // Толщина линии
    maxSegments: 40,                     // Максимальное количество сегментов
    minDistance: 3,                      // Минимальное расстояние между точками
    fadeFactor: .95,                     // Фактор затухания
    inactivityTimeout: 5000              // Время бездействия до исчезновения (мс)
};
```

### Описание параметров:

- `color`: Цвет линии в любом CSS-формате (HEX, RGB, RGBA).
- `thickness`: Толщина линии в пикселях.
- `maxSegments`: Максимальное количество сегментов в линии (влияет на длину следа).
- `minDistance`: Минимальное расстояние в пикселях для создания нового сегмента.
- `fadeFactor`: Фактор затухания для плавного исчезновения (чем ближе к 1, тем медленнее затухание).
- `inactivityTimeout`: Время в миллисекундах, после которого след начнет исчезать при отсутствии движения курсора.

### Примеры настройки:

- **Тонкая короткая линия**: `thickness: 0.5, maxSegments: 20`
- **Длинный след**: `maxSegments: 120`
- **Яркая заметная линия**: `color: "#ff0066", thickness: 2`
- **Быстрое затухание**: `inactivityTimeout: 2000` (2 секунды)
- **Высокая производительность**: `minDistance: 5, maxSegments: 30`

## Как это работает

Эффект следа создается с помощью JavaScript путем:
1. Отслеживания движения курсора мыши
2. Создания HTML-элементов, представляющих сегменты следа
3. Анимации их прозрачности для обеспечения плавного эффекта
4. Удаления старых сегментов для поддержания производительности
5. Обнаружения бездействия для автоматического исчезновения

## Совместимость

Работает во всех современных браузерах. 