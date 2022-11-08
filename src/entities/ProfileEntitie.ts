class ProfileEntitie{
    public profileName: string;
    public profileStatus: number;

    constructor(name:string, status:number){
        this.profileName=name;
        this.profileStatus=status;
    }
}

export default ProfileEntitie;