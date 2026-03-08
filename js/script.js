const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');

// Filter btn toggle
const filterToggle = (id) => {
  // btn reset
  allBtn.classList.add('btn-outline');
  openBtn.classList.add('btn-outline');
  closedBtn.classList.add('btn-outline');

  // selected btn style
  const selectBtn = document.getElementById(id);
  selectBtn.classList.remove('btn-outline');
}

// Card Badge style
const badgeIconStyle = (labels) => {
  const label = labels.map(el => {
    let icon = '';
    let className = '';

    if (el === 'bug') {
      icon += `<i class="fa-solid fa-bug"></i>`;
      className += `text-red-500 bg-red-100 border-red-200`;
    }
    else if (el === 'help wanted') {
      icon += `<i class="fa-regular fa-life-ring"></i>`;
      className += `text-yellow-500 bg-yellow-100 border-yellow-200`;
    }
    else if (el === 'enhancement') {
      icon += `<i class="fa-solid fa-rocket"></i>`;
      className += `text-blue-500 bg-blue-100 border-blue-200`;
    }
    else if (el === 'documentation') {
      icon += `<i class="fa-solid fa-book"></i>`;
      className += `text-purple-500 bg-purple-100 border-purple-200`;
    }
    else {
      icon += `<i class="fa-solid fa-seedling"></i>`;
      className += `text-green-500 bg-green-100 border-green-200`;
    }
    return `
    <div class="badge p-2 font-medium rounded-full border-3 ${className}">${icon} ${el.toUpperCase()}</div>
    `;
  }).join('');
  return label;
}

// Card data
const lodeCardData = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayCardData(data.data));
};

const displayCardData = (data) => {
  const cardContainer = document.getElementById('card-container');
  data.forEach(info => {
    const cardDiv = document.createElement('div'); 
    cardDiv.innerHTML = `
    <div class="flex flex-col h-full shadow-md bg-slate-50 rounded-md border-t-4 ${info.status === 'open' ? `border-green-500`: `border-purple-500`}">
        <div class="flex-1 p-3 space-y-4">
          <div class="flex justify-between">
            <img src="${info.status === 'open' ? `./assets/Open-Status.png` : `./assets/Closed- Status .png`}" alt="">
            <div class="badge py-1 px-5 font-medium ${info.priority === 'high' ? `text-red-500 bg-red-100 ` : info.priority === 'medium' ? `text-yellow-500 bg-yellow-100 ` : `text-gray-500 bg-gray-200`} rounded-full">${info.priority.toUpperCase()}</div>
          </div>
          <h3 class="text-lg font-semibold">${info.title}</h3>
          <p class="line-clamp-2 text-sm text-gray-500">${info.description}
          </p>
          <div class="flex flex-col gap-1">
            ${badgeIconStyle(info.labels)}
          </div>
        </div>
        <hr class="border-gray-300 border-1 ">
        <div class="p-3 space-y-3">
          <p class="text-sm text-gray-500">${info.createdAt}</p>
          <p class="text-sm text-gray-500">${info.updatedAt}</p>
        </div>
      </div>
    
    `
    cardContainer.appendChild(cardDiv);
  })
}

lodeCardData();