export const createList = (title, className, dataArray) => {
    const ul = document.createElement('ul')
    ul.textContent = title
    ul.classList.add(className)

    dataArray.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        li.style.fontWeight = 'normal'
        ul.append(li)
    })
    
    return ul
}