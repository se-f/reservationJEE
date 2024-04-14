package com.jee.reservation.controllers;

import com.jee.reservation.models.MyUser;
import com.jee.reservation.models.Reservation;
import com.jee.reservation.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping()
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/guest/{username}")
    public ResponseEntity<List<Reservation>> getAllReservationsByUsername(@PathVariable String username) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        // si l'utilisateur actuellement authentifié est celui qui veut accèder
        if (currentUser.equals(username) || isAdmin(authentication)) {
            List<Reservation> reservations = reservationService.getAllReservationsByUsername(username);
            return ResponseEntity.ok(reservations);
        } else {
            System.err.println("FORBIDDEN!!");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }


    @GetMapping("/{idReservation}")
    public ResponseEntity<Reservation> getReservation(@PathVariable Integer idReservation) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Reservation reservation = reservationService.getReservationById(idReservation);

        if (reservation != null) {

            // si l'utilisateur actuellement authentifié est le propriétaire de la réservation ou bien admin
            if (reservation.getUser().getUsername().equals(username) || isAdmin(authentication)) {
                return ResponseEntity.ok(reservation);
            } else return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

            // la reservation n'existe pas
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping()
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {

        Reservation createdReservation = reservationService.createReservation(reservation);
        if (createdReservation == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        return ResponseEntity.ok(createdReservation);
    }

    @DeleteMapping("/{idReservation}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Integer idReservation) {
        reservationService.deleteReservation(idReservation);
        return ResponseEntity.ok().build();
    }

    @PutMapping("")
    public ResponseEntity<Reservation> updateReservation(@RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(reservation);
        return ResponseEntity.ok(updatedReservation);
    }

    private boolean isAdmin(Authentication authentication) {

        MyUser user = (MyUser) authentication.getPrincipal();
        String role = user.getRole();

        return role.equals("ADMIN");
    }

}
