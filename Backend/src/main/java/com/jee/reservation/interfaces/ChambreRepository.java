package com.jee.reservation.interfaces;

import com.jee.reservation.models.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ChambreRepository extends JpaRepository<Chambre, Integer> {
    
    List<Chambre> findAllByDisponibiliteBefore(LocalDate disponibilite);

    List<Chambre> findAllByDisponibiliteBeforeAndType(LocalDate disponibilite, String type);

    List<Chambre> findAllByIdchambreIsNotIn(List<Integer> chambreIds);

    List<Chambre> findAllByType(String type);

    List<Chambre> findChambresByDisponibiliteBefore(LocalDate dateArrivee);
}
