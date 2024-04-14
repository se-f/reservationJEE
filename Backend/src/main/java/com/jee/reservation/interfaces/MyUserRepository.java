package com.jee.reservation.interfaces;


import com.jee.reservation.models.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Integer> {

    Optional<MyUser> findByUsername(String username); // optional: dans le cas où l'utilisateur n'existe pas

    MyUser getUserByUsername(String username);

    void deleteByUsername(String username);
}
