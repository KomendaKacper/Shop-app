package com.example.api_gateway.responses;

import java.util.List;

public class UserResponse {
    private List<String> roles;

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
