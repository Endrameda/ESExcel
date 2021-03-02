import {$} from '@core/dom';

export function resizeHandler($root, event) {
    // Получаем элемент где была событие mousedown
    const $resizer = $(event.target)
    // Получем его родителя с атрибутом [data-type="resizable"]
    const $parent = $resizer.closest('[data-type="resizable"]')
    // Получаем его координаты через метод getBoundingClientRect()
    const coords = $parent.getCoords()
    // Ищем внутри $root все элементы с атрибутом
    // [data-col=""] значения этого атрибута генерируется динамически
    // чтобы можно было менять ширину всех колонок в столбце
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    // Здесь мы определяем мы хотим изменять колонку или же строку
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    const minColWidth = 40
    const minRowHeight = 20
    let value
    let delta

    $resizer.css({
        opacity: 1,
        [sideProp]: '-2000px',
    })

    document.onmousemove = ev => {
        if (type === 'col') {
            delta = ev.pageX - coords.right
            value = coords.width + delta
            const checkDelta = delta < -coords.width ? coords.width : -delta
            $resizer.css({
                right: [checkDelta] + 'px',
            })
        } else {
            delta = ev.pageY - coords.bottom
            value = coords.height + delta
            const checkDelta = delta < -coords.height ? coords.height : -delta
            $resizer.css({
                bottom: [checkDelta] + 'px',
            })
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            const checkDeltaPos = delta < -coords.width ? minColWidth : value
            $parent.css({width: [checkDeltaPos] + 'px'})
            cells.forEach(el => el.style.width = [checkDeltaPos] + 'px')
        } else {
            const checkDeltaPos = delta < -coords.height ? minRowHeight : value
            $parent.css({height: [checkDeltaPos] + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: '0',
            right: '0',
        })
    }
}
