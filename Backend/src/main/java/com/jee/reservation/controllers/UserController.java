package com.jee.reservation.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jee.reservation.interfaces.MyUserRepository;
import com.jee.reservation.models.AuthenticationResponse;
import com.jee.reservation.models.MyUser;
import com.jee.reservation.services.AuthenticationService;
import com.jee.reservation.services.ReservationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class UserController {

    private final AuthenticationService authService;

    @Autowired
    private MyUserRepository userRepository;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();

        if (currentUser.equals(username) || isAdmin(authentication)) {
            return ResponseEntity.ok(userRepository.findByUsername(username).orElse(null));
        }
        return ResponseEntity.status(403).build();

    }

    @DeleteMapping("/users/{username}")
    @Transactional
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userRepository.deleteByUsername(username);

        MyUser user = userRepository.getUserByUsername(username);

        reservationService.deleteAllByUser(user);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<MyUser> updateUser(@PathVariable String username, @RequestBody MyUser user) {
        MyUser existingUser = userRepository.getUserByUsername(username);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();

        if (currentUser.equals(existingUser.getUsername()) || isAdmin(authentication)) {
            user.setIduser(existingUser.getIduser());
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.status(403).build();

    }

    @PutMapping("/users/{username}/password")
    public ResponseEntity<?> changePassword(@PathVariable String username, @RequestBody String newPasswordJSON)
            throws JsonProcessingException {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        MyUser user = userRepository.getUserByUsername(username);

        if (currentUser.equals(user.getUsername())) {

            // le string reçu est sous la forme JSON :  {"password":"****"}
            // extraction de password
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(newPasswordJSON);
            String newPassword = jsonNode.get("password").asText();

            user.setPassword(passwordEncoder.encode(newPassword));

            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(403).build();
    }

    @GetMapping("/users")
    public ResponseEntity<Iterable<MyUser>> getUsers() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!isAdmin(authentication)) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(userRepository.findAll());
    }


    private boolean isAdmin(Authentication authentication) {

        // prob
        MyUser user = (MyUser) authentication.getPrincipal();
        String role = user.getRole();

        return role.equals("ADMIN");
    }

}
