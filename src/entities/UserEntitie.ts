import ProfileEntitie from './ProfileEntitie';
class UserEntities{
    public userName: string;
    public userMail: string;
    public userPass: string;
    public userProfile: ProfileEntitie;
    public userPhoto: string 

    constructor(User:string, mail:string, pass:string, profile:ProfileEntitie, photo:string){
        this.userName=User;
        this.userMail=mail;
        this.userPass=pass;
        this.userProfile=profile;
        this.userPhoto=photo;

    }
}

export default UserEntities;