import { Injectable } from "@angular/core";
import {HttpClient, HttpSentEvent} from "@angular/common/http";
import {AuthData} from "./auth-data.model"
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class AuthService{
  private token:string;
  private isAuthenticated=false;
  private authStatusListener=new Subject<boolean>()
 private tokenTimer:any;

   constructor(private https:HttpClient, private router:Router){

  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

 createUser(email:string,password:string){
   const authdata:AuthData = {email:email,password:password}
  this.https.post("http://localhost:3000/api/user/signup",authdata)
  .subscribe(response=>{
    console.log(response);
  })
 }

 login(email:string,password:string){
   const authData: AuthData = {email:email,password:password};
   this.https.post<{token:string, expiresIn:number}>("http://localhost:3000/api/user/login",authData)
   .subscribe(response =>{
     //in angular all console.log() statements are flag in browser console
    console.log(response);
    const token=response.token;
    this.token=token;
    if(token){
      const expiresInDuration=response.expiresIn;
     this.tokenTimer= setTimeout(()=>{
        this.logout();
      },expiresInDuration * 1000)
      console.log(expiresInDuration);
      this.isAuthenticated=true;
      this.authStatusListener.next(true);
      const now = new Date()
      const expirationDate= new Date(now.getTime() + expiresInDuration*1000)
      console.log("times",expirationDate);
      this.saveAuthData(token,expirationDate);
      this.router.navigate(['/']);
    }

   })
 }

 getIsAuth(){
return this.isAuthenticated;
 }
 getToken(){
  return this.token
}

autoAuthUser(){
 const authInformation= this.getAuthData()
}

logout(){
  this.token=null;
  this.isAuthenticated=false;
  this.authStatusListener.next(false);
clearTimeout(this.tokenTimer);
  this.router.navigate(['/']);
}
private saveAuthData(token:string, expirationDate:Date){
  localStorage.setItem("token",token)
  localStorage.setItem("expiration", expirationDate.toISOString())
}

private clearAuthData(){
  localStorage.removeItem("token")
  localStorage.removeItem("expiration")
}
private getAuthData(){
  const token = localStorage.getItem("token")
  const expirationDate= localStorage.getItem("expiration")
  if(!token || !expirationDate){
    return;
  }
  return {
    token:token,
    expirationDate:new Date(expirationDate)
  }
}
}
