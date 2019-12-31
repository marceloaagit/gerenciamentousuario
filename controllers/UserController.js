class UserController{

    constructor(formId, tableId) {
        this.formE1 = document.getElementById(formId);
        this.tableE1 = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit() {
        this.formE1.addEventListener("submit", event => {
            event.preventDefault();
            let values = this.getValues();

            this.getPhoto().then(
                content => {
                    values.photo = content;
                    this.addLine(values);
                }, 
            
                e => {
                    console.log(e);
                });

        });
    }

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();
    
            let elements = [...this.formE1.elements].filter(item => {
                if(item.name === "photo"){
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            };
    
            fileReader.readAsDataURL(file);

        });

        

    }

    getValues() {

        let user = {};

        [...this.formE1.elements].forEach(field => { 
            if(field.name == 'gender'){
                if(field.checked)
                    user[field.name] = field.value;
            } else {
                user[field.name] = field.value;
            }
        });
    
       return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    
    }

    addLine(dataUser) {

        this.tableE1.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`;
    }

    
}