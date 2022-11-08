import ProfileEntitie from './ProfileEntitie';
class UserEntities{
    public userName: string;
    public userMail: string;
    public userPass: string;
    public userProfile: ProfileEntitie;

    constructor(User:string, mail:string, pass:string, profile:ProfileEntitie){
        this.userName=User;
        this.userMail=mail;
        this.userPass=pass;
        this.userProfile=profile;

    }
}

export default UserEntities;