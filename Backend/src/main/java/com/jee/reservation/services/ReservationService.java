package com.jee.reservation.services;

import com.jee.reservation.interfaces.ChambreRepository;
import com.jee.reservation.interfaces.MyUserRepository;
import com.jee.reservation.interfaces.ReservationRepository;
import com.jee.reservation.models.Chambre;
import com.jee.reservation.models.MyUser;
import com.jee.reservation.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ChambreRepository chambreRepository;

    @Autowired
    private MyUserRepository userRepository;

    public Reservation createReservation(Reservation reservation) {

        List<Reservation> reservationsOverlap = reservationRepository.findOverlappingReservationsParChambre(reservation.getDate_debut(), reservation.getDate_fin(), reservation.getChambre().getIdchambre());
        if (reservationsOverlap.isEmpty()) {
            Chambre chambre = reservation.getChambre();
            chambre.setDisponibilite(reservation.getDate_fin().plusDays(1));
            chambreRepository.save(chambre);
            return reservationRepository.save(reservation);
        } else {
            System.out.println("Reservations overlapping");
            return null;
        }
    }

    public Reservation getReservationById(Integer id) {
        Reservation reservation = getReservationById(id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // si l'utilisateur actuellement authentifié est le propriétaire de la réservation ou bien admin
        if (reservation.getUser().getUsername().equals(username) || isAdmin(authentication))
            return reservationRepository.findById(id).orElse(null);
        return null;
    }

    public Reservation updateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if (reservation != null) {
            Chambre chambre = reservation.getChambre();
            chambre.setDisponibilite(LocalDate.now());
            chambreRepository.save(chambre);
            reservationRepository.deleteById(id);
        }
    }

    public List<Reservation> getAllReservationsByUsername(String username) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();

        // si l'utilisateur actuellement authentifié est celui qui veut accèder
        if (currentUser.equals(username) || isAdmin(authentication)) {
            MyUser user = userRepository.getUserByUsername(username);
            return reservationRepository.findAllByUser(user);
        } else return null;
    }

    public void deleteAllReservationsByUsername(String username) {
        MyUser user = userRepository.getUserByUsername(username);
        reservationRepository.deleteAllByUser(user);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public void deleteAllByUser(MyUser user) {
        reservationRepository.deleteAllByUser(user);
    }

    public void deleteAllByChambreid(Integer chambreId) {
        reservationRepository.deleteAllByChambreIdchambre(chambreId);
    }


    private boolean isAdmin(Authentication authentication) {

        MyUser user = (MyUser) authentication.getPrincipal();
        String role = user.getRole();

        return role.equals("ADMIN");
    }


}
