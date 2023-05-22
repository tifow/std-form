
        class course{
            constructor(courseid,coursename){
                this.courseid = courseid;
                this.coursename = coursename;
            }
        }
        class courseform{
            getcourse(courses){
                let row = `<tr> <td>${courses.courseid}</td><td>${courses.coursename}</td>
                <td><span><i class="fa-solid fa-pen-to-square"></i></span>
                    <span><i class="fa-solid fa-trash-can"></i></span></td> </tr>`;
        
                    document.querySelector('table').innerHTML+=row;
        
            }
            loadform(){
                let coursefile;
                if(localStorage.getItem('courseform')==null){
                    coursefile=[]
                }
                else{
                    coursefile=JSON.parse(localStorage.getItem('courseform' || "[]"));
                    for(let i=0; i<coursefile.length; i++){
                        this.getcourse(coursefile[i]);
                    }
                }
                
            }
            addform(courses){
                let courseform;
                if(localStorage.getItem('courseform')==null){
                    courseform=[];
                    courseform.push(courses);
                    localStorage.setItem('courseform',JSON.stringify(courseform));
                }
                else{
                    courseform=JSON.parse(localStorage.getItem('courseform'));
                    courseform.push(courses);
                    localStorage.setItem('courseform',JSON.stringify(courseform));
        
        
                }
            }
            remove(target){
                target.parentElement.parentElement.parentElement.remove();
                let remove = target.parentElement.parentElement.innerText;
                this.removeformlocalstore(remove);
            }
            
            removeformlocalstore(){
                let clear;
                if(localStorage.getItem('courseform')===null){
                    clear=[]
                }else{
                    clear=JSON.parse(localStorage.getItem('courseform'));
        
                    clear.forEach(function(target){
        
                        clear.pop(target);
                    })
                    localStorage.setItem('courseform',JSON.stringify(clear));
                }
            }
        }
        document.addEventListener('DOMContentLoaded',function(){
                showcourse.loadform();
        })
        let showcourse = new courseform;
        let courseid = document.querySelector('.courseid'),
        coursename = document.querySelector('.coursename');
        
        let btn2=document.querySelector('.btn').addEventListener('click',function(){
            if(courseid.value.length == 0){
                alert('place fill the inputs')
            }
            else{
                let courses = new course(courseid.value,coursename.value);
                showcourse.getcourse(courses);
                showcourse.addform(courses);
            }
        
        })
        document.querySelector('table').addEventListener('click',function(e){
            if(e.target.className == 'fa-solid fa-trash-can'){
                if(confirm('are you sure to delete')){
                    showcourse.remove(e.target);
                }
            }
        })