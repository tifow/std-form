

class form{
    constructor(name,age,number,village){
        this.name = name;
        this.age = age;
        this.number = number;
        this.village = village;
    }
}
class stdform{
    gettable(std){
        let rows = `<tr> <td>${std.name}</td><td>${std.age}</td><td>${std.number}</td><td>${std.village}</td> 
        <td><span><i class="fa-solid fa-pen-to-square"></i></span>
            <span><i class="fa-solid fa-trash-can"></i></span></td></tr>`;

        document.querySelector('.stdform').innerHTML+=rows;

    }
    search(e){
        let text = e.target.value;
        let list = document.querySelector('.stdform').children;
        for(let i=0;i<list.length;i++){
            console.log(list[i].innerText)
            if(list[i].innerText.indexOf(text)==-1){
                list[i].style.display='none';
            }
            else{
                list[i].style.display='block';
            }
        }
    }
    cleare(){
        names.value="";
        age.value="";
        number.value="";
        village.value="";
    }
    editform(target){
        let row = target.parentElement.parentElement.parentElement;
        let td = row.children;
        document.querySelector('.name').value = td[0].textContent;
        document.querySelector('.age').value = td[1].textContent;
        document.querySelector('.number').value = td[2].textContent;
        document.querySelector('.village').value = td[3].textContent;
        document.querySelector('.btn').value='update';
    }
    remove(target){
        target.parentElement.parentElement.parentElement.remove();
        let remove = target.parentElement.parentElement.innerText;
        store.removeformlocalstore(remove);
    }
}
class localstore{
    loadform(){
        let stdforms;
        if(localStorage.getItem('stdforms')==null){
            stdforms=[]
        }
        else{
            stdforms=JSON.parse(localStorage.getItem('stdforms' || "[]"));
            for(let i=0; i<stdforms.length; i++){
                Stdf.gettable(stdforms[i]);
            }
        }
        
    }
    addform(Stdf){
        let stdforms;
        if(localStorage.getItem('stdforms')==null){
            stdforms=[];
            stdforms.push(Stdf);
            localStorage.setItem('stdforms',JSON.stringify(stdforms));
        }
        else{
            stdforms=JSON.parse(localStorage.getItem('stdforms'));
            stdforms.push(Stdf);
            localStorage.setItem('stdforms',JSON.stringify(stdforms));


        }
    }
    removeformlocalstore(){
        let clear;
        if(localStorage.getItem('stdforms')===null){
            clear=[]
        }else{
            clear=JSON.parse(localStorage.getItem('stdforms'));

            clear.forEach(function(target){

                clear.pop(target);
            })
            localStorage.setItem('stdforms',JSON.stringify(clear));
        }
    }
    clearall(){
        localStorage.clear('stdforms');
        location.reload();

    }
}
let store = new localstore;
document.addEventListener('DOMContentLoaded',function(){
    store.loadform();
})
let Stdf = new stdform;
document.querySelector('.search').addEventListener('keyup',Stdf.search);
let names = document.querySelector('.name'),
age = document.querySelector('.age'),
number = document.querySelector('.number'),
village = document.querySelector('.village'),
btn = document.querySelector('.btn').addEventListener('click',function(){
    if(document.querySelector('.btn').value=='save'){
        
        
    if(names.value.length == 0 || age.value.length == 0 || number.value.length == 0 || village.value.length == 0){
        alert('place fill all the input')
    }
    else{
        let std = new form(names.value,age.value,number.value,village.value);
        Stdf.gettable(std);
        store.addform(std);
        Stdf.cleare();
        // location.reload();



    }
    }
})
// bassing the method
document.querySelector('table').addEventListener('click',function(e){
    if(e.target.className == 'fa-solid fa-trash-can'){
        if(confirm('are you sure to delete this')){
            Stdf.remove(e.target);
            // Stdf.removeform(e.text);
        }

    }
    if(e.target.className == 'fa-solid fa-pen-to-square'){
        Stdf.editform(e.target);
    }

})
document.querySelector('.clearall').addEventListener('click',function(){
    if(confirm('are you sure delete all the data')){
        store.clearall()
    }
})

