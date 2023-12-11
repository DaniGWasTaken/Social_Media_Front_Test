import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   API_URL= 'http://localhost:8080/api/v1';
  constructor(
    private httpClient: HttpClient

  ) { }
  login(username: string, password: string){
    return this.httpClient.post(`${this.API_URL}/auth`,{
      username,
      password
    })
  }
  register(username: string, password: string, nickname: string, email: string){
    return this.httpClient.post(`${this.API_URL}/users/signup`,{
  })
}
}
