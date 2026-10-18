
const tabs = document.querySelectorAll('.serv-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('on'));
    document.querySelectorAll('.serv-panel').forEach(p => p.classList.remove('on'));
    tab.classList.add('on');
    document.getElementById(tab.dataset.tab).classList.add('on');
  });
});