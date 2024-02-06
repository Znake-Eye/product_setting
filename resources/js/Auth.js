class Auth{
    constructor(){
        try {
            this.User = JSON.parse(sessionStorage.getItem('user'))
            this.Token =`Bearer ${sessionStorage.getItem('access_token')}` 
        } catch (error) {
            console.log(error)
        }
    }
    login(token, user){
        sessionStorage.setItem('access_token',token)
        sessionStorage.setItem('user', JSON.stringify(user))
        this.User = user
        this.Token = `Bearer ${token}` 
    }
    isAdmin(){
        return this.User.role == 'admin' ? true : false
    }
  
}
export default new Auth