const slot = document.getElementById('slot');
slot.addEventListener('change', () => {
    slot.style.color = slot.value == "" ? "grey" : "black";
});

const form = document.getElementById('course-form');
const courseList = document.getElementById('course-list');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const courseTitle = document.getElementById('course-title').value.trim().toUpperCase();
    const courseCode = document.getElementById('course-code').value.trim().toUpperCase();
    const roomNumber = document.getElementById('room').value.trim().toUpperCase();
    const slotValue = document.getElementById('slot').value.trim();
    const slotText = document.getElementById('slot').options[document.getElementById('slot').selectedIndex].text.trim();
    if (!courseTitle || !roomNumber || !slotValue) {
        alert('Please fill in all the required fields.');
        return;
    }

    let content = `<span style="font-size: 9 px; font-weight: bold; color: #0a0f3c;">${courseTitle}</span><br>`;
    if (courseCode) {
        content += `<span style="font-size: 9 px; font-weight: bold; color: #0a0f3c;">${courseCode}</span><br>`;
    }
    content += `<span style="font-size: 8.5 px; font-weight: bold; color: #0a0f3c; text-transform: uppercase;">${roomNumber}</span>`;

    const slots = slotValue.includes('-') ? 
        slotValue.split(/[-]/).map(s => s.trim()) : [slotValue];
    
    const cells = document.querySelectorAll('td');
    const matchedCells = [];

    cells.forEach(cell => {
        const cellValue = cell.textContent.trim();
        if (slots.includes(cellValue)) {
            cell.innerHTML = `<span style="font-size: 10 px; font-weight: bold; color: #000; text-transform: uppercase;">${cellValue}</span><br>` + content;
            cell.style.backgroundColor = "#b9fbc0";
            matchedCells.push({cell, cellValue});
        }
    });

    const courseKey = `${courseTitle}_${roomNumber}`;
    const existingItems = document.querySelectorAll('#course-list li');
    let exists = Array.from(existingItems).some(item => item.dataset.courseKey === courseKey);

    if (!exists) {
        const li = document.createElement('li');
        li.dataset.courseKey = courseKey;

        li.innerHTML = `
        <span class="course-item-field">Course: ${courseTitle}</span>
        <span class="course-item-field">Slot: ${slotText}</span>
        <span class="course-item-field">Room: ${roomNumber}</span>
        <button>Remove</button>`;

        li.querySelector('button').addEventListener('click', () => {
            matchedCells.forEach(({cell, cellValue}) => {
                cell.innerHTML = `<td>${cellValue}<td>`;
                cell.style.backgroundColor = "";
            });
            li.remove();
        });
        courseList.appendChild(li);
    }

    form.reset();
})