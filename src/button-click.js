export default function buttonClick(item) {
    const heading = document.getElementById('app-heading').querySelector('h1');
    heading.textContent = item.textContent;
}