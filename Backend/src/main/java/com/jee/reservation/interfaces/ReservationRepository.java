package com.jee.reservation.interfaces;

import com.jee.reservation.models.MyUser;
import com.jee.reservation.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findAllByUser(MyUser user);

    @Query("SELECT r FROM Reservation r " +
            "WHERE (:dateArrivee BETWEEN r.date_debut AND r.date_fin " +
            "OR :dateDepart BETWEEN r.date_debut AND r.date_fin " +
            "OR r.date_debut BETWEEN :dateArrivee AND :dateDepart " +
            "OR r.date_fin BETWEEN :dateArrivee AND :dateDepart)")
    List<Reservation> findOverlappingReservations(@Param("dateArrivee") LocalDate dateArrivee,
                                                  @Param("dateDepart") LocalDate dateDepart);

    @Query("SELECT r FROM Reservation r " +
            "WHERE r.chambre.idchambre = :chambreId " +
            "AND ((r.date_debut BETWEEN :startDate AND :endDate) " +
            "OR (r.date_fin BETWEEN :startDate AND :endDate))")
    List<Reservation> findOverlappingReservationsParChambre(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("chambreId") Integer chambreId
    );

    void deleteAllByUser(MyUser user);

    void deleteAllByChambreIdchambre(Integer idchambre);
}
