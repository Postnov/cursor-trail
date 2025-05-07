document.addEventListener('DOMContentLoaded', () => {
    // Настройки эффекта следа
    const trailSettings = {
        color: 'rgba(255, 255, 255, 0.85)', // Цвет следа (более яркий белый)
        thickness: 1,                      // Толщина линии
        maxSegments: 40,                   // Максимальное количество сегментов
        minDistance: 3,                    // Минимальное расстояние между точками
        fadeFactor: 0.95,                   // Фактор затухания (чем ближе к 1, тем медленнее затухание)
        inactivityTimeout: 5000            // Время бездействия (мс) до начала исчезновения следа
    };
    
    // Массив для хранения сегментов следа
    const segments = [];
    
    // Последние координаты курсора
    let lastX = null;
    let lastY = null;
    let isFirstMove = true;
    
    // Таймер для отслеживания бездействия
    let inactivityTimer = null;
    
    // Функция для запуска исчезновения следа при бездействии
    function startFadeOutSequence() {
        // Плавно убираем все сегменты
        if (segments.length > 0) {
            segments.forEach((segment, index) => {
                setTimeout(() => {
                    segment.style.opacity = '0';
                }, index * 50); // Плавное исчезновение с небольшой задержкой для каждого сегмента
            });
            
            // Очищаем массив сегментов после завершения анимации последнего сегмента
            setTimeout(() => {
                segments.forEach(segment => segment.remove());
                segments.length = 0;
            }, segments.length * 50 + 300);
        }
    }
    
    // Функция сброса таймера бездействия
    function resetInactivityTimer() {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
        inactivityTimer = setTimeout(startFadeOutSequence, trailSettings.inactivityTimeout);
    }
    
    // Обновляем позицию линии при движении мыши
    document.addEventListener('mousemove', (e) => {
        // Сбрасываем таймер бездействия при каждом движении мыши
        resetInactivityTimer();
        
        // При первом движении только запоминаем позицию
        if (isFirstMove) {
            lastX = e.clientX;
            lastY = e.clientY;
            isFirstMove = false;
            return;
        }
        
        // Проверяем, что lastX и lastY имеют значения
        if (lastX === null || lastY === null) {
            lastX = e.clientX;
            lastY = e.clientY;
            return;
        }
        
        // Рассчитываем расстояние между предыдущей и текущей позицией
        const distanceX = e.clientX - lastX;
        const distanceY = e.clientY - lastY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Создаем новый сегмент только если курсор достаточно переместился
        if (distance > trailSettings.minDistance) {
            createSegment(lastX, lastY, e.clientX, e.clientY);
            
            // Обновляем последние координаты
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
    
    // Создание сегмента линии между двумя точками
    function createSegment(x1, y1, x2, y2) {
        const segment = document.createElement('div');
        segment.classList.add('trail-segment');
        
        // Вычисляем длину и угол линии
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Устанавливаем размер и положение
        segment.style.width = `${length}px`;
        segment.style.height = `${trailSettings.thickness}px`;
        segment.style.left = `${x1}px`;
        segment.style.top = `${y1}px`;
        segment.style.transform = `rotate(${angle}deg)`;
        segment.style.transformOrigin = '0 0';
        segment.style.backgroundColor = trailSettings.color;
        segment.style.position = 'fixed';
        segment.style.pointerEvents = 'none';
        segment.style.zIndex = '9998';
        segment.style.borderRadius = '0px';
        segment.style.opacity = '1';
        segment.style.transition = 'opacity 0.3s';
        
        document.body.appendChild(segment);
        segments.push(segment);
        
        // Удаляем старые сегменты, если их больше максимального количества
        if (segments.length > trailSettings.maxSegments) {
            const oldestSegment = segments.shift();
            oldestSegment.style.opacity = '0';
            
            // Удаляем элемент из DOM после завершения анимации исчезновения
            setTimeout(() => {
                oldestSegment.remove();
            }, 300);
        }
        
        // Обновляем непрозрачность всех сегментов
        updateSegmentsOpacity();
    }
    
    // Обновление непрозрачности всех сегментов для плавного перехода
    function updateSegmentsOpacity() {
        segments.forEach((seg, index) => {
            const opacity = (index + 1) / segments.length;
            seg.style.opacity = opacity;
        });
    }
    
    // Инициализируем таймер бездействия
    resetInactivityTimer();
}); 