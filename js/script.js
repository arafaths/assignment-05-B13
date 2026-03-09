const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');
const cardContainer = document.getElementById('card-container');
const loadingSpn = document.getElementById('loadingSpn');
const issuesCount = document.getElementById('issues-count');
const cardModal = document.getElementById('card-modal');
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');


// Loading spinner
const loadingSpinner = (data)=> {
  if (data === true) {
    cardContainer.classList.add('hidden');
    loadingSpn.classList.remove('hidden');
  }
  else {
    cardContainer.classList.remove('hidden');
    loadingSpn.classList.add('hidden');
  }
};


// Filter btn toggle
const filterToggle = (id) => {
  // btn reset
  allBtn.classList.add('btn-outline');
  openBtn.classList.add('btn-outline');
  closedBtn.classList.add('btn-outline');

  // selected btn style
  const selectBtn = document.getElementById(id);
  selectBtn.classList.remove('btn-outline');

  // btn filter
  const cards = document.querySelectorAll('#card-container > div')
  loadingSpinner(true);
  cards.forEach(card => {
    const status = card.getAttribute('card-status');
    if (id === 'all-btn') {
      card.classList.remove('hidden');
    }
    else if (id === 'open-btn' && status === 'open'){
      card.classList.remove('hidden');
    }
    else if (id === 'closed-btn' && status === 'closed') {
      card.classList.remove('hidden');
    }
    else {
      card.classList.add('hidden');
    }
    loadingSpinner(false);
  })
  // issus count
  const visibleCards = document.querySelectorAll('#card-container > div:not(.hidden)');
  issuesCount.innerText = visibleCards.length;
  

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
  loadingSpinner(true);
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayCardData(data.data));
};

const displayCardData = (data) => {
  cardContainer.innerHTML = '';
  data.forEach(info => {
    const cardDiv = document.createElement('div'); 
    cardDiv.setAttribute('card-status', info.status);
    cardDiv.innerHTML = `
    <div onclick="showModal(${info.id})" class="flex flex-col h-full shadow-md bg-slate-50 rounded-md border-t-4 ${info.status === 'open' ? `border-green-500`: `border-purple-500`}">
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
          <p class="text-sm text-gray-500">#1 by ${info.author}</p>
          <p class="text-sm text-gray-500">${info.updatedAt.slice(0, 10)}</p>
        </div>
      </div>
    
    `
    cardContainer.appendChild(cardDiv);
    issuesCount.innerText = cardContainer.children.length;
  })
  loadingSpinner(false);
}
lodeCardData();

// Show modal
const showModal = (id) => {
  cardModal.showModal()
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res => res.json())
    .then(data => {displayModal(data.data)});
}
const displayModal = (info) => {
  cardModal.innerHTML = `
  <div class="modal-box">
        <div class="space-y-5">
          <div class="space-y-2">
            <h4 class="text-xl font-bold">${info.title}</h4>
            <div class="text-gray-500 text-xs">
              <span class="px-2 py-0.5 ${info.status === 'open' ? `bg-green-500` : `bg-purple-500`} rounded-full text-xs text-white font-normal">${info.status}</span> • <span>Opened by ${info.author.replace('_', ' ')}</span> • <span>${info.createdAt.slice(0,10)}</span>
            </div>
          </div>
          <div class="">
            ${badgeIconStyle(info.labels)}
          </div>
          <p class="text-gray-500 text-sm">${info.description}</p>
          <div class="flex items-center  p-4 bg-gray-200 rounded-md">
            <div class="flex-1">
              <p class="text-gray-500 text-sm">Assignee:</p>
              <p class="font-semibold">${info.assignee.replace('_', ' ').toUpperCase()}</p>
            </div>
            <div class="flex-1">
              <p class="text-gray-500 text-sm">Priority:</p>
              <p><span class="px-3 py-0.5 ${info.priority === 'high' ? `bg-red-500 ` : info.priority === 'medium' ? `bg-yellow-500 ` : ` bg-gray-500`} rounded-full text-xs text-white font-normal">${info.priority.toUpperCase()}</span></p>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary focus:outline-none">Close</button>
          </form>
        </div>
      </div>
  `
}

// search filter
btnSearch.addEventListener('click', () => {
  const inputValue = inputSearch.value.trim().toLowerCase();
  if (inputValue === '') {
    lodeCardData();
    return;
  }
  loadingSpinner(true);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`).then(res => res.json()).then(data => {
    displayCardData(data.data);
    loadingSpinner(false);
  });
  
})