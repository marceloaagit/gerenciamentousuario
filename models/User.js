class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id(){
        return this._id;
    }

    get name() {
        return this._name;
    }
    get gender() {
        return this._gender;
    }
    get birth() {
        return this._birth;
    }
    get country() {
        return this._country;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get photo() {
        return this._photo;
    }
    set photo(value){
        this._photo = value;
    }
    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    loadFromJSON(json){
        for( let name in json) {
            switch(name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
            
                default:
                    this[name] = json[name];
            }
        }
    }

    static getUsersStorage(){
        let users = [];
        if(localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }
        return users;
    }

    getNewID(){

        let userID = parseInt(localStorage.getItem("userID"));

        if(!userID > 0) userID = 0;
        userID++;
        localStorage.setItem("userID", userID);
        return userID;
    }

    save(){
        let users = User.getUsersStorage();

        if(this.id > 0) {
            users.map(user => {
                if(user._id == this.id) {
                    Object.assign(user, this);
                }
                return user;
            });
        } else {
            this._id = this.getNewID();            
            users.push(this);            
        }

        localStorage.setItem('users', JSON.stringify(users));
    }
    
    remove(){
        let users = User.getUsersStorage();
        users.forEach((userData, index) => {
            if(this._id == userData._id) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }


}