package com.example.muconnbackend.Model;

public class UserDto {
    private String username;
    private String email;
    private String password;

    public UserDto(String username, String email, String password) {
    }

    public UserDto(String username, String password) {
    }

    public UserDto() {

    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

}
