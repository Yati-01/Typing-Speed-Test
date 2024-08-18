let c = document.querySelector('.content p')
let input = document.getElementById('typespace')
// Define Load_Para function
const loadpara = () => {
    let random_para = Math.floor(Math.random() * paragraph.length);
    paragraph[random_para].split('').forEach(element => {
        let RealData = `<span>${element}</span>`;
        c.innerHTML += RealData;
    });
}
loadpara();
input.addEventListener('input', ()=>{
   let char = c.querySelectorAll('span');
   console.log(char);
})