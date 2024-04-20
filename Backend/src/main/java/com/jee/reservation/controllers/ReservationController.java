package com.jee.reservation.controllers;

import com.jee.reservation.models.Reservation;
import com.jee.reservation.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

        List<Reservation> reservations = reservationService.getAllReservationsByUsername(username);
        if (reservations != null)
            return ResponseEntity.ok(reservations);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }


    @GetMapping("/{idReservation}")
    public ResponseEntity<Reservation> getReservation(@PathVariable Integer idReservation) {

        Reservation reservation = reservationService.getReservationById(idReservation);

        if (reservation != null)
            return ResponseEntity.ok(reservation);

        return ResponseEntity.notFound().build();

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


}
