const container = document.querySelector('.container');
const adet = document.getElementById('adet');
const ucret = document.getElementById('ucret');
const film_ucret = document.getElementById('film');
const seats = document.querySelectorAll('.seat:not(.reserved-koltuk)');

getFromLocalStorge();
ucret_adet();

container.addEventListener('click',function(e)
{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserve-koltuk')){
        e.target.classList.toggle('selected-koltuk');
        //toggle : varsa siler, yoksa ekler.

        ucret_adet();

        }
});

film_ucret.addEventListener('change',function(e)
{
    
       ucret_adet();
});




function ucret_adet()
{
        let selected_seads = container.querySelectorAll('.seat.selected-koltuk');

        //yaptıklarımızı localde tutmak için: önce yapmamız gereken bütün koltuk numaralarını içeren bir liste array oluşturmaktır.
        const secili_sead_dizisi = [];
        const sead_dizisi = [];

        selected_seads.forEach(function(s){ //secili sead elemanlarını dolaştık.
            secili_sead_dizisi.push(s);
        });

        seats.forEach(function(s){
            sead_dizisi.push(s);
        });

        secili_sead_indexs = secili_sead_dizisi.map(function(s){
            return sead_dizisi.indexOf(s);
        });
        console.log(secili_sead_indexs);

        //yukarda oluşturmus olduğumuz dizileri localde saklamak için :
        saveToLocalStorage(secili_sead_dizisi);


        let secili_seat_sayisi = selected_seads.length;
        adet.innerText = secili_seat_sayisi -1;
        ucret.innerText = (secili_seat_sayisi -1) * film_ucret.value;
}

//localde bilgileri bulduk.
function saveToLocalStorage(i){
    localStorage.setItem('selected_seads', JSON.stringify(i));
    localStorage.setItem('selectedMovieIndex',film_ucret.selectedIndex);
}

//Bilet bilgilerini local storge den aldık.
function getFromLocalStorge(i){
    const selected_seads = JSON.parse(localStorage.getItem('selected_seads'));

    if(selected_seads =! null && selected_seads.length > 0)
    {
        seats.forEach(function(seat,index){
            if(selected_seads.indexOf(index) > -1){
                seat.classList.add('selected_koltuk')
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex =! null)
    {
        film_ucret.selectedIndex = selectedMovieIndex;
    }
}