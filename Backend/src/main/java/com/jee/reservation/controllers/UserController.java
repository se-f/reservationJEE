package com.jee.reservation.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jee.reservation.models.AuthenticationResponse;
import com.jee.reservation.models.MyUser;
import com.jee.reservation.services.AuthenticationService;
import com.jee.reservation.services.MyUserDetailsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class UserController {

    private final AuthenticationService authService;

    @Autowired
    private MyUserDetailsService userService;


    public UserController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody MyUser request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody MyUser request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<MyUser> getUser(@PathVariable String username) {

        MyUser user = userService.getUser(username);

        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(403).build();

    }

    @DeleteMapping("/users/{username}")
    @Transactional
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<MyUser> updateUser(@PathVariable String username, @RequestBody MyUser user) {

        MyUser updatedUser = userService.updateUser(username, user);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.status(403).build();

    }

    @PutMapping("/users/{username}/password")
    public ResponseEntity<?> changePassword(@PathVariable String username, @RequestBody String newPasswordJSON)
            throws JsonProcessingException {

        String response = userService.changePassword(username, newPasswordJSON);

        if (response != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }


    @GetMapping("/users")
    public ResponseEntity<List<MyUser>> getUsers() {
        List<MyUser> users = userService.getUsers();

        if (users != null)
            return ResponseEntity.ok(users);

        return ResponseEntity.status(403).build();
    }


    private boolean isAdmin(Authentication authentication) {

        // prob
        MyUser user = (MyUser) authentication.getPrincipal();
        String role = user.getRole();

        return role.equals("ADMIN");
    }

}
