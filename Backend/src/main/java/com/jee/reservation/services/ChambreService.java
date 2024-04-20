package com.jee.reservation.services;

import com.jee.reservation.interfaces.ChambreRepository;
import com.jee.reservation.interfaces.ReservationRepository;
import com.jee.reservation.models.Chambre;
import com.jee.reservation.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChambreService {

    @Autowired
    private ChambreRepository chambreRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    public Chambre createChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    public Chambre getChambreById(Integer id) {
        return chambreRepository.findById(id).orElse(null);
    }

    public Chambre updateChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    public void deleteChambre(Integer id) {
        chambreRepository.deleteById(id);
    }

    public List<Chambre> getAllChambres() {
        return chambreRepository.findAll();
    }

    public List<Chambre> getAllAvailableChambres() {
        return chambreRepository.findAllByDisponibiliteBefore(LocalDate.now());
    }

    public List<Chambre> findAllByType(String type) {
        return chambreRepository.findAllByType(type);
    }


    // trouver les réservations qui ne chevauchent pas les dates spécifiées
    public List<Chambre> getAllAvailableChambresByDates(LocalDate dateArrivee, LocalDate dateDepart) {
        // trouver les réservations qui chevauchent les dates spécifiées
        List<Reservation> reservationsOverlap = reservationRepository.findOverlappingReservations(dateArrivee, dateDepart);

        List<Integer> chambreIds = reservationsOverlap.stream() // transformer reservationsOverlap en stream
                .map(chambre -> chambre.getChambre().getIdchambre())   // transformer chaque réservation en l'ID de la chambre
                .collect(Collectors.toList());  // collecter les ID des chambres dans une liste


        List<Chambre> chambresLibres = chambreRepository.findAllByIdchambreIsNotIn(chambreIds);
        return new ArrayList<>(chambresLibres);
    }

    public List<Chambre> getAllAvailableChambresDisponiblesParType(String type) {
        List<Chambre> chambresDisponibles = getAllAvailableChambres();
        return chambresDisponibles.stream()
                .filter(chambre -> chambre.getType().equals(type))
                .toList();
    }

    public List<Chambre> getAllAvailableChambresDisponiblesParDateParType(String type, LocalDate dateArrivee, LocalDate dateDepart) {
        List<Chambre> chambresDisponiblesParDate = getAllAvailableChambresByDates(dateArrivee, dateDepart);

        return chambresDisponiblesParDate.stream()
                .filter(chambre -> chambre.getType().equals(type))
                .toList();
    }

}
