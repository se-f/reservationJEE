package com.jee.reservation.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jee.reservation.interfaces.MyUserRepository;
import com.jee.reservation.interfaces.ReservationRepository;
import com.jee.reservation.models.MyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private MyUserRepository repository;

    @Autowired
    private ReservationRepository reservationRepository;


    public MyUserDetailsService(MyUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public MyUser getUser(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        if (currentUser.equals(username) || isAdmin(authentication)) {
            return repository.findByUsername(username).orElse(null);
        }
        return null;
    }

    public void deleteUser(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        if (currentUser.equals(username) || isAdmin(authentication)) {
            MyUser user = repository.getUserByUsername(username);
            reservationRepository.deleteAllByUser(user);
            repository.deleteByUsername(username);
        }
    }

    public MyUser updateUser(String username, MyUser user) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        if (currentUser.equals(username) || isAdmin(authentication)) {
            return repository.save(user);
        }
        return null;
    }

    public String changePassword(String username, String newPasswordJSON) throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        MyUser user = repository.getUserByUsername(username);

        if (currentUser.equals(user.getUsername())) {

            // le string reçu est sous la forme JSON :  {"password":"****"}
            // extraction de password
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(newPasswordJSON);
            String newPassword = jsonNode.get("password").asText();
            
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(newPassword));

            repository.save(user);
            return "Password changed successfully";
        } else {
            return null;
        }

    }

    public List<MyUser> getUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!isAdmin(authentication)) {
            return null;
        }
        return repository.findAll();
    }


    private boolean isAdmin(Authentication authentication) {

        MyUser user = (MyUser) authentication.getPrincipal();
        String role = user.getRole();

        return role.equals("ADMIN");
    }

}
